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
import MyNFTTabInfo from "@pages/account/nfts/components/Tabs/MyNFTInfo";
import MyNFTTabOffers from "@pages/account/nfts/components/Tabs/MyNFTOffers";
import { useEffect } from "react";

import { FINALIZED, END } from "@constants";
import useTxStatus from "@hooks/useTxStatus";

export default function ResponsivelySizedModal({
  onClose,
  isOpen,
  filterSelected = 1,
  ...rest
}) {
  const tabHeight = useBreakpointValue({
    base: `1rem`,
    xl: `3.5rem`,
    "2xl": `4.5rem`,
  });

  const { step, onEndClick, actionType } = useTxStatus();

  useEffect(() => {
    step === END && onClose();
  }, [step, onClose]);

  const tabData = [
    {
      label: "nft info",
      content: <MyNFTTabInfo filterSelected={filterSelected} {...rest} />,
      isDisabled: actionType,
    },
    {
      label: "offers",
      content: <MyNFTTabOffers {...rest} />,
      isDisabled: filterSelected === 0 || actionType || !rest?.is_for_sale,
    },
  ];

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      size={"7xl"}
      onClose={onClose}
      closeOnEsc={false}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        p={0}
        h="full"
        w="full"
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={{ base: "58rem", xl: "60rem", "2xl": "78rem" }}
        maxH={{ base: "28rem", xl: "30rem", "2xl": "40rem" }}
      >
        <ModalCloseButton
          borderRadius="0"
          position="absolute"
          borderWidth={[0, "2px"]}
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
          onClick={() => step === FINALIZED && onEndClick()}
        />

        <Tabs isLazy align="left">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
                ml={12}
                px="0.5px"
                key={index}
                color="#fff"
                _selected={{
                  color: "brand.blue",
                  borderBottom: "2px solid #7ae7ff",
                }}
                minH={tabHeight}
                isDisabled={tab.isDisabled}
                fontFamily="Evogria Italic"
                py={["10px", "20px", "20px"]}
                fontSize={["13px", null, "18px"]}
                lineHeight={["21px", null, "30px"]}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels style={{ height: `calc(100% - ${tabHeight})` }}>
            {tabData.map((tab, index) => (
              <TabPanel
                h="full"
                key={index}
                px={{ base: 6, "2xl": 12 }}
                py={{ base: "22px", "2xl": "44px" }}
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
