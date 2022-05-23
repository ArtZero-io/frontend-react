import {
  Avatar,
  Box,
  Center,
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
// import BN from "bn.js";

// import { IPFS_BASE_URL } from "@constants/index";
import { shortenNumber } from "@utils";
// import process from "process";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCachedImageShort } from "@utils/index";
// const baseURL = process.env.REACT_APP_API_BASE_URL;
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
  loading,
  nft_count,
}) {
  // const getCollectionImage = (imageHash, size) => {
  //   if (imageHash) {
  //     const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
  //     return (
  //       baseURL +
  //       "/getImage?input=" +
  //       imageHash +
  //       "&size=" +
  //       size +
  //       "&url=" +
  //       callbackUrl
  //     );
  //   } else {
  //     return "";
  //   }
  // };
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
            w="7.5rem"
            h="7.5rem"
            mt={-8}
            p="-px"
            border="4px solid"
            borderColor="whiteAlpha.900"
            filter="drop-shadow(0px 4px 4px #00320025)"
          >
            <Image
              alt={name}
              w="full"
              h="full"
              rounded="full"
              objectFit="cover"
              src={avatarImage && getCachedImageShort(avatarImage, 500)}
              fallback={
                <Skeleton w={"7.5rem"} h={"7.5rem"} borderRadius="full" />
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
                      fontSize={{ base: "2rem", "2xl": "3rem" }}
                      minH={{ base: "2.5rem", "2xl": "3.75rem" }}
                      // size="h2"
                      // minH="3.75rem"
                    >
                      {name}
                    </Heading>
                    <Text
                      maxW="md"
                      color="#fff"
                      fontSize={"lg"}
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
            color="brand.blue"
            // minW="container.md"
            minW={{ base: "auto", xl: "auto", "2xl": "container.md" }}
            borderWidth={2}
            borderColor="brand.blue"
            px={{ base: 1, xl: 12, "2xl": 16 }}
            py={{ base: "0.5rem", "2xl": "1.125rem" }}
            justifyContent="space-between"
            bg="black"
            minH={{ base: "5.75rem", "2xl": "7.75rem" }}
          >
            {nft_count ? (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "4xl", "2xl": "6xl" }}
                      lineHeight="none"
                    >
                      {nft_count || 0}
                    </Text>
                    <Text>Items</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "4xl", "2xl": "6xl" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text>Items</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}
            {totalListed ? (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "4xl", "2xl": "6xl" }}
                      lineHeight="none"
                    >
                      {totalListed || 0}
                    </Text>
                    <Text>Listed</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize={{ base: "4xl", "2xl": "6xl" }}
                      lineHeight="none"
                    >
                      0
                    </Text>
                    <Text>Listed</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}
            {floorPrice ? (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "4xl", "2xl": "6xl" }}
                        lineHeight="none"
                      >
                        {shortenNumber(floorPrice / 10 ** 12) || 0}
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h={7}
                        w={7}
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text>Floor price</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "4xl", "2xl": "6xl" }}
                        lineHeight="none"
                      >
                        0
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h={7}
                        w={7}
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text>Floor price</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}

            {volume ? (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "4xl", "2xl": "6xl" }}
                        lineHeight="none"
                      >
                        {shortenNumber(volume) || 0}
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h={7}
                        w={7}
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text as="span" mt={0}>
                      Volume{" "}
                      <Text display={{ base: "none", xl: "inline" }}>
                        traded
                      </Text>
                    </Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center" px={3}>
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize={{ base: "4xl", "2xl": "6xl" }}
                        lineHeight="none"
                      >
                        0
                      </Text>
                      <Avatar
                        src={AzeroIcon}
                        h={"1.75rem"}
                        w={"1.75rem"}
                        ml={3}
                        name="AzeroLogo"
                        bg="transparent"
                      />
                    </Flex>
                    <Text as="span" mt={0}>
                      Volume{" "}
                      <Text display={{ base: "none", xl: "inline" }}>
                        traded
                      </Text>
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
        bottom={{ base: "1.375rem", "2xl": "2.375rem" }}
      />
    </Box>
  );
}

export default CollectionHeader;
