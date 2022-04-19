import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { NavContent } from "./NavContent";

const Navbar = () => (
  <Box minHeight="65px" bg="blackAlpha.900">
    <Box
      as="header"
      height={16}
      bg={useColorModeValue("#00a86b", "gray.800")}
      position="relative"
    >
      <Box
        height="100%"
        maxW="7xl"
        mx="auto"
        ps={{ base: "6", md: "8" }}
        pe={{ base: "5", md: "0" }}
      >
        <Flex
          as="nav"
          aria-label="Site navigation"
          align="center"
          justify="space-between"
          height="100%"
        >
          <Box as="a" href="/" rel="home">
            <VisuallyHidden>ArtZero.io</VisuallyHidden>
            <Text>ArtZero.io</Text>
          </Box>
          <NavContent.Desktop display={{ base: "none", md: "flex" }} />
          <NavContent.Mobile display={{ base: "flex", md: "none" }} />
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default Navbar;