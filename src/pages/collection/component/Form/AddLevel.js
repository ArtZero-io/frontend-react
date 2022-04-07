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

const AddNewNFTLevelsList = ({ values }) => {
  return (
    <>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size="lg" fontWeight="400">
            Levels
          </Heading>
          <Text>Textural trails that show up as restangles</Text>{" "}
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
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Level</Text>
        </Box>
        <Box w={14} />
      </Flex>
      <FieldArray
        name="levels"
        render={(arrayHelpers) => (
          <div>
            {values.levels.map((level, index) => (
              <div key={index}>
                {/** both these conventions do the same */}
                <Flex alignItems="center" mb={4}>
                  <Field as={Input} bg="black" name={`levels[${index}].name`} />
                  <Field as={Input} bg="black" name={`levels.${index}.level`} />
                  <Field
                    as={Input}
                    bg="black"
                    name={`levels.${index}.maxLevel`}
                  />

                  <Button
                    variant="icon"
                    borderWidth={2}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <Circle size="3.125rem">
                      <DeleteIcon fontSize="1.5rem" />
                    </Circle>
                  </Button>
                </Flex>
              </div>
            ))}

            <Button
              variant="icon"
              borderWidth={2}
              onClick={() =>
                arrayHelpers.push({ name: "", level: "", maxLevel: "" })
              }
            >
              <Circle size="3.125rem">
                <AddIcon fontSize="1.5rem" />
              </Circle>
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default AddNewNFTLevelsList;
