import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
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

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.semiBlack"
          p={{ base: "3", "2xl": "6" }}
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
            <Heading size="h4" my={3}>
              Trade discount for Artzero NFT staked
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Grid
              w="full"
              templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
              gap={6}
            >
              <Box
                w="full"
                textAlign="center"
                px={4}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full">
                  <Heading size="h5" mb={3} p={0}>
                    Stakers
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex align="center" justify="center" borderWidth={1}>
                        <Box
                          minH={{ base: "4.5rem", "2xl": "5rem" }}
                          py={{ base: "4", "2xl": "6" }}
                        >
                          <Heading size="h5" minW={"5rem"}>
                            {item.qty} NFTs
                          </Heading>
                        </Box>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>
              <Box
                w="full"
                textAlign="left"
                px={4}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading size="h5" mb={3}>
                    Trade discount
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <Fragment key={idx}>
                      <Flex borderWidth={1} w="full" pl={10}>
                        <Box minH={{ base: "4.5rem", "2xl": "5rem" }} mr={3}>
                          <Text
                            fontFamily="DS-Digital"
                            fontSize="5xl"
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
                          <Heading size="h6" color="#7AE7FF" mb="2">
                            Off
                          </Heading>
                          <Heading size="h6">Trade Fee</Heading>
                        </Flex>
                      </Flex>
                    </Fragment>
                  ))}
                </Flex>
              </Box>
            </Grid>
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
