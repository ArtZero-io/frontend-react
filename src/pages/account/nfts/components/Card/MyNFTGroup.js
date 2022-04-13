import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NFTModal from "../Modal/MyNFT";
import MyNFTCard from "./MyNFT";

function MyNFTCardsGroup({ collectionName, totalItems, listNFT, image }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFT, setSelectedNFT] = useState(null);

  function onClickHandler(name) {
    const [result] = listNFT.filter((i) => i.name === name);
    setSelectedNFT(result);
    onOpen();
    console.log("first");
  }
  return (
    <Box my={10}>
      <NFTModal selectedNFT={selectedNFT} isOpen={isOpen} onClose={onClose} />
      <Flex>
        <Avatar size={"lg"} src={image} />
        <VStack align="start" ml={3} justifyContent="center">
          <Heading size="h6">{collectionName}</Heading>
          <Text textAlign="left" color="brand.grayLight" size="2xs">
            {totalItems} items
          </Text>
        </VStack>
      </Flex>
      <Grid
        borderBottomWidth={1}
        templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
        gap={6}
        py={10}
      >
        {listNFT?.map((item, idx) => (
          <GridItem
            key={idx}
            shadow="lg"
            w="full"
            h="full"
            cursor="pointer"
            onClick={() => onClickHandler(item.name)}
          >
            <MyNFTCard {...item} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default MyNFTCardsGroup;
