import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState, useCallback } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
// import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { CollectionCard } from "@components/Card/Collection";
// import PaginationMP from "@components/Pagination/Pagination";
import * as ROUTES from "@constants/routes";

import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";
// import { NUMBER_PER_PAGE } from "@constants/index";

import AddNewCollectionModal from "./components/Modal/AddNew";

function MyCollectionsPage() {
  const [collections, setCollections] = useState(null);
  const [owner, setOwner] = useState(null);
  const { currentAccount } = useSubstrateState();

  // const {
  //   pagesCount,
  //   currentPage,
  //   setCurrentPage,
  //   isDisabled,
  //   offset,
  //   pageSize,
  // } = usePagination({
  //   total: totalCollectionsCount,
  //   initialState: {
  //     pageSize: NUMBER_PER_PAGE,
  //     isDisabled: false,
  //     currentPage: 1,
  //   },
  // });

  useEffect(() => {
    const fetchCollectionsOwned = async () => {
      const options = {
        owner: currentAccount.address,
      };

      try {
        const dataList = await clientAPI(
          "post",
          "/getCollectionsByOwner",
          options
        );

        dataList?.length ? setCollections(dataList) : setCollections(null);
        dataList?.length &&
          setOwner(dataList[0].collectionOwner || options.owner);

        } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };
    

    (!collections || owner !== currentAccount?.address) &&
      fetchCollectionsOwned();
  }, [collections, currentAccount, owner]);

  const forceUpdate = useCallback(() => {
    setCollections(null);
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

        <Text textAlign="left" color="brand.grayLight">
          There are {collections?.length || 0} collections
        </Text>
        {collections?.length ? (
          <>
            <SimpleGrid py={10} columns={{ base: 1, md: 2, lg: 3 }} spacing="7">
              {collections?.map((item, idx) => (
                <React.Fragment key={idx}>
                  <Link
                    minW={{ base: "auto", "2xl": "25rem" }}
                    as={ReactRouterLink}
                    to={`${ROUTES.DETAIL_COLLECTION_BASE}/${item?.nftContractAddress}`}
                    className="collection-card-hover"
                    _hover={{
                      bg: "brand.blue",
                    }}
                  >
                    <CollectionCard {...item} variant="my-collection" />
                  </Link>
                </React.Fragment>
              ))}
            </SimpleGrid>
            {/* <Flex w="full">
              <PaginationMP
                isDisabled={isDisabled}
                currentPage={currentPage}
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
              />
              <Spacer />
            </Flex> */}
          </>
        ) : null}
      </Box>
    </Box>
  );
}

export default MyCollectionsPage;
