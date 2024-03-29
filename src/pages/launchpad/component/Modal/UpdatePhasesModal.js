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
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { Form, Formik } from "formik";
// import CommonStack from "../Form/CommonStack";
import UpdatePhase from "../Form/UpdatePhase";
import * as Yup from "yup";
import { SCROLLBAR } from "@constants";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { convertStringToPrice, strToNumber, delay } from "@utils";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
import { useDispatch } from "react-redux";
import { clearTxStatus } from "@store/actions/txStatus";
import Loader from "@components/Loader/CommonLoader";
import { getPublicCurrentAccount } from "../../../../utils";

const UpdatePhasesModal = React.memo(function ({
  isOpen,
  onClose,
  mode,
  collection_address,
  startTime,
  endTime,
}) {
  const { currentAccount, api, apiState } = useSubstrateState();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    phases: [
      {
        name: "",
        start: "",
        end: "",
        isPublic: false,
        publicMintingFee: 0,
        publicAmount: 0,
        publicMaxMintingAmount: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [currentPhaseId, setCurrentPhaseId] = useState(null);
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  const fetchData = useCallback(
    async (isUnmounted) => {
      setLoading(true);

      let initialValuesData = {};

      try {
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
            getPublicCurrentAccount()
          );

        const totalPhase =
          await launchpad_psp34_nft_standard_calls.getLastPhaseId(
            getPublicCurrentAccount()
          );

        let phasesTmp = [];

        for (let i = 1; i <= totalPhase; i++) {
          let phaseSchedule =
            await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
              getPublicCurrentAccount(),
              i
            );

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
        if (isUnmounted) return;

        setInitialValues(initialValuesData);
        setCurrentPhaseId(currentPhaseId);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [api, collection_address, currentPhaseId]
  );

  useEffect(() => {
    let isUnmounted = false;

    if (apiState !== "READY") return;

    fetchData(isUnmounted);
    return () => (isUnmounted = true);
  }, [
    apiState,
    api,
    currentAccount,
    collection_address,
    currentPhaseId,
    fetchData,
  ]);

  useEffect(() => {
    const reload = async () => {
      if (rest.step === "InBlock") {
        await fetchData();
        await delay(1000);
        dispatch(clearTxStatus());
        onClose();
      }
    };
    reload();
  }, [dispatch, fetchData, onClose, rest.step]);

  const modalSize = useBreakpointValue({ base: "full", md: "xl" });

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
        px={[0, "20px"]}
        borderRadius="0"
        position="relative"
        bg="#151515"
        maxW={["full", "1040px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top="4"
          right="4"
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
          {loading ? (
            <Loader />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                phases: Yup.array()
                  .min(1, "Phases must have at least 1 items")
                  .of(
                    Yup.object().shape({
                      name: Yup.string()
                        .required("This field is required")
                        .min(2, "Must be at least 2 characters")
                        .max(100, "Must be at most 100 characters")
                        .test(
                          "Test name",
                          "Duplicated phase name!",
                          (value, schema) => {
                            const array = schema?.from[1].value?.phases;
                            const keyArray = array.map((p) => p.name?.trim());
                            const [isDup] = keyArray.filter(
                              (v, i) => i !== keyArray.indexOf(v)
                            );
                            return !(isDup && isDup.trim() === value.trim());
                          }
                        ),
                      publicMintingFee: "",
                      publicAmount: "",
                      publicMaxMintingAmount: Yup.number().when(
                        "publicAmount",
                        {
                          is: (val) => val,
                          then: Yup.number()
                            .required("Must have value.")
                            .min(1, "Must be bigger than 1")
                            .max(
                              Yup.ref("publicAmount"),
                              "Must smaller than public amount"
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
