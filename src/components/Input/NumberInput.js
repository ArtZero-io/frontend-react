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
  max,
  name,
  label,
  inputWidth,
  isDisabled,
  step = 0.5,
  precision = 2,
  height = "50px",
  isDisplay = true,
  hasStepper = true,
  isRequired = false,
  ...props
}) {
  return (
    <Box style={{ display: isDisplay ? "block" : "none" }}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl id={name} isRequired={isRequired}>
            <FormLabel fontSize={["md", "lg", "lg"]} ml={[0, 1]} htmlFor={name}>
              {label}
            </FormLabel>

            <NumberInput
              {...field}
              min={0}
              id={name}
              bg="black"
              max={max}
              step={step}
              w={inputWidth}
              precision={precision}
              isDisabled={isDisabled}
              onChange={(val) => form.setFieldValue(field.name, val)}
            >
              <NumberInputField borderWidth="0px" borderRadius="0" h={height} />

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
