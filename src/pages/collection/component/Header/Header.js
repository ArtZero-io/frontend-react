import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.png";
import SocialCard from "@components/Card/Social";

import { shortenNumber } from "@utils";
import { AnimatePresence, motion } from "framer-motion";
import { getCachedImageShort } from "@utils/index";
import { memo } from "react";

const overlay =
  "linear-gradient(0deg, #000000 3.25%, #000000 3.26%, rgba(0, 0, 0, 0) 100%)";

function CollectionHeader({
  avatarImage,
  name,
  description,
  website,
  twitter,
  discord,
  volume,
  floorPrice,
  totalListed,
  nft_count,
}) {
  return (
    <Box
      maxH={"34rem"}
      minH={{ base: "22rem", "2xl": "34rem" }}
      as="section"
      position="relative"
      // maxW="container.3xl"
      w="full"
      bg={overlay}
    >
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        pt={{ base: "12", "2xl": "3.75rem" }}
        pb={{ base: "4", "2xl": "18" }}
      >
        <VStack>
          <Center
            rounded="full"
            w={["80px", "120px", "120px"]}
            h={["80px", "120px", "120px"]}
            mt={-8}
            p="-px"
            border="4px solid"
            borderColor="whiteAlpha.900"
            filter="drop-shadow(0px 4px 4px #00320025)"
            bg="#333"
          >
            <Image
              alt={name}
              w="full"
              h="full"
              rounded="full"
              objectFit="cover"
              src={avatarImage && getCachedImageShort(avatarImage, 500)}
              fallback={
                <Skeleton
                  w={["80px", "120px", "120px"]}
                  h={["80px", "120px", "120px"]}
                  borderRadius="full"
                />
              }
            />
          </Center>

          <HStack
            w="full"
            justifyContent="space-around"
            py={{ base: "0.5rem", "2xl": "2.25rem" }}
          >
            {
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <VStack
                    textAlign="center"
                    justifyContent="space-between"
                    minH={{ base: "3.5rem", "2xl": "7.125rem" }}
                  >
                    <Heading
                      color="#fff"
                      fontSize={["32px", "48px", "48px"]}
                      lineHeight={["38px", "60px", "60px"]}
                      minH={{ base: "2.5rem", "2xl": "3.75rem" }}
                      // size="h2"
                      // minH="3.75rem"
                    >
                      {name}
                    </Heading>
                    <Text
                      w="full"
                      maxW="576px"
                      color="#fff"
                      fontSize={["15px", "18px", "18px"]}
                      minH={{ base: "1rem", "2xl": "3.375rem" }}
                    >
                      {description}
                    </Text>
                  </VStack>
                </motion.div>
              </AnimatePresence>
            }
          </HStack>

          <HStack
            flexWrap={["wrap", "noWrap", "noWrap"]}
            color="brand.blue"
            maxW="680px"
            maxH={["150px", "110px", "110px"]}
            h={["full", "full", "full"]}
            borderWidth={2}
            borderColor="brand.blue"
            px={{ base: 1, xl: 12, "2xl": 16 }}
            py={{ base: "0.5rem", "2xl": "1.125rem" }}
            justifyContent="space-between"
            bg="black"
          >
            {nft_count ? (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      {nft_count || 0}
                    </Text>
                    <Text fontSize={["13px", "16px", "16px"]}>Items</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text fontSize={["13px", "16px", "16px"]}>Items</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}

            <Divider
              transform="rotate(90deg)"
              width="300px"
              bg="#232323"
              display={{ base: "none", xl: "inline" }}
            />

            {totalListed ? (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      {totalListed || 0}
                    </Text>
                    <Text fontSize={["13px", "16px", "16px"]}>Listed</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text fontSize={["13px", "16px", "16px"]}>Listed</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}

            <Divider
              transform="rotate(90deg)"
              width="300px"
              bg="#232323"
              display={{ base: "none", xl: "inline" }}
            />

            {floorPrice ? (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {shortenNumber(floorPrice / 10 ** 12) || 0}
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h="19px"
                        w="19px"
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text fontSize={["13px", "16px", "16px"]}>Floor price</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        0
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h="19px"
                        w="19px"
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text fontSize={["13px", "16px", "16px"]}>Floor price</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}

            <Divider
              transform="rotate(90deg)"
              width="300px"
              bg="#232323"
              display={{ base: "none", xl: "inline" }}
            />

            {volume ? (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        {shortenNumber(volume) || 0}
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h="19px"
                        w="19px"
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text as="span" mt={0} fontSize={["13px", "16px", "16px"]}>
                      Vol traded
                      {/* <Text display={{ base: "none", xl: "inline" }}>
                        traded
                      </Text> */}
                    </Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "32px", "2xl": "48px" }}
                        lineHeight="none"
                      >
                        0
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h={"19px"}
                        w={"19px"}
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text as="span" mt={0} fontSize={["13px", "16px", "16px"]}>
                      Vol traded
                      {/* <Text display={{ base: "none", xl: "inline" }}>
                        Volume{" "}
                      </Text> */}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}
          </HStack>
        </VStack>
      </Box>

      <SocialCard
        justifyContent="center"
        profile={[{ website }, { twitter }, { discord }]}
        pos={{ base: "", xl: "absolute" }}
        right={"6.3125rem"}
        // bottom={{ base: "1.375rem", "2xl": "2.375rem" }}
        bottom="0"
      />
    </Box>
  );
}

export default memo(CollectionHeader);
