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
  Wrap,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Square,
  HStack,
  Image,
  Stack,
  VStack,
  useMediaQuery,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { clientAPI } from "@api/client";
import { useParams } from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import { getCachedImageShort } from "@utils";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import {
  timestampWithoutCommas,
  convertNumberWithoutCommas,
  convertStringToPrice,
} from "@utils";
import { Interweave } from "interweave";
// import AnimationLoader from "@components/Loader/AnimationLoader";
import BN from "bn.js";
import toast from "react-hot-toast";
// import ModalLoader from "@components/Loader/ModalLoader";
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
} from "@constants";
import { useDispatch } from "react-redux";
import {
  getAccountBalanceOfPsp34NFT,
  getIdOfPsp34NFT,
} from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { usePagination } from "@ajna/pagination";
import PaginationMP from "@components/Pagination/Pagination";
import FadeIn from "react-fade-in";
import { isPhaseEnd } from "../component/Form/UpdatePhase";
import { getPublicCurrentAccount } from "@utils";

const NUMBER_PER_PAGE = 6;

const LaunchpadDetailPage = () => {
  const [formattedProject, setFormattedProject] = useState({});
  const { collection_address } = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [phases, setPhases] = useState([]);
  const [totalPhaseAmount, setTotalPhaseAmount] = useState(0);
  const [totalClaimedAmount, setTotalClaimedAmount] = useState(0);
  const [currentPhaseId, setCurrentPhaseId] = useState(0);
  const [currentWhitelist, setCurrentWhitelist] = useState({});
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mintingAmount, setMintingAmount] = useState(1);
  const [whitelistMintingAmount, setWhitelistMintingAmount] = useState(1);

  const dispatch = useDispatch();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const [currentPhase, setCurrentPhase] = useState({});

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
    ],
    () => {
      fetchData();
      fetchNFTs();
    }
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // const fetchStart = Date.now();

      // console.log("projectDetail fetchStart", fetchStart);
      const project = await launchpad_contract_calls.getProjectByNftAddress(
        currentAccount || getPublicCurrentAccount(),
        collection_address
      );

      // if (project && project.isActive) {
      if (project) {
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          collection_address
        );

        launchpad_psp34_nft_standard_calls.setContract(
          launchpad_psp34_nft_standard_contract
        );

        const projectInfoHash =
          await launchpad_psp34_nft_standard_calls.getProjectInfo(
            currentAccount || getPublicCurrentAccount()
          );

        const projectInfo =
          await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(
            projectInfoHash
          );

        const totalSupply =
          await launchpad_psp34_nft_standard_calls.getTotalSupply(
            currentAccount || getPublicCurrentAccount()
          );

        const totalPhase =
          await launchpad_psp34_nft_standard_calls.getLastPhaseId(
            currentAccount || getPublicCurrentAccount()
          );

        let phasesTmp = [];
        const currentPhaseIdTmp =
          await launchpad_psp34_nft_standard_calls.getCurrentPhase(
            currentAccount || getPublicCurrentAccount()
          );

        // console.log("zzz currentPhaseIdTmp", currentPhaseIdTmp);
        // const fetchEndBeforeLoopNo1 = Date.now();
        // console.log(
        //   "projectDetail fetchEndBeforeLoopNo1 ",
        //   fetchEndBeforeLoopNo1
        // );
        if (currentAccount?.address) {
          for (let i = 1; i <= totalPhase; i++) {
            const whiteListData =
              await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
                currentAccount,
                i,
                currentAccount?.address
              );

            // console.log("zzz whiteListData i", i, whiteListData);
            const phaseSchedule =
              await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
                currentAccount,
                i
              );
            // console.log("zzz phaseSchedule i", i, phaseSchedule);

            const phaseCode = phaseSchedule?.title;
            const totalWhiteListPhase =
              await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
                currentAccount,
                i
              );
            let maxMinting = 0;
            if (
              Number(
                convertNumberWithoutCommas(phaseSchedule?.publicMintingAmount)
              ) > 0 &&
              phaseSchedule?.publicMaxMintingAmount
            ) {
              let remainAmount =
                Number(
                  convertNumberWithoutCommas(phaseSchedule?.publicMintingAmount)
                ) -
                Number(
                  convertNumberWithoutCommas(phaseSchedule?.claimedAmount)
                );
              if (
                Number(
                  convertNumberWithoutCommas(
                    phaseSchedule?.publicMaxMintingAmount
                  )
                ) > remainAmount
              ) {
                maxMinting = remainAmount;
              } else {
                maxMinting = Number(
                  convertNumberWithoutCommas(
                    phaseSchedule?.publicMaxMintingAmount
                  )
                );
              }
            }
            // console.log("phaseSchedule::148", phaseSchedule);
            const phaseInfo = {
              id: i,
              code: phaseCode,
              startTime: timestampWithoutCommas(phaseSchedule.startTime),
              endTime: timestampWithoutCommas(phaseSchedule.endTime),
              isLive: i === 1 * currentPhaseIdTmp ? 1 : 0,
              totalWhiteList: totalWhiteListPhase
                ? Number(convertNumberWithoutCommas(totalWhiteListPhase))
                : 0,
              publicPhase: phaseSchedule.isPublic,
              whitelist: whiteListData,
              publicMintingAmount: Number(
                convertNumberWithoutCommas(phaseSchedule.publicMintingAmount)
              ),
              publicMaxMintingAmount: maxMinting,
              publicMintingFee: phaseSchedule.publicMintingFee,
              claimedAmount: Number(
                convertNumberWithoutCommas(phaseSchedule.claimedAmount)
              ),
            };

            phasesTmp.push(phaseInfo);

            if (i === 1 * currentPhaseIdTmp) {
              // console.log("LaunchpadDetailPage::phaseSchedule", phaseSchedule);
              if (phaseSchedule.isPublic === true) {
                setTotalPhaseAmount(
                  Number(
                    convertNumberWithoutCommas(
                      phaseSchedule.publicMintingAmount
                    )
                  )
                );
              } else {
                setTotalPhaseAmount(
                  Number(
                    convertNumberWithoutCommas(phaseSchedule.whitelistAmount)
                  )
                );
              }

              setTotalClaimedAmount(
                Number(convertNumberWithoutCommas(phaseSchedule.claimedAmount))
              );
              setCurrentPhaseId(currentPhaseIdTmp);
              setCurrentPhase(phaseInfo);
              const currentWhitelistTmp =
                await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
                  currentAccount,
                  i,
                  currentAccount?.address
                );
              // console.log(
              //   "LaunchpadDetailPage::currentWhitelistTmp",
              //   currentWhitelistTmp
              // );
              if (currentWhitelistTmp) {
                setCurrentWhitelist(currentWhitelistTmp);
              }
            }
          }
        }

        // const fetchEndAfterLoopNo1 = Date.now();
        // console.log(
        //   "projectDetail fetchEndAfterLoopNo1 ",
        //   fetchEndAfterLoopNo1
        // );
        // console.log("projectDetail diff", fetchEndAfterLoopNo1 - fetchStart);
        const projectAdminAddress =
          await launchpad_psp34_nft_standard_calls.getAdminAddress(
            currentAccount
          );

        const projectDetail = {
          name: projectInfo.name,
          description: projectInfo.description,
          avatarImage: projectInfo.avatar,
          headerImage: projectInfo.header,
          totalSupply: totalSupply,
          roadmaps: projectInfo.roadmaps,
          team_members: projectInfo.team_members,
          phases: phasesTmp,
          projectAdminAddress: projectAdminAddress,
          ...project,
          ...projectInfo,
        };

        console.log("LaunchpadDetailPage projectDetail", projectDetail);
        console.log(
          "LaunchpadDetailPage projectDetail.startTime",
          new Date(parseInt(projectDetail.startTime.replaceAll(",", "")))
        );
        console.log(
          "LaunchpadDetailPage projectDetail.endTime",
          new Date(parseInt(projectDetail.endTime.replaceAll(",", "")))
        );
        setFormattedProject(projectDetail);
        setPhases(phasesTmp);
      }

      setLoading(false);

      // const fetchEnd = Date.now();
      // console.log("projectDetail fetchEnd ", fetchEnd);
      // console.log("projectDetail diff", fetchEnd - fetchStart);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }, [api, collection_address, currentAccount]);

  useEffect(() => {
    fetchData();
  }, [api, collection_address, currentAccount, fetchData]);

  const onWhiteListMint = async () => {
    const { data } = await api.query.system.account(currentAccount.address);
    const balance = new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6;

    if (balance < 0.5) {
      toast.error("Low balance to mint");
      return;
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    const mintingFee = currentWhitelist.mintingFee.replace(/,/g, "");

    dispatch(setTxStatus({ type: WHITELIST_MINT, step: START }));

    await launchpad_psp34_nft_standard_calls.whitelistMint(
      currentAccount,
      currentPhaseId,
      whitelistMintingAmount,
      mintingFee,
      dispatch,
      WHITELIST_MINT,
      api
    );
  };

  const onPublicMint = async () => {
    const { data } = await api.query.system.account(currentAccount.address);
    const balance = new BN(data.free).div(new BN(10 ** 6)).toNumber() / 10 ** 6;
    const mintingFee =
      mintingAmount * convertStringToPrice(currentPhase.publicMintingFee);

    if (balance < mintingFee + 0.01) {
      toast.error("Not enough balance to mint");
      return;
    }
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
      api
    );
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

  const fetchNFTs = useCallback(async () => {
    let ret = [];

    const totalNFTCount = await getAccountBalanceOfPsp34NFT({
      currentAccount,
    });

    setBalanceOfPsp34NFT(totalNFTCount || 0);

    if (!totalNFTCount) return ret;

    try {
      let tokenUri = await launchpad_psp34_nft_standard_calls.tokenUri(
        currentAccount,
        1
      );
      const baseUri = tokenUri.replace("1.json", "");

      // if (isUnmount) return;

      ret = await Promise.all(
        [...Array(totalNFTCount)].map(async (_, index) => {
          const idOfNFT = await getIdOfPsp34NFT({
            currentAccount,
            tokenID: index,
          });

          const metaData = await getMetaDataType1(idOfNFT, baseUri);

          return { ...metaData };
        })
      );

      setMyNFTs(ret);
    } catch (error) {
      // if (isUnmount) return;

      console.log("error", error);

      ret = await Promise.all(
        [...Array(totalNFTCount)].map(async (_, index) => {
          const idOfNFT = await getIdOfPsp34NFT({
            currentAccount,
            tokenID: index,
          });

          return {
            nftName: `${formattedProject.nft_name} #${idOfNFT}`,
            avatar: "Qmc1az4MVBL9MhfLLv3b1Hf9RCs9AoqXR2AZuUZb2XBhpJ",
          };
        })
      );

      // console.log("Promise ret error", ret);
      setMyNFTs(ret);
    }
  }, [currentAccount, formattedProject.nft_name]);

  useEffect(() => {
    // let isUnmount = false;

    fetchNFTs();
    // return () => (isUnmount = true);
  }, [fetchNFTs]);

  const pageNFT = useMemo(
    () => myNFTs.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [currentPage, myNFTs, pageSize]
  );

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <Layout backdrop={formattedProject?.headerImage} variant="launchpad-detail">
      <LaunchpadDetailHeader
        loading={loading || loadingForceUpdate}
        collection_address={collection_address}
        project={formattedProject}
        currentWhitelist={currentWhitelist}
      />
      {/* {loading && loadingForceUpdate ? (
        <AnimationLoader loadingTime={loadingTime || 3.5} />
      ) : ( */}
      <VStack w="full" px={["24px", "0px"]} spacing={["24px", "30px"]}>
        {isPhaseEnd(formattedProject?.endTime) ? (
          <Box
            w="full"
            mx="auto"
            bg="#222"
            maxW="870px"
            px={["15px", "30px"]}
            py={["17px", "26px"]}
          >
            <Heading fontSize={["16px", "18px"]}>project ended</Heading>
          </Box>
        ) : (
          <Box
            w="full"
            mx="auto"
            bg="#222"
            maxW="870px"
            px={["15px", "30px"]}
            py={["17px", "26px"]}
          >
            <Skeleton display="flex" isLoaded={!loading} w="full" mb="15px">
              {/* {console.log("loading", loading)} */}
              <Skeleton isLoaded={!loading}>
                <Heading fontSize={["16px", "18px"]}>
                  {!currentPhase?.code ? (
                    `upcoming`
                  ) : (
                    <>
                      <Text as="span" color="#7ae7ff">
                        {currentPhase?.code}
                      </Text>{" "}
                      in progress
                    </>
                  )}
                </Heading>
              </Skeleton>

              <Spacer />

              {totalPhaseAmount > 0 ? (
                <Text color="#888" fontSize={["sm", "md"]}>
                  {Math.round((totalClaimedAmount * 100) / totalPhaseAmount)}% (
                  {totalClaimedAmount}/{totalPhaseAmount})
                </Text>
              ) : (
                ""
              )}
            </Skeleton>
            {totalPhaseAmount > 0 ? (
              <Progress
                value={Math.round(
                  (totalClaimedAmount * 100) / totalPhaseAmount
                )}
                mb="20px"
                h="8px"
              />
            ) : (
              ""
            )}

            {/* //BUTTON */}
            {/* No wallet connect */}
            {!currentAccount ? (
              <Flex w="full" justifyContent="center">
                <Text fontSize="lg" color="#888">
                  Connect your wallet to mint
                </Text>
              </Flex>
            ) : null}

            {/* //Public phases*/}
            {currentAccount && currentPhase?.publicPhase && !currentPhase?.whitelist?.whitelistAmount && (
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
                        currentPhase?.claimedAmount >=
                          currentPhase?.publicMintingAmount
                      }
                      value={mintingAmount}
                      max={currentPhase?.publicMaxMintingAmount}
                      onChange={(valueString) => setMintingAmount(valueString)}
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
                        currentPhase?.claimedAmount >=
                          currentPhase?.publicMintingAmount
                      }
                    />
                  </>
                ) : (
                  <Text fontSize="lg" color="#888">
                    You are not in public mint list!
                  </Text>
                )}
              </HStack>
            )}

            {/* //WhiteList phases*/}
            {currentAccount && currentPhase?.whitelist?.whitelistAmount && (
              <HStack
                w="full"
                justifyContent="start"
                alignItems="center"
                spacing="20px"
              >
                {currentPhase?.whitelist?.whitelistAmount ? (
                  <>
                    {" "}
                    <NumberInput
                      bg="black"
                      min={1}
                      w="150px"
                      mr={[0, 3]}
                      h="3.125rem"
                      // mb={["10px", 0]}
                      isDisabled={
                        actionType ||
                        currentPhase?.whitelist?.claimedAmount >=
                          currentPhase?.whitelist?.whitelistAmount
                      }
                      value={whitelistMintingAmount}
                      max={
                        currentPhase?.whitelist?.whitelistAmount -
                        currentPhase?.whitelist?.claimedAmount
                      }
                      onChange={(valueString) =>
                        setWhitelistMintingAmount(valueString)
                      }
                    >
                      {console.log("currentPhase", currentPhase)}
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
                        currentWhitelist?.whitelistAmount -
                          currentWhitelist?.claimedAmount ===
                          0
                      }
                      variant="outline"
                      text="whitelist mint"
                      onClick={onWhiteListMint}
                    />
                  </>
                ) : (
                  <Text fontSize="lg" color="#888">
                    You are not in whitelist mint list!
                  </Text>
                )}
              </HStack>
            )}

            {/* {console.log("currentPhase", currentPhase)} */}
          </Box>
        )}

        {!currentAccount ? (
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
            <Flex w="full" justifyContent="center">
              <Text fontSize="lg" color="#888">
                Please connect your wallet!
              </Text>
            </Flex>
          </Box>
        ) : (
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
            {/* {console.log("phases", phases)} */}
            {phases?.length
              ? phases.map((item, index) => (
                  <FadeIn key={index}>
                    <Wrap flexWrap={true} w="full" my="15px">
                      <HStack>
                        <Text border="1px solid #7ae7ff" px="4px">
                          {item.publicPhase ? "public" : "whitelist"}
                        </Text>
                        <Tag w="full">{item.code}</Tag>
                      </HStack>

                      {item.publicPhase && (
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
                                {item.publicMintingAmount}
                              </Text>
                            </Text>

                            <Text>
                              Minted:{" "}
                              <Text as="span" color="#fff">
                                {item.claimedAmount}{" "}
                                <Text as="span">
                                  token{item.claimedAmount > 1 ? "s" : ""}
                                </Text>
                              </Text>
                            </Text>

                            <Text>
                              Price:{" "}
                              <Text as="span" color="#fff">
                                {convertStringToPrice(item.publicMintingFee)}{" "}
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
                                {new Date(
                                  Number(item?.startTime)
                                ).toLocaleString()}{" "}
                              </Text>
                            </Text>
                            <Text as="span" display={["none", "flex"]}>
                              -
                            </Text>
                            <Text color="brand.blue">
                              End:{" "}
                              <Text as="span" color="#fff">
                                {new Date(
                                  Number(item?.endTime)
                                ).toLocaleString()}{" "}
                              </Text>
                            </Text>
                          </Stack>
                        </Stack>
                      )}

                      {item.whitelist && (
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
                              Whitelist:{" "}
                              <Text as="span" color="#fff">
                                {item.totalWhiteList}
                              </Text>
                            </Text>
                            {item.whitelist && item.whitelist.whitelistAmount && (
                              <Text>
                                Max:{" "}
                                <Text as="span" color="#fff">
                                  {Number(item.whitelist.whitelistAmount) -
                                    Number(item.whitelist.claimedAmount)}{" "}
                                  tokens
                                </Text>
                              </Text>
                            )}
                            {item.whitelist && item.whitelist.mintingFee && (
                              <Text>
                                Price:{" "}
                                <Text as="span" color="#fff">
                                  {convertStringToPrice(
                                    item.whitelist.mintingFee
                                  )}{" "}
                                  <AzeroIcon
                                    mb="5px"
                                    w={["14px", "16px"]}
                                    h={["14px", "16px"]}
                                  />
                                </Text>
                              </Text>
                            )}
                          </Stack>

                          <Stack
                            w="full"
                            minW="fit-content"
                            direction={["column", "row"]}
                          >
                            <Text color="brand.blue">
                              Start:{" "}
                              <Text as="span" color="#fff">
                                {new Date(
                                  Number(item?.startTime)
                                ).toLocaleString()}{" "}
                              </Text>
                            </Text>

                            <Text as="span" display={["none", "flex"]}>
                              -
                            </Text>

                            <Text color="brand.blue">
                              End:{" "}
                              <Text as="span" color="#fff">
                                {new Date(
                                  Number(item?.endTime)
                                ).toLocaleString()}{" "}
                              </Text>
                            </Text>
                          </Stack>
                        </Stack>
                      )}
                    </Wrap>
                    <Divider mt={["20px", "30px"]} />
                  </FadeIn>
                ))
              : ""}
          </Box>
        )}

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
          {formattedProject.roadmaps && formattedProject.roadmaps.length
            ? formattedProject.roadmaps.map((item, index) => (
                <>
                  <Flex w="full" my="20px">
                    <Heading fontSize={["md", "lg"]}>
                      <Text as="span" color="#7ae7ff">
                        {item.type}
                      </Text>
                    </Heading>
                    <Spacer />
                  </Flex>

                  <Box fontSize={["md", "lg"]} color="#888" px="20px" mb="30px">
                    <Interweave content={item.content} />
                  </Box>

                  <Divider />
                </>
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
            <Heading fontSize={["24px", "32px"]}>Team</Heading>
            <Spacer />
          </Flex>

          {isBigScreen ? (
            <Grid
              templateColumns={`repeat(auto-fill, minmax(min(100%, 250px), 1fr))`}
              gap="30px"
            >
              {formattedProject.team_members &&
              formattedProject.team_members.length
                ? formattedProject.team_members.map((item) => (
                    <GridItem>
                      <TeamCard team_member={item} />
                    </GridItem>
                  ))
                : ""}
            </Grid>
          ) : (
            <>
              {formattedProject?.team_members?.map((item, idx) => (
                <HStack
                  py="15px"
                  alignItems="center"
                  borderBottom="1px solid #303030"
                >
                  <HStack justifyContent="center">
                    <Square mr={["12px", "32px"]} size="70px">
                      <Image
                        width="full"
                        height="full"
                        src={getCachedImageShort(item["avatar"])}
                      />
                    </Square>

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

          {myNFTs?.length === 0 ? (
            <Text fontSize="lg" color="#888">
              No NFT found
            </Text>
          ) : (
            <>
              <HStack
                py="15px"
                alignItems="center"
                borderBottom="1px solid #303030"
              >
                <Text
                  color="#888"
                  fontSize={["md", "lg"]}
                  minW={["60px", "160px"]}
                >
                  #
                </Text>
                <HStack justifyContent="center">
                  <Heading color="#888" fontSize="15px">
                    NFT Name
                  </Heading>
                </HStack>
              </HStack>
              {pageNFT.map((item, idx) => (
                <HStack
                  py="15px"
                  alignItems="center"
                  borderBottom="1px solid #303030"
                >
                  <Text fontSize={["md", "lg"]} minW={["60px", "160px"]}>
                    # {(currentPage - 1) * pageSize + idx + 1}
                  </Text>
                  <HStack justifyContent="center">
                    <Square mr={["12px", "32px"]} size="50px">
                      <Image
                        width="full"
                        height="full"
                        src={getCachedImageShort(item["avatar"])}
                      />
                    </Square>
                    <Heading fontSize={["md", "lg"]}>{item.nftName}</Heading>
                  </HStack>
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
      {/* )} */}
    </Layout>
  );
};

export default LaunchpadDetailPage;

// const isPhaseEnd = (endTime) => {
//   console.log("endTime", endTime);
//   endTime = parseInt(endTime.replaceAll(",", ""));
//   const now = new Date();

//   if (endTime >= now) return true;

//   return false;
// };

const getMetaDataType1 = async (tokenID, token_uri) => {
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
};
