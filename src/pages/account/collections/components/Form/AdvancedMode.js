import { Button, HStack, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import CollectionImageUpload from "@components/ImageUpload/Collection";
import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { isValidAddressPolkadotAddress } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import AddCollectionNumberInput from "../NumberInput";
import AdvancedModeInput from "@components/Input/Input";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AdvancedModeTextArea from "@components/TextArea/TextArea";

const AdvancedModeForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(async () => {
    if (addingFee === 0) {
      const adddingFee = await collection_manager_calls.getAddingFee(
        currentAccount
      );
      setAddingFee(adddingFee / 10 ** 12);
    }
  }, [addingFee]);

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
          nftContractAddress: "",
          collectionName: "",
          collectionDescription: "",
          collectRoyalFee: false,
          royalFee: 10,
        }}
        validationSchema={Yup.object({
          nftContractAddress: Yup.string()
            .max(115, "Must be 115 characters or less")
            .required("Required"),
          collectionName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          collectionDescription: Yup.string()
            .max(20, "Must be 200 characters or less")
            .required("Required"),
          collectRoyalFee: Yup.boolean(),
          royalFee: Yup.string().when("collectRoyalFee", {
            is: (collectRoyalFee) => collectRoyalFee === true,
            then: Yup.string().required(
              "I am required now that checkboxes are checked"
            ),
          }),
        })}
        onSubmit={async (values, { setSubmitting }) => {

          
          (!headerIPFSUrl || !avatarIPFSUrl) && toast.error("Upload images first");

          if (avatarIPFSUrl && headerIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;
            if (!checkCurrentBalance) {
              toast.error(`Your balance not enough!`);
            } else if (
              !isValidAddressPolkadotAddress(values.nftContractAddress)
            ) {
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
            <CollectionImageUpload
              setImageIPFSUrl={setAvatarIPFSUrl}
              title="Collection Avatar Image"
              limitedSize={{ width: "64", height: "64" }}
            />

            <CollectionImageUpload
              setImageIPFSUrl={setHeaderIPFSUrl}
              title="Collection Header Image"
              limitedSize={{ width: "400", height: "260" }}
            />

            <Stack
              direction={{ base: "column", "2xl": "row" }}
              alignItems="end"
              minH={20}
              minW={52}
            >
              <AdvancedModeSwitch
                onChange={() => setIsSetRoyal(!isSetRoyal)}
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
            Add new collection
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default AdvancedModeForm;
