import React from "react";
import { Checkbox, Flex, FormControl, Text } from "@chakra-ui/react";
import { useField, Field } from "formik";

export default function CommonCheckbox({ label, content, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl color="#fff" fontSize="lg" display="flex" mt={2} minH="3rem">
      <Flex direction="column">
        <Flex w="full">
          <Field
            // pl={2}
            size="lg"
            as={Checkbox}
            colorScheme="teal"
            {...field}
            {...props}
          />
          <Text color="#888" fontSize="md" ml={2}>
            {content}
          </Text>
        </Flex>
        <Flex>
          {meta.touched && meta.error ? (
            <Text textAlign="left" color="#ff8c8c" ml={0} fontSize="sm">
              {meta.error}
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </FormControl>
  );
}
