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
import NFTModal from "../../nfts/components/Modal/MyNFT";
import MyNFTCard from "./MyNFT";

function MyNFTCardsGroup({
  collectionName,
  totalItems,
  listNFT,
  image,
  collection_detail,
  nftContractAddress,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nft_detail, setNftDetail] = useState({});

  

  function onClickHandler(item) {
    console.log('item xxx', item)
    const [result] = listNFT.filter((i) => i.name === item?.name);
    setSelectedNFT(result);
    setNftDetail(item);
    !item?.isStaked && onOpen();


  }
  return (
    <Box my={10}>
      <NFTModal
        nft_detail={nft_detail}
        collection_detail={collection_detail}
        nft_contract_address={nftContractAddress}
        selectedNFT={selectedNFT}
        isOpen={isOpen}
        onClose={onClose}
      />
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
            onClick={() => onClickHandler(item)}
          >
            <MyNFTCard {...item} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default MyNFTCardsGroup;
