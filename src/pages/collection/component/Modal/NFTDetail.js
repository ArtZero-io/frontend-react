import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "../Tab/Collectible";
// import NFTTabActivity from "../Tab/Activity";

function NFTDetailModal({ isOpen, onClose, ...rest }) {
  const tabData = [
    {
      label: "Collectible",
      content: <NFTTabCollectible {...rest} />,
    },
    // {
    //   label: "Activity",
    //   content: <NFTTabActivity {...rest} />,
    // },
  ];

  return (
    <Modal onClose={onClose} isCentered isOpen={isOpen} size="6xl">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        // my={{ base: "20rem", "2xl": "40rem" }}
        w={{ base: "56rem", "2xl": "100%" }}
        position="relative"
        // mx={{ "2xl": 72 }}
        bg="brand.grayDark"
        p={0}
        borderRadius="0"
        maxH={{ "2xl": "40rem" }}
        minH={{ "2xl": "40rem" }}
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
              <TabPanel px={{ base: 8, "2xl": 12 }} py={8} key={index}>
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
