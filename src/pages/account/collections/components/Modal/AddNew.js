import {
  Button,
  Flex,
  Heading,
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
import { AccountActionTypes } from "../../../../../store/types/account.types";

function AddNewCollection({ forceUpdate }) {
  const {
    isOpen: isOpenAddNew,
    onOpen: onOpenAddNew,
    onClose: onCloseAddNew,
  } = useDisclosure();

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  useEffect(() => {
    function onCloseHandler() {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });
        forceUpdate();
        console.log('forceUpdate...')
        onCloseAddNew();
      }
    }

    onCloseHandler();
  }, [tnxStatus, dispatch, forceUpdate, onCloseAddNew]);

  return (
    <>
      <Button
        variant="outline"
        color="brand.blue"
        onClick={() => onOpenAddNew()}
      >
        Add Collection
      </Button>

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
              Add collection
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Flex>
              <SimpleMode onCloseParent={onCloseAddNew} />
              <Spacer />
              <AdvancedMode />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewCollection;
