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
import { useState } from "react";

export default function NFTChangeSize({
  bidPrice,
  is_for_sale,
  price,
  avatar,
  nftName,
}) {
  return (
    <Box>
      <Flex
        m="0.5"
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        minH="25rem"
      >
        <Image
          alt={nftName}
          objectFit="cover"
          src={`${IPFS_BASE_URL}/${avatar}`}
          minH="21rem"
          // fallbackSrc="https://via.placeholder.com/720"
          fallback={<Skeleton w="full" h="full" minH={"20rem"} />}
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
