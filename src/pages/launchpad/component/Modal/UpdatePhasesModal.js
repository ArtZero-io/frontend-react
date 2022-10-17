import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import { Form, Formik } from "formik";
import CommonStack from "../Form/CommonStack";
import UpdatePhase from "../Form/UpdatePhase";
import * as Yup from "yup";
import { SCROLLBAR } from "@constants";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import {
  timestampWithoutCommas,
  convertStringToPrice,
  convertNumberWithoutCommas,
} from "@utils";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED, END } from "@constants";
import { useDispatch } from "react-redux";
import { clearTxStatus } from "@store/actions/txStatus";

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
          id: i,
          canEdit: false,
          name: phaseSchedule.title,
          start: Number(timestampWithoutCommas(phaseSchedule.startTime)),
          end: Number(timestampWithoutCommas(phaseSchedule.endTime)),
          isPublic: phaseSchedule.isPublic,
          publicAmount: Number(
            convertNumberWithoutCommas(phaseSchedule.publicMintingAmount)
          ),
          publicMaxMintingAmount: Number(
            convertNumberWithoutCommas(phaseSchedule.publicMaxMintingAmount)
          ),
          publicMintingFee: convertStringToPrice(
            phaseSchedule.publicMintingFee
          ),
        };
        console.log("phaseInfo", phaseInfo);

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
    if (rest.step === END) {
      fetchData();
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, fetchData, onClose, rest.step]);

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={["xs", "6xl"]}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        pt="20px"
        pb="30px"
        px={[0, "30px"]}
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={["340px", "1040px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
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

        <ModalBody overflowY="auto" sx={SCROLLBAR}>
          {initialValues && (
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
                  <CommonStack>
                    <UpdatePhase
                      startTime={startTime}
                      endTime={endTime}
                      name="phases"
                      mode="EDIT"
                      collection_address={collection_address}
                    />
                  </CommonStack>

                  {/* <Stack>
                    <StatusButton
                      // w="940px"
                      // w="full"AddPhase
                      text="project"
                      // isLoading={addCollectionTnxStatus}
                      // disabled={!(dirty && isValid) && noImagesChange}
                      // loadingText={`${addCollectionTnxStatus?.status}`}
                      // type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
                    />
                  </Stack> */}
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
export const fetchInitialPhasesValue = async () => {
  let initialValuesData = {
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
  };

  let currentPhaseId;

  // fetch and reformat phases data to form formik initial values
  // format start
  // ...
  // ...
  // format start

  initialValuesData = {
    phases: [
      {
        id: 1,
        name: "OG",
        start: 1659805200000,
        end: 1660496399999,
        isPublic: false,
        publicAmount: 0,
        publicMaxMintingAmount: 0,
        publicMintingFee: 0,
      },
      {
        id: 2,
        name: "WL",
        start: 1660496400000,
        end: 1661014799999,
        isPublic: false,
        publicAmount: 0,
        publicMaxMintingAmount: 0,
        publicMintingFee: 0,
      },
      {
        id: 3,
        name: "Public",
        start: 1661792400000,
        end: 1661965199999,
        isPublic: true,
        publicAmount: 3,
        publicMaxMintingAmount: 0,
        publicMintingFee: 99,
      },
    ],
  };

  currentPhaseId = 1;

  return { initialValuesData, currentPhaseId };
};
