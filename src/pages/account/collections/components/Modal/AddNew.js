import {
  Button,
  Heading,
  // IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import AdvancedMode from "./AdvancedMode";
import SimpleMode from "./SimpleMode";

import AddCollectionIcon from "@theme/assets/icon/AddCollection";
import { useEffect } from "react";
// import { EditIcon } from "@chakra-ui/icons";
import { formMode, END } from "@constants";
import useTxStatus from "@hooks/useTxStatus";

function AddNewCollection({ mode = formMode.ADD, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { step } = useTxStatus();

  useEffect(() => {
    step === END && onClose();
  }, [step, onClose]);

  const modalSize = useBreakpointValue({ base: "xs", md: "xl" });

  return (
    <>
      {mode === formMode.ADD && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          create Collection
        </Button>
      )}

      <Modal isCentered size={modalSize} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          borderRadius="0"
          position="relative"
          bg="brand.grayDark"
          px={["4px", "24px", "24px"]}
          py={["4px", "32px", "32px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
          />
          <ModalHeader textAlign="center">
            <AddCollectionIcon
              width={["36px", "48px"]}
              height={["36px", "48px"]}
            />

            <Heading fontSize={["xl", "3xl", "3xl"]} my={3}>
              create new collection
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Stack w="75%" mx="auto" direction={{ base: "column", md: "row" }}>
              <SimpleMode mode={mode} id={id} />

              <Spacer />

              <AdvancedMode mode={mode} id={id} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
