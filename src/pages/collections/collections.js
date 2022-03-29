import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Layout from "@components/Layout/Layout";
// import * as ROUTES from "@constants/routes";
// import Collections from "@components/Collections/Collections";
import { CollectionCard } from "../../components/CollectionCard/CollectionCard";

const CollectionsPage = () => {
  return (
    <Layout>
      <Box as="section" maxW="container.3xl" px={5}>
        <Box
          mx="auto"
          maxW={{ base: "xl", md: "7xl" }}
          px={{ base: "6", md: "8" }}
          py={{ base: "12", md: "20" }}
        >
          <Box textAlign="center">
            <Heading size="2xl" letterSpacing="tight" mb="5">
              Explore collections
            </Heading>
          </Box>
          <SimpleGrid py={16} columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
            {collectionsList.map((member, idx) => (
              <CollectionCard
                key={idx}
                volume={member.volume}
                backdrop={member.backdrop}
                avatar={member.avatar}
                desc={member.description}
              />
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
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fgalacticgeckospacegaragepreview.webp&w=96&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },

  {
    avatar:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fsolpunkspreview.webp&w=256&q=75",
    backdrop:
      "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    volume: "11.1b",
  },
];
