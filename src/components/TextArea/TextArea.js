import React from "react";

import { useField, Field } from "formik";
import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";

export default function SimpleModeTextarea({
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
      fontSize="lg"
      h={height || 28}
      color="#fff"
      w={width || "full"}
    >
      <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field
        fontSize="lg"
        pl={2}
        borderRadius="0"
        as={Textarea}
        bg="black"
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
