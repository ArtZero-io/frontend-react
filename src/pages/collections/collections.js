import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import Layout from "@components/Layout/Layout";
// import Collections from "@components/Collections/Collections";
import { CollectionCard } from "../../components/CollectionCard/CollectionCard";
import { FiSearch } from "react-icons/fi";
import { Link as ReactRouterLink } from "react-router-dom";

const CollectionsPage = () => {
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
            <Heading
              size="2xl"
              letterSpacing="wider"
              fontWeight="normal"
              mb="9"
            >
              Explore collections
            </Heading>
            <InputGroup
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
            </InputGroup>
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
          <Flex w="full">
            <FormControl
              id="collection-type"
              display="flex"
              justifyContent="end"
            >
              <Select
                maxW="3xs"
                bg="brand.grayDark"
                borderRadius="0"
                border="none"
                _option={{
                  borderRadius: "0",
                }}
              >
                <option
                  style={{
                    background: "#222",
                    borderRadius: "0",
                    margin: "4px",
                  }}
                >
                  Trending
                </option>
                <option
                  style={{
                    background: "#222",
                    borderRadius: "0",
                    margin: "4px",
                  }}
                >
                  Hottest
                </option>
                <option
                  style={{
                    background: "#222",
                    borderRadius: "0",
                    margin: "4px",
                  }}
                >
                  New Release
                </option>
              </Select>
            </FormControl>
          </Flex>

          <SimpleGrid py={16} columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
            {collectionsList.map((item, idx) => (
              <>
                <Link
                  key={item.id}
                  as={ReactRouterLink}
                  to={`collectionNew/${item.id}`}
                  className="collection-card-hover"
                  _hover={{
                    bg: "brand.blue",
                  }}
                >
                  <CollectionCard
                    id={item.id}
                    volume={item.volume}
                    backdrop={item.backdrop}
                    avatar={item.avatar}
                    desc={item.description}
                    name={item.name}
                  />
                </Link>
              </>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Layout>
  );
};

export default CollectionsPage;

const collectionsList = [
  {
    id: "11",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "12",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "13",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "14",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "14",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "15",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "16",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
    name: "Degenerate Trash Pandas",
  },

  {
    id: "17",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    id: "18",
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fsolpunkspreview.webp&w=256&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },
];
