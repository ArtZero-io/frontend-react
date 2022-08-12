import {
  Text,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
} from "@chakra-ui/react";

import { useSubstrateState } from "@utils/substrate";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { ContractPromise } from "@polkadot/api-contract";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { web3FromSource } from "@utils/wallets/extension-dapp";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { setTxStatus } from "@store/actions/txStatus";

import { isValidAddressPolkadotAddress } from "@utils";
import { useState } from "react";
import { stringToU8a } from "@polkadot/util";
import { APICall } from "@api/client";
import { START, FINALIZED, TRANSFER } from "@constants";
import CommonButton from "@components/Button/CommonButton";
import useTxStatus from "@hooks/useTxStatus";

function TransferNFTModalMobile({
  owner,
  nftContractAddress,
  tokenID,
  isDisabled = false,
  showOnChainMetadata,
}) {
  const { api, currentAccount } = useSubstrateState();
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [receiverAddress, setReceiverAddress] = useState("");
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const transferNFTsHandler = async () => {
    if (!isValidAddressPolkadotAddress(receiverAddress)) {
      return toast.error(`Invalid address! Please check again!`);
    }

    if (owner !== currentAccount?.address) {
      return toast.error("You are not the owner of this NFT");
    }
    if (nftContractAddress) {
      dispatch(setTxStatus({ type: TRANSFER, step: START }));

      const contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      let unsubscribe;

      const gasLimit = -1;
      const azero_value = 0;
      const injector = await web3FromSource(currentAccount?.meta?.source);
      console.log(receiverAddress);
      let additionalData = "";
      await contract.tx["psp34::transfer"](
        { value: azero_value, gasLimit },
        receiverAddress,
        { u64: tokenID },
        stringToU8a(additionalData)
      )
        .signAndSend(
          currentAccount?.address,
          { signer: injector.signer },
          async ({ status, dispatchError }) => {
            txResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: TRANSFER,

              api,
            });

            if (status.isFinalized) {
              await APICall.askBeUpdateNftData({
                collection_address: nftContractAddress,
                token_id: tokenID,
              });
            }
          }
        )
        .then((unsub) => (unsubscribe = unsub))
        .catch((error) => txErrorHandler({ error, dispatch }));

      return unsubscribe;
    }
  };

  return (
    <>
      <Button
        h="30px"
        p="4px"
        fontSize="12px"
        variant="outline"
        onClick={!actionType ? onOpen : () => {}}
      >
        transfer
      </Button>

      <Modal isCentered onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent borderRadius="0" bg="brand.grayDark">
          <ModalHeader textAlign="center">Transfer NFT </ModalHeader>

          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            top="0"
            right="0"
            onClick={rest.step === FINALIZED ? rest.onEndClick : onClose}
          />

          <ModalBody>
            <VStack w="full">
              <Text>Transfer to address:</Text>
              <Input
                bg="black"
                isDisabled={actionType}
                placeholder="5ABC..."
                _placeholder={{ fontSize: "12px" }}
                h="32px"
                px="4px"
                onChange={(val) => setReceiverAddress(val.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <VStack w="full">
              <Text>Are you sure you want to transfer NFT?</Text>

              <CommonButton
                {...rest}
                h="30px"
                text="submit"
                onClick={transferNFTsHandler}
                isDisabled={
                  !receiverAddress || (actionType && actionType !== TRANSFER)
                }
              />
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TransferNFTModalMobile;
