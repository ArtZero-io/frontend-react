import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Fragment } from "react";

const FeeInfoModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const modalSize = useBreakpointValue({
    base: `xs`,
    xl: `3xl`,
  });
  
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

      <Modal isCentered isOpen={isOpen} onClose={onClose} size={modalSize}>
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
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8", "-8"]}
            right={["0", "-8", "-8"]}
          />

          <ModalHeader textAlign="center">
            <Heading fontSize={{ base: "xl", xl: "32px" }} my={3}>
              trade discount for artzero NFT staked
            </Heading>
          </ModalHeader>

          <ModalBody>
            <HStack>
              <Box
                textAlign="center"
                p={{ base: "1", xl: "4" }}
                w={{ base: "30%", xl: "50%" }}
              >
                <Flex direction="column" w="full">
                  <Heading fontSize={{ base: "sm", xl: "24px" }} mb={3} p={0}>
                    stakers
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex align="center" justify="center" borderWidth={1}>
                        <Flex minH={{ base: "4.5rem", "2xl": "5rem" }}>
                          <Heading
                            m="auto"
                            minW={"5rem"}
                            fontSize={{ base: "sm", xl: "24px" }}
                          >
                            {item.qty} NFTs
                          </Heading>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>

              <Box
                px={[0, 4]}
                textAlign="left"
                w={{ base: "70%", xl: "50%" }}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading fontSize={{ base: "sm", xl: "24px" }} mb={3}>
                    trade discount
                  </Heading>

                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex
                        w="full"
                        borderWidth={1}
                        alignItems="center"
                        pl={{ base: "16px", "2xl": "40px" }}
                      >
                        <Flex minH={{ base: "4.5rem", "2xl": "5rem" }} mr={3}>
                          <Text
                            m="auto"
                            color="#fff"
                            fontFamily="DS-Digital"
                            fontSize={{ base: "4xl", xl: "5xl" }}
                          >
                            {item.percent}%
                          </Text>
                        </Flex>

                        <Flex
                          direction="column"
                          align="start"
                          justify="center"
                          pr={3}
                        >
                          <Heading
                            mb="2"
                            color="#7AE7FF"
                            fontSize={{ base: "sm", xl: "24px" }}
                          >
                            off
                          </Heading>
                          <Heading fontSize={{ base: "sm", xl: "24px" }}>
                            trade fee
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
