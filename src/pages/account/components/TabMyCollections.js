import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
   
  SimpleGrid,
  Spinner,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
// import AzeroIcon from "@theme/assets/icon/Azero.png";

import { CollectionCard } from "@components/CollectionCard/CollectionCard";
// import { Link as ReactRouterLink } from "react-router-dom";
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
  console.log("offset", offset);
  console.log("pageSize", pageSize);

  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getActiveCollectionCount(
      currentAccount
    );
    console.log(res);
    if (res) {
      setTotalPage(res);
    } else {
      setTotalPage(0);
    }
  };

  const getAllCollections = async (e) => {
    setLoading(true);
    var collections = [];
    let attributes = null;
    for (var i = offset; i < offset + NUMBER_PER_PAGE; i++) {
      let collection_address = await collection_manager_calls.getContractById(
        currentAccount,
        i + 1
      );

      if (collection_address) {
        let data = await collection_manager_calls.getCollectionByAddress(
          currentAccount,
          collection_address
        );
        if (data.isActive) {
          attributes = await collection_manager_calls.getAttributes(
            currentAccount,
            data.nftContractAddress,
            ["name", "description", "avatar_image", "header_image"]
          );
          data.attributes = attributes;
          collections.push(data);
        }
      }
    }

    setCollections(collections);
    setLoading(false);
  };

  useEffect(async () => {
    await onRefresh();
  }, [currentPage, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
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
              There are {pagesCount} collections  
              </Text>
              <SimpleGrid
                py={10}
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing="8"
              >
                {collections.map((item, idx) => (
                  <>
                    {/* <Link 
                      key={item?.nftContractAddress}
                      as={ReactRouterLink}
                      to={`collectionNew/${item?.nftContractAddress}`}
                      className="collection-card-hover"
                      _hover={{
                        bg: "brand.blue",
                      }}
                    >*/}
                      <CollectionCard
                        id={item?.nftContractAddress}
                        volume="111"
                        backdrop={`${IPFS_BASE_URL}${item?.attributes[3]}`}
                        avatar={`${IPFS_BASE_URL}${item?.attributes[2]}`}
                        desc={item?.attributes[1]}
                        name={item?.attributes[0]}
                      />
                    {/* </Link> */}
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
