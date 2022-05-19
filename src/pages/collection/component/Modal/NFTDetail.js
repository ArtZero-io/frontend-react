import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "../Tab/Collectible";
import NFTTabActivity from "../Tab/Activity";
import { useDispatch, useSelector } from "react-redux";
import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";

function NFTDetailModal({ isOpen, onClose, ...rest }) {
  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    addNftTnxStatus?.status === "End" && onClose();
  }, [onClose, addNftTnxStatus?.status]);

  const tabHeight = useBreakpointValue({
    base: `2.5rem`,
    xl: `3.5rem`,
    "2xl": `4.5rem`,
  });

  const tabData = [
    {
      label: "Collectible",
      content: <NFTTabCollectible {...rest} />,
      isDisabled: false,
    },
    {
      // Before is label: "Activity",
      label: "Offers",
      content: <NFTTabActivity {...rest} />,
      isDisabled: addNftTnxStatus?.status ? true : false,
    },
  ];

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      size={{ base: "sm", xl: "7xl" }}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        bg="brand.grayDark"
        borderRadius="0"
        p={0}
        h="full"
        w="full"
        maxH={{ base: "auto", xl: "28rem", "2xl": "40rem" }}
        maxW={{ base: "58rem", "2xl": "78rem" }}
      >
        <ModalCloseButton
          // display={{ base: "none", xl: "block" }}
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
          onClick={() =>
            onCloseButtonModal({
              status: addNftTnxStatus?.status,
              dispatch,
              type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
            })
          }
        />

        <Tabs isLazy align="left">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
                isDisabled={tab.isDisabled}
                key={index}
                ml={12}
                fontSize="md"
                fontFamily="Evogria Italic"
                minH={tabHeight}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels style={{ height: `calc(100% - ${tabHeight})` }}>
            {tabData.map((tab, index) => (
              <TabPanel
                px={{ base: 6, "2xl": 12 }}
                py={{ base: 4, "2xl": 8 }}
                key={index}
                h="full"
              >
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}

export default NFTDetailModal;
