import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import CollectionImageUpload from "@components/ImageUpload/Collection";
import SimpleModeInput from "@components/Input/Input";
import SimpleModeTextArea from "@components/TextArea/TextArea";
import SimpleModeSwitch from "@components/Switch/Switch";

import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import AddCollectionNumberInput from "../NumberInput";
import { clientAPI } from "@api/client";
import CommonCheckbox from "../../../../../components/Checkbox/Checkbox";

const SimpleModeForm = ({ mode = "add", id, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(() => {
    const fetchFee = async () => {
      if (addingFee === 0) {
        const addingFeeData = await collection_manager_calls.getAddingFee(
          currentAccount
        );
        console.log("SimpleModeForm addingFeeData", addingFeeData);

        setAddingFee(addingFeeData / 10 ** 12);
      }
    };
    fetchFee();
  }, [addingFee, currentAccount]);

  const checkCurrentBalance = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );
    console.log(balance.free);
    if (balance.free.toNumber() > addingFee) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let newInitialValues = {
      nftName: "",
      nftSymbol: "",
      collectionName: "",
      collectionDescription: "",
      collectRoyalFee: "",
      royalFee: 5,
      website: "",
      twitter: "",
      discord: "",
      agreeTosCheckbox: false,
    };
    const fetchCollectionsByID = async () => {
      try {
        const dataList = await clientAPI("post", "/getCollectionByID", {
          id,
        });

        newInitialValues = {
          nftName: "",
          nftSymbol: "",
          collectionName: dataList[0].name,
          collectionDescription: dataList[0].description,
          collectRoyalFee: dataList[0].isCollectRoyalFee,
          royalFee: dataList[0].royalFee,
          website: dataList[0].website,
          twitter: dataList[0].twitter,
          discord: dataList[0].discord,
        };

        if (dataList?.length) {
          setAvatarIPFSUrl(dataList[0].avatarImage);
          setHeaderIPFSUrl(dataList[0].headerImage);
          setHeaderSquareIPFSUrl(dataList[0].headerSquareImage);
          setIsSetRoyal(dataList[0].isCollectRoyalFee);
          setInitialValues(newInitialValues);
        } else {
          setInitialValues(null);
        }
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    mode === "edit"
      ? fetchCollectionsByID()
      : setInitialValues(newInitialValues);
  }, [id, mode]);

  return (
    <>
      {initialValues && (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={(mode) => {
              let result = Yup.object({
                collectionName: Yup.string()
                  .min(3, "Must be longer than 3 characters")
                  .max(50, "Must be less than 50 characters")
                  .required("Required"),
                collectionDescription: Yup.string()
                  .min(3, "Must be longer than 3 characters")
                  .max(150, "Must be less than 150 characters")
                  .required("Required"),
                collectRoyalFee: Yup.boolean(),
                website: Yup.string()
                  .url("This must be a valid URL")
                  .min(3, "Must be longer than 3 characters")
                  .max(50, "Must be less than 50 characters"),
                twitter: Yup.string()
                  .url("This must be a valid URL")
                  .min(3, "Must be longer than 3 characters")
                  .max(50, "Must be less than 50 characters"),
                discord: Yup.string()
                  .url("This must be a valid URL")
                  .min(3, "Must be longer than 3 characters")
                  .max(50, "Must be less than 50 characters"),
              });

              if (mode === "add") {
                const modeAdd = Yup.object({
                  nftName: Yup.string()
                    .min(3, "Must be longer than 3 characters")
                    .max(25, "Must be less than 25 characters")
                    .required("Required"),

                  nftSymbol: Yup.string()
                    .min(3, "Must be longer than 3 characters")
                    .max(8, "Must be less than 8 characters")
                    .required("Required"),
                  agreeTosCheckbox: Yup.boolean()
                    .required("The terms and conditions must be accepted.")
                    .oneOf(
                      [true],
                      "The terms and conditions must be accepted."
                    ),
                });

                result = result.concat(modeAdd);
              }

              if (mode === "edit") {
                const modeEdit = Yup.object({
                  nftName: Yup.string(),
                  nftSymbol: Yup.string(),
                  agreeTosCheckbox: Yup.boolean(),
                });

                result = result.concat(modeEdit);
              }

              return result;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              (!headerIPFSUrl || !avatarIPFSUrl || !headerSquareIPFSUrl) &&
                toast.error("Upload avatar or header too");

              if (avatarIPFSUrl && headerIPFSUrl && headerSquareIPFSUrl) {
                values.avatarIPFSUrl = avatarIPFSUrl;
                values.headerIPFSUrl = headerIPFSUrl;
                values.headerSquareIPFSUrl = headerSquareIPFSUrl;
                if (!checkCurrentBalance) {
                  toast.error(`Your balance not enough`);
                } else {
                  const data = {
                    nftName: values.nftName,
                    nftSymbol: values.nftSymbol,

                    attributes: [
                      "name",
                      "description",
                      "avatar_image",
                      "header_image",
                      "header_square_image",
                      "website",
                      "twitter",
                      "discord",
                    ],

                    attributeVals: [
                      values.collectionName.trim(),
                      values.collectionDescription.trim(),
                      values.avatarIPFSUrl,
                      values.headerIPFSUrl,
                      values.headerSquareIPFSUrl,
                      values.website,
                      values.twitter,
                      values.discord,
                    ],

                    collectionAllowRoyalFee: values.collectionRoyalFee,
                    collectionRoyalFeeData: values.collectionRoyalFee
                      ? Math.round(values.royalFee * 100)
                      : 0,
                  };

                  if (mode === 'add') {
                    await collection_manager_calls.autoNewCollection(
                      currentAccount,
                      data,
                      dispatch
                    );
                  } else {
                    console.log(data);
                    console.log("111data before new ", data);
                  console.log("111data before old", initialValues);
                  console.log(nftContractAddress);
                    await collection_manager_calls.setMultipleAttributes(
                      currentAccount,
                      nftContractAddress,
                      data.attributes,
                      data.attributeVals,
                      dispatch
                    );
                  }
                  
                }
              }
            }}
          >
            {({ values }) => (
              <Form>
                <HStack>
                  {mode === "add" && (
                    <>
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
                    </>
                  )}
                  <SimpleModeInput
                    label="Collection Name"
                    name="collectionName"
                    type="text"
                    placeholder="Collection Name"
                  />
                </HStack>

                <HStack>
                  <SimpleModeInput
                    label="Website URL"
                    name="website"
                    type="text"
                    placeholder={"Website URL"}
                  />
                  <SimpleModeInput
                    label="Twitter URL"
                    name="twitter"
                    type="text"
                    placeholder={"Twitter URL"}
                  />
                  <SimpleModeInput
                    label="Discord URL"
                    name="discord"
                    type="text"
                    placeholder={"Discord URL"}
                  />
                </HStack>

                <SimpleModeTextArea
                  label="Collection Description"
                  name="collectionDescription"
                  type="text"
                  placeholder="Collection Description"
                />

                <Stack
                  direction="row"
                  alignItems="start"
                  justifyContent="space-around"
                >
                  <CollectionImageUpload
                    id="avatar"
                    mode={mode}
                    isBanner={false}
                    imageIPFSUrl={avatarIPFSUrl}
                    setImageIPFSUrl={setAvatarIPFSUrl}
                    title="Collection Avatar Image"
                    limitedSize={{ width: "64", height: "64" }}
                  />

                  <CollectionImageUpload
                    id="header"
                    mode={mode}
                    isBanner={true}
                    imageIPFSUrl={headerIPFSUrl}
                    setImageIPFSUrl={setHeaderIPFSUrl}
                    title="Collection Header Image"
                    limitedSize={{ width: "400", height: "260" }}
                  />

                  <CollectionImageUpload
                    id="header_square"
                    mode={mode}
                    isBanner={false}
                    imageIPFSUrl={headerSquareIPFSUrl}
                    setImageIPFSUrl={setHeaderSquareIPFSUrl}
                    title="Collection Header Square"
                    limitedSize={{ width: "500", height: "500" }}
                  />
                </Stack>

                {mode === "add" && (
                  <Flex alignItems="center" minH={20} mt={5}>
                    <Box w="12rem">
                      <SimpleModeSwitch
                        onChange={() => {
                          values.collectRoyalFee = !values.collectRoyalFee;
                          setIsSetRoyal(!isSetRoyal);
                        }}
                        label="Collect Royal Fee"
                        name="collectRoyalFee"
                      />
                    </Box>
                    <AddCollectionNumberInput
                      isDisabled={!isSetRoyal}
                      isDisplay={isSetRoyal}
                      label="Royal Fee %"
                      name="royalFee"
                      type="number"
                      placeholder="Royal Fee"
                    />

                    <Spacer />

                    <Flex
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      textAlign="left"
                    >
                      <Text color="#fff">
                        Create new collection you will pay
                        <strong> {addingFee} $AZERO </strong> in fee to
                        ArtZero.io
                      </Text>

                      <CommonCheckbox
                        name="agreeTosCheckbox"
                        content="I agree to ArtZero's Terms of Service"
                      />
                    </Flex>
                  </Flex>
                )}

                <Button
                  variant="solid"
                  spinnerPlacement="start"
                  isLoading={tnxStatus}
                  loadingText={`${tnxStatus?.status}`}
                  w="full"
                  type="submit"
                  mt={6}
                  mb={{ xl: "16px", "2xl": "32px" }}
                >
                  {mode === "add" ? "Add new collection" : "Submit change"}
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default SimpleModeForm;
