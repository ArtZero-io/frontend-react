import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import CollectionImageUpload from "@components/ImageUpload/Collection";
import SimpleModeInput from "@components/Input/Input";
import SimpleModeTextArea from "@components/TextArea/TextArea";
import SimpleModeSwitch from "@components/Switch/Switch";

import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import AddCollectionNumberInput from "@components/Input/NumberInput";
import { clientAPI } from "@api/client";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import {
  formMode,
  CREATE_COLLECTION,
  EDIT_COLLECTION,
  START,
} from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { setTxStatus } from "@store/actions/txStatus";

const SimpleModeForm = ({ mode = formMode.ADD, id, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [maxRoyalFeeRate, setMaxRoyalFeeRate] = useState(0);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);
  const currentHeaderSquareIPFSUrl = useRef(headerSquareIPFSUrl);

  // eslint-disable-next-line no-unused-vars
  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl &&
    currentHeaderSquareIPFSUrl.current === headerSquareIPFSUrl;

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetchFee = async () => {
      if (addingFee === 0) {
        const addingFeeData =
          await collection_manager_calls.getSimpleModeAddingFee(currentAccount);
        setAddingFee(addingFeeData / 10 ** 12);
      }
    };
    fetchFee();
  }, [addingFee, currentAccount]);

  useEffect(() => {
    const fetchFee = async () => {
      if (maxRoyalFeeRate === 0) {
        const maxRoyalFeeRateData =
          await collection_manager_calls.getMaxRoyalFeeRate(currentAccount);

        setMaxRoyalFeeRate(maxRoyalFeeRateData / 100);
      }
    };
    fetchFee();
  }, [maxRoyalFeeRate, currentAccount]);

  const checkCurrentBalance = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    if (balance.free.toNumber() > addingFee) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let newInitialValues = {
      isEditMode: false,
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
          isEditMode: true,
          nftName: "",
          nftSymbol: "",
          collectionName: dataList[0].name,
          collectionDescription: dataList[0].description,
          collectRoyalFee: dataList[0].isCollectRoyalFee,
          royalFee: dataList[0].royalFee / 100,
          website: dataList[0].website,
          twitter: dataList[0].twitter,
          discord: dataList[0].discord,
        };

        if (dataList?.length) {
          setAvatarIPFSUrl(dataList[0].avatarImage);
          setHeaderIPFSUrl(dataList[0].headerImage);
          setHeaderSquareIPFSUrl(dataList[0].squareImage);
          setIsSetRoyal(dataList[0].isCollectRoyalFee);
          setInitialValues(newInitialValues);

          currentAvatarIPFSUrl.current = dataList[0].avatarImage;
          currentHeaderIPFSUrl.current = dataList[0].headerImage;
          currentHeaderSquareIPFSUrl.current = dataList[0].squareImage;
        } else {
          setInitialValues(null);
        }
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    mode === formMode.EDIT
      ? fetchCollectionsByID()
      : setInitialValues(newInitialValues);
  }, [id, mode]);

  return (
    <>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            isEditMode: Yup.boolean(),

            collectionName: Yup.string()
              .trim()
              .min(3, "Must be longer than 3 characters")
              .max(30, "Must be less than 30 characters")
              .required("Required"),
            collectionDescription: Yup.string()
              .trim()
              .min(3, "Must be longer than 3 characters")
              .max(150, "Must be less than 150 characters")
              .required("Required"),
            collectRoyalFee: Yup.boolean(),
            website: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .max(50, "Must be less than 50 characters"),
            twitter: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(/\btwitter.com\b/, "URL must be twitter.com")
              .max(50, "Must be less than 50 characters"),
            discord: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(
                /\bdiscord.(com|gg)\b/,
                "URL must be discord.com or discord.gg"
              )
              .max(50, "Must be less than 50 characters"),

            nftName: Yup.string()
              .trim()
              .when("isEditMode", {
                is: false,
                then: Yup.string()
                  .min(3, "Must be longer than 3 characters")
                  .max(25, "Must be less than 25 characters")
                  .required("Required"),
              }),
            nftSymbol: Yup.string()
              .trim()
              .when("isEditMode", {
                is: false,
                then: Yup.string()
                  .min(3, "Must be longer than 3 characters")
                  .max(8, "Must be less than 8 characters")
                  .required("Required"),
              }),
            agreeTosCheckbox: Yup.boolean().when("isEditMode", {
              is: false,
              then: Yup.boolean()
                .required("The terms and conditions must be accepted.")
                .oneOf([true], "The TOCs must be accepted."),
            }),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            console.log("first ... onSubmit");
            if (
              !values.isEditMode &&
              (!headerIPFSUrl || !avatarIPFSUrl || !headerSquareIPFSUrl)
            ) {
              return toast.error("Upload avatar or header too");
            }

            // if (avatarIPFSUrl && headerIPFSUrl && headerSquareIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;
            values.headerSquareIPFSUrl = headerSquareIPFSUrl;

            if (!checkCurrentBalance) {
              return toast.error(`Your balance not enough`);
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

                collectionAllowRoyalFee: values.collectRoyalFee,
                collectionRoyalFeeData: values.collectRoyalFee
                  ? Math.round(values.royalFee * 100)
                  : 0,
              };

              if (mode === formMode.ADD) {
                dispatch(setTxStatus({ type: CREATE_COLLECTION, step: START }));

                await collection_manager_calls.autoNewCollection(
                  currentAccount,
                  data,
                  dispatch,
                  CREATE_COLLECTION,
                  api
                );
              }

              if (mode === formMode.EDIT) {
                dispatch(setTxStatus({ type: EDIT_COLLECTION, step: START }));

                await collection_manager_calls.setMultipleAttributes(
                  currentAccount,
                  nftContractAddress,
                  data.attributes,
                  data.attributeVals,
                  dispatch,
                  EDIT_COLLECTION,
                  api
                );
              }
            }
          }}
        >
          {({ values, dirty, isValid, submitForm, handleSubmitForm }) => (
            <Form>
              <Stack direction={{ base: "column", md: "row" }}>
                {mode === formMode.ADD && (
                  <>
                    <SimpleModeInput
                      type="text"
                      name="nftName"
                      label="NFT Name"
                      isRequired={true}
                      isDisabled={actionType}
                      placeholder="NFT Name"
                    />
                    <SimpleModeInput
                      type="text"
                      name="nftSymbol"
                      isRequired={true}
                      label="NFT Symbol"
                      isDisabled={actionType}
                      placeholder="NFT Symbol"
                    />
                  </>
                )}
                <SimpleModeInput
                  type="text"
                  isRequired={true}
                  name="collectionName"
                  label="Collection Name"
                  isDisabled={actionType}
                  placeholder="Collection Name"
                />
              </Stack>

              <Stack direction={{ base: "column", md: "row" }}>
                <SimpleModeInput
                  type="text"
                  name="website"
                  label="Website URL"
                  isDisabled={actionType}
                  placeholder={"Website URL"}
                />
                <SimpleModeInput
                  type="text"
                  name="twitter"
                  label="Twitter URL"
                  isDisabled={actionType}
                  placeholder={"Twitter URL"}
                />
                <SimpleModeInput
                  type="text"
                  name="discord"
                  label="Discord URL"
                  isDisabled={actionType}
                  placeholder={"Discord URL"}
                />
              </Stack>

              <SimpleModeTextArea
                type="text"
                isRequired={true}
                isDisabled={actionType}
                name="collectionDescription"
                label="Collection Description"
                placeholder="Collection Description"
              />

              <Stack
                alignItems="start"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
              >
                <Stack
                  w="50%"
                  direction="column"
                  alignItems="start"
                  justifyContent="end"
                >
                  <CollectionImageUpload
                    id="avatar"
                    mode={mode}
                    isBanner={false}
                    isDisabled={actionType}
                    imageIPFSUrl={avatarIPFSUrl}
                    title="Collection Avatar Image"
                    setImageIPFSUrl={setAvatarIPFSUrl}
                    limitedSize={{ width: "100", height: "100" }}
                  />

                  <CollectionImageUpload
                    id="header"
                    mode={mode}
                    isBanner={true}
                    isDisabled={actionType}
                    imageIPFSUrl={headerIPFSUrl}
                    title="Collection Main Header"
                    setImageIPFSUrl={setHeaderIPFSUrl}
                    limitedSize={{ width: "1920", height: "600" }}
                  />
                </Stack>

                <Stack
                  w="50%"
                  direction="column"
                  alignItems="start"
                  justifyContent="end"
                >
                  <CollectionImageUpload
                    mode={mode}
                    isBanner={false}
                    id="header_square"
                    isDisabled={actionType}
                    title="Collection Square Header"
                    imageIPFSUrl={headerSquareIPFSUrl}
                    setImageIPFSUrl={setHeaderSquareIPFSUrl}
                    limitedSize={{ width: "500", height: "500" }}
                  />

                  {mode === formMode.EDIT && (
                    <Box my="30px" py="30px">
                      <Box
                        px="3px"
                        borderWidth="1px"
                        borderColor="#7ae7ff"
                        textTransform="capitalize"
                      >
                        {initialValues.royalFee}% Royalty
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Stack>

              {mode === formMode.ADD && (
                <Stack
                  mt={5}
                  minH={20}
                  direction={{ base: "column", md: "row" }}
                  alignItems={{ base: "start", md: "center" }}
                >
                  <Box w="12rem">
                    <SimpleModeSwitch
                      name="collectRoyalFee"
                      isDisabled={actionType}
                      label="Collect Royal Fee"
                      onChange={() => {
                        values.collectRoyalFee = !values.collectRoyalFee;
                        setIsSetRoyal(!isSetRoyal);
                      }}
                    />
                  </Box>

                  <AddCollectionNumberInput
                    type="number"
                    name="royalFee"
                    inputWidth={"8rem"}
                    isDisplay={isSetRoyal}
                    max={maxRoyalFeeRate}
                    placeholder="Royal Fee"
                    isDisabled={!isSetRoyal || actionType}
                    label={`Royal Fee (max ${maxRoyalFeeRate}%)`}
                  />

                  <Spacer />

                  <Flex
                    textAlign="left"
                    direction="column"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                  >
                    <Text color="#fff" fontSize={["md", "lg", "lg"]}>
                      Create new collection you will pay
                      <strong> {addingFee} $AZERO </strong> in fee to ArtZero.io
                    </Text>

                    <CommonCheckbox
                      isDisabled={actionType}
                      name="agreeTosCheckbox"
                      content="I agree to ArtZero's Terms of Service"
                    />
                  </Flex>
                </Stack>
              )}
              <CommonButton
                w="full"
                my="24px"
                {...rest}
                type="submit"
                text={`${
                  mode === formMode.ADD ? "create" : "update"
                } collection`}
                disabled={!(dirty && isValid) && noImagesChange}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SimpleModeForm;
