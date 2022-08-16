import {
  Box,
  Button,
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
  WrapItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { clientAPI } from "@api/client";
import MyLaunchPadNFTCard from "./components/MyNFTCard";
import { useParams } from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import {
  timestampWithoutCommas,
  convertNumberWithoutCommas,
  convertStringToPrice,
} from "@utils";
import { Interweave } from "interweave";
import AnimationLoader from "@components/Loader/AnimationLoader";
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

const LaunchpadDetailPage = () => {
  const [formattedCollection, setFormattedCollection] = useState({});
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
  
  const dispatch = useDispatch();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  // eslint-disable-next-line no-unused-vars
  const [publicMintingPhaseId, setPublicMintingPhaseId] = useState(0);

  const [currentPhase, setCurrentPhase] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    () => fetchData()
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchStart = Date.now();

      console.log("projectDetail fetchStart", fetchStart);
      const project = await launchpad_contract_calls.getProjectByNftAddress(
        currentAccount,
        collection_address
      );
      console.log("LaunchpadDetailPage::project", project);

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
            currentAccount
          );
        const projectInfo =
          await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(
            projectInfoHash
          );

        const totalSupply =
          await launchpad_psp34_nft_standard_calls.getTotalSupply(
            currentAccount
          );
        const totalPhase =
          await launchpad_psp34_nft_standard_calls.getLastPhaseId(
            currentAccount
          );
        let phasesTmp = [];
        const currentPhaseIdTmp =
          await launchpad_psp34_nft_standard_calls.getCurrentPhase(
            currentAccount
          );
        // console.log("zzz currentPhaseIdTmp", currentPhaseIdTmp);
        const fetchEndBeforeLoopNo1 = Date.now();
        console.log(
          "projectDetail fetchEndBeforeLoopNo1 ",
          fetchEndBeforeLoopNo1
        );

        for (let i = 1; i <= totalPhase; i++) {
          const whiteListData =
            await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
              currentAccount,
              i,
              currentAccount.address
            );

          // console.log("zzz whiteListData i", i, whiteListData);
          const phaseSchedule =
            await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
              currentAccount,
              i
            );
          // console.log("zzz phaseSchedule i", i, phaseSchedule);

          const phaseCode = phaseSchedule.title;
          const totalWhiteListPhase =
            await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
              currentAccount,
              i
            );
          let maxMinting = 0;
          if (
            Number(
              convertNumberWithoutCommas(phaseSchedule.publicMintingAmount)
            ) > 0 &&
            phaseSchedule.publicMaxMintingAmount
          ) {
            let remainAmount =
              Number(
                convertNumberWithoutCommas(phaseSchedule.publicMintingAmount)
              ) -
              Number(convertNumberWithoutCommas(phaseSchedule.claimedAmount));
            if (
              Number(
                convertNumberWithoutCommas(phaseSchedule.publicMaxMintingAmount)
              ) > remainAmount
            ) {
              maxMinting = remainAmount;
            } else {
              maxMinting = Number(
                convertNumberWithoutCommas(phaseSchedule.publicMaxMintingAmount)
              );
            }
          }
          // console.log("phaseSchedule::148", phaseSchedule);
          const phaseInfo = {
            id: i,
            code: phaseCode,
            startTime: timestampWithoutCommas(phaseSchedule.startTime),
            endTime: timestampWithoutCommas(phaseSchedule.endTime),
            isLive: i == currentPhaseIdTmp ? 1 : 0,
            totalWhiteList: totalWhiteListPhase ? Number(convertNumberWithoutCommas(totalWhiteListPhase)) : 0,
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
          // console.log("phasesTmp", phasesTmp);

          if (i == currentPhaseIdTmp) {
            console.log("LaunchpadDetailPage::phaseSchedule", phaseSchedule);
            if (phaseSchedule.isPublic == true) {
              setTotalPhaseAmount(Number(convertNumberWithoutCommas(phaseSchedule.publicMintingAmount)));
            } else {
              setTotalPhaseAmount(Number(convertNumberWithoutCommas(phaseSchedule.whitelistAmount)));
            }
            
            setTotalClaimedAmount(Number(convertNumberWithoutCommas(phaseSchedule.claimedAmount)));
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
        // console.log(projectAdminAddress);
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

        setFormattedCollection(projectDetail);
        setPhases(phasesTmp);

        let totalTokenSupply =
          await launchpad_psp34_nft_standard_calls.getLastTokenId(
            currentAccount
          );
        // console.log("totalTokenSupply", totalTokenSupply);
        if (totalTokenSupply > 0) {
          let myNFTsTmp = [];

          try {
            let tokenUriFull =
              await launchpad_psp34_nft_standard_calls.tokenUri(
                currentAccount,
                1
              );
            tokenUriFull = tokenUriFull.replace("1.json", "");
            // console.log("xxx tokenUriFull", tokenUriFull);

            // const fetchEndBeforeLoopNo2 = Date.now();
            // console.log(
            //   "projectDetail fetchEndBeforeLoopNo2 ",
            //   fetchEndBeforeLoopNo2
            // );
            // console.log(
            //   "projectDetail diff",
            //   fetchEndBeforeLoopNo2 - fetchStart
            // );

            for (let tokenID = 1; tokenID <= totalTokenSupply; tokenID++) {
              let owner = await launchpad_psp34_nft_standard_calls.ownerOf(
                currentAccount,
                { u64: tokenID }
              );
              // console.log("tokenUriFull", tokenUriFull);
              if (owner == currentAccount.address) {
                let metaData = await getMetaDataType1(tokenID, tokenUriFull);
                // console.log("xxx metaData", metaData);
                myNFTsTmp.push(metaData);
              }
            }

            // console.log("xxx myNFTsTmp", myNFTsTmp);
            // const fetchEndAfterLoopNo2 = Date.now();
            // console.log(
            //   "projectDetail fetchEndAfterLoopNo2 ",
            //   fetchEndAfterLoopNo2
            // );
            // console.log(
            //   "projectDetail diff",
            //   fetchEndAfterLoopNo2 - fetchStart
            // );
            setMyNFTs(myNFTsTmp);
            console.log("myNFTsTmp", myNFTsTmp);
            console.log("LaunchpadDetailPage After Set My NFTS");
          } catch (error) {
            // case: error: no uri found for token id 1
            const unrevealedData = {};

            console.log(" LaunchpadDetailPage errorerror", error);
            console.log(
              " LaunchpadDetailPage totalTokenSupply ",
              totalTokenSupply
            );

            for (let tokenID = 1; tokenID <= totalTokenSupply; tokenID++) {
              let owner = await launchpad_psp34_nft_standard_calls.ownerOf(
                currentAccount,
                { u64: tokenID }
              );
              console.log("LaunchpadDetailPage owner", owner);
              if (owner === currentAccount.address) {
                myNFTsTmp.push({ tokenID });
                console.log("LaunchpadDetailPage myNFTsTmp", myNFTsTmp);
              }
            }
            console.log("xxx unrevealedData", unrevealedData);
            console.log("xxx myNFTsTmp", myNFTsTmp);
            myNFTsTmp = myNFTsTmp.map(({ tokenID }) => {
              return {
                nftName: `${formattedCollection.nft_name} #${tokenID}`,
                avatar: "QmZH9BjYVCQ9RjRC2TP3jUZGAYfoHkkrararPQfpe5hY57",
              };
            });

            setMyNFTs(myNFTsTmp);
            console.log("myNFTsTmp", myNFTsTmp);
            console.log("After Set My NFTS");
          }
        }
      }

      setLoading(false);

      const fetchEnd = Date.now();
      console.log("projectDetail fetchEnd ", fetchEnd);
      console.log("projectDetail diff", fetchEnd - fetchStart);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }, [api, collection_address, currentAccount, formattedCollection.nft_name]);

  useEffect(() => {
    fetchData();
  }, [api, collection_address, currentAccount, fetchData]);

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

  const onWhiteListMint = async () => {
    // TODOs: add check balance

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
      1,
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

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="launchpad-detail"
    >
      <LaunchpadDetailHeader
        loading={loading || loadingForceUpdate}
        collection_address={collection_address}
        project={formattedCollection}
        currentWhitelist={currentWhitelist}
      />
      {loading || loadingForceUpdate ? (
        <AnimationLoader loadingTime={loadingTime || 3.5} />
      ) : (
        <>
          <Box
            w="full"
            maxW="870px"
            mx="auto"
            bg="#222"
            px="30px"
            py="26px"
            my="30px"
          >
            <Flex w="full" mb="15px">
              <Heading size="h6">
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
              <Spacer />
              
              {totalPhaseAmount > 0 ? (<Text color="#888">
                {Math.round(totalClaimedAmount * 100/ totalPhaseAmount)}% (
                {totalClaimedAmount}/{totalPhaseAmount})
              </Text>) : ""}
              

             
            </Flex>
            {totalPhaseAmount > 0 ? (
              <Progress
                value={Math.round(totalClaimedAmount * 100 / totalPhaseAmount)}
                mb="20px"
                h="8px"
              />
            ) : (
              ""
            )}
            {!currentAccount ? (
              <Flex w="full" justifyContent="center">
                <Button variant="outline">connect your wallet</Button>
              </Flex>
            ) : (
              ""
            )}
            {console.log("currentPhase", currentPhase)}
            {currentAccount &&
              !currentPhase.publicPhase &&
              currentWhitelist.whitelistAmount && (
                <Flex w="full" justifyContent="center">
                  {/* <Button onClick={() => onWhiteListMint()} variant="outline">
                    mint
                  </Button> */}

                  <CommonButton
                    {...rest}
                    isDisabled={
                      currentWhitelist?.whitelistAmount -
                        currentWhitelist?.claimedAmount ===
                      0
                    }
                    variant="outline"
                    text="whitelist mint"
                    onClick={onWhiteListMint}
                  />
                </Flex>
              )}

            {console.log("zzz currentPhase", currentPhase)}
            {console.log(
              "zzz currentPhase.publicPhase",
              currentPhase.publicPhase
            )}
            {currentAccount &&
              currentPhase.publicPhase &&
              currentPhase.claimedAmount <=
                currentPhase.publicMintingAmount && (
                <Flex w="full" justifyContent="center">
                  {console.log(currentPhase)}
                  <NumberInput
                    bg="black"
                    min={1}
                    w="150px"
                    mr={[0, 3]}
                    h="3.125rem"
                    mb={["10px", 0]}
                    isDisabled={
                      actionType ||
                      currentPhase?.claimedAmount >=
                        currentPhase?.publicMintingAmount
                    }
                    value={mintingAmount}
                    max={currentPhase.publicMaxMintingAmount}
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
                    {...rest}
                    variant="outline"
                    text="public mint"
                    onClick={onPublicMint}
                    isDisabled={
                      currentPhase?.claimedAmount >=
                      currentPhase?.publicMintingAmount
                    }
                  />
                </Flex>
              )}
          </Box>

          <Box
            w="full"
            maxW="870px"
            mx="auto"
            bg="#222"
            px="30px"
            py="26px"
            mb="30px"
          >
            <Flex w="full" mb="15px">
              <Heading fontSize={["2xl", "3xl", "3xl"]}>Phases</Heading>
              <Spacer />
            </Flex>
            {console.log("phases", phases)}
            {phases && phases.length
              ? phases.map((item, index) => (
                  <>
                    <Wrap key={index} flexWrap={true} w="full" my="15px">
                      <WrapItem>
                        <Tag w="full">{item.code}</Tag>
                      </WrapItem>
                      {item.publicPhase && (
                        <>
                          <Flex
                            color="#888"
                            w="full"
                            minW="500px"
                            alignContent="center"
                            fontSize={["15px", "18px", "18px"]}
                            minH={{ base: "1rem", "2xl": "3.375rem" }}
                          >
                            <Text mr="30px">
                              Total:{" "}
                              <Text as="span" color="#fff">
                                {console.log("total public amount:", item)}
                                {item.publicMintingAmount}
                              </Text>
                            </Text>
                            <Text mr="30px">
                              Minted:{" "}
                              <Text as="span" color="#fff">
                                {item.claimedAmount}
                              </Text>
                            </Text>
                            <Text>
                              Price:{" "}
                              <Text as="span" color="#fff">
                                {convertStringToPrice(item.publicMintingFee)}{" "}
                                <AzeroIcon mb="5px" />
                              </Text>
                            </Text>
                          </Flex>
                        </>
                      )}

                      {item.publicPhase == 0 && (
                        <>
                          <Flex
                            color="#888"
                            w="full"
                            minW="500px"
                            alignContent="center"
                            fontSize={["15px", "18px", "18px"]}
                            minH={{ base: "1rem", "2xl": "3.375rem" }}
                          >
                            <Text mr="30px">
                              Whitelist:{" "}
                              <Text as="span" color="#fff">
                                {item.totalWhiteList}
                              </Text>
                            </Text>
                            {item.whitelist && item.whitelist.whitelistAmount && (
                              <Text mr="30px">
                                Max:{" "}
                                <Text as="span" color="#fff">
                                  {Number(item.whitelist.whitelistAmount) -
                                    Number(item.whitelist.claimedAmount)}{" "}
                                  Tokens
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
                                  <AzeroIcon mb="5px" />
                                </Text>
                              </Text>
                            )}
                          </Flex>
                        </>
                      )}
                    </Wrap>
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
            px="30px"
            py="26px"
            mb="30px"
          >
            <Flex w="full" mb="30px">
              <Heading fontSize={["2xl", "3xl", "3xl"]}>roadmap</Heading>
              <Spacer />
            </Flex>
            {formattedCollection.roadmaps && formattedCollection.roadmaps.length
              ? formattedCollection.roadmaps.map((item, index) => (
                  <>
                    <Flex w="full" my="20px">
                      <Heading fontSize="lg">
                        <Text as="span" color="#7ae7ff">
                          {item.type}
                        </Text>
                      </Heading>
                      <Spacer />
                    </Flex>

                    <Box fontSize="lg" color="#888" px="20px" mb="30px">
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
            px="30px"
            py="26px"
            mb="30px"
          >
            <Flex w="full" mb="30px">
              <Heading fontSize={["2xl", "3xl", "3xl"]}>Team</Heading>
              <Spacer />
            </Flex>
            <Grid
              templateColumns={`repeat(auto-fill, minmax(min(100%, 250px), 1fr))`}
              gap="30px"
            >
              {formattedCollection.team_members &&
              formattedCollection.team_members.length
                ? formattedCollection.team_members.map((item) => (
                    <GridItem>
                      <TeamCard team_member={item} />
                    </GridItem>
                  ))
                : ""}
            </Grid>
          </Box>

          <Box
            w="full"
            maxW="870px"
            mx="auto"
            bg="#222"
            px="30px"
            py="26px"
            mb="30px"
          >
            <Flex w="full" mb="30px">
              <Heading size="h4">My NFTs</Heading>
              <Spacer />
            </Flex>
            <Grid
              templateColumns={`repeat(auto-fill, minmax(min(100%, 250px), 1fr))`}
              gap="30px"
            >
              {myNFTs?.length === 0 ? (
                <Text fontSize="lg" color="#888">
                  No NFT found
                </Text>
              ) : (
                myNFTs.map((item, idx) => (
                  <GridItem>
                    <MyLaunchPadNFTCard key={idx} {...item} />
                  </GridItem>
                ))
              )}
            </Grid>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default LaunchpadDetailPage;
