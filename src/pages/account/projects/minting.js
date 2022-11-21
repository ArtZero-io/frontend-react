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
} from '@chakra-ui/react';
import { useSubstrateState } from '@utils/substrate';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ContractPromise } from '@polkadot/api-contract';
import launchpad_psp34_nft_standard from '@utils/blockchain/launchpad-psp34-nft-standard';
import launchpad_psp34_nft_standard_calls from '@utils/blockchain/launchpad-psp34-nft-standard-calls';
import { Select } from '@chakra-ui/react';
import launchpad_contract_calls from '@utils/blockchain/launchpad-contract-calls';
import {
  getPublicCurrentAccount,
  strToNumber,
  isValidAddressPolkadotAddress,
} from '@utils';
import useTxStatus from '@hooks/useTxStatus';
import CommonButton from '@components/Button/CommonButton';
import { OWNER_MINT, START } from '@constants';
import { setTxStatus } from '@store/actions/txStatus';
import useForceUpdate from '@hooks/useForceUpdate';
import FadeIn from 'react-fade-in';
import { APICall } from '@api/client';
import { useMemo } from 'react';
import { clearTxStatus } from '@store/actions/txStatus';
import { isPhaseEnd } from '@utils';
import { SCROLLBAR } from '@constants';

function MyMintingProjectPage() {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [myProjectsList, setMyProjectsList] = useState([]);
  const [selectedProjectAddress, setSelectedProjectAddress] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);

  const fetchMyProjectList = useCallback(async () => {
    let projectAddrList = await launchpad_contract_calls.getProjectsByOwner(
      currentAccount,
      currentAccount?.address
    );

    const { ret: projList1 } = await APICall.getAllProjects({
      isActive: false,
    });

    const { ret: projList2 } = await APICall.getAllProjects({
      isActive: true,
    });

    const projList = projList1.concat(projList2);

    const ret = projectAddrList?.map((item) => {
      const proj = projList.find((proj) => proj.nftContractAddress === item);

      return proj;
    });

    setMyProjectsList(ret);
  }, [currentAccount]);

  useEffect(() => {
    fetchMyProjectList();
  }, [fetchMyProjectList]);

  const [phasesInfo, setPhasesInfo] = useState([]);
  const [ownerMinted, setOwnerMinted] = useState(0);

  const fetchPhasesInfoData = useCallback(
    async (isUnmount) => {
      if (!isValidAddressPolkadotAddress(selectedProjectAddress)) {
        setPhasesInfo([]);

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

      const ownerClaimedAmount =
        await launchpad_psp34_nft_standard_calls.getOwnerClaimedAmount(
          currentAccount
        );

      setOwnerMinted(ownerClaimedAmount);

      const totalPhase =
        await launchpad_psp34_nft_standard_calls.getLastPhaseId(
          getPublicCurrentAccount()
        );

      const allPhases = await Promise.all(
        [...new Array(totalPhase)].map(async (_, index) => {
          const totalCountWLAddress =
            await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
              getPublicCurrentAccount(),
              index + 1
            );

          const data =
            await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
              getPublicCurrentAccount(),
              index + 1
            );

          const formattedData = {
            ...data,
            id: index + 1,

            publicClaimedAmount: strToNumber(data.publicClaimedAmount),
            publicRemainAmount: strToNumber(
              data.publicMintingAmount - data.publicClaimedAmount
            ),
            publicMintingFee: strToNumber(data.publicMintingFee),
            publicMintingAmount: strToNumber(data.publicMintingAmount),
            publicMaxMintingAmount: strToNumber(data.publicMaxMintingAmount),

            totalCountWLAddress: strToNumber(totalCountWLAddress),
            whitelistAmount: strToNumber(data.whitelistAmount),

            claimedAmount: strToNumber(data.claimedAmount),
            totalAmount: strToNumber(data.totalAmount),

            startTime: strToNumber(data.startTime),
            endTime: strToNumber(data.endTime),
          };

          return formattedData;
        })
      );

      setPhasesInfo(allPhases);
    },
    [api, currentAccount, selectedProjectAddress]
  );

  useEffect(() => {
    let isUnmounted = false;

    fetchPhasesInfoData(isUnmounted);

    return () => (isUnmounted = true);
  }, [fetchPhasesInfoData]);

  const onOwnerMint = async () => {
    if (!selectedProjectAddress || selectedProjectAddress === '0') {
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

  const onChangeProjAddr = async (address) => {
    setSelectedProjectAddress(address);
  };

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const { loading: loadingForceUpdate } = useForceUpdate([OWNER_MINT], () => {
    setMintAmount(1);
    fetchPhasesInfoData();
  });

  const { totalSupply, remainAmount, projStatus } = useMemo(() => {
    const selectedProj = myProjectsList.find(
      (item) => item.nftContractAddress === selectedProjectAddress
    );

    const totalSupply = selectedProj?.nft_count || 0;
    const projStatus = selectedProj?.isActive;

    const remainAmount = phasesInfo?.reduce((acc, item) => {
      const { isActive, totalAmount, claimedAmount, endTime } = item;
      const isEnded = isPhaseEnd(endTime);

      return !isEnded && isActive
        ? acc
        : (acc = acc + totalAmount - claimedAmount);
    }, 0);

    return { totalSupply, remainAmount, projStatus };
  }, [myProjectsList, phasesInfo, selectedProjectAddress]);

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
              onChange={({ target }) => onChangeProjAddr(target.value)}
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
                : ''}
            </Select>
          </Box>
        </Stack>

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
              onChange={(valueString) => setMintAmount(valueString)}
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
                    Mint amount must be less than or equal to{' '}
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
            isDisabled={!projStatus || remainAmount <= 0 || loadingForceUpdate}
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
            (selectedProjectAddress !== '0' && (
              <HStack color="#888" spacing="0px">
                <Text minW="150px" textAlign="left">
                  Project status:{' '}
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
                  Supply:{' '}
                  <Text as="span" color="#fff">
                    {totalSupply}{' '}
                  </Text>
                  NFT
                  {totalSupply > 1 ? 's' : ''}
                </Text>

                <Text minW="150px" textAlign="left">
                  Total Remain:{' '}
                  <Text as="span" color="#fff">
                    {remainAmount}{' '}
                  </Text>
                  NFT
                  {remainAmount > 1 ? 's' : ''}
                </Text>

                <Text minW="150px" textAlign="left">
                  Owner Minted:{' '}
                  <Text as="span" color="#fff">
                    {ownerMinted}{' '}
                  </Text>
                  NFT
                  {ownerMinted > 1 ? 's' : ''}
                </Text>

                <Text minW="150px" textAlign="left">
                  Total available:{' '}
                  <Text as="span" color="#fff">
                    {remainAmount - ownerMinted}{' '}
                  </Text>
                  NFT
                  {remainAmount - ownerMinted > 1 ? 's' : ''}
                </Text>
              </HStack>
            ))}{' '}
        </FadeIn>

        {!phasesInfo?.length ? (
          <Text>No info found!</Text>
        ) : (
          <>
            <FadeIn>
              {phasesInfo.map((phase, index) => (
                <HStack justifyContent="space-between" my="15px" w="full">
                  <Text
                    px="4px"
                    minW="100px"
                    w="fit-content"
                    border="1px solid #7ae7ff"
                  >
                    {phase?.isPublic ? 'WL & PL Mint' : 'WL Mint Only'}
                  </Text>

                  <HStack justifyContent="center" minW="160px">
                    <Tag w="fit-content">{phase?.title}</Tag>
                  </HStack>

                  {phase && (
                    <Stack
                      w="full"
                      color="#888"
                      spacing="0px"
                      direction={['row']}
                      alignItems="center"
                      alignContent="space-between"
                      minH={{ base: '1rem', '2xl': '3.375rem' }}
                    >
                      <Text minW="120px" textAlign="left">
                        Total:{' '}
                        <Text as="span" color="#fff">
                          {phase.totalAmount}{' '}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Minted:{' '}
                        <Text as="span" color="#fff">
                          {phase.claimedAmount}{' '}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Remain:{' '}
                        <Text as="span" color="#fff">
                          {phase.totalAmount - phase.claimedAmount}{' '}
                        </Text>
                      </Text>

                      <Text minW="120px" textAlign="left">
                        Mint Ended:{' '}
                        {isPhaseEnd(phase?.endTime) ? (
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
