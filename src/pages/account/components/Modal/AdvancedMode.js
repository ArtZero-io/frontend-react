import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function AdvancedMode() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Advanced Mode
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {" "}
        size='xl'
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
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader>
            <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
              Advanced Mode
            </Heading>
          </ModalHeader>
          <ModalBody>
            <Text>AdvancedMode</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdvancedMode;
