import { Box, Flex, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
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

import AddCollectionNumberInput from "../NumberInput";
import { clientAPI } from "@api/client";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import { AccountActionTypes } from "@store/types/account.types";
import StatusButton from "@components/Button/StatusButton";

const SimpleModeForm = ({ mode = "add", id, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [maxRoyalFeeRate, setMaxRoyalFeeRate] = useState(0);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);
  const currentHeaderSquareIPFSUrl = useRef(headerSquareIPFSUrl);

  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl &&
    currentHeaderSquareIPFSUrl.current === headerSquareIPFSUrl;

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
          royalFee: dataList[0].royalFee,
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
            validationSchema={Yup.object().shape({
              isEditMode: Yup.boolean(),

              collectionName: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
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
                .matches(/\btwitter.com\b/, "Not a Twitter URL")
                .max(50, "Must be less than 50 characters"),
              discord: Yup.string()
                .url("This must be a valid URL")
                .matches(/\bdiscord.gg\b/, "Not a Discord URL")
                .max(50, "Must be less than 50 characters"),

              nftName: Yup.string().when("isEditMode", {
                is: false,
                then: Yup.string()
                  .min(3, "Must be longer than 3 characters")
                  .max(25, "Must be less than 25 characters")
                  .required("Required"),
              }),
              nftSymbol: Yup.string().when("isEditMode", {
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

                  collectionAllowRoyalFee: values.collectionRoyalFee,
                  collectionRoyalFeeData: values.collectionRoyalFee
                    ? Math.round(values.royalFee * 100)
                    : 0,
                };

                dispatch({
                  type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
                  payload: {
                    status: "Start",
                  },
                });

                if (mode === "add") {
                  await collection_manager_calls.autoNewCollection(
                    currentAccount,
                    data,
                    dispatch
                  );
                } else {
                  await collection_manager_calls.setMultipleAttributes(
                    currentAccount,
                    nftContractAddress,
                    data.attributes,
                    data.attributeVals,
                    dispatch
                  );
                }
              }
              // }
            }}
          >
            {({ values, dirty, isValid }) => (
              <Form>
                <HStack>
                  {mode === "add" && (
                    <>
                      <SimpleModeInput
                        isRequired={true}
                        label="NFT Name"
                        name="nftName"
                        type="text"
                        placeholder="NFT Name"
                      />
                      <SimpleModeInput
                        isRequired={true}
                        label="NFT Symbol"
                        name="nftSymbol"
                        type="text"
                        placeholder="NFT Symbol"
                      />
                    </>
                  )}
                  <SimpleModeInput
                    isRequired={true}
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
                  isRequired={true}
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
                  <Stack
                    direction="column"
                    alignItems="start"
                    justifyContent="end"
                  >
                    <CollectionImageUpload
                      id="avatar"
                      mode={mode}
                      isBanner={false}
                      imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={setAvatarIPFSUrl}
                      title="Collection Avatar Image"
                      limitedSize={{ width: "100", height: "100" }}
                    />

                    <CollectionImageUpload
                      id="header"
                      mode={mode}
                      isBanner={true}
                      imageIPFSUrl={headerIPFSUrl}
                      setImageIPFSUrl={setHeaderIPFSUrl}
                      title="Collection Main Header"
                      limitedSize={{ width: "1920", height: "600" }}
                    />
                  </Stack>

                  <Stack
                    direction="column"
                    alignItems="start"
                    justifyContent="end"
                  >
                    <CollectionImageUpload
                      id="header_square"
                      mode={mode}
                      isBanner={false}
                      imageIPFSUrl={headerSquareIPFSUrl}
                      setImageIPFSUrl={setHeaderSquareIPFSUrl}
                      title="Collection Square Header"
                      limitedSize={{ width: "500", height: "500" }}
                    />

                    {(mode === "edit") &
                    (
                      <Box my="30px" py="30px">
                        <Box
                          textTransform="capitalize"
                          px="3px"
                          borderWidth="1px"
                          borderColor="#7ae7ff"
                        >
                          {initialValues.royalFee}% Royalty
                        </Box>
                      </Box>
                    )}
                  </Stack>
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
                      maxRoyalFeeRate={maxRoyalFeeRate}
                      label={`Royal Fee (max ${maxRoyalFeeRate}%)`}
                      name="royalFee"
                      type="number"
                      placeholder="Royal Fee"
                      inputWidth={"8rem"}
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

                <StatusButton
                  type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
                  text="collection"
                  disabled={!(dirty && isValid) && noImagesChange}
                  isLoading={addCollectionTnxStatus}
                  loadingText={`${addCollectionTnxStatus?.status}`}
                  mode={mode}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default SimpleModeForm;
