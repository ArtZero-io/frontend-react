import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Square,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
  Link,
  NumberInput,
  NumberInputField,
  InputRightElement,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { MdOutlineArrowBackIos } from "react-icons/md";

import toast from "react-hot-toast";
import {
  Link as ReactRouterLink,
  useHistory,
  useParams,
} from "react-router-dom";

import { APICall } from "@api/client";
import { useSubstrateState } from "@utils/substrate";

import {
  getCachedImageShort,
  formatNumDynamicDecimal,
  getPublicCurrentAccount,
} from "@utils";
import { getNFTDetails } from "@utils/blockchain/nft721-psp34-standard-calls";
import marketplace from "@utils/blockchain/marketplace";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import staking_calls from "@utils/blockchain/staking_calls";

import CommonTable from "@components/Table/Table";
import NftLayout from "@components/Layout/NftLayout";
import CommonButton from "@components/Button/CommonButton";
import ModalLoader from "@components/Loader/ModalLoader";
import { fetchUserBalance } from "../launchpad/component/Form/AddNewProject";
import { useDispatch } from "react-redux";
import { clearTxStatus, setTxStatus } from "@store/actions/txStatus";
import {
  BUY,
  BID,
  START,
  REMOVE_BID,
  ACCEPT_BID,
  LIST_TOKEN,
  UNLIST_TOKEN,
} from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import { ContractPromise } from "@polkadot/api-contract";
import { delay } from "@utils";

import LockNFTModalMobile from "@components/Modal/LockNFTModalMobile";
import { formMode } from "@constants";
import AddNewNFTModal from "@pages/collection/component/Modal/AddNewNFT";
import {
  fetchMyPMPStakedCount,
  fetchMyTradingFee,
} from "@pages/account/stakes";
import TransferNFTModalMobile from "@components/Modal/TransferNFTModalMobile";
import { truncateStr } from "@utils";
import UnlockIcon from "@theme/assets/icon/Unlock";
import LockIcon from "@theme/assets/icon/Lock";
import PropCard from "@components/Card/PropCard";
import LevelCard from "@components/Card/LevelCard";

function TokenPage() {
  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { collection_address, token_id } = useParams();
  const history = useHistory();

  const [token, setToken] = useState(null);
  const [bidPrice, setBidPrice] = useState(1);
  const [askPrice, setAskPrice] = useState(1);
  const [bidsList, setBidsList] = useState(null);
  const [collection, setCollection] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [myTradingFee, setMyTradingFee] = useState(null);
  const [feeCalculated, setFeeCalculated] = useState(null);

  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlreadyBid, setIsAlreadyBid] = useState(false);

  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [BUY, BID, REMOVE_BID, ACCEPT_BID, LIST_TOKEN, UNLIST_TOKEN],
    () => fetchData()
  );

  const fetchData = useCallback(
    async function () {
      try {
        setLoading(true);
        if (currentAccount) {
          const stakedCount = await fetchMyPMPStakedCount(
            currentAccount,
            staking_calls
          );
          const myTradingFeeData = await fetchMyTradingFee(
            stakedCount,
            currentAccount,
            marketplace_contract_calls
          );

          setMyTradingFee(myTradingFeeData);
        }

        const [collectionDetails] = await APICall.getCollectionByAddress({
          collection_address,
        });
        const tokenDetails = await getNFTDetails(
          api,
          currentAccount || getPublicCurrentAccount(),
          collection_address,
          token_id,
          collectionDetails?.contractType
        );

        const ownerAddress = tokenDetails?.is_for_sale
          ? tokenDetails?.nft_owner
          : tokenDetails?.owner;

        // get username onchain if any
        const name = truncateStr(ownerAddress);
        setOwnerName(name);

        if (ownerAddress === currentAccount?.address) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }

        let listBidder;

        if (tokenDetails?.is_for_sale) {
          listBidder = await marketplace_contract_calls.getAllBids(
            currentAccount || getPublicCurrentAccount(),
            collection_address,
            ownerAddress,
            { u64: token_id }
          );

          if (listBidder?.length) {
            //sort highest price first
            listBidder.sort((a, b) => {
              return (
                b.bidValue.replaceAll(",", "") * 1 -
                a.bidValue.replaceAll(",", "") * 1
              );
            });

            // add isMyBid to list
            listBidder = listBidder.map((item) => {
              return {
                ...item,
                isMyBid: item.bidder === currentAccount?.address ? true : false,
              };
            });

            const myBid = listBidder.filter((item) => item.isMyBid === true);
            if (myBid.length) {
              const bidValue =
                (myBid[0].bidValue.replaceAll(",", "") * 1) / 10 ** 12;

              setBidPrice(bidValue);
              setIsAlreadyBid(true);
            }
          } else {
            listBidder = [];
            setBidPrice(1);
            setIsAlreadyBid(false);
          }
        }

        setToken(tokenDetails);
        setBidsList(listBidder);
        setCollection(collectionDetails);

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.message);

        setLoading(false);
      }
    },
    [api, collection_address, currentAccount, token_id]
  );

  useEffect(() => {
    if (!currentAccount) {
      toast.error("Please connect wallet for full-function using!");
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection_address, currentAccount, token_id]);

  const handleBuyAction = async () => {
    try {
      await buyToken(
        api,
        currentAccount,
        isOwner,
        token?.price,
        token?.nftContractAddress,
        token?.is_for_sale ? token?.nft_owner : token?.owner,
        token?.tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleBidAction = async () => {
    try {
      await placeBid(
        api,
        currentAccount,
        isOwner,
        token?.price,
        bidPrice,
        token?.nftContractAddress,
        token?.is_for_sale ? token?.nft_owner : token?.owner,
        token?.tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleRemoveBidAction = async () => {
    try {
      await removeBid(
        api,
        currentAccount,
        token?.nftContractAddress,
        token?.is_for_sale ? token?.nft_owner : token?.owner,
        token?.tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleListTokenAction = async () => {
    try {
      await listToken(
        api,
        currentAccount,
        isOwner,
        askPrice,
        token?.nftContractAddress,
        nft721_psp34_standard.CONTRACT_ABI,
        nft721_psp34_standard_calls,
        marketplace.CONTRACT_ADDRESS,
        token?.tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleUnlistTokenAction = async () => {
    try {
      await unlistToken(
        api,
        currentAccount,
        isOwner,
        token?.nftContractAddress,
        token?.tokenID,
        dispatch
      );
      setAskPrice(1);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleAcceptBidAction = async (bidId) => {
    try {
      await acceptBid(
        api,
        currentAccount,
        isOwner,
        token?.nftContractAddress,
        token?.tokenID,
        bidId,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  useEffect(() => {
    let p = askPrice;

    if (token?.is_for_sale) {
      p = token?.price / 1000000000000;
    }

    const info = calculateFee(p, collection?.royalFee, myTradingFee);

    setFeeCalculated(info);
  }, [
    askPrice,
    collection?.royalFee,
    myTradingFee,
    token?.is_for_sale,
    token?.price,
  ]);

  const iconWidth = useBreakpointValue(["40px", "50px"]);

  return (
    <NftLayout>
      <VStack w="full" minH="calc(100vh - 80px)" bg="brand.grayDark">
        {loading || loadingForceUpdate ? (
          <ModalLoader loadingTime={loadingTime || 1} />
        ) : (
          <VStack
            borderTop="1px solid #222"
            textAlign="left"
            w="full"
            pb="40px"
          >
            <Stack
              p="18px"
              bg="black"
              w="full"
              px={["20px", "85px"]}
              maxW={["full", "1200px"]}
            >
              <Breadcrumb w="full">
                <BreadcrumbItem isCurrentPage>
                  <HStack
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    onClick={() => history.goBack()}
                  >
                    <MdOutlineArrowBackIos />
                    <Text size="h6" pl="4px">{`${collection?.name}`}</Text>
                  </HStack>
                </BreadcrumbItem>
              </Breadcrumb>
            </Stack>

            <Stack
              px="20px"
              pt="17px"
              direction={["column", "row"]}
              maxW={["full", "1200px"]}
              spacing="25px"
            >
              <Square maxH={["375px"]} maxW={["375px"]} overflow="hidden">
                <Image
                  w="full"
                  h="full"
                  alt="nft-img"
                  boxShadow="lg"
                  objectFit="cover"
                  fallback={<Skeleton />}
                  src={getCachedImageShort(token?.avatar, 500)}
                />
              </Square>

              <HStack spacing="10px" justify="start">
                {!token?.is_locked &&
                  collection?.showOnChainMetadata &&
                  isOwner && (
                    <AddNewNFTModal
                      mode={formMode.EDIT}
                      isDisabled={token?.is_for_sale || actionType}
                      {...token}
                    />
                  )}

                {!token?.is_locked &&
                  collection?.showOnChainMetadata &&
                  !isOwner && (
                    <Tooltip
                      hasArrow
                      bg="#333"
                      color="#fff"
                      borderRadius="0"
                      label="Unlocked on-chain metadata"
                    >
                      <span
                        style={{
                          width: iconWidth,
                          height: iconWidth,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #333333",
                        }}
                      >
                        <UnlockIcon
                          width={["20px", "25px"]}
                          height={["20px", "25px"]}
                        />
                      </span>
                    </Tooltip>
                  )}

                {!token?.is_locked && !collection?.showOnChainMetadata && (
                  <Tooltip
                    hasArrow
                    bg="#333"
                    color="#fff"
                    borderRadius="0"
                    label="Off-chain metadata"
                  >
                    <span
                      style={{
                        width: iconWidth,
                        height: iconWidth,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #333333",
                      }}
                    >
                      <UnlockIcon
                        width={["20px", "25px"]}
                        height={["20px", "25px"]}
                      />
                    </span>
                  </Tooltip>
                )}

                {token?.is_locked && collection?.showOnChainMetadata && (
                  <Tooltip
                    hasArrow
                    bg="#333"
                    color="#fff"
                    borderRadius="0"
                    label="Locked on-chain metadata"
                  >
                    <span
                      style={{
                        width: iconWidth,
                        height: iconWidth,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #333333",
                      }}
                    >
                      <LockIcon
                        width={["20px", "25px"]}
                        height={["20px", "25px"]}
                      />
                    </span>
                  </Tooltip>
                )}

                {!token?.is_locked && isOwner && (
                  <>
                    <LockNFTModalMobile
                      owner={
                        token?.is_for_sale ? token?.nft_owner : token?.owner
                      }
                      txType="lock"
                      isDisabled={token?.is_for_sale || actionType}
                      tokenID={token?.tokenID}
                      nftContractAddress={token?.nftContractAddress}
                      showOnChainMetadata={collection?.showOnChainMetadata}
                    />
                  </>
                )}

                {isOwner && (
                  <TransferNFTModalMobile
                    {...token}
                    isDisabled={token?.is_for_sale || actionType}
                  />
                )}
              </HStack>

              <Stack
                w="full"
                spacing="20px"
                px={["0px", "30px"]}
                minW={["auto", "520px"]}
              >
                <Stack spacing="5px" w="full">
                  <Heading fontSize={["xl", "3xl"]} isTruncated>
                    {token?.nftName}
                  </Heading>

                  <Text
                    isTruncated
                    maxW={["300px", "600px"]}
                    fontSize="lg"
                    color="brand.grayLight"
                  >
                    {token?.description}
                  </Text>

                  <Text>
                    Owned by{" "}
                    <Link
                      // to="/user/xxx"
                      to="#"
                      color="brand.blue"
                      textTransform="none"
                      textDecoration="underline"
                      as={ReactRouterLink}
                    >
                      {ownerName}
                    </Link>
                  </Text>
                </Stack>

                <Stack w="full">
                  {/* 1 Not for sale NOT owner  */}
                  {!token?.is_for_sale && !isOwner && (
                    <Stack p="20px" border="1px solid #333">
                      <Heading size="h6">This item not for sale</Heading>
                    </Stack>
                  )}

                  {/* 2 Not for sale & owner  */}
                  {!token?.is_for_sale && isOwner && (
                    <>
                      <Stack p="20px" border="1px solid #333">
                        <Stack>
                          <HStack spacing="20px" mb="12px">
                            <NumberInput
                              w="50%"
                              minW={"85px"}
                              isDisabled={actionType}
                              bg="black"
                              max={999000000}
                              min={1}
                              precision={6}
                              onChange={(v) => setAskPrice(v)}
                              value={askPrice}
                              h="40px"
                            >
                              <NumberInputField
                                textAlign="end"
                                h="40px"
                                borderRadius={0}
                                borderWidth={0}
                                color="#fff"
                              />
                              <InputRightElement
                                bg="transparent"
                                h={"40px"}
                                w={8}
                              >
                                <AzeroIcon w="14px" h="14px" />
                              </InputRightElement>
                            </NumberInput>

                            <CommonButton
                              w="50%"
                              h="40px"
                              {...rest}
                              text="push for sale"
                              onClick={handleListTokenAction}
                              isDisabled={
                                actionType && actionType !== LIST_TOKEN
                              }
                            />
                          </HStack>
                        </Stack>
                      </Stack>

                      <Stack w="full">
                        <FeeCalculatedBar feeCalculated={feeCalculated} />
                      </Stack>
                    </>
                  )}

                  {/* 3 For sale & owner  */}
                  {token?.is_for_sale && isOwner && (
                    <>
                      <Stack p="20px" border="1px solid #333">
                        <Stack>
                          <HStack spacing="20px" mb="12px">
                            <CommonButton
                              w="50%"
                              h="40px"
                              {...rest}
                              text="cancel sale"
                              onClick={handleUnlistTokenAction}
                              isDisabled={
                                actionType && actionType !== UNLIST_TOKEN
                              }
                            />{" "}
                            <VStack w="50%" alignItems="end">
                              <Text color="#888">Current price</Text>

                              <Tag minH="20px" pr={0} bg="transparent">
                                <TagLabel bg="transparent">
                                  {formatNumDynamicDecimal(
                                    token?.price / 10 ** 12
                                  )}
                                </TagLabel>
                                <TagRightIcon as={AzeroIcon} w="14px" />
                              </Tag>
                            </VStack>
                          </HStack>
                        </Stack>
                      </Stack>

                      <Stack w="full">
                        <FeeCalculatedBar feeCalculated={feeCalculated} />
                      </Stack>
                    </>
                  )}

                  {/* 4 For sale & NOT owner  */}
                  {token?.is_for_sale && !isOwner && (
                    <>
                      <Stack p="20px" border="1px solid #333">
                        <HStack spacing="20px">
                          <CommonButton
                            {...rest}
                            w="50%"
                            h="40px"
                            text="buy now"
                            onClick={handleBuyAction}
                            isDisabled={actionType && actionType !== BUY}
                          />

                          <VStack w="50%" alignItems="end">
                            <Text color="#888">Current price</Text>

                            <Tag minH="20px" pr={0} bg="transparent">
                              <TagLabel bg="transparent">
                                {formatNumDynamicDecimal(
                                  token?.price / 10 ** 12
                                )}
                              </TagLabel>
                              <TagRightIcon as={AzeroIcon} w="14px" />
                            </Tag>
                          </VStack>
                        </HStack>
                      </Stack>
                      {isAlreadyBid ? (
                        <HStack spacing="20px" p="20px" border="1px solid #333">
                          <CommonButton
                            h="40px"
                            w="50%"
                            {...rest}
                            text="remove bid"
                            onClick={handleRemoveBidAction}
                            isDisabled={actionType && actionType !== REMOVE_BID}
                          />

                          <VStack w="50%" alignItems="end">
                            <Text color="#888">Your offer</Text>
                            <Tag minH="20px" pr={0} bg="transparent">
                              <TagLabel bg="transparent">{bidPrice}</TagLabel>
                              <TagRightIcon as={AzeroIcon} w="14px" />
                            </Tag>
                          </VStack>
                        </HStack>
                      ) : (
                        <Stack p="20px" border="1px solid #333">
                          <HStack spacing="20px">
                            <CommonButton
                              {...rest}
                              h="40px"
                              w="50%"
                              text="place bid"
                              onClick={handleBidAction}
                              isDisabled={actionType && actionType !== BID}
                            />

                            <NumberInput
                              w={"50%"}
                              isDisabled={actionType}
                              bg="black"
                              max={999000000}
                              min={1}
                              precision={6}
                              onChange={(v) => setBidPrice(v)}
                              value={bidPrice}
                              h="40px"
                            >
                              <NumberInputField
                                textAlign="end"
                                h="40px"
                                borderRadius={0}
                                borderWidth={0}
                                color="#fff"
                              />
                              <InputRightElement
                                bg="transparent"
                                h={"40px"}
                                w={8}
                              >
                                <AzeroIcon w="14px" />
                              </InputRightElement>
                            </NumberInput>
                          </HStack>
                        </Stack>
                      )}
                    </>
                  )}
                </Stack>

                <Stack w="full" py="15px">
                  <Heading fontSize="xl" pb="16px">
                    attributes
                  </Heading>

                  {token?.attrsList?.length === 0 ? (
                    <Text py="2rem">This NFT has no props/ levels.</Text>
                  ) : (
                    // THIS LINE FUCKING FIX FOR SAFARI IOS
                    // FUCKING IOS FUCKING IOS FUCKING IOS
                    <div style={{ display: "grid" }}>
                      <Grid
                        // maxH={!token?.is_for_sale ? "245px" : "155px"}
                        w="full"
                        gap="24px"
                        id="grid-attrs"
                        templateColumns={`repeat(auto-fill, minmax(min(100%, 128px), 1fr))`}
                      >
                        {token?.attrsList
                          .filter(
                            (i) =>
                              !JSON.stringify(Object.values(i)).includes("|")
                          )
                          .map((item, idx) => {
                            return (
                              <GridItem w="100%" h="100%" key={idx}>
                                <PropCard item={item} />
                              </GridItem>
                            );
                          })}

                        {token?.attrsList
                          .filter((i) =>
                            JSON.stringify(Object.values(i)).includes("|")
                          )
                          .map((item, idx) => {
                            return (
                              <GridItem w="100%" h="100%" key={idx}>
                                <LevelCard item={item} />
                              </GridItem>
                            );
                          })}
                      </Grid>
                    </div>
                  )}
                </Stack>

                <Stack
                  w="full"
                  py="15px"
                  display={["flex", "none"]}
                  hidden={!token?.is_for_sale}
                >
                  <Heading fontSize="xl" pb="16px">
                    Offers List
                  </Heading>{" "}
                  {bidsList?.length === 0 ? (
                    <Text textAlign="left" py="2rem">
                      There is no bid yet.
                    </Text>
                  ) : (
                    <CommonTable
                      shadow="lg"
                      isOwner={isOwner}
                      tableData={bidsList}
                      tableHeaders={headers}
                      onClickHandler={handleAcceptBidAction}
                    />
                  )}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              mx="auto"
              w="full"
              py="15px"
              px={["0px", "85px"]}
              display={["none", "flex"]}
              maxW={["full", "1200px"]}
              hidden={!token?.is_for_sale}
            >
              <Heading pl="4px" fontSize="xl">
                Offers List
              </Heading>{" "}
              {bidsList?.length === 0 ? (
                <Text textAlign="left" py="2rem">
                  There is no bid yet.
                </Text>
              ) : (
                <CommonTable
                  shadow="lg"
                  isOwner={isOwner}
                  tableData={bidsList}
                  tableHeaders={headers}
                  onClickHandler={handleAcceptBidAction}
                />
              )}
            </Stack>
          </VStack>
        )}
      </VStack>
    </NftLayout>
  );
}

export default TokenPage;

const headers = ["address", "time", "price", "action"];

export const buyToken = async (
  api,
  currentAccount,
  isOwner,
  askPrice,
  nftContractAddress,
  ownerAddress,
  tokenID,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }
  //check owner of the NFT
  if (isOwner) {
    toast.error(`Can not buy your own NFT!`);
    return;
  }

  // check balance
  const { balance } = await fetchUserBalance({ currentAccount, api });

  if (balance < askPrice / 10 ** 12) {
    toast.error(`Not enough balance!`);
    return;
  }

  dispatch(
    setTxStatus({ type: BUY, step: START, tokenIDArray: Array.of(tokenID) })
  );

  await marketplace_contract_calls.buy(
    currentAccount,
    nftContractAddress,
    ownerAddress,
    { u64: tokenID },
    askPrice,
    dispatch,
    BUY,
    api
  );
};

export const placeBid = async (
  api,
  currentAccount,
  isOwner,
  askPrice, // Int 10**12
  bidPrice, // Float
  nftContractAddress,
  ownerAddress,
  tokenID,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }

  //check owner of the NFT
  if (isOwner) {
    toast.error(`Can not bid your own NFT!`);
    return;
  }

  // check balance
  const { balance } = await fetchUserBalance({ currentAccount, api });

  if (balance < bidPrice) {
    toast.error(`Not enough balance!`);
    return;
  }

  //check bidPrice
  if (parseFloat(bidPrice) <= 0) {
    toast.error(`Bid price must greater than zero!`);
    return;
  }

  if (parseFloat(bidPrice) > askPrice / 10 ** 12) {
    toast.error(`Bid amount must less than selling price!`);
    return;
  }

  dispatch(
    setTxStatus({ type: BID, step: START, tokenIDArray: Array.of(tokenID) })
  );

  await marketplace_contract_calls.bid(
    currentAccount,
    nftContractAddress,
    ownerAddress,
    { u64: tokenID },
    bidPrice,
    dispatch,
    BID,
    api
  );
};

export const removeBid = async (
  api,
  currentAccount,
  nftContractAddress,
  ownerAddress,
  tokenID,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }

  // check balance
  const { balance } = await fetchUserBalance({ currentAccount, api });

  if (balance < 0.001) {
    toast.error(`Balance is low!`);
    return;
  }

  dispatch(
    setTxStatus({
      type: REMOVE_BID,
      step: START,
      tokenIDArray: Array.of(tokenID),
    })
  );

  await marketplace_contract_calls.removeBid(
    currentAccount,
    nftContractAddress,
    ownerAddress,
    { u64: tokenID },
    dispatch,
    REMOVE_BID,
    api
  );
};

export const listToken = async (
  api,
  currentAccount,
  isOwner,
  askPrice,
  nftContractAddress,
  contract_abi,
  contract_calls,
  marketplace_contract,
  tokenID,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }

  //check owner of the NFT
  if (!isOwner) {
    toast.error(`It's not your token!`);
    return;
  }

  //check askPrice
  if (parseFloat(askPrice) <= 0) {
    toast.error(`Bid price must greater than zero!`);
    return;
  }

  dispatch(
    setTxStatus({
      type: LIST_TOKEN,
      step: START,
      tokenIDArray: Array.of(tokenID),
    })
  );

  const nft721_psp34_standard_contract = new ContractPromise(
    api,
    contract_abi,
    nftContractAddress
  );

  contract_calls.setContract(nft721_psp34_standard_contract);

  const isAllowance = await contract_calls.allowance(
    currentAccount,
    currentAccount?.address,
    marketplace_contract,
    { u64: tokenID },
    dispatch
  );

  let res;

  if (!isAllowance) {
    toast.success("Step 1: Approving NFT transfer...");

    res = await contract_calls.approve(
      currentAccount,
      marketplace_contract,
      { u64: tokenID },
      true,
      dispatch,
      LIST_TOKEN,
      api
    );
  }
  if (res || isAllowance) {
    await delay(6000).then(async () => {
      toast.success(`${res ? "Step 2:" : ""} Listing on marketplace...`);

      await marketplace_contract_calls.list(
        currentAccount,
        nftContractAddress,
        { u64: tokenID },
        askPrice,
        dispatch,
        LIST_TOKEN,
        api
      );
    });
  }
};

export const unlistToken = async (
  api,
  currentAccount,
  isOwner,
  nftContractAddress,
  tokenID,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }

  //check owner of the NFT
  if (!isOwner) {
    toast.error(`It's not your token!`);
    return;
  }

  dispatch(
    setTxStatus({
      type: UNLIST_TOKEN,
      step: START,
      tokenIDArray: Array.of(tokenID),
    })
  );
  await marketplace_contract_calls.unlist(
    currentAccount,
    nftContractAddress,
    currentAccount.address,
    { u64: tokenID },
    dispatch,
    UNLIST_TOKEN,
    api
  );
};

export const acceptBid = async (
  api,
  currentAccount,
  isOwner,
  nftContractAddress,
  tokenID,
  bidId,
  dispatch
) => {
  // check wallet connected
  if (!currentAccount) {
    toast.error("Please connect wallet first!");
    return;
  }

  //check owner of the NFT
  if (!isOwner) {
    toast.error(`It's not your token!`);
    return;
  }

  dispatch(
    setTxStatus({
      type: ACCEPT_BID,
      step: START,
      tokenIDArray: Array.of(bidId),
      // array of bidId NOT TokenID
    })
  );
  await marketplace_contract_calls.acceptBid(
    currentAccount,
    nftContractAddress,
    currentAccount.address,
    { u64: tokenID },
    bidId,
    dispatch,
    ACCEPT_BID,
    api
  );
};

export const calculateFee = (askPrice, royalFee, myTradingFee) => {
  // price 99000000000000 -> price of LISTED item MUST div 10*12

  // askPrice 99.000000 ~ 99 Azero
  // royalFee 450 ~ 4.5%
  // myTradingFee 5.00 ~ 5%

  const royalFeePercent = royalFee / 100;
  const royalFeeAmount = (askPrice * royalFeePercent) / 100;

  const tradeFeePercent = Number(myTradingFee);
  const tradeFeeAmount = (askPrice * tradeFeePercent) / 100;

  const userPortionPercent = 100 - royalFeePercent - tradeFeePercent;
  const userPortionAmount = askPrice - royalFeeAmount - tradeFeeAmount;

  const ret = {
    royalFeePercent: royalFeePercent.toFixed(2),
    royalFeeAmount: formatNumDynamicDecimal(royalFeeAmount),
    tradeFeePercent: tradeFeePercent.toFixed(2),
    tradeFeeAmount: formatNumDynamicDecimal(tradeFeeAmount),
    userPortionPercent: userPortionPercent.toFixed(2),
    userPortionAmount: formatNumDynamicDecimal(userPortionAmount),
  };

  return ret;
};

const FeeCalculatedBar = ({ feeCalculated }) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      borderTop="1px solid #282828"
      pt={["10px", "20px"]}
    >
      <VStack alignItems="start">
        <Text fontSize={{ base: "13px", md: "16px" }}>
          <Text as="span" color="brand.grayLight">
            Royal fee:
          </Text>{" "}
          ({feeCalculated.royalFeePercent}%)
        </Text>

        <Text color="#fff">
          {feeCalculated.royalFeeAmount} <AzeroIcon w="12px" mb="2px" />
        </Text>
      </VStack>

      <VStack alignItems="start">
        <Text fontSize={{ base: "13px", md: "16px" }}>
          <Text as="span" color="brand.grayLight">
            Trade fee:
          </Text>{" "}
          ({feeCalculated.tradeFeePercent}%)
        </Text>
        <Text color="#fff">
          {feeCalculated.tradeFeeAmount} <AzeroIcon w="12px" mb="2px" />
        </Text>
      </VStack>

      <VStack alignItems="start">
        <Text fontSize={{ base: "13px", md: "16px" }} color="brand.grayLight">
          You will receive:
        </Text>
        <Text color="#fff">
          {feeCalculated.userPortionAmount} <AzeroIcon w="12px" mb="2px" />
        </Text>
      </VStack>
    </HStack>
  );
};
