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
// import staking from "@utils/blockchain/staking";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { delay, truncateStr } from "@utils";
import toast from "react-hot-toast";
// import BN from "bn.js";

function RewardDistribution() {
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [addAmount,setAddAmount] = useState(0);
  const [rewardPool,setRewardPool] = useState(0);
  const [claimableReward,setClaimableReward] = useState(0);
  const [totalStaked,setTotalStaked] = useState(0);
  const [isLocked,setIsLocked] = useState(false);
  const [adminAddress,setAdminAddress] = useState("");
  const [stakersCount,setStakerCount] = useState(0);
  const [stakers,setStakers] = useState([]);

  const onRefresh = async () => {
    let reward_pool = await staking_calls.getRewardPool(currentAccount);
    let claimable_reward = await staking_calls.getClaimableReward(currentAccount);
    let total_staked = await staking_calls.getTotalStaked(currentAccount);
    let is_locked = await staking_calls.getIsLocked(currentAccount);
    let admin_address = await staking_calls.getAdminAddress(currentAccount);

    // console.log(reward_pool,claimable_reward);
    setClaimableReward(claimable_reward);
    setRewardPool(reward_pool);
    setTotalStaked(total_staked);
    setIsLocked(is_locked);
    setAdminAddress(admin_address);

  };
  const getStakers = async () => {
    let staker_count = await staking_calls.getTotalCountOfStakeholders(currentAccount);
    setStakerCount(staker_count);
    let stakers = [];
    for (var i=0;i<staker_count;i++){
      let staker = await staking_calls.getStakedAccountsAccountByIndex(currentAccount,i);

      let staker_info = {
        address:staker,
        amount:await staking_calls.getTotalStakedByAccount(currentAccount,staker),
        isClaimed:false
      }
      stakers.push(staker_info);
    }
    setStakers(stakers);
  }
  const onAddReward = async () => {
    await staking_calls.addReward(currentAccount,addAmount);
    await delay(3000);
    await onRefresh();
  };

  const setStakingStatus = async (status) => {
    if (activeAddress != adminAddress){
      toast.error('Only Admin allowed');
    }
    await staking_calls.updateIsLocked(currentAccount,status);
    await delay(3000);
    await onRefresh();
  };


  useEffect(async () => {
    onRefresh();
    getStakers();
  }, [currentAccount]);

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
                    Add Rewards
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 2:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    Set all stakers Claimable
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Step 3:
                  </Text>
                  <Text  color="#7ae7ff" ml={2}>
                    Lock Staking Contract
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                     Step 4:
                  </Text>
                  <Text  color="#7ae7ff" ml={2}>
                    UnLock Staking Contract after 3 days
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
                  <Text  color="#7ae7ff" ml={2}>
                    {totalStaked}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Pool Status
                  </Text>
                  <Text  color="#7ae7ff" ml={2}>
                    {isLocked ? "Locked" : "Unlocked"}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Admin
                  </Text>
                  <Text  color="#7ae7ff" ml={2}>
                    {truncateStr(adminAddress,5)}
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
                          Only when staking is unlocked. Anyone can add.
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
                      <Heading size="h4">Lock/Unlock</Heading>

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
                        isNumeric
                      >
                        Claimed
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {stakers.length == 0 ? (
                      <Tr color="#fff">
                        <Center py={7}>Loading Data...</Center>
                      </Tr>
                    ) : (
                      stakers.map((staker, index) => (
                        <Tr key={index} color="#fff">
                          <Td py={7}>{staker.address/*truncateStr(staker.address, 5)*/}</Td>
                          <Td py={7} isNumeric>
                            {staker.amount}
                          </Td>
                          <Td py={7} isNumeric>
                            {staker.isClaimed}
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
