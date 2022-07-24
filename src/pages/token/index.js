/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Progress,
  Skeleton,
  Spacer,
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
  Icon,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { MdOutlineArrowBackIos } from "react-icons/md";

import toast from "react-hot-toast";
import { Link as ReactRouterLink, useParams } from "react-router-dom";

import { APICall } from "@api/client";
import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import {
  getCachedImageShort,
  formatNumDynamicDecimal,
  createLevelAttribute,
  getPublicCurrentAccount,
} from "@utils";
import { getNFTDetails } from "@utils/blockchain/nft721-psp34-standard-calls";
import marketplace from "@utils/blockchain/marketplace";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import CommonTable from "@components/Table/Table";
import NftLayout from "@components/Layout/NftLayout";
import CommonButton from "@components/Button/CommonButton";
import ModalLoader from "@components/Loader/ModalLoader";
import { fetchUserBalance } from "../launchpad/component/Form/AddNewProject";
import { useDispatch } from "react-redux";
import { clearTxStatus, setTxStatus } from "../../store/actions/txStatus";
import {
  BUY,
  BID,
  START,
  REMOVE_BID,
  ACCEPT_BID,
  LIST_TOKEN,
  UNLIST_TOKEN,
} from "@constants";
import useTxStatus from "../../hooks/useTxStatus";
import useForceUpdate from "../../hooks/useForceUpdate";
import { ContractPromise } from "@polkadot/api-contract";
import { delay } from "../../utils";
import { getUsernameOnchain } from "../../utils/blockchain/profile_calls";
import { AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import LockNFTModal from "@components/Modal/LockNFTModal";
import LockNFTModalMobile from "../../components/Modal/LockNFTModalMobile";

function TokenPage() {
  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { collection_address, token_id } = useParams();

  const [token, setToken] = useState(null);
  const [bidPrice, setBidPrice] = useState(1);
  const [askPrice, setAskPrice] = useState(1);
  const [bidsList, setBidsList] = useState(null);
  const [collection, setCollection] = useState(null);
  const [ownerName, setOwnerName] = useState(null);

  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlreadyBid, setIsAlreadyBid] = useState(false);

  const { actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [BUY, BID, REMOVE_BID, ACCEPT_BID, LIST_TOKEN, UNLIST_TOKEN],
    () => fetchData()
  );

  const fetchData = useCallback(
    async function () {
      try {
        setLoading(true);

        const [collectionDetails] = await APICall.getCollectionByAddress({
          collection_address,
        });
        console.log("collectionDetails", collectionDetails);
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
        const name = await getUsernameOnchain({
          accountAddress: ownerAddress,
        });
        setOwnerName(name);

        console.log("tokenDetails.ownerName", name);

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
            console.log("myBid", myBid);
            if (myBid.length) {
              const bidValue =
                (myBid[0].bidValue.replaceAll(",", "") * 1) / 10 ** 12;

              console.log("bidValue", bidValue);

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

  return (
    <NftLayout>
      <VStack minH="calc(100vh - 265px - 80px)" bg="brand.grayDark">
        {loading || loadingForceUpdate ? (
          <ModalLoader loadingTime={loadingTime || 1} />
        ) : (
          <VStack textAlign="left" w="full" p="15px">
            <Breadcrumb w="full">
              <BreadcrumbItem>
                <BreadcrumbLink
                  py="10px"
                  display="flex"
                  alignItems="center"
                  as={ReactRouterLink}
                  to={`${ROUTES.DETAIL_COLLECTION_BASE}/${collection?.nftContractAddress}`}
                >
                  <MdOutlineArrowBackIos />
                  <Heading size="h6" pl="8px">{`${collection?.name}`}</Heading>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Square size="330px">
              <Image
                w="full"
                h="full"
                alt="nft-img"
                boxShadow="lg"
                objectFit="cover"
                fallback={<Skeleton w="330px" />}
                src={getCachedImageShort(token?.avatar, 500)}
              />
            </Square>

            <Stack w="full" py="15px">
              <HStack align="center" justify="space-between" px="5px">
                <Heading fontSize="xl">{token?.nftName}</Heading>

                <Box minW="20px">
                  {!token?.is_locked &&
                    collection?.showOnChainMetadata &&
                    !isOwner && (
                      <Tooltip
                        hasArrow
                        mx="8px"
                        bg="#333"
                        color="#fff"
                        borderRadius="0"
                        label="Unlocked on-chain metadata"
                      >
                        <span
                          style={{
                            padding: "6px",
                            display: "flex",
                            alignItems: "center",
                            border: "2px solid #333333",
                          }}
                        >
                          <Icon w="14px" h="14px" as={AiOutlineUnlock} />
                        </span>
                      </Tooltip>
                    )}

                  {!token?.is_locked && !collection?.showOnChainMetadata && (
                    <Tooltip
                      hasArrow
                      mx="8px"
                      bg="#333"
                      color="#fff"
                      borderRadius="0"
                      label="Off-chain metadata"
                    >
                      <span
                        style={{
                          padding: "6px",
                          display: "flex",
                          alignItems: "center",
                          border: "2px solid #333333",
                        }}
                      >
                        <Icon w="14px" h="14px" as={AiOutlineUnlock} />
                      </span>
                    </Tooltip>
                  )}

                  {token?.is_locked && collection?.showOnChainMetadata && (
                    <Tooltip
                      hasArrow
                      mx="8px"
                      bg="#333"
                      color="#fff"
                      borderRadius="0"
                      label="Locked on-chain metadata"
                    >
                      <span
                        style={{
                          padding: "6px",
                          display: "flex",
                          alignItems: "center",
                          border: "2px solid #333333",
                        }}
                      >
                        <TagRightIcon w="14px" h="14px" as={AiOutlineLock} />
                      </span>
                    </Tooltip>
                  )}

                  {!token?.is_locked && isOwner && (
                    <>
                      <LockNFTModalMobile
                        owner={
                          token?.is_for_sale ? token?.nft_owner : token?.owner
                        }
                        nftContractAddress={token?.nftContractAddress}
                        tokenID={token?.tokenID}
                        txType="lock"
                        isDisabled={actionType}
                        showOnChainMetadata={collection?.showOnChainMetadata}
                      />
                    </>
                  )}
                </Box>
              </HStack>

              <Heading
                p="5px"
                isTruncated
                maxW="300px"
                fontSize="sm"
                lineHeight="1.35"
                color="brand.grayLight"
              >
                {token?.description}
              </Heading>

              <Text p="5px" fontSize="md">
                Owned by{" "}
                <Link
                  as={ReactRouterLink}
                  // to="/user/xxx"
                  to="#"
                  color="brand.blue"
                  textTransform="none"
                >
                  {ownerName}
                </Link>
              </Text>
            </Stack>

            <Stack w="full" p="15px 10px" border="1px solid #333">
              <>
                {token?.is_for_sale ? (
                  <HStack fontSize="md">
                    <Text>Current price</Text>
                    <Tag h={4} pr={0} bg="transparent">
                      <TagLabel bg="transparent">
                        {formatNumDynamicDecimal(token?.price / 10 ** 12)}
                      </TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                    <Spacer />
                    {!token?.is_for_sale ? (
                      <Heading size="h6">This item not for sale</Heading>
                    ) : !isOwner ? (
                      <CommonButton
                        {...rest}
                        text="buy now"
                        onClick={handleBuyAction}
                        isDisabled={actionType && actionType !== BUY}
                      />
                    ) : null}
                    {/* TODO: update bid price */}
                  </HStack>
                ) : null}
              </>
              {/* 1. owner is true
                - for sale -> unlist/cancel
                - not sale -> list */}
              {isOwner ? (
                <Stack>
                  {token?.is_for_sale ? (
                    <HStack>
                      <CommonButton
                        mx="0"
                        {...rest}
                        text="cancel sale"
                        onClick={handleUnlistTokenAction}
                        isDisabled={actionType && actionType !== UNLIST_TOKEN}
                      />
                      {/* <Spacer />
                      <Box h="52px" textAlign="right" color="brand.grayLight">
                        <Text>Your offer</Text>
                        <Tag h={4} pr={0} bg="transparent">
                          <TagLabel bg="transparent">{bidPrice}</TagLabel>
                          <TagRightIcon as={AzeroIcon} />
                        </Tag>
                      </Box> */}
                    </HStack>
                  ) : (
                    <HStack>
                      <NumberInput
                        minW={"85px"}
                        isDisabled={actionType}
                        bg="black"
                        max={999000000}
                        min={1}
                        precision={6}
                        onChange={(v) => setAskPrice(v)}
                        value={askPrice}
                        ml={3}
                        h="50px"
                      >
                        <NumberInputField
                          textAlign="end"
                          h="52px"
                          borderRadius={0}
                          borderWidth={0}
                          color="#fff"
                        />
                        <InputRightElement bg="transparent" h={"50px"} w={8}>
                          <AzeroIcon />
                        </InputRightElement>
                      </NumberInput>

                      <Spacer />

                      <CommonButton
                        mx="0"
                        {...rest}
                        text="push for sale"
                        onClick={handleListTokenAction}
                        isDisabled={actionType && actionType !== LIST_TOKEN}
                      />
                    </HStack>
                  )}
                </Stack>
              ) : null}

              {/*
              2. not owner
              - for sale -> buy now/ place bid
              - not sale - Not for sale
              */}
              {!isOwner ? (
                <Stack>
                  {!token?.is_for_sale ? (
                    <Heading size="h6">This item not for sale</Heading>
                  ) : isAlreadyBid ? (
                    <HStack>
                      <CommonButton
                        mx="0"
                        {...rest}
                        text="remove bid"
                        onClick={handleRemoveBidAction}
                        isDisabled={actionType && actionType !== REMOVE_BID}
                      />
                      <Spacer />
                      <Box h="52px" textAlign="right" color="brand.grayLight">
                        <Text>Your offer</Text>
                        <Tag h={4} pr={0} bg="transparent">
                          <TagLabel bg="transparent">{bidPrice}</TagLabel>
                          <TagRightIcon as={AzeroIcon} />
                        </Tag>
                      </Box>
                    </HStack>
                  ) : (
                    <HStack>
                      <NumberInput
                        minW={"85px"}
                        isDisabled={actionType}
                        bg="black"
                        max={999000000}
                        min={1}
                        precision={6}
                        onChange={(v) => setBidPrice(v)}
                        value={bidPrice}
                        ml={3}
                        h="50px"
                      >
                        <NumberInputField
                          textAlign="end"
                          h="52px"
                          borderRadius={0}
                          borderWidth={0}
                          color="#fff"
                        />
                        <InputRightElement bg="transparent" h={"50px"} w={8}>
                          <AzeroIcon />
                        </InputRightElement>
                      </NumberInput>

                      <Spacer />

                      <CommonButton
                        mx="0"
                        {...rest}
                        text="place bid"
                        onClick={handleBidAction}
                        isDisabled={actionType && actionType !== BID}
                      />
                    </HStack>
                  )}
                </Stack>
              ) : null}
            </Stack>

            <Stack w="full" py="15px">
              <Heading pl="4px" fontSize="xl">
                attributes
              </Heading>{" "}
              {token?.attrsList?.length === 0 ? (
                <Text textAlign="center" py="2rem">
                  This NFT have no props/ levels.
                </Text>
              ) : (
                <Grid
                  pr="10px"
                  h="255px"
                  w="full"
                  gap="15px"
                  boxShadow="lg"
                  id="grid-attrs"
                  overflowY="auto"
                  templateColumns={`repeat(auto-fill, minmax(min(100%, 128px), 1fr))`}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                      height: "4px",
                      borderRadius: "0px",
                      backgroundColor: `transparent`,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: `#7ae7ff`,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: `#7ae7ff`,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: `transparent`,
                    },
                  }}
                >
                  {token?.attrsList
                    .filter(
                      (i) => !JSON.stringify(Object.values(i)).includes("|")
                    )
                    .map((item, idx) => {
                      return (
                        <GridItem w="100%" h="100%" key={idx}>
                          <Box
                            w="full"
                            px="10px"
                            py="12px"
                            textAlign="left"
                            alignItems="end"
                            bg="brand.semiBlack"
                          >
                            <Flex w="full" pb="15px">
                              <Box color="brand.grayLight" w="full">
                                <Text>{Object.keys(item)[0]}</Text>
                                {/* <Heading
                                  textAlign="right"
                                  size="h6"
                                  mt={1}
                                  // minH="2.5rem"
                                  isTruncated
                                  maxW={"10rem"}
                                  fontSize={{
                                    base: "0.875rem",
                                    "2xl": "1rem",
                                  }}
                                  pr={1}
                                >
                                  {" "}
                                </Heading> */}
                              </Box>
                              <Spacer />
                            </Flex>
                            <Flex w="full" color="#7AE7FF">
                              <Spacer />
                              <Text
                                isTruncated
                                pr={1}
                                fontStyle="italic"
                                fontSize="15px"
                              >
                                {Object.values(item)[0]}
                              </Text>
                            </Flex>
                          </Box>{" "}
                        </GridItem>
                      );
                    })}

                  {token?.attrsList
                    .filter((i) =>
                      JSON.stringify(Object.values(i)).includes("|")
                    )
                    .map((item, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Box
                            w="full"
                            textAlign="left"
                            alignItems="end"
                            bg="brand.semiBlack"
                            px={{ base: "0.5rem", "2xl": "1rem" }}
                            py={2}
                            // my={2}
                            minW="30%"
                            maxH={"4.625rem"}
                          >
                            <Flex w="full" my={2}>
                              <Heading
                                size="h6"
                                mt={1}
                                color="#fff"
                                fontSize={{
                                  base: "1rem",
                                  "2xl": "1.125rem",
                                }}
                              >
                                {Object.keys(item)[0]}
                              </Heading>

                              <Spacer />
                              <Text color="#fff">
                                {
                                  createLevelAttribute(Object.values(item)[0])
                                    .level
                                }{" "}
                                of{" "}
                                {
                                  createLevelAttribute(Object.values(item)[0])
                                    .levelMax
                                }
                              </Text>
                            </Flex>

                            <Progress
                              colorScheme="telegram"
                              size="sm"
                              value={Number(
                                (createLevelAttribute(Object.values(item)[0])
                                  .level *
                                  100) /
                                  createLevelAttribute(Object.values(item)[0])
                                    .levelMax
                              )}
                              height="6px"
                            />
                          </Box>
                        </React.Fragment>
                      );
                    })}
                </Grid>
              )}
            </Stack>

            <Stack hidden={!token?.is_for_sale} w="full" py="15px">
              <Heading pl="4px" fontSize="xl">
                Offers List
              </Heading>{" "}
              {bidsList?.length === 0 ? (
                <Text textAlign="center" py="2rem">
                  There is no bid yet.
                </Text>
              ) : (
                <CommonTable
                  shadow="lg"
                  isOwner={isOwner}
                  tableData={bidsList}
                  tableHeaders={headers}
                  // onClickHandler={acceptBid}
                  // saleInfo={saleInfo}
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

const buyToken = async (
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
  console.log("wallet connected OK");
  //check owner of the NFT
  if (isOwner) {
    toast.error(`Can not buy your own NFT!`);
    return;
  }
  console.log("not owner OK");

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

const placeBid = async (
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
  console.log("wallet connected OK");
  //check owner of the NFT
  if (isOwner) {
    toast.error(`Can not bid your own NFT!`);
    return;
  }
  console.log("not owner OK");

  // check balance
  const { balance } = await fetchUserBalance({ currentAccount, api });
  console.log("balance", balance);
  console.log("bidPrice", bidPrice);

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

const removeBid = async (
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
  console.log("wallet connected OK");

  // check balance
  const { balance } = await fetchUserBalance({ currentAccount, api });
  console.log("balance", balance);

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

const listToken = async (
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

    console.log("res", res);
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

const unlistToken = async (
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
