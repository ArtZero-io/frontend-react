import {
  Text,
  Tooltip,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  VStack,
  useBreakpointValue,
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
import { APICall } from "@api/client";
import { setTxStatus } from "@store/actions/txStatus";
import { START, FINALIZED, LOCK } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import UnlockIcon from "../../theme/assets/icon/Unlock";
import { getEstimatedGas } from "@utils/";

function LockNFTModalMobile({
  owner,
  nftContractAddress,
  tokenID,
  isDisabled = false,
  showOnChainMetadata,
}) {
  const { api, currentAccount } = useSubstrateState();
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  const lockNFTsHandler = async () => {
    if (owner !== currentAccount?.address) {
      return toast.error("You are not the owner of this NFT");
    }

    if (nftContractAddress) {
      dispatch(setTxStatus({ type: LOCK, step: START }));

      const contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );

      let unsubscribe;
      let gasLimit ;

      const address = currentAccount?.address;
      const { signer } = await web3FromSource(currentAccount?.meta?.source);
      const value = 0;

      gasLimit = await getEstimatedGas(address, contract, value, "psp34Traits::lock", {
        u64: tokenID,
      });

      await contract.tx["psp34Traits::lock"](
        { value, gasLimit },
        { u64: tokenID }
      )
        .signAndSend(
          currentAccount?.address,
          { signer },
          async ({ status, dispatchError }) => {
            txResponseErrorHandler({
              status,
              dispatchError,
              dispatch,
              txType: LOCK,
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

  const iconWidth = useBreakpointValue(["40px", "50px"]);

  return (
    <>
      {showOnChainMetadata && (
        <Tooltip
          hasArrow
          bg="#333"
          color="#fff"
          borderRadius="0"
          label="Unlocked on-chain metadata"
        >
          <span
            onClick={
              !isDisabled
                ? onOpen
                : () => toast.error("This item is currently for sale!")
            }
            style={{
              width: iconWidth,
              height: iconWidth,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #333333",
            }}
          >
            <UnlockIcon width={["20px", "25px"]} height={["20px", "25px"]} />
          </span>
        </Tooltip>
      )}

      <Modal isCentered onClose={onClose} size="xs" isOpen={isOpen}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent borderRadius="0" bg="brand.grayDark">
          <ModalHeader textAlign="center">
            Lock Metadata Confirmation !
          </ModalHeader>

          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            top="0"
            right="0"
            onClick={rest.step === FINALIZED ? rest.onEndClick : onClose}
          />

          <ModalBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </ModalBody>

          <ModalFooter>
            <VStack w="full">
              <Text>Are you sure you want to lock?</Text>
              <CommonButton
                {...rest}
                h="30px"
                text="submit"
                onClick={lockNFTsHandler}
                isDisabled={actionType && actionType !== LOCK}
              />
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LockNFTModalMobile;
