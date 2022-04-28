import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
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

function AdvancedModeModal({ mode = "add", id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {mode === "add" && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          Advanced Mode
        </Button>
      )}
      {mode === "edit" && (
        <IconButton
          pos="absolute"
          top="1.5rem"
          right="1rem"
          aria-label="edit"
          icon={<EditIcon color="#7ae7ff" fontSize="1.5rem" />}
          size="icon"
          borderWidth={0}
          variant="iconOutline"
          onClick={() => onOpen()}
          h={0}
          _hover={{
            h: 0,
          }}
          _focus={{
            h: 0,
          }}
        />
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="4xl">
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
              {mode === "add" ? "Advanced Mode" : "Edit Collection"}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <AdvancedModeForm onClose={onClose} mode={mode} id={id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdvancedModeModal;
