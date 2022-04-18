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
  console.log("field", field);
  console.log("meta", meta);
  return (
    <FormControl mx={1} fontSize="lg" color="#fff" h={height || 28}>
      {label && (
        <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
          {label}
        </FormLabel>
      )}
      <Field ml={0} pl={1} as={NumberInput} bg="black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={1} fontSize="sm">
          {meta.error}
        </Text>
      ) : null}

      <Field
        min={0}
        max={35}
        precision={0}
        step={1}
        bg="black"
        ml={0}
        pl={1}
        as={NumberInput}
        {...field}
        {...props}
        value={field.value}
        onChange={(val) => {
          console.log('val', val)
          return form.setFieldValue(field.name, val)}}
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
