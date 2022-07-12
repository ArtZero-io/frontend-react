/* eslint-disable no-unused-vars */
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Flex, HStack, Spacer, Stack, Text } from "@chakra-ui/react";

import Input from "@components/Input/Input";
import NumberInput from "@components/Input/NumberInput";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";

import TextArea from "@components/TextArea/TextArea";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import StatusButton from "@components/Button/StatusButton";
import ImageUpload from "@components/ImageUpload/Collection";

import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { formMode } from "@constants";
import { APICall } from "@api/client";
import { AccountActionTypes } from "@store/types/account.types";
import { formatBalance } from "@polkadot/util";
import { TimePicker } from "../../../../components/TimePicker/TimePicker";
import JsonUpload from "../../../../components/JsonUpload/JsonUpload";

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
  const [jsonIPFSUrl, setJsonIPFSUrl] = useState("");

  console.log("jsonIPFSUrl", jsonIPFSUrl);
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [scheduleProject, setScheduleProject] = useState([
    new Date(),
    new Date(),
  ]);
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

              const data = {
                total_supply: Number(values.totalSupply),
                start_time: scheduleProject[0].getTime(),
                end_time: scheduleProject[1].getTime(),
                project_info: values.project_info,
              };

              dispatch({
                type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
                payload: {
                  status: "Start",
                },
              });

              if (mode === formMode.ADD) {
                await launchpad_contract_calls.addNewProject(
                  currentAccount,
                  data,
                  dispatch
                );
              }

              // if (mode === formMode.EDIT) {
              //   await collection_manager_calls.setMultipleAttributes(
              //     currentAccount,
              //     nftContractAddress,
              //     data.attributes,
              //     data.attributeVals,
              //     dispatch,
              //     api
              //   );
              // }
            }}
          >
            {({ values, dirty, isValid }) => (
              <Form>
                {mode === formMode.ADD && (
                  <>
                    <Input
                      type="text"
                      name="project_info"
                      label="Project Information"
                      isRequired={true}
                      placeholder="Project Information"
                      isDisabled={addCollectionTnxStatus}
                    />
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
                      <Stack>
                        <Text>Start time - End time</Text>
                        <DateTimeRangePicker
                          onChange={setScheduleProject}
                          value={scheduleProject}
                          locale="en-EN"
                        />
                      </Stack>
                    </HStack>
                    <JsonUpload
                      jsonIPFSUrl={jsonIPFSUrl}
                      setJsonIPFSUrl={setJsonIPFSUrl}
                    />
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
    project_info: "",
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
