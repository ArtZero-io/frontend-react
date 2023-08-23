import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  Spacer,
  Tag,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Stack,
  VStack,
  useMediaQuery,
  Skeleton,
  Button,
  ListItem,
  UnorderedList,
  Tooltip,
} from "@chakra-ui/react";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { useHistory, useParams } from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";

import { Interweave } from "interweave";
import BN from "bn.js";
import toast from "react-hot-toast";
import CommonButton from "@components/Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import { setTxStatus } from "@store/actions/txStatus";
import {
  WHITELIST_MINT,
  PUBLIC_MINT,
  UPDATE_BASE_URI,
  UPDATE_PHASE,
  ADD_PHASE,
  DELETE_PHASE,
  START,
  UPDATE_ADMIN_ADDRESS,
  EDIT_PROJECT,
} from "@constants";
import { useDispatch } from "react-redux";
import {
  getAccountBalanceOfPsp34NFT,
  getIdOfPsp34NFT,
} from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { usePagination } from "@ajna/pagination";
import PaginationMP from "@components/Pagination/Pagination";
import FadeIn from "react-fade-in";

import { getPublicCurrentAccount, formatNumDynamicDecimal } from "@utils";
import { isValidAddressPolkadotAddress } from "@utils";
import * as ROUTES from "@constants/routes";
import { delay } from "@utils";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import { APICall } from "@api/client";
import { getMetaDataOffChain, strToNumber } from "@utils";
import { clearTxStatus } from "@store/actions/txStatus";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { ImageCloudFlareLaunchpad } from "@components/ImageWrapper/ImageCloudFlare";
import { convertStringToDateTime } from "@utils";

const NUMBER_PER_PAGE = 6;

const LaunchpadDetailPage = () => {
  const { collection_address } = useParams();
  const { api, currentAccount, apiState } = useSubstrateState();
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mintingAmount, setMintingAmount] = useState(1);
  const [whitelistMintingAmount, setWhitelistMintingAmount] = useState(1);

  const history = useHistory();
  const dispatch = useDispatch();

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [
      PUBLIC_MINT,
      WHITELIST_MINT,
      UPDATE_BASE_URI,
      UPDATE_PHASE,
      ADD_PHASE,
      DELETE_PHASE,
      UPDATE_ADMIN_ADDRESS,
      EDIT_PROJECT,
    ],
    () => {
      fetchPublicPhasesInfoData();
      fetchWhitelistData();
      fetchNFTs();
      setWhitelistMintingAmount(1);
      setMintingAmount(1);
    }
  );

  const [projectInfo, setProjectInfo] = useState();

  useEffect(() => {
    let isUnmounted = false;

    const fetchProjectInfoData = async () => {
      try {
        const isValidAddr = isValidAddressPolkadotAddress(collection_address);

        if (!isValidAddr) {
          toast.error("Launchpad address invalid!");

          await delay(500).then(async () => {
            history.push(`${ROUTES.LAUNCHPAD_BASE}`);
          });

          return;
        }

        setLoading(true);

        const { ret } = await APICall.getProjectByAddress({
          nftContractAddress: collection_address,
        });

        if (ret?.length === 0) {
          toast.error("Launchpad address not exist!");

          await delay(500).then(async () => {
            history.push(`${ROUTES.LAUNCHPAD_BASE}`);
          });
          return;
        }

        const data = {
          ...ret[0],
          roadmaps: JSON.parse(ret[0]?.roadmaps),
          teamMembers: JSON.parse(ret[0]?.teamMembers),
        };

        if (isUnmounted) return;
        setProjectInfo(data);
        setLoading(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log(error);
        setLoading(false);
      }
    };

    fetchProjectInfoData();
    return () => (isUnmounted = true);
  }, [api, collection_address, currentAccount, history]);

  const [activePhaseId, setActivePhaseId] = useState(null);

  useEffect(() => {
    if (apiState !== "READY") return;

    let isUnmounted = false;

    const fetchCurrentPhaseIdData = async () => {
      try {
        setLoading(true);
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          collection_address
        );

        launchpad_psp34_nft_standard_calls.setContract(
          launchpad_psp34_nft_standard_contract
        );
        const id = await launchpad_psp34_nft_standard_calls.getCurrentPhase(
          getPublicCurrentAccount()
        );
        
        if (isUnmounted) return;

        setActivePhaseId(id);
        setLoading(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log(error.message);
        setLoading(false);
      }
    };

    fetchCurrentPhaseIdData();
    return () => (isUnmounted = true);
  }, [apiState, api, collection_address]);

  const [phasesInfoWithDisablePhase, setPhasesInfoWithDisablePhase] = useState(
    []
  );
  const [phasesInfo, setPhasesInfo] = useState([]);

  const [loadingPhaseInfo, setLoadingPhaseInfo] = useState(false);

  const fetchPublicPhasesInfoData = useCallback(
    async (isUnmounted) => {
      if (apiState !== "READY") return;

      setLoadingPhaseInfo(true);

      try {
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          collection_address
        );

        launchpad_psp34_nft_standard_calls.setContract(
          launchpad_psp34_nft_standard_contract
        );

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
              publicRemainAmount:
                strToNumber(data.publicMintingAmount) -
                strToNumber(data.publicClaimedAmount),
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

        if (isUnmounted) return;
        setPhasesInfoWithDisablePhase(allPhases);
        setPhasesInfo(allPhases.filter((p) => p.isActive === true));
        setLoadingPhaseInfo(false);
      } catch (error) {
        if (isUnmounted) return;

        setLoadingPhaseInfo(false);
      }
    },
    [api, collection_address, apiState]
  );

  useEffect(() => {
    let isUnmounted = false;

    fetchPublicPhasesInfoData(isUnmounted);

    return () => (isUnmounted = true);
  }, [fetchPublicPhasesInfoData, apiState]);

  const isLastPhaseEnded = useMemo(() => {
    const lastPhase = [...phasesInfo]?.pop();

    const isEnded = lastPhase?.endTime < Date.now();

    return isEnded;
  }, [phasesInfo]);

  const [currentPhase, setCurrentPhase] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [nextPhase, setNextPhase] = useState(null);
  // console.log("nextPhase", nextPhase);
  useEffect(() => {
    if (isLastPhaseEnded) {
      const lastPhase = [...phasesInfo]?.pop();
      return setCurrentPhase(lastPhase);
    }

    if (!activePhaseId) {
      const timeStampOnly = phasesInfo.reduce((prev, curr) => {
        prev.push(curr.startTime);
        prev.push(curr.endTime);
        return prev;
      }, []);

      let phase;

      for (let i = 0; i < timeStampOnly?.length; i++) {
        const p = timeStampOnly[i];
        const now = Date.now();

        if (now > p) {
          continue;
        }
        phase = phasesInfo[Math.floor(i / 2)];

        setNextPhase(phase);
      }

      return setCurrentPhase({});
    } else {
      const found = phasesInfo?.find((p) => p.id === parseInt(activePhaseId));
      setCurrentPhase(found);
    }
  }, [activePhaseId, isLastPhaseEnded, phasesInfo]);

  const [userWLInfo, setUserWLInfo] = useState([]);
  const [loadingUserWLInfo, setLoadingUserWLInfo] = useState(false);

  const fetchWhitelistData = useCallback(
    async (isUnmounted) => {
      setLoadingUserWLInfo(true);
      try {
        const allPhasesAddWL = await Promise.all(
          phasesInfoWithDisablePhase?.map(async (item) => {
            const data =
              await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
                currentAccount,
                item.id,
                currentAccount?.address
              );

            let userWhitelist = null;
            if (data) {
              userWhitelist = {
                ...data,
                whitelistAmount: strToNumber(data?.whitelistAmount),
                claimedAmount: strToNumber(data?.claimedAmount),
                remainAmount: strToNumber(
                  data?.whitelistAmount - data?.claimedAmount
                ),
                mintingFee: strToNumber(data?.mintingFee),
              };
            }

            return userWhitelist;
          })
        );

        if (isUnmounted) return;
        setUserWLInfo(allPhasesAddWL);
        setLoadingUserWLInfo(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log(error.message);
        setLoadingUserWLInfo(false);
      }
    },
    [currentAccount, phasesInfoWithDisablePhase]
  );

  const [userPLClaimedInfo, setUserPLClaimedInfo] = useState([]);

  const fetchUserPLClaimedData = useCallback(
    async (isUnmounted) => {
      // setLoadingUserWLInfo(true);

      try {
        const allPhasesAddWL = await Promise.all(
          phasesInfo?.map(async (item) => {
            let ret = null;

            const userPublicClaimedAmount =
              await launchpad_psp34_nft_standard_calls.getPhaseAccountPublicClaimedAmount(
                currentAccount,
                collection_address,
                item.id,
                api
              );

            if (userPublicClaimedAmount) {
              ret = strToNumber(userPublicClaimedAmount);
            }

            return ret;
          })
        );

        if (isUnmounted) return;

        setUserPLClaimedInfo(allPhasesAddWL);
        // setLoadingUserWLInfo(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log(error.message);
        setLoadingUserWLInfo(false);
      }
    },
    [api, collection_address, currentAccount, phasesInfo]
  );

  useEffect(() => {
    let isUnmounted = false;

    if (currentAccount) {
      fetchWhitelistData(isUnmounted);
      fetchUserPLClaimedData(isUnmounted);
    }

    return () => (isUnmounted = true);
  }, [
    activePhaseId,
    currentAccount,
    fetchUserPLClaimedData,
    fetchWhitelistData,
    phasesInfo,
  ]);

  const onWhiteListMint = async () => {
    if (!projectInfo?.isActive) {
      return toast.error("Project is not active yet!");
    }

    const { data } = await api.query.system.account(currentAccount.address);
    const balance =
      new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6 -
      new BN(data.miscFrozen).div(new BN(10 ** 6)).toNumber() / 10 ** 6;
    const mintingFee =
      (whitelistMintingAmount * userWLInfo[activePhaseId - 1]?.mintingFee) /
      10 ** 12;

    if (balance < 0.25) {
      toast.error("Low balance to mint");
      return;
    }

    if (balance < mintingFee + 0.01) {
      toast.error("Not enough balance to mint");
      return;
    }

    try {
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      dispatch(setTxStatus({ type: WHITELIST_MINT, step: START }));

      await launchpad_psp34_nft_standard_calls.whitelistMint(
        currentAccount,
        activePhaseId,
        whitelistMintingAmount,
        mintingFee,
        dispatch,
        WHITELIST_MINT,
        api,
        collection_address
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const onPublicMint = async () => {
    if (!projectInfo?.isActive) {
      return toast.error("Project is not active yet!");
    }

    const { data } = await api.query.system.account(currentAccount.address);
    const balance =
      new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6 -
      new BN(data.miscFrozen).div(new BN(10 ** 6)).toNumber() / 10 ** 6;

    const mintingFee =
      (mintingAmount * currentPhase?.publicMintingFee) / 10 ** 12;

    if (balance < 0.5) {
      toast.error("Low balance to mint");
      return;
    }

    if (balance < mintingFee + 0.01) {
      toast.error("Not enough balance to mint");
      return;
    }

    try {
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      dispatch(setTxStatus({ type: PUBLIC_MINT, step: START }));

      await launchpad_psp34_nft_standard_calls.publicMint(
        currentAccount,
        currentPhase.id,
        mintingFee,
        mintingAmount,
        dispatch,
        PUBLIC_MINT,
        api,
        collection_address
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const [balanceOfPsp34NFT, setBalanceOfPsp34NFT] = useState(0);

  const { pagesCount, currentPage, setCurrentPage, isDisabled, pageSize } =
    usePagination({
      total: balanceOfPsp34NFT,
      initialState: {
        currentPage: 1,
        isDisabled: false,
        pageSize: NUMBER_PER_PAGE,
      },
    });

  const [loadingUserNft, setLoadingUserNft] = useState(false);

  const fetchNFTs = useCallback(
    async (isUnmounted) => {
      setLoadingUserNft(true);
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      let ret = [];

      const totalNFTCount = await getAccountBalanceOfPsp34NFT({
        currentAccount,
      });

      if (isUnmounted) return;
      setBalanceOfPsp34NFT(totalNFTCount || 0);

      if (!totalNFTCount) {
        setLoadingUserNft(false);
        setMyNFTs([]);
        return ret;
      }

      try {
        if (isUnmounted) return;

        let tokenUri = await launchpad_psp34_nft_standard_calls.tokenUri(
          currentAccount,
          1
        );

        const baseUri = tokenUri?.replace("1.json", "");

        ret = await Promise.all(
          [...Array(totalNFTCount)].map(async (_, index) => {
            let idOfNFT = await getIdOfPsp34NFT({
              currentAccount,
              tokenID: index,
            });

            try {
              if (idOfNFT?.includes(",")) {
                idOfNFT = idOfNFT?.replaceAll(",", "");
              }
            } catch (error) {
              console.log("error", error);
            }

            const metaData = await getMetaDataOffChain(idOfNFT, baseUri);

            if (metaData?.status === "FAILED") {
              console.log(projectInfo?.nftName, "not cache baseUri", baseUri);
              return {
                nftName: `${projectInfo?.nftName} #${idOfNFT}`,
                avatar: "Qmc1az4MVBL9MhfLLv3b1Hf9RCs9AoqXR2AZuUZb2XBhpJ",
              };
            }

            return { ...metaData };
          })
        );

        setMyNFTs(ret);
        setLoadingUserNft(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log("error", error);

        ret = await Promise.all(
          [...Array(totalNFTCount)].map(async (_, index) => {
            const idOfNFT = await getIdOfPsp34NFT({
              currentAccount,
              tokenID: index,
            });
            console.log(projectInfo?.nftName, "has no baseUri");
            return {
              nftName: `${projectInfo?.nftName} #${idOfNFT}`,
              avatar: "Qmc1az4MVBL9MhfLLv3b1Hf9RCs9AoqXR2AZuUZb2XBhpJ",
            };
          })
        );

        setMyNFTs(ret);
        setLoadingUserNft(false);
      }
    },
    [api, collection_address, currentAccount, projectInfo?.nftName]
  );

  useEffect(() => {
    if (apiState !== "READY") return;

    let isUnmounted = false;

    fetchNFTs(isUnmounted);

    return () => (isUnmounted = true);
  }, [fetchNFTs, apiState]);

  const pageNFT = useMemo(
    () => myNFTs.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, myNFTs, pageSize]
  );

  return (
    <Layout backdrop={projectInfo?.headerImage} variant="launchpad-detail">
      {isValidAddressPolkadotAddress(collection_address) && (
        <LaunchpadDetailHeader
          loading={loading}
          loadingPhaseInfo={loadingPhaseInfo}
          loadingUserWLInfo={loadingUserWLInfo || loadingForceUpdate}
          project={projectInfo}
          phasesInfo={phasesInfo}
          userWLInfo={userWLInfo}
          currentPhase={currentPhase}
          activePhaseId={activePhaseId}
          isLastPhaseEnded={isLastPhaseEnded}
          collection_address={collection_address}
        />
      )}

      <VStack w="full" px={["8px", "0px"]} spacing={["24px", "30px"]}>
        {isLastPhaseEnded ? (
          <Box
            w="full"
            mx="auto"
            bg="#222"
            maxW="870px"
            px={["15px", "30px"]}
            py={["17px", "26px"]}
          >
            <Heading fontSize={["16px", "18px"]}>Mint ended</Heading>
          </Box>
        ) : activePhaseId ? (
          <Box
            w="full"
            mx="auto"
            bg="#222"
            maxW="870px"
            px={["15px", "30px"]}
            py={["17px", "26px"]}
          >
            {activePhaseId && (
              <Skeleton display="flex" isLoaded={!loading} w="full" mb="15px">
                <Heading fontSize={["16px", "18px"]}>
                  {!activePhaseId ? (
                    `upcoming`
                  ) : (
                    <>
                      <Text as="span" color="#7ae7ff">
                        {currentPhase?.title}
                      </Text>{" "}
                      in progress
                    </>
                  )}
                </Heading>

                <Spacer />

                {activePhaseId && (
                  <Tooltip
                    hasArrow
                    bg="#333"
                    color="#fff"
                    borderRadius="0"
                    label="Mint progress of this phase"
                  >
                    <span>
                      <Skeleton isLoaded={!loadingForceUpdate}>
                        <Text as="span" color="#888" fontSize={["sm", "md"]}>
                          {(
                            (currentPhase?.claimedAmount * 100) /
                              currentPhase?.totalAmount || 0
                          ).toFixed(2)}
                          % ({currentPhase?.claimedAmount}/
                          {currentPhase?.totalAmount})
                        </Text>
                      </Skeleton>
                    </span>
                  </Tooltip>
                )}
              </Skeleton>
            )}

            {activePhaseId && (
              <Progress
                value={Math.round(
                  (currentPhase?.claimedAmount * 100) /
                    currentPhase?.totalAmount
                )}
                mb="20px"
                h="8px"
              />
            )}

            {activePhaseId && (
              <Skeleton isLoaded={userWLInfo} h="50px">
                {!currentAccount ? (
                  <Flex w="full" justifyContent="center">
                    <Text fontSize="lg" color="#888">
                      Please connect your wallet to mint !
                    </Text>
                  </Flex>
                ) : null}
                {/* //Public phases*/}
                {currentAccount &&
                  activePhaseId &&
                  currentPhase?.isPublic &&
                  (!userWLInfo[currentPhase?.id - 1] ||
                    userWLInfo[currentPhase?.id - 1]?.remainAmount <= 0) && (
                    <HStack
                      w="full"
                      justifyContent="start"
                      alignItems="center"
                      spacing="20px"
                    >
                      {currentPhase?.publicMintingAmount ? (
                        <>
                          <NumberInput
                            bg="black"
                            min={1}
                            w="150px"
                            mr={[0, 3]}
                            h="3.125rem"
                            // mb={["10px", 0]}
                            isDisabled={
                              actionType ||
                              currentPhase?.publicClaimedAmount >=
                                currentPhase?.publicMintingAmount
                            }
                            value={mintingAmount}
                            max={Math.min(
                              currentPhase?.publicRemainAmount,
                              currentPhase?.publicMaxMintingAmount
                            )}
                            onChange={(valueString) =>
                              setMintingAmount(valueString)
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
                          <CommonButton
                            w={["full", "auto"]}
                            {...rest}
                            variant="outline"
                            text="public mint"
                            onClick={onPublicMint}
                            isDisabled={
                              loading ||
                              loadingForceUpdate ||
                              currentPhase?.publicClaimedAmount >=
                                currentPhase?.publicMintingAmount ||
                              mintingAmount >
                                currentPhase?.publicMaxMintingAmount
                            }
                          />

                          {currentPhase?.publicClaimedAmount <
                            currentPhase?.publicMintingAmount &&
                          mintingAmount >
                            Math.min(
                              currentPhase?.publicRemainAmount,
                              currentPhase?.publicMaxMintingAmount
                            ) ? (
                            <Text
                              textAlign="left"
                              color="#ff8c8c"
                              ml={1}
                              fontSize="sm"
                            >
                              You can only mint maximum{" "}
                              {Math.min(
                                currentPhase?.publicRemainAmount,
                                currentPhase?.publicMaxMintingAmount
                              )}{" "}
                              NFT
                              {Math.min(
                                currentPhase?.publicRemainAmount,
                                currentPhase?.publicMaxMintingAmount
                              ) > 1
                                ? "s"
                                : ""}
                              .
                            </Text>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <Text fontSize="lg" color="#888">
                          You are not in public mint list!
                        </Text>
                      )}
                    </HStack>
                  )}
                {/* //WhiteList phases*/}
                {currentAccount &&
                  activePhaseId &&
                  userWLInfo[currentPhase?.id - 1] &&
                  userWLInfo[currentPhase?.id - 1]?.remainAmount > 0 && (
                    <HStack
                      w="full"
                      justifyContent="start"
                      alignItems="center"
                      spacing="20px"
                    >
                      {userWLInfo[currentPhase?.id - 1]?.whitelistAmount ? (
                        <>
                          <NumberInput
                            bg="black"
                            min={1}
                            w="150px"
                            mr={[0, 3]}
                            h="3.125rem"
                            // mb={["10px", 0]}
                            isDisabled={
                              actionType ||
                              userWLInfo[currentPhase?.id - 1]?.remainAmount <=
                                0
                            }
                            value={whitelistMintingAmount}
                            max={userWLInfo[currentPhase?.id - 1]?.remainAmount}
                            onChange={(valueString) =>
                              setWhitelistMintingAmount(valueString)
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

                          <CommonButton
                            w={["full", "auto"]}
                            mx="0"
                            {...rest}
                            isDisabled={
                              loading ||
                              loadingForceUpdate ||
                              userWLInfo[currentPhase?.id - 1]?.remainAmount <=
                                0 ||
                              whitelistMintingAmount >
                                userWLInfo[currentPhase?.id - 1]?.remainAmount
                            }
                            variant="outline"
                            text="whitelist mint"
                            onClick={onWhiteListMint}
                          />

                          {whitelistMintingAmount >
                          userWLInfo[currentPhase?.id - 1]?.remainAmount ? (
                            <Text
                              textAlign="left"
                              color="#ff8c8c"
                              ml={1}
                              fontSize="sm"
                            >
                              You can only mint maximum{" "}
                              {userWLInfo[currentPhase?.id - 1]?.remainAmount}{" "}
                              NFT
                              {userWLInfo[currentPhase?.id - 1]?.remainAmount >
                              1
                                ? "s"
                                : ""}
                              .
                            </Text>
                          ) : null}
                        </>
                      ) : (
                        <Text fontSize="lg" color="#888">
                          You are not in whitelist mint list!
                        </Text>
                      )}
                    </HStack>
                  )}
              </Skeleton>
            )}
          </Box>
        ) : (
          ""
        )}

        {/* New phase section */}
        <Box
          w="full"
          mx="auto"
          bg="#222"
          maxW="870px"
          px={["15px", "30px"]}
          py={["17px", "26px"]}
        >
          <Flex w="full" mb={["20px", "30px"]}>
            <Heading fontSize={["24px", "32px"]}>phases</Heading>
            <Spacer />
          </Flex>

          {phasesInfo?.length
            ? phasesInfo.map((item, index) => (
                <Fragment key={index}>
                  <FadeIn>
                    <Stack w="full" my="15px" fontSize={["15px", "18px"]}>
                      <HStack>
                        <Text border="1px solid #7ae7ff" px="4px">
                          {item.isPublic ? "WL & Public Mint" : "WL Mint Only"}
                        </Text>
                        <Tag minW="min-content">{item?.title}</Tag>
                      </HStack>

                      <Stack
                        fontSize={["15px", "18px"]}
                        w="full"
                        minW="fit-content"
                        direction={["column", "row"]}
                      >
                        <Text color="brand.blue">
                          Start:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToDateTime(item?.startTime)}
                          </Text>
                        </Text>

                        <Text as="span" display={["none", "flex"]}>
                          -
                        </Text>

                        <Text color="brand.blue">
                          End:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToDateTime(item?.endTime)}
                          </Text>
                        </Text>
                      </Stack>

                      <HStack pb="20px" color="#888" spacing="20px">
                        <Text>
                          Total whitelist amount:{" "}
                          <Text as="span" color="#fff">
                            {item?.whitelistAmount} NFT
                            {item?.whitelistAmount > 1 ? "s" : ""}
                          </Text>
                        </Text>

                        <Text>
                          Total public mint amount:{" "}
                          <Text as="span" color="#fff">
                            {item?.publicMintingAmount} NFT
                            {item?.publicMintingAmount > 1 ? "s" : ""}
                          </Text>
                        </Text>

                        <Text>
                          Public mint price:{" "}
                          <Text as="span" color="#fff">
                            {formatNumDynamicDecimal(
                              item?.publicMintingFee / 10 ** 12
                            )}{" "}
                            <AzeroIcon
                              mb="5px"
                              w={["14px", "16px"]}
                              h={["14px", "16px"]}
                            />
                          </Text>
                        </Text>
                      </HStack>

                      <Text>Your info:</Text>
                      <Stack color="#888">
                        {/* Whitelist Mint */}
                        <UnorderedList pl="20px">
                          {!currentAccount && (
                            <ListItem>
                              <Text>Connect to check your whitelist</Text>
                            </ListItem>
                          )}
                          {/* Not in whitelist */}
                          {currentAccount && !userWLInfo[index] && (
                            <ListItem>
                              <Text>You are not in the whitelist!</Text>
                            </ListItem>
                          )}

                          {/* Have whitelist */}
                          {currentAccount && userWLInfo[index] && (
                            <ListItem>
                              <Text>
                                You are whitelisted to mint{" "}
                                <Text as="span" color="#fff">
                                  {userWLInfo[index]?.whitelistAmount} NFT
                                  {userWLInfo[index]?.whitelistAmount > 1
                                    ? "s"
                                    : ""}
                                </Text>{" "}
                                at price:{" "}
                                <Text as="span" color="#fff">
                                  {userWLInfo[index]?.mintingFee / 10 ** 12}{" "}
                                  <AzeroIcon
                                    mb="5px"
                                    w={["14px", "16px"]}
                                    h={["14px", "16px"]}
                                  />
                                </Text>
                                {userWLInfo[index]?.claimedAmount > 0 && (
                                  <>
                                    . You have minted from whitelist{" "}
                                    <Skeleton
                                      isLoaded={!loadingForceUpdate}
                                      as="span"
                                    >
                                      <Text as="span" color="#fff">
                                        {userWLInfo[index]?.claimedAmount} NFT
                                        {userWLInfo[index]?.claimedAmount > 1
                                          ? "s"
                                          : ""}
                                      </Text>
                                    </Skeleton>
                                  </>
                                )}
                              </Text>
                            </ListItem>
                          )}
                          {/* Public Mint */}
                          <ListItem>
                            <Text>
                              You have minted from Public Mint:{" "}
                              <Text as="span" color="#fff">
                                {userPLClaimedInfo[index] || 0} NFT
                                {userPLClaimedInfo[index] > 1 ? "s" : ""}
                              </Text>{" "}
                              {!!userPLClaimedInfo[index] &&
                                `(scroll down to view your NFTs)`}
                            </Text>
                          </ListItem>
                        </UnorderedList>
                      </Stack>
                    </Stack>
                    <Divider mt={["20px", "30px"]} />
                  </FadeIn>
                </Fragment>
              ))
            : ""}
        </Box>
        <Box
          w="full"
          maxW="870px"
          mx="auto"
          bg="#222"
          px={["15px", "30px"]}
          py={["17px", "26px"]}
        >
          <Flex w="full" mb="30px">
            <Heading fontSize={["24px", "32px"]}>roadmap</Heading>
            <Spacer />
          </Flex>

          {projectInfo?.roadmaps?.length
            ? projectInfo?.roadmaps?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Flex key={index} w="full" my="20px">
                      <Heading fontSize={["md", "lg"]}>
                        <Text as="span" color="#7ae7ff">
                          {item.type}
                        </Text>
                      </Heading>
                      <Spacer />
                    </Flex>

                    <Box
                      fontSize={["md", "lg"]}
                      color="#888"
                      px="20px"
                      mb="30px"
                    >
                      <Interweave content={item.content} />
                    </Box>

                    <Divider />
                  </Fragment>
                );
              })
            : ""}
        </Box>
        <Box
          w="full"
          maxW="870px"
          mx="auto"
          bg="#222"
          px={["15px", "30px"]}
          py={["17px", "26px"]}
        >
          <Flex w="full" mb="30px">
            <Heading fontSize={["24px", "32px"]}>Team</Heading>
            <Spacer />
          </Flex>

          {isBigScreen ? (
            <Grid
              templateColumns={`repeat(auto-fill, minmax(min(100%, 250px), 1fr))`}
              gap="30px"
            >
              {projectInfo?.teamMembers?.length
                ? projectInfo?.teamMembers?.map((item, idx) => (
                    <Fragment key={idx}>
                      <GridItem>
                        <TeamCard team_member={item} />
                      </GridItem>
                    </Fragment>
                  ))
                : ""}
            </Grid>
          ) : (
            <>
              {projectInfo?.teamMembers?.map((item, idx) => (
                <HStack
                  key={idx}
                  py="15px"
                  alignItems="center"
                  borderBottom="1px solid #303030"
                >
                  <HStack justifyContent="center">
                    <ImageCloudFlare
                      mr={["12px", "32px"]}
                      size="100"
                      w="70px"
                      h="70px"
                      src={item["avatar"]}
                    />

                    <Stack maxH="70px" spacing="2px">
                      <Heading fontSize={["md"]}>{item.name}</Heading>
                      <Text color="#888" fontSize={["sm"]}>
                        {item.title}
                      </Text>
                      <Button
                        px="0"
                        mx="0"
                        variant=""
                        h="30px"
                        w="60px"
                        fontSize="14px"
                        fontFamily="Oswald"
                        isDisabled={!item?.socialLink}
                        _focus={{ borderColor: "transparent" }}
                        color="brand.blue"
                        textTransform="capitalize"
                        onClick={() => {
                          window.location.href = `${item?.socialLink}`;
                        }}
                      >
                        Social link
                      </Button>
                    </Stack>
                  </HStack>
                </HStack>
              ))}
            </>
          )}
        </Box>
        <Box
          w="full"
          maxW="870px"
          mx="auto"
          bg="#222"
          px={["15px", "30px"]}
          py={["17px", "26px"]}
        >
          <Flex w="full" mb="30px">
            <Heading fontSize={["24px", "32px"]}>My NFTs</Heading>
            <Spacer />
          </Flex>

          {loadingUserNft ? (
            <AnimationLoader loadingTime={1} />
          ) : myNFTs?.length === 0 ? (
            <Text fontSize="lg" color="#888">
              No NFT found
            </Text>
          ) : (
            <>
              <Text fontSize="lg" color="#888">
                You minted {myNFTs?.length} NFTs. (Excluding listed & staked
                NFTs)
              </Text>

              <HStack
                py="15px"
                px="30px"
                alignItems="center"
                borderBottom="1px solid #303030"
                justifyContent={["space-between", "start"]}
              >
                <Heading
                  w="50%"
                  color="#888"
                  fontSize="15px"
                  minW={["100px", "240px"]}
                >
                  NFT Name
                </Heading>
                <Heading color="#888" fontSize="15px">
                  NFT Image
                </Heading>
              </HStack>

              {pageNFT.map((item, idx) => (
                <HStack
                  key={idx}
                  py="15px"
                  px="30px"
                  alignItems="center"
                  borderBottom="1px solid #303030"
                  justifyContent={["space-between", "start"]}
                >
                  <Heading
                    w="50%"
                    fontSize={["md", "lg"]}
                    minW={["100px", "240px"]}
                  >
                    {item.nftName}
                  </Heading>

                  <ImageCloudFlareLaunchpad
                    mr={["12px", "32px"]}
                    size="500"
                    w="128px"
                    h="128px"
                    src={item["avatar"]}
                  />
                </HStack>
              ))}

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
          )}
        </Box>
      </VStack>
    </Layout>
  );
};

export default LaunchpadDetailPage;
