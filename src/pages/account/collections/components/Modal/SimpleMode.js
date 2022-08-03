import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

import SimpleModeForm from "../Form/SimpleMode";
import { useDispatch, useSelector } from "react-redux";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import EditIcon from "@theme/assets/icon/Edit.js";
import { formMode, SCROLLBAR, END } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import { useEffect } from "react";

function SimpleModeModal({ mode = formMode.ADD, id, nftContractAddress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );
  const modalSize = useBreakpointValue(["xs", "4xl", "4xl"]);
  const { step } = useTxStatus();

  useEffect(() => {
    step === END && onClose();
  }, [step, onClose]);

  return (
    <>
      {mode === formMode.ADD && (
        <Tooltip
          hasArrow
          bg="#333"
          color="#fff"
          label="Simple Mode is designed for non-tech people. NFT Creators can enter all information in the website and the collection will be created on-chain using our standard NFT smart contract."
        >
          <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
            Simple Mode
          </Button>
        </Tooltip>
      )}

      {mode === formMode.EDIT && (
        <>
          <IconButton
            zIndex={"1"}
            pos="absolute"
            top="2px"
            right="2px"
            h="40px"
            minW="40px"
            aria-label="edit"
            icon={
              <EditIcon
                id="abc1"
                color="currentColor"
                width="17px"
                height="17px"
                p="0"
              />
            }
            size="icon"
            borderWidth={0}
            variant="iconSolid"
            _hover={{
              color: "#000",
              bg: "#7ae7ff",
            }}
            bg="black"
            color="#7ae7ff"
            onClick={() => onOpen()}
          />
        </>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        size={modalSize}
        onClose={onClose}
        closeOnEsc={false}
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          borderRadius="0"
          textAlign="center"
          px={["4px", "24px", "24px"]}
          pb={["4px", "32px", "32px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
            onClick={() => {
              onCloseButtonModal({
                status: addCollectionTnxStatus?.status,
                dispatch,
                type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
              });
            }}
          />
          <ModalHeader>
            <Heading fontSize={["2xl", "3xl", "3xl"]} m={2}>
              {mode === formMode.ADD ? "Simple Mode" : "Edit Collection"}{" "}
              <Tooltip
                bg="#333"
                color="#fff"
                fontSize="md"
                label="Simple Mode is designed for non-tech people. NFT Creators can enter all information in the website and the collection will be created on-chain using our standard NFT smart contract."
              >
                <QuestionIcon fontSize="md" />
              </Tooltip>
            </Heading>
          </ModalHeader>

          <ModalBody shadow="lg" overflowY="auto" sx={SCROLLBAR}>
            <SimpleModeForm
              id={id}
              maxH="60rem"
              mode={mode}
              nftContractAddress={nftContractAddress}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimpleModeModal;
