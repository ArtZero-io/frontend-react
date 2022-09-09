import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  Image,
  Link,
  Tooltip,
  HStack,
  Square,
  Stack,
  Skeleton,
  TagLabel,
  TagRightIcon,
  NumberInput,
  NumberInputField,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";

import profile_calls from "@utils/blockchain/profile_calls";
import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract from "@utils/blockchain/marketplace";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import marketplace from "@utils/blockchain/marketplace";

import { useSubstrateState } from "@utils/substrate";
import { ContractPromise } from "@polkadot/api-contract";
import { getCachedImageShort, truncateStr } from "@utils";
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

function MyNFTTabInfo(props) {
  const {
    avatar,
    nftName,
    description,
    attrsList,
    is_for_sale,
    price,
    filterSelected,
    tokenID,
    owner,
    nftContractAddress,
    contractType,
    is_locked,
    showOnChainMetadata,
    royalFee,
  } = props;

  const { api, currentAccount } = useSubstrateState();
  const [askPrice, setAskPrice] = useState(10);
  const [isAllowanceMarketplaceContract, setIsAllowanceMarketplaceContract] =
    useState(false);

  const dispatch = useDispatch();

  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

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

  useEffect(() => {
    doLoad();
  }, [doLoad]);

  useEffect(() => {
    const checkAllowMarketplaceContract = async () => {
      if (Number(contractType) === 2) {
        const nft721_psp34_standard_contract = new ContractPromise(
          api,
          nft721_psp34_standard.CONTRACT_ABI,
          nftContractAddress
        );

        nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);

        const isAllowance = await nft721_psp34_standard_calls.allowance(
          currentAccount,
          currentAccount?.address,
          marketplace_contract.CONTRACT_ADDRESS,
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

      const {
        data: { username },
      } = await profile_calls.getProfileOnChain({
        callerAccount: currentAccount,
        accountAddress,
      });

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

  return (
    <>
      <HStack spacing={{ base: "30px", "2xl": "40px" }} alignItems="stretch">
        <Square size={{ base: "340px", "2xl": "460px" }}>
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
            <Heading color="#fff" size="h4" fontSize="32px">
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
                  isDisabled={is_for_sale || actionType}
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

              {owner === currentAccount?.address && (
                <TransferNFTModal
                  {...props}
                  isDisabled={is_for_sale || actionType}
                />
              )}
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

          <Stack>
            <Skeleton as="span" isLoaded={ownerName} minW="150px">
              <Text color="#fff" maxW="max-content">
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
                  id="grid-attrs"
                  overflowY="auto"
                  maxH={{ base: "170px", "2xl": "245px" }}
                  sx={SCROLLBAR}
                  gap={{ base: "0.5rem", xl: "1rem", "2xl": "1.25rem" }}
                  templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
                >
                  {attrsList?.length
                    ? attrsList
                        .filter(
                          (i) => !JSON.stringify(Object.values(i)).includes("|")
                        )
                        .map((item, idx) => (
                          <GridItem key={idx} w="100%" h="100%">
                            <PropCard item={item} />
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
                            <LevelCard item={item} />
                          </GridItem>
                        ))
                    : null}
                </Grid>
              </>
            )}
          </Stack>

          <Stack w="full" textAlign="right">
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
                  isDisabled={actionType}
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
                    <AzeroIcon />
                  </InputRightElement>
                </NumberInput>
                <CommonButton
                  mx="0"
                  {...rest}
                  text="push for sale"
                  onClick={handleListTokenAction}
                  isDisabled={actionType && actionType !== LIST_TOKEN}
                />
              </Flex>
            )}

            {filterSelected !== "BIDS" &&
              owner === marketplace_contract.CONTRACT_ADDRESS &&
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
                      {formatNumDynamicDecimal(price / 10 ** 12)}
                    </Text>
                    <AzeroIcon />
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
                  {" "}
                  <CommonButton
                    mx="0"
                    px="2px"
                    {...rest}
                    text="remove bid"
                    onClick={handleRemoveBidAction}
                    isDisabled={actionType && actionType !== REMOVE_BID}
                  />
                  <Flex textAlign="right" color="brand.grayLight">
                    <Text ml={4} mr={1} my="auto">
                      Your current offer is
                    </Text>
                    <Flex color="#fff" h="full" alignItems="center" px={1}>
                      <TagLabel bg="transparent">{bidPrice}</TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </Stack>
        </Stack>
      </HStack>
      {filterSelected === "COLLECTED" ? (
        <HStack
          justify="space-between"
          color="brand.blue"
          fontSize={{ base: "14px", "2xl": "15px" }}
          w="full"
          py={{ base: "10px", "2xl": "20px" }}
        >
          <Text>
            Royal fee: {formatNumDynamicDecimal((askPrice * royalFee) / 10000)}{" "}
            <AzeroIcon w="12px" mb="2px" /> ({(royalFee / 100).toFixed(2)} %)
          </Text>
          <Text>
            Trade fee:{" "}
            {formatNumDynamicDecimal((askPrice * myTradingFee) / 100)}{" "}
            <AzeroIcon w="12px" mb="2px" /> ({myTradingFee} %)
          </Text>
          <Text>
            You will receive:{" "}
            {formatNumDynamicDecimal(
              askPrice -
                (askPrice * myTradingFee) / 100 -
                (askPrice * royalFee) / 10000
            )}{" "}
            <AzeroIcon w="12px" mb="2px" />
          </Text>
        </HStack>
      ) : null}

      {filterSelected === "LISTING" ? (
        <HStack
          justify="space-between"
          color="brand.blue"
          fontSize={{ base: "14px", "2xl": "15px" }}
          w="full"
          py={{ base: "10px", "2xl": "20px" }}
        >
          <Text>
            Royal fee: {formatNumDynamicDecimal((price / 10 ** 16) * royalFee)}{" "}
            <AzeroIcon w="12px" mb="2px" /> ({(royalFee / 100).toFixed(2)} %)
          </Text>
          <Text>
            Trade fee:{" "}
            {formatNumDynamicDecimal((price / 10 ** 14) * myTradingFee)}{" "}
            <AzeroIcon w="12px" mb="2px" /> ({myTradingFee} %)
          </Text>
          <Text>
            You will receive:{" "}
            {formatNumDynamicDecimal(
              price *
                (1 / 10 ** 12 - myTradingFee / 10 ** 14 - royalFee / 10 ** 16)
            )}{" "}
            <AzeroIcon w="12px" mb="2px" />
          </Text>
        </HStack>
      ) : null}
    </>
  );
}

export default MyNFTTabInfo;
