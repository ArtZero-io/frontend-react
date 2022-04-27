
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
  Input,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import Loader from "@components/Loader/CommonLoader";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { delay, truncateStr } from "@utils";
import toast from "react-hot-toast";
import BN from "bn.js";

let wl_count = 0;
function ContractTab() {
  const { api, currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [art0_NFT_owner, setArt0NFTOwner] = useState("");
  const [whitelistAmount, setWhitelistAmount] = useState(1);
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whitelistCount, setWhitelistCount] = useState(0);
  const [whitelist, setwhitelist] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [azNFTContractBalance, setAzNFTContractBalance] = useState(0);

  const onRefreshAZNFT = async () => {
    console.log('onRefreshAZNFT',currentAccount);
    await getAZNFTContractBalance();

    await onGetOwner();

    await onGetWhitelistCount();
    await delay(1000);
    await getAllWhiteList();
  };

  useEffect(async () => {
    onRefreshAZNFT();
  }, [currentAccount]);

  const getAZNFTContractBalance = async () => {
    const { data: balance } = await api.query.system.account(
      artzero_nft.CONTRACT_ADDRESS
    );
    setAzNFTContractBalance(
      new BN(balance.free, 10, "le").toNumber() / 10 ** 12
    );
  };
  const getAllWhiteList = async (e) => {
    var whitelist = [];
    for (var i = 0; i < wl_count; i++) {
      let account = await artzero_nft_calls.getWhitelistAccount(
        currentAccount,
        i + 1
      );
      console.log(account);
      let data = await artzero_nft_calls.getWhitelist(currentAccount, account);
      console.log(data);
      data["account"] = account;
      whitelist.push(data);
    }
    console.log(whitelist);
    setwhitelist(whitelist);
  };
  const onGetWhitelistCount = async (e) => {
    let res = await artzero_nft_calls.getWhitelistCount(currentAccount);
    if (res) {
      wl_count = res;
      setWhitelistCount(res);
    } else setWhitelistCount(0);
  };
  const onGetOwner = async (e) => {
    let res = await artzero_nft_calls.owner(currentAccount);

    if (res) setArt0NFTOwner(res);
    else setArt0NFTOwner("");
  };
  const onAddWhitelist = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    console.log(whitelistAddress, whitelistAmount);
    //check whitelistAddress
    await artzero_nft_calls.addWhitelist(
      currentAccount,
      whitelistAddress,
      whitelistAmount
    );
    await delay(10000);
    await onRefreshAZNFT();
  };
  const onAddWhitelistUpdate = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    console.log(whitelistAddress, whitelistAmount);
    //check whitelistAddress
    await artzero_nft_calls.updateWhitelistAmount(
      currentAccount,
      whitelistAddress,
      whitelistAmount
    );
    await delay(10000);
    await onRefreshAZNFT();
  };
  const onWithdraw = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    //check whitelistAddress
    await artzero_nft_calls.onWithdraw(currentAccount, withdrawAmount);
    await delay(5000);
    await onRefreshAZNFT();
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
            <Box maxW="6xl-mid" fontSize="lg">
              <HStack pb={5} borderBottomWidth={1}>
                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Contract Owner:
                  </Text>
                  <Text color="#7ae7ff" ml={2}>
                    {truncateStr(art0_NFT_owner, 9)}
                  </Text>
                </Flex>

                <Flex alignItems="start" pr={20}>
                  <Text ml={1} color="brand.grayLight">
                    Contract Balance:{" "}
                  </Text>
                  <Text color="#fff" ml={2}>
                    {azNFTContractBalance} SZERO
                  </Text>
                </Flex>
              </HStack>

              <Flex
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
                      <Heading size="h4">Owner Withdraw AZERO</Heading>
                      <Box mt={7}>
                        <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                          Owner Withdraw AZERO
                        </Text>

                        <Box>
                          <NumberInput
                            bg="black"
                            defaultValue={1}
                            min={1}
                            max={5}
                            onChange={(valueString) =>
                              setWithdrawAmount(valueString)
                            }
                            value={withdrawAmount}
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
                            onClick={() => onWithdraw()}
                          >
                            Withdraw
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
                      <Heading size="h4">Add Whitelist</Heading>

                      <Box h="full">
                        {" "}
                        <Box mt={7}>
                          <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                            Add whitelist
                          </Text>

                          <Box>
                            <Input
                              bg="black"
                              h="3.125rem"
                              w="full"
                              mx={0}
                              px={2}
                              borderRadius={0}
                              borderWidth={0}
                              color="#fff"
                              placeholder="Enter address"
                              value={whitelistAddress}
                              onChange={(event) =>
                                setWhitelistAddress(
                                  event.target.value.toString()
                                )
                              }
                            />
                          </Box>
                        </Box>
                        <Box mt={7}>
                          <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                            Add number
                          </Text>

                          <Box>
                            <NumberInput
                              bg="black"
                              defaultValue={1}
                              min={1}
                              max={5}
                              onChange={(valueString) =>
                                setWhitelistAmount(valueString)
                              }
                              value={whitelistAmount}
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
                            <Flex justify="space-between" alignItems="center">
                              <Button
                                mt={7}
                                variant="solid"
                                w="100%"
                                maxW={"3xs"}
                                onClick={() => onAddWhitelist()}
                              >
                                Add Whitelist
                              </Button>
                              <Button
                                mt={7}
                                variant="solid"
                                w="100%"
                                maxW={"3xs"}
                                onClick={() => onAddWhitelistUpdate()}
                              >
                                Update Whitelist
                              </Button>
                            </Flex>
                          </Box>
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
                    Total Whitelist account:
                  </Text>
                  <Text color="#fff" ml={2}>
                    {whitelistCount}
                  </Text>
                </Flex>
              </HStack>

              <Table variant="striped" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th
                      fontFamily="Evogria"
                      fontSize="sm"
                      fontWeight="normal"
                      py={7}
                    >
                      Address
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
                  {whitelist.length === 0 ? (
                    <Tr color="#fff">
                      <Td py={7}>There is no data.</Td>
                    </Tr>
                  ) : (
                    whitelist.map((wl, index) => (
                      <Tr key={index} color="#fff">
                        <Td py={7}>{truncateStr(wl.account, 5)}</Td>
                        <Td py={7} isNumeric>
                          {wl.whitelistAmount}
                        </Td>
                        <Td py={7} isNumeric>
                          {wl.claimedAmount}
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ContractTab;
