/* eslint-disable no-unused-vars */
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
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { IPFS_BASE_URL } from "@constants/index";

export default function NFTChangeSize({
  bidPrice,
  is_for_sale,
  price,
  avatar,
  nftName,
}) {
  return (
    <Box
      h="full"
      borderColor="transparent"
      borderWidth={"2px"}
      _hover={{ borderColor: "brand.blue" }}
    >
      <Flex
        m="0.5"
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        minH="25rem"
      >
        <Image
          bg="#372648"
          alt={nftName}
          objectFit="cover"
          src={`${IPFS_BASE_URL}/${avatar}`}
          minH="21rem"
          fallback={<Skeleton w="full" h="full" minH={"21rem"} />}
        />

        <VStack
          p={4}
          w="full"
          justifyContent="space-between"
          alignItems="start"
          flexGrow="1"
        >
          <Heading size="h6">{nftName}</Heading>

          {is_for_sale && (
            <Flex w="full">
              <Tag h={10}>
                <TagLabel>{price}</TagLabel>
                <TagRightIcon as={AzeroIcon} />
              </Tag>

              <Spacer />

              <Flex w="full">
                <Spacer />
                <Text textAlign="right" color="brand.grayLight" mt="5">
                  <Text mr="2.5">Offer</Text>
                  <Tag h={10} bg="transparent">
                    <TagLabel bg="transparent">{bidPrice}</TagLabel>
                    <TagRightIcon as={AzeroIcon} />
                  </Tag>
                </Text>
              </Flex>
            </Flex>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}
