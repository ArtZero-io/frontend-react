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
  Stack,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertStringToDateTime } from "@utils";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { Select } from "@chakra-ui/react";

import {
  convertNumberWithoutCommas,
  convertStringToPrice,
  truncateStr,
} from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { ADD_WHITELIST, UPDATE_WHITELIST, START } from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { isValidAddressPolkadotAddress } from "@utils";
import { SCROLLBAR } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { APICall } from "../../../api/client";
import { execContractQuery } from "../nfts/nfts";

const tableHeaders = ["Address", "Amount", "Claimed", "Price"];

function MyWhiteListProjectPage() {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [myProjectsList, setMyProjectsList] = useState([]);
  const [phasesListWhitelist, setPhasesListWhitelist] = useState(null);

  const [currentPhase, setCurrentPhase] = useState({});

  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whiteListPrice, setWhiteListPrice] = useState(0);
  const [whitelistAmount, setWhitelistAmount] = useState(1);
  const [whiteListDataTable, setWhiteListDataTable] = useState([]);
  const [availableToken, setAvailableToken] = useState(0);
  const whitelistAmountRef = useRef(whitelistAmount);

  const [selectedProjectAddress, setSelectedProjectAddress] = useState(null);
  const [selectedPhaseCode, setSelectedPhaseCode] = useState(0);

  const [loading, setLoading] = useState(false);

  const [isUpdateMode, setIsUpdateMode] = useState(null);
  const [whitelistAmountClaimed, setWhitelistAmountClaimed] = useState(0);
  const fetchMyProjectList = useCallback(async () => {
    const checkIsAdmin = async ({ nftContractAddress, address }) => {
      if (!api) return;

      const queryResult1 = await execContractQuery(
        currentAccount?.address,
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        nftContractAddress,
        "accessControl::hasRole",
        3739740293,
        address
      );

      return queryResult1.toHuman().Ok;

    };
    const { ret: projList1 } = await APICall.getAllProjects({});
    const { ret: projList2 } = await APICall.getAllProjects({
      isActive: false,
    });

    const projList = projList1.concat(projList2);
    const projAddCheckAdmin = await Promise.all(
      projList.map(async (proj) => {
        const isAdmin = await checkIsAdmin({
          nftContractAddress: proj?.nftContractAddress,
          address: currentAccount?.address,
        });

        return { ...proj, isAdmin };
      })
    );
    const myProjList = projAddCheckAdmin.filter(
      ({ isAdmin, collectionOwner }) =>
        collectionOwner === currentAccount.address || isAdmin
    );

    setMyProjectsList(myProjList);
  }, [api, currentAccount.address]);

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

    if (parseInt(claimedAmount) > whitelistAmount) {
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

    try {
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
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const onChangeSelectedProjectAddress = async (address) => {
    setSelectedPhaseCode(0);
    setWhiteListDataTable([]);
    setIsUpdateMode(null);
    setWhiteListDataTable([]);
    setCurrentPhase({});
    setWhiteListPrice(0);
    setWhitelistAmount(1);

    if (!address || address === "0") {
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

    let phasesTmp = [];
    let phasesListAll = [];
    for (let i = 1; i <= totalPhase; i++) {
      const phaseSchedule =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          i
        );
      if (phaseSchedule.isActive) {
        phasesListAll.push({ ...phaseSchedule });

        const phaseCode = phaseSchedule.title;

        const phaseInfo = {
          id: i,
          code: phaseCode,
          ...phaseSchedule,
        };
        phasesTmp.push(phaseInfo);
      }
    }

    setPhasesListWhitelist(phasesTmp);
    setSelectedProjectAddress(address);
    setWhitelistAddress("");
  };

  const onChangeSelectedPhaseCode = async (phaseId) => {
    if (parseInt(phaseId) === 0) {
      setWhiteListDataTable([]);
    }

    setWhitelistAddress("");
    setIsUpdateMode(null);
    setCurrentPhase({});
    setWhiteListPrice(0);
    setWhitelistAmount(1);
    setSelectedPhaseCode(phaseId);
  };

  const fetchPhaseInfo = useCallback(async () => {
    if (!selectedPhaseCode || !selectedProjectAddress) {
      setCurrentPhase(null);

      return;
    }

    try {
      setLoading(true);
      const availableTokenAmount =
        await launchpad_psp34_nft_standard_calls.getAvailableTokenAmount(
          currentAccount
        );
      setAvailableToken(convertNumberWithoutCommas(availableTokenAmount));

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

      if (phaseInfo?.isActive) {
        setCurrentPhase(phaseInfo);
      }

      const totalPhaseAccountLink =
        await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
          currentAccount,
          selectedPhaseCode
        );
      let whiteListDataTableTmp = [];

      for (let i = 0; i < totalPhaseAccountLink; i++) {
        const whitelistPhaseAccountAddress =
          await launchpad_psp34_nft_standard_calls.getPhaseAccountLink(
            currentAccount,
            selectedPhaseCode,
            i
          );

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
      setWhitelistAddress("");
      setWhiteListPrice(0);
      setWhitelistAmount(1);
      setIsUpdateMode(null);
      fetchPhaseInfo();
    }
  );

  return (
    <Stack
      w="full"
      spacing="30px"
      alignItems="start"
      direction={["column", "row"]}
    >
      <Stack
        pb="30px"
        //  borderBottom="1px #333 solid"
        textAlign="left"
        w={["full", "30%"]}
      >
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
              isDisabled={
                actionType ||
                parseInt(selectedPhaseCode) === 0 ||
                parseInt(currentPhase?.endTime?.replaceAll(",", "")) <
                  Date.now()
              }
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
              onChange={(event) => {
                if (!event.target.value.toString()) {
                  setIsUpdateMode(null);
                } else {
                  const isAlreadyAdded = whiteListDataTable
                    .map((i) => i.address)
                    .includes(event.target.value.toString());

                  if (!isAlreadyAdded) {
                    setIsUpdateMode("ADD");
                  } else {
                    const editAddr = whiteListDataTable.find(
                      (i) => i.address === event.target.value.toString()
                    );

                    setWhiteListPrice(editAddr.mintingFee);
                    setWhitelistAmount(editAddr.whitelistAmount);
                    whitelistAmountRef.current = editAddr.whitelistAmount;
                    setWhitelistAmountClaimed(editAddr.claimedAmount);
                    setIsUpdateMode("EDIT");
                  }
                }
                setWhitelistAddress(event.target.value.toString());
              }}
            />
          </Box>
          <>
            {parseInt(currentPhase?.endTime?.replaceAll(",", "")) <
            Date.now() ? (
              <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                This phase is ended!
              </Text>
            ) : null}
          </>
        </Stack>
        <Stack hidden={!isUpdateMode}>
          <Text py={2}>
            {isUpdateMode === "ADD"
              ? "Price"
              : isUpdateMode === "EDIT"
              ? "New price"
              : ""}
          </Text>
          <NumberInput
            bg="black"
            onChange={(valueString) => setWhiteListPrice(valueString)}
            value={whiteListPrice}
            mr={3}
            h="3.125rem"
            w="full"
            px={0}
            min={0}
            isDisabled={actionType}
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
          {whiteListPrice < 0 ? (
            <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
              Whitelist price must be greater than or equal to 0 Azero
            </Text>
          ) : null}{" "}
        </Stack>
        <Stack hidden={!isUpdateMode} pb="30px">
          <Text py={2}>
            {" "}
            {isUpdateMode === "ADD"
              ? "Add number"
              : isUpdateMode === "EDIT"
              ? "Update amount"
              : ""}{" "}
            {isUpdateMode === "EDIT"
              ? `(Claimed: ${whitelistAmountClaimed} NFTs). Min: ${
                  parseInt(whitelistAmountClaimed) + 1
                } - Max: ${
                  parseInt(availableToken) +
                  parseInt(whitelistAmountRef.current)
                }`
              : null}
          </Text>
          <Box>
            <NumberInput
              isDisabled={actionType}
              bg="black"
              min={
                isUpdateMode === "EDIT"
                  ? parseInt(whitelistAmountClaimed) + 1
                  : 0
              }
              onChange={(valueString) => setWhitelistAmount(valueString)}
              value={whitelistAmount}
              mr={3}
              h="3.125rem"
              w="full"
              px={0}
              max={
                isUpdateMode === "EDIT"
                  ? parseInt(availableToken) +
                    parseInt(whitelistAmountRef.current)
                  : availableToken
              }
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
          {isUpdateMode === "EDIT" ? (
            <>
              {parseInt(whitelistAmount) <
              parseInt(whitelistAmountClaimed) + 1 ? (
                <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                  Update amount must be greater than or equal to{" "}
                  {parseInt(whitelistAmountClaimed) + 1}
                </Text>
              ) : null}{" "}
              {whitelistAmount >
              parseInt(availableToken) +
                parseInt(whitelistAmountRef.current) ? (
                <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                  Update amount must be less than or equal to{" "}
                  {parseInt(availableToken) +
                    parseInt(whitelistAmountRef.current)}
                </Text>
              ) : null}{" "}
            </>
          ) : (
            <>
              {parseInt(whitelistAmount) < 0 ? (
                <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                  Number must be greater than or equal to zero.
                </Text>
              ) : null}{" "}
              {whitelistAmount > parseInt(availableToken) ? (
                <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                  Number must be less than or equal to{" "}
                  {parseInt(availableToken)}
                </Text>
              ) : null}{" "}
            </>
          )}
        </Stack>

        <Flex w="full" hidden={!isUpdateMode} justify="start">
          <Stack
            w="full"
            direction="column"
            justify="space-between"
            alignItems="center"
            hidden={isUpdateMode === "ADD"}
          >
            <CommonButton
              mx="0"
              {...rest}
              w="full"
              text="update"
              variant="outline"
              onClick={() => onUpdateWhitelist()}
              isDisabled={
                loadingForceUpdate ||
                (actionType && actionType !== UPDATE_WHITELIST) ||
                whiteListPrice < 0 ||
                parseInt(whitelistAmount) <
                  parseInt(whitelistAmountClaimed) + 1 ||
                whitelistAmount >
                  parseInt(availableToken) +
                    parseInt(whitelistAmountRef.current)
              }
            />
          </Stack>

          <Flex
            w="full"
            direction="column"
            justify="space-between"
            alignItems="center"
            hidden={isUpdateMode === "EDIT"}
          >
            {availableToken <= 0 ? (
              <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                The remaining slot is 0. You can't add more!{" "}
              </Text>
            ) : null}
            <CommonButton
              mx="0"
              {...rest}
              w="full"
              variant="outline"
              text="add new"
              onClick={() => onAddWhitelist()}
              isDisabled={
                availableToken <= 0 ||
                loadingForceUpdate ||
                (actionType && actionType !== ADD_WHITELIST) ||
                !isValidAddressPolkadotAddress(whitelistAddress) ||
                whiteListPrice < 0 ||
                parseInt(whitelistAmount) < 0 ||
                whitelistAmount > parseInt(availableToken)
              }
            />
          </Flex>
        </Flex>
      </Stack>

      <Stack w={["full", "70%"]} pb="30px">
        <Heading fontSize="32px" pb="20px" textAlign="center">
          Whitelist Management
        </Heading>

        {currentPhase && currentPhase.title && (
          <>
            <Stack
              textAlign="left"
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
                spacing={["6px", "30px"]}
                direction={["column", "row"]}
                alignContent="space-between"
                justifyContent="flex-start"
                minH={{ base: "1rem", "2xl": "3.375rem" }}
              >
                <Text>
                  Total amount: <br />
                  <Text as="span" color="#fff">
                    {currentPhase.whitelistAmount}{" "}
                    <Text as="span">
                      NFT{currentPhase.whitelistAmount > 1 ? "s" : ""}
                    </Text>
                  </Text>
                </Text>

                <Text>
                  Available: <br />
                  <Text as="span" color="#fff">
                    {availableToken} <Text as="span">NFTs</Text>
                  </Text>
                </Text>

                <Text>
                  Total Claimed: <br />
                  <Text as="span" color="#fff">
                    {whiteListDataTable.reduce((acc, curr) => {
                      return acc + parseInt(curr.claimedAmount);
                    }, 0)}
                    <Text as="span"> NFTs</Text>
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
              w="full"
              // w={{ base: "full", xl: "1560px" }}
              maxH={{ base: "390px", xl: "400px" }}
              overflowY="scroll"
              sx={SCROLLBAR}
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
