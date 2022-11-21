import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';

import useTxStatus from '@hooks/useTxStatus';
import { formMode, SCROLLBAR, FINALIZED } from '@constants';
import MyMintingProjectPage from '../minting';

function OwnerMintModal({
  mode = formMode.ADD,
  isDisabled,
  id,
  nftContractAddress,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, onEndClick } = useTxStatus();
  const modalSize = useBreakpointValue(['xs', '4xl', '4xl']);

  // useEffect(() => {
  //   step === END && onClose();
  // }, [step, onClose]);

  return (
    <>
      {mode === formMode.ADD && (
        <Button
          w={['full', 'auto']}
          isDisabled={isDisabled}
          variant="outline"
          color="brand.blue"
          onClick={() => onOpen()}
        >
          owner mint
        </Button>
      )}

      <Modal
        isCentered
        isOpen={isOpen}
        size={modalSize}
        onClose={onClose}
        closeOnEsc={false}
        scrollBehavior={'inside'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          borderRadius="0"
          textAlign="center"
          position="relative"
          bg="brand.grayDark"
          px={['4px', '24px', '24px']}
          pb={['4px', '32px', '32px']}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={['0', '-8', '-8']}
            right={['0', '-8', '-8']}
            onClick={() => step === FINALIZED && onEndClick()}
          />
          <ModalHeader></ModalHeader>

          <ModalBody overflowY="auto" sx={SCROLLBAR}>
            <MyMintingProjectPage />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OwnerMintModal;
