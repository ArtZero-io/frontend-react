import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { onCloseButtonModal } from "@utils";
import { Form, Formik } from "formik";
import CommonStack from "../Form/CommonStack";
import AddPhase from "../Form/AddPhase";
import StatusButton from "@components/Button/StatusButton";
import * as Yup from "yup";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { useSubstrateState } from "@utils/substrate";
import { timestampWithoutCommas } from "@utils";

export default function UpdatePhasesModal({ collection_address, isOpen, onClose, mode }) {
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const [currentPhaseId, setCurrentPhaseId] = useState(0);
  const { api, currentAccount } = useSubstrateState();
  useEffect(() => {
    const initialValues = async () => await fetchInitialPhasesValue(collection_address, currentAccount, api);
    initialValues();
    function onCloseHandler() {
      onClose();

      if (addCollectionTnxStatus?.status === "End") {
        // dispatch({
        //   type: AccountActionTypes.SET_TNX_STATUS,
        //   payload: null,
        // });
        // delay(300).then(() => {
        //   forceUpdate();
        // onClose();
        // dispatch({
        //   type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
        // });
        // });
      }
    }

    onCloseHandler();
  }, [addCollectionTnxStatus, dispatch, onClose]);

  const initialValues = async () => await fetchInitialPhasesValue(collection_address, currentAccount, api);

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"6xl"}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        p={12}
        borderRadius="0"
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
          onClick={() => {
            onCloseButtonModal({
              status: addCollectionTnxStatus?.status,
              dispatch,
              type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
            });
          }}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            edit phases
          </Heading>
        </ModalHeader>

        <ModalBody
          shadow="lg"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              borderRadius: "0px",
              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: `transparent`,
            },
          }}
        >
          {initialValues && (
            <Formik
              initialValues={{ phases: [{ name: "", start: "", end: "" }] }}
              validationSchema={Yup.object().shape({
                phases: Yup.array()
                  .min(1, "Phases must have at least 1 items")
                  .max(3, "Phases must have less than or equal to 3 items")
                  .of(
                    Yup.object().shape({
                      name: Yup.string()
                        .required("This field is required")
                        .min(3, "Must be longer than 3 characters")
                        .max(30, "Must be at most 30 characters")
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
                    })
                  ),
              })}
              onSubmit={async (values, { setSubmitting }) => {}}
            >
              {({ values, dirty, isValid, setFieldValue, ...rest }) => (
                <Form>
                  <CommonStack>
                    <AddPhase name="phases" mode={"EDIT"} />
                  </CommonStack>

                  <Stack>
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
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export const fetchInitialPhasesValue = async (collection_address, currentAccount, api) => {
  const launchpad_psp34_nft_standard_contract =
      new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    const totalPhase =
    await launchpad_psp34_nft_standard_calls.getLastPhaseId(
      currentAccount
    );
    console.log('UpdatePhasesModal::totalPhase', totalPhase);
    const currentPhaseIdTmp = await launchpad_psp34_nft_standard_calls.getCurrentPhase(
        currentAccount
      );
    let phasesTmp = [];
    for (let i = 1; i <= totalPhase; i++) {
      const phaseSchedule =
        await launchpad_psp34_nft_standard_calls.getPhaseScheduleById(
          currentAccount,
          i
        );
      console.log('UpdatePhasesModal::phaseSchedule', phaseSchedule);
      const phaseInfo = {
        id: i,
        code: phaseSchedule.title,
        startTime: timestampWithoutCommas(phaseSchedule.startTime),
        endTime: timestampWithoutCommas(phaseSchedule.endTime),
        isLive: i == currentPhaseIdTmp ? 1 : 0,
        publicPhase: phaseSchedule.isPublic,
        publicMintingAmout: phaseSchedule.publicMintingAmout,
        publicMintingFee: phaseSchedule.publicMintingFee
      };

      phasesTmp.push(phaseInfo);

      if (i == currentPhaseIdTmp) {
        console.log("LaunchpadDetailPage::phaseSchedule", phaseSchedule);
        setCurrentPhaseId(currentPhaseIdTmp);
        setCurrentPhase(phaseInfo);
      }
    }
  const initialValues = {};

  return initialValues;
};
