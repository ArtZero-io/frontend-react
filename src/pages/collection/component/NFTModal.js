import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NFTTab from "./NFTTab";

function NFTModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={() => onOpen()}>Use Overlay one</Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent bg='brand.grayDark' px={10}>
          <ModalCloseButton />
          <NFTTab />
        </ModalContent>
      </Modal>
    </>
  );
}

export default NFTModal;
