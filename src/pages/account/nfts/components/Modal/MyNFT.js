import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import NFTTab from "../Tabs/MyNFT";

function NFTModal({ nft_detail, nft_contract_address, collection_detail, address, isOpen, onClose, selectedNFT }) {
  console.log("NFTModal address", address);
  console.log("Nft Detail", nft_detail);
  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"6xl"}
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
        <NFTTab selectedNFT={selectedNFT} collection_detail={collection_detail} nft_detail={nft_detail} nft_contract_address={nft_contract_address} address={address} />
      </ModalContent>
    </Modal>
  );
}

export default NFTModal;
