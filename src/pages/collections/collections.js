import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import Dropdown from "@components/Dropdown/Dropdown";
import PaginationMP from "@components/Pagination/Pagination";

import { NUMBER_PER_PAGE } from "@constants/index";
import { clientAPI } from "@api/client";
import GridA from "../../components/Grid/GridA";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const options = ["All collections", "Trending"];
  // 0 All, 1 Vol

  const {
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    offset,
    pageSize,
  } = usePagination({
    total: totalCollectionsCount,
    initialState: {
      pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });

  useEffect(() => {
    const fetchCollections = async () => {
      const options = {
        limit: pageSize,
        offset: offset,
        sort: -1,
        isActive: true,
      };

      try {
        const totalCollections = await clientAPI("get", "/getCollectionCount");
        setTotalCollectionsCount(totalCollections);

        if (selectedItem === 0) {
          const collectionsList = await clientAPI(
            "post",
            "/getCollections",
            options
          );
          setCollections(collectionsList);
        }

        if (selectedItem === 1) {
          const totalCollectionsFilterByVolume = await clientAPI(
            "post",
            "/getCollectionsByVolume",
            options
          );

          setCollections(totalCollectionsFilterByVolume);
        }
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    const fetchFeaturedCollections = async () => {
      try {
        const featuredCollectionsAddressList = await clientAPI(
          "get",
          "/getFeaturedCollections"
        );

        Promise.all(
          featuredCollectionsAddressList.map(async (collection_address) => {
            const [collectionByAddress] = await clientAPI(
              "post",
              "/getCollectionByAddress",
              { collection_address }
            );
            return collectionByAddress;
          })
        ).then((resultsArr) => {
          return setFeaturedCollections(resultsArr);
        });
      } catch (error) {
        console.log(error);

        toast.error(
          "There was an error while fetching the featured collections."
        );
      }
    };

    fetchFeaturedCollections();
    fetchCollections();
  }, [offset, pageSize, selectedItem]);

  return (
    <Layout variant="marketplace">
      {!collections || (collections && collections.length <= 0) ? (
        <Center mt={"20"}>
          {/* <Heading size="h5" color="lightOrange">
            We don't have any collections at the moment. Please stay tune and
            come back later.
          </Heading>
           */}
        </Center>
      ) : (
        <>
          {/* TEMP ONLY */}
          <Box
            hidden
            as="section"
            // maxW="container.3xl"
            w="full"
            position="relative"
          >
            <Box
              mx="auto"
              maxW={{ base: "auto", "2xl": "7xl" }}
              px={{ base: "8", "2xl": "4" }}
              py={{ base: "8", "2xl": "20" }}
            >
              <Box textAlign="center" mt={"10"}>
                <Heading size="h1" mb="9">
                  Explore collections
                </Heading>
              </Box>
            </Box>
          </Box>

          <Box
            as="section"
            // maxW="container.3xl"
            w="full"
          >
            <Box
              mx="auto"
              maxW="1240px"
              px={{ base: "22px", "2xl": "0" }}
              pt={{ base: "12", "2xl": "20" }}
            >
              <Heading size="h2" my="5rem" textAlign="center">
                Featured collections
              </Heading>
              <>
                {featuredCollections?.length ? (
                  <GridA
                    collections={featuredCollections}
                    variant="marketplace-collection"
                  />
                ) : null}
              </>
            </Box>
          </Box>

          <Box
            as="section"
            // maxW="container.3xl"
            w="full"
          >
            <Box
              mx="auto"
              maxW="1240px"
              px={{ base: "22px", "2xl": "0" }}
              pt="80px"
              pb="100px"
              // py={{ base: "12", "2xl": "20" }}
            >
              <Heading size="h2" my="5rem" textAlign="center">
                All collections
              </Heading>
              {collections?.length ? (
                <>
                  <Flex
                    w="full"
                    pb="16px"
                    alignItems={{ base: "start", md: "end" }}
                    direction={{ base: "column", md: "row" }}
                  >
                    <PaginationMP
                      pagesCount={pagesCount}
                      isDisabled={isDisabled}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                    <Spacer my={{ base: "3", "2xl": "auto" }} />
                    <Dropdown
                      options={options}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  </Flex>

                  {collections?.length ? (
                    <GridA
                      collections={collections}
                      variant="marketplace-collection"
                    />
                  ) : null}

                  <Flex w="full" alignItems="end" pt="20px">
                    <PaginationMP
                      isDisabled={isDisabled}
                      currentPage={currentPage}
                      pagesCount={pagesCount}
                      setCurrentPage={setCurrentPage}
                    />
                    <Spacer />
                  </Flex>
                </>
              ) : null}
            </Box>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default CollectionsPage;
