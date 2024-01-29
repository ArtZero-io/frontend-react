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
  HStack,
  Button,
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
import { WITHDRAW_LAUNCHPAD, START, FINALIZED } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";

import toast from "react-hot-toast";

export default function UpdateWithdrawModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();
  const [contractBalance, setContractBalance] = useState(0);
  const [withdrawBalance, setWithdrawBalance] = useState(0);
  const { currentAccount, api, apiState } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();

  useEffect(() => {
    let isUnmounted = false;

    const fetch = async (isUnmount) => {
      if (rest.step === FINALIZED) {
        dispatch(clearTxStatus());
        setWithdrawBalance(0);
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

      const balFree = balance.toHuman().free?.replaceAll(",", "") / 10 ** 12;
      const balFrozen =
        balance.toHuman().frozen?.replaceAll(",", "") / 10 ** 12;

      const tempBal = balFree - balFrozen;

      const tempBalFloorRound = Math.floor(tempBal);
      if (isUnmounted) return;

      setContractBalance(tempBalFloorRound);
    };
    if (apiState !== "READY") return;

    fetch(isUnmounted);
    return () => (isUnmounted = true);
  }, [api, collection_address, dispatch, onClose, rest.step, apiState]);

  const withdrawFee = async () => {
    const launchpad_psp34_nft_standard_contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      collection_address
    );

    launchpad_psp34_nft_standard_calls.setContract(
      launchpad_psp34_nft_standard_contract
    );

    try {
      dispatch(setTxStatus({ type: WITHDRAW_LAUNCHPAD, step: START }));

      await launchpad_psp34_nft_standard_calls.withdrawFee(
        currentAccount,
        withdrawBalance,
        dispatch,
        WITHDRAW_LAUNCHPAD,
        api
      );
    } catch (error) {
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  function handleAddMax() {
    setWithdrawBalance(contractBalance);
  }

  if (actionType === WITHDRAW_LAUNCHPAD && rest.step === FINALIZED) {
    dispatch(clearTxStatus());
    setWithdrawBalance(0);
    onClose();
  }

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
          top="4"
          right="4"
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            Withdraw Balance
          </Heading>
          <Text ml={1} fontSize="sm" fontWeight="400">
            Your balance {contractBalance} AZERO.
          </Text>
        </ModalHeader>

        <ModalBody>
          <VStack>
            <HStack mb={3} w="full" alignItems="center">
              <NumberInput
                bg="black"
                h="3.125rem"
                w="full"
                px={0}
                min={0}
                defaultValue={1}
                isDisabled={actionType}
                max={contractBalance}
                value={withdrawBalance}
                onChange={(valueString) => {
                  if (/[eE+-]/.test(valueString)) return;
                  setWithdrawBalance(valueString);
                }}
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
              <Button
                variant="outline"
                isDisabled={actionType}
                onClick={() => handleAddMax()}
              >
                Max
              </Button>
            </HStack>
            <CommonButton
              {...rest}
              w="full"
              onClick={withdrawFee}
              text="withdraw"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
