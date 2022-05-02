import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import { IPFS_BASE_URL } from "@constants/index";
import { getCachedImage } from "@utils";

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
      h="full"
      w="full"
      mx="auto"
      maxW="14rem"
      borderColor="transparent"
      borderWidth={"2px"}
      _hover={{ borderColor: "brand.blue" }}
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        h="full"
        shadow="lg"
      >
        <Image
          alt={nftName}
          w="full"
          h={"14rem"}
          objectFit="cover"
          src={
            avatar
              ? getCachedImage(
                  avatar,
                  500,
                  IPFS_BASE_URL + "/" + avatar.replace("ipfs://", "")
                )
              : ""
          }
          fallback={<Skeleton w="full" h="full" minH={56} minW={56} />}
        />

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
                    {price / 10 ** 12}
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
