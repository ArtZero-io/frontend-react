/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { onCloseButtonModal } from "@utils";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";

export default function UpdateURIModal({ collection_address, isOpen, onClose, forceUpdate }) {
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const [newURI, setNewURI] = useState("Your new URI here");
  const { currentAccount, api } = useSubstrateState();

  useEffect(() => {
    function onCloseHandler() {
      onClose();

      if (addCollectionTnxStatus?.status === "End") {
        // dispatch({
        //   type: AccountActionTypes.SET_TNX_STATUS,
        //   payload: null,
        // });
        // delay(300).then(() => {
        //   forceUpdate();
        // onClose();
        // dispatch({
        //   type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
        // });
        // });
      }
    }

    onCloseHandler();
  }, [addCollectionTnxStatus, dispatch, forceUpdate, onClose]);

  const updateBaseUri = async () => {
    const launchpad_psp34_nft_standard_contract =
      new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );
    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );
    await launchpad_psp34_nft_standard_calls.updateBaseUri(currentAccount, newURI);
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size="xl"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        p={12}
        borderRadius="0"
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
          onClick={() => {
            onCloseButtonModal({
              status: addCollectionTnxStatus?.status,
              dispatch,
              type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
            });
          }}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            edit base URI
          </Heading>
        </ModalHeader>

        <ModalBody shadow="lg">
          <VStack>
            <Input
              value={newURI}
              border="1px  solid #555"
              onChange={({ target }) => setNewURI(target.value)}
            />

            <Button variant="solid" onClick={updateBaseUri}>
              Submit
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
