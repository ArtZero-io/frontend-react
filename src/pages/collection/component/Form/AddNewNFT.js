import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import { ContractPromise } from "@polkadot/api-contract";

import AddNewNFTInput from "@components/Input/Input";
import AddNewNFTTextArea from "@components/TextArea/TextArea";
import AddNewNFTImageUpload from "@components/ImageUpload/Collection";

import AddLevelsModal from "../Modal/AddLevels";
import AddPropertiesModal from "../Modal/AddProperties";

import { AccountActionTypes } from "@store/types/account.types";
import StatusButton from "@components/Button/StatusButton";
import { createLevelAttribute } from "@utils";

const AddNewNFTForm = ({ mode = "add", collectionOwner, ...rest }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const { currentAccount, api } = useSubstrateState();
  const [initialValues, setInitialValues] = useState(undefined);

  const { collection_address } = useParams();

  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);

  const [modifierToEdit, setModifierToEdit] = useState(-1);

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);

  const noImagesChange =
    avatarIPFSUrl && currentAvatarIPFSUrl.current === avatarIPFSUrl;

  useEffect(() => {
    let newInitialValues = {
      NFTName: "",
      description: "",
      properties: [{ type: "", name: "" }],
      levels: [{ name: "", level: "", levelMax: "" }],
    };

    if (mode === "edit") {
      newInitialValues.NFTName = rest.nftName;
      newInitialValues.description = rest.description;

      newInitialValues.properties = rest.attrsList
        .filter((item) => !JSON.stringify(Object.values(item)).includes("|"))
        .map((item) => {
          return { type: Object.keys(item)[0], name: Object.values(item)[0] };
        });

      newInitialValues.levels = rest?.attrsList
        ?.filter((item) => JSON.stringify(Object.values(item)).includes("|"))
        .map((item) => {
          const result = createLevelAttribute(Object.values(item)[0]);

          result.name = Object.keys(item)[0];

          return result;
        });
      setAvatarIPFSUrl(rest.avatar);
      currentAvatarIPFSUrl.current = rest.avatar;
      setInitialValues(newInitialValues);
    } else {
      setInitialValues(newInitialValues);
    }
  }, [mode, rest.attrsList, rest.avatar, rest.description, rest.nftName]);

  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            NFTName: Yup.string()
              .min(3, "Must be longer than 3 characters")
              .max(30, "Must be less than 30 characters")
              .required("Required"),
            description: Yup.string()
              .min(3, "Must be longer than 3 characters")
              .max(150, "Must be 150 characters or less")
              .required("Required"),
            properties: Yup.array()
              .of(
                Yup.object().shape(
                  {
                    type: Yup.string().when("name", {
                      is: (val) => val,
                      then: Yup.string()
                        .test(
                          "Test Prop",
                          "Duplicated Props Type!",
                          (value, schema) => {
                            const propsArr = schema?.from[1].value?.properties;

                            const keyPropsArr = propsArr.map((p) =>
                              p.type?.trim()
                            );

                            const [isDup] = keyPropsArr.filter(
                              (v, i) => i !== keyPropsArr.indexOf(v)
                            );

                            return !(isDup && isDup.trim() === value.trim());
                          }
                        )
                        .required("Must have type value.")
                        .min(3, "Must be longer than 3 characters")
                        .max(30, "Must be less than 30 characters"),
                      otherwise: Yup.string().notRequired(),
                    }),
                    name: Yup.string().when("type", {
                      is: (val) => val,
                      then: Yup.string()
                        .required("Must have name value.")
                        .min(3, "Must be longer than 3 characters")
                        .max(30, "Must be less than 30 characters"),
                      otherwise: Yup.string().notRequired(),
                    }),
                  },
                  [["type", "name"]]
                )
              )
              .min(0)
              .max(10),
            levels: Yup.array(
              Yup.object().shape(
                {
                  name: Yup.string().when("level", {
                    is: (val) => val,
                    then: Yup.string()
                      .test(
                        "Test Level",
                        "Duplicated Levels Name!",
                        (value, schema) => {
                          const levelsArr = schema?.from[1].value?.levels;

                          const keyLevelsArr = levelsArr.map((p) =>
                            p.name?.trim()
                          );

                          const [isDup] = keyLevelsArr.filter(
                            (v, i) => i !== keyLevelsArr.indexOf(v)
                          );

                          return !(isDup && isDup.trim() === value.trim());
                        }
                      )
                      .required("Must have level name.")
                      .min(3, "Must be longer than 3 characters")
                      .max(30, "Must be less than 30 characters"),
                    otherwise: Yup.string().notRequired(),
                  }),
                  level: Yup.number().when("levelMax", {
                    is: (val) => val,
                    then: Yup.number()
                      .required("Must have min value.")
                      .min(1, "Must be bigger than 0")
                      .max(Yup.ref("levelMax"), "Must smaller than max"),
                    otherwise: Yup.number().notRequired(),
                  }),
                  levelMax: Yup.number().when("name", {
                    is: (val) => val,
                    then: Yup.number()
                      .required("Must have max value.")
                      .min(Yup.ref("level"), "Must greater than level")
                      .max(10, "Must be smaller than 10"),
                    otherwise: Yup.number().notRequired(),
                  }),
                },
                [["name", "level", "levelMax"]]
              )
            )
              .min(0)
              .max(10),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            !avatarIPFSUrl && toast.error("Upload images first");

            if (avatarIPFSUrl) {
              values.avatarIPFSUrl = avatarIPFSUrl;

              if (collectionOwner === currentAccount?.address) {
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

                if (values?.properties[0]?.name) {
                  for (const property of values.properties) {
                    attributes.push({
                      name: property.type,
                      value: property.name,
                    });
                  }
                }

                if (values?.levels[0]?.name) {
                  for (const level of values.levels) {
                    attributes.push({
                      name: level.name,
                      value: level.level + "|" + level.levelMax,
                    });
                  }
                }

                const nft721_psp34_standard_contract = new ContractPromise(
                  api,
                  nft721_psp34_standard.CONTRACT_ABI,
                  collection_address
                );
                nft721_psp34_standard_calls.setContract(
                  nft721_psp34_standard_contract
                );

                dispatch({
                  type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
                  payload: {
                    status: "Start",
                  },
                });

                if (mode === "add") {
                  await nft721_psp34_standard_calls.mintWithAttributes(
                    currentAccount,
                    collection_address,
                    attributes,
                    dispatch
                  );
                } else {
                  alert("edit NFT");
                  // Todos: update NFT func
                  // await collection_manager_calls.setMultipleAttributes(
                  //   currentAccount,
                  //   nftContractAddress,
                  //   data.attributes,
                  //   data.attributeVals,
                  //   dispatch
                  // );
                }
              } else {
                dispatch({
                  type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
                });

                return toast.error("You aren't the owner of this collection!");
              }
            }
          }}
        >
          {({ values, dirty, isValid }) => (
            <div>
              <Form>
                <HStack>
                  <AddNewNFTInput
                    mode="add"
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
                  mode={mode}
                  imageIPFSUrl={avatarIPFSUrl}
                  setImageIPFSUrl={setAvatarIPFSUrl}
                  title="NFT Image"
                  limitedSize={{ width: "1000", height: "1000" }}
                  isBanner={false}
                />
                {/* Add Props  */}
                <Box py={6} borderBottomWidth={1}>
                  <Flex w="full" pb={3}>
                    <VStack alignItems="start">
                      <Heading size="h5">properties</Heading>
                      <Text fontSize={"lg"}>
                        {/* Textural trails that show up as restangles */}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Button
                      variant="outline"
                      color="brand.blue"
                      onClick={() => setModifierToEdit("properties")}
                    >
                      Add properties
                    </Button>
                  </Flex>

                  {values?.properties[0]?.type ? (
                    <Grid
                      w="full"
                      templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
                      gap={6}
                      overflowY="auto"
                    >
                      {values?.properties.map((item, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            <GridItem w="100%" h="100%">
                              <Box
                                w="full"
                                textAlign="left"
                                alignItems="end"
                                bg="brand.semiBlack"
                                px={4}
                                py={3}
                              >
                                <Flex w="full">
                                  <Box color="brand.grayLight" w="full">
                                    <Text>{item.type}</Text>
                                    <Heading
                                      pr={"2.5px"}
                                      size="h6"
                                      mt={1}
                                      noOfLines={[1, 2]}
                                      textAlign="right"
                                    >
                                      {item.name}
                                    </Heading>
                                  </Box>
                                  <Spacer />
                                </Flex>
                              </Box>
                            </GridItem>
                          </React.Fragment>
                        );
                      })}
                    </Grid>
                  ) : null}

                  <AddPropertiesModal
                    name="properties"
                    onClose={() => setModifierToEdit(null)}
                    isOpen={modifierToEdit === "properties"}
                  />
                </Box>
                {/* End Add Props  */}
                <Box py={6} borderBottomWidth={1}>
                  <Flex w="full" pb={3}>
                    <VStack alignItems="start">
                      <Heading size="h5">Levels</Heading>
                      <Text fontSize={"lg"}>
                        {/* Textural trails that show up as restangles */}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Button
                      variant="outline"
                      color="brand.blue"
                      onClick={() => setModifierToEdit("levels")}
                    >
                      Add levels
                    </Button>
                  </Flex>

                  {values?.levels[0]?.name
                    ? values?.levels?.map((item, idx) => {
                        return (
                          <React.Fragment key={idx}>
                            <Box
                              w="full"
                              textAlign="left"
                              alignItems="end"
                              bg="brand.semiBlack"
                              p={5}
                              mb={3}
                            >
                              <Flex w="full" mb={3}>
                                <Heading size="h6" mt={1} color="#fff">
                                  {item.name}
                                </Heading>
                                <Spacer />
                                <Text color="#fff">
                                  {item.level} of {item.levelMax}
                                </Text>
                              </Flex>
                              <Progress
                                colorScheme="telegram"
                                size="sm"
                                value={Number(
                                  (item.level * 100) / item.levelMax
                                )}
                                height="6px"
                              />
                            </Box>
                          </React.Fragment>
                        );
                      })
                    : null}

                  <AddLevelsModal
                    name="levels"
                    onClose={() => setModifierToEdit(null)}
                    isOpen={modifierToEdit === "levels"}
                  />
                </Box>

                <StatusButton
                  mode={mode}
                  text="NFT"
                  type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                  disabled={!(dirty && isValid) && noImagesChange}
                  isLoading={addNftTnxStatus}
                  loadingText={`${addNftTnxStatus?.status}`}
                />
                {/* <Button
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
              </Button> */}
              </Form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddNewNFTForm;
