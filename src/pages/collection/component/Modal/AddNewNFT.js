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
import AddNewNFTForm from "../Form/AddNewNFT";

function AddNewNFTModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Add new NFT (*)
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior="inside"
      >
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
            <Heading size="2xl" letterSpacing="wider" fontWeight="normal">
              Add new NFT
            </Heading>
          </ModalHeader>
          <ModalBody>
            <AddNewNFTForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewNFTModal;
