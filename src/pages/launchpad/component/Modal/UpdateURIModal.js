import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { onCloseButtonModal } from "@utils";

export default function UpdateURIModal({ isOpen, onClose, forceUpdate }) {
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const [newURI, setNewURI] = useState("your new URI");

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
  }, [addCollectionTnxStatus, dispatch, forceUpdate, onClose]);

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size="xl"
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
            edit base URI
          </Heading>
        </ModalHeader>

        <ModalBody shadow="lg">
          <VStack>
            <Input
              value={newURI}
              border="1px  solid #555"
              onChange={({ target }) => setNewURI(target.value)}
            />

            <Button variant="solid" onClick={() => alert(newURI)}>
              Submit
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
