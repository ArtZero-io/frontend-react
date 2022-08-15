import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Input,
  Text
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
import toast from "react-hot-toast";

export default function UpdateURIModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const [newURI, setNewURI] = useState("");
  const { currentAccount, api } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    if (rest.step === END) {
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, onClose, rest.step]);

  const updateBaseUri = async () => {
    if( newURI.toString().substr(-1) != "/" ) {
      toast.error("Base Uri must be end with /");
      return;
    }
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
            update base URI
          </Heading>
          <Text ml={1} fontSize="sm">
            You must to update base uri before minting the nfts because if u don't have any base uri, the nft won't show in My NFT section
          </Text>
          <Text ml={1} fontSize="sm">
            Example: /ipfs/QmRKH5MUw52KRvzxBQJr9QHd2EqshyTYscLGXowP7RiXja/
          </Text>
          
        </ModalHeader>

        <ModalBody shadow="lg">
          
          <VStack>
            <Input
              bg="black"
              mb="15px"
              px={2}
              isDisabled={actionType}
              value={newURI}
              placeholder="Your new uri here"
              onChange={({ target }) => setNewURI(target.value)}
            />
            <CommonButton
              {...rest}
              w="full"
              onClick={updateBaseUri}
              text="submit"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
