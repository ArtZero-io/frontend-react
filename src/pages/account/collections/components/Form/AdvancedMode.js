import { Button, HStack, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
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

import AddCollectionNumberInput from "../NumberInput";
import { clientAPI } from "@api/client";

const AdvancedModeForm = ({ mode, id }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
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
        setAddingFee(addingFeeData / 10 ** 12);
      }
    };
    fetchFee();
  }, [addingFee, currentAccount]);

  const checkCurrentBalance = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount.address
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
        } = dataList;

        newInitialValues = {
          nftContractAddress,
          collectionName,
          collectionDescription,
          collectRoyalFee,
          royalFee: royalFee / 100,
        };

        if (dataList) {
          setAvatarIPFSUrl(avatarImage);
          setHeaderIPFSUrl(headerImage);
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
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
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
          })}
          onSubmit={async (values, { setSubmitting }) => {
            (!headerIPFSUrl || !avatarIPFSUrl) &&
              toast.error("Upload images first");

            if (avatarIPFSUrl && headerIPFSUrl) {
              values.avatarIPFSUrl = avatarIPFSUrl;
              values.headerIPFSUrl = headerIPFSUrl;

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
                  ],

                  attributeVals: [
                    values.collectionName,
                    values.collectionDescription,
                    values.avatarIPFSUrl,
                    values.headerIPFSUrl,
                  ],

                  collectionAllowRoyalFee: values.collectRoyalFee,
                  collectionRoyalFeeData: values.collectRoyalFee
                    ? Math.round(values.royalFee * 100)
                    : 0,
                };

                await collection_manager_calls.addNewCollection(
                  currentAccount,
                  data,
                  dispatch
                );
              }
            }
          }}
        >
          {({ values }) => (
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
                direction={{ xl: "row", "2xl": "column" }}
                alignItems="start"
                justifyContent="space-between"
              >
                <ImageUpload
                  mode={mode}
                  id="collection-avatar"
                  imageIPFSUrl={avatarIPFSUrl}
                  setImageIPFSUrl={setAvatarIPFSUrl}
                  title="Collection Avatar Image"
                  limitedSize={{ width: "64", height: "64" }}
                />
                <ImageUpload
                  mode={mode}
                  id="collection-header"
                  imageIPFSUrl={headerIPFSUrl}
                  setImageIPFSUrl={setHeaderIPFSUrl}
                  title="Collection Header Image"
                  limitedSize={{ width: "400", height: "260" }}
                />{" "}
              </Stack>

              {mode === "add" && (
                <Stack
                  direction={{ xl: "row", "2xl": "column" }}
                  alignItems="start"
                  justifyContent="space-between"
                >
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

                    <AddCollectionNumberInput
                      isDisabled={!isSetRoyal}
                      isDisplay={isSetRoyal}
                      label="Royal Fee %"
                      name="royalFee"
                      type="number"
                      placeholder="Royal Fee"
                    />
                  </Stack>
                </Stack>
              )}

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
                {mode === "add" ? "Add new collection" : "Submit change"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AdvancedModeForm;
