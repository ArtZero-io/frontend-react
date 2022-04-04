import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
  Link,
  SimpleGrid,
  Spinner,
  Button,
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
    pageSize,
  } = usePagination({
    total: totalPage,
    initialState: {
      pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });

  console.log(pageSize);

  const getAllCollections = async (e) => {
    setLoading(true);
    var collections = [];
    let collection_account = await collection_manager_calls.getCollectionsByOwner(currentAccount, currentAccount?.address);
    if (collection_account) {
      for (let collection of collection_account) {
          let data = await collection_manager_calls.getCollectionByAddress(currentAccount, collection);
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
    console.log(currentCollections);
    setCurrentCollections(currentCollections);
    setLoading(false);
  }

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
      <Box as="section" maxW="container.3xl" px={5}>
        <Box
          mx="auto"
          maxW={{ base: "xl", md: "7xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "12", md: "20" }}
        >
          <Flex w="full" alignItems="end" pb={12}>
            <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
              Explore collections
            </Heading>
            <Spacer />
            <Button variant="outline" color="brand.blue">
              Add collection
            </Button>
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
              <Text textAlign='left' color="brand.grayLight">
              There are {collections.length} collections  
              </Text>
              <SimpleGrid
                py={10}
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing="8"
              >
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
