import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function CommonStack({ stackTitle, desc, children }) {
  return (
    <Box w="full" mx="auto" px={["15px", "30px"]} py="26px" mb="30px">
      <Flex w="full" mb="10px">
        <Heading color="#7ae7ff" fontSize={["3xl", "4xl-mid"]}>
          {stackTitle}
        </Heading>
        <Spacer />
      </Flex>
      <Stack w="full" mb="30px">
        {desc && <Text color="#FFF">{desc}</Text>}
      </Stack>
      <Divider bg="#7ae7ff" mb={["20px", "30px"]} />

      {children}
    </Box>
  );
}

export default CommonStack;
