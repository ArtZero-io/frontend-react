import { Box, Flex, Heading, Image, Skeleton, Square } from "@chakra-ui/react";
import React from "react";
import { getCachedImageShort } from "@utils";

function MyLaunchPadNFTCard({ avatar, nftName }) {
  return (
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      bg="brand.grayDark"
      h="full"
      w="full"
      maxW="250px"
      minH="320px"
      mb="30px"
    >
      <Square h="250px" w="250px">
        <Image
          alt={"nftName"}
          w="full"
          h="full"
          objectFit="cover"
          src={getCachedImageShort(avatar, 500)}
          fallback={<Skeleton w="250px" h="250px" />}
        />
      </Square>
      <Box w="full" px="4px" pt="20px">
        <Heading fontSize={["15px", "16px", "16px"]} textAlign="left" mb="5px">
          {nftName}
        </Heading>
      </Box>
    </Flex>
  );
}
export default MyLaunchPadNFTCard;
