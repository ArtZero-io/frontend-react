import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NFTTabCollectible from '../Tab/Collectible';
import OwnershipHistory from '../Tab/OwnershipHistory';
import useTxStatus from '@hooks/useTxStatus';
import { FINALIZED } from '@constants';
import MyNFTOffer from '@pages/account/nfts/components/Tabs/MyNFTOffers';
import TxHistory from '../Tab/TxHistory';

function NFTDetailModal({ isOpen, onClose, ...rest }) {
  const tabHeight = useBreakpointValue({
    base: `1rem`,
    xl: `3.5rem`,
    '2xl': `4.5rem`,
  });

  const { step, onEndClick, actionType } = useTxStatus();

  useEffect(() => {
    step === FINALIZED && onClose();
  }, [step, onClose]);

  const tabData = [
    {
      label: 'collectible',
      content: <NFTTabCollectible {...rest} />,
      isDisabled: actionType,
    },
    {
      label: 'offers',
      content: <MyNFTOffer {...rest} />,
      isDisabled: actionType || !rest?.is_for_sale,
    },
    {
      label: 'owner history',
      content: <OwnershipHistory {...rest} />,
      isDisabled: actionType,
    },
    {
      label: 'tx history',
      content: <TxHistory {...rest} />,
      isDisabled: actionType,
    },
  ];
  return (
    <Modal
      isCentered
      isOpen={isOpen}
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
        w="full"
        maxW="78rem"
        minH="655px"
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
      >
        <ModalCloseButton
          borderRadius="0"
          position="absolute"
          borderWidth={[0, '2px']}
          top={['0', '-8', '-8']}
          right={['0', '-8', '-8']}
          onClick={() => step === FINALIZED && onEndClick()}
        />

        <Tabs isLazy align="left" colorScheme="brand.blue">
          <TabList bg="#171717">
            {tabData.map((tab, index) => (
              <Tab
                ml={12}
                px="0.5px"
                key={index}
                color="#fff"
                _selected={{
                  color: 'brand.blue',
                  borderBottom: '2px solid #7ae7ff',
                }}
                minH={tabHeight}
                isDisabled={tab.isDisabled}
                fontFamily="Evogria Italic"
                py={['10px', '20px', '20px']}
                fontSize={['13px', null, '18px']}
                lineHeight={['21px', null, '30px']}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels style={{ height: `calc(100% - ${tabHeight})` }}>
            {tabData.map((tab, index) => (
              <TabPanel h="584px" key={index} p="50px">
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
