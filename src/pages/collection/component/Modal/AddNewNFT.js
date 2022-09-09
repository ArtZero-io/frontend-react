import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AddNewNFTForm from "../Form/AddNewNFT";
import EditIcon from "@theme/assets/icon/Edit.js";
import { formMode, SCROLLBAR, END, FINALIZED } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import toast from "react-hot-toast";

const AddNewNFTModal = ({ mode = formMode.ADD, isDisabled, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { actionType, step, onEndClick } = useTxStatus();

  const modalSize = useBreakpointValue(["xs", "4xl"]);
  const iconWidth = useBreakpointValue(["40px", "50px"]);

  useEffect(() => {
    step === END && onClose();
  }, [step, onClose]);

  return (
    <>
      {mode === formMode.ADD && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          Add new NFT
        </Button>
      )}

      {mode === formMode.EDIT && (
        <>
          <Tooltip
            hasArrow
            bg="#333"
            color="#fff"
            borderRadius="0"
            label="Edit NFT"
          >
            <span
              onClick={
                isDisabled || actionType
                  ? () => toast.error("This item is currently for sale!")
                  : onOpen
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
              <EditIcon
                width={{ base: "20px" }}
                height={{ base: "20px" }}
                color="currentColor"
              />
            </span>
          </Tooltip>
        </>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        size={modalSize}
        onClose={onClose}
        closeOnEsc={false}
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          maxWidth={["340px", "940px"]}
          borderRadius="0"
          textAlign="center"
          minH={{ xl: "md" }}
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
            <Heading fontSize={["2xl", "3xl", "3xl"]} my={2}>
              {mode === formMode.ADD ? "Add new NFT" : "Edit NFT"}
            </Heading>
          </ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <AddNewNFTForm mode={mode} {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewNFTModal;
