import { Box, Button, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
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

const SimpleModeForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);

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

  return (
    <>
      <Formik
        initialValues={{
          nftName: "",
          nftSymbol: "",
          collectionName: "",
          collectionDescription: "",
          collectRoyalFee: false,
          royalFee: 10,
          website: "",
          twitter: "",
          discord: "",
        }}
        validationSchema={Yup.object({
          nftName: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(25, "Must be less than 25 characters")
            .required("Required"),
          nftSymbol: Yup.string()
            .min(3, "Must be longer than 3 characters")
            .max(8, "Must be less than 8 characters")
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
        })}
        onSubmit={async (values, { setSubmitting }) => {
          (!headerIPFSUrl || !avatarIPFSUrl) &&
            toast.error("Upload avatar or header too");

          if (avatarIPFSUrl && headerIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;

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
                  "website",
                  "twitter",
                  "discord",
                ],

                attributeVals: [
                  values.collectionName,
                  values.collectionDescription,
                  values.avatarIPFSUrl,
                  values.headerIPFSUrl,
                  values.website,
                  values.twitter,
                  values.discord,
                ],

                collectionAllowRoyalFee: values.collectionRoyalFee,
                collectionRoyalFeeData: values.collectionRoyalFee
                  ? Math.round(values.royalFee * 100)
                  : 0,
              };

              console.log('data', data)
              await collection_manager_calls.autoNewCollection(
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
                setImageIPFSUrl={setAvatarIPFSUrl}
                title="Collection Avatar Image"
                limitedSize={{ width: "64", height: "64" }}
              />

              <CollectionImageUpload
                id="header"
                setImageIPFSUrl={setHeaderIPFSUrl}
                title="Collection Header Image"
                limitedSize={{ width: "400", height: "260" }}
              />
            </Stack>

            <Flex alignItems="center" minH={20} mt={5}>
              <Box w="15rem">
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
            </Flex>

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
              Add new collection
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SimpleModeForm;
