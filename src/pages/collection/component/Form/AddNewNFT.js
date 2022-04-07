import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddNewNFTUpload from "./AddNewNFTUpload";

const AddNewNFTForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  console.log("avatarIPFSUrl", avatarIPFSUrl);
  return (
    <div>
      <Formik
        initialValues={{
          NFTName: "",
          description: "",
          properties: [{ type: "typeA ", name: "nameA" }],
          levels: [{ name: "typeA ", level: "2", maxLevel: "5" }],
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
          console.log("values first", values);

          !avatarIPFSUrl && toast.error("Upload anh first");

          if (avatarIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            console.log("values later", values);
            alert(JSON.stringify(values));
          }
        }}
      >
        {({ values }) => (
          <div>
            <Form>
              <>{JSON.stringify(values)}</>
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
                name="description"
                type="text"
                placeholder="Description"
              />

              <AddNewNFTUpload setAvatarIPFSUrl={setAvatarIPFSUrl} />

              <AddNewNFTPropertiesList values={values} />
              <AddNewNFTLevelsList values={values} />

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
          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddNewNFTForm;

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

const AddNewNFTPropertiesList = ({ values }) => {
  return (
    <>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size="lg" fontWeight="400">
            properties
          </Heading>
          <Text>Textural trails that show up as restangles</Text>{" "}
        </VStack>
        <Spacer />
        <Button variant="outline" color="brand.blue">
          Add properties
        </Button>
      </Flex>
      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Type</Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Name</Text>
        </Box>
        <Box w={14} />
      </Flex>
      <FieldArray
        name="properties"
        render={(arrayHelpers) => (
          <div>
            {values.properties.map((property, index) => (
              <div key={index}>
                {/** both these conventions do the same */}
                <Flex alignItems="center" mb={4}>
                  <Field
                    as={Input}
                    bg="black"
                    name={`properties[${index}].type`}
                  />
                  <Field
                    as={Input}
                    bg="black"
                    name={`properties.${index}.name`}
                  />

                  <Button
                    variant="icon"
                    borderWidth={2}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <Circle size="3.125rem">
                      <DeleteIcon fontSize="1.5rem" />
                    </Circle>
                  </Button>
                </Flex>
              </div>
            ))}

            <Button
              variant="icon"
              borderWidth={2}
              onClick={() => arrayHelpers.push({ type: "", name: "" })}
            >
              <Circle size="3.125rem">
                <AddIcon fontSize="1.5rem" />
              </Circle>
            </Button>
          </div>
        )}
      />
    </>
  );
};

const AddNewNFTLevelsList = ({ values }) => {
  return (
    <>
      <Flex w="full">
        <VStack alignItems="start">
          <Heading size="lg" fontWeight="400">
            Levels
          </Heading>
          <Text>Textural trails that show up as restangles</Text>{" "}
        </VStack>
        <Spacer />
        <Button variant="outline" color="brand.blue">
          Add Levels
        </Button>
      </Flex>
      <Flex>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Name</Text>
        </Box>
        <Box mb={4} flexGrow={1} textAlign="left" pl={3}>
          <Text>Level</Text>
        </Box>
        <Box w={14} />
      </Flex>
      <FieldArray
        name="levels"
        render={(arrayHelpers) => (
          <div>
            {values.levels.map((level, index) => (
              <div key={index}>
                {/** both these conventions do the same */}
                <Flex alignItems="center" mb={4}>
                  <Field as={Input} bg="black" name={`levels[${index}].name`} />
                  <Field as={Input} bg="black" name={`levels.${index}.level`} />
                  <Field
                    as={Input}
                    bg="black"
                    name={`levels.${index}.maxLevel`}
                  />

                  <Button
                    variant="icon"
                    borderWidth={2}
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <Circle size="3.125rem">
                      <DeleteIcon fontSize="1.5rem" />
                    </Circle>
                  </Button>
                </Flex>
              </div>
            ))}

            <Button
              variant="icon"
              borderWidth={2}
              onClick={() =>
                arrayHelpers.push({ name: "", level: "", maxLevel: "" })
              }
            >
              <Circle size="3.125rem">
                <AddIcon fontSize="1.5rem" />
              </Circle>
            </Button>
          </div>
        )}
      />
    </>
  );
};
