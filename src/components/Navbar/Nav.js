import React from "react";
import { Box, Flex, Link, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
import { ArtZeroLogo } from "@theme/assets/logo/ArtZeroLogo";
import { ArtZeroLogoShort } from "@theme/assets/logo/ArtZeroLogoShort";
import { Link as ReactRouterLink } from "react-router-dom";

function Nav({ variant = null }) {
  return (
    // <Box minHeight={{ base: "5rem", xl: 28 }}>
    <Box
      as="header"
      // height={{ base: "5rem", xl: 16 }}
      height="90px"
      bg="transparent"
      position="relative"
      // pt={{ base: 0, xl: 10 }}
      py="20px"
    >
      <Box
        height="100%"
        mx="auto"
        // px={{ xl: "1", "2xl": "24" }}
        px={{ base: "10px", "2xl": "100px" }}
        // px="100px"
      >
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
          height="100%"
        >
          <Link as={ReactRouterLink} to="/" rel="home">
            <VisuallyHidden>ArtZero.io</VisuallyHidden>
            <ArtZeroLogo
              display={{ base: "none", md: "flex" }}
              alt="ArtZeroLogo"
            />
            <ArtZeroLogoShort
              alt="ArtZeroLogoShort"
              display={{ base: "flex", md: "none" }}
            />
          </Link>

          <NavContent.Desktop display={{ base: "none", md: "flex" }} />
          <NavContent.Mobile display={{ base: "flex", md: "none" }} />
        </Flex>
      </Box>
    </Box>
    // </Box>
  );
}

export default Nav;
