import {
  Button,
  Box,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Heading,
  Center,
  Stack,
  TableContainer,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import Loader from "@components/Loader/CommonLoader";
import staking_calls from "@utils/blockchain/staking_calls";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { delay, truncateStr } from "@utils";
import toast from "react-hot-toast";
import { fetchUserBalance } from "../../../launchpad/component/Form/AddNewProject";

import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import collection_manager from "@utils/blockchain/collection-manager";
import { useMemo } from "react";
import { formatNumDynamicDecimal } from "../../../../utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import CommonButton from "@components/Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import {
  WITHDRAW_COLLECTION,
  WITHDRAW_LAUNCHPAD,
  WITHDRAW_MARKETPLACE,
  START,
} from "@constants";
import { withdrawCollectionContract } from "../../../../utils/blockchain/collection-manager-calls";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { withdrawLaunchpadContract } from "../../../../utils/blockchain/launchpad-contract-calls";
import { withdrawMarketplaceContract } from "../../../../utils/blockchain/marketplace_contract_calls";
import { useCallback } from "react";
import useForceUpdate from "@hooks/useForceUpdate";

function RewardDistribution() {
  const { api, currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [addAmount, setAddAmount] = useState(0);
  const [rewardPool, setRewardPool] = useState(0);
  const [claimableReward, setClaimableReward] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [rewardStarted, setIsRewardStarted] = useState(false);
  const [adminAddress, setAdminAddress] = useState("");
  const [stakersCount, setStakerCount] = useState(0);
  const [stakers, setStakers] = useState([]);

  const onRefresh = async () => {
    let reward_pool = await staking_calls.getRewardPool(currentAccount);
    let claimable_reward = await staking_calls.getClaimableReward(
      currentAccount
    );
    let total_staked = await staking_calls.getTotalStaked(currentAccount);
    let is_locked = await staking_calls.getIsLocked(currentAccount);
    let is_reward_started = await staking_calls.getRewardStarted(
      currentAccount
    );
    let admin_address = await staking_calls.getAdminAddress(currentAccount);

    // console.log(reward_pool,claimable_reward);
    setClaimableReward(claimable_reward);
    setRewardPool(reward_pool);
    setTotalStaked(total_staked);
    setIsLocked(is_locked);
    setAdminAddress(admin_address);
    setIsRewardStarted(is_reward_started);
  };

  const getStakers = async () => {
    let staker_count = await staking_calls.getTotalCountOfStakeholders(
      currentAccount
    );
    setStakerCount(staker_count);

    // console.log("staker_count", staker_count);
    let stakers = [];
    for (var i = 0; i < staker_count; i++) {
      let staker = await staking_calls.getStakedAccountsAccountByIndex(
        currentAccount,
        i
      );
      // console.log("staker", staker);
      let staker_info = {
        address: staker,
        amount: await staking_calls.getTotalStakedByAccount(
          currentAccount,
          staker
        ),
        isClaimed: await staking_calls.isClaimed(currentAccount, staker),
      };
      // console.log("staker_info", staker_info);
      stakers.push(staker_info);
    }
    setStakers(stakers);
  };

  const onAddReward = async () => {
    await staking_calls.addReward(currentAccount, addAmount);
    await delay(3000);
    await onRefresh();
  };

  const setStakingStatus = async (status) => {
    if (activeAddress != adminAddress) {
      return toast.error("Only Admin allowed");
    }
    await staking_calls.updateIsLocked(currentAccount, status);
    await delay(3000);
    await onRefresh();
  };

  const setRewardDistribution = async (status) => {
    if (activeAddress != adminAddress) {
      return toast.error("Only Admin allowed");
    }
    if (status) await staking_calls.startRewardDistribution(currentAccount);
    else await staking_calls.stopRewardDistribution(currentAccount);
    await delay(3000);
    await onRefresh();
  };

  const enableClaim = async (staker) => {
    if (activeAddress != adminAddress) {
      return toast.error("Only Admin allowed");
    }
    console.log("staker", staker);
    await staking_calls.setClaimable(currentAccount, staker);
    getStakers();
  };

  useEffect(async () => {
    onRefresh();
    getStakers();
  }, [currentAccount]);

  const dispatch = useDispatch();
  const [contractBalance, setContractBalance] = useState({});
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate } = useForceUpdate(
    [WITHDRAW_COLLECTION, WITHDRAW_LAUNCHPAD, WITHDRAW_MARKETPLACE],
    () => fetchContractBalance()
  );

  const fetchContractBalance = useCallback(async () => {
    try {
      const marketBalance = await marketplace_contract_calls.getCurrentProfit(
        currentAccount
      );

      const { balance: collectionBalance } = await fetchUserBalance({
        currentAccount,
        api,
        address: collection_manager?.CONTRACT_ADDRESS,
      });

      const { balance: launchpadBalance } = await fetchUserBalance({
        currentAccount,
        api,
        address: launchpad_manager?.CONTRACT_ADDRESS,
      });

      setContractBalance({
        marketplace: marketBalance,
        collection: collectionBalance,
        launchpad: launchpadBalance,
      });
    } catch (error) {
      console.log("x_x fetchContractBalance error", error);
    }
  }, [api, currentAccount]);

  useEffect(() => {
    fetchContractBalance();
  }, [fetchContractBalance]);

  const formatContractBalance = useMemo(() => {
    const balance = Object.entries(contractBalance)?.map(([k, v]) => {
      return {
        name: k.toUpperCase(),
        balance: v,
        percent: "30%",
        net: v * 0.3,
      };
    });

    const total = {
      name: "TOTAL",
      balance: balance.reduce((a, b) => a + b.balance, 0),
      percent: "",
      net: balance.reduce((a, b) => a + b.net, 0),
    };

    return [...balance, total];
  }, [contractBalance]);

  const handleWithdrawBalance = async (item) => {
    try {
      // claim marketplace contract
      if (item.name === "MARKETPLACE") {
        const marketplaceAdminAddress = await marketplace_contract_calls.owner(
          currentAccount
        );

        console.log("marketplaceAdminAddress", marketplaceAdminAddress);
        if (currentAccount.address !== marketplaceAdminAddress) {
          return toast.error(
            `Only admin (${truncateStr(marketplaceAdminAddress)}) is allowed!`
          );
        }
        dispatch(setTxStatus({ type: WITHDRAW_MARKETPLACE, step: START }));

        toast.success(
          `Claiming ${formatNumDynamicDecimal(item.balance, 2)} AZERO!`
        );

        await withdrawMarketplaceContract(
          currentAccount,
          item.balance,
          dispatch,
          WITHDRAW_MARKETPLACE,
          api
        );
      }

      // claim collection contract
      if (item.name === "COLLECTION") {
        const collectionAdminAddress =
          await collection_manager_calls.getAdminAddress(currentAccount);

        if (currentAccount.address !== collectionAdminAddress) {
          return toast.error(
            `Only admin (${truncateStr(collectionAdminAddress)}) is allowed!`
          );
        }

        dispatch(setTxStatus({ type: WITHDRAW_COLLECTION, step: START }));

        toast.success(
          `Claiming ${formatNumDynamicDecimal(item.balance, 2)} AZERO!`
        );

        await withdrawCollectionContract(
          currentAccount,
          item.balance,
          dispatch,
          WITHDRAW_COLLECTION,
          api
        );
      }

      // claim launchpad contract
      if (item.name === "LAUNCHPAD") {
        const launchpadAdminAddress =
          await launchpad_contract_calls.getAdminAddress(currentAccount);

        console.log("launchpadAdminAddress", launchpadAdminAddress);
        if (currentAccount.address !== launchpadAdminAddress) {
          return toast.error(
            `Only admin (${truncateStr(launchpadAdminAddress)}) is allowed!`
          );
        }

        dispatch(setTxStatus({ type: WITHDRAW_LAUNCHPAD, step: START }));

        toast.success(
          `Claiming ${formatNumDynamicDecimal(item.balance, 2)} AZERO!`
        );

        await withdrawLaunchpadContract(
          currentAccount,
          item.balance,
          dispatch,
          WITHDRAW_LAUNCHPAD,
          api
        );
      }
    } catch (error) {
      console.log("x_x handleWithdrawBalance error", error);
    }
  };

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
          <Box
            mx="auto"
            px={{ base: "6", "2xl": "8" }}
            py={{ base: "8", "2xl": "4" }}
          >
            <Box maxW="6xl-mid" fontSize="lg" pb="30px">
              <Heading textAlign="left" size="h5">
                contracts balance
              </Heading>
              <TableContainer>
                <Table variant="striped" colorScheme="blackAlpha">
                  <Thead fontFamily="Evogria" fontSize="sm">
                    <Tr>
                      <Th>Contract Name</Th>
                      <Th>Balance</Th>
                      <Th>Percent</Th>
                      <Th>Net Profit</Th>
                      <Th>Claim</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {formatContractBalance.map((item) => (
                      <Tr>
                        <Td>{item.name.toLocaleUpperCase()}</Td>
                        <Td>
                          {formatNumDynamicDecimal(item.balance, 2)} AZERO
                        </Td>
                        <Td>{item.percent}</Td>
                        <Td>{formatNumDynamicDecimal(item.net, 2)} AZERO</Td>

                        <Td>
                          {console.log("actionType", actionType?.toUpperCase())}
                          {console.log("item.name", item.name)}
                          {item.name !== "TOTAL" && (
                            <CommonButton
                              h="40px"
                              {...rest}
                              text="claim balance"
                              isDisabled={
                                actionType &&
                                !actionType?.toUpperCase().includes(item.name)
                              }
                              onClick={() => handleWithdrawBalance(item)}
                            />
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            <Box maxW="6xl-mid" fontSize="lg">
              <Stack
                direction={{ base: "column", xl: "row" }}
                pb={5}
                borderBottomWidth={1}
              >
                <Flex
                  alignItems="start"
                  pr={{ base: 0, xl: 20 }}
                  // pr={20}
                >
                  <Text ml={1} color="brand.grayLight">
                    Step 1:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Lock Staking Contract
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 2:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Add Rewards
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 3:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Set all stakers Claimable
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 4:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Enable Reward Distribution
                  </Text>
                </Flex>
              </Stack>
              <Stack
                direction={{ base: "column", xl: "row" }}
                pb={5}
                borderBottomWidth={1}
              >
                <Flex
                  alignItems="start"
                  pr={{ base: 0, xl: 20 }}
                  // pr={20}
                >
                  <Text ml={1} color="brand.grayLight">
                    Step 5:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Stop Reward Distribution
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 6:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Unlock Staking Contract
                  </Text>
                </Flex>
              </Stack>
              <Stack
                direction={{ base: "column", xl: "row" }}
                pb={5}
                borderBottomWidth={1}
              >
                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Admin
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {truncateStr(adminAddress, 5)}
                  </Text>
                </Flex>
                <Flex
                  alignItems="start"
                  pr={{ base: 0, xl: 20 }}
                  // pr={20}
                >
                  <Text ml={1} color="brand.grayLight">
                    Reward Pool:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {rewardPool}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Claimable Rewards
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {claimableReward}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Total NFT Staked
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {totalStaked}
                  </Text>
                </Flex>
              </Stack>
              <Stack
                direction={{ base: "column", xl: "row" }}
                pb={5}
                borderBottomWidth={1}
              >
                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Staking Contract Status
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {isLocked ? "Locked" : "Unlocked"}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Reward Distribution
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {rewardStarted ? "Started" : "Not Started"}
                  </Text>
                </Flex>
              </Stack>
              <Flex
                direction={{ base: "column", xl: "row" }}
                align="start"
                justify="space-between"
                w="full"
                py={12}
                textAlign="left"
              >
                <Box
                  mx={2}
                  fontSize="lg"
                  bg="brand.grayDark"
                  padding={12}
                  minH="xs"
                  maxW="xl"
                  w="100%"
                >
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    h="full"
                  >
                    <Box h="full">
                      <Heading size="h4">Staking Contract Control</Heading>

                      <Box h="full">
                        <Box mt={7}>
                          <Text color={"#fff"} py={2}>
                            Only Admin
                          </Text>
                          <Flex
                            direction={{ base: "column", xl: "row" }}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Button
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setStakingStatus(true)}
                            >
                              Lock Staking
                            </Button>
                            <Button
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setStakingStatus(false)}
                            >
                              Unlock Staking
                            </Button>
                          </Flex>
                          <Flex
                            direction={{ base: "column", xl: "row" }}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Button
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setRewardDistribution(true)}
                            >
                              Start Reward Distribution
                            </Button>
                            <Button
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setRewardDistribution(false)}
                            >
                              Stop Reward Distribution
                            </Button>
                          </Flex>
                          <Flex
                            direction={{ base: "column", xl: "row" }}
                            justify="space-between"
                            alignItems="center"
                          >
                            <Text color={"#fff"} py={2}>
                              To do Step 3, admin need to run the script on the
                              server to set all stakers is_claimed to FALSE
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
                <Box
                  mx={2}
                  fontSize="lg"
                  bg="brand.grayDark"
                  padding={12}
                  minH="xs"
                  maxW="xl"
                  w="100%"
                >
                  <Flex
                    direction="column"
                    justifyContent="space-between"
                    h="full"
                  >
                    <Box h="full">
                      {/*<Button
                        mt={7}
                        variant="solid"
                        w="full"
                        onClick={() => onInitialize()}
                      >
                        Initialize
                      </Button>*/}
                      <Heading size="h4">Add Rewards</Heading>
                      <Box mt={7}>
                        <Text color={"#fff"} py={2}>
                          Only when staking is locked. Anyone can add.
                        </Text>
                        <Box>
                          <NumberInput
                            bg="black"
                            defaultValue={1}
                            onChange={(valueString) =>
                              setAddAmount(valueString)
                            }
                            value={addAmount}
                            mr={3}
                            h="3.125rem"
                            w="full"
                            px={0}
                          >
                            <NumberInputField
                              h="3.125rem"
                              borderRadius={0}
                              borderWidth={0}
                              color="#fff"
                            />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>

                          <Button
                            mt={7}
                            variant="solid"
                            w="full"
                            onClick={() => onAddReward()}
                          >
                            Add
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Box maxW="6xl-mid" fontSize="lg">
              <HStack pb={5} borderBottomWidth={1}>
                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Total Stakers:
                  </Text>
                  <Text color="#fff" ml={2}>
                    {stakersCount}
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
                <Table
                  variant="striped"
                  colorScheme="blackAlpha"
                  overflow="auto"
                >
                  <Thead>
                    <Tr>
                      <Th
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Staker
                      </Th>
                      <Th
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Amount
                      </Th>
                      <Th
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                        // isNumeric
                      >
                        Claimed
                      </Th>
                      <Th
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                        // isNumeric
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  {console.log("stakers", stakers)}
                  <Tbody>
                    {stakers.length == 0 ? (
                      <Tr color="#fff">
                        <Center py={7}>Loading Data...</Center>
                      </Tr>
                    ) : (
                      stakers.map((staker, index) => (
                        <Tr key={index} color="#fff">
                          <Td py={7}>
                            {staker.address /*truncateStr(staker.address, 5)*/}
                          </Td>
                          <Td
                            py={7}
                            // isNumeric
                          >
                            {staker.amount}
                          </Td>
                          <Td
                            py={7}
                            // isNumeric
                          >
                            {" "}
                            {staker.isClaimed
                              ? "Claimed"
                              : "Not Claimed or Not Set"}
                          </Td>
                          <Td
                            py={7}
                            // isNumeric
                          >
                            {" "}
                            <Button
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => enableClaim(staker.address)}
                            >
                              Enable Claim
                            </Button>
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default RewardDistribution;
