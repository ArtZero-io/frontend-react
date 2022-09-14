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
  Wrap,
  WrapItem,
  Tag,
  HStack,
} from "@chakra-ui/react";
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
import FadeIn from "react-fade-in";
function MyMintingProjectPage() {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [myProjectsList, setMyProjectsList] = useState([]);
  const [phasesList, setPhasesList] = useState(null);

  const [currentPhase, setCurrentPhase] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);

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
    if (!selectedProjectAddress) {
      setPhasesList(null);
      toast.error(`Please pick your project!`);
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

      if (phaseSchedule.isPublic && phaseSchedule.isActive) {
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
      if (phaseInfo.isActive) {
        const { claimedAmount, publicMintingAmount } = phaseInfo;

        setCurrentPhase(phaseInfo);
  
        setMaxMint(
          parseInt(
            publicMintingAmount.replaceAll(",", "") -
              parseInt(claimedAmount.replaceAll(",", ""))
          )
        );
      }
     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, currentAccount, selectedPhaseCode]);

  useEffect(() => {
    fetchPhaseInfo();
  }, [fetchPhaseInfo]);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate([OWNER_MINT], () => {
    setMintAmount(1);
    fetchPhaseInfo();
  });

  return (
    <Stack>
      <Stack pb="30px" w="full">
        <Heading fontSize="32px" pb="15px" textAlign="center">
          Owner Mint
        </Heading>
        <Text w="full">
          If you are an owner project, you can mint the remain NFTs of public
          phases.
          <br /> This action is free
        </Text>
        <Stack textAlign="left">
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
        <Stack textAlign="left">
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
              {phasesList?.length
                ? phasesList.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.code}
                    </option>
                  ))
                : ""}
            </Select>
          </Box>
        </Stack>

        <Stack textAlign="left" pb="30px">
          <Text py={2}>Mint Amount</Text>

          <Box>
            <NumberInput
              isDisabled={actionType || maxMint <= 0}
              bg="black"
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
            text="mint"
            onClick={() => onOwnerMint()}
            isDisabled={maxMint <= 0 || loadingForceUpdate}
          />
        </HStack>
      </Stack>
      <Stack
        py="10px"
        w="full"
        borderTop="1px solid #303030"
        borderBottom="1px solid #303030"
      >
        {!currentPhase ? (
          <Text>No info found!</Text>
        ) : (
          <>
            <FadeIn>
              <Wrap flexWrap={true} w="full" my="15px">
                <WrapItem>
                  <Tag w="full">{currentPhase.title}</Tag>
                </WrapItem>

                {currentPhase && (
                  <Stack
                    px="2px"
                    w="full"
                    direction={["column", "row"]}
                    fontSize={["15px", "18px", "18px"]}
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
                        Total:{" "}
                        <Text as="span" color="#fff">
                          {currentPhase.publicMintingAmount}
                        </Text>
                      </Text>

                      <Text>
                        Minted:{" "}
                        <Text as="span" color="#fff">
                          {currentPhase.claimedAmount}{" "}
                          <Text as="span">
                            token
                            {currentPhase.claimedAmount > 1 ? "s" : ""}
                          </Text>
                        </Text>
                      </Text>

                      <Text>
                        Price:{" "}
                        <Text as="span" color="#fff">
                          {convertStringToPrice(currentPhase.publicMintingFee)}{" "}
                          <AzeroIcon
                            mb="5px"
                            w={["14px", "16px"]}
                            h={["14px", "16px"]}
                          />
                        </Text>
                      </Text>
                    </Stack>

                    <Stack
                      w="full"
                      minW="fit-content"
                      direction={["column", "row"]}
                    >
                      <Text color="brand.blue">
                        Start:{" "}
                        <Text as="span" color="#fff">
                          {convertStringToDateTime(currentPhase.startTime)}
                        </Text>
                      </Text>
                      <Text as="span" display={["none", "flex"]}>
                        -
                      </Text>
                      <Text color="brand.blue">
                        End:{" "}
                        <Text as="span" color="#fff">
                          {convertStringToDateTime(currentPhase.endTime)}
                        </Text>
                      </Text>
                    </Stack>
                  </Stack>
                )}
              </Wrap>
            </FadeIn>
          </>
        )}
      </Stack>
      <Box
        hidden
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
                          <>
                            <FadeIn>
                              <Wrap flexWrap={true} w="full" my="15px">
                                <WrapItem>
                                  <Tag w="full">{currentPhase.title}</Tag>
                                </WrapItem>

                                {currentPhase.publicPhase && (
                                  <Stack
                                    px="2px"
                                    w="full"
                                    direction={["column", "row"]}
                                    fontSize={["15px", "18px", "18px"]}
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
                                        Total:{" "}
                                        <Text as="span" color="#fff">
                                          {currentPhase.publicMintingAmount}
                                        </Text>
                                      </Text>

                                      <Text>
                                        Minted:{" "}
                                        <Text as="span" color="#fff">
                                          {currentPhase.claimedAmount}{" "}
                                          <Text as="span">
                                            token
                                            {currentPhase.claimedAmount > 1
                                              ? "s"
                                              : ""}
                                          </Text>
                                        </Text>
                                      </Text>

                                      <Text>
                                        Price:{" "}
                                        <Text as="span" color="#fff">
                                          {convertStringToPrice(
                                            currentPhase.publicMintingFee
                                          )}{" "}
                                          <AzeroIcon
                                            mb="5px"
                                            w={["14px", "16px"]}
                                            h={["14px", "16px"]}
                                          />
                                        </Text>
                                      </Text>
                                    </Stack>

                                    <Stack
                                      w="full"
                                      minW="fit-content"
                                      direction={["column", "row"]}
                                    >
                                      <Text color="brand.blue">
                                        Start:{" "}
                                        <Text as="span" color="#fff">
                                          {convertStringToDateTime(
                                            currentPhase.startTime
                                          )}
                                        </Text>
                                      </Text>
                                      <Text
                                        as="span"
                                        display={["none", "flex"]}
                                      >
                                        -
                                      </Text>
                                      <Text color="brand.blue">
                                        End:{" "}
                                        <Text as="span" color="#fff">
                                          {convertStringToDateTime(
                                            currentPhase.endTime
                                          )}
                                        </Text>
                                      </Text>
                                    </Stack>
                                  </Stack>
                                )}
                              </Wrap>
                            </FadeIn>
                          </>
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
    </Stack>
  );
}

export default MyMintingProjectPage;
