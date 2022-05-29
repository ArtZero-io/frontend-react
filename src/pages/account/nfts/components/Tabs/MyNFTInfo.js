import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Progress,
  Skeleton,
  useBreakpointValue,
  TagLabel,
  TagRightIcon,
  Link,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import marketplace from "@utils/blockchain/marketplace";
import marketplace_contract from "@utils/blockchain/marketplace";
import { useDispatch, useSelector } from "react-redux";

import StatusPushForSaleButton from "@components/Button/StatusPushForSaleButton";
import { AccountActionTypes } from "@store/types/account.types";
import { convertStringToPrice, createLevelAttribute } from "@utils";
import StatusBuyButton from "@components/Button/StatusBuyButton";
import { getCachedImageShort, truncateStr } from "@utils";
import { Link as ReactRouterLink } from "react-router-dom";
import profile_calls from "@utils/blockchain/profile_calls";
import { motion, AnimatePresence } from "framer-motion";

function MyNFTTabInfo({
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
}) {
  const { api, currentAccount } = useSubstrateState();
  const [askPrice, setAskPrice] = useState(10);
  const [isAllowanceMarketplaceContract, setIsAllowanceMarketplaceContract] =
    useState(false);

  const [stepNo, setStepNo] = useState(0);
  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);

  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

  const [action, setAction] = useState("");
  const [saleInfo, setSaleInfo] = useState(null);
  const [isBided, setIsBided] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [ownerName, setOwnerName] = useState("");

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

  useEffect(() => {
    const checkAllowance = async () => {
      const isAllowance = await nft721_psp34_standard_calls.allowance(
        currentAccount,
        currentAccount?.address,
        marketplace_contract.CONTRACT_ADDRESS,
        { u64: tokenID },
        dispatch
      );

      if (isAllowance) {
        setIsAllowanceMarketplaceContract(true);
        setStepNo(1);
      }
    };

    checkAllowance();
  }, [addNftTnxStatus?.status, currentAccount, dispatch, tokenID]);

  const approveToken = async () => {
    if (owner === currentAccount?.address) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );

      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });

      await nft721_psp34_standard_calls.approve(
        currentAccount,
        marketplace.CONTRACT_ADDRESS,
        { u64: tokenID },
        true,
        dispatch
      );

      const isAllowance = await nft721_psp34_standard_calls.allowance(
        currentAccount,
        currentAccount?.address,
        marketplace_contract.CONTRACT_ADDRESS,
        { u64: tokenID },
        dispatch
      );

      if (isAllowance) {
        setIsAllowanceMarketplaceContract(true);
      }
    }
  };

  const listToken = async () => {
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
      console.log("isAllowance", isAllowance);
      let res;
      if (!isAllowance) {
        toast.success("Step 1: Approving NFT transfer...");

        res = await nft721_psp34_standard_calls.approve(
          currentAccount,
          marketplace.CONTRACT_ADDRESS,
          { u64: tokenID },
          true,
          dispatch
        );
        console.log("res", res);
      }
      if (res || isAllowance) {
        toast.success(
          res
            ? "Step 2: Listing on marketplace..."
            : "Listing on marketplace..."
        );
        await marketplace_contract_calls.list(
          currentAccount,
          nftContractAddress,
          { u64: tokenID },
          askPrice,
          dispatch
        );
      }

      // dispatch({
      //   type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
      //   payload: {
      //     status: "Start",
      //   },
      // });
    } else {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });

      toast.error(`This token is not yours!`);
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
  return (
    <Flex h="full">
      <Box minW={{ base: "20rem", "2xl": "30rem" }} bg="#372648">
        <Image
          w="full"
          h="full"
          boxShadow="lg"
          alt="nft-img"
          objectFit="cover"
          src={avatar && getCachedImageShort(avatar, 500)}
          fallback={<Skeleton minW={{ base: "20rem", "2xl": "30rem" }} />}
        />
      </Box>

      <Flex
        w="full"
        ml={10}
        direction={"column"}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box w="full">
          <Flex>
            <Heading
              color="#fff"
              size="h4"
              fontSize={{ base: "1rem", "2xl": "2rem" }}
            >
              {nftName}
            </Heading>
            <Spacer />
          </Flex>
          <Heading
            size="h6"
            py={3}
            fontSize={{ base: "0.8rem", "2xl": "1rem" }}
            color="brand.grayLight"
            lineHeight="1.35"
          >
            {description}
          </Heading>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ paddingBottom: "30px" }}
            >
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
            </motion.div>
          </AnimatePresence>
        </Box>

        {attrsList?.length === 0 ? (
          <Text my="3" display={{ base: "none", xl: "block" }}>
            This NFT have no props/ levels.
          </Text>
        ) : (
          <>
            <Grid
              boxShadow="lg"
              mb={2}
              minH="10rem"
              w="full"
              templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
              gap={{ base: "0.5rem", "2xl": "1.25rem" }}
              pr={"0.25rem"}
              overflowY="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "0.3rem",
                  borderRadius: "1px",
                  backgroundColor: `#7ae7ff`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `#7ae7ff`,
                },
              }}
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
                                fontSize={{ base: "1rem", "2xl": "1.125rem" }}
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
                    })
                : null}
            </Grid>
          </>
        )}

        <>
          {!is_for_sale && (
            <Fragment>
              <Flex
                w="full"
                py={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Spacer />
                <InputGroup
                  maxW={32}
                  mr={2}
                  px={0}
                  w="full"
                  bg="brand.semiBlack"
                  h={14}
                  py={0}
                  color="#fff "
                  borderRadius="0"
                >
                  <Input
                    value={askPrice}
                    onChange={({ target }) => setAskPrice(target.value)}
                    m={0}
                    h={14}
                    pl={5}
                    bg="black"
                    variant="unstyled"
                    placeholder="10"
                    _placeholder={{
                      color: "#888",
                      fontSize: "lg",
                    }}
                  />
                  <InputRightElement bg="transparent" h={14} w={16}>
                    <AzeroIcon />
                  </InputRightElement>
                </InputGroup>

                <StatusPushForSaleButton
                  isAllowanceMpContract={isAllowanceMarketplaceContract}
                  type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                  text="push for sale"
                  isLoading={addNftTnxStatus}
                  loadingText={`${addNftTnxStatus?.status}`}
                  stepNo={stepNo}
                  setStepNo={setStepNo}
                  approveToken={approveToken}
                  listToken={listToken}
                />
              </Flex>
            </Fragment>
          )}

          {filterSelected !== 2 &&
            owner === marketplace.CONTRACT_ADDRESS &&
            is_for_sale && (
              <Flex w="full" py={2} alignItems="center" justifyContent="start">
                <Spacer />
                <Flex
                  alignItems="center"
                  justifyContent="start"
                  fontSize="lg"
                  mr={3}
                >
                  <Text color="brand.grayLight">For Sale At</Text>

                  <Text color="#fff" mx={2}>
                    {price / 10 ** 12}
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
              <Flex w="full" py={2} alignItems="center" justifyContent="start">
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
        </>
      </Flex>
    </Flex>
  );
}

export default MyNFTTabInfo;
