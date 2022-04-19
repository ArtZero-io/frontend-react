import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "../Tab/Collectible";
import NFTTabActivity from "../Tab/Activity";

function NFTDetailModal({ selectedNft, isOpen, onClose }) {
  const tabData = [
    {
      label: "Collectible",
      content: <NFTTabCollectible {...selectedNft} />,
    },
    {
      label: "Activity",
      content: <NFTTabActivity {...selectedNft} />,
    },
  ];

  return (
    <Modal
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={"78rem"}
      minH="40rem"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        position="relative"
        mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        px={0}
        borderRadius="0"
        minH={{ xl: "lg" }}
      >
        <ModalCloseButton
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
                minH="4.5rem"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabData.map((tab, index) => (
              <TabPanel px={12} py={8} key={index}>
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
