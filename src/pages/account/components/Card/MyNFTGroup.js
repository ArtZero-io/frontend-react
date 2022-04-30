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
import MyNFTCard from "./MyNFT";
import { IPFS_BASE_URL } from "@constants/index";
import { createObjAttrsNFT } from "@utils/index";
import ResponsivelySizedModal from "@components/Modal/Modal";
// eslint-disable-next-line no-unused-vars
import NFTTabInfo from "@pages/account/nfts/components/Tabs/MyNFTInfo";
import {getCachedImage} from "@utils";
import { clientAPI } from "@api/client";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";

function MyNFTGroupCard({ name, avatarImage, listNFT, contractType, showOnChainMetadata, showMyListing}) {
  const { currentAccount } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedNFT, setSelectedNFT] = useState(null);

  const [listNFTFormatted, setListNFTFormatted] = useState(null);

  function onClickHandler(item) {
    setSelectedNFT(item);
    (item?.stakeStatus == 0) && onOpen();
  }
  const getAttributesData = async () =>{
    if (showOnChainMetadata){
      //On-Chain Data
      const data = listNFT?.map((item) => {
        const itemData = createObjAttrsNFT(item.attributes, item.attributesValue);

        return { ...item, ...itemData };
      });

      setListNFTFormatted(data);
    }
    else{
      //Off-chain Data

      let tokenUri = await artzero_nft_calls.tokenUri(
        currentAccount?.address,
        1
      );
      tokenUri = tokenUri?.replace("1.json", "");

      let data = [];
      let listNFT_length = listNFT.length;
      for (var j = 0; j<listNFT_length;j++){
        let item = listNFT[j];
        //get the off-chain metadata
        const metadata = await clientAPI(
          "get",
          "/getJSON?input=" +
            tokenUri +
            item.tokenID?.toString() +
            ".json",
          {}
        );
        //console.log(tokenUri + item.tokenID + ".json",metadata);
        let attributes = [];
        let attributeValues = [];
        attributes.push("nftName");
        attributes.push("description");
        attributes.push("avatar");

        attributeValues.push(metadata.name);
        attributeValues.push(metadata.description);
        attributeValues.push(metadata.image);

        let length = metadata.attributes.length;
        for (var i=0;i<length;i++){
          attributes.push(metadata.attributes[i].trait_type);
          attributeValues.push(metadata.attributes[i].value);
        }
        const itemData = createObjAttrsNFT(attributes, attributeValues);

        data.push({ ...item, ...itemData });
      }
      console.log(data);
      setListNFTFormatted(data);
    }

    // if (showMyListing === 1){
    //   console.log('showMyListing only')
    //   let mylistNFT = listNFT.filter(
    //
    //     (nft) => nft.is_for_sale
    //
    //   );
    //   setListNFTFormatted(mylistNFT);
    //}
  }

  useEffect(() => {

    getAttributesData();

    //console.log(listNFT,'showOnChainMetadata',showOnChainMetadata);
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
        hasTabs={true}
      />

      <Flex>
        <Avatar
          size={"lg"}
          src={avatarImage ? getCachedImage(avatarImage,100,IPFS_BASE_URL +"/"+ avatarImage.replace("ipfs://","")) : ""}
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
          {listNFTFormatted.length >0 && listNFTFormatted?.map((item, idx) => (

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
