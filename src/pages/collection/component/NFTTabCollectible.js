import { Avatar, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function NFTTabCollectible() {
  return (
    <HStack>
      <Avatar size="3xl" rounded="none"></Avatar>
      <VStack textAlign="left">
        <Heading>Degen Ape #1234</Heading>
        <Text>Degen Ape #1234</Text>
      </VStack>
    </HStack>
  );
}

export default NFTTabCollectible;
