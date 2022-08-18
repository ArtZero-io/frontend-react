import {
  Box,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  TableContainer,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { Select } from "@chakra-ui/react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { convertStringToPrice, convertStringToDateTime } from "@utils";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { OWNER_MINT, START } from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import AnimationLoader from "@components/Loader/AnimationLoader";

function MyMintingProjectPage() {
  const { api, currentAccount } = useSubstrateState();
  const dispatch = useDispatch();

  const [currentPhase, setCurrentPhase] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [myProjectsList, setMyProjectsList] = useState([]);
  const [phasesList, setPhasesList] = useState(null);

  const [selectedProjectAddress, setSelectedProjectAddress] = useState(null);
  const [selectedPhaseCode, setSelectedPhaseCode] = useState(0);

  const [maxMint, setMaxMint] = useState(0);

  const fetchMyProjectList = useCallback(async () => {
    let projectAddrList = await launchpad_contract_calls.getProjectsByOwner(
      currentAccount,
      currentAccount?.address
    );
    let projectsTmp = [];
    for (const projectAddr of projectAddrList) {
      // const project = await launchpad_contract_calls.getProjectByNftAddress(
      //   currentAccount,
      //   projectAddr
      // );
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        projectAddr
      );
      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );
      const projectInfoHash =
        await launchpad_psp34_nft_standard_calls.getProjectInfo(currentAccount);
      const projectInfo =
        await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(
          projectInfoHash
        );
      const projectTmp = {
        name: projectInfo.name,
        nftContractAddress: projectAddr,
        ...projectInfo,
      };

      projectsTmp.push(projectTmp);
    }

    setMyProjectsList(projectsTmp);
  }, [api, currentAccount]);

  useEffect(() => {
    fetchMyProjectList();
  }, [fetchMyProjectList]);

  const onOwnerMint = async () => {
    if (selectedProjectAddress == "") {
      setPhasesList([]);
      toast.error(`Please pick your project address!`);
      return;
    }
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      selectedProjectAddress
    );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    dispatch(setTxStatus({ type: OWNER_MINT, step: START }));

    await launchpad_psp34_nft_standard_calls.mint(
      currentAccount,
      selectedPhaseCode,
      mintAmount,
      dispatch,
      OWNER_MINT,
      api
    );
  };

  const onChangeSelectedProjectAddress = async (address) => {
    if (!address) {
      setPhasesList(null);
      setSelectedPhaseCode(0);

      // toast.error(`Select your project!`);
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

    for (let i = 1; i <= totalPhase; i++) {
      const phaseSchedule =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          i
        );
      const phaseCode = phaseSchedule.title;
      if (phaseSchedule.isPublic) {
        const phaseInfo = {
          id: i,
          code: phaseCode,
        };
        phasesTmp.push(phaseInfo);
      }
    }
    setPhasesList(phasesTmp);
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
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      selectedProjectAddress
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    if (selectedPhaseCode && selectedProjectAddress) {
      const phaseInfo =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          selectedPhaseCode
        );

      const { claimedAmount, publicMintingAmount } = phaseInfo;

      setCurrentPhase(phaseInfo);

      setMaxMint(
        parseInt(
          publicMintingAmount.replaceAll(",", "") -
            parseInt(claimedAmount.replaceAll(",", ""))
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, currentAccount, selectedPhaseCode]);

  useEffect(() => {
    fetchPhaseInfo();
  }, [fetchPhaseInfo]);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate([OWNER_MINT], () =>
    fetchPhaseInfo()
  );

  return (
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
            minH="650px"
            mx={2}
            fontSize="lg"
            bg="brand.grayDark"
            padding={12}
            maxW="xl"
            w="100%"
          >
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box h="full">
                <Heading size="h4">Owner Mint</Heading>
                <Text py={2}>
                  If you are an owner project, you can mint the remain NFTs of
                  public phases. This action is free
                </Text>
                <Box h="full">
                  {" "}
                  <Box mt={7}>
                    <Text py={2}>Choose project</Text>
                    <Box className="custom-select">
                      <Select
                        isDisabled={actionType}
                        h="50px"
                        borderRadius="0"
                        fontSize="15px"
                        border="1px solid #343333"
                        fontFamily="Evogria, san serif"
                        onChange={({ target }) =>
                          onChangeSelectedProjectAddress(target.value)
                        }
                      >
                        <option className="my-option" value={0}>
                          click to pick project
                        </option>
                        {myProjectsList?.length
                          ? myProjectsList.map((item, index) => (
                              <option
                                className="my-option"
                                value={item.nftContractAddress}
                                key={index}
                              >
                                {item.name}
                              </option>
                            ))
                          : ""}
                      </Select>
                    </Box>
                  </Box>
                  <Box mt={7}>
                    <Text py={2}>Choose phase</Text>
                    <Box>
                      <Select
                        isDisabled={actionType}
                        h="50px"
                        value={selectedPhaseCode}
                        borderRadius="0"
                        fontSize="15px"
                        border="1px solid #343333"
                        fontFamily="Evogria, san serif"
                        onChange={({ target }) =>
                          onChangeSelectedPhaseCode(target.value)
                        }
                      >
                        <option value={0}>click to pick phase</option>
                        {phasesList?.length
                          ? phasesList.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.code}
                              </option>
                            ))
                          : ""}
                      </Select>
                    </Box>
                  </Box>
                  <Box mt={7}>
                    <Text py={2}>Mint Amount</Text>
                    <Box>
                      <NumberInput
                        isDisabled={actionType || maxMint <= 0}
                        bg="black"
                        defaultValue={1}
                        min={1}
                        onChange={(valueString) => setMintAmount(valueString)}
                        value={mintAmount}
                        mr={3}
                        h="3.125rem"
                        w="full"
                        px={0}
                        max={maxMint}
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

                      <Stack py="15px" alignItems="center">
                        <CommonButton
                          mx="0"
                          {...rest}
                          w="full"
                          text="mint"
                          onClick={() => onOwnerMint()}
                          isDisabled={maxMint <= 0 || loadingForceUpdate}
                        />
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>

          <Box
            minH="650px"
            mx={2}
            fontSize="lg"
            bg="brand.grayDark"
            padding={12}
            maxW="xl"
            w="100%"
          >
            <Flex direction="column" justifyContent="space-between" h="full">
              <Box h="full">
                <Heading size="h4">Phase Information</Heading>

                <Box mt={7}>
                  {loadingForceUpdate ? (
                    <AnimationLoader />
                  ) : (
                    <TableContainer
                      fontSize="lg"
                      w={{ base: "1100px", "2xl": "1560px" }}
                    >
                      {!currentPhase ? (
                        <Text>No info found!</Text>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Text py={2}>Phase: {currentPhase.title}</Text>
                          <Text py={2}>
                            Total amount: {currentPhase.publicMintingAmount}
                          </Text>
                          <Text py={2}>
                            Minting Fee:{" "}
                            {convertStringToPrice(
                              currentPhase.publicMintingFee
                            )}{" "}
                            <AzeroIcon mb="5px" />
                          </Text>
                          <Text py={2}>
                            Minted Amount: {currentPhase.claimedAmount}
                          </Text>
                          <Text py={2}>
                            Start Time:{" "}
                            {convertStringToDateTime(currentPhase.startTime)}
                          </Text>
                          <Text py={2}>
                            End Time:{" "}
                            {convertStringToDateTime(currentPhase.endTime)}
                          </Text>
                        </motion.div>
                      )}
                    </TableContainer>
                  )}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default MyMintingProjectPage;
