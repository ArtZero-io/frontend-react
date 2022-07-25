import {
  Box,
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
  Progress,
  Skeleton,
  TagLabel,
  TagRightIcon,
  NumberInput,
  NumberInputField,
  InputRightElement,
  useBreakpointValue,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { ImLock, ImUnlocked } from "react-icons/im";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";

import profile_calls from "@utils/blockchain/profile_calls";
import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract from "@utils/blockchain/marketplace";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import { useSubstrateState } from "@utils/substrate";
import { ContractPromise } from "@polkadot/api-contract";
import { getCachedImageShort, truncateStr, delay } from "@utils";
import {
  convertStringToPrice,
  createLevelAttribute,
  formatNumDynamicDecimal,
} from "@utils";

import { formMode } from "@constants";
import { AccountActionTypes } from "@store/types/account.types";

import LockNFTModal from "@components/Modal/LockNFTModal";
import StatusBuyButton from "@components/Button/StatusBuyButton";
import StatusPushForSaleButton from "@components/Button/StatusPushForSaleButton";

import AddNewNFTModal from "@pages/collection/component/Modal/AddNewNFT";
import {
  fetchMyPMPStakedCount,
  fetchMyTradingFee,
} from "@pages/account/stakes";
import { SCROLLBAR } from "../../../../../constants";

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

  const [stepNo, setStepNo] = useState(0);
  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);
  const txStatus = useSelector((state) => state.txStatus);

  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

  const [action, setAction] = useState("");
  const [saleInfo, setSaleInfo] = useState(null);
  const [isBided, setIsBided] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [myTradingFee, setMyTradingFee] = useState(null);

  useEffect(() => {
    const doLoad = async () => {
      // remove publicCurrentAccount due to private route
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);

      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount,
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
    };
    !saleInfo && doLoad();
  }, [currentAccount, nftContractAddress, saleInfo, tokenID]);

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

  // useEffect(() => {
  //   const checkAllowance = async () => {
  // const isAllowance = await nft721_psp34_standard_calls.allowance(
  //   currentAccount,
  //   currentAccount?.address,
  //   marketplace_contract.CONTRACT_ADDRESS,
  //   { u64: tokenID },
  //   dispatch
  // );
  // if (isAllowance) {
  //   setIsAllowanceMarketplaceContract(true);
  //   setStepNo(1);
  // }
  //   };

  //   checkAllowance();
  // }, [addNftTnxStatus?.status, currentAccount, dispatch, tokenID]);

  const listToken = async () => {
    try {
      if (owner === currentAccount?.address) {
        dispatch({
          type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
          payload: {
            status: "Start",
          },
        });

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

        let res;
        if (!isAllowance) {
          toast.success("Step 1: Approving NFT transfer...");

          res = await nft721_psp34_standard_calls.approve(
            currentAccount,
            marketplace_contract.CONTRACT_ADDRESS,
            { u64: tokenID },
            true,
            dispatch
          );
        }
        if (res || isAllowance) {
          toast.success(
            res
              ? "Step 2: Listing on marketplace..."
              : "Listing on marketplace..."
          );

          await delay(2000).then(async () => {
            await marketplace_contract_calls.list(
              currentAccount,
              nftContractAddress,
              { u64: tokenID },
              askPrice,
              dispatch
            );
          });
        }
      } else {
        dispatch({
          type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
        });

        toast.error(`This token is not yours!`);
      }
    } catch (error) {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      console.log(error);
      toast.error(error.message);
    }
  };

  const unlistToken = async () => {
    try {
      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });

      await marketplace_contract_calls.unlist(
        currentAccount,
        nftContractAddress,
        currentAccount.address,
        { u64: tokenID },
        dispatch
      );
    } catch (error) {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });

      toast.error(`Error `, error);
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
          <HStack>
            <Heading
              color="#fff"
              size="h4"
              fontSize={{ base: "1rem", "2xl": "2rem" }}
            >
              {nftName}
            </Heading>

            <HStack
              pos="absolute"
              top={{
                base: `20px`,
                xl: `20px`,
              }}
              right={{
                base: `20px`,
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
                <LockNFTModal {...props} isDisabled={addNftTnxStatus} />
              )}
            </HStack>

            {!is_locked &&
              showOnChainMetadata &&
              owner === currentAccount.address && (
                <AddNewNFTModal
                  mode={formMode.EDIT}
                  {...props}
                  collectionOwner={owner}
                  isDisabled={addNftTnxStatus || txStatus?.lockStatus}
                />
              )}
          </HStack>

          <Stack>
            <Heading
              isTruncated
              maxW={{ base: "500px", "2xl": "610px" }}
              size="h6"
              pt={{ base: "6px", "2xl": "12px" }}
              fontSize={{ base: "0.8rem", "2xl": "1rem" }}
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

          <Stack w="full" flexGrow="1">
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
                  mb={2}
                  w="full"
                  pr={"22px"}
                  id="grid-attrs"
                  boxShadow="lg"
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
                        .map((item, idx) => {
                          return (
                            <Fragment key={idx}>
                              <GridItem w="100%" h="100%">
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
                                        // minH='2.5rem'
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
                                    <Text fontStyle="italic" isTruncated pr={1}>
                                      {Object.values(item)[0]}
                                    </Text>
                                  </Flex>
                                </Box>
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
                  isDisabled={addNftTnxStatus?.status || txStatus?.lockStatus}
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

                <StatusPushForSaleButton
                  isAllowanceMpContract={isAllowanceMarketplaceContract}
                  type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                  text="push for sale"
                  isLoading={addNftTnxStatus}
                  loadingText={`${addNftTnxStatus?.status}`}
                  stepNo={stepNo}
                  setStepNo={setStepNo}
                  listToken={listToken}
                  isDisabled={txStatus?.lockStatus || addNftTnxStatus}
                />
              </Flex>
            )}

            {filterSelected !== 2 &&
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
                  <StatusPushForSaleButton
                    type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                    text="remove from sale"
                    isLoading={addNftTnxStatus}
                    loadingText={`${addNftTnxStatus?.status}`}
                    unlistToken={unlistToken}
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
                  <StatusBuyButton
                    isDo={action === "remove bid"}
                    type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                    text="remove bid"
                    isLoading={addNftTnxStatus}
                    loadingText={`${addNftTnxStatus?.status}`}
                    onClick={removeBid}
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
      {filterSelected === 0 ? (
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

      {filterSelected === 1 ? (
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
