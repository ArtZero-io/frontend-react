import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
  Square,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { IPFS_BASE_URL } from "@constants/index";
import process from "process";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function NFTChangeSizeCard({
  bidPrice,
  is_for_sale,
  price,
  avatar,
  nftName,
  bigCard,
  highest_bid,
}) {
  console.log(" highest_bid", highest_bid);
  const getNFTImage = (imageHash, size) => {
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
  };

  return (
    <Box
      h="full"
      borderColor="transparent"
      borderWidth={"2px"}
      _hover={{ borderColor: "brand.blue" }}
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        minH="25rem"
      >
        <Square
          w={bigCard ? "405.5px" : "317.6px"}
          h={bigCard ? "25rem" : "20rem"}
          bg="#372648"
        >
          <Image
            borderWidth={"2px"}
            borderColor="transparent"
            bg="#372648"
            alt={nftName}
            objectFit="cover"
            src={getNFTImage(avatar, 500)}
            h="full"
            w="full"
            fallback={
              <Skeleton
                w={bigCard ? "405.5px" : "317.6px"}
                h={bigCard ? "25rem" : "20rem"}
              />
            }
          />
        </Square>
        <VStack
          p={4}
          w="full"
          justifyContent="space-between"
          alignItems="start"
          flexGrow="1"
          minH="8.125rem"
        >
          <Heading size="h6">{nftName}</Heading>

          {is_for_sale ? (
            <Flex w="full">
              <Tag h={10}>
                <TagLabel>{price / 10 ** 12}</TagLabel>
                <TagRightIcon as={AzeroIcon} />
              </Tag>

              <Spacer />

              <Flex w="full">
                <Spacer />
                <Flex
                  align="center"
                  textAlign="right"
                  color="brand.grayLight"
                  mt="5"
                >
                  {/* <Text mr="1">Highest Offer</Text> */}
                  {highest_bid ? (
                    <Tag h={10} bg="transparent">
                      <TagLabel bg="transparent">
                        Highest Offer {highest_bid / 10 ** 12}
                      </TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                  ) : (
                    <>
                      <Tag h={10} bg="transparent">
                        <TagLabel bg="transparent" color='brand.grayLight'>No offer yet </TagLabel>
                      </Tag>
                    </>
                  )}
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <Text textAlign="center" fontSize="lg">
              Not for sale
            </Text>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
