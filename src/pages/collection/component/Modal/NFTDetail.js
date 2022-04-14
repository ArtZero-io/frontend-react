import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import NFTDetailTab from "../Tab/NFTTab";

function NFTDetailModal({ address, isOpen, onClose }) {
  console.log("NFTModal address", address);
  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"78rem"}
      minH="40rem"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        px={0}
        borderRadius="0"
        minH={{ xl: "lg" }}
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
        />
        <NFTDetailTab address={address} />
      </ModalContent>
    </Modal>
  );
}

export default NFTDetailModal;
