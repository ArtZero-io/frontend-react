/* eslint-disable no-unused-vars */
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { Card } from "./Card";

export const GroupCard = ({ variant = "live", projectsList }) => {
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
          {projectsList.length ? (
            projectsList.map((p) => <Card key={p.name} project={p} />)
          ) : (
            <HStack justify="center" w="full">
              <Heading size="h6">No project found.</Heading>
            </HStack>
          )}
        </Flex>

        {projectsList.length ? (
          <Flex
            w="full"
            mx="auto"
            mt="60px"
            alignItems="center"
            justifyContent="center"
            direction={{ base: "column", xl: "row" }}
          >
            <Button variant="outline">show more</Button>
          </Flex>
        ) : null}
      </Box>
    </>
  );
};
