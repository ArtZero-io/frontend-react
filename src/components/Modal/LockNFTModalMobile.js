/* eslint-disable no-unused-vars */
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
  Icon,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
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
import { clearTxStatus } from "../../store/actions/txStatus";
import { AiOutlineUnlock } from "react-icons/ai";

function LockNFTModalMobile({
  owner,
  nftContractAddress,
  tokenID,
  txType = "lock",
  isDisabled = "false",
  showOnChainMetadata,
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

  return (
    <>
      {showOnChainMetadata && (
        <Tooltip
          hasArrow
          mx="8px"
          bg="#333"
          color="#fff"
          borderRadius="0"
          label="Unlocked on-chain metadata"
        >
          <span
            style={{
              padding: "6px",
              display: "flex",
              alignItems: "center",
              border: "2px solid #333333",
            }}
          >
            <Icon
              w="14px"
              h="14px"
              cursor="pointer"
              as={AiOutlineUnlock}
              // onClick={!isDisabled ? onOpenLockNFT() : () => {}}
              onClick={() => onOpen()}
            />
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
          />

          <ModalBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </ModalBody>

          <ModalFooter>
            <HStack justify="center" align="center">
              <Text>Are you sure you want to lock?</Text>

              <Button
                size="sm"
                isLoading={txStatus?.lockStatus}
                loadingText={txStatus?.lockStatus}
                variant="outline"
                onClick={lockNFTsHandler}
              >
                Lock
              </Button>
            </HStack>{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Popover
        placement="bottom"
        closeOnBlur={false}
        isOpen={isOpenLockNFT}
        onOpen={onOpenLockNFT}
        onClose={onCloseLockNFT}
      >
        {showOnChainMetadata && (
          <PopoverTrigger>
            <Tooltip
              hasArrow
              mx="8px"
              bg="#333"
              color="#fff"
              borderRadius="0"
              label="Unlocked on-chain metadata"
            >
              <span
                style={{
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  border: "2px solid #333333",
                }}
              >
                <Icon
                  w="14px"
                  h="14px"
                  cursor="pointer"
                  as={AiOutlineUnlock}
                  onClick={!isDisabled ? onOpenLockNFT() : () => {}}
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
            Lock Metadata Confirmation!
          </PopoverHeader>
          <PopoverBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </PopoverBody>
          <PopoverFooter>
            <HStack justify="center" align="center">
              <Text>Are you sure you want to lock?</Text>
               
              <Button
                size="sm"
                isLoading={txStatus?.lockStatus}
                loadingText={txStatus?.lockStatus}
                variant="outline"
                onClick={lockNFTsHandler}
              >
                Lock
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover> */}
      {/* xxxxxxxxxxxxxxxxxxxxxx */}

      {/* {showOnChainMetadata && (
        <Tooltip
          hasArrow
          mx="8px"
          bg="#333"
          color="#fff"
          borderRadius="0"
          label="Unlocked on-chain metadata"
        >
          <span
            style={{
              padding: "6px",
              display: "flex",
              alignItems: "center",
              border: "2px solid #333333",
            }}
          >
            <Icon
              w="14px"
              h="14px"
              cursor="pointer"
              as={AiOutlineUnlock}
              // onClick={!isDisabled ? onOpenLockNFT() : () => {}}
              onClick={() => onOpenLockNFT()}
            />
          </span>
        </Tooltip>
      )}
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        scrollBehavior="inside"
        isCentered
        onClose={onOpenLockNFT}
        isOpen={isOpenLockNFT}
        size={"xs"}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent
          position="relative"
          bg="brand.grayDark"
          borderRadius="0"
          p={0}
          h="full"
          w="full"
          maxH={{ base: "28rem", xl: "30rem", "2xl": "40rem" }}
          maxW={{ base: "58rem", xl: "60rem", "2xl": "78rem" }}
        >
          <ModalHeader textAlign="center">
            Lock Metadata Confirmation!
          </ModalHeader>
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
            onClick={() => onCloseLockNFT()}
            isDisabled={txStatus?.lockStatus}
            onClick={() => {
              onCloseLockNFT();
              txStatus?.lockStatus === "Finalized" && dispatch(clearTxStatus());
            }}
          />

          <ModalBody>
            Once locked, the on-chain metadata for this NFT will be locked
            permanently. No one will be able to unlock or edit the metadata.
          </ModalBody>
          <ModalFooter>
            <HStack justify="center" align="center">
              <Text>Are you sure you want to lock?</Text>

              <Button
                size="sm"
                isLoading={txStatus?.lockStatus}
                loadingText={txStatus?.lockStatus}
                variant="outline"
                onClick={lockNFTsHandler}
              >
                Lock
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
}

export default LockNFTModalMobile;
