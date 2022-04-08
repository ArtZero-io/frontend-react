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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddNewNFTUpload from "./AddNewNFTUpload";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "../../../../utils/blockchain/nft721-psp34-standard"
import nft721_psp34_standard_calls from "../../../../utils/blockchain/nft721-psp34-standard-calls"
import { ContractPromise } from "@polkadot/api-contract";
import { useParams } from "react-router-dom";
import collection_manager_calls from "../../../../utils/blockchain/collection-manager-calls";
import { delay } from "../../../../utils";

const AddNewNFTForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  console.log("avatarIPFSUrl", avatarIPFSUrl);
  const { api, currentAccount } = useSubstrateState();
  const [isLoadedContract, setIsLoadedContract] = useState(false);
  const [nft721Psp34StandardContract, setNft721Psp34StandardContract] = useState({});
  const param = useParams();
  const [collection, setCollectionData] = useState({});

  useEffect(async () => {
    if (isLoadedContract == false) {
        const nft721_psp34_standard_contract = new ContractPromise(
            api,
            nft721_psp34_standard.CONTRACT_ABI,
            param.collectionAddress
        );
        nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
        setNft721Psp34StandardContract(nft721_psp34_standard_calls);
        setIsLoadedContract(true);
    }
    
  }, [isLoadedContract]);

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {
    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.collectionAddress
    );
    setCollectionData(data);
  };


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
            if (collection.collectionOwner == currentAccount?.address) {
              let attributes = [
                {
                  name: 'nft_name',
                  value: values.NFTName
                },
                {
                  name: 'description',
                  value: values.description
                },
                {
                  name: 'avatar',
                  value: values.avatarIPFSUrl
                }
              ];
              
              for (const property of values.properties) {
                attributes.push({
                  name: property.type,
                  value: property.name
                });
              }

              for (const level of values.levels) {
                attributes.push({
                  name: level.name,
                  value: level.level + '|' + level.maxLevel
                });
              }
              const newNft = await nft721Psp34StandardContract.mintWithAttributes(currentAccount, attributes);
              console.log(attributes);
              console.log(newNft);
            } else {
              console.log("You aren't the owner of this collection!");
              toast.error("You aren't the owner of this collection!")
            }
            
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
                variant="solid"
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
