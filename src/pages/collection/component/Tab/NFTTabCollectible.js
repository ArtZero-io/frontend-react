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
  Image,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { useParams } from "react-router-dom";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import { delay } from "@utils";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { ContractPromise } from "@polkadot/api-contract";
import axios from "axios";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";

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
        param.address
      );
    console.log("NFTTAB", currentCollection);

    if (currentCollection?.showOnChainMetadata) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.address
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const attribute_count =
        await nft721_psp34_standard_calls.getAttributeCount(currentAccount);
      let atts = [];
      const tokenId = nft721_psp34_standard_contract.api.createType(
        "ContractsPsp34Id",
        { U8: numberToU8a(address) }
      );
      const tokenName = await nft721_psp34_standard_calls.getAttribute(
        currentAccount,
        tokenId,
        stringToHex("nft_name")
      );
      const tokenAvatar = await nft721_psp34_standard_calls.getAttribute(
        currentAccount,
        tokenId,
        stringToHex("avatar")
      );
      console.log(tokenAvatar);
      const base_attributes = ["nft_name", "description", "avatar"];
      for (let j = 1; j <= attribute_count; j++) {
        const attribute_name =
          await nft721_psp34_standard_calls.getAttributeName(currentAccount, j);

        if (attribute_name && !base_attributes.includes(attribute_name)) {
          const attribute_val = await nft721_psp34_standard_calls.getAttribute(
            currentAccount,
            tokenId,
            stringToHex(attribute_name)
          );
          if (attribute_val) {
            atts.push({ name: attribute_name, value: attribute_val });
          }
        }
      }
      console.log(atts);
      const nft = {
        id: address,
        askPrice: "12.3",
        bidPrice: "12.3",
        name: tokenName,
        img: `${IPFS_BASE_URL}/${tokenAvatar}`,
        atts: atts,
      };
      console.log(nft);
      setNFT(nft);
      // const tokenId = nft721_psp34_standard_contract.api.createType('ContractsPsp34Id', {'U8': numberToU8a(i)});
      // const attributeVals = await nft721_psp34_standard_calls.getAttributes(currentAccount, tokenId, attributes);
      // console.log(attributeVals);
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
        axios
          .get(res)
          .then((response) => {
            if (response.status === 200) {
              let atts = [];
              console.log(response.data.attributes);
              for (const attribute of response.data.attributes) {
                atts.push({
                  name: attribute.trait_type,
                  value: attribute.value,
                });
              }
              const nft = {
                id: address,
                askPrice: "12.3",
                bidPrice: "12.3",
                name: response.data.name,
                img: response.data.image,
                atts: atts,
              };
              console.log(nft);
              setNFT(nft);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    console.log(NFT);
  };

  return (
    <HStack>
      <Image
        boxShadow="lg"
        boxSize="30rem"
        alt="nft-img"
        objectFit="cover"
        src={NFT.img}
        fallbackSrc="https://via.placeholder.com/480"
      />

      <VStack maxH="30rem" w="full" pl={10} py={0}>
        <Box w="full">
          <Flex>
            <Heading size="h4">{NFT.name}</Heading>

            <Spacer />
            {/* <Button variant="icon">
              <Square size="3.125rem">
                <FiRefreshCw size="24px" />
              </Square>
            </Button>
            <Button variant="icon">
              <Square size="3.125rem">
                <FiUpload size="24px" />
              </Square>
            </Button> */}
          </Flex>

          <Heading size="h6" py={3} color="brand.grayLight">
            {NFT.name}
          </Heading>

          <Text color="#fff">
            Owned by{" "}
            <Link color="#7AE7FF">
              8jJPfNyVoKTb4E589WHErgUcJncyKcJ9SQasMw6j5Zkz
            </Link>
          </Text>
        </Box>

        <HStack w="full" py={2}>
          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={1}
            borderWidth={2}
          >
            <Button h={10} maxW={32} variant="solid">
              Buy now
            </Button>

            <Spacer />

            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                <Text>Current price</Text>
                <Tag h={4} pr={0} bg="transparent">
                  <TagLabel bg="transparent">82.00</TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>
              </Text>
            </Flex>
          </Flex>

          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={1}
            borderWidth={2}
          >
            <Button h={10} maxW={32} variant="solid">
              Make offer
            </Button>

            <Spacer />

            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                <Text>Current offer</Text>
                <Tag pr={0} bg="transparent">
                  <TagLabel bg="transparent">82.00</TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>
              </Text>
            </Flex>
          </Flex>
        </HStack>

        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={6}
          overflowY="auto"
        >
          {NFT.atts
            ? NFT.atts.map((item) => {
                return (
                  <GridItem
                    id="abc"
                    w="100%"
                    h="100%"
                    _hover={{ bg: "brand.blue" }}
                  >
                    <Box
                      w="full"
                      textAlign="left"
                      alignItems="end"
                      bg="black"
                      px={4}
                      py={3}
                    >
                      <Flex w="full">
                        <Text color="brand.grayLight">
                          <Text>{item.name}</Text>
                          <Heading size="h6" mt={1}>
                            {item.value}
                          </Heading>
                        </Text>
                        <Spacer />
                      </Flex>
                      <Flex w="full" color="#7AE7FF">
                        <Spacer />
                        <Text>88.88%</Text>
                      </Flex>
                    </Box>
                  </GridItem>
                );
              })
            : ""}
        </Grid>
      </VStack>
    </HStack>
  );
};

export default NFTTabCollectible;
