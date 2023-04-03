import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import SocialCard from "@components/Card/Social";

import { shortenNumber } from "@utils";
import { memo, useRef } from "react";
import { useState } from "react";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import AddressCopier from "@components/AddressCopier/AddressCopier";

const overlay =
  "linear-gradient(0deg, #000000 3.25%, #000000 3.26%, rgba(0, 0, 0, 0) 100%)";

function CollectionHeader(props) {
  // console.log("props", props?.name);
  const {
    avatarImage,
    name,
    description,
    website,
    twitter,
    discord,
    telegram,
    volume,
    floorPrice,
    totalListed,
    nft_count,
    royaltyFee,
    isDoxxed,
    isDuplicationChecked,
    nftContractAddress,
    ...rest
  } = props;

  console.log("rest", rest);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const descLength = useBreakpointValue([115, 175]);

  const headerRef = useRef(name);
  const descriptionRef = useRef(description);

  if (name !== undefined && headerRef.current !== name) {
    headerRef.current = name;
  }

  if (description !== undefined && descriptionRef.current !== description) {
    descriptionRef.current = description;
  }

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
        pb={{ base: "36px", md: "30px" }}
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
            <ImageCloudFlare
              size="500"
              borderRadius="full"
              h={["60px", "120px", "120px"]}
              w={["60px", "120px", "120px"]}
              src={avatarImage}
            />
          </Center>

          <HStack spacing="10px" pt="10px">
            {isDoxxed && (
              <Tooltip label="At least one of the team members’ identity is verified.">
                <Box p="1">
                  <Tag border="1px solid #7ae7ff">DOXXED</Tag>
                </Box>
              </Tooltip>
            )}

            {isDuplicationChecked && (
              <Tooltip label="Artwork is verified by third-party for its uniqueness">
                <Box p="1">
                  <Tag border="1px solid #7ae7ff">AUTHENTIC</Tag>
                </Box>
              </Tooltip>
            )}
          </HStack>

          <HStack
            w="full"
            pt={["4px", "28px"]}
            pb={["8px", "14px"]}
            justifyContent="center"
          >
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
                {headerRef.current}
              </Heading>
            </VStack>
          </HStack>

          <HStack>
            <Text>Contract Address:</Text>{" "}
            <AddressCopier address={nftContractAddress} hasIcon={true} />
          </HStack>

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
            <Text noOfLines={[isSeeMore ? 999 : 2]}>
              {descriptionRef.current}
            </Text>

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
              textDecoration="underline"
              onClick={() => setIsSeeMore(!isSeeMore)}
              display={description?.length > descLength ? "flex" : "none"}
            >
              {isSeeMore ? "See less" : "Show more"}
            </Flex>
          </Flex>

          <HStack>
            <Flex
              mt="16px"
              mb="32px"
              p="6px 20px"
              bg="black"
              alignItems="center"
              border="1px solid white"
            >
              <Text>Royalty fee: {royaltyFee / 100}%</Text>
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
                <Text fontSize={["14px", "16px"]}>Listed</Text>
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

                  <AzeroIcon ml="6px" w="20px" />
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
                  <AzeroIcon ml="6px" w="20px" />
                </Flex>
                <Text fontSize={["14px", "16px"]}>Volume traded</Text>
              </Flex>
            </SimpleGrid>
          </Container>

          <SocialCard
            justifyContent="center"
            profile={[{ website }, { twitter }, { discord }, { telegram }]}
          />
        </VStack>
      </Box>
    </Box>
  );
}

export default memo(CollectionHeader);
