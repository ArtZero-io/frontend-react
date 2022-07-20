import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Square,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IPFS_BASE_URL } from "@constants/index";

export const TeamCard = ({team_member}) => {
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
          src={`${IPFS_BASE_URL}/${team_member.avatar}`}
          fallback={<Skeleton w="250px" h="250px" />}
        />
      </Square>
      <Box w="full" px="16px" pt="20px">
        <Heading
          fontSize={["15px", "16px", "17px"]}
          textAlign="center"
          mb="5px"
        >
          {team_member.name}{" "}
        </Heading>
        <Text as="span" color="#888">
          {team_member.title}{" "}
        </Text>
      </Box>
    </Flex>
  );
};
