import React from "react";

import { useField, Field } from "formik";
import { FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";

export default function SimpleModeTextarea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl h={28}>
      <FormLabel ml={2} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field
        pl={2}
        borderRadius="0"
        as={Textarea}
        bg="black"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={2}>
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
}
