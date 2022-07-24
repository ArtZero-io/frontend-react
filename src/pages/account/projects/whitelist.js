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
    Heading,
  } from "@chakra-ui/react";
  import { useSubstrateState } from "@utils/substrate";
  import Loader from "@components/Loader/CommonLoader";
  import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { delay } from "@utils";
  import toast from "react-hot-toast";
  import { ContractPromise } from "@polkadot/api-contract";
  import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
  import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
  import { Select } from '@chakra-ui/react'
  
  let wl_count = 0;
  function MyWhiteListProjectPage() {
    const { api, currentAccount } = useSubstrateState();
    const { activeAddress } = useSelector((s) => s.account);
    const [whiteListPrice, setWhiteListPrice] = useState(0);
    const [art0_NFT_owner, setArt0NFTOwner] = useState("");
    const [whitelistAmount, setWhitelistAmount] = useState(1);
    const [whitelistAddress, setWhitelistAddress] = useState("");
    const [whitelist, setwhitelist] = useState([]);
    const [projectAddress, setProjectAddress] = useState("");
    const [projectPhases, setProjecPhases] = useState([]);
    const [phaseCodeSelected, updatePhaseCodeSelected] = useState(0);
    const onRefreshAZNFT = async () => {
      await onGetOwner();
      await delay(1000);
      await getAllWhiteList();
    };
  
    useEffect(async () => {
      onRefreshAZNFT();
    }, [currentAccount]);
  
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

    const onGetOwner = async (e) => {
      let res = await artzero_nft_calls.owner(currentAccount);
  
      if (res) setArt0NFTOwner(res);
      else setArt0NFTOwner("");
    };

    const loadProjectInformation = async (e) => {
        if (projectAddress == '') {
            setProjecPhases([]);
            toast.error(`Print your project address!`);
            return;
        }
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            projectAddress
        );
        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(currentAccount);
        let phasesTmp = [];
        for (let i = 1; i <= totalPhase; i++) {
          const phaseCode = await launchpad_psp34_nft_standard_calls.getPhasesCodeById(currentAccount, i);
          const phaseInfo = {
            id: i,
            code: phaseCode
          };
          phasesTmp.push(phaseInfo);
        }
        setProjecPhases(phasesTmp);
    }

    const onAddWhitelist = async () => {
     
        if (projectAddress == '') {
            setProjecPhases([]);
            toast.error(`Print your project address!`);
            return;
        }
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            projectAddress
        );
        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        console.log(phaseCodeSelected,
            whitelistAddress,
            whitelistAmount,
            whiteListPrice);
        launchpad_psp34_nft_standard_calls.addWhitelist(
            currentAccount,
            whitelistAddress,
            phaseCodeSelected,
            whitelistAmount,
            whiteListPrice
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
                        <Heading size="h4">Print Your Project Address</Heading>
                        <Box mt={7}>
                          <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                            Print Your Project Address
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
                                value={projectAddress}
                                onChange={(event) =>
                                  setProjectAddress(
                                    event.target.value.toString()
                                  )
                                }
                              />
  
                            <Button
                              mt={7}
                              variant="solid"
                              w="full"
                              onClick={() => loadProjectInformation()}
                            >
                              Load Project Information
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
                          <Box>
                            
                            </Box>
                            <Box mt={7}>
                            <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                              Chose phase
                            </Text>
                            <Box>
                                <Select placeholder='Select option' 
                                    onChange={(event) =>
                                        updatePhaseCodeSelected(
                                            event.target.value
                                        )
                                    } >
                                {(projectPhases && projectPhases.length) ? projectPhases.map((item, index) => (
                                    <option value={item.id} key={index}>{item.code}</option>
                                )) : ''}
                                </Select>
                            </Box>
                          </Box>
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
                          <Box>
                            <Text color={!whitelist ? "F888" : "#fff"} py={2}>
                              Price
                            </Text>
                                <NumberInput
                                    bg="black"
                                    defaultValue={1}
                                    onChange={(valueString) =>
                                        setWhiteListPrice(valueString)
                                    }
                                    value={whiteListPrice}
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
            </Box>
          </>
        )}
      </>
    );
  }
  
  export default MyWhiteListProjectPage;
  