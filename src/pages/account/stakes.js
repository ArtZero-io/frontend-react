import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
  Spinner,
  Button,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { delay } from "@utils";
import MyNFTGroupCard from "./components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";
import { ContractPromise } from "@polkadot/api-contract";
import RefreshIcon from "@theme/assets/icon/Refresh.js";

const MyStakesPage = () => {
  const { api, currentAccount } = useSubstrateState();

  const [loading, setLoading] = useState(null);
  const [myCollections, setMyCollections] = useState([]);
  const [selectedCollectionNo, setSelectedCollectionNo] = useState("collected");

  const getMyNFTByCollection = async (collection) => {
    let myNFTs = [];
    let atts = [];
    console.log(
      "collection.showOnChainMetadata",
      collection.showOnChainMetadata
    );
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

        myNFTs.push(nft);
      }
    } else {
      // if (
      //   collection.nftContractAddress === artzero_nft.CONTRACT_ADDRESS
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
    setLoading(true);
    var myCollections = [];

    let collections = await collection_manager_calls.getCollectionsByOwner(
      currentAccount,
      currentAccount?.address
    );

    if (collections?.length) {
      for (let collection of collections) {
        let data = await collection_manager_calls.getCollectionByAddress(
          currentAccount,
          collection
        );
        let attributes = await collection_manager_calls.getAttributes(
          currentAccount,
          data?.nftContractAddress,
          ["name"]
        );
        const listNft = await getMyNFTByCollection(data);
        console.log(listNft);
        myCollections.push({
          collectionName: attributes[0],
          totalItems: listNft.length,
          nftContractAddress: data?.nftContractAddress,
          collection_detail: data,
          listNFT: listNft,
        });
      }
      setMyCollections(myCollections);

      // setMyCollections(fakeAPI.collected);
      setLoading(false);
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    await delay(1000);
    await getAllCollections();
  };

  useEffect(async () => {
    await onRefresh();
  }, [onRefresh]);

  function onClickHandler(e) {
    const id = e.target.getAttribute("id");

    let data;

    if (id === "staked") data = fakeAPI.staked;
    if (id === "notStaked") data = fakeAPI.notStaked;

    setMyCollections(data);
    setSelectedCollectionNo(id);
  }

  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My Stakes</Heading>
          <Spacer />
          <Button
            isActive={"notStaked" === selectedCollectionNo}
            id="notStaked"
            variant="outline"
            mx={1}
            onClick={onClickHandler}
          >
            Staked
          </Button>
          <Button
            isActive={"staked" === selectedCollectionNo}
            id="staked"
            variant="outline"
            mx={1}
            onClick={onClickHandler}
          >
            Not staked
          </Button>

          <IconButton
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
          />
        </Flex>

        <HStack pb={5} borderBottomWidth={1}>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total ArtZero NFTs:
            <Text color="#fff" ml={2}>
              5 items
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total Staked Art Zero NFTs:
            <Text color="#fff" ml={2}>
              5 items
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total Unstaked Art Zero NFTs:
            <Text color="#fff" ml={2}>
              5 items
            </Text>
          </Flex>
          <Flex alignItems="start">
            <Text ml={1} color="brand.grayLight"></Text>
            Discount Rate:
            <Text color="#fff" ml={2}>
              5 %
            </Text>
          </Flex>
        </HStack>
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
          myCollections?.map((item) => <MyNFTGroupCard {...item} />)}
        {!loading && myCollections?.length === 0 && (
          <Text>You don't have any NFTs</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyStakesPage;

const fakeAPI = {
  collected: [
    {
      collectionName: "Sol City Donkey",
      image: "https://data.solanart.io/img/collections/degenapepreview.webp",
      totalItems: "1",
      listNFT: [
        {
          isListed: { status: false },
          name: "SolPunk #6269",
          symbol: "",
          description: "SolPunk #6269 - Male",
          seller_fee_basis_points: 500,
          image:
            "https://arweave.net/P508HbGo9dEZkuHs9B1pqyELa7XXFj3o3i-6L9Ad8iw",
          external_url: "https://solpunks.com",
          attributes: [
            { trait_type: "Rank", value: 6270 },
            { trait_type: "Skin", value: "Dark" },
            { trait_type: "Type", value: "Male" },
            { trait_type: "Attribute 1", value: "Luxurious Beard" },
            { trait_type: "Attribute 2", value: "Messy Hair" },
            { trait_type: "Attribute 3", value: "Horned Rim Glasses" },
            { trait_type: "Attribute 4", value: "Earring" },
            { trait_type: "Attribute Count", value: 4 },
          ],
          properties: {
            creators: [
              {
                address: "punknPuatYGcB6EM4Mt7q1qxz1PKhNiTmd1We1Srt9d",
                verified: true,
                share: 100,
              },
            ],
          },
        },
      ],
    },
  ],

  listed: [
    {
      collectionName: "Sol City Donkey",
      image: "https://data.solanart.io/img/collections/degenapepreview.webp",
      totalItems: "2",
      listNFT: [
        {
          isListed: { status: true, askPrice: "11", denom: "azero" },
          name: "Sol City Donkey #541",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 541,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Gold" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Angry" },
            { trait_type: "Head", value: "Captain" },
            { trait_type: "Eyes", value: "Diamonds" },
            { trait_type: "Hand", value: "Poker Chips" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
        {
          isListed: { status: true, askPrice: "11", denom: "azero" },

          name: "Sol City Donkey #215",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 215,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Solana" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Cigar" },
            { trait_type: "Head", value: "5 Panel" },
            { trait_type: "Eyes", value: "Clubs" },
            { trait_type: "Hand", value: "Eat Your Greens" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
      ],
    },
  ],

  bid: [
    {
      collectionName: "Sol City Donkey",
      image: "https://data.solanart.io/img/collections/degenapepreview.webp",
      totalItems: "2",
      listNFT: [
        {
          isBid: { status: true, bidPrice: "111", denom: "azero" },
          name: "Sol City Donkey #541",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 541,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Gold" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Angry" },
            { trait_type: "Head", value: "Captain" },
            { trait_type: "Eyes", value: "Diamonds" },
            { trait_type: "Hand", value: "Poker Chips" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
        {
          isBid: { status: true, bidPrice: "121", denom: "azero" },

          name: "Sol City Donkey #215",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 215,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Solana" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Cigar" },
            { trait_type: "Head", value: "5 Panel" },
            { trait_type: "Eyes", value: "Clubs" },
            { trait_type: "Hand", value: "Eat Your Greens" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
      ],
    },
  ],

  staked: [
    {
      collectionName: "Sol City Donkey",
      image: "https://data.solanart.io/img/collections/degenapepreview.webp",
      totalItems: "2",
      listNFT: [
        {
          isStaked: { status: true, time: "1623325231" },
          name: "Sol City Donkey #541",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 541,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Gold" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Angry" },
            { trait_type: "Head", value: "Captain" },
            { trait_type: "Eyes", value: "Diamonds" },
            { trait_type: "Hand", value: "Poker Chips" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
        {
          isStaked: { status: true, time: "1623325231" },

          name: "Sol City Donkey #215",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 215,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Solana" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Cigar" },
            { trait_type: "Head", value: "5 Panel" },
            { trait_type: "Eyes", value: "Clubs" },
            { trait_type: "Hand", value: "Eat Your Greens" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/xpyby-8GJnIhO_kN6pwyjhEIKA5s84FxODYJem0UaDw?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
      ],
    },
  ],
  notStaked: [
    {
      collectionName: "Sol City Donkey",
      image: "https://data.solanart.io/img/collections/degenapepreview.webp",
      totalItems: "2",
      listNFT: [
        {
          isStaked: { status: false },
          name: "Sol City Donkey #541",
          symbol: "SCPC",
          description:
            "777 degenerate donkeys bucking around on the solana blockchain",
          seller_fee_basis_points: 1000,
          image:
            "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
          external_url: "https://solcitypoker.com",
          edition: 541,
          collection: { name: "Sol City Poker Club", family: "Sol City" },
          attributes: [
            { trait_type: "Background", value: "Purple" },
            { trait_type: "Body", value: "Gold" },
            { trait_type: "Torso", value: "Vacation Shirt" },
            { trait_type: "Mouth", value: "Angry" },
            { trait_type: "Head", value: "Captain" },
            { trait_type: "Eyes", value: "Diamonds" },
            { trait_type: "Hand", value: "Poker Chips" },
          ],
          properties: {
            files: [
              {
                uri: "https://arweave.net/QKoJNEY7XvX41fPCrib8hiP1n1iuntm0XgYlWNAhIhg?ext=png",
                type: "image/png",
              },
            ],
            category: "image",
            creators: [
              {
                address: "CcPssghZG9gUCHJeDAw3p1oyDfPmLt4B2wWk3sfkof2Q",
                share: 20,
              },
              {
                address: "GXdhXExg8aPg4x1x24cPrzwQGT5kSr5Cut2eM4g3GHp7",
                share: 40,
              },
              {
                address: "2axV4eiqU9DJGmM9pUg18e6FzcdVTsPyckkKoynDud4d",
                share: 40,
              },
            ],
          },
        },
      ],
    },
  ],
};
