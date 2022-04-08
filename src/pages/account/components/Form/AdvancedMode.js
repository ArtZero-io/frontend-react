import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, useField, Field } from "formik";
import * as Yup from "yup";
import AdvancedModeUpload from "./AdvancedModeUpload";

const AdvancedModeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl h={28}>
      <FormLabel ml={2} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field pl={2} as={Input} bg="black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={2}>
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
};

const AdvancedModeTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl h={28} mb={8}>
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
};

const AdvancedModeSwitch = ({ label, ...props }) => {
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
};

const AdvancedModeNumberInput = ({ label, name, isDisabled, ...props }) => {
  // const [, meta] = useField(props);
  return (
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
            max={30}
            precision={0}
            step={1}
            bg="black"
            {...field}
            onChange={(val) => form.setFieldValue(field.name, val)}
          >
            <NumberInputField borderRadius="0" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}
    </Field>
  );
};

const AdvancedModeForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          nftContractAddress: "",
          collectionName: "",
          collectionDescription: "",
          collectRoyalFee: false,
          royalFee: 10,
        }}
        validationSchema={Yup.object({
          nftContractAddress: Yup.string()
            .max(115, "Must be 115 characters or less")
            .required("Required"),
          collectionName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          collectionDescription: Yup.string()
            .max(20, "Must be 200 characters or less")
            .required("Required"),
          collectRoyalFee: Yup.boolean(),
          royalFee: Yup.string().when("collectRoyalFee", {
            is: (collectRoyalFee) => collectRoyalFee === true,
            then: Yup.string().required(
              "I am required now that checkboxes are checked"
            ),
          }),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <HStack>
            <AdvancedModeInput
              label="NFT Contract Address"
              name="nftContractAddress"
              type="text"
              placeholder="NFT Contract Address"
            />
            <AdvancedModeInput
              label="Collection Name"
              name="collectionName"
              type="collectionName"
              placeholder="Collection Name"
            />
          </HStack>

          <AdvancedModeTextarea
            label="Collection Description"
            name="collectionDescription"
            type="text"
            placeholder="Collection Description"
          />

          <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="start">
            <AdvancedModeUpload />
            <AdvancedModeUpload />
            {/* <Spacer /> */}
            <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="end">
              <AdvancedModeSwitch
                label="Collect Royal Fee"
                name="collectRoyalFee"
              />

              <AdvancedModeNumberInput
                label="Royal Fee %"
                name="royalFee"
                type="number"
                placeholder="Royal Fee"
              />
            </Stack>
          </Stack>

          <Button
            variant="buy-sell"
            w="full"
            type="submit"
            mt={8}
            mb={{ xl: "16px", "2xl": "32px" }}
          >
            Add new collection
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AdvancedModeForm;