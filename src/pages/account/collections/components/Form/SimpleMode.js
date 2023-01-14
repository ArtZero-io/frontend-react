/* eslint-disable no-unused-vars */
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import CollectionImageUpload from '@components/ImageUpload/Collection';
import SimpleModeInput from '@components/Input/Input';
import SimpleModeTextArea from '@components/TextArea/TextArea';
import SimpleModeSwitch from '@components/Switch/Switch';

import { useSubstrateState } from '@utils/substrate';
import collection_manager_calls from '@utils/blockchain/collection-manager-calls';

import AddCollectionNumberInput from '@components/Input/NumberInput';
import CommonCheckbox from '@components/Checkbox/Checkbox';
import {
  formMode,
  CREATE_COLLECTION,
  EDIT_COLLECTION,
  START,
} from '@constants';
import useTxStatus from '@hooks/useTxStatus';
import CommonButton from '@components/Button/CommonButton';
import { setTxStatus } from '@store/actions/txStatus';
import { APICall } from '../../../../../api/client';
import { clearTxStatus } from '@store/actions/txStatus';
import ImageUploadThumbnail from '@components/ImageUpload/Thumbnail';

const SimpleModeForm = ({ mode = formMode.ADD, id, nftContractAddress }) => {
  const [avatarIPFSUrl, setAvatarIPFSUrl] = useState('');
  const [headerIPFSUrl, setHeaderIPFSUrl] = useState('');
  const [headerSquareIPFSUrl, setHeaderSquareIPFSUrl] = useState('');
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
        console.log('error fetchFee', error.message);
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

  const checkCurrentBalance = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    if (balance.free.toNumber() - balance.miscFrozen.toNumber() > addingFee) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let newInitialValues = {
      isEditMode: false,
      nftName: '',
      nftSymbol: '',
      collectionName: '',
      collectionDescription: '',
      collectRoyaltyFee: '',
      royaltyFee: 5,
      website: '',
      twitter: '',
      discord: '',
      agreeTosCheckbox: false,
    };
    const fetchCollectionsByID = async () => {
      try {
        const { ret: dataList } = await APICall.getCollectionByID({ id });

        newInitialValues = {
          isEditMode: true,
          nftName: '',
          nftSymbol: '',
          collectionName: dataList[0].name,
          collectionDescription: dataList[0].description,
          collectRoyaltyFee: dataList[0].isCollectRoyaltyFee,
          royaltyFee: dataList[0].royaltyFee / 100,
          website: dataList[0].website,
          twitter: dataList[0].twitter,
          discord: dataList[0].discord,
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

        toast.error('There was an error while fetching the collections.');
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
              .min(3, 'Must be at least 3 characters')
              .max(30, 'Must be at most 30 characters')
              .required('This field is required'),
            collectionDescription: Yup.string()
              .trim()
              .min(3, 'Must be at least 3 characters')
              .max(150, 'Must be at most 150 characters')
              .required('This field is required'),
            collectRoyaltyFee: Yup.boolean(),
            website: Yup.string()
              .trim()
              .url('URL must start with http:// or https://')
              .max(50, 'Must be at most 50 characters'),
            twitter: Yup.string()
              .trim()
              .url('URL must start with http:// or https://')
              .matches(/\btwitter.com\b/, 'URL must be twitter.com')
              .max(50, 'Must be at most 50 characters'),
            discord: Yup.string()
              .trim()
              .url('URL must start with http:// or https://')
              .matches(
                /\bdiscord.(com|gg)\b/,
                'URL must be discord.com or discord.gg'
              )
              .max(50, 'Must be at most 50 characters'),

            nftName: Yup.string()
              .trim()
              .when('isEditMode', {
                is: false,
                then: Yup.string()
                  .min(3, 'Must be at least 3 characters')
                  .max(25, 'Must be at most 25 characters')
                  .required('This field is required'),
              }),
            nftSymbol: Yup.string()
              .trim()
              .when('isEditMode', {
                is: false,
                then: Yup.string()
                  .min(3, 'Must be at least 3 characters')
                  .max(8, 'Must be at most 8 characters')
                  .required('This field is required'),
              }),
            agreeTosCheckbox: Yup.boolean().when('isEditMode', {
              is: false,
              then: Yup.boolean()
                .required('The terms and conditions must be accepted.')
                .oneOf([true], 'The TOCs must be accepted.'),
            }),
          })}
          onSubmit={async (values, { setSubmitting }) => {
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

            if (!checkCurrentBalance) {
              return toast.error(`Your balance not enough`);
            } else {
              const data = {
                nftName: values.nftName,
                nftSymbol: values.nftSymbol,

                attributes: [
                  'name',
                  'description',
                  'avatar_image',
                  'header_image',
                  'header_square_image',
                  'website',
                  'twitter',
                  'discord',
                ],

                attributeVals: [
                  values.collectionName.trim(),
                  values.collectionDescription.trim(),
                  values.avatarIPFSUrl,
                  values.headerIPFSUrl,
                  values.headerSquareIPFSUrl,
                  values.website,
                  values.twitter,
                  values.discord,
                ],

                collectionAllowRoyaltyFee: values.collectRoyaltyFee,
                collectionRoyaltyFeeData: values.collectRoyaltyFee
                  ? Math.round(values.royaltyFee * 100)
                  : 0,
              };

              try {
                if (mode === formMode.ADD) {
                  dispatch(
                    setTxStatus({ type: CREATE_COLLECTION, step: START })
                  );

                  await collection_manager_calls.autoNewCollection(
                    currentAccount,
                    data,
                    dispatch,
                    CREATE_COLLECTION,
                    api
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
            }
          }}
        >
          {({ values, dirty, isValid }) => (
            <Form>
              <Stack
                gap={['10px', '30px']}
                direction={{ base: 'column', md: 'row' }}
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
                gap={['10px', '30px']}
                direction={{ base: 'column', md: 'row' }}
              >
                <SimpleModeInput
                  type="text"
                  name="website"
                  label="Website URL"
                  isDisabled={actionType}
                  placeholder={'Website URL'}
                />
                <SimpleModeInput
                  type="text"
                  name="twitter"
                  label="Twitter URL"
                  isDisabled={actionType}
                  placeholder={'Twitter URL'}
                />
                <SimpleModeInput
                  type="text"
                  name="discord"
                  label="Discord URL"
                  isDisabled={actionType}
                  placeholder={'Discord URL'}
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
                direction={{ base: 'column', md: 'row' }}
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
                  direction={['column', 'row']}
                >
                  <Stack
                    w={{ base: 'full', xl: '50%' }}
                    direction="column"
                    alignItems={['center', 'start']}
                    justifyContent="end"
                  >
                    <Stack w="full" textAlign="left">
                      <Text>Choose avatar image</Text>
                      <Text
                        ml={2}
                        fontSize={['xs', 'sm']}
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
                        limitedSize={{ width: '500', height: '500' }}
                        isRounded={true}
                        width="260px"
                        height="260px"
                      />
                    </VStack>
                  </Stack>

                  <Stack
                    textAlign="left"
                    pt={{ base: '30px', md: '0px' }}
                    w={{ base: 'full', md: '50%' }}
                    direction="column"
                    alignItems="start"
                    justifyContent="start"
                  >
                    <Text>Choose featured image</Text>
                    <Text
                      ml={2}
                      fontSize={['xs', 'sm']}
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
                      limitedSize={{ width: '400', height: '260' }}
                      width={['100%', '400px']}
                      height={['200px', '260px']}
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
                      fontSize={['xs', 'sm']}
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
                      limitedSize={{ width: '1920', height: '600' }}
                      width="100%"
                      // height={['80px', '260px']}
                      height={['120px', '260px']}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {mode === formMode.ADD && (
                <Stack mt={5} minH={20}>
                  <Stack direction={['column', 'row']} minH="85px">
                    <Stack minW="225px">
                      <SimpleModeSwitch
                        name="collectRoyaltyFee"
                        isDisabled={actionType}
                        label="Collect Royalty Fee"
                        onChange={() => {
                          values.collectRoyaltyFee = !values.collectRoyaltyFee;
                          setIsSetRoyal(!isSetRoyal);
                        }}
                      />
                    </Stack>
                    <AddCollectionNumberInput
                      type="number"
                      name="royaltyFee"
                      inputWidth={'8rem'}
                      isDisplay={isSetRoyal}
                      max={maxRoyaltyFeeRate}
                      placeholder="Royalty Fee"
                      isDisabled={!isSetRoyal || actionType}
                      label={`Royalty Fee (max ${maxRoyaltyFeeRate}%)`}
                    />
                  </Stack>

                  <VStack pt="30px">
                    <Text color="#fff" fontSize={['md', 'lg', 'lg']}>
                      Create new collection you will pay
                      <strong> {addingFee} $AZERO </strong> in fee to ArtZero.io
                    </Text>
                    <HStack justifyContent="center">
                      <CommonCheckbox
                        isDisabled={actionType}
                        name="agreeTosCheckbox"
                        content="I agree to ArtZero's Terms of Service"
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
                  mode === formMode.ADD ? 'create' : 'update'
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
