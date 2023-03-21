/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Flex, Link, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
import { ArtZeroLogo } from "@theme/assets/logo/ArtZeroLogo";
import { Link as ReactRouterLink } from "react-router-dom";

function Nav() {
  return (
    <Box
      as="header"
      height={["80px", "90px", "90px"]}
      bg="transparent"
      position="relative"
      py={["15px", "20px", "20px"]}
    >
      <Box height="100%" mx="auto" px={{ base: "10px", "2xl": "100px" }}>
        <Flex
          as="nav"
          position="relative"
          aria-label="Site navigation"
          align="center"
          justify="center"
          height="100%"
          w="full"
          h="full"
        >
          <Link as={ReactRouterLink} to="/" rel="home">
            <VisuallyHidden>ArtZero.io</VisuallyHidden>
            <ArtZeroLogo
              display={{ base: "none", md: "flex" }}
              alt="ArtZeroLogo"
            />
          </Link>
          <NavContent.Mobile />
          <NavContent.Desktop />
        </Flex>
      </Box>
    </Box>
  );
}

export default Nav;
