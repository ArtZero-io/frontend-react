import {
  Modal,
  ModalCloseButton,
  ModalContent,
  useBreakpointValue,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  ModalOverlay,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NFTTabCollectible from "../Tab/Collectible";
import OwnershipHistory from "../Tab/OwnershipHistory";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
import MyNFTOffer from "@pages/account/nfts/components/Tabs/MyNFTOffers";
import TxHistory from "../Tab/TxHistory";
import PrevArrowIcon from "@theme/assets/icon/PrevArrow";

function NFTDetailModal({ isOpen, onClose, handleNav, ...rest }) {
  const tabHeight = useBreakpointValue({
    base: `1rem`,
    xl: `3.5rem`,
    "2xl": `4.5rem`,
  });

  const { step, onEndClick, actionType } = useTxStatus();

  useEffect(() => {
    step === FINALIZED && onClose();
  }, [step, onClose]);

  const tabData = [
    {
      label: "detail",
      content: <NFTTabCollectible {...rest} />,
      isDisabled: actionType,
    },
    {
      label: "offers",
      content: <MyNFTOffer {...rest} />,
      isDisabled: actionType || !rest?.is_for_sale,
    },
    {
      label: "owner history",
      content: <OwnershipHistory {...rest} />,
      isDisabled: actionType,
    },
    {
      label: "tx history",
      content: <TxHistory {...rest} />,
      isDisabled: actionType,
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={true}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.800" />

      <ModalContent
        p={0}
        w="full"
        maxW="1350px"
        minH="655px"
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
      >
        {tabIndex === 0 && (
          <>
            <Flex
              _hover={{ color: "#7ae7ff" }}
              w="40px"
              h="100%"
              cursor={"pointer"}
              alignItems="center"
              justifyContent="center"
              maxH={`calc(100% - ${tabHeight})`}
              position="absolute"
              left="17px"
              bottom="0"
              onClick={() => handleNav(rest?.tokenID, -1)}
            >
              <PrevArrowIcon />
            </Flex>

            <Flex
              transform="rotate(180deg)"
              _hover={{ color: "#7ae7ff" }}
              w="40px"
              h="100%"
              cursor={"pointer"}
              alignItems="center"
              justifyContent="center"
              maxH={`calc(100% - ${tabHeight})`}
              position="absolute"
              right="17px"
              bottom="0"
              onClick={() => handleNav(rest?.tokenID, 1)}
            >
              <PrevArrowIcon />
            </Flex>
          </>
        )}

        <ModalCloseButton
          borderRadius="0"
          position="absolute"
          borderWidth={[0, "2px"]}
          top="4"
          right="4"
          _hover="none"
          bg="#171717"
          onClick={() => step === FINALIZED && onEndClick()}
        />

        <Tabs
          onChange={(index) => setTabIndex(index)}
          isLazy
          align="left"
          colorScheme="brand.blue"
        >
          <TabList bg="#171717" px="50px">
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
              <TabPanel h="584px" key={index} p="50px" px="92px">
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
