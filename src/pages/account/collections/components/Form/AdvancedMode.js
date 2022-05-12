/* eslint-disable no-unused-vars */
import { Button, HStack, Stack, Spacer, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import BN from "bn.js";

import { useSubstrateState } from "@utils/substrate";
import { delay, isValidAddressPolkadotAddress } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import ImageUpload from "@components/ImageUpload/Collection";
import AdvancedModeInput from "@components/Input/Input";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AdvancedModeTextArea from "@components/TextArea/TextArea";

import AddCollectionNumberInput from "../NumberInput";
import { clientAPI } from "@api/client";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import { AccountActionTypes } from "@store/types/account.types";
import StatusButton from "@components/Button/StatusButton";

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
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );

  useEffect(() => {
    const fetchFee = async () => {
      if (addingFee === 0) {
        const addingFeeData = await collection_manager_calls.getAddingFee(
          currentAccount
        );

        setAddingFee((new BN(addingFeeData)).div(new BN(10**6)).toNumber() / 10 ** 6);
      }
    };
    fetchFee();
  }, [addingFee, currentAccount]);

  useEffect(() => {
    const fetchFee = async () => {
      if (maxRoyalFeeRate === 0) {
        const maxRoyalFeeRateData =
          await collection_manager_calls.getMaxRoyalFeeRate(currentAccount);
        console.log("maxRoyalFeeRateData:", maxRoyalFeeRateData);
        setMaxRoyalFeeRate(maxRoyalFeeRateData / 100);
      }
    };
    fetchFee();
  }, [maxRoyalFeeRate, currentAccount]);

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
      isEditMode: false,
      nftContractAddress: "",
      collectionName: "",
      collectionDescription: "",
      collectRoyalFee: "",
      royalFee: 5,
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
          headerSquareImage,
        } = dataList;

        newInitialValues = {
          isEditMode: true,
          nftContractAddress,
          collectionName,
          collectionDescription,
          collectRoyalFee,
          royalFee: royalFee / 100,
          agreeTosCheckbox: false,
        };

        if (dataList) {
          setAvatarIPFSUrl(avatarImage);
          setHeaderIPFSUrl(headerImage);
          // Todos Update headerSquareImage later
          // setHeaderSquareIPFSUrl(headerSquareImage);
          setHeaderSquareIPFSUrl(headerImage);
          setIsSetRoyal(collectRoyalFee);
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
            validationSchema={Yup.object().shape({
              isEditMode: Yup.boolean(),

              nftContractAddress: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(48, "Must be less than 48 characters")
                .required("Required"),
              collectionName: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(50, "Must be less than 50 characters")
                .required("Required"),
              collectionDescription: Yup.string()
                .min(3, "Must be longer than 3 characters")
                .max(150, "Must be less than 150 characters")
                .required("Required"),
              collectRoyalFee: Yup.boolean(),

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
                  ],

                  attributeVals: [
                    values.collectionName.trim(),
                    values.collectionDescription.trim(),
                    values.avatarIPFSUrl,
                    values.headerIPFSUrl,
                    values.headerSquareIPFSUrl,
                  ],

                  collectionAllowRoyalFee: values.collectRoyalFee,

                  collectionRoyalFeeData: values.collectRoyalFee
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
                  await collection_manager_calls.addNewCollection(
                    currentAccount,
                    data,
                    dispatch
                  );
                } else {
                  console.log("nftContractAddress", data.nftContractAddress);
                  await collection_manager_calls.setMultipleAttributes(
                    currentAccount,
                    data.nftContractAddress,
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
                  <AdvancedModeInput
                    label="NFT Contract Address"
                    name="nftContractAddress"
                    type="text"
                    placeholder="NFT Contract Address"
                  />
                  <AdvancedModeInput
                    label="Collection Name"
                    name="collectionName"
                    type="collectionName"
                    placeholder="Collection Name"
                  />
                </HStack>

                <AdvancedModeTextArea
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
                    <ImageUpload
                      mode={mode}
                      isBanner={false}
                      id="collection-avatar"
                      imageIPFSUrl={avatarIPFSUrl}
                      setImageIPFSUrl={setAvatarIPFSUrl}
                      title="Collection Avatar Image"
                      limitedSize={{ width: "100", height: "100" }}
                    />
                    <ImageUpload
                      mode={mode}
                      isBanner={true}
                      id="collection-header"
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
                    <ImageUpload
                      mode={mode}
                      isBanner={true}
                      id="collection-header-square"
                      imageIPFSUrl={headerSquareIPFSUrl}
                      setImageIPFSUrl={setHeaderSquareIPFSUrl}
                      title="Collection Square Header"
                      limitedSize={{ width: "500", height: "500" }}
                    />
                  </Stack>
                </Stack>

                {mode === "add" && (
                  <Flex alignItems="center" minH={20} mt={5}>
                    <Stack
                      direction={{ base: "column", "2xl": "row" }}
                      alignItems="end"
                      minH={20}
                      minW={52}
                    >
                      <AdvancedModeSwitch
                        onChange={() => {
                          values.collectRoyalFee = !values.collectRoyalFee;
                          setIsSetRoyal(!isSetRoyal);
                        }}
                        label="Collect Royal Fee"
                        name="collectRoyalFee"
                      />
                    </Stack>
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
                  disabled={!(dirty && isValid)}
                  isLoading={addCollectionTnxStatus}
                  loadingText={`${addCollectionTnxStatus?.status}`}
                  mode={mode}
                />
                {/* <Button
                  disabled={!(dirty && isValid)}
                  spinnerPlacement="start"
                  isLoading={tnxStatus}
                  loadingText={`${tnxStatus?.status}`}
                  variant="solid"
                  w="full"
                  type="submit"
                  mt={8}
                  mb={{ xl: "16px", "2xl": "32px" }}
                >
                  {mode === "add" ? "Add new collection" : "Submit change"}
                </Button> */}
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default AdvancedModeForm;
