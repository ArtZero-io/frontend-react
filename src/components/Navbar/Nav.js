import React from "react";
import { Box, Flex, Link, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
import AzeroLogo from "../../theme/assets/logo/ArtZeroFull_Logo.png";
import { ArtZeroLogo } from "../../theme/assets/logo/ArtZeroLogo";
import { Link as ReactRouterLink } from "react-router-dom";

function Nav({ variant = null }) {
  return (
    <Box minHeight={28}>
      {/* <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h={28}
        overflow="hidden"
        align="center"
        zIndex="hide"
      >
        <Box position="absolute" w="full" h="full" bg="blackAlpha.10" />
      </Flex> */}
      <Box as="header" height="16" bg="transparent" position="relative" pt={10}>
        <Box height="100%" mx="auto" px={{ xl: "1", "2xl": "24" }}>
          <Flex
            as="nav"
            aria-label="Site navigation"
            align="center"
            justify="space-between"
            height="100%"
          >
            <Link as={ReactRouterLink} to="/" rel="home" ml="2">
              <VisuallyHidden>ArtZero.io</VisuallyHidden>

              <ArtZeroLogo alt={AzeroLogo} />
            </Link>
            <NavContent.Desktop display={{ base: "none", md: "flex" }} />
            <NavContent.Mobile display={{ base: "flex", md: "none" }} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Nav;
