import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";

function Account() {
  const [profile] = useState(accountData);

  const { avatar, name, description } = profile;

  return (
    <Layout>
      <Box
        // maxH={96}
        as="section"
        maxW="container.3xl"
        px={5}
        position="relative"
      >
        {/* //Account Hero */}
        <Box
          mx="auto"
          px={{ base: "6", md: "8" }}
          pt={{ base: "12", md: "28" }}
          pb={{ base: "12", md: "20" }}
        >
          <VStack>
            <Center
              rounded="full"
              w={24}
              h={24}
              mt={-8}
              p="-px"
              border="4px solid"
              borderColor="whiteAlpha.900"
            >
              <Image
                alt={avatar}
                w="full"
                h="full"
                rounded="full"
                objectFit="cover"
                src={avatar}
                fallbackSrc="https://via.placeholder.com/64"
              />
            </Center>

            <HStack w="full" justifyContent="space-around" py={9}>
              <VStack textAlign="center">
                <Button variant="transparent">add global offer</Button>
                <Text textDecoration="underine">What is a global offer?</Text>
              </VStack>

              <VStack textAlign="center" justifyContent="space-between">
                <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
                  {name}
                </Heading>

                <Text maxW="md">{description}</Text>
              </VStack>

              <HStack textAlign="center">
                <Button variant="transparent" borderRadius="full" p="0">
                  <FaInstagram size="27" />{" "}
                </Button>
                <Button variant="transparent" borderRadius="full" p="0">
                  <FaTwitter size="27" />{" "}
                </Button>
                <Button variant="transparent" borderRadius="full" p="0">
                  <FaDiscord size="27" />{" "}
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
}

export default Account;

const accountData = {
  id: "18",
  avatar:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fsolpunkspreview.webp&w=256&q=75",
  backdrop:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
  description:
    "The Degenerate Ape Academy is an NFT brand housed on the Solana blockchain. The academy consists of 10,000 degenerate ape NFTs.",
  volume: "11.1b",
  name: "Degenerate Trash Pandas",
};
