import React from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import CommonInput from "../../../../components/Input/Input";

function AddProperties({ data }) {
  return (
    <Box py={6} borderBottomWidth={2}>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size='lg' fontWeight='400'>properties</Heading>
          <Text>Textural trails that show up as restangles</Text>{" "}
        </VStack>
        <Spacer />
        <Button variant="outline" color="brand.blue">
          Add properties
        </Button>
      </Flex>

      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Type</Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Name</Text>
        </Box>
        <Box w={14} />
      </Flex>

      {data?.map((item) => (
        <Flex alignItems="center" mb={4}>
          <Box flexGrow={1} textAlign="left" pl={3}>
            <Text>{item.type}</Text>
          </Box>
          <Box flexGrow={1} textAlign="left" pl={3}>
            <Text>{item.name}</Text>
          </Box>

          <Button variant="icon" borderWidth={2}>
            <Circle size="3.125rem">
              <DeleteIcon fontSize="1.5rem" />
            </Circle>
          </Button>
        </Flex>
      ))}

      <Flex alignItems="center" mb={4}>
        <CommonInput name="type" type="text" placeholder="Character" />
        <CommonInput name="name" type="text" placeholder="Male" />
        <Button variant="icon" borderWidth={2}>
          <Circle size="3.125rem">
            <AddIcon fontSize="1.5rem" />
          </Circle>
        </Button>
      </Flex>
    </Box>
  );
}

export default AddProperties;
