import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { Card } from "./Card";

export const GroupCard = ({ variant = "live" }) => {
  return (
    <>
      <Box
        bg="#171717"
        w="full"
        alignItems="center"
        mx="auto"
        mb="30px"
        maxW="1400px"
        px="77px"
        py="60px"
      >
        <Flex
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          mx="auto"
          mb="40px"
          maxW="1400px"
        >
          <Heading size="h3" mb="10px">
            {variant === "live" && "live projects"}
            {variant === "upcoming" && "upcoming projects"}
            {variant === "ended" && "ended projects"}
          </Heading>

          <Spacer />

          {variant === "live" && <Button variant="solid">add project</Button>}
        </Flex>

        <Flex justifyContent="space-between">
          <Card variant={variant} />
          <Card variant={variant} />
          <Card variant={variant} />
          <Card variant={variant} />
        </Flex>

        <Flex
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mt="60px"
        >
          <Button variant="outline">show more</Button>
        </Flex>
      </Box>
    </>
  );
};
