import React from "react";
import {
  FormControl,
  FormLabel,
  Switch,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useField, Field } from "formik";
import { InfoIcon } from "@chakra-ui/icons";

export default function SimpleModeSwitch({
  label,
  hasTooltipPublicMint = false,
  ...props
}) {
  const [field, meta] = useField(props);
  const switchSize = useBreakpointValue(["md", "lg", "lg"]);

  return (
    <FormControl
      mt={6}
      color="#fff"
      display="flex"
      fontSize={["md", "lg", "lg"]}
      alignItems="center"
    >
      <FormLabel
        mb="0px"
        ml={[0, 1]}
        fontSize={["md", "lg", "lg"]}
        htmlFor={props.id || props.name}
      >
        {label}{" "}
        {hasTooltipPublicMint && (
          <Tooltip
            hasArrow
            bg="#333"
            color="#fff"
            label="When Allow public mint is selected, anyone can mint the NFTs."
          >
            <InfoIcon p="2px" fontSize="20px" />
          </Tooltip>
        )}
      </FormLabel>
      <Field
        pl={2}
        as={Switch}
        size={switchSize}
        // colorScheme="teal"
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
