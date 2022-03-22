import {
  Text,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import UpdateProfileForm from "../Form/FormUpdateProfile";

const UpdateProfileModal = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        size="xs"
        leftIcon={<HiPencilAlt />}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Edit
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl" p="1">
        {overlay}
        <ModalContent>
          <ModalHeader>
            <Text>Update Account</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProfileForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
