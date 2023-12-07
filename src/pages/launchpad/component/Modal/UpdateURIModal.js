import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Input,
  Text,
  Link,
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
import { UPDATE_BASE_URI, START, FINALIZED } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import toast from "react-hot-toast";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { getPublicCurrentAccount } from "@utils";

export default function UpdateURIModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();

  const [newURI, setNewURI] = useState("");
  const [currentURI, setCurrentURI] = useState("");
  const { currentAccount, api, apiState } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  const publicCurrentAccount = getPublicCurrentAccount();

  useEffect(() => {
    let isUnmounted = false;

    const getTokenUri = async (isUnmounted) => {
      let token_uri = "";
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        collection_address
      );

      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      token_uri = await nft721_psp34_standard_calls.tokenUri(
        publicCurrentAccount,
        1
      );

      if (!token_uri) toast.error("No token_uri!");

      let base_uri = token_uri.replace("1.json", "");
      if (isUnmounted) return;

      setCurrentURI(base_uri);
    };
    if (apiState !== "READY") return;

    getTokenUri(isUnmounted);
    return () => (isUnmounted = true);
  }, [collection_address, apiState, api, publicCurrentAccount]);

  useEffect(() => {
    if (rest.step === FINALIZED) {
      dispatch(clearTxStatus());
      onClose();
    }
  }, [dispatch, onClose, rest.step]);

  const updateBaseUri = async () => {
    if (newURI.toString().substr(-1) !== "/") {
      toast.error("Base Uri must be end with /");
      return;
    }

    try {
      const launchpad_psp34_nft_standard_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        collection_address
      );

      launchpad_psp34_nft_standard_calls.setContract(
        launchpad_psp34_nft_standard_contract
      );

      dispatch(setTxStatus({ type: UPDATE_BASE_URI, step: START }));

      await launchpad_psp34_nft_standard_calls.updateBaseUri(
        currentAccount,
        newURI,
        dispatch,
        UPDATE_BASE_URI,
        api
      );
    } catch (error) {
      console.log(error);
      toast.error("There was an error while update art location.");
      dispatch(clearTxStatus());
    }
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
          top="4"
          right="4"
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            update art location
          </Heading>
          <Text fontSize="sm" fontWeight="400">
            {currentURI
              ? `Current Art Location: ${currentURI}`
              : "Art Location is not set"}
          </Text>
          <Text fontSize="sm" fontWeight="400">
            We currently use IPFS to store Art Work of all collections. The
            example format of Art Location is
            /ipfs/QmRKH5MUw52KRvzxBQJr9QHd2EqshyTYscLGXowP7RiXja/
          </Text>
          <Text fontSize="sm" fontWeight="400">
            Note that: to make the process quicker, please contact our team to
            have your art work cached in our server. If you don't want to reveal
            your art during sale period, you can leave this empty. See more at{" "}
            <Link textTransform="none" href="#" isExternal>
              this link <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
        </ModalHeader>

        <ModalBody>
          <VStack>
            <Input
              bg="black"
              mb="15px"
              px={2}
              isDisabled={actionType}
              value={newURI}
              placeholder="Your new uri here"
              onChange={({ target }) => setNewURI(target.value)}
            />
            <CommonButton
              {...rest}
              w="full"
              onClick={updateBaseUri}
              text="submit"
            />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
