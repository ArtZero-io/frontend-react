import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';

import { Form, Formik } from 'formik';
// import CommonStack from "../Form/CommonStack";
import UpdatePhase from '../Form/UpdatePhase';
import * as Yup from 'yup';
import { SCROLLBAR } from '@constants';
import { useSubstrateState } from '@utils/substrate';
import launchpad_psp34_nft_standard from '@utils/blockchain/launchpad-psp34-nft-standard';
import launchpad_psp34_nft_standard_calls from '@utils/blockchain/launchpad-psp34-nft-standard-calls';
import { ContractPromise } from '@polkadot/api-contract';
import {
  // timestampWithoutCommas,
  convertStringToPrice,
  // convertNumberWithoutCommas,
  strToNumber,
} from '@utils';
import useTxStatus from '@hooks/useTxStatus';
import { FINALIZED } from '@constants';
import { useDispatch } from 'react-redux';
import { clearTxStatus } from '@store/actions/txStatus';

const UpdatePhasesModal = React.memo(function ({
  isOpen,
  onClose,
  mode,
  collection_address,
  startTime,
  endTime,
}) {
  const { currentAccount, api } = useSubstrateState();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    phases: [
      {
        name: '',
        start: '',
        end: '',
        isPublic: false,
        publicMintingFee: 0,
        publicAmount: 0,
        publicMaxMintingAmount: 0,
      },
    ],
  });

  const [currentPhaseId, setCurrentPhaseId] = useState(null);
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  // console.log("UpdatePhasesModal...");

  const fetchData = useCallback(async () => {
    let initialValuesData = {};

    console.log(collection_address);
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    const availableTokenAmount =
      await launchpad_psp34_nft_standard_calls.getAvailableTokenAmount(
        currentAccount
      );

    const totalPhase = await launchpad_psp34_nft_standard_calls.getLastPhaseId(
      currentAccount
    );
    // console.log("UpdatePhasesModal::totalPhase", totalPhase);

    let phasesTmp = [];
    // console.log("xxx phasesTmp", phasesTmp);

    for (let i = 1; i <= totalPhase; i++) {
      // console.log('xxx i', i)
      let phaseSchedule =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          i
        );

      // console.log("xxx phaseSchedule", phaseSchedule);
      if (phaseSchedule.isActive) {
        let phaseInfo = {
          availableTokenAmount: strToNumber(availableTokenAmount),
          currPublicAmount: strToNumber(phaseSchedule?.publicMintingAmount),
          id: i,
          // canEdit: false,
          name: phaseSchedule.title,
          start: strToNumber(phaseSchedule.startTime),
          end: strToNumber(phaseSchedule.endTime),
          isPublic: phaseSchedule.isPublic,
          publicAmount: strToNumber(phaseSchedule.publicMintingAmount),
          publicMaxMintingAmount: strToNumber(
            phaseSchedule.publicMaxMintingAmount
          ),
          publicMintingFee: convertStringToPrice(
            phaseSchedule.publicMintingFee
          ),
        };
    

        phasesTmp.push(phaseInfo);
      }
    }

    initialValuesData.phases = phasesTmp;

    // console.log("xxxUpdatePhasesModal::phasesTmp", phasesTmp);
    // console.log("xxxinitialValuesData", initialValuesData);
    // console.log("xxxcurrentPhaseId", currentPhaseId);
    setInitialValues(initialValuesData);
    setCurrentPhaseId(currentPhaseId);

    // console.log("initialValuesData", phasesTmp);
    // console.log("currentPhaseId", currentPhaseId);
  }, [api, collection_address, currentAccount, currentPhaseId]);

  useEffect(() => {
    fetchData();
  }, [api, currentAccount, collection_address, currentPhaseId, fetchData]);

  useEffect(() => {
    if (rest.step === FINALIZED) {
      fetchData();
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, fetchData, onClose, rest.step]);

  const modalSize = useBreakpointValue({ base: 'full', md: 'xl' });

  return (
    <Modal
      isCentered
      size={modalSize}
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        pt="20px"
        pb="30px"
        px={[0, '20px']}
        borderRadius="0"
        position="relative"
        bg="#151515"
        maxW={['full', '1040px']}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={['0', '-8', '-8']}
          right={['0', '-8', '-8']}
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            update phases
          </Heading>
          <Text ml={1} fontSize="sm" fontWeight="400">
            You cannot update phases that have been completed or that are
            on-going.
          </Text>
        </ModalHeader>

        <ModalBody overflowY="auto" sx={SCROLLBAR} px="8px">
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                phases: Yup.array()
                  .min(1, 'Phases must have at least 1 items')
                  .of(
                    Yup.object().shape({
                      name: Yup.string()
                        .required('This field is required')
                        .min(2, 'Must be at least 2 characters')
                        .max(100, 'Must be at most 100 characters')
                        .test(
                          'Test name',
                          'Duplicated phase name!',
                          (value, schema) => {
                            const array = schema?.from[1].value?.phases;
                            const keyArray = array.map((p) => p.name?.trim());
                            const [isDup] = keyArray.filter(
                              (v, i) => i !== keyArray.indexOf(v)
                            );
                            return !(isDup && isDup.trim() === value.trim());
                          }
                        ),
                      publicMintingFee: '',
                      publicAmount: '',
                      publicMaxMintingAmount: Yup.number().when(
                        'publicAmount',
                        {
                          is: (val) => val,
                          then: Yup.number()
                            .required('Must have value.')
                            .min(1, 'Must be bigger than 1')
                            .max(
                              Yup.ref('publicAmount'),
                              'Must smaller than public amount'
                            ),
                          otherwise: Yup.number().notRequired(),
                        }
                      ),
                    })
                  ),
              })}
              onSubmit={async (values, { setSubmitting }) => {}}
            >
              {({ values, dirty, isValid, setFieldValue }) => (
                <Form>
                  <UpdatePhase
                    startTime={startTime}
                    endTime={endTime}
                    name="phases"
                    mode="EDIT"
                    collection_address={collection_address}
                  />
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
export default UpdatePhasesModal;
