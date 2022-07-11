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
import { TimePicker } from "../../../../components/TimePicker/TimePicker";

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
                agreeTosCheckbox: Yup.boolean().when("isEditMode", {
                  is: false,
                  then: Yup.boolean()
                    .required("The terms and conditions must be accepted.")
                    .oneOf([true], "The TOCs must be accepted."),
                }),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              // if (!values.isEditMode && (!headerIPFSUrl || !avatarIPFSUrl)) {
              //   return toast.error("Upload avatar or header please!");
              // }

              // values.avatarIPFSUrl = avatarIPFSUrl;
              // values.headerIPFSUrl = headerIPFSUrl;

              // if (userBalance < 1) {
              //   return toast.error(`Your balance too low!`);
              // }
              const data = {};
              // const data = {
              //   nftName: values.nftName,
              //   nftSymbol: values.nftSymbol,

              //   attributes: [
              //     "name",
              //     "description",
              //     "avatar_image",
              //     "header_image",
              //   ],

              //   attributeVals: [
              //     values.projectName.trim(),
              //     values.projectDescription.trim(),
              //     values.avatarIPFSUrl,
              //     values.headerIPFSUrl,
              //   ],
              // };

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
                {mode === formMode.ADD && (
                  <>
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
                  </>
                )}
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

const fetchUserBalance = async ({ currentAccount, api }) => {
  const {
    data: { free: balance },
  } = await api.query.system.account(currentAccount?.address);

  const [chainDecimals] = await api.registry.chainDecimals;

  const formattedStrBal = formatBalance(
    balance,
    { withSi: false, forceUnit: "-" },
    chainDecimals
  );

  const formattedNumBal = formattedStrBal.replace(",", "") * 1;

  return { balance: formattedNumBal };
};

const fetchInitialValuesProject = async ({ mode, collection_address }) => {
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
