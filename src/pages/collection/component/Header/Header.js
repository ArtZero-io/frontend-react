import {
  Avatar,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.png";
import SocialCard from "@components/Card/Social";

import { shortenNumber } from "@utils";
import { getCachedImageShort } from "@utils/index";
import { memo } from "react";
import { useState } from "react";

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
  royalFee,
}) {
  const [isSeeMore, setIsSeeMore] = useState(false);

  return (
    <Box
      w="full"
      bg={overlay}
      as="section"
      position="relative"
      minH={{ sm: "625px", md: "34rem" }}
    >
      <Box
        h="full"
        mx="auto"
        px={{ base: "32px", md: "8" }}
        pb={{ base: "36px", md: "90px" }}
        pt={{ base: "56px", md: "120px" }}
      >
        <VStack h="full">
          <Center
            rounded="full"
            w={["68px", "128px"]}
            h={["68px", "128px"]}
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
                  w={["74px", "128px"]}
                  h={["60px", "120px"]}
                  borderRadius="full"
                />
              }
            />
          </Center>

          <HStack
            w="full"
            pt={["4px", "28px"]}
            pb={["8px", "14px"]}
            justifyContent="center"
          >
            <Skeleton w="full" maxW="680px" isLoaded={name?.length}>
              <VStack
                textAlign="center"
                justifyContent="space-between"
                minH={"60px"}
              >
                <Heading
                  px="4px"
                  color="#fff"
                  noOfLines={[2, 2]}
                  fontSize={["32px", "48px"]}
                  lineHeight={["46px", "60px"]}
                >
                  {name}
                </Heading>
              </VStack>
            </Skeleton>
          </HStack>

          <Skeleton
            display="flex"
            justifyContent="center"
            w="full"
            maxW="680px"
            isLoaded={name?.length}
          >
            <Flex
              paddingBottom="24px"
              w="full"
              maxW="576px"
              textAlign="center"
              position="relative"
              minH={["48px", "54px"]}
              justifyContent="center"
              fontSize={["16px", "18px"]}
            >
              <Text noOfLines={[isSeeMore ? 999 : 2]}>{description}</Text>

              <Flex
                w="full"
                bottom="0"
                right="0"
                minW="75px"
                px="2px"
                cursor="pointer"
                color="#7ae7ff"
                zIndex="docked"
                position="absolute"
                justifyContent="center"
                onClick={() => setIsSeeMore(!isSeeMore)}
                display={description?.length > 160 ? "flex" : "none"}
              >
                {isSeeMore ? "See less" : "Show more"}
              </Flex>
            </Flex>
          </Skeleton>

          <HStack>
            <Flex
              mt="16px"
              mb="32px"
              p="6px 20px"
              bg="black"
              alignItems="center"
              border="1px solid white"
            >
              <Text>Royal fee: {royalFee / 100}%</Text>
            </Flex>
          </HStack>

          <Container
            mt="32px"
            px="0"
            w="full"
            my="auto"
            bg="black"
            color="#7ae7ff"
            border="2px solid #7ae7ff"
            maxW={["280px", "680px"]}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }}>
              <Flex
                minH={["100px", "110px"]}
                justify="center"
                position="relative"
                direction="column"
                alignItems="center"
              >
                <Text fontSize={["34px", "40px"]}>{nft_count || 0}</Text>
                <Text fontSize={["14px", "16px"]}>Items</Text>
                <Divider
                  w="0"
                  h={["100px", "50px"]}
                  right="0"
                  bg="#232323"
                  position="absolute"
                  orientation="vertical"
                />
              </Flex>

              <Flex
                minH={["100px", "110px"]}
                justify="center"
                position="relative"
                direction="column"
                alignItems="center"
              >
                <Text fontSize={["34px", "40px"]}>{totalListed || 0}</Text>
                <Text fontSize={["14px", "16px"]}>Items</Text>
                <Divider
                  w="0"
                  h="50px"
                  right="0"
                  bg="#232323"
                  position="absolute"
                  orientation="vertical"
                  display={["none", "flex"]}
                />
              </Flex>

              <Flex
                minH={["100px", "110px"]}
                justify="center"
                position="relative"
                direction="column"
                alignItems="center"
              >
                <Divider
                  w="276px"
                  h="1px"
                  top="0"
                  left="0"
                  bg="#232323"
                  position="absolute"
                  display={["flex", "none"]}
                />
                <Flex alignItems="center" justifyContent="center">
                  <Text fontSize={["34px", "40px"]}>
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
                <Text fontSize={["14px", "16px"]}>Floor price</Text>
                <Divider
                  w="0"
                  h={["100px", "50px"]}
                  right="0"
                  bg="#232323"
                  position="absolute"
                  orientation="vertical"
                />
              </Flex>

              <Flex
                minH={["100px", "110px"]}
                justify="center"
                direction="column"
                alignItems="center"
              >
                <Flex alignItems="center" justifyContent="center">
                  <Text fontSize={["34px", "40px"]}>
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
                <Text fontSize={["14px", "16px"]}>Volume traded</Text>
              </Flex>
            </SimpleGrid>
          </Container>

          <SocialCard
            bottom="0"
            right="100px"
            justifyContent="center"
            pos={{ base: "", xl: "absolute" }}
            profile={[{ website }, { twitter }, { discord }]}
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default memo(CollectionHeader);
