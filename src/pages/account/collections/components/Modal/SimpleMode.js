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

import SimpleModeForm from "../Form/SimpleMode";

function SimpleModeModal({ mode, id }) {
  const {
    isOpen: isOpenSimpleMode,
    onOpen: onOpenSimpleMode,
    onClose: onCloseSimpleMode,
  } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        color="brand.blue"
        onClick={() => {
          onOpenSimpleMode();
        }}
      >
        Simple Mode
      </Button>

      <Modal
        isCentered
        isOpen={isOpenSimpleMode}
        onClose={onCloseSimpleMode}
        size="4xl"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          px={6}
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
            <Heading size="h4" my={2}>
              {mode === "add" ? "Simple Mode" : "Edit Collection"}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <SimpleModeForm onClose={onCloseSimpleMode} mode={mode} id={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimpleModeModal;
