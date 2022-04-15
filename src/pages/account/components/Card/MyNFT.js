import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Square,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";

const MyNFTCard = (props) => {
  console.log('props MyNFTCard Account', props)
  const { name, img, isListed, isBid, isStaked } = props;
  return (
    <Box minW="14.25rem" _hover={{ bg: "brand.blue" }} p="px">
      <Flex
        minW={56}
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
      >
        <Square minW={56}>
          <Image
            alt={img}
            h="full"
            w="full"
            objectFit="cover"
            src={img}
            fallbackSrc="https://via.placeholder.com/400x400"
          />
        </Square>

        <Box w="full" p={3}>
          <Heading mb={3} size="h6" textAlign="left">
            {name}
          </Heading>
          {isStaked && (
            <Flex align="center" justify="start" w="full">
              <Button variant="outline">
                {isStaked?.status ? "UnStake" : "Stake"}
              </Button>
            </Flex>
          )}

          {(isListed?.status || isBid) && (
            <Flex align="center" justify="start" w="full">
              <VStack align="start">
                <Text ml={1} color="brand.grayLight">
                  {isListed?.status && "For sale at"}
                  {isBid?.status && "My offer"}
                </Text>
                <Tag>
                  <TagLabel>
                    {isListed?.askPrice}
                    {isBid?.bidPrice}
                  </TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>
              </VStack>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
export default MyNFTCard;
