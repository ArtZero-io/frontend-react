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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import Layout from "@components/Layout/Layout";
import LaunchpadDetailHeader from "../component/Header";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { TeamCard } from "../component/TeamCard";
import { useParams } from "react-router-dom";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { IPFS_BASE_URL } from "@constants/index";
import { timestampWithoutCommas } from "@utils";

const LaunchpadDetailPage = () => {
  const [formattedCollection, setFormattedCollection] = useState({});
  const { collection_address } = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [phases, setPhases] = useState([]);
  const [totalWhitelistAmount, setTotalWhitelistAmount] = useState(0);
  const [totalClaimedAmount, setTotalClaimedAmount] = useState(0);
  const [currentPhaseId, setCurrentPhaseId] = useState(0);
  const [currentWhitelist, setCurrentWhitelist] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const project = await launchpad_contract_calls.getProjectByNftAddress(
        currentAccount,
        collection_address
      );
      console.log('LaunchpadDetailPage::project', project)
      
      if (project.isActive) {
        const projectInfo = await launchpad_contract_calls.getProjectInfoByHash(project.projectInfo);
        console.log('projectInfo', projectInfo);
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          collection_address
        );

        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        const totalSupply = await launchpad_psp34_nft_standard_calls.getTotalSupply(currentAccount);
        const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(currentAccount);
        let phasesTmp = [];
        const currentPhaseIdTmp = await launchpad_psp34_nft_standard_calls.getCurrentPhase(currentAccount);
        for (let i = 1; i <= totalPhase; i++) {
          const phaseSchedule = await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(currentAccount, i);
          const phaseCode = await launchpad_psp34_nft_standard_calls.getPhasesCodeById(currentAccount, i);
          
          const phaseInfo = {
            id: i,
            code: phaseCode,
            startTime: timestampWithoutCommas(phaseSchedule.startTime),
            endTime: timestampWithoutCommas(phaseSchedule.endTime),
            isLive: (i == currentPhaseIdTmp) ? 1 : 0
          };
          phasesTmp.push(phaseInfo);
          
          if (i == currentPhaseIdTmp) {
            console.log('LaunchpadDetailPage::phaseSchedule', phaseSchedule);
            setTotalWhitelistAmount(parseInt(phaseSchedule.whitelistAmount));
            setTotalClaimedAmount(parseInt(phaseSchedule.claimedAmount));
            setCurrentPhaseId(currentPhaseIdTmp);
            const currentWhitelistTmp = await launchpad_psp34_nft_standard_calls.getWhitelistByAccountId(currentAccount, phaseCode);
            console.log('LaunchpadDetailPage::currentWhitelistTmp', currentWhitelistTmp);
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
          phases: phasesTmp
        };
        
        setFormattedCollection(projectDetail);
        setPhases(phasesTmp);
      }
    };

    fetchData();
  }, []);

  const onWhiteListMint = async () => {
    console.log('LaunchpadDetailPage::currentWhitelist', currentWhitelist);
    const mintingFee = currentWhitelist.mintingFee.replace(/,/g, "");
    await launchpad_psp34_nft_standard_calls.whitelistMint(currentAccount, currentPhaseId, 1, mintingFee);
  }

  return (
    <Layout
      backdrop={`${IPFS_BASE_URL}/${formattedCollection.headerImage}`}
      variant="launchpad-detail"
    >
      <LaunchpadDetailHeader project={formattedCollection} currentWhitelist={currentWhitelist}/>

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
          <Heading size="h6">Public Sale In Progress</Heading>
          <Spacer />
          {(totalWhitelistAmount != 0) ? (<Text color="#888">{Math.round(totalClaimedAmount/totalWhitelistAmount)}% ({totalClaimedAmount}/{totalWhitelistAmount})</Text>) : (<Text color="#888">0% ({totalClaimedAmount}/{totalWhitelistAmount})</Text>)}
        </Flex>
        {(totalWhitelistAmount != 0) ? (<Progress value={Math.round(totalClaimedAmount/totalWhitelistAmount)} mb="20px" h="8px" />) : (<Progress value="0" mb="20px" h="8px" />)}
        
        {(!currentAccount) ? (<Flex w="full" justifyContent="center">
          <Button variant="outline">connect your wallet</Button>
        </Flex>) : ''}
        {(currentAccount && currentWhitelist.whitelistAmount) ? (<Flex w="full" justifyContent="center">
          <Button onClick={() => onWhiteListMint()} variant="outline">mint</Button>
        </Flex>) : 'No whitelist amount in current phase'}
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
        
        {(phases && phases.length) ? phases.map((item, index) => (
          <>
            <Wrap key={index} flexWrap={true} w="full" mb="15px">
              <WrapItem>
                <Tag w="full">{item.code}</Tag>
              </WrapItem>
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
                    162
                  </Text>
                </Text>
                <Text mr="30px">
                  Max:{" "}
                  <Text as="span" color="#fff">
                    3 Tokens
                  </Text>
                </Text>
                <Text>
                  Price:{" "}
                  <Text as="span" color="#fff">
                    1.20 <AzeroIcon mb="5px" />
                  </Text>
                </Text>
              </Flex>
            </Wrap>
            <Divider />
          </>
        )) : ''}
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
        {(formattedCollection.roadmaps && formattedCollection.roadmaps.length) ? formattedCollection.roadmaps.map((item, index) => (
          <>
            <Flex w="full" mb="20px">
              <Heading size="h6">
                Phase {++index}:{" "}
                <Text as="span" color="#7ae7ff">
                  {item.type}
                </Text>
              </Heading>
              <Spacer />
            </Flex>

            <Box fontSize="lg" color="#888" px="20px" mb="30px">
              <Text as="span" color="#7ae7ff">
                {item.content}
              </Text>
            </Box>

            <Divider />
          </>
        )) : ''}
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
          {(formattedCollection.team_members && formattedCollection.team_members.length) ? formattedCollection.team_members.map((item) => (<GridItem>
            <TeamCard team_member={item}/>
          </GridItem>)) : ''}
        </Grid>
      </Box>
    </Layout>
  );
}

export default LaunchpadDetailPage;
