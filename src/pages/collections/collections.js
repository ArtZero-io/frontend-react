import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";

import React, { useEffect, useMemo, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import Dropdown from "@components/Dropdown/Dropdown";
import PaginationMP from "@components/Pagination/Pagination";

import { NUMBER_PER_PAGE } from "@constants/index";
import GridA from "../../components/Grid/GridA";
import { useHistory } from "react-router-dom";
import { APICall } from "../../api/client";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  const history = useHistory();

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
    let isSubscribed = true;
    const fetchCollections = async () => {
      const options = {
        limit: pageSize,
        offset: offset,
        sort: -1,
        isActive: true,
      };

      try {
        const { ret: totalCollections } = await APICall.getCollectionCount();

        setTotalCollectionsCount(totalCollections);

        if (selectedItem === 0) {
          const { ret: collectionsList } = await APICall.getAllCollections(
            options
          );

          setCollections(collectionsList);
        }

        if (selectedItem === 1) {
          const { ret: totalCollectionsFilterByVolume } =
            await APICall.getCollectionsByVolume(options);

          setCollections(totalCollectionsFilterByVolume);
        }
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    const fetchFeaturedCollections = async () => {
      try {
        const { ret: featCollectionsAddrList, status } =
          await APICall.getFeaturedCollections();

        if (status !== "OK" || featCollectionsAddrList?.length === 0) {
          return setFeaturedCollections([]);
        }

        Promise.all(
          featCollectionsAddrList.map(async (collection_address) => {
            const { ret, status } = await APICall.getCollectionByAddress({
              collection_address,
            });

            if (status === "OK") {
              const collectionByAddress = ret[0];
              return collectionByAddress;
            }
          })
        ).then((resultsArr) => {
          isSubscribed && setFeaturedCollections(resultsArr);
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
    return () => (isSubscribed = false);
  }, [offset, pageSize, selectedItem]);

  const scrollToCollectionAddress = useMemo(() => {
    if (history.action !== "POP") {
      return;
    }

    const persistedId = sessionStorage.getItem(
      "scroll-position-collection-nft-contract-address"
    );

    sessionStorage.removeItem(
      "scroll-position-collection-nft-contract-address"
    );

    const prevCurrentPage = sessionStorage.getItem(
      "scroll-position-current-page"
    );

    if (prevCurrentPage) {
      setCurrentPage(prevCurrentPage);
      sessionStorage.removeItem("scroll-position-current-page");
    }
    return persistedId ? persistedId : null;
  }, [history.action, setCurrentPage]);

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

          {featuredCollections?.length ? (
            <>
              <Box as="section" w="full">
                <Box
                  mx="auto"
                  maxW="1240px"
                  px={{ base: "22px", "2xl": "0" }}
                  pt={{ base: "12", "2xl": "20" }}
                >
                  <Heading
                    my="5rem"
                    textAlign="center"
                    fontSize={["3xl-mid", "5xl", "5xl"]}
                  >
                    featured collections
                  </Heading>{" "}
                  <GridA
                    collections={featuredCollections}
                    variant="marketplace-collection"
                  />
                </Box>
              </Box>
            </>
          ) : null}

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
              <Heading
                my="5rem"
                textAlign="center"
                fontSize={["3xl-mid", "5xl", "5xl"]}
              >
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
                      minW="195px"
                      options={options}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  </Flex>

                  {collections?.length ? (
                    <GridA
                      collections={collections}
                      variant="marketplace-collection"
                      scrollToCollectionAddress={scrollToCollectionAddress}
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
