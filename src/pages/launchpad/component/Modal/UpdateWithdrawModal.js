import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
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
//   import toast from "react-hot-toast";
import BN from "bn.js";

export default function UpdateWithdrawModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();
  const [contractBalance, setContractBalance] = useState(0);
  const [withdrawBalance, setWithdrawBalance] = useState(0);
  const { currentAccount, api } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    const fetch = async () => {
      if (rest.step === END) {
        dispatch(clearTxStatus());
        onClose();
      }
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );
      const { data: balance } = await api.query.system.account(
        collection_address
      );
      setContractBalance(
        new BN(balance.free, 10, "le").div(new BN(10 ** 6)).toNumber() / 10 ** 6
      );
    };
    fetch();
  }, [api, collection_address, dispatch, onClose, rest.step]);

  const withdrawFee = async () => {
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    dispatch(setTxStatus({ type: UPDATE_BASE_URI, step: START }));

    await launchpad_psp34_nft_standard_calls.withdrawFee(
      currentAccount,
      withdrawBalance,
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
            Withdraw Balance
          </Heading>
          <Text ml={1} fontSize="sm">
            Now, you have {contractBalance} ZERO.
          </Text>
        </ModalHeader>

        <ModalBody>
          <VStack>
            <NumberInput
              bg="black"
              defaultValue={1}
              onChange={(valueString) => setWithdrawBalance(valueString)}
              max={contractBalance}
              value={withdrawBalance}
              mb={3}
              h="3.125rem"
              w="full"
              px={0}
              min={0}
            >
              <NumberInputField
                h="3.125rem"
                borderRadius={0}
                borderWidth={0}
                color="#fff"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <CommonButton
              {...rest}
              w="full"
              onClick={withdrawFee}
              text="submit"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
