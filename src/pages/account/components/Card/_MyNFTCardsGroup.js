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
import NFTModal from "../Modal/NFTModal";
// import { Link } from "react-router-dom";
import MyNFTCard from "./_MyNFTCard";

function MyNFTCardsGroup({
  collectionName,
  collection_detail,
  totalItems,
  listNFT,
  nftContractAddress,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("default");
  const [nft_detail, setNftDetail] = useState({});

  console.log("1totalItems ", totalItems);

  return (
    <Box my={10}>
      <Flex>
        <Avatar size={"lg"} />
        <VStack align="start" ml={3} justifyContent="center">
          <Heading size="h6">{collectionName}</Heading>
          <Text textAlign="left" color="brand.grayLight" size="2xs">
            {totalItems} items
          </Text>
        </VStack>
      </Flex>
      <NFTModal
        nft_detail={nft_detail}
        collection_detail={collection_detail}
        nft_contract_address={nftContractAddress}
        address={address}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Grid
        borderBottomWidth={1}
        templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
        gap={6}
        py={10}
      >
        {listNFT.length
          ? listNFT.map((item) => {
              return (
                <GridItem
                  shadow="base"
                  w="100%"
                  h="100%"
                  cursor="pointer"
                  onClick={() => {
                    setAddress(address);
                    setNftDetail(item);
                    onOpen();
                  }}
                >
                  <MyNFTCard {...item} />
                </GridItem>
              );
            })
          : ""}
      </Grid>
    </Box>
  );
}

export default MyNFTCardsGroup;
