import {
  Button,
  Heading,
  MenuItem,
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
import { formMode, FINALIZED } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import { useHistory } from "react-router-dom";
import { ACCOUNT_MY_COLLECTIONS } from "../../../../../constants/routes";

function AddNewCollection({ variant = "", mode = formMode.ADD, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { step } = useTxStatus();
  const history = useHistory();

  useEffect(() => {
    if (step === FINALIZED && variant === "navbar") {
      history.push(ACCOUNT_MY_COLLECTIONS);
      onClose();
    }
    step === FINALIZED && onClose();
  }, [step, onClose, variant, history]);

  const modalSize = useBreakpointValue({ base: "xs", md: "xl" });

  return (
    <>
      {variant !== "navbar" && mode === formMode.ADD && (
        <Button variant="outline" color="brand.blue" onClick={() => onOpen()}>
          create collection
        </Button>
      )}

      {variant === "navbar" && mode === formMode.ADD && (
        <MenuItem
          onClick={() => onOpen()}
          to="#"
          ml={["20px", "auto"]}
          py={["4px", "12px"]}
          px={["4px", "15px"]}
          _hover={{ bg: "black" }}
          fontFamily="Evogria, sans-serif"
          fontSize={{ base: "18px", md: "15px" }}
        >
          create collection
        </MenuItem>
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
          py="32px"
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
            <Stack
              w="80%"
              mx="auto"
              gap={["10px", "30px"]}
              direction={{ base: "column", md: "row" }}
            >
              <SimpleMode variant={variant} mode={mode} id={id} />

              <Spacer />

              <AdvancedMode variant={variant} mode={mode} id={id} />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
