import { Stack, Text, Box, HStack, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { useSubstrateState } from "@utils/substrate";
import { isValidAddressPolkadotAddress } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import ImageUpload from "@components/ImageUpload/Collection";
import AdvancedModeInput from "@components/Input/Input";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AdvancedModeTextArea from "@components/TextArea/TextArea";

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

const AdvancedModeForm = ({ mode = "add", id }) => {
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

  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl &&
    currentHeaderSquareIPFSUrl.current === headerSquareIPFSUrl;

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetchFee = async () => {
      if (addingFee === 0) {
        const addingFeeData =
          await collection_manager_calls.getAdvanceModeAddingFee(
            currentAccount
          );

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
      nftContractAddress: "",
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
        const [dataList] = await clientAPI("post", "/getCollectionByID", {
          id,
        });

        const {
          nftContractAddress,
          name: collectionName,
          description: collectionDescription,
          isCollectRoyalFee: collectRoyalFee,
          royalFee,
          avatarImage,
          headerImage,
          squareImage,
          website,
          twitter,
          discord,
        } = dataList;

        newInitialValues = {
          isEditMode: true,
          nftContractAddress,
          collectionName,
          collectionDescription,
          collectRoyalFee,
          royalFee: royalFee / 100,
          agreeTosCheckbox: false,
          website,
          twitter,
          discord,
        };

        if (dataList) {
          setAvatarIPFSUrl(avatarImage);
          setHeaderIPFSUrl(headerImage);
          setHeaderSquareIPFSUrl(squareImage);
          setIsSetRoyal(collectRoyalFee);
          setInitialValues(newInitialValues);

          currentAvatarIPFSUrl.current = avatarImage;
          currentHeaderIPFSUrl.current = headerImage;
          currentHeaderSquareIPFSUrl.current = squareImage;
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

            nftContractAddress: Yup.string()
              .trim()
              .min(3, "Must be longer than 3 characters")
              .max(48, "Must be at most 48 characters")
              .required("This field is required"),
            collectionName: Yup.string()
              .trim()
              .min(3, "Must be longer than 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("This field is required"),
            collectionDescription: Yup.string()
              .trim()
              .min(3, "Must be longer than 3 characters")
              .max(150, "Must be at most 150 characters")
              .required("This field is required"),
            collectRoyalFee: Yup.boolean(),
            website: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .max(50, "Must be at most 50 characters"),
            twitter: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(/\btwitter.com\b/, "URL must be twitter.com")
              .max(50, "Must be at most 50 characters"),
            discord: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(
                /\bdiscord.(com|gg)\b/,
                "URL must be discord.com or discord.gg"
              )
              .max(50, "Must be at most 50 characters"),

            agreeTosCheckbox: Yup.boolean().when("isEditMode", {
              is: false,
              then: Yup.boolean()
                .required("The terms and conditions must be accepted.")
                .oneOf([true], "The TOCs must be accepted."),
            }),
          })}
          onSubmit={async (values, { setSubmitting }) => {
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
              return toast.error(`Your balance not enough!`);
            }

            if (!isValidAddressPolkadotAddress(values.nftContractAddress)) {
              toast.error(`The NFT contract address must be an address!`);
            } else {
              const data = {
                nftContractAddress: values.nftContractAddress,

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

                await collection_manager_calls.addNewCollection(
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
                  data.nftContractAddress,
                  data.attributes,
                  data.attributeVals,
                  dispatch,
                  EDIT_COLLECTION,
                  api
                );
              }
            }
            // }
          }}
        >
          {({ values, dirty, isValid }) => (
            <Form>
              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                <AdvancedModeInput
                  type="text"
                  isRequired={true}
                  isDisabled={actionType}
                  name="nftContractAddress"
                  label="NFT Contract Address"
                  placeholder="NFT Contract Address"
                />
                <AdvancedModeInput
                  isRequired={true}
                  name="collectionName"
                  type="collectionName"
                  isDisabled={actionType}
                  label="Collection Name"
                  placeholder="Collection Name"
                />
              </Stack>

              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                <AdvancedModeInput
                  type="text"
                  name="website"
                  label="Website URL"
                  isDisabled={actionType}
                  placeholder={"Website URL"}
                />
                <AdvancedModeInput
                  type="text"
                  name="twitter"
                  label="Twitter URL"
                  isDisabled={actionType}
                  placeholder={"Twitter URL"}
                />
                <AdvancedModeInput
                  type="text"
                  name="discord"
                  label="Discord URL"
                  isDisabled={actionType}
                  placeholder={"Discord URL"}
                />
              </Stack>

              <AdvancedModeTextArea
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
                  <ImageUpload
                    mode={mode}
                    isBanner={false}
                    id="collection-avatar"
                    isDisabled={actionType}
                    imageIPFSUrl={avatarIPFSUrl}
                    title="Collection Avatar Image"
                    setImageIPFSUrl={setAvatarIPFSUrl}
                    limitedSize={{ width: "100", height: "100" }}
                  />
                  <ImageUpload
                    mode={mode}
                    isBanner={true}
                    id="collection-header"
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
                  <ImageUpload
                    mode={mode}
                    isBanner={true}
                    isDisabled={actionType}
                    id="collection-header-square"
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
                <Stack mt={5} minH={20}>
                  <Stack direction={["column", "row"]} minH="85px">
                    <Stack minW="225px">
                      <Box w="12rem">
                        <AdvancedModeSwitch
                          name="collectRoyalFee"
                          isDisabled={actionType}
                          label="Collect Royal Fee"
                          onChange={() => {
                            values.collectRoyalFee = !values.collectRoyalFee;
                            setIsSetRoyal(!isSetRoyal);
                          }}
                        />
                      </Box>
                    </Stack>
                    <AddCollectionNumberInput
                      type="number"
                      name="royalFee"
                      inputWidth={"8rem"}
                      max={maxRoyalFeeRate}
                      placeholder="Royal Fee"
                      isDisplay={isSetRoyal}
                      isDisabled={!isSetRoyal || actionType}
                      label={`Royal Fee (max ${maxRoyalFeeRate}%)`}
                    />
                  </Stack>

                  <VStack pt="30px">
                    <Text color="#fff" fontSize={["md", "lg", "lg"]}>
                      Create new collection you will pay
                      <strong> {addingFee} $AZERO </strong> in fee to ArtZero.io
                    </Text>
                    <HStack justifyContent="center">
                      <CommonCheckbox
                        isDisabled={actionType}
                        name="agreeTosCheckbox"
                        content="I agree to ArtZero's Terms of Service"
                      />
                    </HStack>
                  </VStack>
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
                isDisabled={!(dirty && isValid) && noImagesChange}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AdvancedModeForm;
