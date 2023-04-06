import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import PaginationMP from "@components/Pagination/Pagination";

import { NUMBER_PER_PAGE } from "@constants/index";
import GridA from "../../components/Grid/GridA";
import { useHistory } from "react-router-dom";
import { APICall } from "../../api/client";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);
  const history = useHistory();

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

        const { ret: collectionsList } = await APICall.getAllCollections(
          options
        );

        setCollections(collectionsList);
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
  }, [offset, pageSize]);

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

  const [randomCollections, setRandomCollections] = useState([]);
  const fetchRandomCollections = useCallback(async () => {
    try {
      const { status, ret } = await APICall.getAllCollections({
        limit: 9999,
      });
      if (status === "OK") {
        const randNum = Math.random();
        const rand1 = Math.floor(
          (randNum < 0.3 ? randNum * 2 : randNum) * ret?.length
        );
        const rand2 = Math.floor(rand1 * 0.8);
        const rand3 = Math.floor(rand2 * 0.5);

        const randomList = ret.filter(
          (i, index) => index === rand1 || index === rand2 || index === rand3
        );

        return setRandomCollections(randomList);
      }
    } catch (error) {
      console.log(error);

      toast.error("There was an error while fetching the Random collections.");
    }
  }, []);

  const [trendingCollections, setTrendingCollections] = useState([]);
  const fetchTrendingCollections = useCallback(async () => {
    try {
      const { status, ret } = await APICall.getCollectionsByVolume({
        limit: 6,
        sort: -1,
        isActive: true,
      });

      if (status === "OK") {
        return setTrendingCollections(ret);
      }
    } catch (error) {
      console.log(error);

      toast.error("There was an error while fetching the Random collections.");
    }
  }, []);

  useEffect(() => {
    fetchRandomCollections();
    fetchTrendingCollections();
  }, [fetchRandomCollections, fetchTrendingCollections]);

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

          {randomCollections?.length ? (
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
                    random collections
                  </Heading>{" "}
                  <GridA
                    collections={randomCollections}
                    variant="marketplace-collection"
                  />
                </Box>
              </Box>
            </>
          ) : null}
          {trendingCollections?.length ? (
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
                    trending collections
                  </Heading>{" "}
                  <GridA
                    collections={trendingCollections}
                    variant="marketplace-collection"
                  />
                </Box>
              </Box>
            </>
          ) : null}

          <Box as="section" w="full">
            <Box
              mx="auto"
              maxW="1240px"
              px={{ base: "22px", "2xl": "0" }}
              pt="80px"
              pb="100px"
            >
              <Heading
                my="5rem"
                textAlign="center"
                fontSize={["3xl-mid", "5xl", "5xl"]}
              >
                New collections
              </Heading>
              {collections?.length ? (
                <>
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
