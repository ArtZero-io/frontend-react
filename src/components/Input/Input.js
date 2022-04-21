import React from "react";
import { useField, Field } from "formik";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function SimpleModeInput({ label, height, width, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      mx={1}
      fontSize="lg"
      color="#fff"
      h={height || 28}
      w={width || "full"}
    >
      {label && (
        <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
          {label}
        </FormLabel>
      )}
      <Field
        ml={0}
        pl={2}
        as={Input}
        bg="black"
        autoComplete="off"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={1} fontSize="sm">
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
}
