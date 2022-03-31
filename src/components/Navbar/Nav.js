import React from "react";
import { Box, Flex, Image, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
import AzeroLogo from "../../theme/assets/logo/ArtZeroFull_Logo.png";

function Nav() {
  return (
    <Box minHeight={28}>
      <Box as="header" height="16" bg="transparent" position="relative" pt={10}>
        <Box height="100%" mx="auto" px={{ xl: "1", "2xl": "24" }}>
          <Flex
            as="nav"
            aria-label="Site navigation"
            align="center"
            justify="space-between"
            height="100%"
          >
            <Box as="a" href="/" rel="home">
              <VisuallyHidden>ArtZero.io</VisuallyHidden>
              <Image
                alt={AzeroLogo}
                h={7}
                w="auto"
                maxH={64}
                objectFit="cover"
                src={AzeroLogo}
              />
            </Box>
            <NavContent.Desktop display={{ base: "none", md: "flex" }} />
            <NavContent.Mobile display={{ base: "flex", md: "none" }} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Nav;
