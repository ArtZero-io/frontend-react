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
import EditIcon from "@theme/assets/icon/Edit.js";

import { useEffect } from "react";
import useTxStatus from "@hooks/useTxStatus";
import SimpleModeForm from "../Form/SimpleMode";
import { formMode, SCROLLBAR, END, FINALIZED } from "@constants";

function SimpleModeModal({ mode = formMode.ADD, id, nftContractAddress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, onEndClick } = useTxStatus();
  const modalSize = useBreakpointValue(["xs", "4xl", "4xl"]);

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
            h="40px"
            top="2px"
            bg="black"
            right="2px"
            minW="40px"
            size="icon"
            zIndex={"1"}
            pos="absolute"
            borderWidth={0}
            color="#7ae7ff"
            aria-label="edit"
            variant="iconSolid"
            onClick={() => onOpen()}
            _hover={{
              color: "#000",
              bg: "#7ae7ff",
            }}
            icon={
              <EditIcon p="0" width="17px" height="17px" color="currentColor" />
            }
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
          borderRadius="0"
          textAlign="center"
          position="relative"
          bg="brand.grayDark"
          px={["4px", "24px", "24px"]}
          pb={["4px", "32px", "32px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
            onClick={() => step === FINALIZED && onEndClick()}
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

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <SimpleModeForm
              id={id}
              mode={mode}
              maxH="60rem"
              nftContractAddress={nftContractAddress}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimpleModeModal;
