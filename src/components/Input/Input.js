import React from "react";
import { useField, Field } from "formik";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function SimpleModeInput({
  label,
  height,
  width,
  isRequired = false,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      isRequired={isRequired}
      mx={1}
      fontSize={["md", "lg", "lg"]}
      color="#fff"
      h={height || 28}
      w={width || "full"}
    >
      {label && (
        <FormLabel
          fontSize={["md", "lg", "lg"]}
          ml={1}
          htmlFor={props.id || props.name}
        >
          {label}
        </FormLabel>
      )}
      <Field
        _placeholder={{
          fontSize: "md",
        }}
        ml={0}
        pl={2}
        as={Input}
        bg="black"
        autoComplete="off"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
}
