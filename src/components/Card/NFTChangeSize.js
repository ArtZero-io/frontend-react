import {
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

export default function NFTChangeSize(props) {
  console.log("props MyNFTCard", props);

  const { name, askPrice, bidPrice, img } = props;
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
          alt={img}
          objectFit="cover"
          src={img}
          minH={18}
          fallbackSrc="https://via.placeholder.com/480"
        />

        <VStack
          p={4}
          w="full"
          justifyContent="space-between"
          alignItems="start"
          flexGrow="1"
        >
          <Heading size="h6">{name}</Heading>

          <Flex w="full">
            <Tag h={10}>
              <TagLabel>{askPrice}</TagLabel>
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
        </VStack>
      </Flex>
    </Box>
  );
}
