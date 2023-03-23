import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Layout from "@components/Layout/Layout";
import { GroupCard } from "./component/GroupCard";
import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";

import { APICall } from "../../api/client";

export const LaunchpadPage = () => {
  const { api, currentAccount } = useSubstrateState();

  const [liveProjects, setLiveProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isUnmounted = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { ret: projList } = await APICall.getAllProjects({ sort: 1 });

        const activeProjList = projList.filter(
          ({ isActive }) => isActive === true
        );

        const liveProjectsArr = activeProjList.filter(
          ({ startTime, endTime }) =>
            getProjectStatus({ startTime, endTime }) === "live"
        );

        const upcomingProjectsArr = activeProjList.filter(
          ({ startTime, endTime }) =>
            getProjectStatus({ startTime, endTime }) === "upcoming"
        );

        const endedProjectsArr = activeProjList.filter(
          ({ startTime, endTime }) =>
            getProjectStatus({ startTime, endTime }) === "ended"
        );

        if (isUnmounted) return;
        setLiveProjects(liveProjectsArr);
        setUpcomingProjects(upcomingProjectsArr);
        setEndedProjects(endedProjectsArr);
        setLoading(false);
      } catch (error) {
        if (isUnmounted) return;

        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
    return () => (isUnmounted = true);
  }, [api, currentAccount]);

  return (
    <Layout>
      <Box w="full" mx="auto" my="80px" maxW="1400px" textAlign="center">
        <VStack px="30px">
          <Heading fontSize={["3xl-mid", "5xl", "5xl"]} mb="10px">
            launchpad
          </Heading>
          <Text maxW="360px" fontSize="lg" mx="auto" px={["15px", "5px"]}>
            The premier destination to launch your NFT Collection on Aleph Zero
            Network.
          </Text>
        </VStack>
      </Box>
      <VStack
        w="full"
        mb="40px"
        px={["24px", "0px"]}
        spacing={["15px", "30px"]}
      >
        <GroupCard
          variant="live"
          projectsList={liveProjects}
          loading={loading}
        />

        <GroupCard
          variant="upcoming"
          projectsList={upcomingProjects}
          loading={loading}
        />

        <GroupCard
          variant="ended"
          projectsList={endedProjects}
          loading={loading}
        />
      </VStack>
    </Layout>
  );
};

export const getProjectStatus = ({ startTime, endTime }) => {
  const currentTime = Date.now();

  if (currentTime >= endTime) return "ended";

  if (currentTime < startTime) return "upcoming";

  return "live";
};
