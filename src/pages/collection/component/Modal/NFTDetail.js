/* eslint-disable no-unused-vars */
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "../Tab/Collectible";
import NFTTabActivity from "../Tab/Activity";

function NFTDetailModal({ isOpen, onClose, ...rest }) {
  const tabHeight = useBreakpointValue({ base: `2.5rem`, "2xl": `4.5rem` });

  const tabData = [
    {
      label: "Collectible",
      content: <NFTTabCollectible {...rest} />,
    },
    {
      // Before is label: "Activity",
      label: "Offers",
      content: <NFTTabActivity {...rest} />,
    },
  ];

  return (
    <Modal
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
        maxH={{ base: "34rem", xl: "25rem", "2xl": "40rem" }}
        maxW={{ base: "58rem", "2xl": "78rem" }}
      >
        <ModalCloseButton
          display={{ base: "none", xl: "block" }}
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
        />

        <Tabs isLazy align="left">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
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
                py={{ base: 5, "2xl": 10 }}
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
