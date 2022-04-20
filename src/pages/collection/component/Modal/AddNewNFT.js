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
import React, { useEffect } from "react";
import AddNewNFTForm from "../Form/AddNewNFT";
// import { useParams } from "react-router-dom";
// import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
// import { delay } from "@utils";
// import { useSubstrateState } from "@utils/substrate";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";

const AddNewNFTModal = ({ forceUpdate, collectionOwner }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  useEffect(() => {
    function onCloseHandler() {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });
        forceUpdate();
        onClose();
      }
    }

    onCloseHandler();
  }, [tnxStatus, dispatch, forceUpdate, onClose]);

  // useEffect(async () => {
  //   await onRefresh();
  // }, [collection_manager_calls.isLoaded()]);

  // const onRefresh = async () => {
  //   await getCollectionData();
  //   await delay(1000);
  // };

  // const getCollectionData = async () => {
  //   let data = await collection_manager_calls.getCollectionByAddress(
  //     currentAccount,
  //     param.address
  //   );
  //   console.log(data);
  //   setCollectionData(data);
  // };

  return (
    <>
      <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
        Add new NFT
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={"4xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          px={6}
          minH={{ xl: "md" }}
          borderRadius="0"
          textAlign="center"
          bg="brand.grayDark"
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
              Add new NFT
            </Heading>
          </ModalHeader>
          <ModalBody>
            <AddNewNFTForm collectionOwner={collectionOwner}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewNFTModal;
