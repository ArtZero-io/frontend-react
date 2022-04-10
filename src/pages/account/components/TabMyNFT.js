import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
  Spinner,
  Button,
  IconButton,
} from "@chakra-ui/react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import React, { useEffect, useState } from "react";
import { delay } from "@utils";
import { RepeatIcon } from "@chakra-ui/icons";
import MyNFTCardsGroup from "./Card/MyNFTCardsGroup";
import { useSubstrateState } from "@utils/substrate";

const TabMyNFT = () => {
  const [loading] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [my_collections, setMyCollections] = useState([]);

  const getAllCollections = async () => {
    var my_collections = [];
    let collections =
      await collection_manager_calls.getCollectionsByOwner(
        currentAccount,
        currentAccount?.address
      );
    for (let collection of collections) {
      let data = await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        collection
      );
      let attributes = await collection_manager_calls.getAttributes(
        currentAccount,
        data.nftContractAddress,
        ["name"]
      );
      console.log(attributes);
      my_collections.push(
        {
          collectionName: attributes[0],
          totalItems: "10",
          listNFT: [
            {
              collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
              nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
              name: "AlbertCoin",
              description: "AlbertCoin",
              avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
              headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
              contractType: "2",
              isCollectRoyalFee: true,
              royalFee: "1",
              isActive: true,
              showOnChainMetadata: true,
            }
          ]
        }
      );
    }
    setMyCollections(my_collections);
  }

  const onRefresh = async () => {
    await delay(1000);
    await getAllCollections();
  }

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);
  
  return (
    <>
      <Box as="section" maxW="container.3xl" px={5} minH="60rem">
        <Box
          mx="auto"
          maxW={{ base: "xl", md: "7xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "12", md: "20" }}
        >
          <Flex w="full" alignItems="end" pb={12}>
            <Heading size="h2">My NFTs</Heading>
            <Spacer />
            <Button variant="outline" mx={1}>
              Collected
            </Button>
            <Button variant="outline" mx={1}>
              My Listing
            </Button>
            <Button variant="outline" mx={1}>
              My Bids
            </Button>

            <IconButton
              mx={1}
              aria-label="refresh"
              icon={<RepeatIcon />}
              size="icon"
              variant="iconSolid"
            />
          </Flex>
          {loading && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          {!loading && my_collections.map((item) => <MyNFTCardsGroup {...item} />)}
        </Box>
      </Box>
    </>
  );
}

export default TabMyNFT;

// const fake = [
//   {
//     collectionName: "Sol punk1 ",
//     totalItems: "10",
//     listNFT: [
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },

//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//     ],
//   },
//   {
//     collectionName: "Sol punk 222 ",
//     totalItems: "10",
//     listNFT: [
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },

//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//     ],
//   },
//   {
//     collectionName: "Sol punk 333 ",
//     totalItems: "10",
//     listNFT: [
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },

//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//       {
//         collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
//         nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
//         name: "AlbertCoin",
//         description: "AlbertCoin",
//         avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
//         headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
//         contractType: "2",
//         isCollectRoyalFee: true,
//         royalFee: "1",
//         isActive: true,
//         showOnChainMetadata: true,
//       },
//     ],
//   },
// ];
