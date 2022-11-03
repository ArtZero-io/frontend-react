import React from "react";
import { Checkbox, Flex, FormControl, Text } from "@chakra-ui/react";
import { useField, Field } from "formik";

export default function CommonCheckbox({ label, content, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      color="#fff"
      fontSize="lg"
      display="flex"
      //  minH="3rem" mt={2}
    >
      <Flex direction="column">
        <Flex w="full">
          <Field
            sx={{
              "span.chakra-checkbox__control": {
                borderRadius: "0",
                borderWidth: "0.2px",
                borderColor: "brand.blue",
                backgroundColor: "brand.semiBlack",
              },
              "span.chakra-checkbox__control[data-checked] > div": {
                color: "brand.blue",
              },
            }}
            size="lg"
            as={Checkbox}
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
