import React from "react";
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
  IconButton,
  Button,
  PopoverFooter,
} from "@chakra-ui/react";

import { useSubstrateState } from "@utils/substrate";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { ImUnlocked } from "react-icons/im";
import { ContractPromise } from "@polkadot/api-contract";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { web3FromSource } from "@utils/wallets/extension-dapp";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { clientAPI } from "@api/client";

function LockNFTModal({ owner, nftContractAddress, tokenID, txType = "lock" }) {
  console.log(owner, nftContractAddress, tokenID);

  const { api, currentAccount } = useSubstrateState();
  const dispatch = useDispatch();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const lockNFTsHandler = async () => {
    if (owner !== currentAccount?.address) {
      return toast.error("You are not the owner of this NFT");
    }
    if (nftContractAddress) {
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
        .lock({ value: azero_value, gasLimit }, tokenID)
        .signAndSend(
          currentAccount?.address,
          { signer: injector.signer },
          async ({ status, dispatchError }) => {
            console.log("status", status);
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

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<ImUnlocked />} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader textAlign="center">
            Lock Metadata Confirmation!
          </PopoverHeader>

          <PopoverBody>
            Once locked, your content CAN NOT be edited or removed as it is
            permanently stored in decentralized file storage, which will be
            accessible for other clients to view and use.
          </PopoverBody>
          <PopoverFooter textAlign="center">
            <Text>Are you sure you want to lock?</Text>
            <Button variant="solid" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={lockNFTsHandler}>
              Lock
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default LockNFTModal;
