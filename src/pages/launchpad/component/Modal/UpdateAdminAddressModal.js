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
import { UPDATE_ADMIN_ADDRESS, START, FINALIZED, END } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { isValidAddressPolkadotAddress } from "@utils";
import toast from "react-hot-toast";

export default function UpdateAdminAddressModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const [newAdminAddress, setNewAdminAddress] = useState("");
  const { currentAccount, api } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    if (rest.step === END) {
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, onClose, rest.step]);

  const updateAdminAddress = async () => {
    // console.log("updateAdminAddress...", newAdminAddress);
    if (!isValidAddressPolkadotAddress(newAdminAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    dispatch(setTxStatus({ type: UPDATE_ADMIN_ADDRESS, step: START }));

    await launchpad_psp34_nft_standard_calls.updateAdminAddress(
      currentAccount,
      newAdminAddress,
      dispatch,
      UPDATE_ADMIN_ADDRESS,
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
      size={["xs", "xl"]}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        pt="20px"
        pb="30px"
        px={[0, "30px"]}
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={["340px", "600px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            update admin address
          </Heading>
        </ModalHeader>

        <ModalBody>
          <VStack>
            <Input
              bg="black"
              mb="15px"
              px={2}
              isDisabled={actionType}
              value={newAdminAddress}
              placeholder="Your new address here"
              onChange={({ target }) => setNewAdminAddress(target.value)}
            />
            <CommonButton
              {...rest}
              w="full"
              onClick={updateAdminAddress}
              text="submit"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
