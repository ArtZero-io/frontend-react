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
  nft_name,
  askPrice,
  bidPrice,
  is_for_sale,
  price,
  attributes,
  attributesValue,
}) {
  const getDataFromAttrs = function () {
    console.log(attributes);
    console.log(attributesValue);
    if (attributes && attributesValue) {
      return Object.assign(
        ...attributes.map((v, i) => ({ [v]: attributesValue[i] }))
      );
    }

    return console.log("Can not create attributes Object");
  };
  const attrsObject = getDataFromAttrs();

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
          alt={nft_name}
          objectFit="cover"
          src={`${IPFS_BASE_URL}/${attrsObject?.avatar}`}
          minH={18}
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
          <Heading size="h6">{attrsObject.nft_name}</Heading>

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
