import React from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";


const MyProjectsPage = () => {

  return (
    <Box as="section" maxW="container.3xl">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My Projects</Heading>
          <Spacer />
        </Flex>
      </Box>
    </Box>
  );
};

export default MyProjectsPage;