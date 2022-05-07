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
          <Box as="section" maxW="container.3xl" position="relative">
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
                {/* <InputGroup
                  mx="auto"
                  maxW="container.md"
                  w="full"
                  bg="white"
                  h={14}
                  py={1}
                  color="blackAlpha.900"
                  borderRadius="0"
                >
                  <InputRightElement bg="brand.blue" h="full" w={16}>
                    <FiSearch size="22px" />
                  </InputRightElement>
                  <Input
                    variant="unstyled"
                    my={1}
                    pl={5}
                    bg="white"
                    placeholder="Search items, collections, and accounts"
                    _placeholder={{
                      color: "blackAlpha.900",
                      fontSize: "lg",
                    }}
                  />
                </InputGroup> */}
              </Box>
            </Box>
          </Box>

          <Box as="section" maxW="container.3xl">
            <Box
              mx="auto"
              maxW={{ base: "auto", "2xl": "7xl" }}
              px={{ base: "8", "2xl": "4" }}
              py={{ base: "12", "2xl": "20" }}
            >
              {collections?.length ? (
                <>
                  <Flex w="full" alignItems="end">
                    <PaginationMP
                      pagesCount={pagesCount}
                      isDisabled={isDisabled}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                    <Spacer />
                    <Dropdown
                      options={options}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                    />
                  </Flex>

                  {collections?.length ? (
                    <GridA bg='yellow'
                      collections={collections}
                      variant="marketplace-collection"
                    />
                  ) : null}

                  {/* <SimpleGrid
                    py={16}
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing="8"
                  >
                    {collections
                      ?.filter((i) => i.isActive)
                      .map((item) => (
                        <React.Fragment key={item?.index}>
                          <Link
                            as={ReactRouterLink}
                            to={`${ROUTES.DETAIL_COLLECTION_BASE}/${item?.nftContractAddress}`}
                            style={{ textDecoration: "none" }}
                          >
                            <CollectionCard {...item} />
                          </Link>
                        </React.Fragment>
                      ))}
                  </SimpleGrid> */}

                  <Flex w="full" alignItems="end">
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
