import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  GridItem,
  Heading,
  HStack,
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
  Flex,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TiArrowBackOutline } from "react-icons/ti";

import toast from "react-hot-toast";
import {
  Link as ReactRouterLink,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";

import { APICall } from "@api/client";
import { useSubstrateState } from "@utils/substrate";

import {
  formatNumDynamicDecimal,
  getPublicCurrentAccount,
  getTraitCount,
} from "@utils";
import { getNFTDetails } from "@utils/blockchain/nft721-psp34-standard-calls";
import marketplace from "@utils/blockchain/marketplace";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import staking_calls from "@utils/blockchain/staking_calls";

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
  LOCK,
  TRANSFER,
  EDIT_NFT,
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
import { Helmet } from "react-helmet";
import ImageCloudFlare from "../../components/ImageWrapper/ImageCloudFlare";
import SocialShare from "@components/SocialShare/SocialShare";
import CommonTabs from "@components/Tabs/CommonTabs";
import OwnershipHistory from "../collection/component/Tab/OwnershipHistory";
import TxHistory from "../collection/component/Tab/TxHistory";
import MyNFTOffer from "@pages/account/nfts/components/Tabs/MyNFTOffers";
import { MAX_BID_COUNT } from "../../constants";
import useEditBidPrice from "@hooks/useEditBidPrice";
import { isMobile } from "react-device-detect";

function TokenPage() {
  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { collection_address, token_id } = useParams();
  const history = useHistory();
  const { state } = useLocation();

  const [token, setToken] = useState(null);
  const [bidPrice, setBidPrice] = useState(1);
  const [askPrice, setAskPrice] = useState(1);
  // const [bidsList, setBidsList] = useState(null);
  const [collection, setCollection] = useState(null);
  const [ownerName, setOwnerName] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [myTradingFee, setMyTradingFee] = useState(null);
  const [feeCalculated, setFeeCalculated] = useState(null);

  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAlreadyBid, setIsAlreadyBid] = useState(false);

  const [bidderCount, setBidderCount] = useState(0);

  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [
      BUY,
      BID,
      REMOVE_BID,
      ACCEPT_BID,
      LIST_TOKEN,
      UNLIST_TOKEN,
      LOCK,
      TRANSFER,
      EDIT_NFT,
      "UPDATE_BID_PRICE",
    ],
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

        const {
          ret: [collectionDetails],
        } = await APICall.getCollectionByAddress({
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
        tokenDetails.attrsList = !tokenDetails?.traits
          ? {}
          : Object.entries(tokenDetails?.traits).map(([k, v]) => {
              return { [k]: v };
            });
        // get username onchain if any
        const name = truncateStr(ownerAddress);
        setOwnerName(name);
        setOwnerAddress(ownerAddress);
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
          setBidderCount(listBidder?.length || 0);
          if (listBidder?.length) {
            //sort highest price first
            listBidder.sort((a, b) => {
              return (
                b.bidValue?.replaceAll(",", "") * 1 -
                a.bidValue?.replaceAll(",", "") * 1
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
                (myBid[0].bidValue?.replaceAll(",", "") * 1) / 10 ** 12;

              setBidPrice(bidValue);
              setIsAlreadyBid(true);
            } else {
              listBidder = [];
              setBidPrice(1);
              setIsAlreadyBid(false);
            }
          } else {
            listBidder = [];
            setBidPrice(1);
            setIsAlreadyBid(false);
          }
        }

        setToken(tokenDetails);
        // setBidsList(listBidder);
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
    if (bidderCount > MAX_BID_COUNT) {
      toast.error(`This NFT had reached max ${MAX_BID_COUNT} bids!`);
      return;
    }

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

  // const handleAcceptBidAction = async (bidId) => {
  //   try {
  //     await acceptBid(
  //       api,
  //       currentAccount,
  //       isOwner,
  //       token?.nftContractAddress,
  //       token?.tokenID,
  //       bidId,
  //       dispatch
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.message);
  //     dispatch(clearTxStatus());
  //   }
  // };

  useEffect(() => {
    let p = askPrice;

    if (token?.is_for_sale) {
      p = token?.price / 1000000000000;
    }

    const info = calculateFee(p, collection?.royaltyFee, myTradingFee);

    setFeeCalculated(info);
  }, [
    askPrice,
    collection?.royaltyFee,
    myTradingFee,
    token?.is_for_sale,
    token?.price,
  ]);

  const iconWidth = useBreakpointValue(["40px", "50px"]);
  const imageUrl = token?.avatar?.replace("ipfs://", "https://ipfs.io/ipfs/");
  const gridSize = useBreakpointValue({ base: `8rem`, md: `11rem` });

  const tabsData = [
    {
      label: "offers",
      component: <MyNFTOffer {...token} {...collection} />,
      isDisabled: actionType || !token?.is_for_sale,
    },
    {
      label: "owner history",
      component: <OwnershipHistory {...token} {...collection} />,
      isDisabled: actionType,
    },
    {
      label: "tx history",
      component: <TxHistory {...token} {...collection} />,
      isDisabled: actionType,
    },
  ];

  return (
    <NftLayout>
      <Helmet>
        <title>{token?.nftName}</title>

        {/* <!-- Google / Search Engine Tags --> */}

        <meta itemprop="image" content={imageUrl} />

        {/* <!-- Facebook Meta Tags --> */}

        <meta property="og:image" content={imageUrl} />

        <meta property="og:url" content={window.location.href} />

        {/* <!-- Twitter Meta Tags --> */}

        <meta name="twitter:image" content={imageUrl} />

        <meta property="twitter:url" content={window.location.href} />
      </Helmet>

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
              px={["20px", "8px"]}
              maxW={["full", "1160px"]}
            >
              <Breadcrumb w="full">
                <BreadcrumbItem isCurrentPage>
                  <HStack
                    cursor="pointer"
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      if (!state?.pathname) {
                        history.push({
                          state: { selectedItem: state?.selectedItem },
                          pathname: `/collection/` + token?.nftContractAddress,
                        });
                        return;
                      }

                      history.push({
                        state: { selectedItem: state?.selectedItem },
                        pathname: state?.pathname,
                        search: state?.search,
                      });
                    }}
                  >
                    <TiArrowBackOutline />
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
              <Stack minW={["auto", "484px"]}>
                <ImageCloudFlare
                  size={500}
                  maxH={["375px", "484px"]}
                  maxW={["375px", "484px"]}
                  objectFitContain={true}
                  src={token?.avatar}
                />

                <Stack spacing="5px" w="full">
                  <Heading fontSize={["xl", "3xl"]} isTruncated>
                    {token?.nftName}
                  </Heading>

                  <Text
                    maxW={["330px", "600px"]}
                    fontSize="lg"
                    color="brand.grayLight"
                  >
                    {token?.description}
                  </Text>

                  <Text>
                    Owned by{" "}
                    <Link
                      // to="/user/xxx"
                      to={`/public-account/collections/${ownerAddress}`}
                      color="brand.blue"
                      textTransform="none"
                      textDecoration="underline"
                      as={ReactRouterLink}
                    >
                      {ownerName}
                    </Link>
                  </Text>
                </Stack>

                <HStack
                  py="20px"
                  spacing="10px"
                  justify="start"
                  display={["none", "flex"]}
                >
                  {!token?.is_locked &&
                    collection?.showOnChainMetadata &&
                    isOwner && (
                      <AddNewNFTModal
                        mode={formMode.EDIT}
                        isDisabled={token?.is_for_sale || actionType}
                        totalNftCount={collection?.nft_count}
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

                  <SocialShare
                    title={token?.nftName}
                    shareUrl={window.location.href}
                  />
                </HStack>
              </Stack>

              {/* Mobile */}
              <HStack display={["flex", "none"]} spacing="10px" justify="start">
                {!token?.is_locked &&
                  collection?.showOnChainMetadata &&
                  isOwner && (
                    <AddNewNFTModal
                      mode={formMode.EDIT}
                      isDisabled={token?.is_for_sale || actionType}
                      totalNftCount={collection?.nft_count}
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

                <SocialShare
                  width="40px"
                  height="40px"
                  title={token?.nftName}
                  shareUrl={window.location.href}
                />
              </HStack>

              <Stack
                w="full"
                spacing="0px"
                px={["0px"]}
                minW={["auto", "650px"]}
              >
                <Stack hidden spacing="5px" w="full">
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
                      to={`/public-account/collections/${ownerAddress}`}
                      color="brand.blue"
                      textTransform="none"
                      textDecoration="underline"
                      as={ReactRouterLink}
                    >
                      {ownerName}
                    </Link>
                  </Text>
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
                        templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
                      >
                        {token?.attrsList
                          ?.filter(
                            (i) =>
                              !JSON.stringify(Object.values(i)).includes("|")
                          )
                          .map((item, idx) => {
                            return (
                              <GridItem w="100%" h="100%" key={idx}>
                                <PropCard
                                  item={item}
                                  traitCount={getTraitCount(
                                    collection?.rarityTable,
                                    item
                                  )}
                                  totalNftCount={
                                    collection?.maxTotalSupply ||
                                    collection?.nft_count
                                  }
                                />
                              </GridItem>
                            );
                          })}

                        {token?.attrsList
                          ?.filter((i) =>
                            JSON.stringify(Object.values(i)).includes("|")
                          )
                          .map((item, idx) => {
                            return (
                              <GridItem w="100%" h="100%" key={idx}>
                                <LevelCard
                                  item={item}
                                  traitCount={getTraitCount(
                                    collection?.rarityTable,
                                    item
                                  )}
                                  totalNftCount={
                                    collection?.maxTotalSupply ||
                                    collection?.nft_count
                                  }
                                />
                              </GridItem>
                            );
                          })}
                      </Grid>
                    </div>
                  )}
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
                              isDisabled={!collection?.isActive || actionType}
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
                                !collection?.isActive ||
                                (actionType && actionType !== LIST_TOKEN)
                              }
                            />
                          </HStack>
                        </Stack>
                      </Stack>

                      <Stack w="full">
                        {collection?.isActive && (
                          <FeeCalculatedBar feeCalculated={feeCalculated} />
                        )}
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
                            <Flex
                              w="50%"
                              justifyContent={["end"]}
                              direction={["column", "row"]}
                              alignItems={["end", "baseline"]}
                            >
                              <Text color="#888">Current price</Text>

                              <Tag minH="20px" pr={0} bg="transparent">
                                <TagLabel bg="transparent">
                                  {formatNumDynamicDecimal(
                                    token?.price / 10 ** 12
                                  )}
                                </TagLabel>
                                <TagRightIcon as={AzeroIcon} w="14px" />
                              </Tag>
                            </Flex>
                          </HStack>
                        </Stack>
                      </Stack>

                      <Stack w="full">
                        {collection?.isActive && (
                          <FeeCalculatedBar feeCalculated={feeCalculated} />
                        )}
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

                          <Flex
                            w="50%"
                            justifyContent={["end"]}
                            direction={["column", "row"]}
                            alignItems={["end", "baseline"]}
                          >
                            <Text color="#888">Current price</Text>

                            <Tag minH="20px" pr={0} bg="transparent">
                              <TagLabel bg="transparent">
                                {formatNumDynamicDecimal(
                                  token?.price / 10 ** 12
                                )}
                              </TagLabel>
                              <TagRightIcon as={AzeroIcon} w="14px" />
                            </Tag>
                          </Flex>
                        </HStack>
                      </Stack>
                      {isAlreadyBid ? (
                        <HStack spacing="20px" p="20px" border="1px solid #333">
                          <Flex justify="center" w={["75%", "50%"]}>
                            <CommonButton
                              h="40px"
                              minW="fit-content"
                              w="full"
                              {...rest}
                              text={isMobile ? "remove bid" : "remove bid"}
                              onClick={handleRemoveBidAction}
                              isDisabled={
                                actionType && actionType !== REMOVE_BID
                              }
                            />

                            <MobileEditBidPriceModal {...token} />
                          </Flex>

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
                              min={0.01}
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
                {/* <Stack
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
                </Stack> */}
              </Stack>
            </Stack>

            <Stack px="20px" maxW="1200" w="full">
              <CommonTabs tabsData={tabsData} />
            </Stack>
          </VStack>
        )}
      </VStack>
    </NftLayout>
  );
}

export default TokenPage;

// const headers = ["address", "time", "price", "action"];

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

  if (parseFloat(bidPrice) >= askPrice / 10 ** 12) {
    toast.error(`Bid amount must be less than current price!`);
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

export const calculateFee = (askPrice, royaltyFee, myTradingFee) => {
  // price 99000000000000 -> price of LISTED item MUST div 10*12

  // askPrice 99.000000 ~ 99 Azero
  // royaltyFee 450 ~ 4.5%
  // myTradingFee 5.00 ~ 5%

  const royaltyFeePercent = royaltyFee / 100;
  const royaltyFeeAmount = (askPrice * royaltyFeePercent) / 100;

  const tradeFeePercent = Number(myTradingFee);
  const tradeFeeAmount = (askPrice * tradeFeePercent) / 100;

  const userPortionPercent = 100 - royaltyFeePercent - tradeFeePercent;
  const userPortionAmount = askPrice - royaltyFeeAmount - tradeFeeAmount;

  const ret = {
    royaltyFeePercent: royaltyFeePercent.toFixed(2),
    royaltyFeeAmount: formatNumDynamicDecimal(royaltyFeeAmount),
    tradeFeePercent: tradeFeePercent.toFixed(2),
    tradeFeeAmount: formatNumDynamicDecimal(tradeFeeAmount),
    userPortionPercent: userPortionPercent.toFixed(2),
    userPortionAmount: formatNumDynamicDecimal(userPortionAmount),
  };

  return ret;
};

export const FeeCalculatedBar = ({ feeCalculated }) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      borderTop="1px solid #282828"
      // pt={["10px", "20px"]}
    >
      <VStack alignItems="start">
        <Text fontSize={{ base: "13px", md: "16px" }}>
          <Text as="span" color="brand.grayLight">
            Royalty fee:
          </Text>{" "}
          ({feeCalculated.royaltyFeePercent}%)
        </Text>

        <Text color="#fff">
          {feeCalculated.royaltyFeeAmount} <AzeroIcon w="12px" mb="2px" />
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

function MobileEditBidPriceModal({
  tokenID,
  nftContractAddress,
  nft_owner,
  price,
  owner,
  is_for_sale,
}) {
  const { api, currentAccount } = useSubstrateState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newBidPrice, setNewBidPrice] = useState("");
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const { doUpdateBidPrice } = useEditBidPrice({
    newBidPrice,
    tokenID,
    nftContractAddress,
    sellerAddress: nft_owner,
  });

  const handleUpdateBidPrice = async () => {
    // check wallet connected
    if (!currentAccount) {
      toast.error("Please connect wallet first!");
      return;
    }
    const ownerAddress = is_for_sale ? nft_owner : owner;
    //check owner of the NFT
    if (ownerAddress === currentAccount) {
      toast.error(`Can not bid your own NFT!`);
      return;
    }

    // check balance
    const { balance } = await fetchUserBalance({ currentAccount, api });

    if (balance < newBidPrice) {
      toast.error(`Not enough balance!`);
      return;
    }

    //check bidPrice
    if (parseFloat(newBidPrice) <= 0) {
      toast.error(`Bid price must greater than zero!`);
      return;
    }

    if (parseFloat(newBidPrice) >= price / 10 ** 12) {
      toast.error(`Bid amount must be less than current price!`);
      return;
    }

    doUpdateBidPrice();
  };

  useEffect(() => {
    rest.step === "Finalized" && onClose();
  }, [onClose, rest.step]);

  return (
    <>
      <Button
        maxW="50px"
        minW="fit-content"
        fontSize={["13px", "15px"]}
        isDisabled={actionType && actionType !== "UPDATE_BID_PRICE"}
        h="40px"
        onClick={() => onOpen()}
      >
        {isMobile ? "edit" : "edit price"}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} size={"sm"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="500">Edit bid price</ModalHeader>
          <ModalCloseButton onClick={() => setNewBidPrice("")} />
          <ModalBody>
            <Flex
              py="16px"
              w="full"
              justify="center"
              textAlign="right"
              flexDirection={["row"]}
            >
              <CommonButton
                maxW="fit-content"
                minW="fit-content"
                w="full"
                h="40px"
                mx="0"
                px="12px"
                {...rest}
                text="submit"
                onClick={handleUpdateBidPrice}
                isDisabled={
                  !newBidPrice ||
                  (actionType && actionType !== "UPDATE_BID_PRICE")
                }
              />

              <Text ml={4} mr={1} my="auto" w="100px">
                New bid
              </Text>

              <NumberInput
                ml="8px"
                maxW={"120px"}
                isDisabled={actionType}
                bg="black"
                max={999000000}
                min={0}
                precision={6}
                onChange={(v) => {
                  console.log("v", v);
                  if (/[eE+-]/.test(v)) return;

                  setNewBidPrice(v);
                }}
                value={newBidPrice}
                h="40px"
              >
                <NumberInputField
                  textAlign="right"
                  h="40px"
                  borderRadius={0}
                  borderWidth={0}
                  color="#fff"
                  placeholder="0"
                />
                <InputRightElement bg="transparent" h="40px" w="32px">
                  <AzeroIcon w="12px" />
                </InputRightElement>
              </NumberInput>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
