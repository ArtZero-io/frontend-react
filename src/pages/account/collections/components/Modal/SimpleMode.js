import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import SimpleModeForm from "../Form/SimpleMode";

function SimpleMode() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Simple Mode
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          px={10}
          borderRadius="0"
          textAlign="center"
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader>
            <Heading size="h3" my={3}>
              Simple Mode
            </Heading>
          </ModalHeader>
          <ModalBody>
            <SimpleModeForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimpleMode;
