import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  PopoverFooter,
  Tooltip,
  HStack,
  useBreakpointValue,
  Icon,
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
import { AiOutlineUnlock } from "react-icons/ai";
import { START, FINALIZED, LOCK, END } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";
import { useEffect } from "react";

function LockNFTModal({
  owner,
  nftContractAddress,
  tokenID,
  isDisabled = false,
  showOnChainMetadata,
}) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
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

      const gasLimit = -1;
      const azero_value = 0;
      const injector = await web3FromSource(currentAccount?.meta?.source);

      await contract.tx
        .lock({ value: azero_value, gasLimit }, { u64: tokenID })
        .signAndSend(
          currentAccount?.address,
          { signer: injector.signer },
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

  const iconBorderSize = useBreakpointValue({ base: "6px", "2xl": "10px" });

  useEffect(() => {
    rest.step === END && onClose();
  }, [onClose, rest.step]);

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        {showOnChainMetadata && (
          <PopoverTrigger mt="0px">
            <Tooltip
              hasArrow
              top="-10px"
              bg="#333"
              color="#fff"
              label="Unlocked on-chain metadata"
            >
              <span
                style={{
                  padding: iconBorderSize,
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  border: "2px solid #333333",
                }}
              >
                <Icon
                  width={{ base: "14px", "2xl": "20px" }}
                  height={{ base: "14px", "2xl": "20px" }}
                  cursor="pointer"
                  as={AiOutlineUnlock}
                  onClick={!actionType ? onOpen : () => {}}
                />
              </span>
            </Tooltip>
          </PopoverTrigger>
        )}
        <PopoverContent bg="#333" borderRadius="0" fontSize="sm">
          <PopoverArrow />

          <PopoverCloseButton
            borderRadius="0"
            isDisabled={actionType}
            onClick={rest.step === FINALIZED ? rest.onEndClick : onClose}
          />

          <PopoverHeader textAlign="center">
            Lock Metadata Confirmation!
          </PopoverHeader>

          <PopoverBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </PopoverBody>

          <PopoverFooter>
            <HStack justify="center" align="center">
              <Text>Are you sure you want to lock?</Text>

              <CommonButton
                {...rest}
                h="40px"
                px="8px"
                text="submit"
                onClick={lockNFTsHandler}
                isDisabled={actionType && actionType !== LOCK}
              />
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LockNFTModal;
