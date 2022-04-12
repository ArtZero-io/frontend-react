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
import AdvancedModeForm from "../Form/AdvancedMode";

function AdvancedMode() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Advanced Mode
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          py={10}
          px={20}
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
            <Heading size="h3">Advanced Mode</Heading>
          </ModalHeader>
          <ModalBody>
            <AdvancedModeForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdvancedMode;
