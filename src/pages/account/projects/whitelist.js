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
  Textarea,
  Tooltip,
  Spacer,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useRef, useState, useCallback } from "react";
import { convertStringToDateTime } from "@utils";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { Select } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { FiSearch, FiX } from "react-icons/fi";

import { truncateStr } from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import {
  ADD_WHITELIST,
  UPDATE_WHITELIST,
  CLEAR_WHITELIST,
  START,
} from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { isValidAddressPolkadotAddress } from "@utils";
import { SCROLLBAR } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { APICall } from "@api/client";
import { formatNumToBN, isEmptyObj, isPhaseEnd, isValidAddress } from "@utils";
import { CheckCircleIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { usePhaseInfo } from "@hooks/usePhaseInfo";
import { useMyProjectAdmin } from "@hooks/useMyProjectAdmin";
import AddressCopier from "@components/AddressCopier/AddressCopier";
import { usePagination } from "@ajna/pagination";
import PaginationMP from "@components/Pagination/Pagination";

const tableHeaders = ["Address", "Amount", "Claimed", "Price"];

function MyWhiteListProjectPage(props) {
  const { projectInfo, selectedProjectAddress } = props;

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whiteListPrice, setWhiteListPrice] = useState(0);
  const [whitelistAmount, setWhitelistAmount] = useState(1);

  const whitelistAmountRef = useRef(whitelistAmount);

  const [selectedPhaseCode, setSelectedPhaseCode] = useState(0);

  const [isUpdateMode, setIsUpdateMode] = useState(null);
  const [whitelistAmountClaimed, setWhitelistAmountClaimed] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [resultList, setResultList] = useState(null)

  const getSearchResult = (keywords) => {
    const result = phaseInfo?.userData?.filter(el => el.address === keywords) || []
    if(!result?.length && !keywords) {
      setResultList()
      return
    }
    setResultList(result);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetSearchResult = useCallback(
    debounce((k) => getSearchResult(k), 1000),
    []
  );

  const handleInputOnchange = (value) => {

    setKeywords(value);
    debounceGetSearchResult(value);
  };
  const { myProjectAdmin } = useMyProjectAdmin(
    api,
    launchpad_psp34_nft_standard.CONTRACT_ABI,
    currentAccount?.address
  );
  const { phaseInfo, isRefetching, refetch } = usePhaseInfo(
    selectedProjectAddress,
    selectedPhaseCode
  );

  const {
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
  } = usePagination({
    total: (resultList || phaseInfo?.userData)?.length,
    initialState: {
      currentPage: 1,
      isDisabled: false,
      pageSize: 5,
    },
  });

  const onAddWhitelist = async () => {
    if (!selectedProjectAddress) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    if (!isValidAddressPolkadotAddress(whitelistAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    const isAlreadyAdded = phaseInfo?.userData
      ?.map((i) => i.address)
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
      api,
      selectedProjectAddress
    );
  };

  const onUpdateWhitelist = async () => {
    //check whitelistAddress

    if (!selectedProjectAddress) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    if (!isValidAddressPolkadotAddress(whitelistAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    const isAlreadyAdded = phaseInfo?.userData
      .map((i) => i.address)
      .includes(whitelistAddress);

    if (!isAlreadyAdded) {
      return toast.error(`This address is not in Whitelist!`);
    }

    const claimedAmount = phaseInfo?.userData
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
        api,
        selectedProjectAddress
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const onChangeSelectedPhaseCode = async (phaseId) => {
    // if (parseInt(phaseId) === 0) {
    //   setWhiteListDataTable([]);
    // }

    setWhitelistAddress("");
    setIsUpdateMode(null);
    // setphaseInfo({});
    setWhiteListPrice(0);
    setWhitelistAmount(1);
    setSelectedPhaseCode(phaseId);
  };

  const currentProjectInfo = myProjectAdmin?.find(
    (i) => i.nftContractAddress === selectedProjectAddress
  );

  const phasesListWhitelist = currentProjectInfo?.whiteList?.map((item) => {
    return { ...item.phaseData, id: item.phaseId };
  });

  // TODO add fitler emplty WL length
  //     // whiteListDataTableTmp = whiteListDataTableTmp.filter((item) => {
  //     //   return item?.whitelistAmount * 1 !== 0;
  //     // });

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate(
    [UPDATE_WHITELIST, ADD_WHITELIST],
    async () => {
      setWhitelistAddress("");
      setWhiteListPrice(0);
      setWhitelistAmount(1);
      setIsUpdateMode(null);
      // fetchPhaseInfo();

      await refetch();
    }
  );

  let [value, setValue] = useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const regexTestNum = /^-?\d+(\.\d+(e\d+)?)?$/;

  const formatValue = value
    .trim()
    .split(/[\n]/)
    .map((item) => {
      const itemArray = item.split(/[,]/);

      const isValid =
        itemArray?.length === 3 &&
        isValidAddress(itemArray[0]) &&
        regexTestNum.test(itemArray[1]) &&
        regexTestNum.test(itemArray[2]);

      return {
        address: itemArray[0],
        whitelistAmount: itemArray[1],
        claimedAmount: 0,
        mintingFee: itemArray[2],
        isValid,
      };
    });

  const value4Contract = formatValue.reduce(
    (prev, curr) => {
      let { addressList, minAmountList, minPriceList, totalCount, falseCase } =
        prev;

      addressList.push(curr.address);
      minAmountList.push(curr.whitelistAmount);
      minPriceList.push(formatNumToBN(curr.mintingFee));
      totalCount = totalCount + (parseInt(curr.whitelistAmount) || 0);
      falseCase = falseCase + (!curr?.isValid ? 1 : 0);

      return {
        ...prev,
        addressList,
        minAmountList,
        minPriceList,
        totalCount,
        falseCase,
      };
    },
    {
      addressList: [],
      minAmountList: [],
      minPriceList: [],
      totalCount: 0,
      falseCase: 0,
    }
  );

  async function bulkAddWLHandler() {
    // validate proj is selected
    if (!selectedProjectAddress) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    // validate phase is selected
    if (!selectedPhaseCode) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your phase!`);
      return;
    }

    try {
      const phaseInfo = await APICall.getPhaseInfo({
        nftContractAddress: selectedProjectAddress,
        phaseId: selectedPhaseCode,
      });

      // TODO:
      // phaseId not exit BE still return data = {}

      console.log("2 phaseInfo", phaseInfo);

      const { status, ret, message } = phaseInfo;

      if (status !== "OK") {
        return toast.error("Error ", message);
      }

      if (isEmptyObj(ret)) {
        return toast.error("There is something wrong with your phase ID!");
      }

      // eslint-disable-next-line no-unused-vars
      const { phaseId: phaseIdData, userData, phaseData } = ret;

      if (parseInt(phaseIdData) !== parseInt(selectedPhaseCode)) {
        return toast.error("There is something wrong with your phase Data!");
      }

      if (
        parseInt(currentProjectInfo?.availableTokenAmount) <
        parseInt(value4Contract?.totalCount)
      ) {
        return toast.error(
          "Total Bulk Whitelist can not greater than remain slot!"
        );
      }

      if (!phaseData?.isActive) {
        return toast.error("Can not add whitelist to inactive phase!");
      }

      if (value4Contract?.addressList?.length > 0) {
        let isDuplicated = value4Contract?.addressList?.filter(
          (i, idx) => value4Contract?.addressList?.indexOf(i) !== idx
        );

        if (isDuplicated?.length > 0) {
          return toast.error(
            `You have ${isDuplicated?.length} duplicate wallet address on your list.`
          );
        }
      }

      const regexTestNum = /^-?\d+(\.\d+(e\d+)?)?$/;

      for (let i = 0; i < value4Contract?.addressList?.length; i++) {
        console.log(
          "value4Contract?.addressList[i]",
          value4Contract?.addressList[i]
        );

        if (!isValidAddress(value4Contract?.addressList[i])) {
          return toast.error(
            `This address is invalid! ${truncateStr(
              value4Contract?.addressList[i]
            )}`
          );
        }

        if (userData?.length > 0) {
          const addressList = userData?.map((i) => i.address);

          const isAlreadyAdded = addressList.includes(
            value4Contract?.addressList[i]
          );

          if (isAlreadyAdded) {
            return toast.error(
              `This address was already added to whitelist! ${truncateStr(
                value4Contract?.addressList[i]
              )}`
            );
          }
        }

        if (!regexTestNum.test(value4Contract?.minPriceList[i])) {
          return toast.error(
            `This price is wrong format! ${value4Contract?.minPriceList[i]}`
          );
        }
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

      await launchpad_psp34_nft_standard_calls.addMultiWhitelists(
        currentAccount,
        selectedPhaseCode,
        value4Contract?.addressList,
        value4Contract?.minAmountList,
        value4Contract?.minPriceList,
        dispatch,
        ADD_WHITELIST,
        api,
        selectedProjectAddress
      );

      setValue("");
    } catch (error) {
      console.log("error", error);
      return toast.error("Error ", error);
    }
  }

  const [whitelistMode, setWhitelistMode] = useState("SINGLE");

  function onChangeSelectedMode(v) {
    setWhitelistAddress("");
    setIsUpdateMode(null);
    setWhiteListPrice(0);
    setWhitelistAmount(1);
    setWhitelistMode(v);
  }

  // TODO: add phase name
  // book lai data BE side

  async function onClearWLHandler() {
    // validate proj is selected
    if (!selectedProjectAddress) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your project!`);
      return;
    }

    // validate phase is selected
    if (!selectedPhaseCode) {
      // setPhasesListWhitelist(null);
      toast.error(`Please pick your phase!`);
      return;
    }

    try {
      if (!isPhaseEnd(phaseInfo?.phaseData?.endTime)) {
        return toast.error("Only clear whitelist for ended phase!");
      }

      const removeList = phaseInfo?.userData
        ?.map((i) => i.address)
        .slice(0, Math.min(phaseInfo?.userData?.length, 10));

      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        selectedProjectAddress
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      dispatch(setTxStatus({ type: CLEAR_WHITELIST, step: START }));

      await launchpad_psp34_nft_standard_calls.clearWhitelistPhase(
        currentAccount,
        selectedPhaseCode,
        removeList,
        dispatch,
        CLEAR_WHITELIST,
        api
      );
    } catch (error) {
      console.log("error", error);
      return toast.error("Error ", error);
    }
  }
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
          <Heading size="h6">{projectInfo?.name}</Heading>
        </Stack>

        <Stack>
          <Text py={2}>Choose Phase</Text>
          <Box>
            <Select
              isDisabled={actionType || !selectedProjectAddress}
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
              {/* TODO: change to title wen data be avai */}
              {phasesListWhitelist?.map((item) => (
                <option value={item.id} key={item.code}>
                  {item.title || item.id}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>

        <Stack>
          <Text py={2}>Choose Mode</Text>
          <Box>
            <Select
              isDisabled={actionType || parseInt(selectedPhaseCode) === 0}
              h="50px"
              borderRadius="0"
              fontSize="15px"
              color="#7ae7ff"
              value={whitelistMode}
              fontFamily="Oswald, san serif"
              textTransform="capitalize"
              border="1px solid #343333"
              onChange={({ target }) => onChangeSelectedMode(target.value)}
            >
              <option className="my-mode" value={0}>
                Click to Choose mode
              </option>
              {[
                { id: "SINGLE", code: "single add whitelist" },
                { id: "BULK", code: "bulk add whitelist" },
                { id: "CLEAR_WL", code: "clear whitelist" },
              ].map((item, index) => (
                <option value={item.id} key={index}>
                  {item.code}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>

        {whitelistMode === "SINGLE" && (
          <>
            <Stack>
              <Text py={2}>Whitelist Address</Text>

              <Box>
                <Input
                  isDisabled={
                    actionType ||
                    parseInt(selectedPhaseCode) === 0 ||
                    parseInt(phaseInfo?.phaseData?.endTime) < Date.now()
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
                      const isAlreadyAdded = phaseInfo?.userData
                        .map((i) => i.address)
                        .includes(event.target.value.toString());

                      if (!isAlreadyAdded) {
                        setIsUpdateMode("ADD");
                      } else {
                        const editAddr = phaseInfo?.userData.find(
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
                {parseInt(phaseInfo?.phaseData?.endTime) < Date.now() ? (
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
                onChange={(valueString) => {
                  if (/[eE+-]/.test(valueString)) return;

                  setWhiteListPrice(valueString);
                }}
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
                  ? `(Claimed: ${whitelistAmountClaimed} NFTs). Min: ${parseInt(
                      whitelistAmountClaimed
                    )} - Max: ${
                      parseInt(currentProjectInfo?.availableTokenAmount) +
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
                      ? parseInt(whitelistAmountClaimed)
                      : 0
                  }
                  onChange={(valueString) => {
                    if (/[eE+-]/.test(valueString)) return;
                    setWhitelistAmount(valueString);
                  }}
                  value={whitelistAmount}
                  mr={3}
                  h="3.125rem"
                  w="full"
                  px={0}
                  max={
                    isUpdateMode === "EDIT"
                      ? parseInt(currentProjectInfo?.availableTokenAmount) +
                        parseInt(whitelistAmountRef.current)
                      : currentProjectInfo?.availableTokenAmount
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
                  parseInt(whitelistAmountClaimed) ? (
                    <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                      Update amount must be greater than or equal to{" "}
                      {parseInt(whitelistAmountClaimed)}
                    </Text>
                  ) : null}{" "}
                  {whitelistAmount >
                  parseInt(currentProjectInfo?.availableTokenAmount) +
                    parseInt(whitelistAmountRef.current) ? (
                    <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                      Update amount must be less than or equal to{" "}
                      {parseInt(currentProjectInfo?.availableTokenAmount) +
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
                  {whitelistAmount >
                  parseInt(currentProjectInfo?.availableTokenAmount) ? (
                    <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                      Number must be less than or equal to{" "}
                      {parseInt(currentProjectInfo?.availableTokenAmount)}
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
                      parseInt(whitelistAmountClaimed) ||
                    whitelistAmount >
                      parseInt(currentProjectInfo?.availableTokenAmount) +
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
                {currentProjectInfo?.availableTokenAmount <= 0 ? (
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
                    currentProjectInfo?.availableTokenAmount <= 0 ||
                    loadingForceUpdate ||
                    (actionType && actionType !== ADD_WHITELIST) ||
                    !isValidAddressPolkadotAddress(whitelistAddress) ||
                    whiteListPrice < 0 ||
                    parseInt(whitelistAmount) < 0 ||
                    whitelistAmount >
                      parseInt(currentProjectInfo?.availableTokenAmount)
                  }
                />
              </Flex>
            </Flex>
          </>
        )}
      </Stack>

      <Stack w={["full", "70%"]} pb="30px">
        <Heading fontSize="32px" pb="20px" textAlign="center">
          Whitelist Management
        </Heading>
        {phaseInfo && phaseInfo?.phaseId && (
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
                    {phaseInfo?.phaseData?.whitelistAmount}{" "}
                    <Text as="span">
                      NFT{phaseInfo?.phaseData?.whitelistAmount > 1 ? "s" : ""}
                    </Text>
                  </Text>
                </Text>
                <Text>
                  Available: <br />
                  <Text as="span" color="#fff">
                    {currentProjectInfo?.availableTokenAmount}{" "}
                    <Text as="span">NFTs</Text>
                  </Text>
                </Text>

                <Text>
                  Total Claimed: <br />
                  <Text as="span" color="#fff">
                    {phaseInfo?.userData.reduce((acc, curr) => {
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
                    {convertStringToDateTime(phaseInfo?.phaseData?.startTime)}
                  </Text>
                </Text>
                <Text as="span" display={["none", "flex"]}>
                  -
                </Text>
                <Text color="#fff">
                  End:{" "}
                  <Text as="span" color="#7ae7ff">
                    {convertStringToDateTime(phaseInfo?.phaseData?.endTime)}
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </>
        )}
        {loadingForceUpdate || isRefetching ? (
          <AnimationLoader />
        ) : (
          <motion.div
            style={{ marginTop: "20px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* BULK MODE */}
            {whitelistMode === "BULK" && (
              <>
                {value?.trim() && (
                  <Flex mb="8px">
                    <Flex>
                      {value4Contract?.falseCase >=
                      value4Contract?.totalCount ? (
                        <Tooltip
                          hasArrow
                          label={
                            <>{`${value4Contract?.falseCase} OUT OF ${value4Contract?.addressList?.length} TOTAL WHITELIST ARE INVALID. PLEASE MAKE SURE: DECIMAL SEPARATOR MUST BE A DOT (.) AND ADDRESS SHOULD BE VALID`}</>
                          }
                          bg="gray.300"
                          color="black"
                        >
                          <Flex alignItems="center">
                            <WarningTwoIcon />
                            <Text ml="4px">0 valid whitelist</Text>
                          </Flex>
                        </Tooltip>
                      ) : value4Contract?.falseCase !== 0 ? (
                        <Tooltip
                          hasArrow
                          label={
                            <>{`${value4Contract?.falseCase} OUT OF ${value4Contract?.addressList?.length} TOTAL WHITELIST ARE INVALID. PLEASE MAKE SURE: DECIMAL SEPARATOR MUST BE A DOT (.) AND ADDRESS SHOULD BE VALID`}</>
                          }
                          bg="gray.300"
                          color="black"
                        >
                          <Flex alignItems="center">
                            <WarningTwoIcon />
                            <Text ml="4px">
                              {value4Contract?.addressList?.length -
                                value4Contract?.falseCase}{" "}
                              valid whitelist
                            </Text>
                          </Flex>
                        </Tooltip>
                      ) : (
                        <Flex alignItems="center">
                          <CheckCircleIcon />
                          <Text ml="4px">
                            {value4Contract?.addressList?.length} valid
                            whitelist
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                    <Spacer />
                    {value4Contract?.falseCase === 0 && (
                      <Stack textAlign="left">
                        <Text>
                          Summary: {value4Contract?.addressList?.length}{" "}
                          wallets, {value4Contract?.totalCount} slots
                        </Text>
                      </Stack>
                    )}
                  </Flex>
                )}

                <Textarea
                  isDisabled={isPhaseEnd(phaseInfo?.phaseData?.endTime)}
                  rows={5}
                  fontFamily="monospace"
                  fontSize="16px"
                  value={value}
                  onChange={handleInputChange}
                  size="sm"
                  placeholder="Enter one address, WL amount and mint price Azero on each line.
                A decimal separator of amount must use dot (.)
                

                Example: for WL amount 50 and mint price 2.99 Azero 
                5GRdmMkKeKaV94qU3JjDr2ZwRAgn3xwzd2FEJYKjjSFipiAe,50,2.99"
                />
                <Stack my="8px">
                  <CommonButton
                    size="md"
                    mx="0"
                    {...rest}
                    text="Bulk Add"
                    onClick={() => bulkAddWLHandler()}
                    isDisabled={
                      value4Contract?.falseCase ||
                      !value?.trim() ||
                      loadingForceUpdate ||
                      (actionType && actionType !== UPDATE_WHITELIST) ||
                      whiteListPrice < 0 ||
                      parseInt(whitelistAmount) <
                        parseInt(whitelistAmountClaimed) ||
                      whitelistAmount >
                        parseInt(currentProjectInfo?.availableTokenAmount) +
                          parseInt(whitelistAmountRef.current)
                    }
                  />
                </Stack>
                {value?.trim() &&
                  value4Contract?.totalCount - value4Contract?.falseCase >
                    0 && (
                    <TableContainer
                      fontSize="lg"
                      w="full"
                      maxH={{ base: "390px", xl: "400px" }}
                      overflowY="scroll"
                      sx={SCROLLBAR}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
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
                            {formatValue?.map((item, idx) => (
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
                      </motion.div>
                    </TableContainer>
                  )}
              </>
            )}
            {/* SINGLE MODE */}
            {whitelistMode === "SINGLE" && (
              <TableContainer
                fontSize="lg"
                w="full"
                // w={{ base: "full", xl: "1560px" }}
                maxH={{ base: "390px", xl: "555px" }}
                overflowY="scroll"
                sx={SCROLLBAR}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {phaseInfo?.userData?.length ? (
                    <>
                    <InputGroup
                borderColor="#ffffff25"
                borderBottomWidth="2px"
                mb="20px"
                width={"80%"}
              >
                <Input
                  h="40px"
                  bg="transparent"
                  px="0px"
                  fontSize="lg"
                  value={keywords}
                  id="keywords"
                  onChange={(e) => handleInputOnchange(e.target.value)}
                  placeholder="Search address..."
                />
                <InputRightElement
                  transform="translateX(22px)"
                  bg="transparent"
                  h="full"
                  w={16}
                  cursor="pointer"
                >
                  {keywords ? <FiX onClick={(e) => handleInputOnchange('')} size="22px" p="0" /> :<FiSearch size="22px" p="0" />}
                </InputRightElement>
              </InputGroup>
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
                        {(resultList || phaseInfo?.userData)?.slice((currentPage - 1) * pageSize, currentPage * pageSize)?.map((item, idx) => (
                          <Tr key={idx} color="#fff">
                            <Td textAlign="center" color="#fff">
                              <AddressCopier address={item.address} />
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
                     <Stack w="full" py="30px">
                     <PaginationMP
                       bg="#333"
                       maxW="230px"
                       hasGotoPage={false}
                       pagesCount={pagesCount}
                       isDisabled={isDisabled}
                       currentPage={currentPage}
                       setCurrentPage={setCurrentPage}
                     />
                   </Stack>
                   </>
                  ) : (
                    <Text py={2}>No info found!</Text>
                  )}
                </motion.div>
              </TableContainer>
            )}

            {/* CLEAR WL */}
            {whitelistMode === "CLEAR_WL" && (
              <Stack>
                <Text textAlign="left">
                  Phase status:{" "}
                  {phaseInfo?.phaseData?.isActive ? "Active" : "Inactive"}.
                  <br />
                  Phase phaseId: {phaseInfo?.phaseId}.<br />
                  Phase title: {phaseInfo?.phaseData?.title}
                  <br />
                  Total WL: {phaseInfo?.phaseData?.totalCountWLAddress}
                  <br />
                  Phase ended:{" "}
                  {isPhaseEnd(phaseInfo?.phaseData?.endTime) ? "YES" : "NO"}.
                  <br />
                </Text>

                {Math.min(10, phaseInfo?.phaseData?.totalCountWLAddress) !==
                  0 && (
                  <Text>
                    You will restore{" "}
                    {(
                      0.0070399999996 *
                      Math.min(10, phaseInfo?.phaseData?.totalCountWLAddress)
                    ).toFixed(4)}{" "}
                    AZERO for{" "}
                    {Math.min(10, phaseInfo?.phaseData?.totalCountWLAddress)}{" "}
                    Whitelist address clear.
                  </Text>
                )}

                <Stack my="8px">
                  <CommonButton
                    size="md"
                    mx="0"
                    {...rest}
                    text={`Clear
                    ${Math.min(
                      10,
                      phaseInfo?.phaseData?.totalCountWLAddress
                    )} WL`}
                    onClick={() => onClearWLHandler()}
                    isDisabled={
                      !phaseInfo?.phaseData?.totalCountWLAddress ||
                      loadingForceUpdate ||
                      isRefetching
                    }
                  />
                </Stack>
              </Stack>
            )}
          </motion.div>
        )}
      </Stack>
    </Stack>
  );
}

export default MyWhiteListProjectPage;
