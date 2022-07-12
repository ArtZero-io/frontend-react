import {
  Box,
  Button,
  Flex,
  // Grid,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  // Stack,
  HStack,
} from "@chakra-ui/react";
import { Fragment } from "react";

const FeeInfoModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant="filled"
        bg="transparent"
        color="#fff"
        ml={3}
        onClick={() => onOpen()}
      >
        more information
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.semiBlack"
          p={{ base: "1", "2xl": "6" }}
          borderRadius="0"
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader textAlign="center">
            <Heading fontSize={{ base: "24px", xl: "32px" }} my={3}>
              Trade discount for Artzero NFT staked
            </Heading>
          </ModalHeader>

          <ModalBody>
            <HStack>
              <Box
                w={{ base: "30%", xl: "50%" }}
                textAlign="center"
                p={{ base: "1", xl: "4" }}
              >
                <Flex direction="column" w="full">
                  <Heading fontSize={{ base: "16px", xl: "24px" }} mb={3} p={0}>
                    Stakers
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex align="center" justify="center" borderWidth={1}>
                        <Box
                          minH={{ base: "4.5rem", "2xl": "5rem" }}
                          py={{ base: "4", "2xl": "6" }}
                        >
                          <Heading
                            fontSize={{ base: "16px", xl: "24px" }}
                            minW={"5rem"}
                          >
                            {item.qty} NFTs
                          </Heading>
                        </Box>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>
              <Box
                px={4}
                textAlign="left"
                w={{ base: "70%", xl: "50%" }}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading fontSize={{ base: "16px", xl: "24px" }} mb={3}>
                    Trade discount
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex
                        borderWidth={1}
                        w="full"
                        pl={{ base: "16px", "2xl": "40px" }}
                      >
                        <Box minH={{ base: "4.5rem", "2xl": "5rem" }} mr={3}>
                          <Text
                            fontFamily="DS-Digital"
                            fontSize={{ base: "36px", xl: "5xl" }}
                            color="#fff"
                          >
                            {item.percent}%
                          </Text>
                        </Box>
                        <Flex
                          direction="column"
                          align="start"
                          justify="center"
                          pr={3}
                        >
                          <Heading
                            fontSize={{ base: "16px", xl: "24px" }}
                            color="#7AE7FF"
                            mb="2"
                          >
                            Off
                          </Heading>
                          <Heading fontSize={{ base: "14px", xl: "24px" }}>
                            Trade Fee
                          </Heading>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeeInfoModal;

const feeChart = [
  {
    qty: 1,
    percent: 30,
  },
  {
    qty: 5,
    percent: 50,
  },
  {
    qty: 7,
    percent: 66,
  },
  {
    qty: 9,
    percent: 80,
  },
  {
    qty: 20,
    percent: 90,
  },
];
