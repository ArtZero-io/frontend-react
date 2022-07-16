import {
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
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
      <Modal isCentered isOpen={isOpenAddNew} onClose={onCloseAddNew} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.grayDark"
          py={10}
          px={20}
          borderRadius="0"
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
          />
          <ModalHeader textAlign="center">
            <AddCollectionIcon />
            <Heading fontSize={["2xl", "3xl", "3xl"]} my={3}>
              {mode === formMode.ADD ? "Add collection" : "Edit collection"}
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Flex>
              <SimpleMode mode={mode} id={id} />
              <Spacer />
              <AdvancedMode mode={mode} id={id} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
