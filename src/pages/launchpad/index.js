import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "@components/Layout/Layout";
import { GroupCard } from "./component/GroupCard";
import { useSubstrateState } from "@utils/substrate";
import { timestampWithoutCommas } from "@utils";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";

export const LaunchpadPage = () => {
  const [liveProjects, setLiveProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState([]);
  const [isLoadedProject, setIsLoadedProject] = useState(false);
  const { currentAccount } = useSubstrateState();

  useEffect(async () => {
    if (!isLoadedProject) {
      const projectCount = await launchpad_contract_calls.getProjectCount(currentAccount);
      console.log(projectCount);
      let liveProjectsArr = [];
      let upcomingProjectsArr = [];
      let endedProjectsArr = [];
      for (let i = 1; i <= projectCount; i++) {
        const nftAddress = await launchpad_contract_calls.getProjectById(currentAccount, i);
        console.log(nftAddress);  
        const project = await launchpad_contract_calls.getProjectByNftAddress(currentAccount, nftAddress);
        console.log(project);
        const currentTime = Date.now();
        if (timestampWithoutCommas(project.startTime) < currentTime && currentTime < timestampWithoutCommas(project.endTime) && project.projectType == 2) {
          liveProjectsArr.push(project);
        } else if (currentTime < timestampWithoutCommas(project.startTime) && project.projectType == 2) {
          upcomingProjectsArr.push(project);
        } else {
          endedProjectsArr.push(project);
        }
      }
      setLiveProjects(liveProjectsArr);
      setUpcomingProjects(upcomingProjectsArr);
      setEndedProjects(endedProjectsArr);
      setIsLoadedProject(true);
    }
  }, [isLoadedProject]);

  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading size="h2" mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          The Degenerate Ape Academy is an NFT brand housed on the blockchain.
        </Text>
      </Box>

      <GroupCard projects={liveProjects} variant="live" />
      <GroupCard projects={upcomingProjects} variant="upcoming" />
      <GroupCard projects={endedProjects} variant="ended" />
    </Layout>
  );
};
