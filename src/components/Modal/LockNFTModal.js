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
  Button,
  PopoverFooter,
  Tooltip,
  TagRightIcon,
} from "@chakra-ui/react";

import { useSubstrateState } from "@utils/substrate";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { ImUnlocked } from "react-icons/im";
import { ContractPromise } from "@polkadot/api-contract";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { web3FromSource } from "@utils/wallets/extension-dapp";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { clientAPI } from "@api/client";
import { setTxStatus } from "@store/actions/txStatus";
import { START, LOCK } from "@constants";
function LockNFTModal({
  owner,
  nftContractAddress,
  tokenID,
  txType = "lock",
  isDisabled = "false",
}) {
  const { api, currentAccount } = useSubstrateState();
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const txStatus = useSelector((state) => state.txStatus);

  const lockNFTsHandler = async () => {
    if (owner !== currentAccount?.address) {
      return toast.error("You are not the owner of this NFT");
    }
    if (nftContractAddress) {
      dispatch(setTxStatus({ txType: LOCK, txStatus: START }));

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
              txType,
              api,
            });

            if (status.isFinalized === true) {
              await clientAPI("post", "/updateNFT", {
                collection_address: nftContractAddress,
                token_id: tokenID,
              });
              // await delay(300);
            }
          }
        )
        .then((unsub) => (unsubscribe = unsub))
        .catch((error) => txErrorHandler({ error, dispatch }));

      return unsubscribe;
    }
  };

  // useEffect(() => {
  //   const forceUpdate = async () => {
  //     if (txStatus?.lockStatus === FINALIZED) {
  //       await delay(100).then(() => {
  //         dispatch(clearTxStatus());

  //         onClose();
  //       });
  //     }
  //   };

  //   forceUpdate();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, txStatus]);

  return (
    <>
      <Popover
        top="52px"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger mt="52px">
          <Tooltip
            top="52px"
            hasArrow
            label="Unlocked on-chain metadata"
            bg="gray.300"
          >
            <span>
              <TagRightIcon
                cursor="pointer"
                ml="6px"
                as={ImUnlocked}
                onClick={!isDisabled ? onOpen : () => {}}
                size="22px"
              />
            </span>
          </Tooltip>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader textAlign="center">
            Lock Metadata Confirmation!
          </PopoverHeader>

          <PopoverBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </PopoverBody>
          <PopoverFooter textAlign="center">
            <Text>Are you sure you want to lock?</Text>
            <Button variant="solid" onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={txStatus?.lockStatus}
              loadingText={txStatus?.lockStatus}
              variant="outline"
              onClick={lockNFTsHandler}
            >
              Lock
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LockNFTModal;
