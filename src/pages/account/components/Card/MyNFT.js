import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  Square,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import { IPFS_BASE_URL } from "@constants/index";

const MyNFTCard = ({
  is_for_sale,
  price,
  avatar,
  nftName,
  isStaked = false,
  isBid,
}) => {
  return (
    <Box
      minW="14.25rem"
      borderWidth={"2px"}
      borderColor="transparent"
      _hover={{ borderColor: "brand.blue" }}
      h="full"
    >
      <Flex
        minW={56}
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        h="full"
      >
        <Square minW={56} bg="#372648">
          <Image
            alt={nftName}
            h="full"
            w="full"
            objectFit="cover"
            src={`${IPFS_BASE_URL}/${avatar}`}
            fallback={<Skeleton w="full" h="full" minH={56} minW={56} />}
          />
        </Square>

        <Box w="full" p={3}>
          <Heading mb={3} size="h6" textAlign="left">
            {nftName}
          </Heading>
          {isStaked && (
            <Flex align="center" justify="start" w="full">
              <Button variant="outline">
                {isStaked ? "UnStake" : "Stake"}
              </Button>
            </Flex>
          )}

          {(is_for_sale || isBid) && (
            <Flex align="center" justify="start" w="full">
              <VStack align="start">
                <Text ml={1} color="brand.grayLight">
                  {is_for_sale && "For sale at"}
                  {isBid?.status && "My offer"}
                </Text>
                <Tag>
                  <TagLabel>
                    {price}
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
