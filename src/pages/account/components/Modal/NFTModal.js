import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import NFTTab from "./NFTTab";

function NFTModal({ nft_detail, nft_contract_address, collection_detail, address, isOpen, onClose }) {
  console.log("NFTModal address", address);
  console.log("Nft Detail", nft_detail);
  return (
    <Modal onClose={onClose} isCentered isOpen={isOpen} size={"7xl"}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        px={10}
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
        <NFTTab collection_detail={collection_detail} nft_detail={nft_detail} nft_contract_address={nft_contract_address} address={address} />
      </ModalContent>
    </Modal>
  );
}

export default NFTModal;
