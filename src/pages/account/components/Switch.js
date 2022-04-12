import React from "react";
import { FormControl, FormLabel, Switch, Text } from "@chakra-ui/react";
import { useField, Field } from "formik";

export default function SimpleModeSwitch({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl display="flex">
      <FormLabel ml={1} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field
        pl={2}
        size="lg"
        as={Switch}
        colorScheme="teal"
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
