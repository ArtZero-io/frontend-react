import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useBreakpointValue,
  Heading,
  HStack,
} from "@chakra-ui/react";

import useTxStatus from "@hooks/useTxStatus";
import { formMode, SCROLLBAR, FINALIZED } from "@constants";
import MyMintingProjectPage from "../minting";
import ProjectInfoIcon from "@theme/assets/icon/ProjectInfo";
import toast from "react-hot-toast";

function OwnerMintModal({ mode = formMode.ADD, isDisabled, ...rest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, onEndClick } = useTxStatus();
  const modalSize = useBreakpointValue(["xs", "4xl", "4xl"]);

  // useEffect(() => {
  //   step === END && onClose();
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
            owner mint
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
            top="4"
            right="4"
            onClick={() => step === FINALIZED && onEndClick()}
          />
          <ModalHeader></ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <MyMintingProjectPage {...rest} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OwnerMintModal;
