/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { APICall } from "@api/client";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Spacer,
  HStack,
  VStack,
} from "@chakra-ui/react";
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
import CommonInput from "@components/Input/Input";
import { timestampWithoutCommas } from "@utils";
import { useLocation } from "react-router-dom";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import AdvancedModeInput from "@components/Input/Input";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AddCollectionNumberInput from "@components/Input/NumberInput";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import CommonStack from "./CommonStack";

const client = create(IPFS_CLIENT_URL);

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [addingFee, setAddingFee] = useState(0);
  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );
  const [maxRoyalFeeRate, setMaxRoyalFeeRate] = useState(0);
  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);

  // eslint-disable-next-line no-unused-vars
  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl;

  const location = useLocation();

  mode = location.state?.formMode;

  if (mode === "EDIT") {
    nftContractAddress = location.state?.collection_address;
  }

  useEffect(() => {
    const prepareData = async () => {
      const { error, initialValues, avatarIPFSUrl, headerIPFSUrl } =
        await fetchInitialValuesProject({
          currentAccount,
          api,
          mode,
          collection_address: nftContractAddress,
        });
      if (maxRoyalFeeRate === 0) {
        const maxRoyalFeeRateData =
          await collection_manager_calls.getMaxRoyalFeeRate(currentAccount);

        setMaxRoyalFeeRate(maxRoyalFeeRateData / 100);
        if (addingFee === 0) {
          const addingFeeData =
            await collection_manager_calls.getAdvanceModeAddingFee(
              currentAccount
            );

          setAddingFee(addingFeeData / 10 ** 12);
        }
      }
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
  }, [
    addingFee,
    api,
    currentAccount,
    maxRoyalFeeRate,
    mode,
    nftContractAddress,
  ]);

  const handleOnchangeSchedule = (e, setFieldValue) => {
    if (!e) {
      setFieldValue("startTime", null);
      setFieldValue("endTime", null);
      return;
    }

    if (e[1].getTime() < Date.now()) {
      toast.error("Project end time must be greater than current time!");
      return;
    }

    if (e[0].getTime() > e[1].getTime()) {
      toast.error("Project end time must be greater than start time!");
      return;
    }

    setFieldValue("startTime", e[0].getTime());
    setFieldValue("endTime", e[1].getTime());
  };

  return (
    <>
      {initialValues && (
        <Stack pb="120px">
          <Heading size={"h3"} pb="30px" textAlign="center">
            {`${mode === "ADD" ? "create new" : "edit"} project`}
          </Heading>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              // check all image uploaded?
              const memberAvatarAr = values?.members?.map((i) => i.avatar);
              const isAllMemberAvatarUpload = memberAvatarAr?.every((e) => e);

              if (
                !values.isEditMode &&
                (!headerIPFSUrl || !avatarIPFSUrl || !isAllMemberAvatarUpload)
              ) {
                return toast.error("Upload avatar or header please!");
              }

              values.avatarIPFSUrl = avatarIPFSUrl;
              values.headerIPFSUrl = headerIPFSUrl;

              // check prj time-frame is picked?
              const prjStartTime = values?.startTime;
              const prjEndTime = values?.endTime;
              if (!values.isEditMode && (!prjStartTime || !prjStartTime)) {
                return toast.error("Please pick time frame for project!");
              }

              // check all phase time-frame is picked?
              const phasesArray = values?.members?.phases;

              const startPhasesAr = phasesArray?.members?.map((i) => i.start);

              const isPhaseTimePicked = startPhasesAr?.every((e) => e);

              if (phasesArray && !isPhaseTimePicked) {
                return toast.error("Please pick time frame for all phases!");
              }

              // check time is overlap?
              if (phasesArray?.length) {
                const startFirstPhase = phasesArray[0]?.start;
                const endLastPhase = [...phasesArray].pop().end;

                if (
                  !(
                    prjStartTime <= startFirstPhase &&
                    startFirstPhase <= endLastPhase &&
                    endLastPhase <= prjEndTime
                  )
                ) {
                  toast.error("Phase time is not valid.");
                  return;
                }
              }

              //check low balance?
              if (userBalance < 1) {
                return toast.error(`Your balance too low!`);
              }

              const project_info = {
                name: values.name.trim(),
                description: values.description.trim(),
                website: values.website.trim(),
                twitter: values.twitter.trim(),
                discord: values.discord.trim(),
                nft_name: values.nftName.trim(),
                nft_symbol: values.nftSymbol.trim(),
                header: values.headerIPFSUrl,
                avatar: values.avatarIPFSUrl,
                team_members: values.members,
                roadmaps: values.roadmap,
              };

              const project_info_ipfs = await client.add(
                JSON.stringify(project_info)
              );
              let code_phases = [];
              let start_time_phases = [];
              let end_time_phases = [];
              for (let phase of values.phases) {
                code_phases.push(phase.name);
                start_time_phases.push(phase.start);
                end_time_phases.push(phase.end);
              }
              const data = {
                total_supply: Number(values.totalSupply),
                start_time: values.startTime,
                end_time: values.endTime,
                totalPublicMintingAmount: values.totalPublicMintingAmount,
                publicMintingFee: values.publicMintingFee,
                project_info: project_info_ipfs.path,
                code_phases: code_phases,
                start_time_phases: start_time_phases,
                end_time_phases: end_time_phases,
                collectionName: values.name.trim(),
                collectionDescription: values.description.trim(),
                avatarIPFSUrl: values.avatarIPFSUrl,
                headerIPFSUrl: values.headerIPFSUrl,
                headerSquareIPFSUrl: values.avatarIPFSUrl,
                website: values.website.trim(),
                twitter: values.twitter.trim(),
                discord: values.discord.trim(),
                collectRoyalFee: isSetRoyal,
                royalFee: values.royalFee,
                collectionAddingFee: addingFee,
              };

              if (mode === formMode.ADD) {
                dispatch({
                  type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
                  payload: {
                    status: "Start",
                  },
                });

                const createNewCollection = async (nft_address) => {
                  console.log("createNewCollection nft_address", nft_address);
                  // Lay gia tri nft_address tu launchpad_contract_calls roi tao collection
                  const collectionData = {
                    nftContractAddress: nft_address,
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
                      values.name,
                      values.description,
                      values.avatarIPFSUrl,
                      values.headerIPFSUrl,
                      values.avatarIPFSUrl,
                      values.website,
                      values.twitter,
                      values.discord,
                    ],
                    collectionAllowRoyalFee: isSetRoyal,
                    collectionRoyalFeeData: isSetRoyal
                      ? Math.round(values.royalFee * 100)
                      : 0,
                  };
                  await collection_manager_calls.addNewCollection(
                    currentAccount,
                    collectionData,
                    dispatch,
                    api
                  );
                  //
                };
                await launchpad_contract_calls.addNewProject(
                  currentAccount,
                  data,
                  dispatch,
                  "CREATE_PROJECT",
                  api,
                  createNewCollection
                );
              } else {
                if (mode === formMode.EDIT) {
                  console.log(values);
                  const project_info = {
                    name: values.name.trim(),
                    description: values.description.trim(),
                    website: values.website.trim(),
                    twitter: values.twitter.trim(),
                    discord: values.discord.trim(),
                    nft_name: values.nftName.trim(),
                    nft_symbol: values.nftSymbol.trim(),
                    header: values.headerIPFSUrl,
                    avatar: values.avatarIPFSUrl,
                    team_members: values.members,
                    roadmaps: values.roadmap,
                  };

                  const project_info_ipfs = await client.add(
                    JSON.stringify(project_info)
                  );
                  const launchpad_psp34_nft_standard_contract =
                    new ContractPromise(
                      api,
                      launchpad_psp34_nft_standard.CONTRACT_ABI,
                      location.state?.collection_address
                    );
                  launchpad_psp34_nft_standard_calls.setContract(
                    launchpad_psp34_nft_standard_contract
                  );
                  await launchpad_psp34_nft_standard_calls.editProjectInformation(
                    currentAccount,
                    project_info_ipfs.path
                  );
                }
              }
            }}
          >
            {({ values, dirty, isValid, setFieldValue, ...rest }) => (
              <Form>
                <CommonStack stackTitle="1. project info">
                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <Stack w={["100%", "406px"]}>
                      <Input
                        type="text"
                        name="name"
                        isRequired={true}
                        label="Project name"
                        placeholder="Project name"
                        isDisabled={addCollectionTnxStatus}
                      />{" "}
                    </Stack>

                    <Stack w="full">
                      {(mode === formMode.ADD) && (<Stack pb="30px">
                        <Text fontSize="lg" ml={1} mb="10px">
                          Start time - End time
                        </Text>
                        <DateTimeRangePicker
                          onChange={(e) =>
                            handleOnchangeSchedule(e, setFieldValue)
                          }
                          value={
                            !values?.startTime
                              ? null
                              : [
                                  new Date(parseInt(values?.startTime)),
                                  new Date(parseInt(values?.endTime)),
                                ]
                          }
                          locale="en-EN"
                        />
                        {/* TEMP FIX with parseInt */}
                      </Stack>)}
                    </Stack>
                  </Stack>

                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <CommonInput
                      type="text"
                      name="website"
                      label="Website URL"
                      placeholder={"Website URL"}
                      isDisabled={addCollectionTnxStatus}
                    />
                    <CommonInput
                      type="text"
                      name="twitter"
                      label="Twitter URL"
                      placeholder={"Twitter URL"}
                      isDisabled={addCollectionTnxStatus}
                    />
                    <CommonInput
                      type="text"
                      name="discord"
                      label="Discord URL"
                      placeholder={"Discord URL"}
                      isDisabled={addCollectionTnxStatus}
                    />
                  </Stack>

                  <Stack>
                    <TextArea
                      height="140"
                      type="text"
                      isRequired={true}
                      name="description"
                      label="Project description"
                      placeholder="Project description"
                      // isDisabled={addCollectionTnxStatus}
                    />
                  </Stack>

                  <Stack
                    minH="80px"
                    alignItems={["start", "end"]}
                    gap={["10px", "30px"]}
                    direction={["column", "row"]}
                  >
                    {mode === formMode.ADD && (
                      <Stack
                        bg=""
                        minW={52}
                        alignItems="end"
                        direction={{ base: "column", "2xl": "row" }}
                      >
                        <AdvancedModeSwitch
                          name="collectRoyalFee"
                          label="Collect Royal Fee"
                          isDisabled={addCollectionTnxStatus}
                          onChange={() => {
                            values.collectRoyalFee = !values.collectRoyalFee;
                            setIsSetRoyal(!isSetRoyal);
                          }}
                        />
                      </Stack>
                    )}

                    <AddCollectionNumberInput
                      isDisabled={!isSetRoyal || addCollectionTnxStatus}
                      isDisplay={isSetRoyal}
                      max={maxRoyalFeeRate}
                      label={`Royal Fee (max ${maxRoyalFeeRate}%)`}
                      name="royalFee"
                      type="number"
                      placeholder="Royal Fee"
                      inputWidth={"8rem"}
                    />
                  </Stack>

                  <Stack my="30px">
                    <Heading size="h5" mb="30px">
                      project roadmap
                    </Heading>
                    <AddRoadmap name="roadmap" />
                  </Stack>

                  <Stack my="30px">
                    <Heading size="h5" mb="30px">
                      project team member
                    </Heading>
                    <AddMember name="members" />
                  </Stack>

                  <Stack
                    py="20px"
                    alignItems="start"
                    justifyContent="space-between"
                    direction={["column", "row"]}
                  >
                    <Stack
                      w="50%"
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      <Heading size="h5">project avatar image</Heading>{" "}
                      <Text pt="30px">Choose avatar image</Text>
                      <ImageUpload
                        isDisabled={addCollectionTnxStatus}
                        id="avatar"
                        mode={mode}
                        isBanner={false}
                        imageIPFSUrl={avatarIPFSUrl}
                        setImageIPFSUrl={setAvatarIPFSUrl}
                        // title="Project Avatar Image"
                        limitedSize={{ width: "500", height: "500" }}
                      />
                    </Stack>

                    <Stack
                      w="50%"
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      <Heading size="h5">project header image</Heading>
                      <Text pt="30px">Choose header image</Text>

                      <ImageUpload
                        id="header"
                        mode={mode}
                        isBanner={true}
                        // title="Project Header Image"
                        imageIPFSUrl={headerIPFSUrl}
                        isDisabled={addCollectionTnxStatus}
                        setImageIPFSUrl={setHeaderIPFSUrl}
                        limitedSize={{ width: "1920", height: "600" }}
                      />
                    </Stack>
                  </Stack>
                </CommonStack>

                <CommonStack stackTitle="2. nft info">
                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <CommonInput
                      type="text"
                      name="nftName"
                      label="NFT Name"
                      isRequired={true}
                      placeholder="NFT Name"
                      isDisabled={addCollectionTnxStatus}
                    />

                    <CommonInput
                      type="text"
                      name="nftSymbol"
                      label="NFT Symbol"
                      isRequired={true}
                      placeholder="NFT Symbol"
                      isDisabled={addCollectionTnxStatus}
                    />
                    {mode === formMode.ADD && (
                    <NumberInput
                      height="52px"
                      precision={0}
                      isRequired={true}
                      name="totalSupply"
                      hasStepper={false}
                      inputWidth={"260px"}
                      label="Total Supply"
                      // step={1}
                      // type="number"
                      // placeholder="9999"
                      // isDisabled={addCollectionTnxStatus}
                    />)}
                  </Stack>
                  {mode === formMode.ADD && (
                    <Stack direction={{ base: "row", xl: "row" }}>
                    <NumberInput
                          // step={1}
                          // type="number"
                          // placeholder="9999"
                          height="52px"
                          name="publicMintingFee"
                          hasStepper={false}
                          inputWidth={"10rem"}
                          label="Public Minting Fee"
                          // isDisabled={addCollectionTnxStatus}
                        />
                      <Box pb="24px">
                        <NumberInput
                          // step={1}
                          // type="number"
                          // placeholder="9999"
                          height="52px"
                          precision={0}
                          name="totalPublicMintingAmount"
                          hasStepper={false}
                          inputWidth={"8rem"}
                          label="Total Public Minting Amount"
                          // isDisabled={addCollectionTnxStatus}
                        />
                      </Box>
                      </Stack>)}
                </CommonStack>
                {mode === formMode.ADD && (
                <CommonStack stackTitle="3. phases info">
                  <AddPhase name="phases" />
                </CommonStack>
                )}
                <VStack>
                  <Text color="#fff">
                    Create new collection you will pay
                    <strong> 999 $AZERO </strong> in fee to ArtZero.io
                  </Text>
                  <HStack justifyContent="center">
                    <CommonCheckbox
                      justifyContent="center"
                      isDisabled={addCollectionTnxStatus}
                      name="agreeTosCheckbox"
                      content="I agree to ArtZero's Terms of Service"
                    />
                  </HStack>
                  <Stack w="940px">
                    <StatusButton
                      // w="940px"
                      // w="full"
                      mode={mode}
                      text="project"
                      isLoading={addCollectionTnxStatus}
                      // disabled={!(dirty && isValid) && noImagesChange}
                      loadingText={`${addCollectionTnxStatus?.status}`}
                      type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
                    />
                  </Stack>
                </VStack>
              </Form>
            )}
          </Formik>
        </Stack>
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
  currentAccount,
  api,
  mode,
  collection_address,
}) => {
  let initialValues = {
    isEditMode: false,
    name: "",
    website: "",
    twitter: "",
    discord: "",
    description: "",
    roadmap: [{ type: "", content: "" }],
    members: [{ name: "", title: "", socialLink: "", avatar: "" }],
    nftName: "",
    nftSymbol: "",
    totalSupply: 0,
    totalPublicMintingAmount: 0,
    publicMintingFee: 0,
    phases: [{ name: "", start: "", end: "" }],
    agreeTosCheckbox: false,
  };

  // TEMP COMMENT
  if (mode === formMode.ADD) {
    return { initialValues };
  }

  try {
    const project = await launchpad_contract_calls.getProjectByNftAddress(
      currentAccount,
      collection_address
    );

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    const projectInfoHash =
      await launchpad_psp34_nft_standard_calls.getProjectInfo(currentAccount);
    const projectInfo =
      await launchpad_psp34_nft_standard_calls.getProjectInfoByHash(
        projectInfoHash
      );

    // Update initialValues
    const {
      isActive,
      projectType,
      projectOwner,
      totalSupply,
      totalPublicMintingAmount,
      publicMintingFee,
      startTime,
      endTime,
    } = project;
    const {
      name,
      description,
      website,
      twitter,
      discord,
      nft_name,
      nft_symbol,
      header,
      avatar,
      team_members,
      roadmaps,
    } = projectInfo;

    initialValues.isEditMode = true;
    initialValues.nftName = nft_name;
    initialValues.nftSymbol = nft_symbol;
    initialValues.name = name;
    initialValues.description = description;
    initialValues.totalSupply = totalSupply;
    initialValues.totalPublicMintingAmount = totalPublicMintingAmount;
    initialValues.publicMintingFee = publicMintingFee;
    initialValues.startTime = timestampWithoutCommas(startTime);
    initialValues.endTime = timestampWithoutCommas(endTime);
    initialValues.website = website;
    initialValues.twitter = twitter;
    initialValues.discord = discord;
    initialValues.members = team_members;
    initialValues.roadmap = roadmaps;
    initialValues.phases = [
      {
        name: "OG!!",
        start: new Date(1659027600000),
        end: new Date(1659286799999),
      },
    ];
    // TEMP SET TIME FRAME

    return {
      initialValues,
      avatarIPFSUrl: avatar,
      headerIPFSUrl: header,
    };
  } catch (error) {
    console.log(error);
    toast.error("There was an error while fetching data.");

    return { error };
  }
};

const validationName = Yup.string()
  .trim()
  .min(3, "Must be longer than 3 characters")
  .max(30, "Must be at most 30 characters")
  .required("This field is required");

const validationWebsite = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .max(50, "Must be at most 50 characters");

const validationTwitter = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .matches(/\btwitter.com\b/, "URL must be twitter.com")
  .max(50, "Must be at most 50 characters");

const validationDiscord = Yup.string()
  .trim()
  .url("URL must start with http:// or https://")
  .matches(/\bdiscord.(com|gg)\b/, "URL must be discord.com or discord.gg")
  .max(50, "Must be at most 50 characters");

const validationDescription = Yup.string()
  .trim()
  .min(3, "Must be longer than 3 characters")
  .max(150, "Must be at most 150 characters")
  .required("This field is required");

const validationNftName = Yup.string()
  .trim()
  .when("isEditMode", {
    is: false,
    then: Yup.string()
      .min(3, "Must be longer than 3 characters")
      .max(30, "Must be at most 30 characters")
      .required("This field is required"),
  });

const validationNftSymbol = Yup.string()
  .trim()
  .when("isEditMode", {
    is: false,
    then: Yup.string()
      .min(3, "Must be longer than 3 characters")
      .max(8, "Must be at most 8 characters")
      .required("This field is required"),
  });

const validationAgreeTosCheckbox = Yup.boolean().when("isEditMode", {
  is: false,
  then: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The TOCs must be accepted."),
});

const validationSchema = Yup.object().shape({
  isEditMode: Yup.boolean(),
  name: validationName,
  website: validationWebsite,
  twitter: validationTwitter,
  discord: validationDiscord,
  description: validationDescription,
  roadmap: Yup.array()
    .min(1, "Roadmap must have at least 1 items")
    .max(3, "Roadmap must have less than or equal to 3 items")
    .of(
      Yup.object().shape(
        {
          type: Yup.string()
            .trim()
            .when("content", {
              is: (val) => val,
              then: Yup.string()
                .test("Test type", "Duplicated milestone!", (value, schema) => {
                  const array = schema?.from[1].value?.roadmap;
                  const keyArray = array.map((p) => p.type?.trim());
                  const [isDup] = keyArray.filter(
                    (v, i) => i !== keyArray.indexOf(v)
                  );
                  return !(isDup && isDup.trim() === value.trim());
                })
                .required("This field is required")
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be at most 30 characters"),
              otherwise: Yup.string().notRequired(),
            }),
          content: Yup.string()
            .trim()
            .when("type", {
              is: (val) => val,
              then: Yup.string()
                .required("This field is required")
                .min(3, "Must be longer than 3 characters")
                .max(150, "Must be at most 150 characters"),
              otherwise: Yup.string().notRequired(),
            }),
        },
        [["type", "content"]]
      )
    ),
  members: Yup.array()
    .min(1, "Members must have at least 1 items")
    .max(3, "Members must have less than or equal to 3 items")
    .of(
      Yup.object().shape(
        {
          name: Yup.string()
            .trim()
            .when("title", {
              is: (val) => val,
              then: Yup.string()
                .test(
                  "Test name",
                  "Duplicated member name!",
                  (value, schema) => {
                    const array = schema?.from[1].value?.members;
                    const keyArray = array.map((p) => p.name?.trim());
                    const [isDup] = keyArray.filter(
                      (v, i) => i !== keyArray.indexOf(v)
                    );
                    return !(isDup && isDup.trim() === value.trim());
                  }
                )
                .required("This field is required")
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be at most 30 characters"),
              otherwise: Yup.string().notRequired(),
            }),
          title: Yup.string()
            .trim()
            .when("name", {
              is: (val) => val,
              then: Yup.string()
                .required("This field is required")
                .min(3, "Must be longer than 3 characters")
                .max(30, "Must be at most 30 characters"),
              otherwise: Yup.string().notRequired(),
            }),
          socialLink: validationWebsite,
        },
        [["name", "title"]]
      )
    ),
  nftName: validationNftName,
  nftSymbol: validationNftSymbol,
  phases: Yup.array()
    .min(1, "Phases must have at least 1 items")
    .max(3, "Phases must have less than or equal to 3 items")
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("This field is required")
          .min(3, "Must be longer than 3 characters")
          .max(30, "Must be at most 30 characters")
          .test("Test name", "Duplicated phase name!", (value, schema) => {
            const array = schema?.from[1].value?.phases;
            const keyArray = array.map((p) => p.name?.trim());
            const [isDup] = keyArray.filter(
              (v, i) => i !== keyArray.indexOf(v)
            );
            return !(isDup && isDup.trim() === value.trim());
          }),
      })
    ),
  agreeTosCheckbox: validationAgreeTosCheckbox,
});
