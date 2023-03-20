import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Stack,
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
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { OWNER_MINT, START } from "@constants";
import { setTxStatus } from "@store/actions/txStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import FadeIn from "react-fade-in";
import { useMemo } from "react";
import { clearTxStatus } from "@store/actions/txStatus";
import { isPhaseEnd } from "@utils";
import { SCROLLBAR } from "@constants";

function MyMintingProjectPage(props) {
  const { projectInfo, selectedProjectAddress } = props;

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [mintAmount, setMintAmount] = useState(1);

  const [ownerMinted, setOwnerMinted] = useState(0);

  const fetchPhasesInfoData = useCallback(
    async () => {
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        selectedProjectAddress
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      const ownerClaimedAmount =
        await launchpad_psp34_nft_standard_calls.getOwnerClaimedAmount(
          currentAccount
        );

      setOwnerMinted(ownerClaimedAmount);
    },
    [api, currentAccount, selectedProjectAddress]
  );

  useEffect(() => {
    let isUnmounted = false;

    fetchPhasesInfoData(isUnmounted);

    return () => (isUnmounted = true);
  }, [fetchPhasesInfoData, selectedProjectAddress]);

  const onOwnerMint = async () => {
    if (!selectedProjectAddress || selectedProjectAddress === "0") {
      toast.error(`Please pick your project!`);
      return;
    }

    // if (!isLastPhaseEnded) {
    //   toast.error(`Project is not ended yet!`);
    //   return;
    // }
    try {
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
        mintAmount,
        dispatch,
        OWNER_MINT,
        api
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate([OWNER_MINT], () => {
    setMintAmount(1);
    // fetchPhasesInfoData();
  });

  const { totalSupply, remainAmount, projStatus } = useMemo(() => {
    const totalSupply = projectInfo?.nft_count || 0;
    const projStatus = projectInfo?.isActive;

    const remainAmount = projectInfo?.whiteList?.reduce(
      (acc, { phaseData }) => {
        const { isActive, totalAmount, claimedAmount, endTime } = phaseData;
        const isEnded = isPhaseEnd(endTime);

        return !isEnded && isActive
          ? acc
          : (acc = acc + totalAmount - claimedAmount);
      },
      0
    );

    return { totalSupply, remainAmount, projStatus };
  }, [projectInfo]);

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

        <HStack textAlign="left">
          <Text py={2}>Project name:</Text>
          <Heading size="h6">{projectInfo?.name}</Heading>
        </HStack>

        <Stack textAlign="left" pb="30px">
          <Text py={2}>Mint Amount</Text>
          <Box>
            <NumberInput
              bg="black"
              min={1}
              mr={3}
              w="full"
              px={0}
              h="3.125rem"
              max={remainAmount}
              value={mintAmount}
              isDisabled={actionType || remainAmount <= 0 || !projStatus}
              onChange={(valueString) => {
                if (/[eE+-]/.test(valueString)) return;

                setMintAmount(valueString);
              }}
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

          {!projStatus ? null : (
            <>
              <>
                {selectedProjectAddress && parseInt(mintAmount) < 1 ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    Mint amount must be greater than or equal to 1.
                  </Text>
                ) : null}
              </>
              <>
                {selectedProjectAddress &&
                remainAmount > 0 &&
                mintAmount > parseInt(remainAmount) ? (
                  <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
                    Mint amount must be less than or equal to{" "}
                    {parseInt(remainAmount)}.
                  </Text>
                ) : null}
              </>
            </>
          )}
        </Stack>
        <HStack spacing="30px" justify="space-between" alignItems="center">
          <CommonButton
            mx="0"
            {...rest}
            w="full"
            variant="outline"
            text="mint"
            onClick={() => onOwnerMint()}
            isDisabled={
              !projStatus ||
              mintAmount > parseInt(remainAmount) ||
              remainAmount <= 0 ||
              loadingForceUpdate
            }
          />
        </HStack>
      </Stack>

      <Stack
        overflowX="scroll"
        sx={SCROLLBAR}
        py="10px"
        w="full"
        borderTop="1px solid #303030"
        borderBottom="1px solid #303030"
      >
        <FadeIn>
          {!selectedProjectAddress ||
            (selectedProjectAddress !== "0" && (
              <HStack color="#888" spacing="0px">
                <Text minW="150px" textAlign="left">
                  Project status:{" "}
                  {projStatus ? (
                    <Text as="span" color="#fff">
                      Active
                    </Text>
                  ) : (
                    <Text as="span" color="#ff8c8c">
                      Inactive
                    </Text>
                  )}
                </Text>

                <Text minW="150px" textAlign="left">
                  Supply:{" "}
                  <Text as="span" color="#fff">
                    {totalSupply}{" "}
                  </Text>
                  NFT
                  {totalSupply > 1 ? "s" : ""}
                </Text>

                <Text minW="150px" textAlign="left">
                  Total Remain:{" "}
                  <Text as="span" color="#fff">
                    {remainAmount}{" "}
                  </Text>
                  NFT
                  {remainAmount > 1 ? "s" : ""}
                </Text>

                <Text minW="150px" textAlign="left">
                  Owner Minted:{" "}
                  <Text as="span" color="#fff">
                    {ownerMinted}{" "}
                  </Text>
                  NFT
                  {ownerMinted > 1 ? "s" : ""}
                </Text>

                <Text minW="150px" textAlign="left">
                  Total available:{" "}
                  <Text as="span" color="#fff">
                    {remainAmount - ownerMinted}{" "}
                  </Text>
                  NFT
                  {remainAmount - ownerMinted > 1 ? "s" : ""}
                </Text>
              </HStack>
            ))}{" "}
        </FadeIn>

        {!projectInfo?.whiteList?.length ? (
          <Text>No info found!</Text>
        ) : (
          <>
            <FadeIn>
              {projectInfo?.whiteList?.map((phase, index) => (
                <HStack justifyContent="space-between" my="15px" w="full">
                  <Text
                    px="4px"
                    minW="100px"
                    w="fit-content"
                    border="1px solid #7ae7ff"
                  >
                    {phase?.phaseData?.isPublic
                      ? "WL & PL Mint"
                      : "WL Mint Only"}
                  </Text>

                  <HStack justifyContent="center" minW="160px">
                    <Tag w="fit-content">{phase?.phaseData?.title}</Tag>
                  </HStack>

                  {phase?.phaseData && (
                    <Stack
                      w="full"
                      color="#888"
                      spacing="0px"
                      direction={["row"]}
                      alignItems="center"
                      alignContent="space-between"
                      minH={{ base: "1rem", "2xl": "3.375rem" }}
                    >
                      <Text minW="120px" textAlign="left">
                        Total:{" "}
                        <Text as="span" color="#fff">
                          {phase?.phaseData?.totalAmount}{" "}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Minted:{" "}
                        <Text as="span" color="#fff">
                          {phase?.phaseData?.claimedAmount}{" "}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Remain:{" "}
                        <Text as="span" color="#fff">
                          {phase?.phaseData?.totalAmount -
                            phase?.phaseData?.claimedAmount}{" "}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Mint Ended:{" "}
                        {isPhaseEnd(phase?.phaseData?.endTime) ? (
                          <Text as="span" color="#fff">
                            Yes
                          </Text>
                        ) : (
                          <Text as="span" color="#ff8c8c">
                            No
                          </Text>
                        )}
                      </Text>
                    </Stack>
                  )}
                </HStack>
              ))}
            </FadeIn>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default MyMintingProjectPage;
