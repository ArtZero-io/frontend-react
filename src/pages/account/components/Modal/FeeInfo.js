import {
  Box,
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

const FeeInfoModal = ({ platformFee }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const modalSize = useBreakpointValue({
    base: `xs`,
    md: `3xl`,
  });

  const feeChart = [
    {
      qty: 0,
      percent: 0,
    },
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

  return (
    <>
      <Box
        maxW="200px"
        fontFamily="Evogria"
        textDecor="underline"
        variant="filled"
        fontSize={["15px"]}
        bg="transparent"
        color="#fff"
        cursor="pointer"
        my="20px"
        mx={[0, "30px"]}
        onClick={() => onOpen()}
      >
        more information
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent
          position="relative"
          bg="brand.semiBlack"
          py="6"
          px={{ base: "2", md: "6" }}
          borderRadius="0"
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            top={["0", "-8"]}
            right={["0", "-8"]}
          />

          <ModalHeader textAlign="center">
            <Heading fontSize={{ base: "xl", md: "32px" }} my={3}>
              trade discount for PMP NFT staked
            </Heading>
          </ModalHeader>

          <ModalBody p="0">
            <HStack spacing={"0"}>
              <Box
                textAlign="center"
                py={{ base: "1", xl: "4" }}
                w={{ base: "30%", md: "30%", xl: "25%" }}
              >
                <Flex direction="column" w="full">
                  <Heading fontSize={{ base: "sm", md: "24px" }} mb={3} p={0}>
                    stakers
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex align="center" justify="center" borderWidth={1}>
                        <Flex minH={{ base: "4.5rem", "2xl": "5rem" }}>
                          <Heading
                            m="auto"
                            minW={"5rem"}
                            fontSize={{ base: "sm", md: "24px" }}
                          >
                            {item.qty} {item.qty === 20 ? "+" : ""} NFTs
                          </Heading>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>

              <Box
                // px={[0, 4]}
                py={{ base: "1", "2xl": "4" }}
                textAlign="left"
                w={{ base: "25%", md: "30%", xl: "25%" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading fontSize={{ base: "sm", md: "24px" }} mb={3}>
                    trade fee
                  </Heading>

                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex
                        w="full"
                        align="center"
                        justify="center"
                        borderWidth={1}
                      >
                        <Flex
                          textAlign="center"
                          minH={{ base: "4.5rem", "2xl": "5rem" }}
                        >
                          <Heading
                            m="auto"
                            minW={"5rem"}
                            fontSize={{ base: "sm", md: "24px" }}
                          >
                            {Math.round(((100 - item.percent) * platformFee)) / 100} %
                          </Heading>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>

              <Box
                // px={[0, 4]}
                textAlign="left"
                w={{ base: "45%", md: "40%", xl: "50%" }}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading fontSize={{ base: "sm", md: "24px" }} mb={3}>
                    trade discount
                  </Heading>

                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex
                        justifyContent={"center"}
                        w="full"
                        borderWidth={1}
                        alignItems="center"
                        pl={{ base: "8px", "2xl": "40px" }}
                      >
                        <Flex minH={{ base: "4.5rem", "2xl": "5rem" }} mr={3}>
                          <Text
                            textAlign="right"
                            minW={["30px", "80px"]}
                            m="auto"
                            color="#fff"
                            fontFamily="DS-Digital"
                            fontSize={{ base: "2xl", md: "5xl" }}
                          >
                            {item.percent}%
                          </Text>
                        </Flex>

                        <Flex
                          direction="column"
                          align="start"
                          justify="center"
                          pr={[1, 3]}
                        >
                          <Heading
                            mb={[0, "2"]}
                            color="#7AE7FF"
                            fontSize={{ base: "sm", md: "24px" }}
                          >
                            off
                          </Heading>
                          <Heading fontSize={{ base: "sm", md: "24px" }}>
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
