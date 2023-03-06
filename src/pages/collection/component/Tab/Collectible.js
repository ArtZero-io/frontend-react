import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  InputRightElement,
  Link,
  NumberInput,
  NumberInputField,
  Skeleton,
  Spacer,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import { Link as ReactRouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { BsFlag } from 'react-icons/bs';

import {
  convertStringToPrice,
  getPublicCurrentAccount,
  formatNumDynamicDecimal,
  getTraitCount,
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
import { truncateStr } from "@utils";
import UnlockIcon from "@theme/assets/icon/Unlock";
import LockIcon from "@theme/assets/icon/Lock";
import PropCard from "@components/Card/PropCard";
import LevelCard from "@components/Card/LevelCard";
import { Fragment } from "react";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import SocialShare from "@components/SocialShare/SocialShare";
import { MAX_BID_COUNT } from "../../../../constants";
import NFTReportModal from "../Modal/NFTReport";

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
    is_locked,
    showOnChainMetadata,
    rarityTable,
    traits = {},
    totalNftCount,
    name
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const [bidderCount, setBidderCount] = useState(0);

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

        setBidderCount(listBidder?.length || 0);
        
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

      const name = truncateStr(accountAddress);

      setOwnerAddress(accountAddress);
      setOwnerName(name);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("There is some error when fetching sale info!");
      console.log("error", error);
    }
  }, [currentAccount, is_for_sale, nftContractAddress, owner, tokenID]);

  const attrsList = Object.entries(traits).map(([k, v]) => {
    return { [k]: v };
  });

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
    if (bidderCount > MAX_BID_COUNT) {
      toast.error(`This NFT had reached max ${MAX_BID_COUNT} bids!`);
      return;
    }

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

  const iconWidth = useBreakpointValue(["40px", "50px"]);

  const path = `${window.location.href.replace(
    "#/collection/",
    "#/nft/"
  )}/${tokenID}`;

  return (
    <>
      <Stack
        alignItems="stretch"
        direction="row"
        spacing={{ base: "20px", xl: "45px" }}
      >
        <ImageCloudFlare
          h={["484px"]}
          src={avatar}
          objectFitContain={true}
          w={{ base: "404px", xl: "484px" }}
        />

        <Stack alignItems="flex-start" w="full">
          <HStack w="full">
            <Link
              as={ReactRouterLink}
              to={`/nft/${nftContractAddress}/${tokenID}`}
            >
              <Heading
                color="#fff"
                size="h4"
                fontSize={{ base: "28px", "2xl": "32px" }}
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
                  isDisabled={is_for_sale || actionType}
                />
              )}

              {!is_locked && isOwner && (
                <LockNFTModal
                  {...props}
                  isDisabled={is_for_sale || actionType}
                />
              )}

              {!is_locked && showOnChainMetadata && !isOwner && (
                <Tooltip
                  cursor="pointer"
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

              {!is_locked && !showOnChainMetadata && (
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

              {is_locked && showOnChainMetadata && (
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
              <SocialShare title={nftName} shareUrl={path} />
              <Tooltip
                  hasArrow
                  bg="#333"
                  color="#fff"
                  borderRadius="0"
                  label="Report this item"
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
                   
                    <IconButton
                    aria-label="Report this item"
                    icon={<BsFlag />}
                    variant="solid"
                    width={iconWidth}
                      height={iconWidth}
                      onClick={() => onOpen()}
            />
                  </span>
                </Tooltip>
            </HStack>
          </HStack>

          <Stack>
            <Text
              isTruncated
              fontSize="lg"
              color="brand.grayLight"
              lineHeight="1.35"
              maxW={{ base: "500px", "2xl": "610px" }}
            >
              {description}
            </Text>
          </Stack>

          <Stack w="full">
            <Skeleton isLoaded={!loading}>
              <Text color="#fff" maxW="max-content">
                Owned by{" "}
                <Link
                  as={ReactRouterLink}
                  to={`/public-account/general/${ownerAddress}`}
                  color="#7AE7FF"
                  textTransform="capitalize"
                  textDecoration="underline"
                >
                  {ownerName}
                </Link>
              </Text>
            </Skeleton>
          </Stack>

          <Skeleton h="full" w="full" isLoaded={!loading}>
            <Stack mt="20px" spacing="30px">
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
                  {/* is_for_sale true no sale always show no matter is owner or nor*/}

                  {!is_for_sale ? (
                    <Flex
                      w="full"
                      border="1px solid #343333"
                      minH="80px"
                      alignItems="center"
                      px="20px"
                    >
                      <Heading size="h6">Not for sale</Heading>
                    </Flex>
                  ) : null}

                  <Stack
                    display={
                      saleInfo && is_for_sale && !isOwner ? "flex" : "none"
                    }
                    direction={{ base: "column", md: "row" }}
                    w="full"
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
                          minH="80px"
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
                                <Tag h={4} pr={0} bg="transparent" maxW="135px">
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
                      maxH="232px"
                      id="grid-attrs"
                      w="full"
                      gap="30px"
                      pr="22px"
                      overflowY="auto"
                      sx={SCROLLBAR}
                      templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
                    >
                      {attrsList?.length
                        ? attrsList
                            .filter(
                              (i) =>
                                !JSON.stringify(Object.values(i)).includes("|")
                            )
                            .map((item, idx) => {
                              return (
                                <Fragment key={idx}>
                                  <GridItem w="100%" h="100%">
                                    <PropCard
                                      item={item}
                                      traitCount={getTraitCount(
                                        rarityTable,
                                        item
                                      )}
                                      totalNftCount={totalNftCount}
                                    />
                                  </GridItem>
                                </Fragment>
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
                                <GridItem w="100%" h="100%" key={idx}>
                                  <LevelCard
                                    item={item}
                                    traitCount={getTraitCount(
                                      rarityTable,
                                      item
                                    )}
                                    totalNftCount={totalNftCount}
                                  />
                                </GridItem>
                              );
                            })
                        : null}
                    </Grid>
                  </>
                )}
              </Stack>
            </Stack>
          </Skeleton>
        </Stack>
      </Stack>
      <NFTReportModal isOpen={isOpen}
        onOpen={onOpen}
        name={name}
        nftName={nftName}
        onClose={onClose}/>
    </>
  );
};

export default NFTTabCollectible;
