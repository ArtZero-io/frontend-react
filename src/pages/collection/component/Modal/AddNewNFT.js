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
import { useDispatch, useSelector } from "react-redux";
import AddNewNFTForm from "../Form/AddNewNFT";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import EditIcon from "@theme/assets/icon/Edit.js";
import { formMode } from "@constants";
import { SCROLLBAR } from "../../../../constants";

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
          <Tooltip
            hasArrow
            mx="8px"
            bg="#333"
            color="#fff"
            borderRadius="0"
            label="Edit NFT"
          >
            <span
              onClick={() => onOpen()}
              style={{
                padding: "6px",
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                border: "2px solid #333333",
              }}
            >
              <EditIcon width="14px" height="14px" color="currentColor" />
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
            onClick={() =>
              onCloseButtonModal({
                status: addNftTnxStatus?.status,
                dispatch,
                type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
              })
            }
          />
          <ModalHeader>
            <Heading fontSize={["2xl", "3xl", "3xl"]} my={2}>
              {mode === formMode.ADD ? "Add new NFT" : "Edit NFT"}
            </Heading>
          </ModalHeader>

          <ModalBody shadow="lg" overflowY="auto" sx={SCROLLBAR}>
            <AddNewNFTForm mode={mode} {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewNFTModal;
