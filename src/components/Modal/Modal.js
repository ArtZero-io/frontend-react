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
  useBreakpointValue,
} from "@chakra-ui/react";

import NFTTabInfo from "../../pages/account/nfts/components/Tabs/MyNFTInfo";

export default function ResponsivelySizedModal({
  children,
  onClose,
  isOpen,
  hasTabs,
  ...rest
}) {
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
        {!hasTabs ? (
          children
        ) : (
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
                <NFTTabInfo {...rest} />{" "}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </ModalContent>
    </Modal>
  );
}

// const TabOfModal = (props) => {
// const tabData = [
//   {
//     label: "NFT info",
//     content: <NFTTabInfo {...props} />,
//   },
//   {
//     label: "Offers",
//     content: <NFTTabOffers {...props} />,
//   },
// ];

//   const tabHeight = useBreakpointValue({ base: `2.5rem`, "2xl": `4.5rem` });

//   return (
//     <Tabs isLazy align="left" h="full">
//

//         {tabData.map((tab, index) => (
//           <Tab
//             key={index}
//             ml={12}
//             fontSize="md"
//             fontFamily="Evogria Italic"
//             minH={tabHeight}
//           >
//             {tab.label}
//           </Tab>
//         ))}
//       </TabList>

//       <TabPanels style={{ height: `calc(100% - ${tabHeight})` }} if="asd">
//

//         {tabData.map((tab, index) => (
//           <TabPanel px={{ base: 6, "2xl": 12 }} py={8} key={index} h="full">
//             {tab.content}
//           </TabPanel>
//         ))}
//       </TabPanels>
//     </Tabs>
//   );
// }
