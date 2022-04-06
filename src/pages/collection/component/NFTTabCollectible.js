/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
  Square,
  VStack,
  Link,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
import { FiUpload, FiRefreshCw } from "react-icons/fi";
import { useParams } from "react-router-dom";
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import artzero_nft_calls from "../../../utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "../../../utils/substrate";
import { delay } from "../../../utils";
import artzero_nft from "../../../utils/blockchain/artzero-nft";
import { ContractPromise } from "@polkadot/api-contract";
import axios from 'axios';

const NFTTabCollectible = ({ address }) => {

  const [NFT, setNFT] = useState({});
  const param = useParams();
  const { api, currentAccount } = useSubstrateState();

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded(), artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    await loadNFT();
    await delay(1000);
  };

  const loadNFT = async () => {
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        param.collectionAddress
      );
  
    if (currentCollection.showOnChainMetadata) {
      console.log(currentCollection);
    } else {
      if (
        currentCollection.nftContractAddress == artzero_nft.CONTRACT_ADDRESS
      ) {
        if (!artzero_nft_calls.isLoaded()) {
          const artzero_nft_contract = new ContractPromise(
              api,
              artzero_nft.CONTRACT_ABI,
              artzero_nft.CONTRACT_ADDRESS
            );
            artzero_nft_calls.setContract(artzero_nft_contract);
        }
        const res = await artzero_nft_calls.tokenUri(currentAccount, address);
        axios.get(res)
          .then(response => {
              if (response.status === 200) {
                let atts = [];
                console.log(response.data.attributes);
                for (const attribute of response.data.attributes) {
                  atts.push({ name: attribute.trait_type, value: attribute.value });
                }
                const nft = {
                  id: address,
                  askPrice: "12.3",
                  bidPrice: "12.3",
                  name: response.data.name,
                  img: response.data.image,
                  atts: atts
                };
                console.log(nft);
                setNFT(nft);
              }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    console.log(NFT);
  }

  return (
    
    <HStack>
      <Avatar w={{ xl: "16rem" }} h={{ xl: "16rem" }} rounded="none"></Avatar>
      <VStack w="full" px={10} py={2}>
        <Box w="full">
          <Flex>
            <Heading fontSize="3xl">{NFT.name}</Heading>
            <Spacer />
            <Button variant="icon">
              <Square size="3.125rem">
                <FiRefreshCw size="24px" />
              </Square>
            </Button>
            <Button variant="icon">
              <Square size="3.125rem">
                <FiUpload size="24px" />
              </Square>
            </Button>
          </Flex>
          <Heading fontSize="lg" color="brand.grayLight">
            {NFT.name}
          </Heading>
          <Text>
            Owned by <Link>8jJPfNyVoKTb4E589WHErgUcJncyKcJ9SQasMw6j5Zkz</Link>
          </Text>
        </Box>
        <HStack w="full" py={2}>
          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={3}
            borderWidth={2}
          >
            <Button variant="buy-sell">Buy now</Button>
            <Spacer />
            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                Current price
                <Text>
                  <Flex pl={3} alignItems="center" justifyContent="center">
                    <Text color="brand.blue">123</Text>
                    <Avatar
                      src={NFT.img}
                      h={5}
                      w={5}
                      ml={2}
                      name="AzeroLogo"
                      bg="transparent"
                    />
                  </Flex>
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={3}
            borderWidth={2}
          >
            <Button variant="buy-sell">Make offer</Button>
            <Spacer />
            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                Current offer
                <Text>
                  <Flex pl={3} alignItems="center" justifyContent="center">
                    <Text color="brand.blue">123</Text>
                    <Avatar
                      src={AzeroIcon}
                      h={5}
                      w={5}
                      ml={2}
                      name="AzeroLogo"
                      bg="transparent"
                    />
                  </Flex>
                </Text>
              </Text>
            </Flex>
          </Flex>
        </HStack>
        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={6}
        >
          {(NFT.atts) ? NFT.atts.map((item) => {
            return (
              <GridItem
                id="abc"
                w="100%"
                h="100%"
                _hover={{ bg: "brand.blue" }}
              >
                <Box w="full" textAlign="left" bg="black" px={4} py={3}>
                  <Flex w="full">
                    <Text color="brand.grayLight">
                      <Text>{item.name}</Text>
                      <Heading fontSize="lg" color="white" mt={1}>
                        {item.value}
                      </Heading>
                    </Text>
                    <Spacer />
                  </Flex>
                </Box>
              </GridItem>
            );
          }) : ''}
        </Grid>
      </VStack>
    </HStack>
  );
}

export default NFTTabCollectible;

// const atts = [
//   { name: "Background", value: "Blue" },
//   { name: "Fur / Skin", value: "Albino / Blue" },
//   { name: "Head", value: "Sun Hat" },
//   { name: "Mouth", value: "Banana" },
//   { name: "generation", value: "1" },
//   { name: "Background", value: "Blue" },
// ];
