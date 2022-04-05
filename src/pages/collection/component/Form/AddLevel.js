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

function AddLevel({ data }) {
  return (
    <Box py={6} borderBottomWidth={2}>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size='lg' fontWeight='400'>Levels</Heading>
          <Text>Textural trails that show up as restangles</Text>
        </VStack>
        <Spacer />
        <Button variant="outline" color="brand.blue">
          Add Levels
        </Button>
      </Flex>

      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Name</Text>
        </Box>
        <Box mb={4} flexBasis="content" minW={72} textAlign="left" pl={3}>
          <Text>Value</Text>
        </Box>

        <Box w={14} />
      </Flex>

      {data?.map((item) => (
        <Flex alignItems="center" mb={4}>
          <Box flexGrow={1} textAlign="left" pl={3}>
            <Text>{item.name}</Text>
          </Box>

          <Box textAlign="left" pl={3} minW={32}>
            <Text>{item.value}</Text>
          </Box>
          <Text>of</Text>

          <Box flexBasis="content" textAlign="left" pl={3} minW={32}>
            <Text>{item.of}</Text>
          </Box>

          <Button variant="icon" borderWidth={2}>
            <Circle size="3.125rem">
              <DeleteIcon fontSize="1.5rem" />
            </Circle>
          </Button>
        </Flex>
      ))}

      <Flex alignItems="center" mb={4}>
        <CommonInput flexGrow="1" name="name" type="text" placeholder="name" />
        <CommonInput
          flexBasis="content"
          name="value"
          type="text"
          placeholder="value"
        />
        <Text>of</Text>
        <CommonInput
          flexBasis="content"
          name="of"
          type="text"
          placeholder="of"
        />
        <Button variant="icon" borderWidth={2}>
          <Circle size="3.125rem">
            <AddIcon fontSize="1.5rem" />
          </Circle>
        </Button>
      </Flex>
    </Box>
  );
}

export default AddLevel;
