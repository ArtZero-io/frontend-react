import { Heading, Stack, Text, HStack, VStack } from "@chakra-ui/react";
import BN from "bn.js";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import ImageUpload from "@components/ImageUpload/Collection";
import NumberInput from "@components/Input/NumberInput";
import TextArea from "@components/TextArea/TextArea";
import { formMode } from "@constants";

import { formatBalance } from "@polkadot/util";
import launchpad_contract_calls from "@utils/blockchain/launchpad-contract-calls";
import { useSubstrateState } from "@utils/substrate";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker";

import { Form, Formik } from "formik";

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AddMember from "./AddMember";
import AddPhase from "./AddPhase";
import AddRoadmap from "./AddRoadmap";
import CommonInput from "@components/Input/Input";
import { timestampWithoutCommas } from "@utils";
import { useHistory, useLocation } from "react-router-dom";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AddCollectionNumberInput from "@components/Input/NumberInput";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import CommonStack from "./CommonStack";
import emailjs from "@emailjs/browser";

import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import CommonButton from "@components/Button/CommonButton";
import {
  CREATE_PROJECT,
  EDIT_PROJECT,
  CREATE_COLLECTION,
  START,
} from "@constants";
import * as ROUTES from "@constants/routes";
import { getPublicCurrentAccount } from "@utils";

import { ipfsClient } from "@api/client";

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentAccount, api } = useSubstrateState();

  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [addingFee, setAddingFee] = useState(0);
  const [maxRoyalFeeRate, setMaxRoyalFeeRate] = useState(0);
  const [addProjectTotalFee, setAddProjectTotalFee] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [newNFTAddress, setNewNFTAddress] = useState(null);

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  // eslint-disable-next-line no-unused-vars
  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl;

  const location = useLocation();
  console.log("nftContractAddress add new", nftContractAddress);
  mode = location.state?.formMode;

  if (mode === "EDIT") {
    nftContractAddress = location.state?.collection_address;
  }

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

  const handleOnRedirect = () => {
    if (mode === formMode.ADD) {
      toast.success(
        "Thank you for submitting. Our team member will get in touch with you in the next 48 hours."
      );

      history.push(`/account/projects`);
    } else {
      history.push(`${ROUTES.LAUNCHPAD_BASE}/${nftContractAddress}`);
    }
  };

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

  useEffect(() => {
    const fetchAddProjectFee = async () => {
      const addProjFee = await launchpad_contract_calls.getProjectAddingFee(
        currentAccount || getPublicCurrentAccount()
      );

      const addCollectionFee =
        await collection_manager_calls.getAdvanceModeAddingFee(
          currentAccount || getPublicCurrentAccount()
        );

      const totalFee =
        addProjFee.toNumber() / 10 ** 12 + addCollectionFee / 10 ** 12;
      setAddProjectTotalFee(totalFee);
    };

    fetchAddProjectFee();
  }, [currentAccount]);

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
              // check wallet connect?
              if (!currentAccount) {
                return toast.error("Please connect wallet first!");
              }

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

              const project_info_ipfs = await ipfsClient.add(
                JSON.stringify(project_info)
              );

              console.log(
                "ADD project_info_ipfs NEED CHECK",
                project_info_ipfs
              );
              let code_phases = [];
              let start_time_phases = [];
              let end_time_phases = [];
              let is_public_phases = [];
              let public_minting_fee_phases = [];
              let public_minting_amout_phases = [];
              let public_max_minting_amount_phases = [];
              for (let phase of values.phases) {
                code_phases.push(phase.name);
                is_public_phases.push(phase.isPublic);
                let public_minting_fee_phase_tmp = phase.isPublic
                  ? new BN(phase.publicMintingFee * 10 ** 6)
                      .mul(new BN(10 ** 6))
                      .toString()
                  : 0;
                public_minting_fee_phases.push(public_minting_fee_phase_tmp);
                let public_minting_amout_phase_tmp =
                  phase.isPublic && phase.publicAmount ? phase.publicAmount : 0;
                  
                let public_max_minting_amount_phase_tmp = phase.isPublic && phase.publicMaxMintingAmount ? phase.publicMaxMintingAmount : 0;
                public_minting_amout_phases.push(
                  public_minting_amout_phase_tmp
                );
                public_max_minting_amount_phases.push(public_max_minting_amount_phase_tmp);
                start_time_phases.push(phase.start);
                end_time_phases.push(phase.end);
              }

              const data = {
                total_supply: Number(values.totalSupply),
                start_time: values.startTime,
                end_time: values.endTime,
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
                is_public_phases: is_public_phases,
                public_minting_fee_phases: public_minting_fee_phases,
                public_minting_amout_phases: public_minting_amout_phases,
                public_max_minting_amount_phases: public_max_minting_amount_phases
              };

              if (mode === formMode.ADD) {
                const createNewCollection = async (nft_address) => {
                  setNewNFTAddress(nft_address);
                  console.log("ADD createNewCollection nft_address", nft_address);
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

                  dispatch(
                    setTxStatus({ type: CREATE_COLLECTION, step: START })
                  );

                  toast.success("Step 2. Creating collection...");

                  await collection_manager_calls.addNewCollection(
                    currentAccount,
                    collectionData,
                    dispatch,
                    CREATE_COLLECTION,
                    api
                  );
                  var templateParams = {
                    email_owner: values.email_owner,
                    nft_address: nft_address,
                    project_name: values.name,
                    reply_to: values.email_owner,
                  };
                  emailjs
                    .send(
                      "service_gz6dl9u",
                      "template_980idtm",
                      templateParams,
                      "q4EO2tL6l8kY1jEZh"
                    )
                    .then(
                      function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                      },
                      function (error) {
                        console.log("FAILED...", error);
                      }
                    );
                };

                console.log("addNewProject data", data);

                dispatch(setTxStatus({ type: CREATE_PROJECT, step: START }));

                toast.success("Step 1. Creating project...");

                await launchpad_contract_calls.addNewProject(
                  currentAccount,
                  data,
                  dispatch,
                  CREATE_PROJECT,
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

                  const project_info_ipfs = await ipfsClient.add(
                    JSON.stringify(project_info)
                  );
                  console.log(
                    "EDIT project_info_ipfs NEED CHECK",
                    project_info_ipfs
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

                  dispatch(setTxStatus({ type: EDIT_PROJECT, step: START }));

                  await launchpad_psp34_nft_standard_calls.editProjectInformation(
                    currentAccount,
                    project_info_ipfs.path,
                    dispatch,
                    EDIT_PROJECT,
                    api
                  );
                }
              }
            }}
          >
            {({ values, dirty, isValid, setFieldValue }) => (
              <Form>
                <CommonStack stackTitle="1. project info">
                  <Stack
                    pb="30px"
                    alignItems="start"
                    justifyContent="space-between"
                    direction={["column", "row"]}
                  >
                    <Stack
                      w={{ base: "full", xl: "50%" }}
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      {/* <Heading size="h5">project avatar image</Heading>{" "} */}
                      {/* <Text pt={{ base: "10px", xl: "30px" }}> */}
                      <Text>Choose avatar image</Text>
                      <ImageUpload
                        isDisabled={actionType}
                        id="avatar"
                        mode={mode}
                        isBanner={false}
                        imageIPFSUrl={avatarIPFSUrl}
                        setImageIPFSUrl={setAvatarIPFSUrl}
                        limitedSize={{ width: "500", height: "500" }}
                      />
                    </Stack>

                    <Stack
                      pt={{ base: "30px", xl: "0px" }}
                      w={{ base: "full", xl: "50%" }}
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      {/* <Heading size="h5">project header image</Heading> */}
                      {/* <Text pt={{ base: "10px", xl: "30px" }}> */}
                      <Text>Choose header image</Text>

                      <ImageUpload
                        id="header"
                        mode={mode}
                        isBanner={true}
                        imageIPFSUrl={headerIPFSUrl}
                        isDisabled={actionType}
                        setImageIPFSUrl={setHeaderIPFSUrl}
                        limitedSize={{ width: "1920", height: "600" }}
                      />
                    </Stack>
                  </Stack>

                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <Stack w={["100%", "416px"]}>
                      <CommonInput
                        mx="0"
                        type="text"
                        name="name"
                        isRequired={true}
                        label="Project name"
                        placeholder="Project name"
                        isDisabled={actionType}
                      />
                    </Stack>

                    <Stack w="full">
                      {mode === formMode.ADD && (
                        <Stack pb="30px">
                          <Text fontSize="lg" ml={1}>
                            Start time - End time{" "}
                            <Text as="span" fontSize="lg" color="#fc8181">
                              *
                            </Text>
                          </Text>
                          <DateTimeRangePicker
                            disableClock
                            disabled={actionType}
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
                        </Stack>
                      )}
                    </Stack>
                  </Stack>

                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <CommonInput
                      mx="0"
                      type="text"
                      name="website"
                      label="Website URL"
                      placeholder={"Website URL"}
                      isDisabled={actionType}
                    />
                    <CommonInput
                      mx="0"
                      type="text"
                      name="twitter"
                      label="Twitter URL"
                      placeholder={"Twitter URL"}
                      isDisabled={actionType}
                    />
                    <CommonInput
                      mx="0"
                      type="text"
                      name="discord"
                      label="Discord URL"
                      placeholder={"Discord URL"}
                      isDisabled={actionType}
                    />
                  </Stack>

                  <Stack>
                    <TextArea
                      mx="0"
                      height="140"
                      type="text"
                      isRequired={true}
                      name="description"
                      label="Project description"
                      placeholder="Project description"
                      isDisabled={actionType}
                    />
                  </Stack>

                  <Stack
                    minH="86px"
                    alignItems={["start", "end"]}
                    gap={["10px", "30px"]}
                    direction={["column", "row"]}
                  >
                    {mode === formMode.ADD && (
                      <Stack
                        bg=""
                        minW={"238px"}
                        alignItems="end"
                        direction={{ base: "column", "2xl": "row" }}
                      >
                        <AdvancedModeSwitch
                          name="collectRoyalFee"
                          label="Collect Royal Fee"
                          isDisabled={actionType}
                          onChange={() => {
                            values.collectRoyalFee = !values.collectRoyalFee;
                            setIsSetRoyal(!isSetRoyal);
                          }}
                        />
                      </Stack>
                    )}

                    <AddCollectionNumberInput
                      isDisabled={!isSetRoyal || actionType}
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
                    <AddRoadmap
                      name="roadmap"
                      mode={mode}
                      isDisabled={actionType}
                    />
                  </Stack>

                  <Stack my="30px">
                    <Heading size="h5" mb="30px">
                      project team member
                    </Heading>

                    <AddMember
                      name="members"
                      mode={mode}
                      isDisabled={actionType}
                    />
                  </Stack>

                  {/* <Stack
                    py="20px"
                    alignItems="start"
                    justifyContent="space-between"
                    direction={["column", "row"]}
                  >
                    <Stack
                      w={{ base: "full", xl: "50%" }}
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      <Heading size="h5">project avatar image</Heading>{" "}
                      <Text pt={{ base: "10px", xl: "30px" }}>
                        Choose avatar image
                      </Text>
                      <ImageUpload
                        isDisabled={actionType}
                        id="avatar"
                        mode={mode}
                        isBanner={false}
                        imageIPFSUrl={avatarIPFSUrl}
                        setImageIPFSUrl={setAvatarIPFSUrl}
                        limitedSize={{ width: "500", height: "500" }}
                      />
                    </Stack>

                    <Stack
                      pt={{ base: "30px", xl: "0px" }}
                      w={{ base: "full", xl: "50%" }}
                      direction="column"
                      alignItems="start"
                      justifyContent="end"
                    >
                      <Heading size="h5">project header image</Heading>
                      <Text pt={{ base: "10px", xl: "30px" }}>
                        Choose header image
                      </Text>

                      <ImageUpload
                        id="header"
                        mode={mode}
                        isBanner={true}
                        imageIPFSUrl={headerIPFSUrl}
                        isDisabled={actionType}
                        setImageIPFSUrl={setHeaderIPFSUrl}
                        limitedSize={{ width: "1920", height: "600" }}
                      />
                    </Stack>
                  </Stack> */}
                </CommonStack>

                <CommonStack stackTitle="2. nft info">
                  <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                    <CommonInput
                      type="text"
                      name="nftName"
                      label="NFT Name"
                      isRequired={true}
                      placeholder="NFT Name"
                      isDisabled={actionType}
                    />

                    <CommonInput
                      type="text"
                      name="nftSymbol"
                      label="NFT Symbol"
                      isRequired={true}
                      placeholder="NFT Symbol"
                      isDisabled={actionType}
                    />
                    {mode === formMode.ADD && (
                      <NumberInput
                        precision={0}
                        isRequired={true}
                        name="totalSupply"
                        hasStepper={false}
                        inputWidth={{ base: "full", xl: "260px" }}
                        label="Total Supply"
                        isDisabled={actionType}
                      />
                    )}
                  </Stack>
                </CommonStack>

                {mode === formMode.ADD && (
                  <CommonStack stackTitle="3. phases info">
                    <AddPhase
                      name="phases"
                      mode={mode}
                      isDisabled={actionType}
                    />
                  </CommonStack>
                )}

                {mode === formMode.ADD && (
                  <CommonStack stackTitle="4. Contact info">
                    <CommonInput
                      isRequired={true}
                      type="text"
                      name="email_owner"
                      label="Enter your email so we can contact for additional information."
                      placeholder={"Email Contact"}
                      isDisabled={actionType}
                    />
                  </CommonStack>
                )}

                <VStack maxW="900px" mx="auto">
                  {mode === formMode.ADD && (
                    <>
                      <HStack w="full" px="15px">
                        <CommonCheckbox
                          justifyContent="center"
                          isDisabled={actionType}
                          name="agreeFeeCheckbox"
                          content={`Create new project you will pay ${addProjectTotalFee} $AZERO in fee to
                          ArtZero.io. This fee is non-refundable.`}
                        />
                      </HStack>
                      <HStack justifyContent="center" w="full" px="15px">
                        <CommonCheckbox
                          isDisabled={actionType}
                          name="agreeTosCheckbox"
                          content="I agree to ArtZero's Terms of Service."
                        />
                      </HStack>
                    </>
                  )}

                  <Stack
                    w={{ base: "full", xl: "940px" }}
                    px={{ base: "15px", xl: "0px" }}
                  >
                    <CommonButton
                      mx="0"
                      onRedirect={handleOnRedirect}
                      w="full"
                      my="24px"
                      {...rest}
                      type="submit"
                      text={`${
                        mode === formMode.ADD ? "create" : "update"
                      } project`}
                      isDisabled={!(dirty && isValid) && noImagesChange}
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
  if (currentAccount && api) {
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
    phases: [
      {
        name: "",
        start: "",
        end: "",
        isPublic: false,
        publicMintingFee: 0,
        publicAmount: 0,
        publicMaxMintingAmount: 0
      },
    ],
    agreeTosCheckbox: false,
    agreeFeeCheckbox: false,
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
      // isActive,
      // projectType,
      // projectOwner,
      totalSupply,
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
  .max(1000, "Must be at most 1000 characters")
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

const validationAgreeFeeCheckbox = Yup.boolean().when("isEditMode", {
  is: false,
  then: Yup.boolean()
    .required("This terms must be accepted.")
    .oneOf([true], "This terms must be accepted."),
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
                .max(1000, "Must be at most 1000 characters"),
              otherwise: Yup.string().notRequired(),
            }),
        },
        [["type", "content"]]
      )
    ),
  members: Yup.array()
    .min(1, "Members must have at least 1 items")
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
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required("This field is required")
          .min(2, "Must be longer than 2 characters")
          .max(30, "Must be at most 30 characters")
          .test("Test name", "Duplicated phase name!", (value, schema) => {
            const array = schema?.from[1].value?.phases;
            const keyArray = array.map((p) => p.name?.trim());
            const [isDup] = keyArray.filter(
              (v, i) => i !== keyArray.indexOf(v)
            );
            return !(isDup && isDup.trim() === value.trim());
          }),
        isPublic: Yup.boolean(),
        publicMintingFee: "",
        publicAmount: "",
        publicMaxMintingAmount: ""
      })
    ),
  agreeTosCheckbox: validationAgreeTosCheckbox,
  agreeFeeCheckbox: validationAgreeFeeCheckbox,
});
