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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewNFTForm from "../Form/AddNewNFT";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import { EditIcon } from "@chakra-ui/icons";

const AddNewNFTModal = ({ mode = "add", ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    addNftTnxStatus?.status === "End" && onClose();
  }, [onClose, addNftTnxStatus?.status]);

  return (
    <>
      {mode === "add" && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          Add new NFT
        </Button>
      )}
      {mode === "edit" && (
        <>
          <IconButton
            pos="absolute"
            top={{
              base: `1rem`,
              xl: `1rem`,
            }}
            right={{
              base: `1rem`,
              xl: `1rem`,
            }}
            w={["20px", "20px", "40px"]}
            h={["20px", "20px", "40px"]}
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
            borderWidth="0px"
            variant="iconSolid"
            _hover={{
              color: "#000",
              bg: "#7ae7ff",
              borderWidth: "2px",
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
        size={"4xl"}
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
              Add new NFT
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
            <AddNewNFTForm mode={mode} {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewNFTModal;
