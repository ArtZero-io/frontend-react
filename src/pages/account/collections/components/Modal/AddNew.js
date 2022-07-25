import {
  Button,
  Heading,
  IconButton,
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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { formMode } from "@constants";

function AddNewCollection({ mode = formMode.ADD, id }) {
  const {
    isOpen: isOpenAddNew,
    onOpen: onOpenAddNew,
    onClose: onCloseAddNew,
  } = useDisclosure();

  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    addCollectionTnxStatus?.status === "End" && onCloseAddNew();
  }, [onCloseAddNew, addCollectionTnxStatus?.status]);

  const modalSize = useBreakpointValue({ base: "xs", md: "xl" });

  return (
    <>
      {mode === formMode.ADD && (
        <Button
          variant="outline"
          color="brand.blue"
          onClick={() => onOpenAddNew()}
        >
          Add Collection
        </Button>
      )}

      {mode === formMode.EDIT && (
        <IconButton
          pos="absolute"
          top="1.5rem"
          right="1rem"
          aria-label="edit"
          icon={<EditIcon color="#7ae7ff" fontSize="24px" />}
          size="icon"
          borderWidth={0}
          variant="iconOutline"
          onClick={() => onOpenAddNew()}
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
        isCentered
        size={modalSize}
        isOpen={isOpenAddNew}
        onClose={onCloseAddNew}
      >
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
              {mode === formMode.ADD ? "add collection" : "edit collection"}
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
