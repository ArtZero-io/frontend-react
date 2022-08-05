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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { onCloseButtonModal } from "@utils";
import { Form, Formik } from "formik";
import CommonStack from "../Form/CommonStack";
import AddPhase from "../Form/AddPhase";
import StatusButton from "@components/Button/StatusButton";
import * as Yup from "yup";

export default function UpdatePhasesModal({ isOpen, onClose, mode }) {
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
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

  const initialValues = async () => await fetchInitialPhasesValue();

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

export const fetchInitialPhasesValue = async () => {
  const initialValues = {};

  return initialValues;
};
