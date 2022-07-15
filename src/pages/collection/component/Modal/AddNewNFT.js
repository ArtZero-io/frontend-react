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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewNFTForm from "../Form/AddNewNFT";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import { EditIcon } from "@chakra-ui/icons";
import { formMode } from "@constants";

const AddNewNFTModal = ({ mode = formMode.ADD, isDisabled, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    addNftTnxStatus?.status === "End" && onClose();
  }, [onClose, addNftTnxStatus?.status]);

  const modalSize = useBreakpointValue(["xs", "4xl", "4xl"]);

  return (
    <>
      {mode === formMode.ADD && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          Add new NFT
        </Button>
      )}
      {mode === formMode.EDIT && (
        <>
          <IconButton
            isDisabled={isDisabled}
            pos="absolute"
            top={{
              base: `10px`,
              xl: `10px`,
            }}
            right={{
              base: `60px`,
              xl: `60px`,
            }}
            w={["20px", "20px", "40px"]}
            h={["20px", "20px", "40px"]}
            aria-label="edit"
            icon={
              <EditIcon color="currentColor" width="17px" height="17px" p="0" />
            }
            size="icon"
            borderWidth="0px"
            variant="iconSolid"
            _hover={{
              color: "#000",
              bg: "#7ae7ff",
              borderWidth: "2px",
            }}
            _disabled={{
              bg: "transparent",
            }}
            bg="transparent"
            color="#7ae7ff"
            onClick={() => onOpen()}
          />
        </>
      )}
      <Modal
        closeOnOverlayClick={false}
        closeOnEsc={false}
        scrollBehavior="inside"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={modalSize}
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
          minH={{ xl: "md" }}
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
            onClick={() =>
              onCloseButtonModal({
                status: addNftTnxStatus?.status,
                dispatch,
                type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
              })
            }
          />
          <ModalHeader>
            <Heading size="h4" my={2}>
              {mode === formMode.ADD ? "Add new NFT" : "Edit NFT"}
            </Heading>
          </ModalHeader>

          <ModalBody
            shadow="lg"
            overflowY="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "4px",
                height: "4px",
                borderRadius: "0px",
                backgroundColor: `transparent`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `#7ae7ff`,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: `#7ae7ff`,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: `transparent`,
              },
            }}
          >
            <AddNewNFTForm mode={mode} {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewNFTModal;
