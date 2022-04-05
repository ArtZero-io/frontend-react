import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, useField, Field } from "formik";
import * as Yup from "yup";
import AddLevel from "./AddLevel";
import AddNewNFTUpload from "./AddNewNFTUpload";
import AddProperties from "./AddProperties";

const AddNewNFTInput = ({ label, ...props }) => {
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

const AddNewNFTTextarea = ({ label, ...props }) => {
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

const AddNewNFTForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          NFTName: "",
          description: "",
        }}
        validationSchema={Yup.object({
          NFTName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(20, "Must be 200 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          alert(JSON.stringify(values));
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <HStack>
            <AddNewNFTInput
              label="NFT Name"
              name="NFTName"
              type="NFTName"
              placeholder="NFT Name"
            />
          </HStack>

          <AddNewNFTTextarea
            label="Description"
            name="Description"
            type="text"
            placeholder="Description"
          />

          <AddNewNFTUpload/>
          <AddProperties data={fakePropsData}/>
          <AddLevel data={fakeLevelData}/>
          <Button
            variant="buy-sell"
            w="full"
            type="submit"
            mt={8}
            mb={{ xl: "16px", "2xl": "32px" }}
          >
            Add new NFT
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AddNewNFTForm;

const fakePropsData = [{ type: "type1", name: "name"}];
const fakeLevelData = [{ name: "type1", value: "3", of:'5'}];
