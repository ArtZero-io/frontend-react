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

import { IPFS_BASE_URL } from "@constants/index";
import { shortenNumber } from "@utils";
import process from "process";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
const baseURL = process.env.REACT_APP_API_BASE_URL;

// eslint-disable-next-line no-unused-vars
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
  nftTotalCount,
  totalListed,
  headerImage,
  loading,
}) {
  const getCollectionImage = (imageHash, size) => {
    if (imageHash) {
      const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
      return (
        baseURL +
        "/getImage?input=" +
        imageHash +
        "&size=" +
        size +
        "&url=" +
        callbackUrl
      );
    } else {
      return "";
    }
  };

  return (
    <Box
      maxH={"34rem"}
      minH={"34rem"}
      as="section"
      position="relative"
      maxW="container.3xl"
      bg={overlay}
    >
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        pt={{ base: "12", "2xl": "3.75rem" }}
        pb={{ base: "12", "2xl": "18" }}
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
              src={getCollectionImage(avatarImage, 500)}
              fallback={
                <Skeleton w={"7.5rem"} h={"7.5rem"} borderRadius="full" />
              }
            />
          </Center>
          <HStack w="full" justifyContent="space-around" py={9}>
            <VStack
              textAlign="center"
              justifyContent="space-between"
              minH="7.125rem"
            >
              {name && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Heading size="h2" minH="3.75rem">
                      {name}
                    </Heading>
                    <Text
                      maxW="md"
                      color="#fff"
                      fontSize={"lg"}
                      minH="3.375rem"
                    >
                      {description}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              )}
            </VStack>
          </HStack>

          <HStack
            color="brand.blue"
            minW="container.md"
            borderWidth={2}
            borderColor="brand.blue"
            px="16"
            py="1.125rem"
            justifyContent="space-between"
            bg="black"
            minH="7.75rem"
          >
            {nftTotalCount ? (
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize="6xl"
                      lineHeight="none"
                    >
                      {nftTotalCount || 0}
                    </Text>
                    <Text>Items</Text>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize="6xl"
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
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize="6xl"
                      lineHeight="none"
                    >
                      {totalListed || 0}
                    </Text>
                    <Text>Listed</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Text
                      fontFamily="DS-Digital"
                      fontSize="6xl"
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
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize="6xl"
                        lineHeight="none"
                      >
                        {floorPrice / 10 ** 12 || 0}
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
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize="6xl"
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
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize="6xl"
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
                    <Text mt={0}>Volume traded</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            ) : (
              <VStack textAlign="center">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Text
                        fontFamily="DS-Digital"
                        fontSize="6xl"
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
                    <Text mt={0}>Volume traded</Text>{" "}
                  </motion.div>
                </AnimatePresence>
              </VStack>
            )}
          </HStack>
        </VStack>
      </Box>

      <SocialCard
        profile={[{ website }, { twitter }, { discord }]}
        pos="absolute"
        right={"6.3125rem"}
        bottom={"2.375rem"}
      />
    </Box>
  );
}

export default React.memo(CollectionHeader);
