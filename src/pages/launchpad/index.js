import { Box, Heading, Text } from "@chakra-ui/react";
import Layout from "@components/Layout/Layout";
import { GroupCard } from "./component/GroupCard";
import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import { timestampWithoutCommas } from "@utils";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";

export const LaunchpadPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { currentAccount } = useSubstrateState();

  const [liveProjects, setLiveProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [endedProjects, setEndedProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectCount = await launchpad_contract_calls.getProjectCount(
          currentAccount
        );
        let liveProjectsArr = [];
        let upcomingProjectsArr = [];
        let endedProjectsArr = [];

        for (let i = 1; i <= projectCount; i++) {
          const nftAddress = await launchpad_contract_calls.getProjectById(
            currentAccount,
            i
          );

          const project = await launchpad_contract_calls.getProjectByNftAddress(
            currentAccount,
            nftAddress
          );

          if (!project.isActive) {
            continue;
          }
          const projectInfo =
            await launchpad_contract_calls.getProjectInfoByHash(
              project.projectInfo
            );
          console.log("projectInfo", projectInfo);

          const currentTime = Date.now();
          const projectTmp = {
            index: i,
            collectionOwner: project.projectOwner,
            nftContractAddress: nftAddress,
            name: projectInfo.name,
            description: projectInfo.description,
            avatarImage: projectInfo.avatar,
            squareImage: projectInfo.avatar,
            headerImage: projectInfo.header,
            ...project,
            ...projectInfo,
          };

          if (
            timestampWithoutCommas(project.startTime) < currentTime &&
            currentTime < timestampWithoutCommas(project.endTime) &&
            parseInt(project.projectType) === 1
          ) {
            liveProjectsArr.push(projectTmp);
          } else if (
            currentTime < timestampWithoutCommas(project.startTime) &&
            parseInt(project.projectType) === 1
          ) {
            upcomingProjectsArr.push(projectTmp);
          } else {
            endedProjectsArr.push(projectTmp);
          }
        }

        // const live = projects.filter((p) => p.status === "live");
        // const upcoming = projects.filter((p) => p.status === "upcoming");
        // const ended = projects.filter((p) => p.status === "ended");

        setLiveProjects(liveProjectsArr);
        setUpcomingProjects(upcomingProjectsArr);
        setEndedProjects(endedProjectsArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentAccount]);

  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]} mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          Dolore sint in sit enim proident ullamco quis eu veniam. Dolore sintin
          proident ullamco quis.
        </Text>
      </Box>

      <GroupCard variant="live" projectsList={liveProjects} loading={loading} />

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
    </Layout>
  );
};

// const projectsList = [
//   {
//     status: "live",
//     progressPercent: 2500,
//     _id: "62c2911cfb7f4ddb2f6010cd",
//     index: 8,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5EQqAeKFZwKmNdcF5mUE4s955PtnLkYHQE3uTvpRy9pqfoVb",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Abstract",
//     description: "Abstract",
//     avatarImage: "QmYRNac8K4ASALeN36knEwwdzrzNzmvKrN3H3DFKtbXUbn",
//     squareImage: "QmcjMTXHKiByiLudysm41i5WkimKCGvwf3nWUVgMDPBjbc",
//     headerImage: "QmSGMqQtxeDAUnwtc1pFVVGCoQoMKgdZA8Zhyb4HgnV9F3",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 8,
//     __v: 0,
//   } 
// ];
