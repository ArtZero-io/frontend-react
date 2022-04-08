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
import AddNewNFTForm from "../Form/AddNewNFT";
import { useParams } from "react-router-dom";
import collection_manager_calls from "../../../../utils/blockchain/collection-manager-calls";
import { delay } from "../../../../utils";
import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";

const AddNewNFTModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const [collection, setCollectionData] = useState({});
  const { currentAccount } = useSubstrateState();

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {
    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.collectionAddress
    );
    console.log(data);
    setCollectionData(data);
  };

  return (
    <>
      {console.log(collection)}
      {console.log(currentAccount.address)}
      
      {collection.collectionOwner == currentAccount.address && collection.showOnChainMetadata && collection.contractType == '2' && collection.isActive ? <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Add new NFT (*)
      </Button> : ''}
      

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
