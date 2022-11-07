import { Box, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

function CommonStack({ stackTitle, desc, children }) {
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
      <Flex w="full">
        <Heading fontSize={["2xl", "3xl-mid"]}>{stackTitle}</Heading>
        <Spacer />
      </Flex>
      <Stack w="full" mb="30px">
        {desc && (
          <Text fontSize={["xs", "sm"]} color="brand.grayLight">
            {desc}
          </Text>
        )}
      </Stack>
      {children}
    </Box>
  );
}

export default CommonStack;
