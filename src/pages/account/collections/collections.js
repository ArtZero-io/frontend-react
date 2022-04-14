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

import { useEffect, useState, useCallback } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import { useSelector } from "react-redux";

import { CollectionCard } from "@components/Card/Collection";
import PaginationMP from "@components/Pagination/Pagination";

import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "@utils/substrate";
import { delay } from "@utils";

import { NUMBER_PER_PAGE, IPFS_BASE_URL } from "@constants/index";
import * as ROUTES from "@constants/routes";

import AddNewCollectionModal from "./components/Modal/AddNew";

function MyCollectionsPage() {
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [collections, setCollections] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [, setCurrentCollections] = useState([]);

  
  const { pagesCount, offset, currentPage, setCurrentPage, isDisabled } =
    usePagination({
      total: totalPage,
      initialState: {
        pageSize: NUMBER_PER_PAGE,
        isDisabled: false,
        currentPage: 1,
      },
    });

  const getAllCollections = useCallback(async (e) => {
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
          data?.nftContractAddress,
          ["name", "description", "avatar_image", "header_image"]
        );

        data.attributes = attributes;
        collections.push(data);
      }
    }

    
    setTotalPage(collections.length);
    setCollections(collections);
    setLoading(false);
  }, []);

  const filterCollections = useCallback(async (e) => {
    setLoading(true);

    
    let currentCollections = [];

    for (var i = offset; i < offset + NUMBER_PER_PAGE; i++) {
      if (collections[i]) {
        currentCollections.push(collections[i]);
      }
    }

    setCurrentCollections(currentCollections);
    setLoading(false);
  }, []);

  const onRefresh = useCallback(async () => {
    await getAllCollections();
    await delay(1000);
    await filterCollections();
  }, []);

  const forceUpdate = useCallback(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetch() {
      await onRefresh();
    }

    fetch();
  }, [activeAddress, onRefresh]);

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
            {console.log(collections)}
            <Text textAlign="left" color="brand.grayLight">
              There are {collections?.length} collections
            </Text>
            {collections.length ? (
              <SimpleGrid
                py={10}
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing="7"
              >
                {collections?.map((item) => (
                  <>
                    <Link
                      minW={{ base: "auto", "2xl": "25rem" }}
                      key={item?.nftContractAddress}
                      as={ReactRouterLink}
                      to={`${ROUTES.DETAIL_COLLECTION_BASE}/${item?.nftContractAddress}`}
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
              </SimpleGrid>
            ) : null}

            {collections.length ? (
              <Flex w="full">
                <PaginationMP
                  isDisabled={isDisabled}
                  currentPage={currentPage}
                  pagesCount={pagesCount}
                  setCurrentPage={setCurrentPage}
                />
                <Spacer />
              </Flex>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  );
}

export default MyCollectionsPage;
