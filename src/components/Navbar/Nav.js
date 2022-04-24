import React from "react";
import { Box, Flex, Image, VisuallyHidden } from "@chakra-ui/react";
import { NavContent } from "./NavContent";
import AzeroLogo from "../../theme/assets/logo/ArtZeroFull_Logo.png";

function Nav() {
  return (
    <Box
      minHeight={28}
      bg="linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(23,23,23,0.8827906162464986) 31%, rgba(23,23,23,0.7) 52%, rgba(23,23,23,0.35898109243697474) 69%, rgba(23,23,23,0) 100%)"
    >
      <Flex
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
      </Flex>
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
