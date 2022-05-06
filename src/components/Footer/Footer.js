import { Box, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";

import { ArtZeroLogo } from "../../theme/assets/logo/ArtZeroLogo";
import SocialCard from "@components/Card/Social";
const profile = [
  { discord: "https://discord.gg/wzkZ2JTvN4" },
  { twitter: "https://twitter.com/ArtZero_io" },
  { medium: "https://medium.com/@artzero_io" },
  { telegram: "https://t.me/artzero_io" },
  { mail: "mailto:admin@artzero.io" },
];
export const Footer = () => (
  <Box as="footer" bg="transparent">
    <Box
      maxW={{
        base: "xl",
        md: "full",
      }}
      mx="auto"
      px={{ xl: "1", "2xl": "24" }}
    >
      <Flex
        borderTopWidth="2px"
        borderColor="#292929"
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          base: "flex-start",
          lg: "center",
        }}
        justify="space-between"
        fontSize="sm"
        py={{
          base: "12",
          md: "2.875rem",
        }}
      >
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          spacing={{
            base: "4",
            md: "12",
          }}
          mt={{
            base: "8",
            lg: 0,
          }}
          w={{
            base: "full",
            lg: "full",
          }}
          justify={{
            base: "space-between",
            lg: "flex-start",
          }}
          align={{
            base: "flex-start",
            md: "center",
          }}
        >
          <Box h="1.75rem" minW="12.0625rem">
            <ArtZeroLogo alt="AzeroLogo" />
          </Box>

          <VStack w="full">
            <Heading size="h6" color="brand.blue" mt="2">
              Discover, collect and trade NFTs on artzero
            </Heading>
            <Text>
              &copy; Copyright {new Date().getFullYear()} artZero. All Rights
              Reserved
            </Text>
          </VStack>
        </Stack>
        <Box>
          <Flex justifyContent="space-between" align="center">
            <Heading
              display={{ base: "none", xl: "block" }}
              size="h6"
              mr="4"
              fontSize="15px"
              fontStyle="normal"
            >
              Contact
            </Heading>
            <SocialCard profile={profile} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);
