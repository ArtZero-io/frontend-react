import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaDiscord } from "react-icons/fa";
import { EditIcon } from "@chakra-ui/icons";
import AccountTab from "./components/AccountTab";

function Account() {
  const [profile] = useState(accountData);

  const { avatar, name, description } = profile;

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" px={5} position="relative">
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
              w={32}
              h={32}
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

            <HStack w="full" justifyContent="space-around" py={4}>
              <VStack textAlign="center" justifyContent="space-between">
                <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
                  {name}
                  <Button variant="icon" bg="transparent">
                    <Circle size="3.125rem">
                      <EditIcon size="3rem" />
                    </Circle>
                  </Button>
                </Heading>

                <Text maxW="md">{description}</Text>
                <HStack textAlign="center">
                  <Button variant="icon" borderRadius="full">
                    <Circle size="3.125rem">
                      <FaInstagram size="1.5rem" />
                    </Circle>
                  </Button>
                  <Button variant="icon" borderRadius="full">
                    <Circle size="3.125rem">
                      <FaTwitter size="1.5rem" />
                    </Circle>
                  </Button>
                  <Button variant="icon" borderRadius="full">
                    <Circle size="3.125rem">
                      <FaDiscord size="1.5rem" />
                    </Circle>
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <AccountTab/>
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
