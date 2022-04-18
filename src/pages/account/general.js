import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack,
  TagRightIcon,
  Input,
  useClipboard,
  Square,
  Image,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import ImageAccountBanner from "@theme/assets/image-account-banner.png";
import * as ROUTES from "@constants/routes";
import { useHistory } from "react-router-dom";
import FeeInfoModal from "./components/Modal/FeeInfo";

function GeneralPage() {
  const { activeAddress } = useSelector((s) => s.account);
  const { hasCopied, onCopy } = useClipboard(activeAddress);
  const history = useHistory();

  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <VStack as="section" w="full">
          <Box w="full" textAlign="left" mb={6}>
            <Heading size="h2">DASHBOARD</Heading>

            <Flex alignItems="center">
              <Button
                variant="outline"
                onClick={onCopy}
                borderWidth={1}
                borderColor="#7AE7FF"
                p={2}
                my={3}
                mr={3}
                h={9}
              >
                <Text fontFamily="Oswald">{activeAddress}</Text>
                <Input
                  display="none"
                  defaultValue={activeAddress}
                  px={2}
                  h={8}
                  mx={0}
                  minW={"sm"}
                  readOnly={true}
                  cursor="pointer"
                  color="brand.blue"
                  borderWidth={1}
                  borderColor="brand.blue"
                />
              </Button>
              {hasCopied ? (
                <Tag variant="outline">
                  <TagLabel>Copied</TagLabel>
                </Tag>
              ) : (
                ""
              )}
              <Spacer />
            </Flex>
          </Box>

          <Grid
            w="full"
            templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
            gap={6}
          >
            {dashboardInfo.map((item, idx) => {
              return (
                <GridItem
                  key={idx}
                  id="abc"
                  w="100%"
                  h="100%"
                  _hover={{ bg: "brand.blue" }}
                >
                  <Box
                    w="full"
                    textAlign="left"
                    bg="brand.grayDark"
                    px={4}
                    py={3}
                    fontSize="lg"
                  >
                    <Flex w="full">
                      <Text>
                        <Text>{item.name}</Text>
                        <Flex alignItems="center">
                          <Tag bg="transparent" pl={0}>
                            <TagLabel
                              bg="transparent"
                              fontSize="5xl"
                              fontFamily="DS-Digital"
                            >
                              {item.value}
                            </TagLabel>
                            {item.name === "Amount Trades" && (
                              <TagRightIcon fontSize="2xl" as={AzeroIcon} />
                            )}
                          </Tag>
                        </Flex>
                      </Text>
                      <Spacer />
                    </Flex>
                    <Flex w="full" textAlign="left">
                      <Spacer />
                      {/* <Text color="brand.blue"> $ {item.text1}</Text> */}
                    </Flex>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </VStack>

        <HStack
          h="full"
          my={10}
          p={7}
          maxW="container.xl"
          bg="black"
          pos="relative"
        >
          <Square size="20rem" bg="#222">
            <Image w="full" h="full" src={ImageAccountBanner} />
          </Square>

          <VStack h={72} px={10} textAlign="left">
            <Flex w="full">
              <Box fontFamily="Evogria Italic" fontSize="3xl-mid" color="#FFF">
                <span>Stake your </span>
                <span style={{ color: "#7AE7FF" }}>
                  Praying Mantis Predator
                </span>
                <div />
                <span>to reduce your </span>
                <span style={{ color: "#7AE7FF" }}>fees</span>
              </Box>
              <Spacer />
              <Box
                variant="outline"
                h={32}
                w={36}
                pos="absolute"
                top={10}
                right={10}
              >
                <Tag variant="outline" h={6} w={40} mt={3}>
                  <TagLabel>Market Fees: 3.0%</TagLabel>
                </Tag>
                <Tag variant="outline" h={6} w={40} mt={3}>
                  <TagLabel>Discount Fees: 2.1%</TagLabel>
                </Tag>
              </Box>
            </Flex>

            <Flex w="full">
              <Text mt={0} mb={8} fontSize="lg" color="#fff">
                You currently have{" "}
                <span style={{ color: "#7AE7FF" }}>0 NFTs </span>
                staked.
              </Text>
              <Spacer />
            </Flex>

            <Flex w="full" alignItems="center">
              <Button
                variant="solid"
                onClick={() => history.push(ROUTES.ACCOUNT_MY_STAKES)}
              >
                Stake now
              </Button>

              <FeeInfoModal />
            </Flex>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default GeneralPage;

const dashboardInfo = [
  { name: "Owned NFTs", text1: "82.00", value: "99" },
  { name: "Amount Trades", text1: "82.00", value: "143" },
  { name: "Ratio Purchase/Sell", text1: "82.00", value: "30%" },
  { name: "NFTs for sale", text1: "82.00", value: "56" },
  { name: "NFTs offers placed", text1: "82.00", value: "45" },
  { name: "NFTs offers received", text1: "82.00", value: "38" },
];
