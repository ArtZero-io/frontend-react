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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { AccountActionTypes } from "@store/types/account.types";
import { EditIcon } from "@chakra-ui/icons";

function AddNewCollection({ forceUpdate, mode, id }) {
  const {
    isOpen: isOpenAddNew,
    onOpen: onOpenAddNew,
    onClose: onCloseAddNew,
  } = useDisclosure();

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    function onCloseHandler() {
      if (tnxStatus?.status === "End") {
        // dispatch({
        //   type: AccountActionTypes.SET_TNX_STATUS,
        //   payload: null,
        // });
        // console.log("AddNewCollection onCloseHandler");
        // forceUpdate();

        onCloseAddNew();
      }
    }

    onCloseHandler();
  }, [tnxStatus, dispatch, forceUpdate, onCloseAddNew]);

  return (
    <>
      {mode === "add" && (
        <Button
          variant="outline"
          color="brand.blue"
          onClick={() => onOpenAddNew()}
        >
          Add Collection
        </Button>
      )}
      {mode === "edit" && (
        <IconButton
          pos="absolute"
          top="1.5rem"
          right="1rem"
          aria-label="edit"
          icon={<EditIcon color="#7ae7ff" fontSize="1.5rem" />}
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
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader textAlign="center">
            <AddCollectionIcon />
            <Heading size="h4" my={3}>
              {mode === "add" ? "Add collection" : "Edit collection"}
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Flex>
              <SimpleMode onCloseParent={onCloseAddNew} mode={mode} id={id} />
              <Spacer />
              <AdvancedMode onCloseParent={onCloseAddNew} mode={mode} id={id} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
