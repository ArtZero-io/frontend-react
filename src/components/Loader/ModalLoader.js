import {
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AzeroAnimation } from "./AnimationLoader";

const ModalLoader = ({
  loadingTime = 5,
  addText = "wait a moment...",
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (loadingTime) {
      console.log("YES loading loadingTime 2 ModalLoader ", loadingTime);

      onOpen();
    } else {
      console.log("NO loading loadingTime 3 ModalLoader ", loadingTime);

      onClose();
    }
  }, [loadingTime, onClose, onOpen]);

  return (
    <Modal
      {...rest}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent shadow="none" bg="transparent">
        <VStack alignItems="center" spacing={2}>
          <AzeroAnimation loadingTime={loadingTime} />
          <Heading color="#7ae7ff" size="h6" px={5}>
            {addText}
          </Heading>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default ModalLoader;
