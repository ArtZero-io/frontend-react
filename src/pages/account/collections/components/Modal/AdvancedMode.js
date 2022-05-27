import { EditIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AdvancedModeForm from "../Form/AdvancedMode";
import { useDispatch, useSelector } from "react-redux";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";

function AdvancedModeModal({ mode = "add", id, nftContractAddress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );
  return (
    <>
      {mode === "add" && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          Advanced Mode
        </Button>
      )}
      {mode === "edit" && (
        <IconButton
          zIndex={"1"}
          pos="absolute"
          top="2rem"
          right="1.5rem"
          aria-label="edit"
          icon={
            <EditIcon
              color="#7ae7ff"
              fontSize="1.5rem"
              _hover={{
                bg: "#171717",
              }}
              p={1}
            />
          }
          size="icon"
          borderWidth={0}
          variant="iconOutline"
          onClick={() => onOpen()}
          h={0}
          _hover={{
            h: 0,
          }}
          _focus={{
            h: 0,
          }}
        />
      )}

      <Modal
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          px={6}
          pb={8}
          borderRadius="0"
          textAlign="center"
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
            onClick={() => {
              onCloseButtonModal({
                status: addCollectionTnxStatus?.status,
                dispatch,
                type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
              });
            }}
          />
          <ModalHeader>
            <Heading size="h4" m={2}>
              {mode === "add" ? "Advanced Mode" : "Edit Collection"}{" "}
              <Tooltip
                label="Advanced mode is designed for those who wants to use customized NFT smart contract for example dedicated 5k or 10k collections with whitelisted options."
                fontSize="md"
              >
                <QuestionIcon fontSize="md" />
              </Tooltip>
            </Heading>
          </ModalHeader>
          <ModalBody
            shadow="lg"
            overflowY="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0.3rem",
                borderRadius: "1px",
                backgroundColor: `#7ae7ff`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `#7ae7ff`,
              },
            }}
          >
            <AdvancedModeForm
              onClose={onClose}
              mode={mode}
              id={id}
              nftContractAddress={nftContractAddress}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdvancedModeModal;
