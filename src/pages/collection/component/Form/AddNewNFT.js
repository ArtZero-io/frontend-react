import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldArray } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import AddNewNFTImageUpload from "@components/ImageUpload/Collection";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { useParams } from "react-router-dom";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { delay } from "@utils";
import AddNewNFTInput from "@components/Input";
import AddNewNFTTextArea from "@components/TextArea";
import { useDispatch, useSelector } from "react-redux";

const AddNewNFTForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  console.log("avatarIPFSUrl", avatarIPFSUrl);
  const { api, currentAccount } = useSubstrateState();
  const [isLoadedContract, setIsLoadedContract] = useState(false);
  const [nft721Psp34StandardContract, setNft721Psp34StandardContract] =
    useState({});
  const param = useParams();
  const [collection, setCollectionData] = useState({});

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(async () => {
    if (isLoadedContract == false) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.address
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      setNft721Psp34StandardContract(nft721_psp34_standard_calls);
      setIsLoadedContract(true);
    }
  }, [api, isLoadedContract, param.address]);

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
      param.address
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
            .max(30, "Must be 30 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(150, "Must be 150 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("values first", values);

          !avatarIPFSUrl && toast.error("Upload images first");

          if (avatarIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            if (collection.collectionOwner === currentAccount?.address) {
              let attributes = [
                {
                  name: "nft_name",
                  value: values.NFTName,
                },
                {
                  name: "description",
                  value: values.description,
                },
                {
                  name: "avatar",
                  value: values.avatarIPFSUrl,
                },
              ];

              for (const property of values.properties) {
                attributes.push({
                  name: property.type,
                  value: property.name,
                });
              }

              for (const level of values.levels) {
                attributes.push({
                  name: level.name,
                  value: level.level + "|" + level.maxLevel,
                });
              }
              const newNft =
                await nft721Psp34StandardContract.mintWithAttributes(
                  currentAccount,
                  attributes,
                  dispatch
                );
              console.log("attributes", attributes);
              console.log("newNft", newNft);
            } else {
              console.log("You aren't the owner of this collection!");
              toast.error("You aren't the owner of this collection!");
            }
          }
        }}
      >
        {({ values }) => (
          <div>
            <Form>
              <HStack>
                <AddNewNFTInput
                  label="NFT Name"
                  name="NFTName"
                  type="NFTName"
                  placeholder="NFT Name"
                />
              </HStack>

              <AddNewNFTTextArea
                label="Description"
                name="description"
                type="text"
                placeholder="Description"
              />

              <AddNewNFTImageUpload
                setImageIPFSUrl={setAvatarIPFSUrl}
                title="Avatar Image"
                limitedSize={{ width: "64", height: "64" }}
              />

              <AddNewNFTPropertiesList values={values} />

              <AddNewNFTLevelsList values={values} />

              <Button
                spinnerPlacement="start"
                isLoading={tnxStatus}
                loadingText={`${tnxStatus?.status}`}
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

const AddNewNFTPropertiesList = ({ values }) => {
  return (
    <Box pt={6}>
      <Flex w="full" pb={3}>
        <VStack alignItems="start">
          <Heading size="h5">properties</Heading>
          <Text fontSize={"lg"}>
            Textural trails that show up as restangles
          </Text>
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
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon fontSize="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </Flex>
              </div>
            ))}
            <IconButton
              aria-label="Add"
              icon={<AddIcon fontSize="1.5rem" />}
              size="icon"
              variant="iconOutline"
              onClick={() => arrayHelpers.push({ type: "", name: "" })}
            />
          </div>
        )}
      />
    </Box>
  );
};

const AddNewNFTLevelsList = ({ values }) => {
  return (
    <Box pt={6}>
      <Flex w="full" pb={3}>
        <VStack alignItems="start">
          <Heading size="h5">Levels</Heading>
          <Text fontSize={"lg"}>
            Textural trails that show up as restangles
          </Text>
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
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon fontSize="1.5rem" />}
                    size="icon"
                    variant="iconOutline"
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </Flex>
              </div>
            ))}
            <IconButton
              aria-label="Add"
              icon={<AddIcon fontSize="1.5rem" />}
              size="icon"
              variant="iconOutline"
              onClick={() =>
                arrayHelpers.push({ name: "", level: "", maxLevel: "" })
              }
            />
          </div>
        )}
      />
    </Box>
  );
};
