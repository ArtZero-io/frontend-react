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
  const tabHeight = useBreakpointValue({
    base: `1rem`,
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

  const modalSize = useBreakpointValue(["xs", "7xl", "7xl"]);

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      scrollBehavior="inside"
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      size={modalSize}
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
        maxH={{ base: "calc(100% - 7.5rem)", xl: "30rem", "2xl": "40rem" }}
        maxW={{ base: "20rem", xl: "60rem", "2xl": "78rem" }}
      >
        <ModalCloseButton
          w="42px"
          h="42px"
          border="none"
          // borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
          onClick={() =>
            onCloseButtonModal({
              status: addNftTnxStatus?.status,
              dispatch,
              type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
            })
          }
        />

        <Tabs isLazy align="left" colorScheme="brand.blue">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
                px="0.5px"
                key={index}
                ml={[6, 12, 12]}
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

export default NFTDetailModal;
