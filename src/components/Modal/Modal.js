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
import NFTTabInfo from "../../pages/account/nfts/components/Tabs/MyNFTInfo";

export default function ResponsivelySizedModal({
  children,
  onClose,
  isOpen,
  hasTabs = true,
  ...rest
}) {
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
        {hasTabs ? <TabOfModal {...rest} /> : children}
      </ModalContent>
    </Modal>
  );
}

const TabOfModal = (props) => {
  console.log("TabOfModal props", props);
  const tabData = [
    {
      label: "NFT info",
      content: <NFTTabInfo {...props} />,
    },
    // {
    //   label: "Offers",
    //   content: <NFTTabOffers {...props} />,
    // },
  ];

  return (
    <Tabs isLazy align="left" h="full">
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

      <TabPanels style={{ height: `calc(100% - 4.5rem)` }} if="asd">
        {tabData.map((tab, index) => (
          <TabPanel px={12} py={8} key={index} h="full">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
