import {
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
import { useDispatch } from "react-redux";
import { useSubstrateState } from "@utils/substrate";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import launchpad_psp34_nft_standard_calls from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import useTxStatus from "@hooks/useTxStatus";
import { setTxStatus } from "@store/actions/txStatus";
import CommonButton from "@components/Button/CommonButton";
import { UPDATE_BASE_URI, START, FINALIZED, END } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";

export default function UpdateURIModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const [newURI, setNewURI] = useState("Your new URI here");
  const { currentAccount, api } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    console.log("rest.step", rest.step);
    if (rest.step === END) {
      console.log("rest.step IN", rest.step);
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, onClose, rest.step]);

  const updateBaseUri = async () => {
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    dispatch(setTxStatus({ type: UPDATE_BASE_URI, step: START }));

    await launchpad_psp34_nft_standard_calls.updateBaseUri(
      currentAccount,
      newURI,
      dispatch,
      UPDATE_BASE_URI,
      api
    );
  };

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
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            edit base URI
          </Heading>
        </ModalHeader>

        <ModalBody shadow="lg">
          <VStack>
            <Input
              bg="black"
              mb="15px"
              isDisabled={actionType}
              value={newURI}
              border="1px  solid #555"
              onChange={({ target }) => setNewURI(target.value)}
            />
            <CommonButton
              {...rest}
              w="full"
              onClick={updateBaseUri}
              text="update base URI"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
