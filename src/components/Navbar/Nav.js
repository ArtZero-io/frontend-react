/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Flex, Image, Link, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
// import { ArtZeroLogo } from "@theme/assets/logo/ArtZeroLogo";
import ArtZeroLogo from "@theme/assets/logo/shibuya_logo.png";
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
            <Image
              display={{ base: "none", xl: "block" }}
              src={ArtZeroLogo}
              alt="bg-ArtZeroLogo"
              minWidth={"200px"}
              w={"200px"}
              h="full"
              objectPosition="top"
              objectFit="cover"
              // position="absolute"
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
