import {
  Heading,
  Box,
  Stack,
  Text,
  HStack,
  VStack,
  IconButton,
  Tooltip,
  Flex,
  Container,
  Link,
  Button,
  Circle,
} from "@chakra-ui/react";
import BN from "bn.js";
import CommonCheckbox from "@components/Checkbox/Checkbox";
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
import { useHistory, useLocation } from "react-router-dom";
import { ContractPromise } from "@polkadot/api-contract";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import AdvancedModeSwitch from "@components/Switch/Switch";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import CommonStack from "./CommonStack";

import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import CommonButton from "@components/Button/CommonButton";
import {
  CREATE_PROJECT_STEP_1,
  EDIT_PROJECT,
  CREATE_COLLECTION,
  START,
  FINALIZED,
  ArtZero_TOS,
} from "@constants";
import * as ROUTES from "@constants/routes";
import { getPublicCurrentAccount } from "@utils";

import { ipfsClient } from "@api/client";
import { ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import { getProjectMintFeeRate } from "@utils/blockchain/launchpad-contract-calls";
import { isPhaseTimeOverlap } from "@utils";
import styles from "./style.module.css";

import {
  validationCollectionName,
  validationDescription,
  validationDiscord,
  validationNftName,
  validationNftSymbol,
  validationTwitter,
  validationWebsite,
  validationAgreeTosCheckbox,
  validationAgreeProjectMintFeeCheckbox,
  validationAgreeFeeCheckbox,
  validationEmail,
  validationTelegram,
} from "@constants/yup";
import ImageUploadThumbnail from "@components/ImageUpload/Thumbnail";
import { useCallback } from "react";
import { clearTxStatus } from "@store/actions/txStatus";
import { APICall } from "../../../../api/client";
import { delay } from "../../../../utils";
import Steps from "rc-steps";
import { isMobile } from "react-device-detect";

const AddNewProjectForm = ({ mode = formMode.ADD, nftContractAddress }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentAccount, api } = useSubstrateState();

  const [projectMintFeeRate, setProjectMintFeeRate] = useState(null);

  useEffect(() => {
    const fetchProjectMintFee = async () => {
      const fee = await getProjectMintFeeRate(currentAccount, api);
      setProjectMintFeeRate(fee / 100);
    };

    fetchProjectMintFee();
  }, [api, currentAccount]);

  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState("");

  const [initialValues, setInitialValues] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [addingFee, setAddingFee] = useState(0);
  const [maxRoyaltyFeeRate, setMaxRoyaltyFeeRate] = useState(0);
  const [addProjectTotalFee, setAddProjectTotalFee] = useState(null);

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);

  const [current, setCurrent] = useState(0);

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl;

  const location = useLocation();

  mode = location.state?.formMode || formMode.ADD;

  if (mode === "EDIT") {
    nftContractAddress = location.state?.collection_address;
  }

  const handleOnchangeSchedule = (e, setFieldValue) => {
    if (!e) {
      setFieldValue("startTime", null);
      setFieldValue("endTime", null);
      return;
    }

    if (e[1]?.getTime() < Date.now()) {
      toast.error("Project end time must be greater than current time!");
      return;
    }

    if (e[0]?.getTime() > e[1]?.getTime()) {
      toast.error("Project end time must be greater than start time!");
      return;
    }

    setFieldValue("startTime", e[0]?.getTime());
    setFieldValue("endTime", e[1]?.getTime());
  };

  const handleOnRedirect = useCallback(async () => {
    await delay(2000);

    if (mode === formMode.ADD) {
      dispatch(clearTxStatus());

      history.push(`/account/projects`);
    } else {
      history.push(`${ROUTES.LAUNCHPAD_BASE}/${nftContractAddress}`);
    }
  }, [dispatch, history, mode, nftContractAddress]);

  useEffect(() => {
    const prepareData = async () => {
      const {
        error,
        initialValues,
        avatarIPFSUrl,
        headerIPFSUrl,
        headerSquareIPFSUrl,
      } = await fetchInitialValuesProject({
        currentAccount,
        api,
        mode,
        collection_address: nftContractAddress,
        projectInfo: location.state?.projectInfo,
      });

      if (maxRoyaltyFeeRate === 0) {
        try {
          const maxRoyaltyFeeRateData =
            await collection_manager_calls.getMaxRoyaltyFeeRate(currentAccount);

          setMaxRoyaltyFeeRate(maxRoyaltyFeeRateData / 100);
        } catch (error) {
          console.log("error", error);
        }

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
        setHeaderSquareIPFSUrl(headerSquareIPFSUrl);
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
    location.state?.projectInfo,
    maxRoyaltyFeeRate,
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

      const totalFee = addProjFee / 10 ** 12 + addCollectionFee / 10 ** 12;

      setAddProjectTotalFee(totalFee);
    };

    fetchAddProjectFee();
  }, [currentAccount]);

  useEffect(() => {
    if (rest?.step === FINALIZED) {
      if (actionType === CREATE_PROJECT_STEP_1) return;
      handleOnRedirect();
    }
  }, [actionType, handleOnRedirect, rest?.step]);

  const [formStep, setFormStep] = useState(null);

  const stepItems = (values, setFieldValue) => {
    return [
      {
        title: "PROJECT INFO",
        description: "Overview of your project",
        content: (
          <CommonStack
            desc={mode === formMode.ADD ? "What your project is about?" : ""}
          >
            <Stack
              pb="30px"
              alignItems="start"
              justifyContent="space-between"
              direction={["column", "row"]}
            >
              <Stack
                w={{ base: "full", xl: "50%" }}
                direction="column"
                alignItems={["center", "start"]}
                justifyContent="end"
              >
                <Stack w="full">
                  <Text>Choose avatar image</Text>
                  <Text ml={2} fontSize={["xs", "sm"]} color="brand.grayLight">
                    This image will also be used for navigation. <br />
                    <br />
                  </Text>
                </Stack>

                <VStack>
                  <ImageUploadThumbnail
                    limitedSize={{
                      width: "500",
                      height: "500",
                    }}
                    isRounded={true}
                    width="260px"
                    height="260px"
                    isDisabled={actionType}
                    id="avatar"
                    mode={mode}
                    isBanner={false}
                    imageIPFSUrl={avatarIPFSUrl}
                    setImageIPFSUrl={setAvatarIPFSUrl}
                  />
                </VStack>
              </Stack>

              <Stack
                pt={{ base: "30px", md: "0px" }}
                w={{ base: "full", md: "50%" }}
                direction="column"
                alignItems="start"
                justifyContent="start"
              >
                <Text>Choose featured image</Text>
                <Text ml={2} fontSize={["xs", "sm"]} color="brand.grayLight">
                  This image will be used for featuring your collection on the
                  homepage, category pages, or other promotional areas of
                  ArtZero.
                </Text>
                <ImageUploadThumbnail
                  limitedSize={{
                    width: "400",
                    height: "260",
                  }}
                  width={["100%", "400px"]}
                  height={["250px", "260px"]}
                  isDisabled={actionType}
                  id="header_square"
                  mode={mode}
                  imageIPFSUrl={headerSquareIPFSUrl}
                  setImageIPFSUrl={setHeaderSquareIPFSUrl}
                />
              </Stack>
            </Stack>

            <Stack pb="30px">
              <Stack
                w="full"
                direction="column"
                alignItems="start"
                justifyContent="end"
              >
                <Text>Choose header image</Text>

                <Text ml={2} fontSize={["xs", "sm"]} color="brand.grayLight">
                  This image will appear at the top of your collection page.
                  Avoid including too much text in this banner image, as the
                  dimensions change on different devices.
                </Text>

                <ImageUploadThumbnail
                  limitedSize={{
                    width: "1920",
                    height: "600",
                  }}
                  width="100%"
                  height={["120px", "260px"]}
                  isDisabled={actionType}
                  id="header"
                  mode={mode}
                  isBanner={true}
                  imageIPFSUrl={headerIPFSUrl}
                  setImageIPFSUrl={setHeaderIPFSUrl}
                />
              </Stack>
            </Stack>

            <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
              <Stack w={["100%", "31%"]}>
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

              <Stack w={["100%", "66%"]}>
                {/* {mode === formMode.ADD && ( */}
                <Stack pb="30px">
                  <Tooltip
                    placeContent="start"
                    hasArrow
                    bg="#333"
                    color="#fff"
                    borderRadius="0"
                    label="Start time & end time of launchpad project."
                  >
                    <Text w="fit-content" fontSize="lg" ml={1}>
                      Pick time range Start & End time{" "}
                      <Text as="span" fontSize="lg" color="#fc8181">
                        *
                      </Text>
                    </Text>
                  </Tooltip>

                  <DateTimeRangePicker
                    showDoubleView={true}
                    disableClock
                    disabled={!!actionType || mode === formMode.EDIT}
                    onChange={(e) => handleOnchangeSchedule(e, setFieldValue)}
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
                {/* )} */}
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
              <CommonInput
                mx="0"
                type="text"
                name="telegram"
                label="Telegram URL"
                placeholder={"Telegram URL"}
                isDisabled={actionType}
              />
            </Stack>

            <Stack minH="180px">
              <TextArea
                mx="0"
                textAreaHeight="120"
                type="text"
                isRequired={true}
                name="description"
                label="Project description"
                placeholder="Launchpad project description"
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
                  minW={"238px"}
                  alignItems="end"
                  direction={{ base: "column", "2xl": "row" }}
                >
                  <AdvancedModeSwitch
                    name="collectRoyaltyFee"
                    label="Collect Royalty Fee"
                    isDisabled={actionType}
                    onChange={() => {
                      values.collectRoyaltyFee = !values.collectRoyaltyFee;
                      setIsSetRoyal(!isSetRoyal);
                    }}
                  />
                </Stack>
              )}

              {mode === formMode.EDIT && (
                <HStack my="30px" py="30px">
                  <Text>Collect Royalty Fee :</Text>
                  <Box
                    px="3px"
                    borderWidth="1px"
                    borderColor="#7ae7ff"
                    textTransform="capitalize"
                  >
                    {initialValues?.royaltyFee}% Royalty
                  </Box>
                </HStack>
              )}

              <Flex
                justifyContent="start"
                alignItems={["center", "end"]}
                w="full"
                display={!isSetRoyal ? "none" : "flex"}
              >
                <Stack minW="10rem">
                  <NumberInput
                    isDisabled={!isSetRoyal || actionType}
                    max={maxRoyaltyFeeRate}
                    label={`Royalty Fee (max ${maxRoyaltyFeeRate}%)`}
                    name="royaltyFee"
                    type="number"
                    placeholder="Royalty Fee"
                    inputWidth={"8rem"}
                  />
                </Stack>
                <Text fontSize={["xs", "sm"]} color="brand.grayLight">
                  (*) Royalty Fee gives the NFT creator a percentage of the sale
                  price each time the NFT is sold on the marketplace.
                </Text>
              </Flex>
            </Stack>

            <Stack my="30px">
              <Stack
                w="full"
                mb="30px"
                pb="30px"
                borderBottom="1px solid #2F2F2F"
              >
                <Heading fontSize={["2xl", "3xl"]}>project roadmap</Heading>

                <Text ml={2} fontSize={["xs", "sm"]} color="brand.grayLight">
                  You can provide high-level goals and deliverables on your
                  project's timeline.
                </Text>
              </Stack>

              <AddRoadmap name="roadmap" mode={mode} isDisabled={actionType} />
            </Stack>

            <Stack my="30px">
              <Stack
                w="full"
                mb="30px"
                pb="30px"
                borderBottom="1px solid #2F2F2F"
              >
                <Heading fontSize={["2xl", "3xl"]}>project team member</Heading>
              </Stack>

              <AddMember name="members" mode={mode} isDisabled={actionType} />
            </Stack>
          </CommonStack>
        ),
      },
      mode === formMode.ADD && {
        title: "NFT INFO",
        description: `The launchpad create a Nft smart contract for you`,
        content: (
          <>
            <CommonStack desc="To do this, we need key information such as NFT name, symbol, and total supply, which cannot be changed after the initial setup">
              <Stack gap={["10px", "30px"]} direction={["column", "row"]}>
                <CommonInput
                  type="text"
                  name="nftName"
                  label="NFT Name"
                  isRequired={true}
                  placeholder="NFT Name"
                  isDisabled={actionType || mode !== formMode.ADD}
                />

                <CommonInput
                  type="text"
                  name="nftSymbol"
                  label="NFT Symbol"
                  isRequired={true}
                  placeholder="NFT Symbol"
                  isDisabled={actionType || mode !== formMode.ADD}
                />

                <NumberInput
                  inputWidth="full"
                  precision={0}
                  isRequired={true}
                  name="totalSupply"
                  hasStepper={false}
                  label="Total Supply"
                  isDisabled={actionType || mode !== formMode.ADD}
                  min={1}
                />
              </Stack>
            </CommonStack>
          </>
        ),
      },
      mode === formMode.ADD && {
        title: "SALE PHASE INFO",
        description: `A sale phase is your strategy for selling NFTs`,
        content: (
          <CommonStack desc="You can customize each phase. By default, you can add whitelist buyers on the Administrator page. If you enable public minting, anyone can purchase NFTs at fixed price.">
            <AddPhase name="phases" mode={mode} isDisabled={actionType} />
          </CommonStack>
        ),
      },
      mode === formMode.ADD && {
        title: "CONTACT INFO",
        description: "Please provide the contact information",
        content: (
          <>
            <CommonStack>
              <CommonInput
                isRequired={true}
                type="text"
                name="email_owner"
                label="Enter your email so we can contact for additional information."
                placeholder={"Email Contact"}
                isDisabled={actionType}
              />
            </CommonStack>
            <>
              {/*addProjectTotalFee*/}
              <HStack
                w="full"
                p="15px"
                alignItems="center"
                justifyContent="start"
              >
                <Stack>
                  <CommonCheckbox
                    justifyContent="center"
                    isDisabled={actionType}
                    name="agreeFeeCheckbox"
                    content={
                      <>
                        <Text as="span" color="#888">{`I agree to pay `}</Text>
                        <Text color="#fff" as="span">
                          {`${addProjectTotalFee} AZERO`}
                        </Text>
                        <Text
                          as="span"
                          color="#888"
                        >{` to ArtZero.io for the creation of new project. This fee is non-refundable`}</Text>
                      </>
                    }
                  />
                </Stack>
              </HStack>

              {/*agreeProjectMintFeeCheckbox*/}
              <HStack
                w="full"
                p="15px"
                alignItems="center"
                justifyContent="start"
              >
                <Stack>
                  <CommonCheckbox
                    justifyContent="center"
                    isDisabled={actionType}
                    name="agreeProjectMintFeeCheckbox"
                    content={
                      <>
                        {" "}
                        <Text as="span" color="#888">{`I agree to a `}</Text>
                        <Text color="#fff" as="span">
                          {`${projectMintFeeRate}%`}
                        </Text>
                        <Text
                          as="span"
                          color="#888"
                        >{` share of the mint price for every sucessful mint to be distributed to ArtZerio.io`}</Text>
                      </>
                    }
                  />
                </Stack>
              </HStack>

              {/*Terms of Service*/}
              <HStack
                w="full"
                p="15px"
                alignItems="center"
                justifyContent="start"
              >
                <Stack>
                  <CommonCheckbox
                    isDisabled={actionType}
                    name="agreeTosCheckbox"
                    content={
                      <>
                        <Text as="span" color="#888">
                          {`I agree to ArtZero's `}
                        </Text>
                        <Link
                          color="#fff"
                          _hover={{
                            color: "#7ae7ff",
                            textDecoration: "underline",
                          }}
                          textTransform="none"
                          isExternal
                          href={ArtZero_TOS}
                        >
                          Terms of Service
                        </Link>
                      </>
                    }
                  />
                </Stack>
              </HStack>
            </>
          </>
        ),
      },
    ].filter((e) => e);
  };

  return (
    <>
      {initialValues && (
        <Stack pt="100px">
          <HStack
            pb="100px"
            w="full"
            pos="relative"
            maxW="1200px"
            mx="auto"
            textAlign="center"
          >
            <VStack px="30px" mx="auto">
              <Heading
                w="full"
                color="#fff"
                fontSize={["32px", "48px", "48px"]}
                lineHeight={["38px", "60px", "60px"]}
              >
                {`${mode === "ADD" ? "create new" : "edit"} project`}
              </Heading>
              <Text maxW="360px" fontSize="lg" mx="auto" px={["15px", "5px"]}>
                The premier destination to launch your NFT Collection on Aleph
                Zero Network.
              </Text>
            </VStack>
            <IconButton
              display={["none", "flex"]}
              pos="absolute"
              left="30px"
              top={["0px", "5px"]}
              onClick={() => history.goBack()}
              variant="iconOutline"
              width={["40px", "50px"]}
              height={["40px", "50px"]}
              icon={<ArrowBackIcon fontSize="2xl" />}
              _hover={{
                bg: "brand.blue",
                color: "black",
                borderWidth: "0",
              }}
            />
          </HStack>

          <Stack bg="#151515">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                // check wallet connect?
                if (!currentAccount) {
                  return toast.error("Please connect wallet first!");
                }
                // ADD MODE CHECKING values.isEditMode false

                if (!values.isEditMode) {
                  // check Total Mint Amount của Phase vs total Supply (FE)
                  const totalSupply = parseInt(values.totalSupply);
                  const phases = values.phases;

                  const allPhasesMintAmount = phases.reduce((acc, cur) => {
                    return cur?.isPublic
                      ? acc + parseInt(cur?.publicAmount)
                      : acc;
                  }, 0);

                  if (totalSupply < allPhasesMintAmount) {
                    return toast.error(
                      "Total mint of phases must less than Total supply!"
                    );
                  }
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
                values.headerSquareIPFSUrl = headerSquareIPFSUrl;

                if (!values.isEditMode) {
                  // check prj time-frame is picked?
                  const prjStartTime = values?.startTime;
                  const prjEndTime = values?.endTime;
                  if (!values.isEditMode && (!prjStartTime || !prjEndTime)) {
                    return toast.error("Please pick time frame for project!");
                  }

                  // check all phase time-frame is picked?
                  const phasesArray = values?.phases;

                  const startPhasesAr = phasesArray?.map((i) => i.start);

                  const isPhaseTimePicked = startPhasesAr?.every((e) => e);

                  if (phasesArray && !isPhaseTimePicked) {
                    return toast.error(
                      "Please pick time frame for all phases!"
                    );
                  }

                  // check time is overlap?
                  const allPhaseTime = [...values.phases];

                  const isOverlap = isPhaseTimeOverlap(allPhaseTime);

                  if (isOverlap) {
                    return toast.error(
                      "Sub phase time is not valid or overlap."
                    );
                  }

                  // if (phasesArray?.length) {
                  //   const startFirstPhase = phasesArray[0]?.start;
                  //   const endLastPhase = [...phasesArray].pop().end;

                  //   if (
                  //     !(
                  //       prjStartTime <= startFirstPhase &&
                  //       startFirstPhase <= endLastPhase &&
                  //       endLastPhase <= prjEndTime
                  //     )
                  //   ) {
                  //     toast.error(
                  //       "Sub phase time is not valid or overlap project phase time."
                  //     );
                  //     return;
                  //   }
                  // }
                }

                //check low balance?
                if (userBalance < 1) {
                  return toast.error(`Your balance too low!`);
                }

                if (mode === formMode.ADD) {
                  const project_info = {
                    name: values.name.trim(),
                    description: values.description.trim(),
                    website: values.website.trim(),
                    twitter: values.twitter.trim(),
                    discord: values.discord.trim(),
                    telegram: values.telegram.trim(),
                    nft_name: values.nftName.trim(),
                    nft_symbol: values.nftSymbol.trim(),
                    header: values.headerIPFSUrl,
                    headerSquare: values.headerSquareIPFSUrl,
                    avatar: values.avatarIPFSUrl,
                    team_members: values.members,
                    roadmaps: values.roadmap,
                  };

                  const project_info_ipfs = await ipfsClient.add(
                    JSON.stringify(project_info)
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
                    public_minting_fee_phases.push(
                      public_minting_fee_phase_tmp
                    );
                    let public_minting_amout_phase_tmp =
                      phase.isPublic && phase.publicAmount
                        ? phase.publicAmount
                        : 0;

                    let public_max_minting_amount_phase_tmp =
                      phase.isPublic && phase.publicMaxMintingAmount
                        ? phase.publicMaxMintingAmount
                        : 0;
                    public_minting_amout_phases.push(
                      public_minting_amout_phase_tmp
                    );
                    public_max_minting_amount_phases.push(
                      public_max_minting_amount_phase_tmp
                    );
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
                    is_public_phases: is_public_phases,
                    public_minting_fee_phases: public_minting_fee_phases,
                    public_minting_amout_phases: public_minting_amout_phases,
                    public_max_minting_amount_phases:
                      public_max_minting_amount_phases,
                  };

                  const createNewCollection = async (nft_address) => {
                    // New traits attribute

                    const metadata = {
                      name: values.name.trim(),
                      description: values.description.trim(),
                      avatarImage: values.avatarIPFSUrl,
                      headerImage: values.headerIPFSUrl,
                      squareImage: values.headerSquareIPFSUrl,
                      website: values.website,
                      twitter: values.twitter,
                      discord: values.discord,
                      telegram: values.telegram,
                      isDoxxed: "0",
                      isDuplicationChecked: "0",
                    };

                    let { path: metadataHash } = await ipfsClient.add(
                      JSON.stringify(metadata)
                    );
                    // Lay gia tri nft_address tu launchpad_contract_calls roi tao collection

                    if (!metadataHash) {
                      toast.error("There is an error with metadata hash!");
                      return;
                    }

                    const collectionData = {
                      nftContractAddress: nft_address,
                      attributes: ["metadata"],
                      attributeVals: [metadataHash],
                      collectionAllowRoyaltyFee: isSetRoyal,
                      collectionRoyaltyFeeData: isSetRoyal
                        ? Math.round(values.royaltyFee * 100)
                        : 0,
                    };

                    dispatch(
                      setTxStatus({ type: CREATE_COLLECTION, step: START })
                    );

                    toast.success("Step 2. Creating collection...");
                    const templateParams = {
                      email_owner: values.email_owner,
                      collection_name: values.name,
                      collection_telegram: values.telegram,
                      template: "PROJECT",
                    };
                    await collection_manager_calls.addNewCollection(
                      currentAccount,
                      collectionData,
                      dispatch,
                      CREATE_COLLECTION,
                      api,
                      templateParams
                    );
                  };

                  if (formStep === "STEP1") {
                    dispatch(
                      setTxStatus({ type: CREATE_PROJECT_STEP_1, step: START })
                    );

                    toast.success("Step 1. Creating project...");

                    await launchpad_contract_calls.addNewProject(
                      currentAccount,
                      data,
                      dispatch,
                      CREATE_PROJECT_STEP_1,
                      api
                    );
                  }

                  if (formStep === "STEP2") {
                    if (!tokenIDArray[0]) {
                      toast.error(
                        "There is something wrong with your project!"
                      );
                      return;
                    }

                    await createNewCollection(tokenIDArray[0]);
                  }
                } else {
                  if (mode === formMode.EDIT) {
                    const project_info = {
                      name: values.name.trim(),
                      description: values.description.trim(),
                      website: values.website.trim(),
                      twitter: values.twitter.trim(),
                      discord: values.discord.trim(),
                      telegram: values.telegram?.trim(),
                      nft_name: values.nftName.trim(),
                      nft_symbol: values.nftSymbol.trim(),
                      header: values.headerIPFSUrl,
                      headerSquare: values.headerSquareIPFSUrl,
                      avatar: values.avatarIPFSUrl,
                      team_members: values.members,
                      roadmaps: values.roadmap,
                    };

                    const project_info_ipfs = await ipfsClient.add(
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

                    dispatch(setTxStatus({ type: EDIT_PROJECT, step: START }));

                    await launchpad_psp34_nft_standard_calls.editProjectInformation(
                      currentAccount,
                      project_info_ipfs.path,
                      dispatch,
                      EDIT_PROJECT,
                      api,
                      nftContractAddress
                    );
                  }
                }
              }}
            >
              {({ values, dirty, isValid, setFieldValue, handleSubmit }) => (
                <Form>
                  <Container maxW="1200px" px={["0px", "15px"]} pt="10px">
                    <Box
                      sx={{
                        width: mode === formMode.ADD ? "100%" : "50%",
                      }}
                    >
                      {mode === formMode.ADD && (
                        <Steps
                          direction={isMobile ? "vertical" : "horizontal"}
                          className={styles.step_create}
                          current={current}
                          items={stepItems(values, setFieldValue).map(
                            (e, index) => ({
                              ...e,
                              icon:
                                current > index ? (
                                  <Circle
                                    size="40px"
                                    bg="#151515"
                                    border={"4px solid #93F0F5"}
                                    color="#151515"
                                  >
                                    <CheckIcon color={"#93F0F5"} />
                                  </Circle>
                                ) : null,
                            })
                          )}
                        ></Steps>
                      )}
                    </Box>
                    {stepItems(values, setFieldValue)[current].content}
                    <Box
                      sx={{ display: "flex", justifyContent: "center" }}
                      pb={{ base: "20px" }}
                    >
                      {mode === formMode.ADD && (
                        <Button
                          isDisabled={!(current > 0)}
                          onClick={() =>
                            setCurrent((prev) => setCurrent(prev - 1))
                          }
                        >
                          Back
                        </Button>
                      )}
                      {mode === formMode.EDIT ? (
                        <Box px="10px" mb="30px" w="full">
                          {mode === formMode.EDIT && (
                            <Stack>
                              <CommonButton
                                // mx="0"
                                onRedirect={handleOnRedirect}
                                // w="full"
                                // my="24px"
                                {...rest}
                                type="submit"
                                text={`${
                                  mode === formMode.ADD ? "create" : "update"
                                } project`}
                                isDisabled={
                                  (!(dirty && isValid) && noImagesChange) ||
                                  rest?.step === FINALIZED
                                }
                              />
                            </Stack>
                          )}
                        </Box>
                      ) : current === 3 && mode === formMode.ADD ? (
                        <HStack justifyContent="center" ml={{ base: "8px" }}>
                          <Button
                            minW="180px"
                            {...rest}
                            isLoading={formStep === "STEP1" && rest.isLoading}
                            isDisabled={tokenIDArray}
                            value="STEP1"
                            text="STEP1"
                            type="button"
                            onClick={({ target }) => {
                              setFormStep(target.value);
                              handleSubmit();
                            }}
                          >
                            STEP 1
                          </Button>
                          <Button
                            minW="180px"
                            {...rest}
                            isLoading={formStep === "STEP2" && rest.isLoading}
                            isDisabled={!tokenIDArray || !tokenIDArray[0]}
                            value="STEP2"
                            text="STEP2"
                            type="button"
                            onClick={({ target }) => {
                              setFormStep(target.value);
                              handleSubmit();
                            }}
                          >
                            STEP 2
                          </Button>
                        </HStack>
                      ) : (
                        <Button
                          ml={{ base: "20px" }}
                          onClick={() =>
                            setCurrent((prev) => setCurrent(prev + 1))
                          }
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Container>
                </Form>
              )}
            </Formik>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AddNewProjectForm;

export const fetchUserBalance = async ({ currentAccount, api, address }) => {
  if (currentAccount && api) {
    const {
      data: { free, frozen },
    } = await api.query.system.account(address || currentAccount?.address);

    const [chainDecimals] = await api.registry.chainDecimals;

    const formattedStrBal = formatBalance(free, {
      withSi: false,
      forceUnit: "-",
      chainDecimals,
    });
    const formattedStrBalFrozen = formatBalance(frozen, {
      withSi: false,
      forceUnit: "-",
      chainDecimals,
    });

    const formattedNumBal =
      formattedStrBal?.replaceAll(",", "") * 1 -
      formattedStrBalFrozen?.replaceAll(",", "") * 1;

    return { balance: formattedNumBal / 10 ** 12 };
  }
};

export const fetchInitialValuesProject = async ({
  currentAccount,
  api,
  mode,
  collection_address,
  projectInfo,
}) => {
  let initialValues = {
    isEditMode: false,
    name: "",
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
    description: "",
    roadmap: [{ type: "", content: "" }],
    members: [{ name: "", title: "", socialLink: "", avatar: "" }],
    nftName: "",
    nftSymbol: "",
    totalSupply: 0,
    royaltyFee: 0.5,

    phases: [
      {
        name: "Phase Name",
        start: "",
        end: "",
        isPublic: false,
        publicMintingFee: 0,
        publicAmount: 0,
        publicMaxMintingAmount: 0,
      },
    ],
    agreeTosCheckbox: false,
    agreeProjectMintFeeCheckbox: false,
    agreeFeeCheckbox: false,
    startTime: Date.now(),
    endTime: Date.now(),
  };

  if (mode === formMode.ADD) {
    return { initialValues };
  }

  try {
    const {
      name,
      description,
      website,
      twitter,
      discord,
      telegram,
      nftName,
      nftSymbol,
      headerImage,
      squareImage,
      avatarImage,
      teamMembers,
      roadmaps,
      nft_count,
      startTime,
      endTime,
    } = projectInfo;
    // console.log("projectInfo", projectInfo);
    initialValues.isEditMode = true;
    initialValues.nftName = nftName;
    initialValues.nftSymbol = nftSymbol;
    initialValues.name = name;
    initialValues.description = description;
    initialValues.totalSupply = nft_count;
    initialValues.startTime = startTime;
    initialValues.endTime = endTime;
    initialValues.website = website;
    initialValues.twitter = twitter;
    initialValues.discord = discord;
    initialValues.telegram = telegram;
    initialValues.members = teamMembers;
    initialValues.roadmap = roadmaps;

    const { ret, status } = await APICall.getCollectionByAddress({
      collection_address,
    });

    if (status === "OK") {
      initialValues.royaltyFee = ret[0].royaltyFee / 100;
    }

    return {
      initialValues,
      avatarIPFSUrl: avatarImage,
      headerIPFSUrl: headerImage,
      headerSquareIPFSUrl: squareImage,
    };
  } catch (error) {
    console.log(error);
    toast.error("There was an error while fetching data.");

    return { error };
  }
};

const validationSchema = Yup.object().shape({
  isEditMode: Yup.boolean(),
  name: validationCollectionName,
  website: validationWebsite,
  twitter: validationTwitter,
  discord: validationDiscord,
  telegram: validationTelegram,
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
                .min(2, "Must be at least 2 characters")
                .max(100, "Must be at most 100 characters"),
              otherwise: Yup.string().notRequired(),
            }),
          content: Yup.string()
            .trim()
            .when("type", {
              is: (val) => val,
              then: Yup.string()
                .required("This field is required")
                .min(2, "Must be at least 2 characters")
                .max(5000, "Must be at most 5000 characters"),
              otherwise: Yup.string().notRequired(),
            }),
        },
        [["type", "content"]]
      )
    ),
  members: Yup.array()
    .min(1, "Members must have at least 1 team member")
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
                .min(2, "Must be at least 2 characters")
                .max(100, "Must be at most 100 characters"),
              otherwise: Yup.string().notRequired(),
            }),
          title: Yup.string()
            .trim()
            .when("name", {
              is: (val) => val,
              then: Yup.string()
                .required("This field is required")
                .min(2, "Must be at least 2 characters")
                .max(100, "Must be at most 100 characters"),
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
    .max(10, "Must be at most 10 phases")
    .of(
      Yup.object().shape({
        name: Yup.string()
          // .required("This field is required")
          .min(2, "Must be at least 2 characters")
          .max(100, "Must be at most 100 characters")
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
        publicMaxMintingAmount: Yup.number().when("publicAmount", {
          is: (val) => val,
          then: Yup.number()
            .required("Must have value.")
            .min(1, "Must be bigger than 1")
            .max(Yup.ref("publicAmount"), "Must smaller than public amount"),
          otherwise: Yup.number().notRequired(),
        }),
      })
    ),
  email_owner: validationEmail,
  agreeTosCheckbox: validationAgreeTosCheckbox,
  agreeProjectMintFeeCheckbox: validationAgreeProjectMintFeeCheckbox,
  agreeFeeCheckbox: validationAgreeFeeCheckbox,
});
