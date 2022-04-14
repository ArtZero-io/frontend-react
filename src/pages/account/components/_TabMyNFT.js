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
import MyNFTCardsGroup from "./Card/_MyNFTCardsGroup";
import { useSubstrateState } from "@utils/substrate";
import { ContractPromise } from "@polkadot/api-contract";
import nft721_psp34_standard from "../../../utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "../../../utils/blockchain/nft721-psp34-standard-calls";
import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";

const TabMyNFT = () => {
  const [loading] = useState(null);
  const { api, currentAccount } = useSubstrateState();
  const [my_collections, setMyCollections] = useState([]);

  const getMyNFTByCollection = async (collection) => {
    let myNFTs = [];
    let atts = [];
    if (collection.showOnChainMetadata) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        collection.nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const totalSupply = await nft721_psp34_standard_calls.getTotalSupply(
        currentAccount
      );
      for (let i = 1; i <= totalSupply; i++) {
        const tokenId = nft721_psp34_standard_contract.api.createType(
          "ContractsPsp34Id",
          { U8: numberToU8a(i) }
        );
        const tokenName = await nft721_psp34_standard_calls.getAttribute(
          currentAccount,
          tokenId,
          stringToHex("nft_name")
        );
        const tokenAvatar = await nft721_psp34_standard_calls.getAttribute(
          currentAccount,
          tokenId,
          stringToHex("avatar")
        );
        const base_attributes = ["nft_name", "description", "avatar"];
        const attribute_count =
          await nft721_psp34_standard_calls.getAttributeCount(currentAccount);
        atts = [];
        for (let j = 1; j <= attribute_count; j++) {
          const attribute_name =
            await nft721_psp34_standard_calls.getAttributeName(
              currentAccount,
              j
            );

          if (attribute_name && !base_attributes.includes(attribute_name)) {
            const attribute_val =
              await nft721_psp34_standard_calls.getAttribute(
                currentAccount,
                tokenId,
                stringToHex(attribute_name)
              );
            if (attribute_val) {
              atts.push({ name: attribute_name, value: attribute_val });
            }
          }
        }
        const nft = {
          id: i,
          askPrice: "12.3",
          bidPrice: "12.3",
          name: tokenName,
          img: `${IPFS_BASE_URL}/${tokenAvatar}`,
          atts: atts,
        };
        console.log("TabMyNFT", nft);
        myNFTs.push(nft);
      }
    } else {
      // if (
      //   collection.nftContractAddress == artzero_nft.CONTRACT_ADDRESS
      // ) {
      //   if (!artzero_nft_calls.isLoaded()) {
      //     const artzero_nft_contract = new ContractPromise(
      //         api,
      //         artzero_nft.CONTRACT_ABI,
      //         artzero_nft.CONTRACT_ADDRESS
      //       );
      //       artzero_nft_calls.setContract(artzero_nft_contract);
      //   }
      //   //TODO: handle again total supply, add pagination
      //   const totalSupply = 10;
      //   for (let i = 1; i <= totalSupply - 7; i++) {
      //     const res = await artzero_nft_calls.tokenUri(currentAccount, i);
      //     axios.get(res)
      //       .then(response => {
      //           if (response.status === 200) {
      //             const nft = {
      //        marketplace_contract_calls       name: response.data.name,
      //               img: response.data.image
      //             };
      //             NFTDataList.push(nft);
      //           }
      //       })
      //       .catch(error => {
      //         console.log(error);
      //       });
      //   }
      // }
    }
    return myNFTs;
  };

  const getAllCollections = async () => {
    var my_collections = [];
    let collections = await collection_manager_calls.getCollectionsByOwner(
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
      const listNft = await getMyNFTByCollection(data);
      console.log(listNft);
      my_collections.push({
        collectionName: attributes[0],
        totalItems: listNft.length,
        nftContractAddress: data.nftContractAddress,
        collection_detail: data,
        listNFT: listNft,
      });
    }
    setMyCollections(my_collections);
  };

  const onRefresh = async () => {
    await delay(1000);
    await getAllCollections();
  };

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
          {!loading &&
            my_collections.map((item) => <MyNFTCardsGroup {...item} />)}
        </Box>
      </Box>
    </>
  );
};

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
