import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
// import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
// import { delay } from "@utils";
// import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
// import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
// import { numberToU8a, stringToHex } from "@polkadot/util";
// import { IPFS_BASE_URL } from "@constants/index";
// import { ContractPromise } from "@polkadot/api-contract";
// import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
// import { TypeRegistry, U64 } from "@polkadot/types";
// import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import MyNFTGroupCard from "../components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { clientAPI } from "@api/client";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();

  const [myCollections, setMyCollections] = useState([]);

  const [filterSelected, setFilterSelected] = useState(0);

  function onClickHandler(v) {
    console.log("onClickHandler", v);
    setFilterSelected(v);
  }

  useEffect(() => {
    const fetchMyCollections = async () => {
      const allCollectionsOwned = await clientAPI(
        "post",
        "/getCollectionsByOwner",
        {
          owner: currentAccount.address,
        }
      );
      const data = await Promise.all(
        allCollectionsOwned.map(async (collection) => {
          const options = {
            collection_address: collection.nftContractAddress,
            limit: 100,
            offset: 0,
            sort: -1,
          };

          let dataList = await clientAPI("post", "/getNFTs", options);

          if (filterSelected === 1) {
            dataList = dataList.filter((item) => item.is_for_sale === true);
          }

          collection.listNFT = dataList;

          return collection;
        })
      );

      setMyCollections(data);
    };

    fetchMyCollections();
  }, [currentAccount.address, filterSelected]);

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
            isActive={filterSelected === 0}
            variant="outline"
            mx={1}
            id="collected"
            onClick={() => onClickHandler(0)}
          >
            Collected
          </Button>
          <Button
            isActive={filterSelected === 1}
            variant="outline"
            mx={1}
            id="listed"
            onClick={() => onClickHandler(1)}
          >
            My Listing
          </Button>
          <Button
            isActive={filterSelected === 2}
            variant="outline"
            mx={1}
            id="bid"
            onClick={() => onClickHandler(2)}
          >
            My Bids
          </Button>
          <IconButton
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
            onClick={() => setMyCollections(null)}
          />
        </Flex>
        {/* {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )} */}

        {myCollections?.length === 0 ? (
          <VStack py={10} align="start" ml={3} justifyContent="center">
            <Text textAlign="center" color="brand.grayLight" size="2xs">
              You don't have any NFT yet.
            </Text>
          </VStack>
        ) : (
          myCollections?.map((item) => {
            return <MyNFTGroupCard {...item} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default MyNFTsPage;
