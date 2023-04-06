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
  Text,
} from "@chakra-ui/react";
import { Field } from "formik";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export default function AddCollectionNumberInput({
  max,
  name,
  label,
  inputWidth,
  isDisabled,
  step = 0.5,
  min = 0.5,
  precision = 2,
  height = "50px",
  isDisplay = true,
  hasStepper = true,
  isRequired = false,
  ...props
}) {
  return (
    <Box style={{ display: isDisplay ? "block" : "none" }} w="full">
      <Field name={name}>
        {({ field, form, meta }) => (
          <FormControl id={name} isRequired={isRequired}>
            {label && (
              <FormLabel
                fontSize={["md", "lg", "lg"]}
                ml={[0, 1]}
                htmlFor={name}
              >
                {label}
              </FormLabel>
            )}

            <NumberInput
              {...field}
              min={min}
              id={name}
              bg="black"
              max={max}
              step={step}
              w={inputWidth}
              precision={precision}
              isDisabled={isDisabled}
              onChange={(val) => form.setFieldValue(field.name, val)}
            >
              <NumberInputField
                fontSize={["md", "lg"]}
                focusborder="0"
                borderWidth="0px"
                borderRadius="0"
                h={height}
              />

              {hasStepper && (
                <NumberInputStepper>
                  <NumberIncrementStepper
                    border="none"
                    children={<ChevronUpIcon w={5} h={5} />}
                  />
                  <NumberDecrementStepper
                    border="none"
                    children={<ChevronDownIcon w={5} h={5} />}
                  />
                </NumberInputStepper>
              )}
            </NumberInput>

            {meta.touched && meta.error ? (
              <Text textAlign="left" color="#ff8c8c" ml={1} fontSize="12px">
                {meta.error}
              </Text>
            ) : null}
          </FormControl>
        )}
      </Field>
    </Box>
  );
}
