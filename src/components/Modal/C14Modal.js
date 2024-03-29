import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

export default function C14Modal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <>
      {isBigScreen ? (
        <Button
          _hover={{
            borderBottomColor: "brand.blue",
            color: "brand.blue",
            borderBottomWidth: "2px",
          }}
          _focus={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
            borderBottom: "none",
          }}
          py={["4px", "10px"]}
          px={["1px"]}
          fontFamily="Evogria, sans-serif"
          fontSize={{ base: "18px", md: "15px" }}
          variant="ghost"
          onClick={onOpen}
          borderBottomWidth="2px"
          borderBottomColor="transparent"
          h={"42px"}
        >
          <Text>buy azero</Text>
        </Button>
      ) : (
        <Text
          _hover={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          _active={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          _focus={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          fontSize="32px"
          lineHeight="shorter"
          fontFamily="Evogria, sans-serif"
          color={isOpen ? "#7ae7ff" : "#fff"}
          onClick={() => onOpen()}
        >
          buy azero
        </Text>
      )}

      <Modal
        motionPreset="slideInBottom"
        size="5xl"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="0">
          <ModalCloseButton
            top="0"
            right="0"
            borderRadius="0"
            position="absolute"
            borderWidth={0}
            _focus={{
              borderWidth: 0,
            }}
          />
          <ModalBody p="30px">
            <iframe
              title="c14 money"
              src="https://pay.c14.money/?targetAssetId=01d80aba-7688-4e5b-97b8-5f3f77dd6714"
              width="100%"
              height="750px"
            ></iframe>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
