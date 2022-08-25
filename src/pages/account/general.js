import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack,
  TagRightIcon,
  Input,
  useClipboard,
  Square,
  Image,
  Tag,
  TagLabel,
  useMediaQuery,
  Stack,
  TableContainer,
  HStack,
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Center,
  Td,
  Skeleton,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import AzeroIcon from "@theme/assets/icon/Azero.js";
// import ImageAccountBanner from "@theme/assets/image-account-banner.png";

import FeeInfoModal from "./components/Modal/FeeInfo";

import { clientAPI } from "@api/client";
import { useCallback, useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";

import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import BN from "bn.js";
import { motion, AnimatePresence } from "framer-motion";
import { truncateStr } from "@utils";
import CommonContainer from "../../components/Container/CommonContainer";
import { fetchUserBalance } from "../launchpad/component/Form/AddNewProject";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import collection_manager from "@utils/blockchain/collection-manager";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { useDispatch } from "react-redux";
import { START, CLAIM_REWARDS } from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
// eslint-disable-next-line no-unused-vars
import AnimationLoader from "@components/Loader/AnimationLoader";

function GeneralPage() {
  const history = useHistory();
  const { api, currentAccount } = useSubstrateState();
  const { hasCopied, onCopy } = useClipboard(currentAccount.address);

  const [nftList, setNftList] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);
  const [tradeFee, setTradeFee] = useState(null);

  const [estimatedEarning, setEstimatedEarning] = useState(0);
  const [rewardHistory, setRewardHistory] = useState([]);
  const [rewardStarted, setIsRewardStarted] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [estimatedEarningBaseRewardPool, setEstimatedEarningBaseRewardPool] =
    useState(0);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate([CLAIM_REWARDS], () =>
    getRewardHistory()
  );

  const checkRewardStatus = useCallback(async () => {
    let is_reward_started = await staking_calls.getRewardStarted(
      currentAccount
    );

    // console.log("zxczxczxc is_reward_started", is_reward_started);
    setIsRewardStarted(is_reward_started);
    let is_claimed = await staking_calls.isClaimed(
      currentAccount,
      currentAccount.address
    );
    // console.log("zxczxczxc is_claimed", is_claimed);
    setClaimed(is_claimed);
    console.log("first");
  }, [currentAccount]);

  const getRewardHistory = useCallback(async () => {
    const rewards = await clientAPI("post", "/getClaimRewardHistory", {
      staker_address: currentAccount.address,
    });

    // console.log("rewards", rewards);

    rewards ? setRewardHistory(rewards) : setRewardHistory([]);
  }, [currentAccount]);

  const fetchAllNfts = useCallback(async () => {
    const options = {
      owner: currentAccount?.address,
    };

    try {
      const nftListPromise = await clientAPI(
        "post",
        "/getNFTsByOwner",
        options
      );
      const platformTotalStaked = await staking_calls.getTotalStaked(
        currentAccount
      );
      //setPlatformTotalStaked(platformTotalStaked);
      // console.log("zxc platformTotalStaked", platformTotalStaked);
      const totalStakedPromise = await staking_calls.getTotalStakedByAccount(
        currentAccount,
        currentAccount?.address
      );
      // console.log("zxc totalStakedPromise", totalStakedPromise);

      const marketplaceProfit =
        await marketplace_contract_calls.getCurrentProfit(currentAccount);

      // console.log("zxc marketplaceProfit", marketplaceProfit);

      const launchpadBalance = await fetchUserBalance({
        currentAccount,
        api,
        address: launchpad_manager?.CONTRACT_ADDRESS,
      });
      const collectionBalance = await fetchUserBalance({
        currentAccount,
        api,
        address: collection_manager?.CONTRACT_ADDRESS,
      });
      const totalProfit =
        marketplaceProfit +
        launchpadBalance?.balance +
        collectionBalance?.balance;

      const estimatedEarning = platformTotalStaked
        ? (totalProfit * 0.3 * totalStakedPromise) / platformTotalStaked
        : 0;
      setEstimatedEarning(estimatedEarning);
      let rewardPoolData = await staking_calls.getRewardPool(currentAccount);

      const estimatedEarningBaseRewardPoolData = rewardPoolData
        ? (rewardPoolData * totalStakedPromise) / platformTotalStaked
        : 0;

      setEstimatedEarningBaseRewardPool(estimatedEarningBaseRewardPoolData);

      Promise.all([nftListPromise, totalStakedPromise]).then(
        ([nftList, totalStaked]) => {
          const nftForSale = nftList.reduce(function (a, b) {
            return a + (b.is_for_sale | 0);
          }, 0);
          let info = [{ address: currentAccount?.address }];

          info = [
            ...info,
            { name: "NFTs for sale", value: nftForSale },
            { name: "Staked NFTs", value: totalStaked },
            {
              name: "Total Owned NFTs",
              value: nftList.length + totalStaked,
            },
          ];

          setDashboardInfo(info);

          setNftList(nftList);
          setTotalStaked(totalStaked);
        }
      );
    } catch (error) {
      console.log(error);

      toast.error("There was an error while fetching the collections.");
    }
  }, [api, currentAccount]);

  const getTradeFee = useCallback(async () => {
    let my_total_staked_az_nfts = await staking_calls.getTotalStakedByAccount(
      currentAccount,
      currentAccount.address
    );

    let stakingDiscountCriteria =
      await marketplace_contract_calls.getStakingDiscountCriteria(
        currentAccount
      );

    let stakingDiscountRate =
      await marketplace_contract_calls.getStakingDiscountRate(currentAccount);

    let my_discount_rate =
      (await marketplace_contract_calls.getPlatformFee(currentAccount)) / 100;

    let length = stakingDiscountRate.length;

    for (var index = 0; index < length; index++) {
      if (
        my_total_staked_az_nfts >=
        new BN(stakingDiscountCriteria[index]).toNumber()
      ) {
        my_discount_rate =
          (my_discount_rate *
            (10000 - new BN(stakingDiscountRate[index]).toNumber())) /
          10000;
        break;
      }
    }
    setTradeFee(my_discount_rate);
  }, [currentAccount]);

  const claimReward = async () => {
    dispatch(setTxStatus({ type: CLAIM_REWARDS, step: START }));

    await staking_calls.claimReward(
      currentAccount,
      dispatch,
      CLAIM_REWARDS,
      api
    );
    await checkRewardStatus();
  };

  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        // console.log("setLoading(true..................");
        await checkRewardStatus();
        await getRewardHistory();

        if (
          !nftList ||
          (dashboardInfo?.length &&
            dashboardInfo[0].address !== currentAccount?.address)
        ) {
          await fetchAllNfts();
        }

        await getTradeFee();
        setLoading(false);

        // console.log("setLoading(false..................");
      } catch (error) {
        // console.log("setLoading(false..................");
        setLoading(false);

        console.log(error);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, checkRewardStatus, currentAccount, getRewardHistory]);
  // console.log("loadingloadingloadingloadingloading", loading);
  return (
    <CommonContainer>
      {/* {loading ? (
        // <Text>Loading...</Text>
        <AnimationLoader loadingTime={3} />
      ) : ( */}
      <>
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={6}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>dashboard</Heading>

              <Flex alignItems="center">
                <Button
                  variant="outline"
                  onClick={onCopy}
                  borderWidth={1}
                  borderColor="#7AE7FF"
                  p={2}
                  my={3}
                  mr={3}
                  h={9}
                >
                  <Text fontFamily="Oswald">
                    {isLargerThan480
                      ? currentAccount?.address
                      : truncateStr(currentAccount?.address, 6)}
                  </Text>
                  <Input
                    display="none"
                    defaultValue={currentAccount?.address}
                    px={2}
                    h={8}
                    mx={0}
                    minW={"sm"}
                    readOnly={true}
                    cursor="pointer"
                    color="brand.blue"
                    borderWidth={1}
                    borderColor="brand.blue"
                  />
                </Button>
                {hasCopied ? (
                  <Tag variant="outline">
                    <TagLabel>Copied</TagLabel>
                  </Tag>
                ) : (
                  ""
                )}
                <Spacer />
              </Flex>
            </motion.div>
          </Box>

          <Grid
            w="full"
            minH={"7rem"}
            gap={{ base: "15px", md: "30px" }}
            templateColumns={{
              base: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              lg: "repeat(auto-fill, minmax(min(100%, 290px), 1fr))",
              xl: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {dashboardInfo
              ?.filter((item) => !Object.keys(item).includes("address"))
              .map((item, idx) => {
                return (
                  <GridItem key={idx} w="100%" h="100%">
                    <Box
                      w="full"
                      textAlign="left"
                      bg="brand.grayDark"
                      px={4}
                      py={3}
                    >
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Flex w="full">
                            <Box>
                              <Text
                                fontSize={{ base: "md", md: "lg" }}
                                color="#888"
                              >
                                {item.name}
                              </Text>
                              {/* <Flex alignItems="center">
                                <Tag bg="transparent" pl={0}>
                                  <TagLabel
                                    bg="transparent"
                                    fontSize="5xl"
                                    fontFamily="DS-Digital"
                                  >
                                    {item.value}
                                  </TagLabel>
                                  {item.name === "Amount Trades" && (
                                    <TagRightIcon
                                      fontSize="2xl"
                                      as={AzeroIcon}
                                    />
                                  )}
                                </Tag>
                              </Flex> */}
                            </Box>
                            <Spacer />
                          </Flex>
                          <Flex w="full" textAlign="left">
                            <Spacer />
                            <Flex alignItems="center">
                              <Tag bg="transparent" pl={0}>
                                <TagLabel
                                  bg="transparent"
                                  fontSize={["4xl", "5xl", "5xl"]}
                                  fontFamily="DS-Digital"
                                >
                                  {item.value}
                                </TagLabel>
                                {item.name === "Amount Trades" && (
                                  <TagRightIcon fontSize="2xl" as={AzeroIcon} />
                                )}
                              </Tag>
                            </Flex>
                          </Flex>
                        </motion.div>
                      </AnimatePresence>
                    </Box>
                  </GridItem>
                );
              })}
          </Grid>
        </VStack>

        <Stack
          h="full"
          my={10}
          bg="black"
          pos="relative"
          maxW="container.xl"
          p={{ base: "35px", "2xl": "7" }}
          direction={{ base: "column", xl: "row" }}
        >
          <Square
            mx="auto"
            bg="#222"
            size={{ base: "240px", xl: "18rem", "2xl": "20rem" }}
          >
            <Image
              w="full"
              h="full"
              src="https://api.artzero.io/getImage?input=QmQRXjhAbKc6Jv9nKyd4Z7Ncit143F8ghcJEkEezgNGNkH&size=500&url=https://ipfs.infura.io/ipfs/QmQRXjhAbKc6Jv9nKyd4Z7Ncit143F8ghcJEkEezgNGNkH"
            />
          </Square>

          <VStack
            pr={2}
            w="full"
            textAlign="left"
            h={{ xl: "288px" }}
            pl={{ base: "0", xl: "40px" }}
          >
            <Flex w="full">
              <Box
                w="full"
                fontFamily="Evogria Italic"
                fontSize={{ base: "24px", xl: "3xl-mid" }}
                color="#FFF"
              >
                <span>stake your </span>
                <span style={{ color: "#7AE7FF" }}>
                  praying mantis predators
                </span>
                <div />
                <span>to reduce your </span>
                <span style={{ color: "#7AE7FF" }}>fees</span>
                <span> and earn </span>
                <span style={{ color: "#7AE7FF" }}>AZERO</span>
              </Box>
              <Spacer />
              <Box
                h={32}
                w={28}
                variant="outline"
                display={{ base: "none", xl: "flex" }}
              >
                <Tag variant="outline" h={6} w={"128px"} mt={3}>
                  {
                    <TagLabel fontSize="14px">
                      Trade Fee: {tradeFee && `${tradeFee}%`}
                    </TagLabel>
                  }
                </Tag>
              </Box>
            </Flex>

            <Flex w="full">
              <Text
                mt={0}
                mb={1}
                color="#fff"
                fontSize={{ base: "16px", xl: "lg" }}
              >
                Your Total Stake:{" "}
                <span style={{ color: "#7AE7FF" }}>
                  {totalStaked || 0} NFT{totalStaked > 1 ? "s" : ""}
                </span>
              </Text>
              <Text mx="30px" fontSize={{ base: "16px", xl: "lg" }}>
                Reward Distribution Status:{" "}
                <Text as="span" color="#7AE7FF" mr="30px">
                  {rewardStarted ? "Active" : "Inactive"}
                </Text>
              </Text>
            </Flex>
            <Stack
              direction={{ base: "column", xl: "row" }}
              w="full"
              align="flex-start"
            >
              <Skeleton maxW="300px" isLoaded={!loading}>
                <Text
                  mt={0}
                  mb={1}
                  color="#fff"
                  fontSize={{ base: "16px", xl: "lg" }}
                >
                  Your Estimated Earning:{" "}
                  <Text as="span" color="#7AE7FF" mr="30px">
                    {rewardStarted && claimed
                      ? 0
                      : !rewardStarted
                      ? parseFloat(estimatedEarning).toFixed(3)
                      : estimatedEarningBaseRewardPool}{" "}
                    <AzeroIcon
                      mb="2px"
                      w={["14px", "16px", "16px"]}
                      h={["14px", "16px", "16px"]}
                    />
                  </Text>
                </Text>
              </Skeleton>
              <Text fontSize={{ base: "16px", xl: "lg" }}>
                Next Payout:{" "}
                <Text as="span" color="#7AE7FF" mr="30px">
                  Sep 01, 2022
                </Text>
              </Text>
            </Stack>

            <Skeleton
              isLoaded={!loading}
              pt="20px"
              // align="center"
              w="full"
              alignItems="center"
              justifyContent="flex-start"
              direction={{ base: "column", xl: "row" }}
            >
              <Box
                pb="20px"
                w={"full"}
                variant="outline"
                display={{ base: "flex", xl: "none" }}
              >
                <Tag
                  h={6}
                  // w={"full"}
                  mt={3}
                  mx="auto"
                  textAlign="center"
                  variant="outline"
                >
                  <TagLabel textAlign="center">
                    Your Current Trade Fee: {tradeFee && `${tradeFee}%`}
                  </TagLabel>
                </Tag>
              </Box>
              {console.log("rewardStarted", rewardStarted)}
              {console.log("claimed", claimed)}
              {rewardStarted && !claimed ? (
                <CommonButton
                  {...rest}
                  text={claimed ? "rewards is claimed" : "claim rewards"}
                  isDisabled={claimed || !estimatedEarningBaseRewardPool}
                  onClick={() => claimReward()}
                />
              ) : null}

              <Button
                ml="20px"
                w={{ base: "full", xl: "auto" }}
                variant="solid"
                onClick={() => history.push(ROUTES.ACCOUNT_MY_STAKES)}
              >
                stake now
              </Button>

              <FeeInfoModal />
            </Skeleton>
          </VStack>
        </Stack>

        <Stack>
          <Box maxW="6xl-mid" fontSize="lg">
            <HStack pb={5} borderBottomWidth={1}>
              <Flex alignItems="start" pr={20}>
                <Text ml={1} color="brand.grayLight">
                  Recent Reward History
                </Text>
              </Flex>
            </HStack>
            <TableContainer
              maxW="6xl-mid"
              fontSize="lg"
              h="full"
              overflow="auto"
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
              <Skeleton w="full" isLoaded={!loading}>
                <Table
                  variant="striped"
                  colorScheme="blackAlpha"
                  overflow="auto"
                >
                  <Thead>
                    <Tr>
                      <Th
                        textAlign="center"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        BlockNumber
                      </Th>
                      <Th
                        textAlign="center"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Staker
                      </Th>
                      <Th
                        textAlign="center"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Staked Amount
                      </Th>
                      <Th
                        textAlign="center"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Reward Amount
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {rewardHistory.length === 0 ? (
                      <Tr color="#fff">
                        <Center py={7}>No record found</Center>
                      </Tr>
                    ) : (
                      rewardHistory.map((reward, index) => (
                        <Tr key={index} color="#fff">
                          {/* <Td py={7}>{truncateStr(reward.address, 5)}</Td> */}
                          <Td textAlign="center" py={7}>
                            {reward.blockNumber}
                          </Td>
                          <Td textAlign="center" py={7}>
                            {reward.staker}
                          </Td>
                          <Td textAlign="center" py={7}>
                            {reward.stakedAmount}
                          </Td>
                          <Td textAlign="center" py={7}>
                            {reward.rewardAmount}
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </Skeleton>
            </TableContainer>
          </Box>
        </Stack>
      </>
      {/* )} */}
    </CommonContainer>
  );
}

export default GeneralPage;
