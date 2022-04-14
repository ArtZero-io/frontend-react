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
import React, { useCallback } from "react";

import { CollectionCard } from "@components/Card/CollectionCard";
import { Link as ReactRouterLink } from "react-router-dom";
import PaginationMP from "@components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { delay } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "@utils/substrate";
import { NUMBER_PER_PAGE } from "@constants/index";
import { usePagination } from "@ajna/pagination";
import { IPFS_BASE_URL } from "@constants/index";
import AddNewCollectionModal from "./components/Modal/AddNew";
import { useSelector } from "react-redux";

function MyCollectionsPage() {
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [collections, setCollections] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentCollections, setCurrentCollections] = useState([]);
  console.log("currentCollections", currentCollections);

  const { pagesCount, offset, currentPage, setCurrentPage, isDisabled } =
    usePagination({
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
    console.log("collection_account", collection_account);
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
    console.log("collections", collections);
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
  }, [activeAddress,currentPage, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getAllCollections();
    await delay(1000);
    await filterCollections();
  };

  console.log("collection ...");

  const forceUpdate = useCallback(() => {
    console.log("forceUpdate...");

    onRefresh();
  }, []);

  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My collections</Heading>
          <Spacer />
          <AddNewCollectionModal forceUpdate={forceUpdate} />
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
              There are {collections?.length} collections
            </Text>
            {collections.length ? <SimpleGrid py={10} columns={{ base: 1, md: 2, lg: 3 }} spacing="7">
              {collections?.map((item, ) => (
                <>
                  <Link
                    minW={{ base: "auto", "2xl": "25rem" }}
                    key={item?.nftContractAddress}
                    as={ReactRouterLink}
                    to={`collectionNew/${item?.nftContractAddress}`}
                    className="collection-card-hover"
                    _hover={{
                      bg: "brand.blue",
                    }}
                  >
                    {/* TODO: add volume */}
                    <CollectionCard
                      id={item?.nftContractAddress}
                      volume={item?.volume || 12.34}
                      backdrop={`${IPFS_BASE_URL}/${item?.attributes[3]}`}
                      avatar={`${IPFS_BASE_URL}/${item?.attributes[2]}`}
                      desc={item?.attributes[1]}
                      name={item?.attributes[0]}
                      isActive={item?.isActive}
                      variant="my-collection"
                    />
                  </Link>
                </>
              ))}
            </SimpleGrid> : null}

            {collections.length ? <Flex w="full">
              <PaginationMP
                isDisabled={isDisabled}
                currentPage={currentPage}
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
              />
              <Spacer />
            </Flex> : null}
          </>
        )}
      </Box>
    </Box>
  );
}

export default MyCollectionsPage;
