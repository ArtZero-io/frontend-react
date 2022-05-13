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
      px={{ base: "3", "2xl": "24" }}
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
        py={{
          base: "12",
          md: "2.875rem",
        }}
        justify="space-between"
        fontSize="sm"
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
          w={{
            base: "full",
            lg: "full",
          }}
          justify={{
            base: "space-between",
            lg: "flex-start",
          }}
          align="center"
        >
          <Box h="1.75rem" minW="12.0625rem">
            <ArtZeroLogo alt="AzeroLogo" />
          </Box>
          <Box pt={5} display={{ base: "block", xl: "none" }}>
            <SocialCard profile={profile} mt={3} />
          </Box>

          <VStack w="full">
            <Heading size="h6" color="brand.blue" mt="2">
              Discover, collect and trade NFTs on artzero
            </Heading>
            <Text pt={{ base: 3, xl: "auto" }}>
              &copy; Copyright {new Date().getFullYear()} ArtZero. All Rights
              Reserved
            </Text>
          </VStack>
        </Stack>

        <Box
          mx="auto"
          pt={{ base: 5, "2xl": "auto" }}
          display={{ base: "none", xl: "block" }}
        >
          <Flex
            justifyContent={{
              base: "center",
              lg: "space-between",
            }}
            align="center"
          >
            <Heading size="h6" mr="4" fontSize="15px" fontStyle="normal">
              Contact
            </Heading>

            <SocialCard profile={profile} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  </Box>
);
