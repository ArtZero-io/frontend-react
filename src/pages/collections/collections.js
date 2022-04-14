import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import Layout from "@components/Layout/Layout";
import { CollectionCard } from "@components/Card/Collection";
import { Link as ReactRouterLink } from "react-router-dom";
import Dropdown from "@components/Dropdown/Dropdown";
import PaginationMP from "@components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { delay } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "@utils/substrate";
import { NUMBER_PER_PAGE } from "@constants/index";
import { usePagination } from "@ajna/pagination";
import { IPFS_BASE_URL } from "@constants/index";

const CollectionsPage = (props) => {
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
    // pageSize,
  } = usePagination({
    total: totalPage,
    initialState: {
      pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });

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
            data?.nftContractAddress,
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
    <Layout>
      <Box as="section" maxW="container.3xl" px={5} position="relative">
        <Box
          mx="auto"
          maxW={{ base: "xl", md: "7xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "12", md: "28" }}
        >
          <Box textAlign="center">
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
      <Box as="section" maxW="container.3xl" px={5}>
        {!loading && (
          <Box
            mx="auto"
            maxW={{ base: "xl", md: "7xl" }}
            px={{ base: "6", md: "8" }}
            py={{ base: "12", md: "20" }}
          >
            <Flex w="full" alignItems="end">
              <PaginationMP
                isDisabled={isDisabled}
                currentPage={currentPage}
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
              />
              <Spacer />
              <Dropdown
                maxW="3xs"
                options={["Trending", "Hottest", "New Release"]}
                defaultItem={"Trending"}
              />
            </Flex>

            <SimpleGrid py={16} columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
              {collections.map((item, idx) => (
                <>
                  <Link
                    minW={{ base: "auto", "2xl": "25rem" }}
                    key={item?.nftContractAddress}
                    as={ReactRouterLink}
                    to={`collection/${item?.nftContractAddress}`}
                    className="collection-card-hover"
                    _hover={{
                      bg: "brand.blue",
                    }}
                  >
                    <CollectionCard
                      id={item?.nftContractAddress}
                      volume="11121"
                      backdrop={`${IPFS_BASE_URL}/${item?.attributes[3]}`}
                      avatar={`${IPFS_BASE_URL}/${item?.attributes[2]}`}
                      desc={item?.attributes[1]}
                      name={item?.attributes[0]}
                    />
                  </Link>
                </>
              ))}
            </SimpleGrid>

            <Flex w="full" alignItems="end">
              <PaginationMP
                isDisabled={isDisabled}
                currentPage={currentPage}
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
              />
              <Spacer />
            </Flex>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default CollectionsPage;
