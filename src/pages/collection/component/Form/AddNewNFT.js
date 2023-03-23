import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";

import { ContractPromise } from "@polkadot/api-contract";

import AddNewNFTInput from "@components/Input/Input";
import AddNewNFTTextArea from "@components/TextArea/TextArea";
import AddNewNFTImageUpload from "@components/ImageUpload/Collection";

import AddLevelsModal from "../Modal/AddLevels";
import AddPropertiesModal from "../Modal/AddProperties";

import { createLevelAttribute, getTraitCount } from "@utils";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { formMode, CREATE_NFT, EDIT_NFT, START } from "@constants";

import { setTxStatus } from "@store/actions/txStatus";
import PropCard from "@components/Card/PropCard";
import isNotEmptyStr from "@utils";
import LevelCard from "@components/Card/LevelCard";
import { ipfsClient } from "@api/client";

const AddNewNFTForm = ({
  mode = "add",
  collectionOwner,
  tokenID,
  traits,
  rarityTable,
  totalNftCount,
  ...rest
}) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const { currentAccount, api } = useSubstrateState();
  const [initialValues, setInitialValues] = useState(undefined);

  const { collection_address } = useParams();

  const dispatch = useDispatch();

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

    if (mode === formMode.EDIT) {
      newInitialValues.NFTName = rest.nftName;
      newInitialValues.description = rest.description;

      if (traits) {
        newInitialValues.properties = Object.entries(traits)
          ?.filter(([_, name]) => !name.includes("|"))
          .map(([type, name]) => {
            return { type, name };
          });

        newInitialValues.levels = Object.entries(traits)
          ?.filter(([_, value]) => value.includes("|"))
          .map(([name, value]) => {
            let result = createLevelAttribute(value);

            result.name = name;

            return result;
          });
      }

      setAvatarIPFSUrl(rest.avatar);
      currentAvatarIPFSUrl.current = rest.avatar;
      setInitialValues(newInitialValues);
    } else {
      setInitialValues(newInitialValues);
    }
  }, [mode, rest.avatar, rest.description, rest.nftName, traits]);

  const { actionType, tokenIDArray, ...restOfTxStatus } = useTxStatus();

  return (
    <div>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            NFTName: Yup.string()
              .trim()
              .min(3, "Must be at least 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("This field is required"),
            description: Yup.string()
              .trim()
              .min(3, "Must be at least 3 characters")
              .max(150, "Must be 150 characters or less")
              .required("This field is required"),
            properties: Yup.array()
              .of(
                Yup.object().shape(
                  {
                    type: Yup.string()
                      .trim()
                      .when("name", {
                        is: (val) => val,
                        then: Yup.string()
                          .test(
                            "Test Prop",
                            "Duplicated Props Type!",
                            (value, schema) => {
                              const propsArr =
                                schema?.from[1].value?.properties;

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
                          .min(3, "Must be at least 3 characters")
                          .max(30, "Must be at most 30 characters"),
                        otherwise: Yup.string().notRequired(),
                      }),
                    name: Yup.string()
                      .trim()
                      .when("type", {
                        is: (val) => val,
                        then: Yup.string()
                          .required("Must have name value.")
                          .min(3, "Must be at least 3 characters")
                          .max(30, "Must be at most 30 characters"),
                        otherwise: Yup.string().notRequired(),
                      }),
                  },
                  [["type", "name"]]
                )
              )
              .min(0),
              // .max(10, "Property must have less than or equal to 10 items!"),
            levels: Yup.array(
              Yup.object().shape(
                {
                  name: Yup.string()
                    .trim()
                    .when("level", {
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
                        .min(3, "Must be at least 3 characters")
                        .max(30, "Must be at most 30 characters"),
                      otherwise: Yup.string().notRequired(),
                    }),
                  level: Yup.number().when("name", {
                    is: (val) => val,
                    then: Yup.number()
                      .required("Must have min value.")
                      .min(0, "Must be bigger than 0")
                      .max(Yup.ref("levelMax"), "Must smaller than max"),
                    otherwise: Yup.number().notRequired(),
                  }),
                  levelMax: Yup.number().when("name", {
                    is: (val) => val,
                    then: Yup.number()
                      .required("Must have max value.")
                      .min(Yup.ref("level"), "Must greater than level"),
                    otherwise: Yup.number().notRequired(),
                  }),
                },
                [["name", "level", "levelMax"]]
              )
            )
              .min(0),
              // .max(10, "Level must have less than or equal to 10 items!"),
          })}
          onSubmit={async (values) => {
            !avatarIPFSUrl && toast.error("Upload images first");

            if (avatarIPFSUrl) {
              values.avatarIPFSUrl = avatarIPFSUrl;

              if (
                mode === formMode.ADD &&
                collectionOwner !== currentAccount?.address
              ) {
                return toast.error("You aren't the owner of this collection!");
              }

              const metadata = {
                name: values.NFTName,
                description: values.description,
                image: values.avatarIPFSUrl,
              };

              let attributes = [];

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
                collection_address || rest.nftContractAddress
              );
              nft721_psp34_standard_calls.setContract(
                nft721_psp34_standard_contract
              );

              if (mode === formMode.ADD) {
                metadata.attributes = attributes;
                try {
                  const { path: metadataHash } = await ipfsClient.add(
                    JSON.stringify(metadata)
                  );

                  // inputCacheImages only use for cache only no Contract use

                  if (!metadataHash) {
                    toast.error("There is an error with metadata hash!");
                    return;
                  }
                  console.log(metadataHash, 'metadataHashmetadataHash');
                  dispatch(setTxStatus({ type: CREATE_NFT, step: START }));
                  await nft721_psp34_standard_calls.mintWithAttributes(
                    currentAccount,
                    collection_address || rest?.nftContractAddress,
                    [
                      {
                        name: "metadata",
                        value: metadataHash,
                      },
                    ],
                    dispatch,
                    CREATE_NFT,
                    api,
                    values.avatarIPFSUrl
                  );
                } catch (error) {
                  console.log("error", error);
                }
              } else {
                // add deleted properties
                const oldAttrsKeysList = Object.keys(traits);

                const newAttrsKeysList = attributes.map((item) => item.name);

                for (let oldAttr of oldAttrsKeysList) {
                  if (newAttrsKeysList.indexOf(oldAttr) === -1) {
                    attributes.push({
                      name: oldAttr,
                      value: "",
                    });
                  }
                }

                try {
                  dispatch(setTxStatus({ type: EDIT_NFT, step: START }));
                  // rest.nftContractAddress due to Edit mode on My NFT has no params

                  const metadata = transformFormValuesToNewMetadata(values);

                  const { path: metadataHash } = await ipfsClient.add(
                    JSON.stringify(metadata)
                  );

                  if (!metadataHash) {
                    toast.error("There is an error with metadata hash!");
                    return;
                  }

                  await nft721_psp34_standard_calls.setMultipleAttributesNFT(
                    currentAccount,
                    collection_address || rest.nftContractAddress,
                    tokenID,
                    [
                      {
                        name: "metadata",
                        value: metadataHash,
                      },
                    ],
                    dispatch,
                    EDIT_NFT,
                    api,
                    values.avatarIPFSUrl
                  );
                } catch (error) {
                  console.log("error", error);
                }
              }
            }
          }}
        >
          {({ values, dirty, isValid, errors }) => (
            <Form>
              <HStack>
                <AddNewNFTInput
                  isDisabled={actionType}
                  isRequired={true}
                  mode={formMode.ADD}
                  label="NFT Name"
                  name="NFTName"
                  type="NFTName"
                  placeholder="NFT Name"
                />
              </HStack>
              <AddNewNFTTextArea
                isDisabled={actionType}
                isRequired={true}
                label="Description"
                name="description"
                type="text"
                placeholder="Description"
              />
              <AddNewNFTImageUpload
                isDisabled={actionType}
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
                    <Heading fontSize={["lg", "xl", "xl"]}>properties</Heading>
                    <Text
                      textAlign="left"
                      fontSize={["md", "lg"]}
                      fontWeight="medium"
                      pr="4px"
                    >
                      Textual trails that show up as rectangles.
                    </Text>
                  </VStack>
                  <Spacer />
                  <Button
                    fontSize={["sm", "md", "md"]}
                    px={["12px", "32px", "32px"]}
                    isDisabled={actionType}
                    variant="outline"
                    color="brand.blue"
                    onClick={() => setModifierToEdit("properties")}
                  >
                    {mode === formMode.ADD ? "Add" : "Edit"} properties
                  </Button>
                </Flex>

                {values?.properties?.length && values?.properties[0]?.type ? (
                  <Grid
                    w="full"
                    templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
                    gap={6}
                    overflowY="auto"
                  >
                    {values?.properties
                      .filter(
                        (i) => isNotEmptyStr(i.type) && isNotEmptyStr(i.name)
                      )
                      .map(({ type, name }, idx) => {
                        const item = { [type]: name };

                        return (
                          <GridItem key={idx} w="100%" h="100%">
                            <PropCard
                              variant="add-nft"
                              item={item}
                              traitCount={getTraitCount(rarityTable, item)}
                              totalNftCount={
                                totalNftCount || rest?.totalNftCount
                              }
                            />
                          </GridItem>
                        );
                      })}
                  </Grid>
                ) : null}

                <AddPropertiesModal
                  mode={mode}
                  name="properties"
                  onClose={() => setModifierToEdit(null)}
                  isOpen={modifierToEdit === "properties"}
                />
              </Box>
              {/* End Add Props  */}
              <Box py={6} borderBottomWidth={1}>
                <Flex w="full" pb={3}>
                  <VStack alignItems="start">
                    <Heading fontSize={["lg", "xl", "xl"]}>Levels</Heading>
                    <Text
                      textAlign="left"
                      fontSize={["md", "lg"]}
                      fontWeight="medium"
                      pr="4px"
                    >
                      Numerical traits that show as a progress bar
                    </Text>
                  </VStack>
                  <Spacer />
                  <Button
                    fontSize={["sm", "md", "md"]}
                    px={["12px", "32px", "32px"]}
                    isDisabled={actionType}
                    variant="outline"
                    color="brand.blue"
                    onClick={() => setModifierToEdit("levels")}
                  >
                    {mode === formMode.ADD ? "Add" : "Edit"} levels
                  </Button>
                </Flex>

                {values?.levels?.length && values?.levels[0]?.name ? (
                  <Grid
                    w="full"
                    templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
                    gap={6}
                    overflowY="auto"
                  >
                    {values?.levels
                      ?.filter(
                        (i) =>
                          isNotEmptyStr(i.name) &&
                          isNotEmptyStr(i.level?.toString()) &&
                          isNotEmptyStr(i.levelMax?.toString())
                      )
                      .map(({ name, level, levelMax }, idx) => {
                        const item = { [name]: `${level}|${levelMax}` };

                        return (
                          <GridItem w="100%" h="100%" key={idx}>
                            <LevelCard
                              variant="add-nft"
                              item={item}
                              traitCount={getTraitCount(rarityTable, item)}
                              totalNftCount={totalNftCount}
                            />
                          </GridItem>
                        );
                      })}
                  </Grid>
                ) : null}

                <AddLevelsModal
                  mode={mode}
                  name="levels"
                  onClose={() => setModifierToEdit(null)}
                  isOpen={modifierToEdit === "levels"}
                />
              </Box>
              {errors?.properties && (
                <HStack color="#ff8c8c" py="4px">
                  <Text> Please re-check errors in Props Section!</Text>
                </HStack>
              )}
              {errors?.levels && (
                <HStack color="#ff8c8c" py="4px">
                  <Text> Please re-check errors in Levels Section!</Text>
                </HStack>
              )}

              <CommonButton
                w="full"
                my="24px"
                {...restOfTxStatus}
                type="submit"
                text={`${mode === formMode.ADD ? "create" : "update"} nft`}
                isDisabled={!(isValid && (!noImagesChange || dirty))}
              />
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddNewNFTForm;

const transformFormValuesToNewMetadata = (values) => {
  const metadata = {
    name: values.NFTName,
    description: values.description,
    image: values.avatarIPFSUrl,
  };

  let attributes = [];

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
  metadata.attributes = attributes;

  return metadata;
};
