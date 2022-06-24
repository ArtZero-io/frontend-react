import React from "react";
import { useField, Field } from "formik";
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";

export default function AddLevelsInput({ label, height, form, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl mx={1} fontSize="lg" color="#fff" h={height || 28}>
      {label && (
        <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
          {label}
        </FormLabel>
      )}
      <Field ml={0} pl={1} as={NumberInput} bg="black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="sm">
          {meta.error}
        </Text>
      ) : null}

      <Field
        min={0}
        max={5}
        precision={2}
        step={0.5}
        bg="black"
        ml={0}
        pl={1}
        as={NumberInput}
        {...field}
        {...props}
        value={field.value}
        onChange={(val) => {
          return form.setFieldValue(field.name, val);
        }}
      >
        <NumberInputField borderRadius="0" h={12} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </Field>
    </FormControl>
  );
}
