import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";

function CommonStack({ stackTitle, children }) {
  return (
    <Box
      w="full"
      mx="auto"
      bg="#222"
      px="30px"
      py="26px"
      mb="30px"
      maxW="940px"
    >
      <Flex w="full" mb="30px">
        <Heading fontSize={["2xl", "3xl-mid"]}>{stackTitle}</Heading>
        <Spacer />
      </Flex>
      
      {children}
    </Box>
  );
}

export default CommonStack;
