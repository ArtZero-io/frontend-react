/* eslint-disable no-unused-vars */
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
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { useSubstrateState } from "@utils/substrate";
  import Loader from "@components/Loader/CommonLoader";
  import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
  import { useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import { delay, convertStringToDateTime } from "@utils";
  import toast from "react-hot-toast";
  import { ContractPromise } from "@polkadot/api-contract";
  import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
  import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
  import { Select } from '@chakra-ui/react'
  import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
  import { convertStringToPrice, truncateStr } from "@utils";
  import AzeroIcon from "@theme/assets/icon/Azero.js";

  let wl_count = 0;
  function MyWhiteListProjectPage() {
    const tableHeaders = ["Address", "Whitelist", "Claimed", "Price"];
    const { api, currentAccount } = useSubstrateState();
    const { activeAddress } = useSelector((s) => s.account);
    const [whiteListPrice, setWhiteListPrice] = useState(0);
    const [whitelistAmount, setWhitelistAmount] = useState(1);
    const [whitelistAddress, setWhitelistAddress] = useState("");
    const [whiteListDataTable, setWhiteListDataTable] = useState([]);
    const [projectAddress, setProjectAddress] = useState("");
    const [projectPhases, setProjecPhases] = useState([]);
    const [phaseCodeSelected, updatePhaseCodeSelected] = useState(0);
    const [myProjects, setMyProjects] = useState([]);
    const [currentPhase, setCurrentPhase] = useState({});

    const onRefreshAZNFT = async () => {
      await onGetOwner();
      await delay(1000);
    };
  
    useEffect(async () => {
      onRefreshAZNFT();
    }, [currentAccount]);
  
    const onGetOwner = async (e) => {
      const ownerAddress = currentAccount?.address;
      let projectAddresses = await launchpad_contract_calls.getProjectsByOwner(currentAccount, ownerAddress);
      let projectsTmp = [];
      for (const projectAddress of projectAddresses) {
        const project = await launchpad_contract_calls.getProjectByNftAddress(currentAccount, projectAddress);
        if (!project.isActive) {
          continue;
        }
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            projectAddress
        );
        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        const projectInfoHash = await launchpad_psp34_nft_standard_calls.getProjectInfo(currentAccount);
        const projectInfo = await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(projectInfoHash);
        const projectTmp = {
          name: projectInfo.name,
          nftContractAddress: projectAddress,
        };
        projectsTmp.push(projectTmp);
      }
      setMyProjects(projectsTmp);
    };

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
        await launchpad_psp34_nft_standard_calls.addWhitelist(
            currentAccount,
            whitelistAddress,
            phaseCodeSelected,
            whitelistAmount,
            whiteListPrice
        );
        
        await delay(10000);
    };

    const onAddWhitelistUpdate = async () => {
      //check whitelistAddress
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
      await launchpad_psp34_nft_standard_calls.updateWhitelist(
          currentAccount,
          whitelistAddress,
          phaseCodeSelected,
          whitelistAmount,
          whiteListPrice
      );
      
      await delay(10000);
    };
  
    const updateProjectAddress = async (address) => {
      console.log(address);
      if (address == '') {
          setProjecPhases([]);
          updatePhaseCodeSelected(0);
          toast.error(`Print your project address!`);
          return;
      }
      setProjectAddress(address);
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          address
      );
      launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
      const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(currentAccount);
      let phasesTmp = [];
      for (let i = 1; i <= totalPhase; i++) {
        const phaseSchedule = await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(currentAccount, i);
        const phaseCode = phaseSchedule.title;
        if (!phaseSchedule.isPublic) {
          const phaseInfo = {
            id: i,
            code: phaseCode
          };
          phasesTmp.push(phaseInfo);
        }
      }
      setProjecPhases(phasesTmp);
    }

    const onChangePhaseCode = async (phaseId) => {
      updatePhaseCodeSelected(phaseId);  
      if (phaseId && projectAddress) {
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
            api,
            launchpad_psp34_nft_standard.CONTRACT_ABI,
            projectAddress
        );
        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        const phaseInfo = await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(currentAccount, phaseId);
        console.log('phase info', phaseInfo);
        setCurrentPhase(phaseInfo);
        const totalPhaseAccountLink = await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(currentAccount, phaseId);
        let whiteListDataTableTmp = [];

        console.log('MyWhiteListProjectPage::totalPhaseAccountLink', totalPhaseAccountLink);
        for (let i = 1; i <= totalPhaseAccountLink; i++) {
          const whitelistPhaseAccountAddress = await launchpad_psp34_nft_standard_calls.getPhaseAccountLinkByPhaseId(currentAccount, phaseId, i);
          console.log('whitelistPhaseAccountAddress', whitelistPhaseAccountAddress);
          console.log('MyWhiteListProjectPage::phaseId', i);
          const phaseSchedule = await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(currentAccount, phaseId);
          // const phaseCode = phaseSchedule.title;
          const whiteListData = await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(currentAccount, phaseId, whitelistPhaseAccountAddress);
          console.log('MyWhiteListProjectPage::whiteListData', whiteListData);
          
          if (whiteListData) {
            const whiteListDataItemTmp = {
              address: whitelistPhaseAccountAddress,
              whitelistAmount: whiteListData.whitelistAmount,
              claimedAmount: whiteListData.claimedAmount,
              mintingFee: convertStringToPrice(whiteListData.mintingFee)
            };
            console.log('MyWhiteListProjectPage::whiteListDataItemTmp', whiteListDataItemTmp);
            whiteListDataTableTmp.push(whiteListDataItemTmp);
          }
        }
        setWhiteListDataTable(whiteListDataTableTmp);
      }
    }

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
                        <Heading size="h4">Add Whitelist</Heading>
  
                        <Box h="full">
                          {" "}
                          <Box mt={7}>
                            <Text py={2}>
                              Chose Project
                            </Text>
                            <Box>
                                <Select placeholder='Select project' 
                                    onChange={(event) =>
                                      updateProjectAddress(
                                          event.target.value
                                        )
                                    } >
                                {(myProjects && myProjects.length) ? myProjects.map((item, index) => (
                                    <option value={item.nftContractAddress} key={index}>{item.name}</option>
                                )) : ''}
                                </Select>
                            </Box>
                          </Box>
                          <Box mt={7}>
                            <Text py={2}>
                              Chose phase
                            </Text>
                            <Box>
                                <Select placeholder='Select phase' 
                                    onChange={(event) =>
                                        onChangePhaseCode(event.target.value)
                                    } >
                                {(projectPhases && projectPhases.length) ? projectPhases.map((item, index) => (
                                    <option value={item.id} key={index}>{item.code}</option>
                                )) : ''}
                                </Select>
                            </Box>
                          </Box>
                          <Box mt={7}>
                            <Text py={2}>
                              Whitelist Address
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
                            <Text py={2}>
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
                            <Text py={2}>
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
                        <Heading size="h4">Whitelist Management</Heading>
                        {currentPhase && currentPhase.title && <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text py={2}>
                              Total amount: {currentPhase.whitelistAmount}
                          </Text>
                          <Text py={2}>
                              Minted Amount: {currentPhase.claimedAmount}
                          </Text>
                          <Text py={2}>
                              Start Time: {convertStringToDateTime(currentPhase.startTime)}
                          </Text>
                          <Text py={2}>
                              End Time: {convertStringToDateTime(currentPhase.endTime)}
                          </Text>
                        </motion.div>}
                        <Box mt={7}>
                          <TableContainer
                              fontSize="lg"
                              w={{ base: "1100px", "2xl": "1560px" }}
                              h={{ base: "390px", "2xl": "480px" }}
                              overflowY="scroll"
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
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {whiteListDataTable?.length ? (
                                  <Table variant="striped" colorScheme="blackAlpha">
                                    <Thead>
                                      <Tr>
                                        {Object.values(tableHeaders)?.map((item, idx) => (
                                          <Th
                                            top={0}
                                            zIndex={1}
                                            textAlign="center"
                                            key={idx}
                                            fontFamily="Evogria"
                                            color="#888"
                                            bg="#171717"
                                            fontSize="15px"
                                            fontWeight="400"
                                            dropShadow="lg"
                                          >
                                            {item}
                                          </Th>
                                        ))}
                                      </Tr>
                                    </Thead>

                                    <Tbody>
                                      {whiteListDataTable?.map((item, idx) => (
                                        <Tr key={idx} color="#fff">
                                          <Td
                                            textAlign="center"
                                            color="#fff"
                                          >
                                            {truncateStr(item.address, 6)}
                                          </Td>
                                          <Td
                                            textAlign="center"
                                            color="#fff"
                                          >
                                            {item.whitelistAmount}
                                          </Td>
                                          <Td
                                            textAlign="center"
                                            color="#fff"
                                          >
                                            {item.claimedAmount}
                                          </Td>
                                          <Td
                                            textAlign="center"
                                            color="#fff"
                                          >
                                            {item.mintingFee} <AzeroIcon mb={1.5} />
                                          </Td>
                                          
                                        </Tr>
                                      ))}
                                    </Tbody>
                                  </Table>
                                ) : (<Text py={2}>
                                  No Whitelist
                                </Text>)}
                              </motion.div>
                            </TableContainer>
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
  