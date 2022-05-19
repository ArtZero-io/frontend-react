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
import { useDispatch, useSelector } from "react-redux";

import { onCloseButtonModal } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
export default function ResponsivelySizedModal({
  onClose,
  isOpen,
  hasTabs,
  children,
  filterSelected = 1,
  ...rest
}) {
  const tabHeight = useBreakpointValue({
    base: `2.5rem`,
    xl: `3.5rem`,
    "2xl": `4.5rem`,
  });

  const dispatch = useDispatch();

  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    addNftTnxStatus?.status === "End" && onClose();
  }, [onClose, addNftTnxStatus?.status]);

  const tabData = [
    {
      label: "NFT info",
      content: <MyNFTTabInfo filterSelected={filterSelected} {...rest} />,
      isDisabled: false,
    },
    {
      label: "Offers",
      content: <MyNFTTabOffers {...rest} />,
      isDisabled:
        filterSelected === 0 || filterSelected === 2 || addNftTnxStatus?.status
          ? true
          : false,
    },
  ];

  return (
    <Modal
      closeOnOverlayClick={false}
      scrollBehavior="inside"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      size={"7xl"}
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
        maxH={{ base: "28rem", "2xl": "40rem" }}
        maxW={{ base: "58rem", "2xl": "78rem" }}
      >
        <ModalCloseButton
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

        <Tabs isLazy align="left" h="full">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
                isDisabled={tab.isDisabled}
                ml={12}
                key={index}
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
              <TabPanel px={{ base: 6, "2xl": 12 }} py={8} h="full" key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
}
