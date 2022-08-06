/* eslint-disable no-unused-vars */
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

import { Form, Formik } from "formik";
import CommonStack from "../Form/CommonStack";
import AddPhase from "../Form/AddPhase";
import StatusButton from "@components/Button/StatusButton";
import * as Yup from "yup";
import { SCROLLBAR } from "@constants";
import { useSubstrateState } from "@utils/substrate";

export default function UpdatePhasesModal({
  isOpen,
  onClose,
  mode,
  nftContractAddress,
}) {
  const { currentAccount, api } = useSubstrateState();

  const [initialValues, setInitialValues] = useState([
    {
      name: "",
      start: "",
      end: "",
      isPublic: false,
      publicMintingFee: 0,
      publicAmount: 0,
    },
  ]);

  const [currentPhaseId, setCurrentPhaseId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { initialValuesData, currentPhaseId } =
        await fetchInitialPhasesValue({
          currentAccount,
          nftContractAddress,
          api,
        });

      setInitialValues(initialValuesData);
      setCurrentPhaseId(currentPhaseId);

      console.log("initialValuesData", initialValuesData);
      console.log("currentPhaseId", currentPhaseId);
    };

    fetchData();
  }, [api, currentAccount, nftContractAddress]);

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
          onClick={() => {}}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            edit phases. current phase: {currentPhaseId}
          </Heading>
        </ModalHeader>

        <ModalBody shadow="lg" overflowY="auto" sx={SCROLLBAR}>
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                phases: Yup.array()
                  .min(1, "Phases must have at least 1 items")
                  .max(3, "Phases must have less than or equal to 3 items")
                  .of(
                    Yup.object().shape({
                      name: Yup.string()
                        .required("This field is required")
                        .min(1, "Must be longer than 3 characters")
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
              {({ values, dirty, isValid, setFieldValue }) => (
                <Form>
                  <CommonStack>
                    <AddPhase name="phases" mode="EDIT" />
                  </CommonStack>

                  <Stack>
                    <StatusButton
                      // w="940px"
                      // w="full"
                      mode={mode}
                      text="project"
                      // isLoading={addCollectionTnxStatus}
                      // disabled={!(dirty && isValid) && noImagesChange}
                      // loadingText={`${addCollectionTnxStatus?.status}`}
                      // type={AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS}
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
        publicMintingFee: 0,
      },
      {
        id: 2,
        name: "WL",
        start: 1660496400000,
        end: 1661014799999,
        isPublic: false,
        publicAmount: 0,
        publicMintingFee: 0,
      },
      {
        id: 3,
        name: "Public",
        start: 1661792400000,
        end: 1661965199999,
        isPublic: true,
        publicAmount: 3,
        publicMintingFee: 99,
      },
    ],
  };

  currentPhaseId = 1;

  return { initialValuesData, currentPhaseId };
};
