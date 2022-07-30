/* eslint-disable no-unused-vars */
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Flex, HStack, Spacer, Stack } from "@chakra-ui/react";

import Input from "@components/Input/Input";
import NumberInput from "@components/Input/NumberInput";

import TextArea from "@components/TextArea/TextArea";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import StatusButton from "@components/Button/StatusButton";
import ImageUpload from "@components/ImageUpload/Collection";

import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import { formMode } from "@constants";
import { APICall } from "@api/client";
import { AccountActionTypes } from "@store/types/account.types";
import { formatBalance } from "@polkadot/util";
import { TimePicker } from "@components/TimePicker/TimePicker";

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);

  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl;

  useEffect(() => {
    const prepareData = async () => {
      const { error, initialValues, avatarIPFSUrl, headerIPFSUrl } =
        await fetchInitialValuesProject({
          mode,
          collection_address: nftContractAddress,
        });

      if (!error) {
        setInitialValues(initialValues);
        setAvatarIPFSUrl(avatarIPFSUrl);
        setHeaderIPFSUrl(headerIPFSUrl);
      }

      await fetchUserBalance({ currentAccount, api }).then(({ balance }) =>
        setUserBalance(balance)
      );
    };

    prepareData();
  }, [api, currentAccount, mode, nftContractAddress]);

  return (
    <>
      {initialValues && (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              isEditMode: Yup.boolean(),

              projectName: Yup.string()
                .trim()
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be less than 30 characters")
                .required("Required"),

              projectDescription: Yup.string()
                .trim()
                .min(3, "Must be longer than 3 characters")
                .max(150, "Must be less than 150 characters")
                .required("Required"),
              projectRoadmap: Yup.string()
                .trim()
                .min(3, "Must be longer than 3 characters")
                .max(150, "Must be less than 150 characters")
                .required("Required"),
              projectTeamMembers: Yup.string()
                .trim()
                .min(3, "Must be longer than 3 characters")
                .max(150, "Must be less than 150 characters")
                .required("Required"),

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
              if (!values.isEditMode && (!headerIPFSUrl || !avatarIPFSUrl)) {
                return toast.error("Upload avatar or header please!");
              }

              values.avatarIPFSUrl = avatarIPFSUrl;
              values.headerIPFSUrl = headerIPFSUrl;

              if (userBalance < 1) {
                return toast.error(`Your balance too low!`);
              }

              const data = {
                nftName: values.nftName,
                nftSymbol: values.nftSymbol,

                attributes: [
                  "name",
                  "description",
                  "avatar_image",
                  "header_image",
                ],

                attributeVals: [
                  values.projectName.trim(),
                  values.projectDescription.trim(),
                  values.avatarIPFSUrl,
                  values.headerIPFSUrl,
                ],
              };

              dispatch({
                type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
                payload: {
                  status: "Start",
                },
              });

              if (mode === formMode.ADD) {
                await collection_manager_calls.autoNewCollection(
                  currentAccount,
                  data,
                  dispatch,
                  api
                );
              }

              if (mode === formMode.EDIT) {
                await collection_manager_calls.setMultipleAttributes(
                  currentAccount,
                  nftContractAddress,
                  data.attributes,
                  data.attributeVals,
                  dispatch,
                  api
                );
              }
            }}
          >
            {({ values, dirty, isValid }) => (
              <Form>
                <HStack>
                  {mode === formMode.ADD && (
                    <>
                      <Input
                        type="text"
                        name="nftName"
                        label="NFT Name"
                        isRequired={true}
                        placeholder="NFT Name"
                        isDisabled={addCollectionTnxStatus}
                      />
                      <Input
                        type="text"
                        name="nftSymbol"
                        label="NFT Symbol"
                        isRequired={true}
                        placeholder="NFT Symbol"
                        isDisabled={addCollectionTnxStatus}
                      />
                    </>
                  )}

                  <Input
                    type="text"
                    isRequired={true}
                    name="projectName"
                    label="Project name"
                    placeholder="Project name"
                    isDisabled={addCollectionTnxStatus}
                  />
                </HStack>

                <TextArea
                  height="140"
                  type="text"
                  isRequired={true}
                  name="projectDescription"
                  label="Project description"
                  placeholder="Project description"
                  isDisabled={addCollectionTnxStatus}
                />
                <TextArea
                  height="140"
                  type="text"
                  isRequired={true}
                  name="projectRoadmap"
                  label="Project roadmap"
                  placeholder="Project roadmap"
                  isDisabled={addCollectionTnxStatus}
                />

                <TextArea
                  height="140"
                  type="text"
                  isRequired={true}
                  name="projectTeamMembers"
                  label="Project team members"
                  placeholder="Project team members"
                  isDisabled={addCollectionTnxStatus}
                />

                <Stack
                  direction="row"
                  alignItems="start"
                  justifyContent="space-between"
                >
                  <Stack
                    w="50%"
                    direction="column"
                    alignItems="start"
                    justifyContent="end"
                  >
                    <ImageUpload
                      isDisabled={addCollectionTnxStatus}
                      id="avatar"
                      mode={mode}
                      isBanner={false}
                      imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={setAvatarIPFSUrl}
                      title="Project Avatar Image"
                      limitedSize={{ width: "100", height: "100" }}
                    />
                  </Stack>

                  <Stack
                    w="50%"
                    direction="column"
                    alignItems="start"
                    justifyContent="end"
                  >
                    <ImageUpload
                      id="header"
                      mode={mode}
                      isBanner={true}
                      title="Project Header Image"
                      imageIPFSUrl={headerIPFSUrl}
                      isDisabled={addCollectionTnxStatus}
                      setImageIPFSUrl={setHeaderIPFSUrl}
                      limitedSize={{ width: "1920", height: "600" }}
                    />
                  </Stack>
                </Stack>

                {mode === formMode.ADD && (
                  <Flex alignItems="center" minH={20} mt={5}>
                    <Flex
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      textAlign="left"
                    >
                      <CommonCheckbox
                        isDisabled={addCollectionTnxStatus}
                        name="agreeTosCheckbox"
                        content="I agree to ArtZero's Terms of Service"
                      />
                    </Flex>
                  </Flex>
                )}

                <HStack align="center" justify="space-between">
                  <NumberInput
                    step={1}
                    type="number"
                    precision={0}
                    name="totalSupply"
                    hasStepper={false}
                    placeholder="10000"
                    inputWidth={"8rem"}
                    label="Total Supply"
                    maxRoyalFeeRate={10000}
                    isDisabled={addCollectionTnxStatus}
                  />
                  <TimePicker />
                </HStack>

                <StatusButton
                  mode={mode}
                  text="project"
                  isLoading={addCollectionTnxStatus}
                  disabled={!(dirty && isValid) && noImagesChange}
                  loadingText={`${addCollectionTnxStatus?.status}`}
                  type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default AddNewProjectForm;

export const fetchUserBalance = async ({ currentAccount, api, address }) => {
  if (currentAccount) {
    const {
      data: { free: balance },
    } = await api.query.system.account(address || currentAccount?.address);

    const [chainDecimals] = await api.registry.chainDecimals;

    // return balance with 4 digits after decimal
    const formattedStrBal = formatBalance(
      balance,
      { withSi: false, forceUnit: "-" },
      chainDecimals
    );

    const formattedNumBal = formattedStrBal.replaceAll(",", "") * 1;

    return { balance: formattedNumBal };
  }
};

export const fetchInitialValuesProject = async ({
  mode,
  collection_address,
}) => {
  let initialValues = {
    isEditMode: false,
    nftName: "",
    nftSymbol: "",
    projectName: "",
    projectDescription: "",
    totalSupply: 0,
    agreeTosCheckbox: false,
  };

  if (mode === formMode.ADD) {
    return { initialValues };
  }

  try {
    const dataList = await APICall.getCollectionByAddress({
      collection_address,
    });

    console.log("collection_address", collection_address);
    console.log("dataList", dataList);
    if (!dataList?.length) {
      return { initialValues };
    }

    initialValues.projectName = dataList[0].name;
    initialValues.projectDescription = dataList[0].description;
    initialValues.nftName = dataList[0].nftName;
    initialValues.nftSymbol = dataList[0].nftSymbol;
    console.log("initialValues", initialValues);
    return {
      initialValues,
      avatarIPFSUrl: dataList[0].avatarImage,
      headerIPFSUrl: dataList[0].headerImage,
    };
  } catch (error) {
    console.log(error);
    toast.error("There was an error while fetching data.");

    return { error };
  }
};
