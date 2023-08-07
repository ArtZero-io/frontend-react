import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  Link,
  Tooltip,
  HStack,
  Stack,
  TagLabel,
  NumberInput,
  NumberInputField,
  InputRightElement,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import staking_calls from "@utils/blockchain/staking_calls";
import { nft721_psp34_standard, marketplace } from "@utils/blockchain/abi";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import { useSubstrateState } from "@utils/substrate";
import { ContractPromise } from "@polkadot/api-contract";
import { truncateStr, getTraitCount } from "@utils";
import { convertStringToPrice, formatNumDynamicDecimal } from "@utils";

import { formMode } from "@constants";

import LockNFTModal from "@components/Modal/LockNFTModal";
import TransferNFTModal from "@components/Modal/TransferNFTModal";

import AddNewNFTModal from "@pages/collection/component/Modal/AddNewNFT";
import {
  fetchMyPMPStakedCount,
  fetchMyTradingFee,
} from "@pages/account/stakes";
import { SCROLLBAR } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { REMOVE_BID, UNLIST_TOKEN, LIST_TOKEN } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { listToken, unlistToken, removeBid } from "@pages/token";
import UnlockIcon from "@theme/assets/icon/Unlock";
import LockIcon from "@theme/assets/icon/Lock";
import PropCard from "@components/Card/PropCard";
import LevelCard from "@components/Card/LevelCard";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import SocialShare from "@components/SocialShare/SocialShare";
import useEditBidPrice from "@hooks/useEditBidPrice";
import { fetchUserBalance, resolveDomain } from "@utils";

function MyNFTTabInfo(props) {
  const {
    avatar,
    nftName,
    description,
    traits,
    is_for_sale,
    price,
    filterSelected,
    tokenID,
    owner,
    nftContractAddress,
    contractType,
    is_locked,
    showOnChainMetadata,
    royaltyFee,
    nft_count,
    rarityTable,
    isActive,
    maxTotalSupply,
    nft_owner,
  } = props;

  const attrsList = !traits
    ? {}
    : Object.entries(traits).map(([k, v]) => {
        return { [k]: v };
      });

  const { api, currentAccount, chainToken, chainDecimal } = useSubstrateState();
  const [askPrice, setAskPrice] = useState(10);
  const [isAllowanceMarketplaceContract, setIsAllowanceMarketplaceContract] =
    useState(false);

  const dispatch = useDispatch();

  const gridSize = useBreakpointValue({
    base: `8rem`,
    xl: `10rem`,
    "2xl": `11rem`,
  });

  const [saleInfo, setSaleInfo] = useState(null);
  const [isBided, setIsBided] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [myTradingFee, setMyTradingFee] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [, setLoading] = useState(false);

  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const doLoad = useCallback(async () => {
    setLoading(true);

    try {
      // remove publicCurrentAccount due to private route
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);

      let accountAddress = owner;

      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        accountAddress = is_for_sale ? sale_info?.nftOwner : owner;

        if (listBidder) {
          for (const item of listBidder) {
            if (item.bidder === currentAccount?.address) {
              setIsBided(true);
              setBidPrice(convertStringToPrice(item.bidValue, chainDecimal));
            }
          }
        }
      }

      if (accountAddress === currentAccount?.address) {
        setIsOwner(true);
      }

      const name = await resolveDomain(accountAddress);

      setOwnerAddress(accountAddress);
      setOwnerName(name);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("There is some error when fetching sale info!");

      console.log("error", error);
    }
  }, [
    chainDecimal,
    currentAccount,
    is_for_sale,
    nftContractAddress,
    owner,
    tokenID,
  ]);

  useEffect(() => {
    doLoad();
  }, [doLoad]);

  useEffect(() => {
    const checkAllowMarketplaceContract = async () => {
      if (contractType === "Psp34Auto") {
        const nft721_psp34_standard_contract = new ContractPromise(
          api,
          nft721_psp34_standard.CONTRACT_ABI,
          nftContractAddress
        );

        nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);

        const isAllowance = await nft721_psp34_standard_calls.allowance(
          currentAccount,
          currentAccount?.address,
          marketplace.CONTRACT_ADDRESS,
          { u64: tokenID },
          dispatch
        );

        setIsAllowanceMarketplaceContract(isAllowance);
      }
    };

    checkAllowMarketplaceContract();
  }, [
    isAllowanceMarketplaceContract,
    currentAccount,
    contractType,
    api,
    nftContractAddress,
    tokenID,
    dispatch,
  ]);

  const handleListTokenAction = async () => {
    if (!isActive) return toast.error("This collection is inactive!");

    try {
      await listToken(
        api,
        currentAccount,
        isOwner,
        askPrice,
        nftContractAddress,
        nft721_psp34_standard.CONTRACT_ABI,
        nft721_psp34_standard_calls,
        marketplace.CONTRACT_ADDRESS,
        tokenID,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const handleUnlistTokenAction = async () => {
    if (!isActive) return toast.error("This collection is inactive!");

    try {
      await unlistToken(
        api,
        currentAccount,
        isOwner,
        nftContractAddress,
        tokenID,
        dispatch
      );
      setAskPrice(1);
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

  useEffect(() => {
    const ownerName = async () => {
      const accountAddress = is_for_sale ? saleInfo?.nftOwner : owner;

      const username = await resolveDomain(accountAddress);

      return setOwnerName(username || truncateStr(accountAddress, 6));
    };

    ownerName();
  }, [currentAccount, is_for_sale, owner, saleInfo?.nftOwner]);

  useEffect(() => {
    const fetchTradeFee = async () => {
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
    };
    fetchTradeFee();
  }, [currentAccount]);

  const iconWidth = useBreakpointValue(["40px", "50px"]);
  const path = `${window?.location?.origin}/nft/${nftContractAddress}/${tokenID}`;

  // ==============================================
  const [isUpdateBidPriceMode, setIsUpdateBidPriceMode] = useState(false);
  const [newBidPrice, setNewBidPrice] = useState("");

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

    //check owner of the NFT
    if (isOwner) {
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

    if (parseFloat(newBidPrice) >= price / 10 ** chainDecimal) {
      toast.error(`Bid amount must be less than current price!`);
      return;
    }

    doUpdateBidPrice();
  };
  return (
    <>
      <HStack alignItems="stretch" spacing={{ base: "20px", xl: "45px" }}>
        <ImageCloudFlare
          h="484px"
          src={avatar}
          size={500}
          objectFitContain={true}
          w={{ base: "404px", xl: "484px" }}
        />

        <Stack alignItems="flex-start" w="full">
          <HStack w="full">
            <Heading color="#fff" size="h4" fontSize="24px">
              {nftName}
            </Heading>

            <Spacer />

            <HStack>
              <Spacer />
              {!is_locked &&
                showOnChainMetadata &&
                owner !== currentAccount?.address && (
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
              {!is_locked && owner === currentAccount?.address && (
                <LockNFTModal
                  {...props}
                  isDisabled={!isActive || is_for_sale || actionType}
                />
              )}
              {!is_locked &&
                showOnChainMetadata &&
                owner === currentAccount.address && (
                  <AddNewNFTModal
                    {...props}
                    mode={formMode.EDIT}
                    collectionOwner={owner}
                    isDisabled={is_for_sale || actionType}
                  />
                )}

              {ownerAddress === currentAccount?.address && (
                <TransferNFTModal
                  {...props}
                  isDisabled={is_for_sale || actionType}
                />
              )}
              <SocialShare title={nftName} shareUrl={path} />
            </HStack>
          </HStack>

          <Stack>
            <Tooltip
              cursor="pointer"
              hasArrow
              bg="#333"
              color="#fff"
              borderRadius="0"
              label={description}
            >
              <Text
                isTruncated
                fontSize="lg"
                color="brand.grayLight"
                lineHeight="1.35"
                maxW={{ base: "500px", "2xl": "610px" }}
              >
                {description}
              </Text>
            </Tooltip>
          </Stack>

          <Stack>
            <Text color="#fff" maxW="max-content">
              Owned by{" "}
              <Link
                as={ReactRouterLink}
                to={`/public-account/collections/${ownerAddress}`}
                color="#7AE7FF"
                textTransform="none"
                textDecoration="underline"
              >
                {ownerName ?? truncateStr(ownerAddress)}
              </Link>
            </Text>
          </Stack>

          <Stack w="full" flexGrow="1">
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
                  mb={2}
                  w="full"
                  pr={"22px"}
                  gap={{ base: "10px", xl: "30px" }}
                  sx={SCROLLBAR}
                  id="grid-attrs"
                  overflowY="auto"
                  maxH="232px"
                  templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
                >
                  {attrsList?.length
                    ? attrsList
                        .filter(
                          (i) => !JSON.stringify(Object.values(i)).includes("|")
                        )
                        .map((item, idx) => (
                          <GridItem key={idx} w="100%" h="100%">
                            <PropCard
                              item={item}
                              traitCount={getTraitCount(rarityTable, item)}
                              totalNftCount={maxTotalSupply || nft_count}
                            />
                          </GridItem>
                        ))
                    : ""}

                  {attrsList?.length
                    ? attrsList
                        .filter((i) =>
                          JSON.stringify(Object.values(i)).includes("|")
                        )
                        .map((item, idx) => (
                          <GridItem w="100%" h="100%" key={idx}>
                            <LevelCard
                              item={item}
                              traitCount={getTraitCount(rarityTable, item)}
                              totalNftCount={maxTotalSupply || nft_count}
                            />
                          </GridItem>
                        ))
                    : null}
                </Grid>
              </>
            )}
          </Stack>

          <Stack pb="10px" w="full" textAlign="right">
            {!is_for_sale && (
              <Flex
                w="full"
                pt={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Spacer />
                <NumberInput
                  // maxW={32}
                  isDisabled={!isActive || actionType}
                  bg="black"
                  max={999000000}
                  min={1}
                  precision={6}
                  onChange={(v) => setAskPrice(v)}
                  value={askPrice}
                  mr={3}
                  h="52px"
                >
                  <NumberInputField
                    h="52px"
                    borderRadius={0}
                    borderWidth={0}
                    color="#fff"
                  />
                  <InputRightElement bg="transparent" h={"52px"} w={16}>
                    <AzeroIcon chainToken={chainToken} />
                  </InputRightElement>
                </NumberInput>
                <CommonButton
                  mx="0"
                  {...rest}
                  text="push for sale"
                  onClick={handleListTokenAction}
                  isDisabled={
                    !isActive || (actionType && actionType !== LIST_TOKEN)
                  }
                />
              </Flex>
            )}

            {filterSelected !== "BIDS" &&
              // owner === marketplace_contract.CONTRACT_ADDRESS &&
              is_for_sale && (
                <Flex
                  w="full"
                  py={2}
                  alignItems="center"
                  justifyContent="start"
                >
                  <Spacer />
                  <Flex
                    alignItems="center"
                    justifyContent="start"
                    fontSize="lg"
                    mr={3}
                  >
                    <Text color="brand.grayLight">For Sale At</Text>

                    <Text color="#fff" mx={2}>
                      {formatNumDynamicDecimal(price / 10 ** chainDecimal)}
                    </Text>
                    <AzeroIcon chainToken={chainToken} />
                  </Flex>

                  <CommonButton
                    mx="0"
                    {...rest}
                    minW="150px"
                    text="cancel sale"
                    onClick={handleUnlistTokenAction}
                    isDisabled={actionType && actionType !== UNLIST_TOKEN}
                  />
                </Flex>
              )}

            {isBided && (
              <>
                <Flex
                  w="full"
                  py={2}
                  alignItems="center"
                  justifyContent="start"
                >
                  {/* Remove bid button */}
                  {!isUpdateBidPriceMode && (
                    <>
                      <CommonButton
                        mx="0"
                        px="2px"
                        {...rest}
                        text="remove bid"
                        onClick={handleRemoveBidAction}
                        isDisabled={
                          isUpdateBidPriceMode ||
                          (actionType && actionType !== REMOVE_BID)
                        }
                      />{" "}
                      <Box w={"8px"} />
                    </>
                  )}
                  {/* END Remove bid button */}

                  {!isUpdateBidPriceMode ? (
                    <CommonButton
                      mx="0"
                      px="2px"
                      {...rest}
                      text="edit price"
                      onClick={() => setIsUpdateBidPriceMode(true)}
                      isDisabled={
                        actionType && actionType !== "UPDATE_BID_PRICE"
                      }
                    />
                  ) : (
                    <>
                      <CommonButton
                        mx="0"
                        px="2px"
                        {...rest}
                        text="submit"
                        onClick={handleUpdateBidPrice}
                        isDisabled={
                          !newBidPrice ||
                          (actionType && actionType !== "UPDATE_BID_PRICE")
                        }
                      />
                      <Box w={"8px"} />

                      <CommonButton
                        mx="0"
                        px="2px"
                        {...rest}
                        text="cancel"
                        onClick={() => {
                          setNewBidPrice("");
                          setIsUpdateBidPriceMode(false);
                        }}
                        isDisabled={actionType && actionType !== REMOVE_BID}
                      />
                    </>
                  )}

                  {isUpdateBidPriceMode ? (
                    <Flex textAlign="right" color="brand.grayLight">
                      <Text ml={4} mr={1} my="auto">
                        New bid price
                      </Text>
                      <NumberInput
                        ml="8px"
                        maxW={"120px"}
                        isDisabled={!isActive || actionType}
                        bg="black"
                        max={999000000}
                        min={0.1}
                        precision={6}
                        onChange={(v) => {
                          if (/[eE+-]/.test(v)) return;

                          setNewBidPrice(v);
                        }}
                        value={newBidPrice}
                        h="52px"
                      >
                        <NumberInputField
                          textAlign="right"
                          h="52px"
                          borderRadius={0}
                          borderWidth={0}
                          color="#fff"
                          placeholder="0"
                        />
                        <InputRightElement bg="transparent" h={"52px"} w="32px">
                          <AzeroIcon chainToken={chainToken} w="12px" />
                        </InputRightElement>
                      </NumberInput>
                    </Flex>
                  ) : (
                    <Flex textAlign="right" color="brand.grayLight">
                      <Text ml={4} mr={1} my="auto">
                        Your current offer is
                      </Text>
                      <Flex color="#fff" h="full" alignItems="center" px={1}>
                        <TagLabel bg="transparent">{bidPrice}</TagLabel>
                        <AzeroIcon chainToken={chainToken} />
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </>
            )}
          </Stack>

          {isActive && filterSelected === "COLLECTED" ? (
            <HStack
              w="full"
              pt="10px"
              justify="space-between"
              borderTop="1px solid #282828"
            >
              <Text>
                <Text as="span" color="brand.grayLight">
                  Royalty fee:
                </Text>{" "}
                {formatNumDynamicDecimal(askPrice * (royaltyFee / 10000))}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" /> (
                {(royaltyFee / 100).toFixed(2)}
                %)
              </Text>
              <Text>
                <Text as="span" color="brand.grayLight">
                  Trade fee:
                </Text>{" "}
                {formatNumDynamicDecimal(askPrice * (myTradingFee / 100))}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" /> (
                {myTradingFee}%)
              </Text>
              <Text>
                <Text as="span" color="brand.grayLight">
                  You will receive:{" "}
                </Text>
                {formatNumDynamicDecimal(
                  askPrice * (1 - myTradingFee / 100 - royaltyFee / 10000)
                )}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" />
              </Text>
            </HStack>
          ) : null}

          {isActive && filterSelected === "LISTING" ? (
            <HStack
              w="full"
              pt="10px"
              justify="space-between"
              borderTop="1px solid #282828"
            >
              <Text>
                <Text as="span" color="brand.grayLight">
                  Royalty fee:
                </Text>{" "}
                {formatNumDynamicDecimal(
                  (price / 10 ** chainDecimal) * (royaltyFee / 10000)
                )}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" /> (
                {(royaltyFee / 100).toFixed(2)}
                %)
              </Text>
              <Text>
                <Text as="span" color="brand.grayLight">
                  Trade fee:
                </Text>{" "}
                {formatNumDynamicDecimal(
                  (price / 10 ** chainDecimal) * (myTradingFee / 100)
                )}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" /> (
                {myTradingFee}%)
              </Text>
              <Text>
                <Text as="span" color="brand.grayLight">
                  You will receive:{" "}
                </Text>{" "}
                {formatNumDynamicDecimal(
                  (price / 10 ** chainDecimal) *
                    (1 - myTradingFee / 100 - royaltyFee / 10000)
                )}{" "}
                <AzeroIcon chainToken={chainToken} w="15px" mb="2px" />
              </Text>
            </HStack>
          ) : null}
        </Stack>
      </HStack>
    </>
  );
}

export default MyNFTTabInfo;
