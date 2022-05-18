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
} from "@chakra-ui/react";
import { EditIcon, QuestionIcon } from "@chakra-ui/icons";

import SimpleModeForm from "../Form/SimpleMode";
import { useDispatch, useSelector } from "react-redux";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";

function SimpleModeModal({
  mode = "add",
  id,
  nftContractAddress,
  onCloseParent,
}) {
  const {
    isOpen: isOpenSimpleMode,
    onOpen: onOpenSimpleMode,
    onClose: onCloseSimpleMode,
  } = useDisclosure();

  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );

  return (
    <>
      {mode === "add" && (
        <Button
          variant="outline"
          color="brand.blue"
          onClick={() => {
            onOpenSimpleMode();
          }}
        >
          Simple Mode
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
          onClick={() => onOpenSimpleMode()}
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
        isCentered
        isOpen={isOpenSimpleMode}
        onClose={onCloseSimpleMode}
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
              onCloseParent();
            }}
          />
          <ModalHeader>
            <Heading size="h4" m={2}>
              {mode === "add" ? "Simple Mode" : "Edit Collection"}{" "}
              <Tooltip
                label="Simple Mode is designed for non-tech people. NFT Creators can enter all information in the website and the collection will be created on-chain using our standard NFT smart contract."
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
            <SimpleModeForm
              maxH="60rem"
              onClose={onCloseSimpleMode}
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

export default SimpleModeModal;
