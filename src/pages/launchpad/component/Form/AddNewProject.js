import { APICall } from "@api/client";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import StatusButton from "@components/Button/StatusButton";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import ImageUpload from "@components/ImageUpload/Collection";
import Input from "@components/Input/Input";
import NumberInput from "@components/Input/NumberInput";
import TextArea from "@components/TextArea/TextArea";
import { formMode } from "@constants";
import { IPFS_CLIENT_URL } from "@constants/index";
import { formatBalance } from "@polkadot/util";
import { AccountActionTypes } from "@store/types/account.types";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { useSubstrateState } from "@utils/substrate";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import { Form, Formik } from "formik";
import { create } from "ipfs-http-client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AddMember from "./AddMember";
import AddPhase from "./AddPhase";
import AddRoadmap from "./AddRoadmap";
const client = create(IPFS_CLIENT_URL);

// 1. Project info tab
// project name
// Start time - End time
// project desc
// project roadmap dang add more
// project team member dang add more
// Project Header Image

// 2. NFT info tab
// Name
// Symbol
// Total Supply

// 3. Phase Info
// có 3 item default (OG, Whitelist Mint, Public Mint) dạng add more
// phase item gồm {code, name, start time, end time}

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
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
              // projectRoadmap: Yup.string()
              //   .trim()
              //   .min(3, "Must be longer than 3 characters")
              //   .max(150, "Must be less than 150 characters")
              //   .required("Required"),
              // projectTeamMembers: Yup.string()
              //   .trim()
              //   .min(3, "Must be longer than 3 characters")
              //   .max(150, "Must be less than 150 characters")
              //   .required("Required"),

              roadmap: Yup.array()
                .of(
                  Yup.object().shape(
                    {
                      type: Yup.string()
                        .trim()
                        // .when("content", {
                        //   is: (val) => val,
                        //   then: Yup.string()
                        //     .test(
                        //       "Test Prop",
                        //       "Duplicated Props Type!",
                        //       (value, schema) => {
                        //         const propsArr = schema?.from[1].value?.roadmap;

                        //         const keyPropsArr = propsArr.map((p) =>
                        //           p.type?.trim()
                        //         );

                        //         const [isDup] = keyPropsArr.filter(
                        //           (v, i) => i !== keyPropsArr.indexOf(v)
                        //         );

                        //         return !(
                        //           isDup && isDup.trim() === value.trim()
                        //         );
                        //       }
                        //     )
                        //     .required("Must have type value.")
                        //     .min(3, "Must be longer than 3 characters")
                        //     .max(30, "Must be less than 30 characters"),
                        //   otherwise: Yup.string().notRequired(),
                        // })
                        ,
                      content: Yup.string()
                        .trim()
                        .when("type", {
                          is: (val) => val,
                          then: Yup.string()
                            .required("Must have name value.")
                            .min(3, "Must be longer than 3 characters")
                            .max(30, "Must be less than 30 characters"),
                          otherwise: Yup.string().notRequired(),
                        }),
                    },
                    [["type", "content"]]
                  )
                )
                .min(0)
                .max(10),
              members: Yup.array(
                Yup.object().shape(
                  {
                    name: Yup.string()
                      .trim()
                      .when("level", {
                        is: (val) => val,
                        then: Yup.string()
                          .test(
                            "Test Level",
                            "Duplicated Levels Name!",
                            (value, schema) => {
                              const levelsArr = schema?.from[1].value?.levels;

                              const keyLevelsArr = levelsArr.map((p) =>
                                p.name?.trim()
                              );

                              const [isDup] = keyLevelsArr.filter(
                                (v, i) => i !== keyLevelsArr.indexOf(v)
                              );

                              return !(isDup && isDup.trim() === value.trim());
                            }
                          )
                          .required("Must have level name.")
                          .min(3, "Must be longer than 3 characters")
                          .max(30, "Must be less than 30 characters"),
                        otherwise: Yup.string().notRequired(),
                      }),
                    level: Yup.number().when("levelMax", {
                      is: (val) => val,
                      then: Yup.number()
                        .required("Must have min value.")
                        .min(1, "Must be bigger than 0")
                        .max(Yup.ref("levelMax"), "Must smaller than max"),
                      otherwise: Yup.number().notRequired(),
                    }),
                    levelMax: Yup.number().when("name", {
                      is: (val) => val,
                      then: Yup.number()
                        .required("Must have max value.")
                        .min(Yup.ref("level"), "Must greater than level")
                        .max(10, "Must be smaller than 10"),
                      otherwise: Yup.number().notRequired(),
                    }),
                  },
                  [["name", "level", "levelMax"]]
                )
              )
                .min(0)
                .max(10),
              phases: Yup.array(
                Yup.object().shape(
                  {
                    name: Yup.string()
                      .trim()
                      .when("level", {
                        is: (val) => val,
                        then: Yup.string()
                          .test(
                            "Test Level",
                            "Duplicated Levels Name!",
                            (value, schema) => {
                              const levelsArr = schema?.from[1].value?.levels;

                              const keyLevelsArr = levelsArr.map((p) =>
                                p.name?.trim()
                              );

                              const [isDup] = keyLevelsArr.filter(
                                (v, i) => i !== keyLevelsArr.indexOf(v)
                              );

                              return !(isDup && isDup.trim() === value.trim());
                            }
                          )
                          .required("Must have level name.")
                          .min(3, "Must be longer than 3 characters")
                          .max(30, "Must be less than 30 characters"),
                        otherwise: Yup.string().notRequired(),
                      }),
                    level: Yup.number().when("levelMax", {
                      is: (val) => val,
                      then: Yup.number()
                        .required("Must have min value.")
                        .min(1, "Must be bigger than 0")
                        .max(Yup.ref("levelMax"), "Must smaller than max"),
                      otherwise: Yup.number().notRequired(),
                    }),
                    levelMax: Yup.number().when("name", {
                      is: (val) => val,
                      then: Yup.number()
                        .required("Must have max value.")
                        .min(Yup.ref("level"), "Must greater than level")
                        .max(10, "Must be smaller than 10"),
                      otherwise: Yup.number().notRequired(),
                    }),
                  },
                  [["name", "level", "levelMax"]]
                )
              )
                .min(0)
                .max(10),

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

              const project_info = {
                name: values.projectName.trim(),
                description: values.projectDescription.trim(),
                header: values.headerIPFSUrl,
                avatar: values.avatarIPFSUrl,
                team_members: values.projectTeamMembers,
                roadmaps: values.projectRoadmap,
              };
              console.log(project_info);
              const project_info_ipfs = await client.add(
                JSON.stringify(project_info)
              );
              console.log(project_info_ipfs.path);
              const data = {
                total_supply: Number(values.totalSupply),
                start_time: scheduleProject[0].getTime(),
                end_time: scheduleProject[1].getTime(),
                project_info: project_info_ipfs.path,
              };
              console.log("data", data);
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
                  dispatch,
                  api
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
                {console.log("values", values)}
                <Stack>
                  <Heading size="h4">1. Project info</Heading>

                  <Stack
                    direction={{ base: "column", xl: "row" }}
                    align="flex-end"
                  >
                    <Input
                      type="text"
                      isRequired={true}
                      name="projectName"
                      label="Project name"
                      placeholder="Project name"
                      isDisabled={addCollectionTnxStatus}
                    />
                    <Stack w={{ base: "315px", xl: "775px" }} pb="30px">
                      <Text fontSize="lg" ml={1} mb="10px">
                        Start time - End time
                      </Text>
                      <DateTimeRangePicker
                        onChange={setScheduleProject}
                        value={scheduleProject}
                        locale="en-EN"
                      />
                    </Stack>
                  </Stack>

                  <Stack>
                    <TextArea
                      height="140"
                      type="text"
                      isRequired={true}
                      name="projectDescription"
                      label="Project description"
                      placeholder="Project description"
                      isDisabled={addCollectionTnxStatus}
                    />
                    <Heading size="h6">project roadmap</Heading>
                    <AddRoadmap name="roadmap" />

                    <Heading size="h6">project team member</Heading>
                    <AddMember name="members" />
                  </Stack>

                  <Stack
                    py="20px"
                    direction={{ base: "column", xl: "row" }}
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
                </Stack>

                <Stack>
                  <Heading size="h4"> 2. NFT info</Heading>
                  {mode === formMode.ADD && (
                    <Stack direction={{ base: "column", xl: "row" }}>
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
                      <Box pb="24px">
                        <NumberInput
                          height="52px"
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
                      </Box>
                    </Stack>
                  )}
                </Stack>

                <Stack>
                  <Heading size="h4"> 3. Phase Info</Heading>
                  <AddPhase name="phases" />
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

export const fetchUserBalance = async ({ currentAccount, api }) => {
  if (currentAccount) {
    const {
      data: { free: balance },
    } = await api.query.system.account(currentAccount?.address);

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
    roadmap: [{ type: "2022 Q1", content: "Do something" }],
    members: [{ name: "Mr. A", title: "Boss", avatar: "" }],
    phases: [
      { name: "OG mint 1", start: "", end: "" },
      { name: "WhiteList mint 1", start: "", end: "" },
      { name: "Public mint1", start: "", end: "" },
    ],
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
