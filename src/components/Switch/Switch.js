import React from "react";
import {
  FormControl,
  FormLabel,
  Switch,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useField, Field } from "formik";

export default function SimpleModeSwitch({ label, ...props }) {
  const [field, meta] = useField(props);
  const switchSize = useBreakpointValue(["md", "lg", "lg"]);

  return (
    <FormControl
      mt={6}
      color="#fff"
      display="flex"
      fontSize={["md", "lg", "lg"]}
    >
      <FormLabel
        ml={[0, 1]}
        fontSize={["md", "lg", "lg"]}
        htmlFor={props.id || props.name}
      >
        {label}
      </FormLabel>
      <Field
        pl={2}
        as={Switch}
        size={switchSize}
        colorScheme="teal"
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
