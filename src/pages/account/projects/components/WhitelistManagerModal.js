import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  // ModalOverlay,
  useDisclosure,
  useBreakpointValue,
  ModalHeader,
  HStack,
  Heading,
} from "@chakra-ui/react";
import ProjectInfoIcon from "@theme/assets/icon/ProjectInfo";

import useTxStatus from "@hooks/useTxStatus";
import { formMode, SCROLLBAR, FINALIZED } from "@constants";
import MyWhiteListProjectPage from "../whitelist";
import toast from "react-hot-toast";
// import { useEffect } from 'react';

function WhitelistManagerModal({
  mode = formMode.ADD,
  isDisabled = false,
  ...rest
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, onEndClick } = useTxStatus();
  const modalSize = useBreakpointValue(["xs", "6xl"]);

  // useEffect(() => {
  //   step === FINALIZED && onClose();
  // }, [step, onClose]);

  return (
    <>
      {mode === formMode.ADD && (
        <HStack
          minW="fit-content"
          cursor="pointer"
          onClick={
            isDisabled
              ? () => toast.error("You must be the project owner!")
              : () => onOpen()
          }
        >
          <ProjectInfoIcon color={!isDisabled ? "#fff" : "#888"} />
          <Heading
            fontSize={["md", "sm"]}
            color={!isDisabled ? "brand.blue" : "#888"}
            textDecoration="underline"
            fontFamily="Evogria, sans-serif"
          >
            whitelist manager
          </Heading>
        </HStack>
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
        {/* <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        /> */}
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
          <ModalHeader></ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <MyWhiteListProjectPage {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WhitelistManagerModal;
