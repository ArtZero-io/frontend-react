import * as React from "react";
import { useLocation } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SocialCard from "@components/Card/Social";
import { ArtZeroLogo } from "@theme/assets/logo/ArtZeroLogo";
import { ArtZero_Cookies, ArtZero_Privacy, ArtZero_TOS, ArtZero_Assets } from "../../constants";

const profile = [
  { discord: "https://discord.gg/wzkZ2JTvN4" },
  { twitter: "https://twitter.com/ArtZero_io" },
  { medium: "https://medium.com/@artzero_io" },
  { telegram: "https://t.me/artzero_io" },
  { mail: "mailto:admin@artzero.io" },
];

export const Footer = () => {
  const { pathname } = useLocation();

  return (
    <Box as="footer" bg="transparent">
      <Box
        maxW={{
          base: "xl",
          md: "full",
        }}
        mx="auto"
        px={{ base: "22px", "2xl": "24" }}
      >
        <Flex
          borderTopWidth="2px"
          borderColor={
            pathname.includes("/marketplace") ? "#292929" : "transparent"
          }
          direction={{
            base: "column",
            lg: "row",
          }}
          align={{
            base: "flex-start",
            lg: "center",
          }}
          py={{
            base: "30px",
            md: "2.875rem",
          }}
          justify="space-between"
          fontSize="sm"
        >
          <Stack
            direction={{
              base: "column",
              xl: "row",
            }}
            spacing={{
              base: "4",
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
              <ArtZeroLogo alt="AzeroLogo" height="20px" />
            </Box>
            <Box display={{ base: "block", xl: "none" }}>
              <SocialCard profile={profile} />
            </Box>

            <VStack w="full" zIndex={10}>
              <Heading fontSize={["sm", "lg"]} color="brand.blue" mt="2">
                discover, collect and trade nfts on artzero
              </Heading>
              <Flex w="full" align="center" justifyContent="center">
              <Link
                  mx="20px"
                  textTransform="none"
                  _hover={{
                    textDecoration: "underline",
                    color: "#7ae7ff",
                  }}
                  target="_blank"
                  href={ArtZero_Assets}
                >
                  Brand Assets
                </Link>
                <Link
                  mx="20px"
                  textTransform="none"
                  _hover={{
                    textDecoration: "underline",
                    color: "#7ae7ff",
                  }}
                  href={ArtZero_Cookies}
                >
                  Cookies Policy
                </Link>
                <Link
                  mx="20px"
                  textTransform="none"
                  _hover={{
                    textDecoration: "underline",
                    color: "#7ae7ff",
                  }}
                  href={ArtZero_Privacy}
                >
                  Privacy Policy
                </Link>
                <Link
                  mx="20px"
                  textTransform="none"
                  _hover={{
                    textDecoration: "underline",
                    color: "#7ae7ff",
                  }}
                  href={ArtZero_TOS}
                >
                  Terms of Service
                </Link>
              </Flex>
              <Text
                color="#888"
                fontSize={["sm", "md"]}
                pt={{ base: 3, xl: "auto" }}
              >
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
              <Text
                mr="4"
                size="h6"
                fontSize="15px"
                fontStyle="normal"
                fontFamily="Evogria, sans-serif"
              >
                contact
              </Text>

              <SocialCard profile={profile} />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
