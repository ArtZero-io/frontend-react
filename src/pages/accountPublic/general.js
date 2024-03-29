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

  Skeleton,
} from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import FeeInfoModal from "./components/Modal/FeeInfo";

import { useCallback, useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";

import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { motion } from "framer-motion";
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

import { APICall } from "@api/client";
import { useMemo } from "react";
import { clearTxStatus } from "@store/actions/txStatus";
import { fetchMyPMPPendingCount } from "./stakes";

function GeneralPage() {
  const history = useHistory();
  const {address} = useParams()

  const { api, currentAccount } = useSubstrateState();
  const { hasCopied, onCopy } = useClipboard(address);

  const [nftList, setNftList] = useState(null);
  const [totalStaked, setTotalStaked] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);
  const [tradeFee, setTradeFee] = useState(null);
  const [platformFee, setPlatformFee] = useState(null);

  const [estimatedEarning, setEstimatedEarning] = useState(0);
  const [rewardStarted, setIsRewardStarted] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [estimatedEarningBaseRewardPool, setEstimatedEarningBaseRewardPool] =
    useState(0);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate(
    [CLAIM_REWARDS],
    () => {
      checkRewardStatus();
    }
  );

  const checkRewardStatus = useCallback(async () => {
    let is_reward_started = await staking_calls.getRewardStarted(
      currentAccount
    );

    setIsRewardStarted(is_reward_started);
    let is_claimed = await staking_calls.isClaimed(
      currentAccount,
      address
    );
    setClaimed(is_claimed);
  }, [address, currentAccount]);

  const fetchAllNfts = useCallback(
    async (isMounted) => {
      const options = {
        owner: address,
      };

      try {
        const { ret: nftListPromise } = await APICall.getNFTsByOwner(options);

        const platformTotalStaked = await staking_calls.getTotalStaked(
          currentAccount
        );

        //setPlatformTotalStaked(platformTotalStaked);
        const totalStakedPromise = await staking_calls.getTotalStakedByAccount(
          currentAccount,
          address
        );

        const marketplaceProfit =
          await marketplace_contract_calls.getCurrentProfit(currentAccount);

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

        const estimatedEarning =
          platformTotalStaked * 1
            ? (totalProfit * 0.3 * totalStakedPromise) /
              (platformTotalStaked * 1)
            : 0;

        if (!isMounted) return;

        setEstimatedEarning(estimatedEarning);
        let rewardPoolData = await staking_calls.getRewardPool(currentAccount);

        const estimatedEarningBaseRewardPoolData = rewardPoolData
          ? (rewardPoolData * totalStakedPromise) / platformTotalStaked
          : 0;

        setEstimatedEarningBaseRewardPool(estimatedEarningBaseRewardPoolData);

        const pendingCount = await fetchMyPMPPendingCount(
          currentAccount,
          staking_calls
        );

        Promise.all([nftListPromise, 1 * totalStakedPromise]).then(
          ([nftList, totalStaked]) => {
            const nftForSale = nftList.reduce(function (a, b) {
              return a + (b.is_for_sale | 0);
            }, 0);
            let info = [{ address: address }];

            info = [
              ...info,
              { name: "NFTs for sale", value: nftForSale },
              { name: "Staked NFTs", value: totalStaked },
              { name: "Pending Staked NFTs", value: pendingCount * 1 },
              {
                name: "Total Owned NFTs",
                value: nftList.length + totalStaked + pendingCount * 1,
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
    },
    [api, currentAccount]
  );

  const getTradeFee = useCallback(
    async (isMounted) => {
      let my_total_staked_az_nfts = await staking_calls.getTotalStakedByAccount(
        currentAccount,
        address
      );

      let stakingDiscountCriteria =
        await marketplace_contract_calls.getStakingDiscountCriteria(
          currentAccount
        );

      let stakingDiscountRate =
        await marketplace_contract_calls.getStakingDiscountRate(currentAccount);

      let my_discount_rate =
        (await marketplace_contract_calls.getPlatformFee(currentAccount)) / 100;

      if (!isMounted) return;

      setPlatformFee(my_discount_rate);

      let length = stakingDiscountRate?.length;

      for (var index = 0; index < length; index++) {
        if (1 * my_total_staked_az_nfts >= stakingDiscountCriteria[index]) {
          my_discount_rate =
            (my_discount_rate *
              (10000 - 1 * stakingDiscountRate[index]?.replaceAll(",", ""))) /
            10000;
          break;
        }
      }

      setTradeFee(my_discount_rate);
    },
    [currentAccount]
  );

  const [isLargerThan480] = useMediaQuery("(min-width: 480px)");
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        await checkRewardStatus(isMounted);

        if (
          !nftList ||
          (dashboardInfo?.length &&
            dashboardInfo[0].address !== address)
        ) {
          await fetchAllNfts(isMounted);
        }

        await getTradeFee(isMounted);

        if (!isMounted) return;

        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, checkRewardStatus, currentAccount]);

  const lastDay = useMemo(() => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return lastDay.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <CommonContainer>
      <>
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={[0, "24px"]}>
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
                  <Text fontFamily="Oswald" fontSize={["14px", "16px"]}>
                    {isLargerThan480
                      ? address
                      : truncateStr(address, 16)}
                  </Text>
                  <Input
                    display="none"
                    defaultValue={address}
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
                  <Tag variant="outline" fontSize={["14px", "16px"]}>
                    <TagLabel>Copied</TagLabel>
                  </Tag>
                ) : (
                  ""
                )}
                <Spacer />
              </Flex>
            </motion.div>
          </Box>

          <div style={{ display: "grid", width: "100%" }}>
            <Grid
              w="full"
              minH={"7rem"}
              gap={{ base: "10px", lg: "30px" }}
              templateColumns={{
                base: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
                sm: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
                md: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
                xl: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
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
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Flex w="full">
                              <Box>
                                <Text
                                  display={["none", "block"]}
                                  fontSize={{ base: "md", md: "lg" }}
                                  color="#888"
                                >
                                  {item.name}
                                </Text>
                              </Box>
                              <Spacer />
                            </Flex>
                            <Flex w="full" textAlign="left" alignItems="center">
                              <Text
                                display={["block", "none"]}
                                fontSize="lg"
                                color="#888"
                              >
                                {item.name}
                              </Text>
                              <Spacer />
                              <Flex alignItems="center">
                                <Tag bg="transparent" pl={0}>
                                  <TagLabel
                                    bg="transparent"
                                    fontSize={["24px", "40px"]}
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
                              </Flex>
                            </Flex>
                          </motion.div>
                        </>
                      </Box>
                    </GridItem>
                  );
                })}
            </Grid>
          </div>
        </VStack>

        <Stack
          h="full"
          my="18px"
          bg="black"
          pos="relative"
          maxW="container.xl"
          p={{ base: "20px", md: "30px" }}
          direction={{ base: "column", md: "row" }}
        >
          <Square
            mx="auto"
            bg="#222"
            w="full"
            h="full"
            maxW="300px"
            maxH="300px"
          >
            <Image
              w="full"
              h="full"
              src="https://imagedelivery.net/Iw4Pp5uTB3HCaJ462QFK1Q/QmQRXjhAbKc6Jv9nKyd4Z7Ncit143F8ghcJEkEezgNGNkH/500"
            />
          </Square>

          <Flex w="full" display={["flex", "none"]} justifyContent="start">
            <Tag variant="outline" my="10px">
              <TagLabel>Trade Fee: {tradeFee && `${tradeFee}%`}</TagLabel>
            </Tag>
          </Flex>

          <VStack
            w="full"
            pr={[0, "8px"]}
            textAlign="left"
            h={{ xl: "288px" }}
            pl={{ base: "0", lg: "10px", xl: "40px" }}
            spacing="10px"
          >
            <Flex w="full" mb="8px">
              <Box
                w="full"
                lineHeight={["30px", "48px"]}
                fontFamily="Evogria Italic"
                fontSize={{ base: "24px", md: "28px", xl: "3xl-mid" }}
              >
                <span>stake </span>
                <span style={{ color: "#7AE7FF" }}>
                  praying mantis predators
                </span>{" "}
                <Box display={{ base: "none", xl: "flex" }} />
                <span>to reduce </span>
                <span style={{ color: "#7AE7FF" }}>fees</span>
                <span> and earn </span>
                <span style={{ color: "#7AE7FF" }}>AZERO</span>
              </Box>

              <Spacer />

              <Box variant="outline" display={{ base: "none", md: "flex" }}>
                <Tag variant="outline" h={6} minW={"128px"} mt={3}>
                  {
                    <TagLabel fontSize="16px">
                      Trade Fee: {tradeFee && `${tradeFee}%`}
                    </TagLabel>
                  }
                </Tag>
              </Box>
            </Flex>

            <Stack
              w="full"
              spacing="8px"
              direction={{ base: "column", md: "row" }}
            >
              <Stack minW="280px">
                <Text color="#fff" fontSize={{ base: "16px", xl: "lg" }}>
                  Total Stake:{" "}
                  <span style={{ color: "#7AE7FF" }}>
                    {totalStaked || 0} NFT{totalStaked > 1 ? "s" : ""}
                  </span>
                </Text>
              </Stack>
              <Stack>
                <Text fontSize={{ base: "16px", xl: "lg" }}>
                  Reward Distribution Status:{" "}
                  <Text as="span" color="#7AE7FF" mr="30px">
                    {rewardStarted ? "Active" : "Inactive"}
                  </Text>
                </Text>
              </Stack>
            </Stack>

            <Stack
              w="full"
              spacing="8px"
              direction={{ base: "column", md: "row" }}
            >
              <Skeleton minW="280px" isLoaded={!loading}>
                <Text color="#fff" fontSize={{ base: "16px", xl: "lg" }}>
                  Estimated Earning:{" "}
                  <Text as="span" color="#7AE7FF" mr="30px">
                    {rewardStarted && claimed
                      ? 0
                      : !rewardStarted
                      ? parseFloat(estimatedEarning).toFixed(3)
                      : parseFloat(estimatedEarningBaseRewardPool).toFixed(
                          3
                        )}{" "}
                    <AzeroIcon
                      mb="2px"
                      w={["14px", "16px"]}
                      h={["14px", "16px"]}
                    />
                  </Text>
                </Text>
              </Skeleton>

              <Stack>
                <Text fontSize={{ base: "16px", xl: "lg" }}>
                  Next Payout:{" "}
                  <Text as="span" color="#7AE7FF" mr="30px">
                    {lastDay}
                  </Text>
                </Text>
              </Stack>
            </Stack>

            <Skeleton
              h="full"
              w="full"
              pt={["10px", 0]}
              display="flex"
              isLoaded={!loading}
              alignItems={["start", "center"]}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Button
                variant="solid"
                w={{ base: "full", md: "auto" }}
                onClick={() => history.push(ROUTES.ACCOUNT_MY_STAKES)}
              >
                stake now
              </Button>

              <FeeInfoModal platformFee={platformFee} />
            </Skeleton>
          </VStack>
        </Stack>

      </>
      {/* )} */}
    </CommonContainer>
  );
}

export default GeneralPage;
