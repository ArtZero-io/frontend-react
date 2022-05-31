import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import ProfileForm from "../Form/Profile";
import { delay } from "@utils";
import { onCloseButtonModal } from "@utils";

export default function ProfileModal({
  profile,
  isOpen,
  onClose,
  forceUpdate,
}) {
  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    function onCloseHandler() {
      if (addCollectionTnxStatus?.status === "End") {
        // dispatch({
        //   type: AccountActionTypes.SET_TNX_STATUS,
        //   payload: null,
        // });

        delay(300).then(() => {
          forceUpdate();
          onClose();
          dispatch({
            type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
          });
        });
      }
    }

    onCloseHandler();
  }, [addCollectionTnxStatus, dispatch, forceUpdate, onClose]);

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"6xl"}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        p={12}
        borderRadius="0"
        minH={{ xl: "md" }}
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
          onClick={() => {
            onCloseButtonModal({
              status: addCollectionTnxStatus?.status,
              dispatch,
              type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
            });
          }}
        />
        <ProfileForm profile={profile} />
      </ModalContent>
    </Modal>
  );
}
