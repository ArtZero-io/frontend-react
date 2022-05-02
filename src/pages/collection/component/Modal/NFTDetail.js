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

function NFTDetailModal({ isOpen, onClose, ...rest }) {
 
  const tabHeight = useBreakpointValue({ base: `2.5rem`, "2xl": `4.5rem` });

  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} size={"7xl"}>
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
        maxH={{ base: "28rem", "2xl": "40rem" }}
        maxW={{ base: "58rem", "2xl": "78rem" }}
      >
        <ModalCloseButton
          position="absolute"
          top="-8"
          right="-8"
          borderWidth={2}
          borderRadius="0"
        />
        <Tabs isLazy align="left" h="full">
          <TabList bg="#171717">
            <Tab
              ml={12}
              fontSize="md"
              fontFamily="Evogria Italic"
              minH={tabHeight}
            >
              {`NFT info`}
            </Tab>
          </TabList>

          <TabPanels style={{ height: `calc(100% - ${tabHeight})` }}>
            <TabPanel px={{ base: 6, "2xl": 12 }} py={8} h="full">
              <NFTTabCollectible {...rest} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Tabs isLazy align="left">
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
        </Tabs> */}
      </ModalContent>
    </Modal>
  );
}

export default NFTDetailModal;

// const tabData = [
//   {
//     label: "Collectible",
//     content: <NFTTabCollectible {...rest} />,
//   },
//   {
//     label: "Activity",
//     content: <NFTTabActivity {...rest} />,
//   },
// ];