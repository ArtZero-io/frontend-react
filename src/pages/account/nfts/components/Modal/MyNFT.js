import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import NFTTabInfo from "../Tabs/MyNFTInfo";
import NFTTabOffers from "../Tabs/MyNFTOffers";

function MyNFTModal(props) {
  console.log('propsprops', props)
  const tabData = [
    {
      label: "NFT info",
      content: <NFTTabInfo {...props} />,
    },
    {
      label: "Offers",
      content: <NFTTabOffers {...props} />,
    },
  ];

  return (
    <Modal
      onClose={props.onClose}
      isCentered
      isOpen={props.isOpen}
      size={"6xl"}
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

export default MyNFTModal;
