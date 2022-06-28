import React, { useCallback, useEffect, useState } from "react";

import { getPublicCurrentAccount, truncateStr } from "@utils";
import profile_calls from "@utils/blockchain/profile_calls";
import { APICall, clientAPI } from "@api/client";
import { Heading, IconButton, Spacer, Stack, Text } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import StatsTable from "@components/Table/StatsTable";

function TopCollectionsTab({ tokenUriType1 }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingTime, setLoadingTime] = useState(null);
  const [collectionEventsFull, setCollectionEventsFull] = useState(null);
  const [useAzeroUnit, setUseAzeroUnit] = useState(true);

  const getUsername = useCallback(async ({ accountAddress }) => {
    const {
      data: { username },
    } = await profile_calls.getProfileOnChain({
      callerAccount: getPublicCurrentAccount(),
      accountAddress,
    });

    return username || truncateStr(accountAddress);
  }, []);

  useEffect(() => {
    setLoading(true);

    const collectionEventsFull = async () => {
      try {
        await Promise.all(
          topCollections?.map(async (event) => {
            const buyerName = await getUsername({
              accountAddress: event.buyer,
            });

            const sellerName = await getUsername({
              accountAddress: event.seller,
            });

            const traderName = await getUsername({
              accountAddress: event.trader,
            });

            const [{ name, contractType }] =
              await APICall.getCollectionByAddress({
                collection_address: event.nftContractAddress,
              });
            console.log("contractType", contractType);
            // FAKE

            const marketCap = 88888;
            const totalSupply = 1000;
            const vol7Day = { amount: 999, percent: 42.25 };
            const averagePrice24h = { amount: 999, percent: 42.25 };
            const floorPrice = 8888;
            const avatarImage =
              "https://api.artzero.io/getImage?input=ipfs://QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png&size=500&url=https://ipfs.infura.io/ipfs/QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png";
            // END FAKE
            event = {
              ...event,
              buyerName,
              sellerName,
              traderName,
              collectionName: name,
              marketCap,
              totalSupply,
              vol7Day,
              averagePrice24h,
              floorPrice,
              avatarImage,
            };

            if (contractType === 2) {
              const [{ attributesValue }] = await APICall.getNFTByID({
                collection_address: event.nftContractAddress,
                token_id: event.tokenID,
              });
              console.log("avatar2", attributesValue[2]);

              event = {
                ...event,
                nftName: attributesValue[0],
                avatar: attributesValue[2],
              };
            }

            if (contractType === 1) {
              const { name, avatar } = await getMetaDataType1(
                event.tokenID,
                tokenUriType1
              );
              console.log("avatar1", avatar);
              event = {
                ...event,
                nftName: name,
                avatar,
              };
            }
            console.log("event", event);
            return event;
          })
        ).then((arr) => {
          setLoading(false);

          setCollectionEventsFull(arr);
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    collectionEventsFull();
  }, []);

  return (
    <>
      <Stack
        direction={{ base: "column", xl: "row" }}
        w="full"
        alignItems="center"
        mb="30px"
      >
        <Heading size="h3" mb="10px">
          Top NFT Collections
        </Heading>

        <Spacer />

        <Text color="brand.grayLight" pr="25px">
          Switch currency
        </Text>

        <IconButton
          mr={0}
          size="icon"
          variant="iconSolid"
          borderColor={!useAzeroUnit ? "#343333" : "#7ae7ff"}
          borderWidth={!useAzeroUnit ? "2px" : "0px"}
          borderRightWidth={"0px"}
          disabled={useAzeroUnit}
          _disabled={{
            bg: "brand.blue",
            cursor: "not-allowed",
          }}
          _hover={{
            bg: useAzeroUnit ? "brand.blue" : "transparent",
          }}
          bg={!useAzeroUnit ? "transparent" : "brand.blue"}
          color={useAzeroUnit ? "brand.grayLight" : "black"}
          display={{ base: "none", xl: "flex" }}
          icon={
            <AzeroIcon
              fill={!useAzeroUnit ? "#888" : "#000"}
              fontSize="24px"
            />
          }
          onClick={() => setUseAzeroUnit(true)}
        />

        <IconButton
          style={{ marginLeft: 0 }}
          size="icon"
          variant="iconSolid"
          borderWidth={useAzeroUnit ? "2px" : "0px"}
          borderColor={!useAzeroUnit ? "#7ae7ff" : "#343333"}
          borderLeftWidth={"0px"}
          disabled={!useAzeroUnit}
          _disabled={{
            bg: "brand.blue",
            cursor: "not-allowed",
          }}
          _hover={{
            bg: !useAzeroUnit ? "brand.blue" : "transparent",
          }}
          bg={!useAzeroUnit ? "brand.blue" : "transparent"}
          color={!useAzeroUnit ? "black" : "brand.grayLight"}
          display={{ base: "none", xl: "flex" }}
          icon={<FaDollarSign fontSize="20px" />}
          onClick={() => setUseAzeroUnit(false)}
        />
      </Stack>

      <StatsTable
        tableHeaders={headers}
        tableData={collectionEventsFull
          ?.filter((i) => i.type === "PURCHASE")
          .slice(0, 10)}
      />
    </>
  );
}

export default TopCollectionsTab;

const headers = {
  index: "#",
  collectionName: "collection",
  marketCap: "market cap",
  vol7Day: "7d volume",
  averagePrice24h: "average price(24h)",
  floorPrice: "floor price",
};

const getMetaDataType1 = async (tokenID, token_uri) => {
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
};

const topCollections = [
  {
    _id: "629f3f46eb389977988f6c97",
    blockNumber: 3435150,
    buyer: "5Dm2W4ngPtmswk7CkoHUjwymbEVkMJ2WSZoVgEyYAqcdvGaL",
    seller: "5Hj3vEWoDmisuPEDv7SeunXx2bigXwRKComqFS89qo9GPF5v",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 26,
    price: 50000,
    platformFee: 2500,
    royalFee: 2500,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629cd9ba3da84db7536721c7",
    blockNumber: 3278092,
    trader: "5Hj3vEWoDmisuPEDv7SeunXx2bigXwRKComqFS89qo9GPF5v",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 26,
    price: 50000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629cd9733da84db75367214c",
    blockNumber: 3278021,
    buyer: "5Hj3vEWoDmisuPEDv7SeunXx2bigXwRKComqFS89qo9GPF5v",
    seller: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 26,
    price: 25000,
    platformFee: 875,
    royalFee: 1250,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "6298d7035d2daf574cf8623d",
    blockNumber: 3015263,
    buyer: "5ERnCJCSPKhU5E1t45dSSjzG2D4kagUQZosPd9Wjd8gXDn5U",
    seller: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 22,
    price: 15000,
    platformFee: 525,
    royalFee: 750,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "6297772f5d2daf574cf5b17a",
    blockNumber: 2925203,
    buyer: "5Cns541mwffMugwjmomeevNzYNaMD4NYbLTKMpbQx7ifQboT",
    seller: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 47,
    price: 3000,
    platformFee: 150,
    royalFee: 150,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629751615d2daf574cf565b5",
    blockNumber: 2915524,
    buyer: "5Dtf71xr6v7xsYrgPiMg36K1weqvSQ57Y87mpUE5fiaNbhnJ",
    seller: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 30,
    price: 4020,
    platformFee: 201,
    royalFee: 201,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629750775d2daf574cf563db",
    blockNumber: 2915291,
    buyer: "5Dtf71xr6v7xsYrgPiMg36K1weqvSQ57Y87mpUE5fiaNbhnJ",
    seller: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 32,
    price: 1901,
    platformFee: 95.05,
    royalFee: 95.05,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "62974a7b5d2daf574cf557df",
    blockNumber: 2913758,
    trader: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 32,
    price: 1901,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "6297452f5d2daf574cf54d44",
    blockNumber: 2912403,
    trader: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 30,
    price: 4020,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629743355d2daf574cf5494c",
    blockNumber: 2911897,
    trader: "5GC438eifKW2A42KRhnawiDkdEdwRW8Z8hw9oTuwzJzxVzAg",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 47,
    price: 3000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "6296bbe85d2daf574cf4439f",
    blockNumber: 2877262,
    buyer: "5E5DqefVu5XDtdqaVXEWQR6biWGAh3Pej4eoAE8gUmj51bX8",
    seller: "5HEfkXr7AGNSzVBVYsEGAh6TByv64v1qnZ2nztYpwBWVj9px",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 3,
    price: 9000,
    platformFee: 450,
    royalFee: 450,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629697a05d2daf574cf40712",
    blockNumber: 2867974,
    trader: "5CFa1zKeFytbm54MNXvQRowZLpyMjtkW7RfnTEjd9iJZ1mmA",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    __v: 0,
    type: "UNLIST",
  },
  {
    _id: "629697855d2daf574cf406e1",
    blockNumber: 2867947,
    trader: "5CFa1zKeFytbm54MNXvQRowZLpyMjtkW7RfnTEjd9iJZ1mmA",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 8500,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629696495d2daf574cf404d0",
    blockNumber: 2867631,
    buyer: "5CFa1zKeFytbm54MNXvQRowZLpyMjtkW7RfnTEjd9iJZ1mmA",
    seller: "5EPJDQFzrvSjRDpsmjh8pMG6TXnEph6CAw6VkyuBC7jSD9PX",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 8500,
    platformFee: 425,
    royalFee: 425,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629695425d2daf574cf40315",
    blockNumber: 2867368,
    trader: "5EPJDQFzrvSjRDpsmjh8pMG6TXnEph6CAw6VkyuBC7jSD9PX",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 8500,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629694b75d2daf574cf4022a",
    blockNumber: 2867228,
    buyer: "5EPJDQFzrvSjRDpsmjh8pMG6TXnEph6CAw6VkyuBC7jSD9PX",
    seller: "5FnoLvxrC6pKSLuewU7VtZC8K6RoNhWyCtqtkwewWRvf8Dwo",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 4000,
    platformFee: 200,
    royalFee: 200,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629690cd5d2daf574cf3fb96",
    blockNumber: 2866226,
    buyer: "5G1xt2NHDY6U1CX6cqYgVCngnZy2sbuSXVQb7JEPfmXZPWFJ",
    seller: "5FnoLvxrC6pKSLuewU7VtZC8K6RoNhWyCtqtkwewWRvf8Dwo",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 39,
    price: 4000,
    platformFee: 200,
    royalFee: 200,
    __v: 0,
    type: "PURCHASE",
  },
  {
    _id: "629682555d2daf574cf3e367",
    blockNumber: 2862523,
    trader: "5FnoLvxrC6pKSLuewU7VtZC8K6RoNhWyCtqtkwewWRvf8Dwo",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 39,
    price: 4000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "6296823c5d2daf574cf3e33b",
    blockNumber: 2862498,
    trader: "5FnoLvxrC6pKSLuewU7VtZC8K6RoNhWyCtqtkwewWRvf8Dwo",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 4000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629681c55d2daf574cf3e26a",
    blockNumber: 2862379,
    trader: "5Dsc5T4BtekkAtUsRAgBPkY6iDghvBL2ZLwnx7gZ1zaA5hs5",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 18,
    price: 5000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629677025d2daf574cf3d061",
    blockNumber: 2859624,
    trader: "5H8tZo4yrHQmCwLDDJxrHdUqUbwE4LvDeUykpbKtkmoqs2QD",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 39,
    price: 9000,
    __v: 0,
    type: "LIST",
  },
  {
    _id: "629660415d2daf574cf3aa3e",
    blockNumber: 2853799,
    trader: "5C55k8MmRK8CsE4ZxKNdZiokK712ycb13j8pyxQaNCV5FMsR",
    nftContractAddress: "5EfKvaMCy2HVARaFGxL8pY6j3qPgMiCaudeGazMQqBHMCYfH",
    tokenID: 15,
    __v: 0,
    type: "UNLIST",
  },
];
