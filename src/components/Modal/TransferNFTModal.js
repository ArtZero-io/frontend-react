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
    HStack,
  } from "@chakra-ui/react";
  
  import { useSubstrateState } from "@utils/substrate";
  
  import toast from "react-hot-toast";
  import { useDispatch, useSelector } from "react-redux";
  import { useState } from "react";
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
  import { clearTxStatus } from "../../store/actions/txStatus";
  import { stringToU8a } from "@polkadot/util";
  function TransferNFTModal({
    owner,
    nftContractAddress,
    tokenID,
    txType = "lock",
    isDisabled = "false",
    showOnChainMetadata,
  }) {
    const { api, currentAccount } = useSubstrateState();
    const dispatch = useDispatch();
    const [receiverAddress, setReceiverAddress] = useState('');
    const {
      onOpen: onOpenLockNFT,
      onClose: onCloseLockNFT,
      isOpen: isOpenLockNFT,
    } = useDisclosure();
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
            console.log(receiverAddress);
        let additionalData = '';
        await contract.tx['psp34::transfer']({ value: azero_value, gasLimit }, receiverAddress, { u64: tokenID }, stringToU8a(additionalData))
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
  
    return (
      <>
        <Popover
          isOpen={isOpenLockNFT}
          onOpen={onOpenLockNFT}
          onClose={onCloseLockNFT}
          placement="bottom"
          closeOnBlur={false}
        >
          {showOnChainMetadata && (
            <PopoverTrigger mt="0px">
              <Tooltip
                top="0px"
                hasArrow
                label="Unlocked on-chain metadata"
                bg="#333"
                color="#fff"
              >
                <span>
                  <TagRightIcon
                    cursor="pointer"
                    ml="6px"
                    as={ImUnlocked}
                    onClick={!isDisabled ? onOpenLockNFT : () => {}}
                    size="22px"
                  />
                </span>
              </Tooltip>
            </PopoverTrigger>
          )}
          <PopoverContent bg="#333" borderRadius="0" fontSize="sm">
            <PopoverArrow />
            <PopoverCloseButton
              isDisabled={txStatus?.lockStatus}
              onClick={() => {
                onCloseLockNFT();
                txStatus?.lockStatus === "Finalized" && dispatch(clearTxStatus());
              }}
            />
            <PopoverHeader textAlign="center">
              Transfer NFT
            </PopoverHeader>
            <PopoverBody>
              Transfer to{" "}
              <input style={{backgroundColor: "black"}} onChange={(val) => setReceiverAddress(val.target.value)}/>
            </PopoverBody>
            <PopoverFooter>
              <HStack justify="center" align="center">
                <Text>Are you sure you want to tranfer NFT?</Text>
                {/* <Button variant="solid" onClick={onClose}>
                Cancel
              </Button> */}
                <Button
                  size="sm"
                  isLoading={txStatus?.lockStatus}
                  loadingText={txStatus?.lockStatus}
                  variant="outline"
                  onClick={lockNFTsHandler}
                >
                  Transfer
                </Button>
              </HStack>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </>
    );
  }
  
  export default TransferNFTModal;
  