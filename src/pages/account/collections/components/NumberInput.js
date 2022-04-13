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
  isDisplay,
  ...props
}) {
  return (
    <Box style={{ display: isDisplay ? "block" : "none" }}>
      <Field name="royalFee">
        {({ field, form }) => (
          <FormControl id={name}>
            <FormLabel ml={1} htmlFor="royalFee">
              {label}
            </FormLabel>
            <NumberInput
              isDisabled={isDisabled}
              id={name}
              min={0}
              max={35}
              precision={0}
              step={1}
              bg="black"
              {...field}
              onChange={(val) => form.setFieldValue(field.name, val)}
            >
              <NumberInputField borderRadius="0" h={12} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}
      </Field>
    </Box>
  );
}
