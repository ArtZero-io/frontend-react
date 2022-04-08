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
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ImageUpload from "./ImageUpload";

const SimpleModeForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");

  return (
    <>
      <Formik
        initialValues={{
          nftName: "",
          nftSymbol: "",
          collectionName: "",
          collectionDescription: "",
          collectRoyalFee: false,
          royalFee: 10,
        }}
        validationSchema={Yup.object({
          nftName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          nftSymbol: Yup.string()
            .max(20, "Must be 5 characters or less")
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
          console.log("values first", values);

          (!headerIPFSUrl || !avatarIPFSUrl) && toast.error("Upload anh first");

          if (avatarIPFSUrl && headerIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;
            console.log("values later", values);
            alert(JSON.stringify(values));
          }
        }}
      >
        <Form>
          <HStack>
            <SimpleModeInput
              label="NFT Name"
              name="nftName"
              type="text"
              placeholder="NFT Name"
            />
            <SimpleModeInput
              label="NFT Symbol"
              name="nftSymbol"
              type="text"
              placeholder="NFT Symbol"
            />
            <SimpleModeInput
              label="Collection Name"
              name="collectionName"
              type="collectionName"
              placeholder="Collection Name"
            />
          </HStack>

          <SimpleModeTextarea
            label="Collection Description"
            name="collectionDescription"
            type="text"
            placeholder="Collection Description"
          />

          <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="start">
            <ImageUpload setImageIPFSUrl={setAvatarIPFSUrl} />
            <ImageUpload setImageIPFSUrl={setHeaderIPFSUrl} />

            <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="end">
              <SimpleModeSwitch
                label="Collect Royal Fee"
                name="collectRoyalFee"
              />

              <SimpleModeNumberInput
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

export default SimpleModeForm;

const SimpleModeInput = ({ label, ...props }) => {
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

const SimpleModeTextarea = ({ label, ...props }) => {
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

const SimpleModeSwitch = ({ label, ...props }) => {
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

const SimpleModeNumberInput = ({ label, name, isDisabled, ...props }) => {
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
