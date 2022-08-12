import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
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

import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { motion } from "framer-motion";

import {
  getCachedImageShort,
  convertStringToPrice,
  createLevelAttribute,
  getPublicCurrentAccount,
  formatNumDynamicDecimal,
} from "@utils";

import { useSubstrateState } from "@utils/substrate";

import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import { formMode } from "@constants";

import LockNFTModal from "@components/Modal/LockNFTModal";

import AddNewNFTModal from "../Modal/AddNewNFT";
import { SCROLLBAR } from "@constants";
import CommonButton from "@components/Button/CommonButton";
import { BUY, BID, REMOVE_BID } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import { buyToken, placeBid, removeBid } from "../../../token";
import { clearTxStatus } from "@store/actions/txStatus";
import { getUsernameOnchain } from "@utils/blockchain/profile_calls";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

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
  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

  const [doOffer] = useState(false);
  const [bidPrice, setBidPrice] = useState(1);

  const [isBided, setIsBided] = useState(false);
  const [saleInfo, setSaleInfo] = useState(null);

  const [ownerName, setOwnerName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const [loading, setLoading] = useState(false);
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const fetchSaleInfo = useCallback(async () => {
    setLoading(true);
    try {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount || getPublicCurrentAccount(),
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);

      let accountAddress = owner;

      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount || getPublicCurrentAccount(),
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        accountAddress = is_for_sale ? sale_info?.nftOwner : owner;

        if (listBidder) {
          for (const item of listBidder) {
            if (item.bidder === currentAccount?.address) {
              setIsBided(true);
              setBidPrice(convertStringToPrice(item.bidValue));
            }
          }
        }
      }

      if (accountAddress === currentAccount?.address) {
        setIsOwner(true);
      }

      const name = await getUsernameOnchain({ accountAddress });

      setOwnerAddress(accountAddress);
      setOwnerName(name);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("There is some error when fetching sale info!");
      console.log("error", error);
    }
  }, [currentAccount, is_for_sale, nftContractAddress, owner, tokenID]);

  useEffect(() => {
    fetchSaleInfo();
  }, [fetchSaleInfo]);

  const handleBuyAction = async () => {
    try {
      await buyToken(
        api,
        currentAccount,
        isOwner,
        price,
        nftContractAddress,
        ownerAddress,
        tokenID,
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
        nftContractAddress,
        ownerAddress,
        tokenID,
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
        price,
        bidPrice,
        nftContractAddress,
        ownerAddress,
        tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const iconBorderSize = useBreakpointValue({ base: "6px", "2xl": "10px" });

  return (
    <>
      <Stack
        alignItems="stretch"
        direction={{ base: "column", xl: "row" }}
        spacing={{ base: "15px", xl: "25px", "2xl": "40px" }}
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
          <HStack w="full">
            <Link
              as={ReactRouterLink}
              to={`/nft/${nftContractAddress}/${tokenID}`}
            >
              <Heading
                fontSize={{ base: "xl", xl: "2xl", "2xl": "3xl-mid" }}
                color="#fff"
              >
                {nftName}
              </Heading>
            </Link>

            <Spacer />

            <HStack>
              {!is_locked && showOnChainMetadata && isOwner && (
                <AddNewNFTModal
                  {...props}
                  mode={formMode.EDIT}
                  isDisabled={actionType}
                />
              )}

              {!is_locked && isOwner && (
                <LockNFTModal isDisabled={actionType} {...props} />
              )}

              {!is_locked && showOnChainMetadata && !isOwner && (
                <Tooltip
                  cursor="pointer"
                  hasArrow
                  bg="#333"
                  color="#fff"
                  label="Unlocked on-chain metadata"
                >
                  <span
                    style={{
                      padding: iconBorderSize,
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #333333",
                    }}
                  >
                    <Icon
                      width={{ base: "14px", "2xl": "20px" }}
                      height={{ base: "14px", "2xl": "20px" }}
                      as={AiOutlineUnlock}
                    />
                  </span>
                </Tooltip>
              )}

              {!is_locked && !showOnChainMetadata && (
                <Tooltip
                  hasArrow
                  bg="#333"
                  color="#fff"
                  label="Off-chain metadata"
                >
                  <span
                    style={{
                      padding: iconBorderSize,
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #333333",
                    }}
                  >
                    <Icon
                      width={{ base: "14px", "2xl": "20px" }}
                      height={{ base: "14px", "2xl": "20px" }}
                      as={AiOutlineUnlock}
                    />
                  </span>
                </Tooltip>
              )}

              {is_locked && showOnChainMetadata && (
                <Tooltip
                  hasArrow
                  bg="#333"
                  color="#fff"
                  label="Locked on-chain metadata"
                >
                  <span
                    style={{
                      padding: iconBorderSize,
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #333333",
                    }}
                  >
                    <Icon
                      width={{ base: "14px", "2xl": "20px" }}
                      height={{ base: "14px", "2xl": "20px" }}
                      as={AiOutlineLock}
                    />
                  </span>
                </Tooltip>
              )}
            </HStack>
          </HStack>

          <Stack>
            <Heading
              isTruncated
              maxW={{ base: "260px", xl: "500px", "2xl": "610px" }}
              pt={{ base: "2px", "2xl": "12px" }}
              fontSize={["xs", "md", "md"]}
              color="brand.grayLight"
              lineHeight="1.35"
            >
              {description}
            </Heading>
          </Stack>

          <Stack w="full">
            <Skeleton isLoaded={!loading}>
              <Text
                color="#fff"
                maxW="max-content"
                pt={{ base: "2px", "2xl": "12px" }}
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

          <Skeleton isLoaded={!loading} w="full">
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
                {!is_for_sale && !isOwner ? (
                  <Flex alignItems="center" py="8px">
                    <Heading size="h6">Not for sale</Heading>
                  </Flex>
                ) : null}

                <Stack
                  display={
                    saleInfo && is_for_sale && !isOwner ? "flex" : "none"
                  }
                  direction={{ base: "column", xl: "row" }}
                  w="full"
                  h="92px"
                  py={2}
                  my={{ base: "8px", xl: "2px", "2xl": "22px" }}
                  pr={{ base: "0", "2xl": "28px" }}
                >
                  {is_for_sale && saleInfo && !isOwner && (
                    <>
                      <Flex
                        w="full"
                        mr="22px"
                        display="flex"
                        borderWidth={2}
                        alignItems="center"
                        borderColor="#343333"
                        px={["8px", "16px"]}
                        minH={["4.15rem", "4.75rem", "4.75rem"]}
                      >
                        <CommonButton
                          mx="0"
                          px="2px"
                          h="40px"
                          {...rest}
                          text="buy now"
                          onClick={handleBuyAction}
                          isDisabled={actionType && actionType !== BUY}
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
                                    {formatNumDynamicDecimal(price / 10 ** 12)}
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
                          py={1}
                          w="full"
                          mr="30px"
                          display="flex"
                          borderWidth={2}
                          px={["8px", "16px"]}
                          alignItems="center"
                          borderColor="#333"
                          minH={["4.15rem", "4.75rem", "4.75rem"]}
                        >
                          {!isBided && (
                            <>
                              <CommonButton
                                mx="0"
                                px="2px"
                                h="40px"
                                {...rest}
                                text="place bid"
                                onClick={handleBidAction}
                                isDisabled={actionType && actionType !== BID}
                              />

                              <NumberInput
                                min={1}
                                ml={3}
                                h="50px"
                                bg="black"
                                precision={6}
                                minW={"85px"}
                                max={999000000}
                                value={bidPrice}
                                isDisabled={actionType}
                                onChange={(v) => setBidPrice(v)}
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
                              <CommonButton
                                mx="0"
                                px="2px"
                                h="40px"
                                {...rest}
                                text="remove bid"
                                onClick={handleRemoveBidAction}
                                isDisabled={
                                  actionType && actionType !== REMOVE_BID
                                }
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
                    This NFT has no props/ levels.
                  </Text>
                </Stack>
              ) : (
                <>
                  <Grid
                    maxH={{
                      base: isOwner
                        ? "255px"
                        : is_for_sale && saleInfo
                        ? "160px"
                        : "225px",

                      "2xl": isOwner
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
                                  <Flex w="full" pb="15px" pt="5px">
                                    <Heading
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
          </Skeleton>
        </Stack>
      </Stack>
    </>
  );
};

export default NFTTabCollectible;
