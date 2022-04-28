/* eslint-disable no-unused-vars */
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
import {shortenNumber} from "@utils";

const overlay =
  "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0) 100%)";

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
  totalListed
}) {
  return (
    <Box
      maxH={"34rem"}
      minH={"34rem"}
      as="section"
      position="relative"
      maxW="container.3xl"
      px={5}
      bg={overlay}
    >
      <Box
        mx="auto"
        px={{ base: "6", "2xl": "8" }}
        pt={{ base: "12", "2xl": "6" }}
        pb={{ base: "12", "2xl": "18" }}
      >
        <VStack>
          <Center
            rounded="full"
            w={40}
            h={40}
            mt={-8}
            p="-px"
            border="4px solid"
            borderColor="whiteAlpha.900"
          >
            <Image
              alt={name}
              w="full"
              h="full"
              rounded="full"
              objectFit="cover"
              src={avatarImage && `${IPFS_BASE_URL}/${avatarImage}`}
              fallback={<Skeleton w={40} h={40} borderRadius="full" />}
            />
          </Center>

          <HStack w="full" justifyContent="space-around" py={9} pos="relative">
            <VStack textAlign="center" justifyContent="space-between">
              <Heading size="h2">{name}</Heading>

              <Text maxW="md" color="#fff">
                {description}
              </Text>
            </VStack>

            <SocialCard
              profile={[{ website }, { twitter }, { discord }]}
              pos={"absolute"}
              right={"3rem"}
              top={"50%"}
            />
          </HStack>

          <HStack
            color="brand.blue"
            minW="container.md"
            borderWidth={1}
            borderColor="brand.grayDark"
            px="16"
            py="5"
            justifyContent="space-between"
          >
            <VStack textAlign="center">
              <Text fontFamily="DS-Digital" fontSize="6xl" lineHeight="none">
                {nftTotalCount || 0}
              </Text>
              <Text>Items</Text>
            </VStack>

            <VStack textAlign="center">
              <Text fontFamily="DS-Digital" fontSize="6xl" lineHeight="none">
                {totalListed || 0}
              </Text>
              <Text>Listed</Text>
            </VStack>

            <VStack textAlign="center">
              <Flex alignItems="center" justifyContent="center">
                <Text fontFamily="DS-Digital" fontSize="6xl" lineHeight="none">
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
              <Text>Floor price</Text>
            </VStack>

            <VStack textAlign="center">
              <Flex alignItems="center" justifyContent="center">
                <Text fontFamily="DS-Digital" fontSize="6xl" lineHeight="none">
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
              <Text mt={0}>Volume traded</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default CollectionHeader;
