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

export const TeamCard = () => {
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
          src="https://api.artzero.io/getImage?input=ipfs://QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png&size=500&url=https://ipfs.infura.io/ipfs/QmdFprEsYt3yDkPrgqCqzZBdGD3ScVUUU9gwPnXRZD6KpN/49.png"
          fallback={<Skeleton w="250px" h="250px" />}
        />
      </Square>
      <Box w="full" px="16px" pt="20px">
        <Heading
          fontSize={["15px", "16px", "17px"]}
          textAlign="center"
          mb="5px"
        >
          Berk Kadir Sert{" "}
        </Heading>
        <Text as="span" color="#888">
          Ceo Founder / Interior Architecture{" "}
        </Text>
      </Box>
    </Flex>
  );
};
