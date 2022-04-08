import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
  Link,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
// import AzeroIcon from "@theme/assets/icon/Azero.png";

import { CollectionCard } from "@components/CollectionCard/CollectionCard";
import { Link as ReactRouterLink } from "react-router-dom";
import PaginationMP from "@components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { delay } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "@utils/substrate";
import { NUMBER_PER_PAGE } from "@constants/index";
import { usePagination } from "@ajna/pagination";
import { IPFS_BASE_URL } from "@constants/index";
import AddNewCollection from "./Modal/AddNewCollection";

function TabMyCollections() {
  const { currentAccount } = useSubstrateState();
  const [collections, setCollections] = useState([]);
  const [totalPage, setTotalPage] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [currentCollections, setCurrentCollections] = useState([]);

  const {
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    isDisabled,
    // pageSize,
  } = usePagination({
    total: totalPage,
    initialState: {
      pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });

  const getAllCollections = async (e) => {
    setLoading(true);
    var collections = [];
    let collection_account =
      await collection_manager_calls.getCollectionsByOwner(
        currentAccount,
        currentAccount?.address
      );
    if (collection_account) {
      for (let collection of collection_account) {
        let data = await collection_manager_calls.getCollectionByAddress(
          currentAccount,
          collection
        );
        let attributes = await collection_manager_calls.getAttributes(
          currentAccount,
          data.nftContractAddress,
          ["name", "description", "avatar_image", "header_image"]
        );
        data.attributes = attributes;
        collections.push(data);
      }
    }
    setCollections(collections);
    setTotalPage(collections.length);
    setLoading(false);
  };

  const filterCollections = async (e) => {
    setLoading(true);
    let currentCollections = [];
    for (var i = offset; i < offset + NUMBER_PER_PAGE; i++) {
      if (collections[i]) {
        currentCollections.push(collections[i]);
      }
    }
    setCurrentCollections(currentCollections);
    setLoading(false);
  };

  useEffect(async () => {
    await onRefresh();
  }, [currentPage, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getAllCollections();
    await delay(1000);
    await filterCollections();
  };

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
            <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
              My collections
            </Heading>
            <Spacer />
            <AddNewCollection />
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
          {!loading && (
            <>
              <Text textAlign="left" color="brand.grayLight">
                There are {collections.length} collections
              </Text>
              <SimpleGrid
                py={10}
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing="8"
              >
                {fakeCollection}
                {currentCollections.map((item, idx) => (
                  <>
                    <Link
                      key={item?.nftContractAddress}
                      as={ReactRouterLink}
                      to={`collectionNew/${item?.nftContractAddress}`}
                      className="collection-card-hover"
                      _hover={{
                        bg: "brand.blue",
                      }}
                    >
                      <CollectionCard
                        id={item?.nftContractAddress}
                        volume="111"
                        backdrop={`${IPFS_BASE_URL}${item?.attributes[3]}`}
                        avatar={`${IPFS_BASE_URL}${item?.attributes[2]}`}
                        desc={item?.attributes[1]}
                        name={item?.attributes[0]}
                        isActive={item?.isActive}
                        variant="my-collection"
                      />
                    </Link>
                  </>
                ))}
              </SimpleGrid>

              <Flex w="full">
                <PaginationMP
                  isDisabled={isDisabled}
                  currentPage={currentPage}
                  pagesCount={pagesCount}
                  setCurrentPage={setCurrentPage}
                />
                <Spacer />
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default TabMyCollections;

const fake = {
  collectionOwner: "5EfUESCp28GXw1v9CXmpAL5BfoCNW2y4skipcEoKAbN5Ykfn",
  nftContractAddress: "5CjyvL5W1YKYju5F5vyah9LC8gWZcBFrnG1theRViSCp4zCb",
  name: "AlbertCoin",
  description: "AlbertCoin",
  avatarImage:
    "QmSSCnzwXBgwooUoEps4Y1yYv7u9e8YBw2EEzcpvzNnMWP",
  headerImage:
    "QmeSwooLzUbA3hDDBnHrNaavtTjJTN8qni3VdQsgsLk722",
  contractType: "2",
  isCollectRoyalFee: true,
  royalFee: "1",
  isActive: true,
  showOnChainMetadata: true,
};
const fakeCollection = (
  <Link
    key={fake?.nftContractAddress}
    as={ReactRouterLink}
    to={`collectionNew/${fake?.nftContractAddress}`}
    className="collection-card-hover"
    _hover={{
      bg: "brand.blue",
    }}
  >
    <CollectionCard
      id={fake?.nftContractAddress}
      volume="111"
      backdrop={`${IPFS_BASE_URL}${fake?.headerImage}`}
      avatar={`${IPFS_BASE_URL}${fake?.avatarImage}`}
      desc={fake?.description}
      name={fake?.name}
      variant={"my-collection"}
      isActive={false}
    />
  </Link>
);
