import { Stack, Text, Box, HStack, VStack, Flex, Link } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { useSubstrateState } from "@utils/substrate";
import { isValidAddressPolkadotAddress } from "@utils";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";

// eslint-disable-next-line no-unused-vars
import ImageUpload from "@components/ImageUpload/Collection";
import AdvancedModeInput from "@components/Input/Input";
import AdvancedModeSwitch from "@components/Switch/Switch";
import AdvancedModeTextArea from "@components/TextArea/TextArea";

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
import ImageUploadThumbnail from "@components/ImageUpload/Thumbnail";
import { isValidAddress, convertStringToPrice } from "@utils";
import { validationEmail } from "@constants/yup";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { execContractQuery } from "../../../nfts/nfts";
import { ipfsClient } from "@api/client";

const AdvancedModeForm = ({ mode = "add", id }) => {
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

  const noImagesChange =
    currentAvatarIPFSUrl.current === avatarIPFSUrl &&
    currentHeaderIPFSUrl.current === headerIPFSUrl &&
    currentHeaderSquareIPFSUrl.current === headerSquareIPFSUrl;

  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetchFee = async () => {
      if (addingFee === 0) {
        const addingFeeData =
          await collection_manager_calls.getAdvanceModeAddingFee(
            currentAccount
          );

        setAddingFee(addingFeeData / 10 ** 18);
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
      const miscFrozen = convertStringToPrice(balance.toHuman().miscFrozen);

      const bal = free - miscFrozen;

      setUserBalance(bal);
    };

    checkCurrentBalance();
  }, [api.query.system, currentAccount?.address]);

  useEffect(() => {
    let newInitialValues = {
      isEditMode: false,
      nftContractAddress: "",
      collectionName: "",
      collectionDescription: "",
      collectRoyaltyFee: "",
      royaltyFee: 5,
      website: "",
      twitter: "",
      discord: "",
      telegram: "",
      agreeTosCheckbox: false,
      confirmInfoCheckbox: false,
      isDoxxed: "0",
      isDuplicationChecked: "0",
    };

    const fetchCollectionsByID = async () => {
      try {
        const {
          ret: [dataList],
        } = await APICall.getCollectionByID({ id });

        const {
          nftContractAddress,
          name: collectionName,
          description: collectionDescription,
          isCollectRoyaltyFee: collectRoyaltyFee,
          royaltyFee,
          avatarImage,
          headerImage,
          squareImage,
          website,
          twitter,
          discord,
          telegram,
          isDoxxed,
          isDuplicationChecked,
        } = dataList;

        newInitialValues = {
          isEditMode: true,
          nftContractAddress,
          collectionName,
          collectionDescription,
          collectRoyaltyFee,
          royaltyFee: royaltyFee / 100,
          agreeTosCheckbox: false,
          confirmInfoCheckbox: false,
          website,
          twitter,
          discord,
          telegram,
          isDoxxed: isDoxxed ? "1" : "0",
          isDuplicationChecked: isDuplicationChecked ? "1" : "0",
        };

        if (dataList) {
          setAvatarIPFSUrl(avatarImage);
          setHeaderIPFSUrl(headerImage);
          setHeaderSquareIPFSUrl(squareImage);
          setIsSetRoyal(collectRoyaltyFee);
          setInitialValues(newInitialValues);

          currentAvatarIPFSUrl.current = avatarImage;
          currentHeaderIPFSUrl.current = headerImage;
          currentHeaderSquareIPFSUrl.current = squareImage;
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

  async function getContractInfo(api, address) {
    if (isValidAddress(address)) {
      const ret = await api.query.contracts.contractInfoOf(address);

      return ret.unwrapOr(null);
    }
  }

  return (
    <>
      {initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            isEditMode: Yup.boolean(),

            nftContractAddress: Yup.string()
              .test(
                "Test nftContractAddress",
                "Validate NFT Contract Address failed!",
                (value, { path, createError }) => {
                  return new Promise((resolve, reject) => {
                    if (!isValidAddress(value)) {
                      reject(
                        createError({
                          path,
                          message: "Address is not valid!",
                        })
                      );
                      return false;
                    }

                    return getContractInfo(api, value).then(
                      async (isOnChain) => {
                        if (!isOnChain) {
                          reject(
                            createError({
                              path,
                              message: "Contract Address is not on-chain!",
                            })
                          );

                          return false;
                        }

                        // OK onchain
                        // validate call totalSupply

                        await execContractQuery(
                          currentAccount?.address,
                          api,
                          nft721_psp34_standard.CONTRACT_ABI,
                          value,
                          "psp34::totalSupply"
                        ).then((queryResult) => {
                          if (!queryResult.toHuman().Ok) {
                            reject(
                              createError({
                                path,
                                message:
                                  "Contract Address can not get total Supply!",
                              })
                            );

                            return false;
                          }
                        });

                        // validate call getAttributeCount
                        await execContractQuery(
                          currentAccount?.address,
                          api,
                          nft721_psp34_standard.CONTRACT_ABI,
                          value,
                          "psp34Traits::getAttributeCount"
                        ).then((queryResult) => {
                          if (!queryResult.toHuman().Ok) {
                            reject(
                              createError({
                                path,
                                message:
                                  "Contract Address can not get Attribute Count!",
                              })
                            );

                            return false;
                          }
                        });
                        resolve(true);
                      }
                    );
                  });
                }
              )
              .required("This field is required"),

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
            agreeTosCheckbox: Yup.boolean().when("isEditMode", {
              is: false,
              then: Yup.boolean()
                .required("The terms of service must be accepted.")
                .oneOf([true], "The TOS must be accepted."),
            }),
            confirmInfoCheckbox: Yup.boolean().when("isEditMode", {
              is: false,
              then: Yup.boolean()
                .required("This terms must be accepted.")
                .oneOf([true], "This terms must be accepted."),
            }),
            emailOwner: validationEmail,
          })}
          onSubmit={async (values, { setSubmitting }) => {
            if (addingFee <= 0) {
              return toast.error("Creation fee must greater than zero!");
            }

            if (
              !values.isEditMode &&
              (!headerIPFSUrl || !avatarIPFSUrl || !headerSquareIPFSUrl)
            ) {
              return toast.error("Upload avatar or header too");
            }

            // if (avatarIPFSUrl && headerIPFSUrl && headerSquareIPFSUrl) {
            values.avatarIPFSUrl = avatarIPFSUrl;
            values.headerIPFSUrl = headerIPFSUrl;
            values.headerSquareIPFSUrl = headerSquareIPFSUrl;

            if (userBalance <= 0) {
              return toast.error("Low balance!");
            }

            if (mode === formMode.ADD && userBalance < addingFee) {
              return toast.error(
                `You need ${addingFee} ASTR to create new collection!`
              );
            }

            if (!isValidAddressPolkadotAddress(values.nftContractAddress)) {
              toast.error(`The NFT contract address must be an address!`);
            } else {
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
              // console.log("metadata ADV MODE", metadata);

              let { path: metadataHash } = await ipfsClient.add(
                JSON.stringify(metadata)
              );

              if (!metadataHash) {
                toast.error("There is an error with metadata hash!");
                return;
              }

              const data = {
                nftContractAddress: values.nftContractAddress,
                attributes: ["metadata"],
                attributeVals: [metadataHash],
                collectionAllowRoyaltyFee: values.collectRoyaltyFee,
                collectionRoyaltyFeeData: values.collectRoyaltyFee
                  ? Math.round(values.royaltyFee * 100)
                  : 0,
              };
              // if (
              //   !data?.attributeVals[2] ||
              //   !data?.attributeVals[3] ||
              //   !data?.attributeVals[4]
              // ) {
              //   return toast.error("Some images is invalid!");
              // }
              // console.log("ADv Mode data", data);

              if (mode === formMode.ADD) {
                const templateParams = {
                  email_owner: values.emailOwner,
                  collection_name: values.collectionName,
                  collection_telegram: values.telegram,
                };

                dispatch(setTxStatus({ type: CREATE_COLLECTION, step: START }));

                await collection_manager_calls.addNewCollection(
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
                  data.nftContractAddress,
                  data.attributes,
                  data.attributeVals,
                  dispatch,
                  EDIT_COLLECTION,
                  api
                );
              }
            }
            // }
          }}
        >
          {({ values, dirty, isValid }) => (
            <Form>
              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                <AdvancedModeInput
                  type="text"
                  isRequired={true}
                  isDisabled={actionType || mode === formMode.EDIT}
                  name="nftContractAddress"
                  label="NFT Contract Address"
                  placeholder="NFT Contract Address"
                />
                <AdvancedModeInput
                  isRequired={true}
                  name="collectionName"
                  type="collectionName"
                  isDisabled={actionType}
                  label="Collection Name"
                  placeholder="Collection Name"
                />
              </Stack>

              <Stack
                gap={["10px", "30px"]}
                direction={{ base: "column", md: "row" }}
              >
                <AdvancedModeInput
                  type="text"
                  name="website"
                  label="Website URL"
                  isDisabled={actionType}
                  placeholder={"Website URL"}
                />
                <AdvancedModeInput
                  type="text"
                  name="twitter"
                  label="Twitter URL"
                  isDisabled={actionType}
                  placeholder={"Twitter URL"}
                />
                <AdvancedModeInput
                  type="text"
                  name="discord"
                  label="Discord URL"
                  isDisabled={actionType}
                  placeholder={"Discord URL"}
                />
                <AdvancedModeInput
                  type="text"
                  name="telegram"
                  label="Telegram URL"
                  isDisabled={actionType}
                  placeholder={"Telegram URL"}
                />
              </Stack>

              <AdvancedModeTextArea
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
                  w="50%"
                  direction="column"
                  alignItems="start"
                  justifyContent="end"
                >
                  <ImageUpload
                    mode={mode}
                    isBanner={false}
                    id="collection-avatar"
                    isDisabled={actionType}
                    imageIPFSUrl={avatarIPFSUrl}
                    title="Collection Avatar Image"
                    setImageIPFSUrl={setAvatarIPFSUrl}
                    limitedSize={{ width: '100', height: '100' }}
                  />
                  <ImageUpload
                    mode={mode}
                    isBanner={true}
                    id="collection-header"
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
                  {/* <ImageUpload
                    mode={mode}
                    isBanner={true}
                    isDisabled={actionType}
                    id="collection-header-square"
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
                        mode={mode}
                        isBanner={false}
                        id="collection-avatar"
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
                      isDisabled={actionType}
                      id="collection-header-square"
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
                      id="collection-header"
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
                  <Stack direction={["column"]} minH="85px">
                    <Stack minW="225px">
                      <Box w="12rem">
                        <AdvancedModeSwitch
                          size="md"
                          name="collectRoyaltyFee"
                          isDisabled={actionType}
                          label="Collect Royalty Fee"
                          onChange={() => {
                            values.collectRoyaltyFee =
                              !values.collectRoyaltyFee;
                            setIsSetRoyal(!isSetRoyal);
                          }}
                        />
                      </Box>
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
                          max={maxRoyaltyFeeRate}
                          placeholder="Royalty Fee"
                          isDisplay={isSetRoyal}
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
                    <AdvancedModeInput
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
                      <strong> {addingFee} ASTR </strong> in fee to ArtZero.io
                    </Text>

                    <HStack justifyContent="center">
                      <CommonCheckbox
                        isDisabled={actionType}
                        name="confirmInfoCheckbox"
                        content={
                          <>
                            <Text as="span" color="#888">
                              {`I confirm all info is correct.`}
                            </Text>
                          </>
                        }
                      />
                    </HStack>

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

export default AdvancedModeForm;
