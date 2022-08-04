/* eslint-disable no-unused-vars */
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
  Link,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { clientAPI } from "@api/client";
import MyLaunchPadNFTCard from "./components/MyNFTCard";
import {
  Link as ReactRouterLink,
  useHistory,
  useParams,
} from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { IPFS_BASE_URL } from "@constants/index";
import { timestampWithoutCommas, convertStringToPrice } from "@utils";
import * as ROUTES from "@constants/routes";
import { getCachedImageShort } from "@utils/index";
import { Interweave } from "interweave";

const LaunchpadDetailPage = () => {
  const [formattedCollection, setFormattedCollection] = useState({});
  const { collection_address } = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [phases, setPhases] = useState([]);
  const [totalWhitelistAmount, setTotalWhitelistAmount] = useState(0);
  const [totalClaimedAmount, setTotalClaimedAmount] = useState(0);
  const [currentPhaseId, setCurrentPhaseId] = useState(0);
  const [currentWhitelist, setCurrentWhitelist] = useState({});
  const [myNFTs, setMyNFTs] = useState([]);
  const history = useHistory();
  const [publicMintedCount, setPublicMintedCount] = useState(0);
  const [publicMintingPhaseId, setPublicMintingPhaseId] = useState(0);
  const [currentPhase, setCurrentPhase] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const project = await launchpad_contract_calls.getProjectByNftAddress(
        currentAccount,
        collection_address
      );
      console.log("LaunchpadDetailPage::project", project);

      if (project && project.isActive) {
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

        let publicMintedCountTmp =
          await launchpad_psp34_nft_standard_calls.getPublicMintedCount(
            currentAccount
          );
        setPublicMintedCount(publicMintedCountTmp);

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
      

        for (let i = 1; i <= totalPhase; i++) {
          const whiteListData =
            await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
              currentAccount,
              i,
              currentAccount.address
            );
          const phaseSchedule =
            await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
              currentAccount,
              i
            );
          console.log('phaseSchedule', phaseSchedule);
          const phaseCode = phaseSchedule.title;
          const totalWhiteListPhase =
            await launchpad_psp34_nft_standard_calls.getPhaseAccountLastIndex(
              currentAccount,
              i
            );
          const phaseInfo = {
            id: i,
            code: phaseCode,
            startTime: timestampWithoutCommas(phaseSchedule.startTime),
            endTime: timestampWithoutCommas(phaseSchedule.endTime),
            isLive: i == currentPhaseIdTmp ? 1 : 0,
            totalWhiteList: totalWhiteListPhase ? totalWhiteListPhase : 0,
            publicPhase: phaseSchedule.isPublic,
            whitelist: whiteListData,
            publicMintingAmout: phaseSchedule.publicMintingAmout,
            publicMintingFee: phaseSchedule.publicMintingFee
          };

          phasesTmp.push(phaseInfo);

          if (i == currentPhaseIdTmp) {
            console.log("LaunchpadDetailPage::phaseSchedule", phaseSchedule);
            setTotalWhitelistAmount(parseInt(phaseSchedule.whitelistAmount));
            setTotalClaimedAmount(parseInt(phaseSchedule.claimedAmount));
            setCurrentPhaseId(currentPhaseIdTmp);
            setCurrentPhase(phaseInfo);
            const currentWhitelistTmp =
              await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(
                currentAccount,
                i,
                currentAccount?.address
              );
            console.log(
              "LaunchpadDetailPage::currentWhitelistTmp",
              currentWhitelistTmp
            );
            if (currentWhitelistTmp) {
              setCurrentWhitelist(currentWhitelistTmp);
            }
          }
        }
        const projectDetail = {
          name: projectInfo.name,
          description: projectInfo.description,
          avatarImage: projectInfo.avatar,
          headerImage: projectInfo.header,
          totalSupply: totalSupply,
          roadmaps: projectInfo.roadmaps,
          team_members: projectInfo.team_members,
          phases: phasesTmp,
          ...project,
          ...projectInfo,
        };

        setFormattedCollection(projectDetail);
        setPhases(phasesTmp);

        let totalTokenSupply =
          await launchpad_psp34_nft_standard_calls.getLastTokenId(
            currentAccount
          );
        console.log("totalTokenSupply", totalTokenSupply);
        if (totalTokenSupply > 0) {
          let myNFTsTmp = [];
          let tokenUriFull = await launchpad_psp34_nft_standard_calls.tokenUri(
            currentAccount,
            1
          );
          tokenUriFull = tokenUriFull.replace("1.json", "");
          for (let tokenID = 1; tokenID <= totalTokenSupply; tokenID++) {
            let owner = await launchpad_psp34_nft_standard_calls.ownerOf(
              currentAccount,
              { u64: tokenID }
            );
            console.log("tokenUriFull", tokenUriFull);
            if (owner == currentAccount.address) {
              let metaData = await getMetaDataType1(tokenID, tokenUriFull);
              myNFTsTmp.push(metaData);
            }
          }
          setMyNFTs(myNFTsTmp);
          console.log('After Set My NFTS')
        }
       
      }
    };

    fetchData();
  }, []);

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
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    const mintingFee = currentWhitelist.mintingFee.replace(/,/g, "");
    await launchpad_psp34_nft_standard_calls.whitelistMint(
      currentAccount,
      currentPhaseId,
      1,
      mintingFee
    );
  };

  const onPublicMint = async () => {
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    const mintingFee = convertStringToPrice(currentPhase.publicMintingFee);
    await launchpad_psp34_nft_standard_calls.publicMint(
      currentAccount,
      currentPhase.id,
      mintingFee
    );
  };

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="launchpad-detail"
    >
      <LaunchpadDetailHeader
        collection_address={collection_address}
        project={formattedCollection}
        currentWhitelist={currentWhitelist}
      />

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
          <Heading size="h6">Public Sale In Progress</Heading>

          <Spacer />
          {!currentPhase.publicPhase && totalWhitelistAmount != 0 ? (
            <Text color="#888">
              {Math.round(totalClaimedAmount / totalWhitelistAmount)}% (
              {totalClaimedAmount}/{totalWhitelistAmount})
            </Text>
          ) : (
            <Text color="#888">
              0% ({totalClaimedAmount}/{totalWhitelistAmount})
            </Text>
          )}
          {currentPhase.publicPhase ? (
            <Text color="#888">
              {Math.round(totalClaimedAmount / currentPhase.publicMintingAmout)}% (
              {totalClaimedAmount}/{currentPhase.publicMintingAmout})
            </Text>
          ) : (
            <Text color="#888">
              0% ({totalClaimedAmount}/{currentPhase.publicMintingAmout})
            </Text>
          )}
        </Flex>
        {!currentPhase.publicPhase && totalWhitelistAmount != 0 ? (
          <Progress
            value={Math.round(totalClaimedAmount / totalWhitelistAmount)}
            mb="20px"
            h="8px"
          />
        ) : ''}

        {currentPhase.publicPhase ? (
          <Progress
            value={Math.round(totalClaimedAmount / currentPhase.publicMintingAmout)}
            mb="20px"
            h="8px"
          />
        ) : ''}

        {!currentAccount ? (
          <Flex w="full" justifyContent="center">
            <Button variant="outline">connect your wallet</Button>
          </Flex>
        ) : (
          ""
        )}
        {console.log('currentPhase', currentPhase)}
        {currentAccount &&
          !currentPhase.publicPhase &&
          currentWhitelist.whitelistAmount && (
            <Flex w="full" justifyContent="center">
              <Button onClick={() => onWhiteListMint()} variant="outline">
                mint
              </Button>
            </Flex>
          )}
        {currentAccount && currentPhase.publicPhase && (
          <Flex w="full" justifyContent="center">
            <Button onClick={() => onPublicMint()} variant="outline">
              Public Mint
            </Button>
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
          <Heading size="h4">Phases</Heading>
          <Spacer />
        </Flex>

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
                            {item.publicMintingAmout}
                          </Text>
                        </Text>
                        <Text mr="30px">
                          Minted:{" "}
                          <Text as="span" color="#fff">
                            {publicMintedCount}
                          </Text>
                        </Text>
                        <Text>
                          Price:{" "}
                          <Text as="span" color="#fff">
                            {convertStringToPrice(item.publicMintingFee)} <AzeroIcon mb="5px" />
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
                              {convertStringToPrice(item.whitelist.mintingFee)}{" "}
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
          <Heading size="h4">Roadmap</Heading>
          <Spacer />
        </Flex>
        {formattedCollection.roadmaps && formattedCollection.roadmaps.length
          ? formattedCollection.roadmaps.map((item, index) => (
              <>
                <Flex w="full" my="20px">
                  <Heading fontSize="lg">
                    {/* M {++index}:{" "} */}
                    <Text as="span" color="#7ae7ff">
                      {item.type}
                    </Text>
                  </Heading>
                  <Spacer />
                </Flex>

                <Box fontSize="lg" color="#888" px="20px" mb="30px">
                  <Interweave content={item.content} />

                  {/* <Text as="span" color="#888">
                    {item.content}
                  </Text> */}
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
          <Heading size="h4">Team</Heading>
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
          {console.log("myNFTs", myNFTs)}
          {myNFTs && myNFTs.length
            ? myNFTs.map((item, idx) => (
                <GridItem>
                  <MyLaunchPadNFTCard key={idx} {...item} />
                </GridItem>
              ))
            : ""}
        </Grid>
      </Box>
    </Layout>
  );
};

export default LaunchpadDetailPage;
