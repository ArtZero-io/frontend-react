import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Field } from "formik";

export default function AddCollectionNumberInput({
  label,
  name,
  isDisabled,
  isDisplay = true,
  inputWidth,
  max,
  hasStepper = true,
  precision = 2,
  step = 0.5,
  height = "48px",
  ...props
}) {
  return (
    <Box style={{ display: isDisplay ? "block" : "none" }}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl id={name}>
            <FormLabel ml={1} htmlFor={name}>
              {label}
            </FormLabel>
            <NumberInput
              {...field}
              min={0}
              id={name}
              bg="black"
              step={step}
              w={inputWidth}
              max={max}
              precision={precision}
              isDisabled={isDisabled}
              onChange={(val) => form.setFieldValue(field.name, val)}
            >
              <NumberInputField borderRadius="0" h={height} />
              {hasStepper && (
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              )}
            </NumberInput>
          </FormControl>
        )}
      </Field>
    </Box>
  );
}
