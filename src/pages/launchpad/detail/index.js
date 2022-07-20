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

const LaunchpadDetailPage = () => {
  const [formattedCollection, setFormattedCollection] = useState({});
  const { collection_address } = useParams();
  const { api, currentAccount } = useSubstrateState();

  useEffect(() => {
    const fetchData = async () => {
      const project = await launchpad_contract_calls.getProjectByNftAddress(
        currentAccount,
        collection_address
      );
      if (project.isActive) {
        const projectInfo = await launchpad_contract_calls.getProjectInfoByHash(project.projectInfo);
        console.log('projectInfo', projectInfo);
        const launchpad_psp34_nft_standard_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          collection_address
        );

        launchpad_psp34_nft_standard_calls.setContract(launchpad_psp34_nft_standard_contract);
        console.log(launchpad_psp34_nft_standard_contract);
        const totalSupply = await launchpad_psp34_nft_standard_calls.getTotalSupply(currentAccount);
        console.log('totalSupply', totalSupply);
        // const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(currentAccount);
        // for (let i = 1; i <= totalPhase; i++) {
          
        // }
        const projectDetail = {
          name: projectInfo.name,
          description: projectInfo.description,
          avatarImage: projectInfo.avatar,
          headerImage: projectInfo.header,
          totalSupply: totalSupply,
          roadmaps: projectInfo.roadmaps,
          team_members: projectInfo.team_members
        };
        setFormattedCollection(projectDetail);
      }
    };

    fetchData();
  }, []);
  console.log("collection_address", collection_address);

  return (
    <Layout
      backdrop={`${IPFS_BASE_URL}/${formattedCollection.headerImage}`}
      variant="launchpad-detail"
    >
      <LaunchpadDetailHeader project={formattedCollection}/>

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
          <Text color="#888">98% (760/777)</Text>
        </Flex>
        <Progress value={98} mb="20px" h="8px" />
        <Flex w="full" justifyContent="center">
          <Button variant="outline">connect your wallet</Button>
        </Flex>
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
        <Wrap flexWrap={true} w="full" mb="15px">
          <WrapItem>
            <Tag w="full">OG</Tag>
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
        <Wrap flexWrap={true} w="full" mt="30px">
          <WrapItem>
            <Tag w="full">Whitelist</Tag>
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
                1162
              </Text>
            </Text>
            <Text mr="30px">
              Max:{" "}
              <Text as="span" color="#fff">
                2 Tokens
              </Text>
            </Text>
            <Text>
              Price:{" "}
              <Text as="span" color="#fff">
                1.50 <AzeroIcon mb="5px" />
              </Text>
            </Text>
          </Flex>
        </Wrap>
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
