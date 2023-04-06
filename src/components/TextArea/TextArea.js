import React from "react";

import { useField, Field } from "formik";
import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";

export default function SimpleModeTextarea({
  label,
  height = "144px",
  width = "full",
  isRequired = false,
  textAreaHeight,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <FormControl
      isRequired={isRequired}
      fontSize={["md", "lg", "lg"]}
      h={height}
      color="#fff"
      w={width}
    >
      {label && (
        <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
          {label}
        </FormLabel>
      )}

      <Field
        _placeholder={{
          fontSize: "md",
        }}
        fontSize={["md", "lg", "lg"]}
        pl={2}
        borderRadius="0"
        borderWidth="0"
        as={Textarea}
        minH={textAreaHeight}
        bg="black"
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
