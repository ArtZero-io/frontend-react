/* eslint-disable no-unused-vars */
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
      maxH={{ sm: "753px", xl: "25rem", "2xl": "34rem" }}
      minH={{ sm: "625px", xl: "22rem", "2xl": "34rem" }}
      as="section"
      position="relative"
      w="full"
      h="625px"
      bg={overlay}
    >
      <Box
        h="full"
        mx="auto"
        px={{ base: "32px", xl: "6", "2xl": "8" }}
        pt={{ base: "56px", xl: "12", "2xl": "3.75rem" }}
        pb={{ base: "4", "2xl": "18" }}
      >
        <VStack h="full">
          <Center
            rounded="full"
            w={["68px", "120px", "120px"]}
            h={["68px", "120px", "120px"]}
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
                  w={["74px", "120px", "120px"]}
                  h={["60px", "112px", "112px"]}
                  borderRadius="full"
                />
              }
            />
          </Center>

          <HStack
            w="full"
            justifyContent="space-around"
            pt={{ base: "4px", xl: "0.5rem", "2xl": "2.25rem" }}
            pb={{ base: "34px", xl: "0.5rem", "2xl": "2.25rem" }}
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
                      noOfLines={[2, 2]}
                      fontSize={["32px", "48px", "48px"]}
                      lineHeight={["46px", "60px", "60px"]}
                      minH={{ base: "2.5rem", "2xl": "3.75rem" }}
                    >
                      {name}
                    </Heading>
                    <Text
                      w="full"
                      maxW="576px"
                      color="#fff"
                      fontSize={["15px", "18px", "18px"]}
                      minH={{ base: "1rem", "2xl": "3.375rem" }}
                      lineHeight={{ base: "24px", xl: "28px" }}
                      noOfLines={[3, 3]}
                    >
                      {description}
                    </Text>
                  </VStack>
                </motion.div>
              </AnimatePresence>
            }
          </HStack>

          <HStack
            overflow="hidden"
            flexWrap={["wrap", "noWrap", "noWrap"]}
            color="brand.blue"
            maxW={["280px", "680px", "680px"]}
            maxH={["200px", "110px", "110px"]}
            h={["full", "full", "full"]}
            borderWidth={2}
            borderColor="brand.blue"
            px={{ base: "0px", xl: 12, "2xl": 16 }}
            py={{ base: "0.5rem", "2xl": "1.125rem" }}
            justifyContent="space-between"
            bg="black"
            mb="60px"
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
                      fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      {nft_count || 0}
                    </Text>
                    <Text fontSize={["14px", "16px", "16px"]}>Items</Text>
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
                      fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text fontSize={["14px", "16px", "16px"]}>Items</Text>
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
                      fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      {totalListed || 0}
                    </Text>
                    <Text fontSize={["14px", "16px", "16px"]}>Listed</Text>
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
                      fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text fontSize={["14px", "16px", "16px"]}>Listed</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}

            <Divider
              width="300px"
              bg="#232323"
              transform="rotate(90deg)"
              display={{ base: "none", xl: "inline" }}
            />

            {/* // mobile + line */}
            <Divider
              style={{ margin: 0 }}
              width="300px"
              bg="#232323"
              transform="rotate(180deg) translateY(-10px) translateX(0px)"
              display={{ base: "inline", md: "none" }}
            />
            <Divider
              width="267px"
              bg="#232323"
              transform="rotate(90deg) translateY(5px)"
              display={{ base: "inline", md: "none" }}
            />
            {/* // End mobile + line */}

            {floorPrice ? (
              <VStack textAlign="center" px={3} w={["45%", "full", "full"]}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ minWidth: "65px" }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
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
                    <Text fontSize={["14px", "16px", "16px"]}>Floor price</Text>
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
                    style={{ minWidth: "65px" }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
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
                    <Text fontSize={["14px", "16px", "16px"]}>Floor price</Text>
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
                    style={{ minWidth: "65px" }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
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
                    style={{ minWidth: "65px" }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "40px", xl: "32px", "2xl": "48px" }}
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

          <SocialCard
            justifyContent="center"
            profile={[{ website }, { twitter }, { discord }]}
            pos={{ base: "", xl: "absolute" }}
            right={"6.3125rem"}
            // bottom={{ base: "1.375rem", "2xl": "2.375rem" }}
            bottom="0"
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default memo(CollectionHeader);
