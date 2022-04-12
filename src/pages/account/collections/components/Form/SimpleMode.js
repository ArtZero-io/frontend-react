import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ImageUpload from "@components/ImageUpload/Collection";
import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import SimpleModeInput from "../../../components/Input";
import SimpleModeTextArea from "../../../components/TextArea";
import SimpleModeSwitch from "../../../components/Switch";
import { useDispatch } from "react-redux";

const SimpleModeForm = () => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const { currentAccount, api } = useSubstrateState();
  const dispatch = useDispatch();
  useEffect(async () => {
    if (addingFee == 0) {
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
          nftName: "",
          nftSymbol: "",
          collectionName: "",
          collectionDescription: "",
          collectRoyalFee: false,
          royalFee: 10,
        }}
        validationSchema={Yup.object({
          nftName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          nftSymbol: Yup.string()
            .max(20, "Must be 5 characters or less")
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
          console.log("values first", values);

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
                ],
                attributeVals: [
                  values.collectionName,
                  values.collectionDescription,
                  values.avatarIPFSUrl,
                  values.headerIPFSUrl,
                ],
                collectionAllowRoyalFee: values.collectionRoyalFee,
                collectionRoyalFeeData: values.collectionRoyalFee
                  ? Math.round(values.royalFee * 100)
                  : 0,
              };

              await collection_manager_calls.autoNewCollection(
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
              type="collectionName"
              placeholder="Collection Name"
            />
          </HStack>

          <SimpleModeTextArea
            label="Collection Description"
            name="collectionDescription"
            type="text"
            placeholder="Collection Description"
          />

          <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="start">
            <ImageUpload setImageIPFSUrl={setAvatarIPFSUrl} />

            <ImageUpload setImageIPFSUrl={setHeaderIPFSUrl} />

            <Stack direction={{ xl: "row", "2xl": "column" }} alignItems="end">
              <SimpleModeSwitch
                label="Collect Royal Fee"
                name="collectRoyalFee"
              />

              <SimpleModeNumberInput
                label="Royal Fee %"
                name="royalFee"
                type="number"
                placeholder="Royal Fee"
              />
            </Stack>
          </Stack>

          <Button
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

export default SimpleModeForm;

const SimpleModeNumberInput = ({ label, name, isDisabled, ...props }) => {
  // const [, meta] = useField(props);
  return (
    <Field name="royalFee">
      {({ field, form }) => (
        <FormControl id={name}>
          <FormLabel ml={1} htmlFor="royalFee">
            {label}
          </FormLabel>
          <NumberInput
            isDisabled={isDisabled}
            id={name}
            min={0}
            max={5}
            precision={0}
            step={0.01}
            bg="black"
            {...field}
            onChange={(val) => form.setFieldValue(field.name, val)}
          >
            <NumberInputField borderRadius="0" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}
    </Field>
  );
};
