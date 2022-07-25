/* eslint-disable no-unused-vars */
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  InputRightElement,
  Link,
  NumberInput,
  NumberInputField,
  Progress,
  Skeleton,
  Spacer,
  Square,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { ImLock, ImUnlocked } from "react-icons/im";

import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import BN from "bn.js";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  truncateStr,
  getCachedImageShort,
  convertStringToPrice,
  createLevelAttribute,
  getPublicCurrentAccount,
  formatNumDynamicDecimal,
} from "@utils";

import { useSubstrateState } from "@utils/substrate";

import profile_calls from "@utils/blockchain/profile_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import { formMode } from "@constants";
import { AccountActionTypes } from "@store/types/account.types";

import LockNFTModal from "@components/Modal/LockNFTModal";
import StatusBuyButton from "@components/Button/StatusBuyButton";

import AddNewNFTModal from "../Modal/AddNewNFT";
import { SCROLLBAR } from "../../../../constants";

const NFTTabCollectible = (props) => {
  const {
    nftContractAddress,
    description,
    nftName,
    owner,
    is_for_sale,
    avatar,
    tokenID,
    price,
    attrsList,
    is_locked,
    showOnChainMetadata,
  } = props;

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const publicCurrentAccount = getPublicCurrentAccount();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);
  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

  const [doOffer, setDoOffer] = useState(false);
  const [bidPrice, setBidPrice] = useState(1);
  const [, setIsLoaded] = useState(false);
  const [isBided, setIsBided] = useState(false);
  const [saleInfo, setSaleInfo] = useState(null);
  const [action, setAction] = useState("");
  const [ownerName, setOwnerName] = useState("");

  // const [isOfferBtnFocus, setIsOfferBtnFocus] = useState(false);

  useEffect(() => {
    const doLoad = async () => {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount || publicCurrentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);

      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount || publicCurrentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        if (listBidder) {
          for (const item of listBidder) {
            if (item.bidder === currentAccount?.address) {
              setIsBided(true);
              setBidPrice(convertStringToPrice(item.bidValue));
            }
          }
        } else {
          // console.log(
          //   "Detail NFTTabCollectible doLoad. => listBidder is: ",
          //   listBidder
          // );
        }
      }

      setIsLoaded(true);
    };
    !saleInfo && doLoad();
  }, [
    api,
    currentAccount,
    nftContractAddress,
    publicCurrentAccount,
    saleInfo,
    tokenID,
  ]);

  const buyToken = async () => {
    if (!currentAccount) {
      return toast.error("Please connect wallet first!");
    }
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    //check owner of the NFT from marketplace
    if (saleInfo.nftOwner === currentAccount?.address) {
      toast.error(`Cant buy your own NFT!`);
      return;
    }

    if (balance.free.gte(new BN(price / 10 ** 6).mul(new BN(10 ** 6)))) {
      setAction("buy");

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });
      await marketplace_contract_calls.buy(
        currentAccount,
        nftContractAddress,
        saleInfo.nftOwner,
        { u64: tokenID },
        price,
        dispatch
      );
    } else {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      setAction("");
      toast.error(`Not Enough Balance!`);
    }
  };

  const removeBid = async () => {
    try {
      setAction("remove bid");

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });

      await marketplace_contract_calls.removeBid(
        currentAccount,
        nftContractAddress,
        saleInfo.nftOwner,
        { u64: tokenID },
        dispatch
      );
      // setIsBided(false);
      // setBidPrice(0);
    } catch (error) {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      setAction("");
      toast.error(error);
    }
  };

  const placeOffer = async () => {
    if (!currentAccount) {
      return toast.error("Please connect wallet first!");
    }

    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    //check owner of the NFT from marketplace
    if (saleInfo.nftOwner === currentAccount?.address) {
      toast.error(`Cant bid your own NFT!`);
      return;
    }

    if (parseFloat(bidPrice) <= 0) {
      toast.error(`The bid price must greater than 0!`);
      return;
    }

    if (balance.free.gte(new BN(bidPrice * 10 ** 6).mul(new BN(10 ** 6)))) {
      if (
        new BN(bidPrice * 10 ** 6)
          .mul(new BN(10 ** 6))
          .gte(new BN(price / 10 ** 6).mul(new BN(10 ** 6)))
      ) {
        toast.error(`Bid Amount must less than Selling Price`);
        return;
      }

      setAction("offer");

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });
      await marketplace_contract_calls.bid(
        currentAccount,
        nftContractAddress,
        saleInfo.nftOwner,
        { u64: tokenID },
        bidPrice,
        dispatch
      );
    } else {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      setAction("");
      toast.error(`Not Enough Balance!`);
    }

    setDoOffer(false);
  };

  useEffect(() => {
    const ownerName = async () => {
      const accountAddress = is_for_sale ? saleInfo?.nftOwner : owner;

      const {
        data: { username },
      } = await profile_calls.getProfileOnChain({
        callerAccount: publicCurrentAccount,
        accountAddress,
      });

      return setOwnerName(username || truncateStr(accountAddress, 6));
    };

    ownerName();
  }, [
    currentAccount,
    is_for_sale,
    owner,
    publicCurrentAccount,
    saleInfo?.nftOwner,
  ]);

  return (
    <>
      <Stack
        alignItems="stretch"
        direction={{ base: "column", xl: "row" }}
        spacing={["15px", "30px", "40px"]}
      >
        <Square size={{ base: "272px", xl: "360px", "2xl": "480px" }}>
          <Image
            w="full"
            h="full"
            boxShadow="lg"
            alt="nft-img"
            objectFit="cover"
            src={avatar && getCachedImageShort(avatar, 500)}
            fallback={<Skeleton minW={{ base: "360px", "2xl": "480px" }} />}
          />
        </Square>

        <Stack alignItems="flex-start" w="full">
          <HStack>
            <Heading color="#fff" fontSize={["xl", "3xl-mid", "3xl-mid"]}>
              {nftName}
            </Heading>

            <Spacer />

            <HStack
              pos="absolute"
              top={{
                base: `10px`,
                xl: `20px`,
              }}
              right={{
                base: `50px`,
                xl: `20px`,
              }}
            >
              {!is_locked &&
                showOnChainMetadata &&
                owner !== currentAccount?.address && (
                  <Tooltip
                    hasArrow
                    label="Unlocked on-chain metadata"
                    bg="gray.300"
                    color="black"
                  >
                    <span>
                      <TagRightIcon ml="6px" as={ImUnlocked} size="22px" />
                    </span>
                  </Tooltip>
                )}

              {!is_locked && !showOnChainMetadata && (
                <Tooltip
                  hasArrow
                  label="Off-chain metadata"
                  bg="gray.300"
                  color="black"
                >
                  <span>
                    <TagRightIcon ml="6px" as={ImUnlocked} size="22px" />
                  </span>
                </Tooltip>
              )}

              {is_locked && showOnChainMetadata && (
                <Tooltip
                  hasArrow
                  label="Locked on-chain metadata"
                  bg="gray.300"
                  color="black"
                >
                  <span>
                    <TagRightIcon ml="6px" as={ImLock} size="22px" />
                  </span>
                </Tooltip>
              )}

              {!is_locked && owner === currentAccount?.address && (
                <LockNFTModal {...props} />
              )}
            </HStack>

            {!is_locked &&
              showOnChainMetadata &&
              owner === currentAccount.address && (
                <AddNewNFTModal mode={formMode.EDIT} {...props} />
              )}
          </HStack>

          <Stack>
            <Heading
              isTruncated
              maxW={{ base: "260px", xl: "500px", "2xl": "610px" }}
              size="h6"
              pt={{ base: "6px", "2xl": "12px" }}
              fontSize={["xs", "md", "md"]}
              color="brand.grayLight"
              lineHeight="1.35"
            >
              {description}
            </Heading>
          </Stack>

          <Stack>
            <Skeleton as="span" isLoaded={ownerName} minW="150px">
              <Text
                color="#fff"
                maxW="max-content"
                pt={{ base: "6px", "2xl": "12px" }}
                fontSize={{ base: "14px", "2xl": "16px" }}
              >
                Owned by{" "}
                <Link
                  as={ReactRouterLink}
                  // to="/user/xxx"
                  to="#"
                  color="#7AE7FF"
                  textTransform="capitalize"
                >
                  {ownerName}
                </Link>
              </Text>
            </Skeleton>
          </Stack>

          <Stack w="full">
            <Stack w="full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* is_for_sale true  no sale*/}
                {!is_for_sale && currentAccount?.address !== owner ? (
                  <Flex alignItems="center" pt="8px">
                    <Heading size="h6">Not for sale</Heading>
                  </Flex>
                ) : null}

                <Stack
                  display={
                    saleInfo &&
                    is_for_sale &&
                    currentAccount?.address !== saleInfo?.nftOwner
                      ? "flex"
                      : "none"
                  }
                  direction={{ base: "column", xl: "row" }}
                  w="full"
                  h="92px"
                  py={2}
                  my={{ base: "8px", xl: "2px", "2xl": "22px" }}
                  pr={{ base: "0", "2xl": "28px" }}
                >
                  {is_for_sale &&
                    saleInfo &&
                    currentAccount?.address !== saleInfo?.nftOwner && (
                      <>
                        <Flex
                          mr="22px"
                          w="full"
                          alignItems="center"
                          borderColor="#343333"
                          px={["8px", "16px"]}
                          borderWidth={2}
                          minH={["4.15rem", "4.75rem", "4.75rem"]}
                        >
                          <StatusBuyButton
                            shouldDisabled={
                              addNftTnxStatus?.status &&
                              action &&
                              action !== "buy"
                            }
                            isDisabled={true}
                            isDo={action === "buy"}
                            type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                            text="buy"
                            isLoading={addNftTnxStatus}
                            loadingText={`${addNftTnxStatus?.status}`}
                            onClick={buyToken}
                          />

                          <Spacer />

                          <Flex w="full">
                            <Spacer />

                            <Flex w="full">
                              <Spacer />
                              <Box
                                h="52px"
                                textAlign="right"
                                color="brand.grayLight"
                              >
                                <Text>Current price</Text>
                                <Tag h={4} pr={0} bg="transparent" maxW="95px">
                                  <TagLabel bg="transparent">
                                    <Tooltip
                                      bg="#171717"
                                      color="#fff"
                                      border="1px solid #7ae7ff"
                                      borderRadius="0"
                                      label={formatNumDynamicDecimal(
                                        price / 10 ** 12
                                      )}
                                      aria-label="A tooltip"
                                    >
                                      {formatNumDynamicDecimal(
                                        price / 10 ** 12
                                      )}
                                    </Tooltip>
                                  </TagLabel>
                                  <TagRightIcon as={AzeroIcon} />
                                </Tag>
                              </Box>
                            </Flex>
                          </Flex>
                        </Flex>
                        {!doOffer && is_for_sale && (
                          <Flex
                            mr="30px"
                            w="full"
                            alignItems="center"
                            borderColor="#333"
                            px={["8px", "16px"]}
                            py={1}
                            id="ac"
                            borderWidth={2}
                            minH={["4.15rem", "4.75rem", "4.75rem"]}
                          >
                            {!isBided && (
                              <>
                                <StatusBuyButton
                                  // isOfferBtnFocus={isOfferBtnFocus}
                                  shouldDisabled={
                                    addNftTnxStatus?.status &&
                                    action &&
                                    action !== "offer"
                                  }
                                  isDo={action === "offer"}
                                  type={
                                    AccountActionTypes.SET_ADD_NFT_TNX_STATUS
                                  }
                                  text="offer"
                                  isLoading={addNftTnxStatus}
                                  loadingText={`${addNftTnxStatus?.status}`}
                                  onClick={placeOffer}
                                />

                                <NumberInput
                                  // maxW={"128px"}
                                  minW={"85px"}
                                  isDisabled={addNftTnxStatus?.status}
                                  bg="black"
                                  max={999000000}
                                  min={1}
                                  precision={6}
                                  onChange={(v) => setBidPrice(v)}
                                  value={bidPrice}
                                  ml={3}
                                  h="50px"
                                  // onFocus={() => setIsOfferBtnFocus(true)}
                                  // onBlur={() => setIsOfferBtnFocus(false)}
                                >
                                  <NumberInputField
                                    h="50px"
                                    borderRadius={0}
                                    borderWidth={0}
                                    color="#fff"
                                  />
                                  <InputRightElement
                                    bg="transparent"
                                    h={"50px"}
                                    w={8}
                                  >
                                    <AzeroIcon />
                                  </InputRightElement>
                                </NumberInput>
                              </>
                            )}

                            {isBided && (
                              <>
                                <StatusBuyButton
                                  shouldDisabled={
                                    addNftTnxStatus?.status &&
                                    action &&
                                    action !== "remove bid"
                                  }
                                  isDo={action === "remove bid"}
                                  type={
                                    AccountActionTypes.SET_ADD_NFT_TNX_STATUS
                                  }
                                  text="remove bid"
                                  isLoading={addNftTnxStatus}
                                  loadingText={`${addNftTnxStatus?.status}`}
                                  onClick={removeBid}
                                />

                                <Spacer />
                                <Box
                                  h="52px"
                                  textAlign="right"
                                  color="brand.grayLight"
                                >
                                  <Text>Your offer</Text>
                                  <Tag h={4} pr={0} bg="transparent">
                                    <TagLabel bg="transparent">
                                      {bidPrice}
                                    </TagLabel>
                                    <TagRightIcon as={AzeroIcon} />
                                  </Tag>
                                </Box>
                              </>
                            )}
                          </Flex>
                        )}
                      </>
                    )}
                </Stack>
              </motion.div>
            </Stack>

            <Stack display={["none", "flex", "flex"]} w="full" flexGrow="1">
              {attrsList?.length === 0 ? (
                <Stack>
                  <Text
                    mt={{ base: "6px", "2xl": "12px" }}
                    display={{ base: "none", xl: "block" }}
                    fontSize={{ base: "14px", "2xl": "16px" }}
                  >
                    This NFT have no props/ levels.
                  </Text>
                </Stack>
              ) : (
                <>
                  <Grid
                    maxH={{
                      base:
                        owner === currentAccount?.address ||
                        saleInfo?.nftOwner === currentAccount?.address
                          ? "255px"
                          : is_for_sale && saleInfo
                          ? "160px"
                          : "225px",

                      "2xl":
                        owner === currentAccount?.address ||
                        currentAccount?.address === saleInfo?.nftOwner
                          ? "335px"
                          : is_for_sale && saleInfo
                          ? "200px"
                          : "305px",
                    }}
                    id="grid-attrs"
                    boxShadow="lg"
                    w="full"
                    templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
                    gap={{ base: "0.5rem", xl: "1rem", "2xl": "1.25rem" }}
                    pr="22px"
                    overflowY="auto"
                    sx={SCROLLBAR}
                  >
                    {attrsList?.length
                      ? attrsList
                          .filter(
                            (i) =>
                              !JSON.stringify(Object.values(i)).includes("|")
                          )
                          .map((item, idx) => {
                            return (
                              <GridItem w="100%" h="100%" key={idx}>
                                <Box
                                  w="full"
                                  textAlign="left"
                                  alignItems="end"
                                  bg="brand.semiBlack"
                                  px={{ base: "0.5rem", "2xl": "1rem" }}
                                  py={3}
                                >
                                  <Flex w="full">
                                    <Box color="brand.grayLight" w="full">
                                      <Text>{Object.keys(item)[0]}</Text>
                                      <Heading
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
                                      ></Heading>
                                    </Box>
                                    <Spacer />
                                  </Flex>
                                  <Flex w="full" color="#7AE7FF">
                                    <Spacer />
                                    <Text
                                      isTruncated
                                      pr={1}
                                      fontStyle="italic"
                                      fontSize={{
                                        base: "0.875rem",
                                        "2xl": "1rem",
                                      }}
                                    >
                                      {Object.values(item)[0]}
                                    </Text>
                                  </Flex>
                                </Box>{" "}
                              </GridItem>
                            );
                          })
                      : ""}

                    {attrsList?.length
                      ? attrsList
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
                                        createLevelAttribute(
                                          Object.values(item)[0]
                                        ).level
                                      }{" "}
                                      of{" "}
                                      {
                                        createLevelAttribute(
                                          Object.values(item)[0]
                                        ).levelMax
                                      }
                                    </Text>
                                  </Flex>

                                  <Progress
                                    colorScheme="telegram"
                                    size="sm"
                                    value={Number(
                                      (createLevelAttribute(
                                        Object.values(item)[0]
                                      ).level *
                                        100) /
                                        createLevelAttribute(
                                          Object.values(item)[0]
                                        ).levelMax
                                    )}
                                    height="6px"
                                  />
                                </Box>
                              </React.Fragment>
                            );
                          })
                      : null}
                  </Grid>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default NFTTabCollectible;
