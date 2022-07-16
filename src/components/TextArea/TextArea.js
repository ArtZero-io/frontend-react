import React from "react";

import { useField, Field } from "formik";
import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";

export default function SimpleModeTextarea({
  label,
  height = "112px",
  width = "full",
  isRequired = false,
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
      <FormLabel
        fontSize={["md", "lg", "lg"]}
        ml={1}
        htmlFor={props.id || props.name}
      >
        {label}
      </FormLabel>
      <Field
        _placeholder={{
          fontSize: "md",
        }}
        fontSize={["md", "lg", "lg"]}
        pl={2}
        borderRadius="0"
        as={Textarea}
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
