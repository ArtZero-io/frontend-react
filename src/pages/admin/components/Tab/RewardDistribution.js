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
  Input,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import Loader from "@components/Loader/CommonLoader";
import staking_calls from "@utils/blockchain/staking_calls";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { delay } from "@utils";
import toast from "react-hot-toast";
import { fetchUserBalance } from "../../../launchpad/component/Form/AddNewProject";

import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import collection_manager from "@utils/blockchain/collection-manager";
import staking_contract from "@utils/blockchain/staking";
import { useMemo } from "react";
import { formatNumDynamicDecimal } from "@utils";

import CommonButton from "@components/Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import {
  WITHDRAW_COLLECTION,
  WITHDRAW_LAUNCHPAD,
  WITHDRAW_MARKETPLACE,
  START,
} from "@constants";
import { withdrawCollectionContract } from "@utils/blockchain/collection-manager-calls";

import { withdrawLaunchpadContract } from "@utils/blockchain/launchpad-contract-calls";
import { withdrawMarketplaceContract } from "@utils/blockchain/marketplace_contract_calls";
import { useCallback } from "react";
import useForceUpdate from "@hooks/useForceUpdate";

import { execContractQuery } from "@utils/blockchain/profile_calls";
import marketplace from "@utils/blockchain/marketplace";
import { setStakingContract } from "@utils/blockchain/staking_calls";
import { ContractPromise } from "@polkadot/api-contract";
import staking from "@utils/blockchain/staking";
import { getEstimatedGasBatchTx } from "@utils";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
} from "@store/actions/txStatus";

function RewardDistribution() {
  const { api, currentAccount } = useSubstrateState();

  const [addAmount, setAddAmount] = useState(0);
  const [rewardPool, setRewardPool] = useState(0);
  const [claimableReward, setClaimableReward] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [rewardStarted, setIsRewardStarted] = useState(false);
  const [isAdminStakingContract, setIsAdminStakingContract] = useState(false);
  const [stakersCount, setStakerCount] = useState(0);
  const [stakers, setStakers] = useState([]);
  const [percentDoneStakers, setPercentDoneStakers] = useState(0);

  useEffect(() => {
    const setContract = async () => {
      await setStakingContract(api, staking_contract);
    };

    setContract();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const queryResult1 = await execContractQuery(
      currentAccount?.address,
      api,
      staking_contract.CONTRACT_ABI,
      collection_manager.CONTRACT_ADDRESS,
      "accessControl::hasRole",
      3739740293,
      currentAccount?.address
    );

    setClaimableReward(claimable_reward);
    setRewardPool(reward_pool);
    setTotalStaked(total_staked);
    setIsLocked(is_locked);
    setIsAdminStakingContract(queryResult1?.toHuman()?.Ok);
    setIsRewardStarted(is_reward_started);
  };
  const [loading, setLoading] = useState(true);

  const getStakers = async () => {
    try {
      setLoading(true);

      let staker_count = await staking_calls.getTotalCountOfStakeholders(
        currentAccount
      );
      setStakerCount(staker_count);

      let stakers = [];
      for (var i = 0; i < staker_count; i++) {
        let staker = await staking_calls.getStakedAccountsAccountByIndex(
          currentAccount,
          i
        );

        let staker_info = {
          address: staker,
          amount: await staking_calls.getTotalStakedByAccount(
            currentAccount,
            staker
          ),
          isClaimed: await staking_calls.isClaimed(currentAccount, staker),
        };

        stakers.push(staker_info);
        setPercentDoneStakers(
          ((100 * stakers?.length) / staker_count).toFixed(2)
        );
      }
      setStakers(stakers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const onAddReward = async () => {
    if (rewardStarted) {
      return toast.error("Please stop reward distribution to add reward!");
    }

    if (!addAmount || addAmount <= 0) {
      return toast.error("Amount is invalid!");
    }

    await staking_calls.addReward(currentAccount, addAmount);
    await delay(3000);
    await onRefresh();
  };

  const setStakingStatus = async (status) => {
    if (rewardStarted) {
      return toast.error(
        "Please stop reward distribution before unlock staking!"
      );
    }

    if (!isAdminStakingContract) {
      return toast.error("Only Admin allowed");
    }
    await staking_calls.updateIsLocked(currentAccount, status);
    await delay(3000);
    await onRefresh();
  };

  const setRewardDistribution = async (status) => {
    if (!isAdminStakingContract) {
      return toast.error("Only Admin allowed");
    }

    if (!isLocked) {
      return toast.error(
        "Please lock staking before start reward distribution!"
      );
    }

    if (status) await staking_calls.startRewardDistribution(currentAccount);
    else await staking_calls.stopRewardDistribution(currentAccount);
    await delay(3000);
    await onRefresh();
  };

  // const enableClaim = async (stakerAddress) => {
  //   if (!isAdminStakingContract) {
  //     return toast.error("Only Admin allowed");
  //   }

  //   try {
  //     dispatch(
  //       setTxStatus({
  //         type: ENABLE_CLAIM,
  //         step: START,
  //         tokenIDArray: Array.of(stakerAddress),
  //       })
  //     );

  //     await staking_calls.setClaimable(
  //       currentAccount,
  //       stakerAddress,
  //       dispatch,
  //       ENABLE_CLAIM,
  //       api
  //     );

  //     getStakers();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("There was an error while enable Claim the rewards.");
  //     dispatch(clearTxStatus());
  //   }
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    onRefresh();
    getStakers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (item.balance <= 0) {
          return toast.error("No Balance to claimed");
        }

        const queryResult1 = await execContractQuery(
          currentAccount?.address,
          api,
          marketplace.CONTRACT_ABI,
          marketplace.CONTRACT_ADDRESS,
          "ownable::owner"
        );

        if (currentAccount?.address !== queryResult1.toHuman().Ok) {
          return toast.error(`Only marketplace owner is allowed!`);
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
        if (item.balance <= 0) {
          return toast.error("No Balance to claimed");
        }

        const queryResult1 = await execContractQuery(
          currentAccount?.address,
          api,
          collection_manager.CONTRACT_ABI,
          collection_manager.CONTRACT_ADDRESS,
          "ownable::owner"
        );

        if (currentAccount?.address !== queryResult1.toHuman().Ok) {
          return toast.error(`Only collection owner is allowed!`);
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
        if (item.balance <= 0) {
          return toast.error("No Balance to claimed");
        }

        const queryResult1 = await execContractQuery(
          currentAccount?.address,
          api,
          launchpad_manager.CONTRACT_ABI,
          launchpad_manager.CONTRACT_ADDRESS,
          "ownable::owner"
        );

        if (currentAccount?.address !== queryResult1.toHuman().Ok) {
          return toast.error(`Only launchpad owner is allowed!`);
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
                    Your role:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {isAdminStakingContract ? "Admin" : "Not admin"}
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
                              isDisabled={isLocked}
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setStakingStatus(true)}
                            >
                              Lock Staking
                            </Button>
                            <Button
                              isDisabled={!isLocked}
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
                              isDisabled={rewardStarted}
                              mt={7}
                              variant="solid"
                              w="100%"
                              maxW={"3xs"}
                              onClick={() => setRewardDistribution(true)}
                            >
                              Start Reward Distribution
                            </Button>
                            <Button
                              isDisabled={!rewardStarted}
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
                            min={0}
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
                            isDisabled={!isLocked}
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

            <ButtonBulkEnableClaim
              rewardStarted={rewardStarted}
              stakers={stakers}
              setStakers={setStakers}
            />
            <ButtonBulkClaim
              rewardStarted={rewardStarted}
              stakers={stakers}
              setStakers={setStakers}
            />

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
              <HStack pb={5} borderBottomWidth={1}>
                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Total Loading:
                  </Text>
                  <Text color="#fff" ml={2}>
                    {percentDoneStakers} %
                  </Text>
                </Flex>
              </HStack>
              {loading ? (
                <Loader m={12} />
              ) : (
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
                          NFT Staked Count
                        </Th>
                        <Th
                          fontFamily="Evogria"
                          fontSize="sm"
                          fontWeight="normal"
                          py={7}
                          // isNumeric
                        >
                          Claimed Status
                        </Th>
                        {/* <Th
                          fontFamily="Evogria"
                          fontSize="sm"
                          fontWeight="normal"
                          py={7}
                          // isNumeric
                        >
                          Action
                        </Th> */}
                      </Tr>
                    </Thead>

                    <Tbody>
                      {stakers.length === 0 ? (
                        <Tr color="#fff">
                          <Center py={7}>Loading Data...</Center>
                        </Tr>
                      ) : (
                        stakers.map((staker, index) => (
                          <Tr key={index} color="#fff">
                            <Td py={7}>{staker.address}</Td>
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
                              {/* <Button
                              hidden
                              isDisabled={!staker.isClaimed}
                              variant="solid"
                              w="100%"
                              // maxW={'3xs'}
                              onClick={() => enableClaim(staker.address)}
                            >
                              Enable Claim
                            </Button> */}
                              {/* <CommonButton
                                {...rest}
                                text="enable claim"
                                onClick={() => enableClaim(staker.address)}
                                isDisabled={
                                  !staker.isClaimed ||
                                  (actionType &&
                                    !tokenIDArray?.includes(staker.address))
                                }
                              /> */}
                            </Td>
                          </Tr>
                        ))
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default RewardDistribution;

function ButtonBulkEnableClaim({ stakers, setStakers, rewardStarted }) {
  const { api, currentAccount } = useSubstrateState();
  const { adapter } = useSubstrate();
  const dispatch = useDispatch();

  const [bulkActionCount, setBulkActionCount] = useState(5);

  const readyToEnableList = useMemo(
    () => stakers?.filter((item) => item.isClaimed === true),
    [stakers]
  );

  const walletAddressList = useMemo(
    () =>
      readyToEnableList?.slice(0, bulkActionCount)?.map((item) => item.address),
    [bulkActionCount, readyToEnableList]
  );
  const [enableUpdateList, setEnableUpdateList] = useState([]);

  useEffect(() => {
    if (enableUpdateList?.length > 0) {
      const listCopy = enableUpdateList;
      let newStakersList = stakers;

      for (let index = 0; index < listCopy.length; index++) {
        const address = listCopy[index];
        newStakersList = newStakersList.map((user) =>
          user.address === address ? { ...user, isClaimed: false } : user
        );
      }

      setStakers(newStakersList);
      setEnableUpdateList([]);
    }
  }, [setStakers, stakers, enableUpdateList]);

  async function handleBulkEnableClaim() {
    try {
      if (walletAddressList?.length < bulkActionCount) {
        toast.error(`Max is ${walletAddressList?.length}`);
        return;
      }
      let TxALL;

      let unsubscribe;
      let gasLimit;

      const address = currentAccount?.address;

      const value = 0;
      toast("Estimated transaction fee...");

      const stakingContract = new ContractPromise(
        api,
        staking.CONTRACT_ABI,
        staking.CONTRACT_ADDRESS
      );

      gasLimit = await getEstimatedGasBatchTx(
        address,
        stakingContract,
        value,
        "setClaimedStatus",
        walletAddressList[0]
      );
      console.log("gasLimit per one", gasLimit?.toHuman());

      await Promise.all(
        walletAddressList.map(async (walletAddress) => {
          return stakingContract.tx.setClaimedStatus(
            { gasLimit, value },
            walletAddress
          );
        })
      ).then((res) => (TxALL = res));

      await api.tx.utility
        .batch(TxALL)
        .signAndSend(
          address,
          { signer: adapter.signer },
          async ({ events, status, dispatchError }) => {
            if (status?.isFinalized) {
              let totalSuccessTxCount = null;

              events.forEach(async ({ event, event: { data } }) => {
                if (api.events.utility?.BatchInterrupted.is(event)) {
                  totalSuccessTxCount = data[0]?.toString();
                }

                if (api.events.utility?.BatchCompleted.is(event)) {
                  toast.success(
                    "All address have been Set Claimed Status successfully."
                  );
                }
              });

              // eslint-disable-next-line no-extra-boolean-cast
              if (!!totalSuccessTxCount) {
                toast.error(
                  `Bulk Set Claimed Status are not fully successful!${totalSuccessTxCount} actions completed successfully.`
                );

                // dispatch(clearTxStatus());
              }
            }

            batchTxResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: "BULK_SET_CLAIMED_STATUS",
              api,
              currentAccount,
            });
          }
        )
        .then((unsub) => (unsubscribe = unsub))
        .catch((error) => txErrorHandler({ error, dispatch }));

      setEnableUpdateList(walletAddressList);
      return unsubscribe;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Text>
        Total Count User is Claimed Status: {readyToEnableList?.length} users
      </Text>
      <HStack my={4} spacing={4}>
        <Button
          isDisabled={readyToEnableList?.length === 0 || rewardStarted}
          w="full"
          onClick={() => handleBulkEnableClaim()}
        >
          Bulk Enable {bulkActionCount} users
        </Button>
        <Input
          isDisabled={readyToEnableList?.length === 0 || rewardStarted}
          value={bulkActionCount}
          onChange={({ target }) => setBulkActionCount(target.value)}
        />
      </HStack>
    </>
  );
}

function ButtonBulkClaim({ stakers, setStakers, rewardStarted }) {
  const { api, currentAccount } = useSubstrateState();
  const { adapter } = useSubstrate();
  const dispatch = useDispatch();

  const [bulkActionCount, setBulkActionCount] = useState(5);

  const readyToBulkClaimList = useMemo(
    () => stakers?.filter((item) => item.isClaimed === false),
    [stakers]
  );

  const walletAddressList = useMemo(
    () =>
      readyToBulkClaimList
        ?.slice(0, bulkActionCount)
        ?.map((item) => item.address),
    [bulkActionCount, readyToBulkClaimList]
  );

  const [updateList, setUpdateList] = useState([]);

  useEffect(() => {
    if (updateList?.length > 0) {
      const listCopy = updateList;
      let newStakersList = stakers;

      for (let index = 0; index < listCopy.length; index++) {
        const address = listCopy[index];
        newStakersList = newStakersList.map((user) =>
          user.address === address ? { ...user, isClaimed: true } : user
        );
      }

      setStakers(newStakersList);
      setUpdateList([]);
    }
  }, [setStakers, stakers, updateList]);

  async function handleBulkClaim() {
    try {
      if (walletAddressList?.length < bulkActionCount) {
        toast.error(`Max is ${walletAddressList?.length}`);
        return;
      }

      let TxALL;
      let unsubscribe;
      let gasLimit;

      const address = currentAccount?.address;
      const value = 0;

      toast("Estimated transaction fee...");

      const stakingContract = new ContractPromise(
        api,
        staking.CONTRACT_ABI,
        staking.CONTRACT_ADDRESS
      );

      gasLimit = await getEstimatedGasBatchTx(
        address,
        stakingContract,
        value,
        "claimReward",
        walletAddressList[0]
      );
      console.log("gasLimit per one", gasLimit?.toHuman());

      await Promise.all(
        walletAddressList.map(async (walletAddress) => {
          return stakingContract.tx.claimReward(
            { gasLimit, value },
            walletAddress
          );
        })
      ).then((res) => (TxALL = res));

      await api.tx.utility
        .batch(TxALL)
        .signAndSend(
          address,
          { signer: adapter.signer },
          async ({ events, status, dispatchError }) => {
            if (status?.isFinalized) {
              let totalSuccessTxCount = null;

              events.forEach(async ({ event, event: { data } }) => {
                if (api.events.utility?.BatchInterrupted.is(event)) {
                  totalSuccessTxCount = data[0]?.toString();
                }

                if (api.events.utility?.BatchCompleted.is(event)) {
                  toast.success("All address have been Claimed successfully.");
                }
              });

              // eslint-disable-next-line no-extra-boolean-cast
              if (!!totalSuccessTxCount) {
                toast.error(
                  `Bulk Claimed are not fully successful!${totalSuccessTxCount} actions completed successfully.`
                );

                // dispatch(clearTxStatus());
              }
            }

            batchTxResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: "BULK_CLAIM",
              api,
              currentAccount,
            });
          }
        )
        .then((unsub) => (unsubscribe = unsub))
        .catch((error) => txErrorHandler({ error, dispatch }));
      setUpdateList(walletAddressList);

      return unsubscribe;
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Text>Total User CAN Claim: {readyToBulkClaimList?.length} users</Text>
      <HStack my={4} spacing={4}>
        <Button
          isDisabled={readyToBulkClaimList?.length === 0 || !rewardStarted}
          w="full"
          onClick={() => handleBulkClaim()}
        >
          Bulk Claim {bulkActionCount} users
        </Button>
        <Input
          isDisabled={readyToBulkClaimList?.length === 0 || !rewardStarted}
          value={bulkActionCount}
          onChange={({ target }) => setBulkActionCount(target.value)}
        />
      </HStack>
    </>
  );
}
