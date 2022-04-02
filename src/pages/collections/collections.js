import {
  // FormControl,
  // Input,
  // InputRightElement,
  // InputGroup,
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
// import Collections from "@components/Collections/Collections";
// import { FiSearch } from "react-icons/fi";
import Layout from "@components/Layout/Layout";
import { CollectionCard } from "../../components/CollectionCard/CollectionCard";
import { Link as ReactRouterLink } from "react-router-dom";
import Dropdown from "../../components/Dropdown/Dropdown";
import PaginationMP from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { delay } from "../../utils";
import collection_manager_calls from "../../utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "../../utils/substrate";
import { NUMBER_PER_PAGE } from "../../constants/index";
import { usePagination } from "@ajna/pagination";
let collection_count = 0;

const CollectionsPage = (props) => {
  const { currentAccount } = useSubstrateState();
  const [collectionCount, setCollectionCount] = useState(0);
  const [collections, setCollections] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const {
    pagesCount,
    offset, // => nó là range lấy ID trang 2 thì lấy với pageSize 5 thì lấy từ 5
    // nếu trang 3 thì lấy ID từ 10
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize, // số Item trả về trong mỗi response
  } = usePagination({
    total: totalPage,
    initialState: {
      pageSize: 1,
      // pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });
  console.log("offset", offset);
  console.log("pageSize", pageSize);

/**
 * gọi trong useEffect
 * gọi lần đầu
 * offset = 0 và pageSize = 5 =>
 * Trang 2
 * offset = 1 và pageSize = 5 
 * Call API => fetch.abc.getAllCollections {get ID từ pageSize*offset + 1 là ID #6 đến pageSize*(offset + 1 ) là ID #10} 
 * 
 * offset = 2 và pageSize = 5 =>
 * Call API => fetch.abc.getAllCollections {get ID từ pageSize*offset + 1 là ID #11 đến pageSize*(offset + 1 )  là ID #15}
 * Tương tự
 * offset = 3 và pageSize = 5 =>
 * offset = 4 và pageSize = 5 =>
 * offset = 5 và pageSize = 5 =>
 * 
 * 
 */

  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res) {
      collection_count = res;
      setCollectionCount(res);
      setTotalPage(Math.ceil(res / NUMBER_PER_PAGE));
    } else {
      setCollectionCount(0);
    }
  };
  const getAllCollections = async (e) => {
    var collections = [];
    let startIndex = props.match.params.page;
    console.log("startIndex", startIndex);
    for (var i = 0; i < collection_count; i++) {
      let collection_account = await collection_manager_calls.getContractById(
        currentAccount,
        i + 1
      );
      let data = await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        collection_account
      );
      if (data.isActive) {
        collections.push(data);
      }
    }
    setCollections(collections);
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
      {console.log("collectionCount ", collectionCount)}
      {console.log("collections ", collections)}
      {console.log("totalPage ", totalPage)}
      {console.log("props.match.params.page ", props.match.params.page)}

      <Box as="section" maxW="container.3xl" px={5} position="relative">
        <Box
          mx="auto"
          maxW={{ base: "xl", md: "7xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "12", md: "28" }}
        >
          <Box textAlign="center">
            <Heading
              size="2xl"
              letterSpacing="wider"
              fontWeight="normal"
              mb="9"
            >
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

      <Box as="section" maxW="container.3xl" px={5}>
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
            <Spacer />{" "}
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
                  key={item.nftContractAddress}
                  as={ReactRouterLink}
                  to={`collectionNew/${item.nftContractAddress}`}
                  className="collection-card-hover"
                  _hover={{
                    bg: "brand.blue",
                  }}
                >
                  <CollectionCard
                    id={item.nftContractAddress}
                    volume="111"
                    backdrop={item.headerImage}
                    avatar={item.avatarImage}
                    desc={item.description}
                    name={item.name}
                  />
                </Link>
              </>
            ))}
          </SimpleGrid>

          <Flex w="full" alignItems="end">
            <PaginationMP />
            <Spacer />
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
};

export default CollectionsPage;
// Fake for test
// const fetchPokemons = async (pageSize, offset) => {
//   return await fetch(
//     `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
//   ).then(async (res) => await res.json());
// };
