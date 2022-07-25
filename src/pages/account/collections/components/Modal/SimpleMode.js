/* eslint-disable no-unused-vars */
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
import { QuestionIcon } from "@chakra-ui/icons";

import SimpleModeForm from "../Form/SimpleMode";
import { useDispatch, useSelector } from "react-redux";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import EditIcon from "@theme/assets/icon/Edit.js";
import { formMode } from "@constants";
import { SCROLLBAR } from "../../../../../constants";

function SimpleModeModal({ mode = formMode.ADD, id, nftContractAddress }) {
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
      {mode === formMode.ADD && (
        <Tooltip
          hasArrow
          label="Simple Mode is designed for non-tech people. NFT Creators can enter all information in the website and the collection will be created on-chain using our standard NFT smart contract."
        >
          <Button
            variant="outline"
            color="brand.blue"
            onClick={() => {
              onOpenSimpleMode();
            }}
          >
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
            onClick={() => onOpenSimpleMode()}
          />
        </>
      )}
      <Modal
        scrollBehavior={"inside"}
        closeOnOverlayClick={false}
        closeOnEsc={false}
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
            sx={SCROLLBAR}
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
