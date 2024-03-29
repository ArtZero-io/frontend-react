import { Box, Link, Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import SimpleModeInput from "@components/Input/Input";
import SimpleModeTextArea from "@components/TextArea/TextArea";
import SimpleModeSwitch from "@components/Switch/Switch";

import { useSubstrateState } from "@utils/substrate";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

import AddCollectionNumberInput from "@components/Input/NumberInput";
import CommonCheckbox from "@components/Checkbox/Checkbox";
import {
  formMode,
  CREATE_COLLECTION,
  EDIT_COLLECTION,
  START,
  ArtZero_TOS,
} from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { setTxStatus } from "@store/actions/txStatus";
import { APICall } from "@api/client";
import { clearTxStatus } from "@store/actions/txStatus";
import ImageUploadThumbnail from "@components/ImageUpload/Thumbnail";
import { convertStringToPrice } from "@utils";
import { validationEmail } from "@constants/yup";
import { ipfsClient } from "@api/client";

const SimpleModeForm = ({ mode = formMode.ADD, id, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState("");
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState("");
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState("");
  const [addingFee, setAddingFee] = useState(0);
  const [isSetRoyal, setIsSetRoyal] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [maxRoyaltyFeeRate, setMaxRoyaltyFeeRate] = useState(0);

  const dispatch = useDispatch();
  const { currentAccount, api } = useSubstrateState();

  const currentAvatarIPFSUrl = useRef(avatarIPFSUrl);
  const currentHeaderIPFSUrl = useRef(headerIPFSUrl);
  const currentHeaderSquareIPFSUrl = useRef(headerSquareIPFSUrl);

  // eslint-disable-next-line no-unused-vars
  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl &&
    currentHeaderSquareIPFSUrl.current === headerSquareIPFSUrl;

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetchFee = async () => {
      try {
        if (addingFee === 0) {
          const addingFeeData =
            await collection_manager_calls.getSimpleModeAddingFee(
              currentAccount
            );

          setAddingFee(addingFeeData / 10 ** 12);
        }
      } catch (error) {
        console.log("error fetchFee", error.message);
      }
    };

    fetchFee();
  }, [addingFee, currentAccount]);

  useEffect(() => {
    const fetchFee = async () => {
      if (maxRoyaltyFeeRate === 0) {
        const maxRoyaltyFeeRateData =
          await collection_manager_calls.getMaxRoyaltyFeeRate(currentAccount);

        setMaxRoyaltyFeeRate(maxRoyaltyFeeRateData / 100);
      }
    };
    fetchFee();
  }, [maxRoyaltyFeeRate, currentAccount]);

  const [userBalance, setUserBalance] = useState(0);
  useEffect(() => {
    const checkCurrentBalance = async () => {
      const { data: balance } = await api.query.system.account(
        currentAccount?.address
      );

      const free = convertStringToPrice(balance.toHuman().free);
      const frozen = convertStringToPrice(balance.toHuman().frozen);

      const bal = free - frozen;

      setUserBalance(bal);
    };

    checkCurrentBalance();
  }, [api.query.system, currentAccount?.address]);

  useEffect(() => {
    let newInitialValues = {
      isEditMode: false,
      nftName: "",
      nftSymbol: "",
      collectionName: "",
      collectionDescription: "",
      collectRoyaltyFee: "",
      royaltyFee: 5,
      website: "",
      twitter: "",
      discord: "",
      telegram: "",
      agreeTosCheckbox: false,
      isDoxxed: "0",
      isDuplicationChecked: "0",
    };
    const fetchCollectionsByID = async () => {
      try {
        const { ret: dataList } = await APICall.getCollectionByID({ id });

        newInitialValues = {
          isEditMode: true,
          nftName: "",
          nftSymbol: "",
          collectionName: dataList[0].name,
          collectionDescription: dataList[0].description,
          collectRoyaltyFee: dataList[0].isCollectRoyaltyFee,
          royaltyFee: dataList[0].royaltyFee / 100,
          website: dataList[0].website,
          twitter: dataList[0].twitter,
          discord: dataList[0].discord,
          telegram: dataList[0].telegram,
          isDoxxed: dataList[0].isDoxxed ? "1" : "0",
          isDuplicationChecked: dataList[0].isDuplicationChecked ? "1" : "0",
        };

        if (dataList?.length) {
          setAvatarIPFSUrl(dataList[0].avatarImage);
          setHeaderIPFSUrl(dataList[0].headerImage);
          setHeaderSquareIPFSUrl(dataList[0].squareImage);
          setIsSetRoyal(dataList[0].isCollectRoyaltyFee);
          setInitialValues(newInitialValues);

          currentAvatarIPFSUrl.current = dataList[0].avatarImage;
          currentHeaderIPFSUrl.current = dataList[0].headerImage;
          currentHeaderSquareIPFSUrl.current = dataList[0].squareImage;
        } else {
          setInitialValues(null);
        }
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    mode === formMode.EDIT
      ? fetchCollectionsByID()
      : setInitialValues(newInitialValues);
  }, [id, mode]);

  return (
    <>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            isEditMode: Yup.boolean(),

            collectionName: Yup.string()
              .trim()
              .min(3, "Must be at least 3 characters")
              .max(30, "Must be at most 30 characters")
              .required("This field is required"),
            collectionDescription: Yup.string()
              .trim()
              .min(3, "Must be at least 3 characters")
              .max(3000, "Must be at most 3000 characters")
              .required("This field is required"),
            collectRoyaltyFee: Yup.boolean(),
            website: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .max(50, "Must be at most 50 characters"),
            twitter: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(/\btwitter.com\b/, "URL must be twitter.com")
              .max(50, "Must be at most 50 characters"),
            discord: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(
                /\bdiscord.(com|gg)\b/,
                "URL must be discord.com or discord.gg"
              )
              .max(50, "Must be at most 50 characters"),
            telegram: Yup.string()
              .trim()
              .url("URL must start with http:// or https://")
              .matches(/\bt.me\b/, "URL must be t.me")
              .max(50, "Must be at most 50 characters"),

            nftName: Yup.string()
              .trim()
              .when("isEditMode", {
                is: false,
                then: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .max(25, "Must be at most 25 characters")
                  .required("This field is required"),
              }),
            nftSymbol: Yup.string()
              .trim()
              .when("isEditMode", {
                is: false,
                then: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .max(8, "Must be at most 8 characters")
                  .required("This field is required"),
              }),
            agreeTosCheckbox: Yup.boolean().when("isEditMode", {
              is: false,
              then: Yup.boolean()
                .required("The terms of service must be accepted.")
                .oneOf([true], "The TOS must be accepted."),
            }),
            emailOwner: validationEmail,
          })}
          onSubmit={async (values, { setSubmitting }) => {
            if (addingFee <= 0) {
              return toast.error("Creation fee must greater than zero!");
            }

            if (userBalance <= 0) {
              return toast.error("Low balance!");
            }

            if (mode === formMode.ADD && userBalance <= addingFee) {
              return toast.error(
                `You need ${addingFee} AZERO to create new collection!`
              );
            }
            // if (
            //   !values.isEditMode &&
            //   (!headerIPFSUrl || !avatarIPFSUrl || !headerSquareIPFSUrl)
            // ) {
            //   return toast.error("Upload avatar or header too");
            // }

            // if (avatarIPFSUrl && headerIPFSUrl && headerSquareIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;
            values.headerSquareIPFSUrl = headerSquareIPFSUrl;

            // Update new traits attribute
            const metadata = {
              name: values.collectionName.trim(),
              description: values.collectionDescription.trim(),
              avatarImage: values.avatarIPFSUrl,
              headerImage: values.headerIPFSUrl,
              squareImage: values.headerSquareIPFSUrl,
              website: values.website,
              twitter: values.twitter,
              discord: values.discord,
              telegram: values.telegram,
              isDoxxed: values.isDoxxed,
              isDuplicationChecked: values.isDuplicationChecked,
            };
            // console.log("metadata", metadata);

            let { path: metadataHash } = await ipfsClient.add(
              JSON.stringify(metadata)
            );

            // console.log("metadataHash", metadataHash);

            if (!metadataHash) {
              toast.error("There is an error with metadata hash!");
              return;
            }

            const data = {
              nftName: values.nftName,
              nftSymbol: values.nftSymbol,
              attributes: ["metadata"],
              attributeVals: [metadataHash],
              collectionAllowRoyaltyFee: values.collectRoyaltyFee,
              collectionRoyaltyFeeData: values.collectRoyaltyFee
                ? Math.round(values.royaltyFee * 100)
                : 0,
            };
            // console.log("metadataHash1", metadataHash);

            // Double check 3 images is exits
            // if (
            //   !data?.attributeVals[2] ||
            //   !data?.attributeVals[3] ||
            //   !data?.attributeVals[4]
            // ) {
            //   return toast.error("Some images is invalid!");
            // }

            try {
              if (mode === formMode.ADD) {
                const templateParams = {
                  email_owner: values.emailOwner,
                  collection_name: values.collectionName,
                  collection_telegram: values.telegram,
                };

                dispatch(setTxStatus({ type: CREATE_COLLECTION, step: START }));
                // console.log("SIMPLE data", data);
                await collection_manager_calls.autoNewCollection(
                  currentAccount,
                  data,
                  dispatch,
                  CREATE_COLLECTION,
                  api,
                  templateParams
                );
              }

              if (mode === formMode.EDIT) {
                dispatch(setTxStatus({ type: EDIT_COLLECTION, step: START }));

                await collection_manager_calls.setMultipleAttributes(
                  currentAccount,
                  nftContractAddress,
                  data.attributes,
                  data.attributeVals,
                  dispatch,
                  EDIT_COLLECTION,
                  api
                );
              }
            } catch (error) {
              toast.error(error.message);
              dispatch(clearTxStatus());
            }
          }}
        >
          {({ values, dirty, isValid }) => (
            <Form>
              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                {mode === formMode.ADD && (
                  <>
                    <SimpleModeInput
                      type="text"
                      name="nftName"
                      label="NFT Name"
                      isRequired={true}
                      isDisabled={actionType}
                      placeholder="NFT Name"
                    />
                    <SimpleModeInput
                      type="text"
                      name="nftSymbol"
                      isRequired={true}
                      label="NFT Symbol"
                      isDisabled={actionType}
                      placeholder="NFT Symbol"
                    />
                  </>
                )}
                <SimpleModeInput
                  type="text"
                  isRequired={true}
                  name="collectionName"
                  label="Collection Name"
                  isDisabled={actionType}
                  placeholder="Collection Name"
                />
              </Stack>

              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                <SimpleModeInput
                  type="text"
                  name="website"
                  label="Website URL"
                  isDisabled={actionType}
                  placeholder={"Website URL"}
                />
                <SimpleModeInput
                  type="text"
                  name="twitter"
                  label="Twitter URL"
                  isDisabled={actionType}
                  placeholder={"Twitter URL"}
                />
                <SimpleModeInput
                  type="text"
                  name="discord"
                  label="Discord URL"
                  isDisabled={actionType}
                  placeholder={"Discord URL"}
                />
                <SimpleModeInput
                  type="text"
                  name="telegram"
                  label="Telegram URL"
                  isDisabled={actionType}
                  placeholder={"Telegram URL"}
                />
              </Stack>

              <SimpleModeTextArea
                type="text"
                isRequired={true}
                isDisabled={actionType}
                name="collectionDescription"
                label="Collection Description"
                placeholder="Collection Description"
              />

              <Stack
                alignItems="start"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
              >
                {/* <Stack
                  hidden
                  w="50%"
                  direction="column"
                  alignItems="start"
                  justifyContent="end"
                >
                  <CollectionImageUpload
                    id="avatar"
                    mode={mode}
                    isBanner={false}
                    isDisabled={actionType}
                    imageIPFSUrl={avatarIPFSUrl}
                    title="Collection Avatar Image"
                    setImageIPFSUrl={setAvatarIPFSUrl}
                    limitedSize={{ width: '100', height: '100' }}
                  />

                  <CollectionImageUpload
                    id="header"
                    mode={mode}
                    isBanner={true}
                    isDisabled={actionType}
                    imageIPFSUrl={headerIPFSUrl}
                    title="Collection Main Header"
                    setImageIPFSUrl={setHeaderIPFSUrl}
                    limitedSize={{ width: '1920', height: '600' }}
                  />
                </Stack> */}

                <Stack
                  w="50%"
                  direction="column"
                  alignItems="start"
                  justifyContent="end"
                >
                  {/* <CollectionImageUpload
                    mode={mode}
                    isBanner={false}
                    id="header_square"
                    isDisabled={actionType}
                    title="Collection Square Header"
                    imageIPFSUrl={headerSquareIPFSUrl}
                    setImageIPFSUrl={setHeaderSquareIPFSUrl}
                    limitedSize={{ width: '500', height: '500' }}
                  /> */}

                  {mode === formMode.EDIT && (
                    <Box my="30px" py="30px">
                      <Box
                        px="3px"
                        borderWidth="1px"
                        borderColor="#7ae7ff"
                        textTransform="capitalize"
                      >
                        {initialValues.royaltyFee}% Royalty
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Stack>

              <Stack w="full">
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
                    <Stack w="full" textAlign="left">
                      <Text>Choose avatar image</Text>
                      <Text
                        ml={2}
                        fontSize={["xs", "sm"]}
                        color="brand.grayLight"
                      >
                        This image will also be used for navigation. <br />
                        <br />
                      </Text>
                    </Stack>

                    <VStack>
                      <ImageUploadThumbnail
                        id="avatar"
                        mode={mode}
                        isBanner={false}
                        isDisabled={actionType}
                        imageIPFSUrl={avatarIPFSUrl}
                        setImageIPFSUrl={setAvatarIPFSUrl}
                        limitedSize={{ width: "500", height: "500" }}
                        isRounded={true}
                        width="260px"
                        height="260px"
                      />
                    </VStack>
                  </Stack>

                  <Stack
                    textAlign="left"
                    pt={{ base: "30px", md: "0px" }}
                    w={{ base: "full", md: "50%" }}
                    direction="column"
                    alignItems="start"
                    justifyContent="start"
                  >
                    <Text>Choose featured image</Text>
                    <Text
                      ml={2}
                      fontSize={["xs", "sm"]}
                      color="brand.grayLight"
                    >
                      This image will be used for featuring your collection on
                      the homepage, category pages, or other promotional areas
                      of ArtZero.
                    </Text>
                    <ImageUploadThumbnail
                      mode={mode}
                      isBanner={false}
                      id="header_square"
                      isDisabled={actionType}
                      imageIPFSUrl={headerSquareIPFSUrl}
                      setImageIPFSUrl={setHeaderSquareIPFSUrl}
                      limitedSize={{ width: "400", height: "260" }}
                      width={["100%", "400px"]}
                      height={["200px", "260px"]}
                      // height={['170px', '260px']}
                    />
                  </Stack>
                </Stack>

                <Stack pb="30px">
                  <Stack
                    w="full"
                    direction="column"
                    alignItems="start"
                    justifyContent="end"
                    textAlign="left"
                  >
                    <Text>Choose header image</Text>

                    <Text
                      ml={2}
                      fontSize={["xs", "sm"]}
                      color="brand.grayLight"
                    >
                      This image will appear at the top of your collection page.
                      Avoid including too much text in this banner image, as the
                      dimensions change on different devices.
                    </Text>

                    <ImageUploadThumbnail
                      id="header"
                      mode={mode}
                      isBanner={true}
                      isDisabled={actionType}
                      imageIPFSUrl={headerIPFSUrl}
                      setImageIPFSUrl={setHeaderIPFSUrl}
                      limitedSize={{ width: "1920", height: "600" }}
                      width="100%"
                      // height={['80px', '260px']}
                      height={["120px", "260px"]}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {mode === formMode.ADD && (
                <Stack mt={5} minH={20}>
                  <Stack direction={["column", "column"]} minH="85px">
                    <Stack minW="225px">
                      <SimpleModeSwitch
                        size="md"
                        name="collectRoyaltyFee"
                        isDisabled={actionType}
                        label="Collect Royalty Fee"
                        onChange={() => {
                          values.collectRoyaltyFee = !values.collectRoyaltyFee;
                          setIsSetRoyal(!isSetRoyal);
                        }}
                      />
                    </Stack>

                    <Flex alignItems="end" hidden={!isSetRoyal}>
                      <Stack>
                        <Text
                          textAlign="left"
                          fontSize={["xs", "sm"]}
                          color="brand.grayLight"
                        >
                          {`Royalty Fee (max ${maxRoyaltyFeeRate}%)`}
                        </Text>
                        <AddCollectionNumberInput
                          type="number"
                          name="royaltyFee"
                          inputWidth={"8rem"}
                          isDisplay={isSetRoyal}
                          max={maxRoyaltyFeeRate}
                          placeholder="Royalty Fee"
                          isDisabled={!isSetRoyal || actionType}
                          label=""
                          // {`Royalty Fee (max ${maxRoyaltyFeeRate}%)`}
                        />
                      </Stack>
                      {parseFloat(values?.royaltyFee) > maxRoyaltyFeeRate && (
                        <Text
                          textAlign="left"
                          color="#ff8c8c"
                          mx={3}
                          fontSize="sm"
                        >
                          Your Royalty fee can not greater than{" "}
                          {maxRoyaltyFeeRate}%
                        </Text>
                      )}
                    </Flex>
                  </Stack>

                  {mode === formMode.ADD && (
                    <SimpleModeInput
                      isRequired={true}
                      type="text"
                      name="emailOwner"
                      label="Enter your email so we can contact for additional information."
                      placeholder={"Email Contact"}
                      isDisabled={actionType}
                    />
                  )}

                  <VStack alignItems="start" pt="30px">
                    <Text
                      textAlign="left"
                      color="#fff"
                      fontSize={["md", "lg", "lg"]}
                    >
                      Create new collection you will pay
                      <strong> {addingFee} AZERO </strong> in fee to ArtZero.io
                    </Text>
                    <HStack justifyContent="center">
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
                    </HStack>
                  </VStack>
                </Stack>
              )}
              <CommonButton
                w="full"
                my="24px"
                {...rest}
                type="submit"
                text={`${
                  mode === formMode.ADD ? "create" : "update"
                } collection`}
                isDisabled={!(dirty && isValid) && noImagesChange}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SimpleModeForm;
