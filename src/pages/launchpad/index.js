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

  useEffect(() => {
    const fetchData = async () => {
      const projectCount = await launchpad_contract_calls.getProjectCount(
        currentAccount
      );
      let liveProjectsArr = [];
      let upcomingProjectsArr = [];
      let endedProjectsArr = [];
      console.log('projectCount', projectCount);
      for (let i = 1; i <= projectCount; i++) {
        const nftAddress = await launchpad_contract_calls.getProjectById(
          currentAccount,
          i
        );
        console.log(nftAddress);
        const project = await launchpad_contract_calls.getProjectByNftAddress(
          currentAccount,
          nftAddress
        );
        console.log(project);
        if (!project.isActive) {continue;}
        const projectInfo = await launchpad_contract_calls.getProjectInfoByHash(project.projectInfo);
        console.log('projectInfo', projectInfo);
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
        };
        if (
          timestampWithoutCommas(project.startTime) < currentTime &&
          currentTime < timestampWithoutCommas(project.endTime) &&
          project.projectType == 1
        ) {
          liveProjectsArr.push(projectTmp);
        } else if (
          currentTime < timestampWithoutCommas(project.startTime) &&
          project.projectType == 1
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
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Box w="full" maxW="1400px" mx="auto" textAlign="center" my="80px">
        <Heading size="h2" mb="10px">
          launchpad
        </Heading>
        <Text maxW="360px" fontSize="lg" mx="auto">
          Dolore sint in sit enim proident ullamco quis eu veniam. Dolore sintin
          proident ullamco quis.
        </Text>
      </Box>

      <GroupCard variant="live" projectsList={liveProjects} />

      <GroupCard variant="upcoming" projectsList={upcomingProjects} />

      <GroupCard variant="ended" projectsList={endedProjects} />
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
//   },
//   {
//     status: "live",
//     progressPercent: 3000,
//     _id: "62c290ccfb7f4ddb2f6010ab",
//     index: 7,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5CfDRhdEJXc8aT1mNVN5VDx2iUFg7aUBnLdqJnFrZV4YURxu",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Tornado",
//     description: "Tornado",
//     avatarImage: "QmXXm6c2fFjQ1PPfznXnqacK8KheN89XnVNHN5LjdFjzAA",
//     squareImage: "QmTu5QhrxndZ1QyzfiP5AVHXLN4xpu7a263BteMDgtTGiM",
//     headerImage: "QmaMDX219SFQDMx1iCnjWyo2YjdMcWZWK4rnJrhveBP8sf",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 6,
//     __v: 0,
//   },
//   {
//     status: "live",
//     progressPercent: 3500,
//     _id: "62c29036fb7f4ddb2f601070",
//     index: 6,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5EVN9zwTWR2ezikzFbokiv7uwCt6HiKnDV3ZQnAQxedyAiZ5",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Poisonous Frogs",
//     description: "Poisonous Frogs",
//     avatarImage: "QmR1RwGC7iFkUoKMWGCn7oZRb6mkb8v39fMX8pr2w45HEA",
//     squareImage: "QmUDo9Tf2fCDHUsUkLTvKjV6Ze7B6XjKDTy7q7MRp2BGL6",
//     headerImage: "QmTZrbXVxoixsdQ13kaUcbBaFLhFedcEsWhW7psVD7cMY6",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 8,
//     __v: 0,
//   },
//   {
//     status: "live",
//     progressPercent: 4000,
//     _id: "62c28f8cfb7f4ddb2f60102e",
//     index: 5,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5F5Wz6UzgNq1cieMs9T2BTmLRpWqup2hJXNz8msTG9uLuJSj",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Crochet",
//     description: "Crochet",
//     avatarImage: "Qmc776mf1P6ZAnsEWXv7zk9TFtLCuhsLYbqocVZEUZ3sC3",
//     squareImage: "Qmbb9EjqMdHVxTXreuwrpC3xRENSLxkLXS4eu7VQ8N9w9Q",
//     headerImage: "QmZUY9TAMzFxzXSb9f7GDpYMD4Q8H6dk4TPKDmw2iMJH7R",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 6,
//     __v: 0,
//   },

//   {
//     status: "upcoming",
//     progressPercent: 4000,
//     _id: "62c28f8cfb7f4ddb2f60102e",
//     index: 5,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5F5Wz6UzgNq1cieMs9T2BTmLRpWqup2hJXNz8msTG9uLuJSj",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Crochet",
//     description: "Crochet",
//     avatarImage: "Qmc776mf1P6ZAnsEWXv7zk9TFtLCuhsLYbqocVZEUZ3sC3",
//     squareImage: "Qmbb9EjqMdHVxTXreuwrpC3xRENSLxkLXS4eu7VQ8N9w9Q",
//     headerImage: "QmZUY9TAMzFxzXSb9f7GDpYMD4Q8H6dk4TPKDmw2iMJH7R",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 6,
//     __v: 0,
//   },
//   {
//     status: "upcoming",
//     progressPercent: 5000,
//     _id: "62c285fffb7f4ddb2f600cad",
//     index: 3,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5EMR98oeHAzBkQGtfWYVKSWGr7srCVEek3pymmjcVrEZgnvS",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Flower",
//     description: "Flower",
//     avatarImage: "QmSR89HTWe45YmRBUhFz2mHr63a4JLUMGguGk2PhuzGfmN",
//     squareImage: "QmVo9str7U4EfqBN1y5g5btkwWmvZqruaaN1ezTVJYa6uJ",
//     headerImage: "QmU9F8BUFNZvqZ3rSQU2KZdjxtbFuYZtcHevkoiPb4teBT",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 199,
//     nft_count: 12,
//     __v: 0,
//   },
//   {
//     status: "upcoming",
//     progressPercent: 4500,
//     _id: "62c246e8fb7f4ddb2f5ff67c",
//     index: 2,
//     collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//     nftContractAddress: "5G7WvWKkZFucDmXUqEBARyjEZm4kGDB7WqnzjAGKySE2EGKM",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Azero Frog Collection",
//     description:
//       "Labore voluptate in nisi et labore ut commodo id do aute veniam aute. Quis irure magna magna tempor aliqua incididunt et tempor nulla sit.",
//     avatarImage: "QmSTPtfv9JfKJLdUuw5d7axoGfeezS3uRAQ3HFDQ6kCAa9",
//     squareImage: "QmTZrbXVxoixsdQ13kaUcbBaFLhFedcEsWhW7psVD7cMY6",
//     headerImage: "QmTZrbXVxoixsdQ13kaUcbBaFLhFedcEsWhW7psVD7cMY6",
//     website: "http://localhost.com/",
//     twitter: "http://twitter.com/",
//     discord: "http://discord.com/",
//     volume: 0,
//     nft_count: 5,
//     __v: 0,
//   },
//   {
//     status: "upcoming",
//     progressPercent: 5000,
//     _id: "62c1df80fb7f4ddb2f5fd07f",
//     index: 1,
//     collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//     nftContractAddress: "5D7AgkJ8dJ53gcmqCK8pYNCqgQxMqoQcQdMC8NARRx3a2XHq",
//     contractType: 1,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: false,
//     name: "Praying Mantis Predators",
//     description:
//       "Praying Mantis Predators NFTs are a collection of 10K unique and programmatically generated NFTs with vastly varying traits, attributes, and rarity.",
//     avatarImage: "QmWyHLrMuRApjtQR1M6ujm7vp1u9SBmsoTFdRNAEWk21z6",
//     squareImage: "QmWyHLrMuRApjtQR1M6ujm7vp1u9SBmsoTFdRNAEWk21z6",
//     headerImage: "QmTKtt2Q1czrJGB7xZ16Nx8PzHTdnqhNqinSNtSnznnAYw",
//     website: "https://artzero.io/",
//     twitter: "https://twitter.com/ArtZero_io",
//     discord: "https://discord.com/invite/wzkZ2JTvN4",
//     volume: 0,
//     nft_count: 26,
//     __v: 0,
//   },
//   {
//     status: "ended",
//     progressPercent: 4000,
//     _id: "62c28f8cfb7f4ddb2f60102e",
//     index: 5,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5F5Wz6UzgNq1cieMs9T2BTmLRpWqup2hJXNz8msTG9uLuJSj",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Crochet",
//     description: "Crochet",
//     avatarImage: "Qmc776mf1P6ZAnsEWXv7zk9TFtLCuhsLYbqocVZEUZ3sC3",
//     squareImage: "Qmbb9EjqMdHVxTXreuwrpC3xRENSLxkLXS4eu7VQ8N9w9Q",
//     headerImage: "QmZUY9TAMzFxzXSb9f7GDpYMD4Q8H6dk4TPKDmw2iMJH7R",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 0,
//     nft_count: 6,
//     __v: 0,
//   },
//   {
//     status: "ended",
//     progressPercent: 5000,
//     _id: "62c285fffb7f4ddb2f600cad",
//     index: 3,
//     collectionOwner: "5ENvCvuTxstJZbP59Ubx47qcVSc7EUctudowPC7CAP3GfZCk",
//     nftContractAddress: "5EMR98oeHAzBkQGtfWYVKSWGr7srCVEek3pymmjcVrEZgnvS",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Flower",
//     description: "Flower",
//     avatarImage: "QmSR89HTWe45YmRBUhFz2mHr63a4JLUMGguGk2PhuzGfmN",
//     squareImage: "QmVo9str7U4EfqBN1y5g5btkwWmvZqruaaN1ezTVJYa6uJ",
//     headerImage: "QmU9F8BUFNZvqZ3rSQU2KZdjxtbFuYZtcHevkoiPb4teBT",
//     website: "",
//     twitter: "",
//     discord: "",
//     volume: 199,
//     nft_count: 12,
//     __v: 0,
//   },
//   {
//     status: "ended",
//     progressPercent: 4500,
//     _id: "62c246e8fb7f4ddb2f5ff67c",
//     index: 2,
//     collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//     nftContractAddress: "5G7WvWKkZFucDmXUqEBARyjEZm4kGDB7WqnzjAGKySE2EGKM",
//     contractType: 2,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: true,
//     name: "Azero Frog Collection",
//     description:
//       "Labore voluptate in nisi et labore ut commodo id do aute veniam aute. Quis irure magna magna tempor aliqua incididunt et tempor nulla sit.",
//     avatarImage: "QmSTPtfv9JfKJLdUuw5d7axoGfeezS3uRAQ3HFDQ6kCAa9",
//     squareImage: "QmTZrbXVxoixsdQ13kaUcbBaFLhFedcEsWhW7psVD7cMY6",
//     headerImage: "QmTZrbXVxoixsdQ13kaUcbBaFLhFedcEsWhW7psVD7cMY6",
//     website: "http://localhost.com/",
//     twitter: "http://twitter.com/",
//     discord: "http://discord.com/",
//     volume: 0,
//     nft_count: 5,
//     __v: 0,
//   },
//   {
//     status: "ended",
//     progressPercent: 5000,
//     _id: "62c1df80fb7f4ddb2f5fd07f",
//     index: 1,
//     collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//     nftContractAddress: "5D7AgkJ8dJ53gcmqCK8pYNCqgQxMqoQcQdMC8NARRx3a2XHq",
//     contractType: 1,
//     isCollectRoyalFee: true,
//     isActive: true,
//     showOnChainMetadata: false,
//     name: "Praying Mantis Predators",
//     description:
//       "Praying Mantis Predators NFTs are a collection of 10K unique and programmatically generated NFTs with vastly varying traits, attributes, and rarity.",
//     avatarImage: "QmWyHLrMuRApjtQR1M6ujm7vp1u9SBmsoTFdRNAEWk21z6",
//     squareImage: "QmWyHLrMuRApjtQR1M6ujm7vp1u9SBmsoTFdRNAEWk21z6",
//     headerImage: "QmTKtt2Q1czrJGB7xZ16Nx8PzHTdnqhNqinSNtSnznnAYw",
//     website: "https://artzero.io/",
//     twitter: "https://twitter.com/ArtZero_io",
//     discord: "https://discord.com/invite/wzkZ2JTvN4",
//     volume: 0,
//     nft_count: 26,
//     __v: 0,
//   },
// ];
