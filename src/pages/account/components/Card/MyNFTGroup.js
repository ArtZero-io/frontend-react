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
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import NFTModal from "../../nfts/components/Modal/MyNFT";
import MyNFTCard from "./MyNFT";
import { IPFS_BASE_URL } from "@constants/index";
import { createObjAttrsNFT } from "@utils/index";
import ResponsivelySizedModal from "../../../../components/Modal/Modal";

function MyNFTGroupCard({ name, avatarImage, listNFT, contractType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [listNFTFormatted, setListNFTFormatted] = useState(null);

  function onClickHandler(item) {
    setSelectedNFT(item);
    !item?.isStaked && onOpen();
  }
  useEffect(() => {
    const data = listNFT?.map((item) => {
      console.log("MyNFTGroupCard item", item);
      const itemData = createObjAttrsNFT(item.attributes, item.attributesValue);

      return { ...item, ...itemData };
    });

    setListNFTFormatted(data);
  }, [listNFT]);

  return (
    <Box my={10}>
      {/* <NFTModal
        contractType={contractType}
        {...selectedNFT}
        isOpen={isOpen}
        onClose={onClose}
      /> */}
      <ResponsivelySizedModal
        contractType={contractType}
        {...selectedNFT}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex>
        <Avatar
          size={"lg"}
          src={`${IPFS_BASE_URL}/${avatarImage}`}
          bg="#372648"
        />
        <VStack align="start" ml={3} justifyContent="center">
          <Heading size="h6">{name}</Heading>
          <Text textAlign="left" color="brand.grayLight" size="2xs">
            {listNFTFormatted?.length} items
          </Text>
        </VStack>
      </Flex>
      {!listNFTFormatted?.length ? (
        <VStack
          py={10}
          align="start"
          ml={3}
          justifyContent="center"
          borderBottomWidth={1}
        >
          <Text textAlign="center" color="brand.grayLight" size="2xs">
            You don't have any NFT yet.
          </Text>
        </VStack>
      ) : (
        <Grid
          borderBottomWidth={1}
          templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
          gap={6}
          py={10}
          px={1}
        >
          {listNFTFormatted?.map((item, idx) => (
            <React.Fragment key={idx}>
              <GridItem
                shadow="lg"
                w="full"
                h="full"
                cursor="pointer"
                onClick={() => onClickHandler(item)}
              >
                <MyNFTCard {...item} />
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default MyNFTGroupCard;
