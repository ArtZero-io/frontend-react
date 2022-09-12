import {
  Box,
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
  HStack,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { convertStringToDateTime } from "@utils";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { Select } from "@chakra-ui/react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { convertStringToPrice, truncateStr } from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { ADD_WHITELIST, UPDATE_WHITELIST, START } from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { isValidAddressPolkadotAddress } from "@utils";

const tableHeaders = ["Address", "Amount", "Claimed", "Price"];

function MyWhiteListProjectPage() {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [myProjectsList, setMyProjectsList] = useState([]);
  const [phasesListWhitelist, setPhasesListWhitelist] = useState(null);
  const [phasesListAll, setPhasesListAll] = useState(null);

  const [currentPhase, setCurrentPhase] = useState({});

  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whiteListPrice, setWhiteListPrice] = useState(0);
  const [whitelistAmount, setWhitelistAmount] = useState(1);
  const [whiteListDataTable, setWhiteListDataTable] = useState([]);

  const [selectedProjectAddress, setSelectedProjectAddress] = useState(null);
  const [selectedPhaseCode, setSelectedPhaseCode] = useState(0);

  const [maxSlot, setMaxSlot] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phasesListAll) return setMaxSlot(0);

    const totalSupply = myProjectsList
      .find((i) => i.nftContractAddress === selectedProjectAddress)
      ?.totalSupply.replaceAll(",", "");

    // console.log("totalSupply", totalSupply);
    const maxSlotCalc = phasesListAll?.reduce((acc, curr) => {
      const number = curr.isPublic
        ? curr?.publicMintingAmount?.replaceAll(",", "")
        : curr?.whitelistAmount?.replaceAll(",", "");

      return acc - number;
    }, parseInt(totalSupply));

    setMaxSlot(maxSlotCalc);
  }, [myProjectsList, phasesListAll, selectedProjectAddress]);

  const fetchMyProjectList = useCallback(async () => {
    const adminAddress = currentAccount?.address;
    let projectCount = await launchpad_contract_calls.getProjectCount(
      currentAccount
    );
    let projectsTmp = [];
    if (projectCount > 0) {
      for (let i = 1; i <= projectCount; i++) {
        const projectAddr = await launchpad_contract_calls.getProjectById(
          currentAccount,
          i
        );

        const projectMetadata =
          await launchpad_contract_calls.getProjectByNftAddress(
            currentAccount,
            projectAddr
          );

        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          projectAddr
        );

        launchpad_psp34_nft_standard_calls.setContract(
          launchpad_psp34_nft_standard_contract
        );
        const contractAdminAddress =
          await launchpad_psp34_nft_standard_calls.getAdminAddress(
            currentAccount
          );

        // console.log("zzz", contractAdminAddress, adminAddress);

        if (contractAdminAddress === adminAddress) {
          const projectInfoHash =
            await launchpad_psp34_nft_standard_calls.getProjectInfo(
              currentAccount
            );

          const projectInfo =
            await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(
              projectInfoHash
            );

          const projectTmp = {
            name: projectInfo.name,
            nftContractAddress: projectAddr,
            ...projectMetadata,
          };
          projectsTmp.push(projectTmp);
        }
      }
    }

    // console.log("projectsTmp", projectsTmp);
    setMyProjectsList(projectsTmp);
  }, [api, currentAccount]);

  useEffect(() => {
    fetchMyProjectList();
  }, [fetchMyProjectList]);

  const onAddWhitelist = async () => {
    if (!selectedProjectAddress) {
      setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    if (!isValidAddressPolkadotAddress(whitelistAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    const isAlreadyAdded = whiteListDataTable
      .map((i) => i.address)
      .includes(whitelistAddress);

    if (isAlreadyAdded) {
      return toast.error(`This address was already added to whitelist!`);
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      selectedProjectAddress
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    dispatch(setTxStatus({ type: ADD_WHITELIST, step: START }));

    await launchpad_psp34_nft_standard_calls.addWhitelist(
      currentAccount,
      whitelistAddress,
      selectedPhaseCode,
      whitelistAmount,
      whiteListPrice,
      dispatch,
      ADD_WHITELIST,
      api
    );
  };

  const onUpdateWhitelist = async () => {
    //check whitelistAddress

    if (!selectedProjectAddress) {
      setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    if (!isValidAddressPolkadotAddress(whitelistAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    const isAlreadyAdded = whiteListDataTable
      .map((i) => i.address)
      .includes(whitelistAddress);

    if (!isAlreadyAdded) {
      return toast.error(`This address is not in Whitelist!`);
    }

    const claimedAmount = whiteListDataTable
      .find((i) => i.address === whitelistAddress)
      ?.claimedAmount.replaceAll(",", "");

    if (parseInt(claimedAmount) >= whitelistAmount) {
      return toast.error(`New amount must greater than claimed amount!`);
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      selectedProjectAddress
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    dispatch(setTxStatus({ type: UPDATE_WHITELIST, step: START }));

    await launchpad_psp34_nft_standard_calls.updateWhitelist(
      currentAccount,
      whitelistAddress,
      selectedPhaseCode,
      whitelistAmount,
      whiteListPrice,
      dispatch,
      UPDATE_WHITELIST,
      api
    );
  };

  const onChangeSelectedProjectAddress = async (address) => {
    // console.log(address);
    if (!address) {
      setPhasesListWhitelist(null);
      setSelectedPhaseCode(0);
      return;
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(
      currentAccount
    );
    // console.log("zzztotalPhase", totalPhase);
    let phasesTmp = [];
    let phasesListAll = [];
    for (let i = 1; i <= totalPhase; i++) {
      const phaseSchedule =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          i
        );

      phasesListAll.push({ ...phaseSchedule });

      const phaseCode = phaseSchedule.title;

      // console.log("zzzphaseSchedule", phaseSchedule);

        const phaseInfo = {
          id: i,
          code: phaseCode,
          ...phaseSchedule,
        };
        phasesTmp.push(phaseInfo);
      
    }

    // console.log("phasesListAll", phasesListAll);
    setPhasesListAll(phasesListAll);
    setPhasesListWhitelist(phasesTmp);
    setSelectedProjectAddress(address);
    setSelectedPhaseCode(0);
  };

  const onChangeSelectedPhaseCode = async (phaseId) => {
    setSelectedPhaseCode(phaseId);
  };

  const fetchPhaseInfo = useCallback(async () => {
    if (!selectedPhaseCode || !selectedProjectAddress) {
      setCurrentPhase(null);

      return;
    }

    try {
      setLoading(true);

      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        selectedProjectAddress
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      const phaseInfo =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          selectedPhaseCode
        );
      // console.log("phase info", phaseInfo);
      setCurrentPhase(phaseInfo);

      const totalPhaseAccountLink =
        await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
          currentAccount,
          selectedPhaseCode
        );
      let whiteListDataTableTmp = [];
      console.log('totalPhaseAccountLink', totalPhaseAccountLink);
      for (let i = 0; i < totalPhaseAccountLink; i++) {
        const whitelistPhaseAccountAddress =
          await launchpad_psp34_nft_standard_calls.getPhaseAccountLink(
            currentAccount,
            selectedPhaseCode,
            i
          );
          console.log('whitelistPhaseAccountAddress', whitelistPhaseAccountAddress);
        // eslint-disable-next-line no-unused-vars
        const phaseSchedule =
          await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
            currentAccount,
            selectedPhaseCode
          );
        // const phaseCode = phaseSchedule.title;
        const whiteListData =
          await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
            currentAccount,
            selectedPhaseCode,
            whitelistPhaseAccountAddress
          );

        if (whiteListData) {
          const whiteListDataItemTmp = {
            address: whitelistPhaseAccountAddress,
            whitelistAmount: whiteListData.whitelistAmount,
            claimedAmount: whiteListData.claimedAmount,
            mintingFee: convertStringToPrice(whiteListData.mintingFee),
          };

          whiteListDataTableTmp.push(whiteListDataItemTmp);
        }
      }
      setWhiteListDataTable(whiteListDataTableTmp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, currentAccount, selectedPhaseCode]);

  useEffect(() => {
    fetchPhaseInfo();
  }, [fetchPhaseInfo]);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_WHITELIST, ADD_WHITELIST],
    () => {
      setWhiteListPrice(0);
      setWhitelistAddress("");
      setWhitelistAmount(1);
      fetchPhaseInfo();
    }
  );

  return (
    <Stack>
      <Stack pb="30px" borderBottom="1px #333 solid" textAlign="left">
        <Heading fontSize="32px" pb="20px" textAlign="center">
          add whitelist
        </Heading>
        <Stack>
          <Text py={2}>Choose Project</Text>
          <Box>
            <Select
              isDisabled={actionType}
              h="50px"
              borderRadius="0"
              fontSize="15px"
              border="1px solid #343333"
              color="#7ae7ff"
              textTransform="capitalize"
              fontFamily="Oswald, san serif"
              onChange={({ target }) =>
                onChangeSelectedProjectAddress(target.value)
              }
            >
              <option className="my-option" value={0}>
                Click to pick project
              </option>
              {myProjectsList?.length
                ? myProjectsList.map((item, index) => (
                    <option value={item.nftContractAddress} key={index}>
                      {item.name}
                    </option>
                  ))
                : ""}
            </Select>
          </Box>
        </Stack>
        <Stack>
          <Text py={2}>Choose Phase</Text>
          <Box>
            <Select
              isDisabled={actionType}
              h="50px"
              borderRadius="0"
              fontSize="15px"
              color="#7ae7ff"
              value={selectedPhaseCode}
              fontFamily="Oswald, san serif"
              textTransform="capitalize"
              border="1px solid #343333"
              onChange={({ target }) => onChangeSelectedPhaseCode(target.value)}
            >
              <option className="my-option" value={0}>
                Click to pick phase
              </option>
              {phasesListWhitelist?.length
                ? phasesListWhitelist.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.code}
                    </option>
                  ))
                : ""}
            </Select>
          </Box>
        </Stack>
        <Stack>
          <Text py={2}>Whitelist Address</Text>
          <Box>
            <Input
              isDisabled={actionType || maxSlot <= 0}
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
                setWhitelistAddress(event.target.value.toString())
              }
            />
          </Box>
        </Stack>
        <Stack>
          <Text py={2}>Price</Text>
          <NumberInput
            bg="black"
            onChange={(valueString) => setWhiteListPrice(valueString)}
            value={whiteListPrice}
            mr={3}
            h="3.125rem"
            w="full"
            px={0}
            min={0}
            isDisabled={actionType || maxSlot <= 0}
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
        </Stack>
        <Stack pb="30px">
          <Text py={2}>Add number</Text>

          <Box>
            <NumberInput
              isDisabled={actionType || maxSlot <= 0}
              bg="black"
              min={1}
              onChange={(valueString) => setWhitelistAmount(valueString)}
              value={whitelistAmount}
              mr={3}
              h="3.125rem"
              w="full"
              px={0}
              max={maxSlot}
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
        </Stack>
        <HStack
          spacing="30px"
          // direction={{ base: "column", xl: "row" }}
          justify="space-between"
          alignItems="center"
        >
          <CommonButton
            mx="0"
            {...rest}
            w="full"
            variant="outline"
            text="add new"
            onClick={() => onAddWhitelist()}
            isDisabled={
              maxSlot <= 0 ||
              loadingForceUpdate ||
              (actionType && actionType !== ADD_WHITELIST)
            }
          />

          <CommonButton
            mx="0"
            {...rest}
            w="full"
            text="update"
            variant="outline"
            onClick={() => onUpdateWhitelist()}
            isDisabled={
              maxSlot <= 0 ||
              loadingForceUpdate ||
              (actionType && actionType !== UPDATE_WHITELIST)
            }
          />
        </HStack>
      </Stack>

      <Stack py="30px">
        <Heading fontSize="32px" pb="20px" textAlign="center">
          Whitelist Management
        </Heading>
        {currentPhase && currentPhase.title && (
          <>
            <Stack
              px="2px"
              w="full"
              py="20px"
              borderTop="1px #303030 solid"
              borderBottom="1px #303030 solid"
              direction={["column", "row"]}
              fontSize={["15px", "16px"]}
            >
              <Stack
                w="full"
                color="#888"
                spacing="30px"
                direction={["row"]}
                alignContent="space-between"
                minH={{ base: "1rem", "2xl": "3.375rem" }}
              >
                <Text>
                  Total amount:{" "}
                  <Text as="span" color="#fff">
                    {currentPhase.whitelistAmount}{" "}
                    <Text as="span">
                      token{currentPhase.whitelistAmount > 1 ? "s" : ""}
                    </Text>
                  </Text>
                </Text>

                <Text>
                  Minted Amount:{" "}
                  <Text as="span" color="#fff">
                    {currentPhase.claimedAmount}{" "}
                    <Text as="span">
                      token{currentPhase.claimedAmount > 1 ? "s" : ""}
                    </Text>
                  </Text>
                </Text>
              </Stack>

              <Stack w="full" minW="fit-content" direction={["column", "row"]}>
                <Text color="#fff">
                  Start:{" "}
                  <Text as="span" color="#7ae7ff">
                    {convertStringToDateTime(currentPhase.startTime)}
                  </Text>
                </Text>
                <Text as="span" display={["none", "flex"]}>
                  -
                </Text>
                <Text color="#fff">
                  End:{" "}
                  <Text as="span" color="#7ae7ff">
                    {convertStringToDateTime(currentPhase.endTime)}
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </>
        )}
        {loadingForceUpdate || loading ? (
          <AnimationLoader />
        ) : (
          <motion.div
            style={{ marginTop: "20px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TableContainer
              fontSize="lg"
              w={{ base: "1100px", xl: "1560px" }}
              maxH={{ base: "390px", xl: "400px" }}
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
                            // bg="#171717"
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
                          <Td textAlign="center" color="#fff">
                            {truncateStr(item.address, 6)}
                          </Td>
                          <Td textAlign="center" color="#fff">
                            {item.whitelistAmount}
                          </Td>
                          <Td textAlign="center" color="#fff">
                            {item.claimedAmount}
                          </Td>
                          <Td textAlign="center" color="#fff">
                            {item.mintingFee} <AzeroIcon mb={1.5} />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Text py={2}>No info found!</Text>
                )}
              </motion.div>
            </TableContainer>
          </motion.div>
        )}
      </Stack>
    </Stack>
  );
}

export default MyWhiteListProjectPage;
