import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import ProfileForm from "../Form/Profile";
import { SCROLLBAR, FINALIZED, END } from "@constants";
import useTxStatus from "@hooks/useTxStatus";

export default function ProfileModal({
  profile,
  isOpen,
  onClose,
  forceUpdate,
}) {
  const { step, onEndClick } = useTxStatus();

  useEffect(() => {
    if (step === END) {
      forceUpdate();
      onClose();
    }
  }, [step, onClose, forceUpdate]);

  const modalSize = useBreakpointValue({
    base: `xs`,
    xl: `6xl`,
  });

  const headingDisplay = useBreakpointValue({
    base: `flex`,
    xl: `none`,
  });

  return (
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
        mx={{ "2xl": 72 }}
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
          onClick={() => step === FINALIZED && onEndClick()}
        />

        <ModalHeader>
          <Heading
            my={1}
            justifyContent="center"
            display={headingDisplay}
            fontSize={["xl", "3xl"]}
          >
            update profile
          </Heading>
        </ModalHeader>

        <ModalBody sx={SCROLLBAR} overflowY="scroll" overflowX="auto">
          <ProfileForm profile={profile} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
