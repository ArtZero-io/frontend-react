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
} from "@chakra-ui/react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import React, { useEffect, useState } from "react";
import { delay } from "@utils";
import { RepeatIcon } from "@chakra-ui/icons";
import MyNFTCardsGroup from "./components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();

  const [loading, setLoading] = useState(null);
  const [myCollections, setMyCollections] = useState([]);
  const [selectedCollectionNo, setSelectedCollectionNo] = useState("collected");

  const getAllCollections = async () => {
    setLoading(true);
    var myCollections = [];

    let collections = await collection_manager_calls.getCollectionsByOwner(
      currentAccount,
      currentAccount?.address
    );

    console.log("MyNFTPage collections", collections);
    if (collections?.length) {
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
        myCollections.push({
          collectionName: attributes[0],
          totalItems: "10",
          listNFT: [
            {
              collectionOwner:
                "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
              nftContractAddress:
                "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
              name: "AlbertCoin",
              description: "AlbertCoin",
              avatarImage: "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
              headerImage: "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
              contractType: "2",
              isCollectRoyalFee: true,
              royalFee: "1",
              isActive: true,
              showOnChainMetadata: true,
            },
          ],
        });
      }
      console.log("1MyNFTPage collections", collections);

      setMyCollections(fakeAPI.collected);
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
  }, [collection_manager_calls.isLoaded()]);

  function onClickHandler(e) {
    const id = e.target.getAttribute("id");

    let data;

    if (id === "collected") data = fakeAPI.collected;
    if (id === "listed") data = fakeAPI.listed;
    if (id === "bid") data = fakeAPI.bid;

    setMyCollections(data);
    setSelectedCollectionNo(id);
  }
  console.log("myCollections", selectedCollectionNo);
  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My NFTs</Heading>
          <Spacer />
          <Button
            isActive={"collected" === selectedCollectionNo}
            variant="outline"
            mx={1}
            id="collected"
            onClick={onClickHandler}
          >
            Collected
          </Button>
          <Button
            isActive={"listed" === selectedCollectionNo}
            variant="outline"
            mx={1}
            id="listed"
            onClick={onClickHandler}
          >
            My Listing
          </Button>
          <Button
            isActive={"bid" === selectedCollectionNo}
            variant="outline"
            mx={1}
            id="bid"
            onClick={onClickHandler}
          >
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
          myCollections?.map((item) => <MyNFTCardsGroup {...item} />)}
        {!loading && myCollections?.length === 0 && (
          <Text>You don't have any NFTs</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyNFTsPage;

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
};
