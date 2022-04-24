/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
  Link,
  Image,
  Tag,
  TagLabel,
  TagRightIcon,
  // Skeleton,
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  Progress,
  Skeleton,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
// import { useParams } from "react-router-dom";
// import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
// import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import { convertStringToPrice } from "@utils";
// import artzero_nft from "@utils/blockchain/artzero-nft";
// import { ContractPromise } from "@polkadot/api-contract";
// import axios from "axios";
// import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
// import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
// import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
// import { TypeRegistry, U64 } from "@polkadot/types";
import toast from "react-hot-toast";
import { FaTelegram } from "react-icons/fa";
import contractData from "@utils/blockchain/index";

const NFTTabCollectible = ({
  nftContractAddress,
  description,
  nftName,
  owner,
  is_for_sale,
  avatar,
  tokenID,
  price,
  attrsList,
}) => {
  const [NFT, setNFT] = useState({});
  const [doOffer, setDoOffer] = useState(false);
  // const [onLoad, setOnLoad] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  // const { collection_address } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const [isBided, setIsBided] = useState(false);

  // useEffect(async () => {
  //   await onRefresh();
  // }, [artzero_nft_calls.isLoaded()]);

 // const onRefresh = async () => {
    
  //};
  useEffect(async () => {
    if (isLoaded === false) {
      marketplace_contract_calls.setMarketplaceContract(api, contractData.marketplace);
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(currentAccount, nftContractAddress, {'u64': tokenID});
      console.log(sale_info);
      const listBidder = await marketplace_contract_calls.getAllBids(currentAccount, nftContractAddress, sale_info.nftOwner, {'u64': tokenID});
      for (const item of listBidder ) {
        if (item.bidder == currentAccount.address) {
          setIsBided(true);
          setBidPrice(convertStringToPrice(item.bidValue));
        }
      }
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const buyToken = async () => {
    setNFT({});
    const { data: balance } = await api.query.system.account(
      currentAccount.address
    );

    marketplace_contract_calls.setMarketplaceContract(
      api,
      contractData.marketplace
    );

    if (balance.free.toNumber() > price) {
      await marketplace_contract_calls.buy(
        currentAccount,
        nftContractAddress,
        { u64: tokenID },
        price
      );
    } else {
      toast.error(`Your balance not enough!`);
    }
  };

  // const loadNFT = async () => {
  //   let currentCollection =
  //     await collection_manager_calls.getCollectionByAddress(
  //       currentAccount,
  //       collection_address
  //     );

  //   if (currentCollection?.showOnChainMetadata) {
  //     const nft721_psp34_standard_contract = new ContractPromise(
  //       api,
  //       nft721_psp34_standard.CONTRACT_ABI,
  //       collection_address
  //     );
  //     nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
  //     const attribute_count =
  //       await nft721_psp34_standard_calls.getAttributeCount(currentAccount);
  //     let atts = [];
  //     const tokenId = nft721_psp34_standard_contract.api.createType(
  //       "ContractsPsp34Id",
  //       { U8: numberToU8a(address) }
  //     );
  //     const tokenName = await nft721_psp34_standard_calls.getAttribute(
  //       currentAccount,
  //       tokenId,
  //       stringToHex("nft_name")
  //     );
  //     const tokenAvatar = await nft721_psp34_standard_calls.getAttribute(
  //       currentAccount,
  //       tokenId,
  //       stringToHex("avatar")
  //     );
  //     console.log(tokenAvatar);
  //     const base_attributes = ["nft_name", "description", "avatar"];
  //     for (let j = 1; j <= attribute_count; j++) {
  //       const attribute_name =
  //         await nft721_psp34_standard_calls.getAttributeName(currentAccount, j);

  //       if (attribute_name && !base_attributes.includes(attribute_name)) {
  //         const attribute_val = await nft721_psp34_standard_calls.getAttribute(
  //           currentAccount,
  //           tokenId,
  //           stringToHex(attribute_name)
  //         );
  //         if (attribute_val) {
  //           atts.push({ name: attribute_name, value: attribute_val });
  //         }
  //       }
  //     }
  //     const tokenIdU64 = nft721_psp34_standard_contract.api.createType(
  //       "ContractsPsp34Id",
  //       { U64: new U64(new TypeRegistry(), address) }
  //     );
  //     const nftSaleInfo = await marketplace_contract_calls.getNftSaleInfo(
  //       currentAccount,
  //       collection_address,
  //       tokenIdU64
  //     );
  //     console.log('nftSaleInfo', nftSaleInfo);
  //     const nft = {
  //       id: address,
  //       askPrice: nftSaleInfo.price,
  //       bidPrice: "12.3",
  //       name: tokenName,
  //       img: `${IPFS_BASE_URL}/${tokenAvatar}`,
  //       atts: atts,
  //     };
  //     console.log(nft);
  //     setNFT(nft);
  //     // const tokenId = nft721_psp34_standard_contract.api.createType('ContractsPsp34Id', {'U8': numberToU8a(i)});
  //     // const attributeVals = await nft721_psp34_standard_calls.getAttributes(currentAccount, tokenId, attributes);
  //     // console.log(attributeVals);
  //   } else {
  //     if (nftContractAddress === artzero_nft.CONTRACT_ADDRESS) {
  //       if (!artzero_nft_calls.isLoaded()) {
  //         const artzero_nft_contract = new ContractPromise(
  //           api,
  //           artzero_nft.CONTRACT_ABI,
  //           artzero_nft.CONTRACT_ADDRESS
  //         );
  //         artzero_nft_calls.setContract(artzero_nft_contract);
  //       }
  //       const res = await artzero_nft_calls.tokenUri(currentAccount, address);
  //       axios  
  //         .get(res)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             let atts = [];
  //             console.log(response.data.attributes);
  //             for (const attribute of response.data.attributes) {
  //               atts.push({
  //                 name: attribute.trait_type,
  //                 value: attribute.value,
  //               });
  //             }
  //             const nft = {
  //               id: address,
  //               askPrice: "12.3",
  //               bidPrice: "12.3",
  //               name: response.data.name,
  //               img: response.data.image,
  //               atts: atts,
  //             };
  //             console.log(nft);
  //             setNFT(nft);
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }
  //   console.log(NFT);
  // };

  const removeBid = async () => {
   
    const res = await marketplace_contract_calls.removeBid(
      currentAccount,
      nftContractAddress,
      {'u64': tokenID}
    );
    console.log(res);
    setIsBided(false);
    setBidPrice(0);
  };

  const placeOffer = async () => {
    console.log("placeOffer", bidPrice, "AZERO");
    
    //TODO Handle validate price

    const { data: balance } = await api.query.system.account(
      currentAccount.address
    );

    marketplace_contract_calls.setMarketplaceContract(api, contractData.marketplace);
    
    if (balance.free.toNumber() / (10 ** 12) > bidPrice) {
      if (price >= bidPrice) {
        await marketplace_contract_calls.bid(
          currentAccount,
          nftContractAddress,
          {'u64': tokenID},
          bidPrice
        );
      } else {
        toast.error(`Must to bid an amount less the price token!`);
      }
    } else {
      toast.error(`Your balance not enough!`);
    }

    setDoOffer(false);
  };

  return (
    <HStack>
      <Image
        alt={nftName}
        boxShadow="lg"
        boxSize={{ base: "16rem", "2xl": "28rem" }}
        objectFit="cover"
        src={`${IPFS_BASE_URL}/${avatar}`}
        fallbackSrc="https://via.placeholder.com/480"
        fallback={
          <Skeleton w="30rem" boxSize={{ base: "16rem", "2xl": "28rem" }} />
        }
      />

      <Flex
        direction={"column"}
        justify="start"
        // maxH="30rem"
        w="full"
        h="full"
        pl={10}
        py={0}
        maxW="38rem"
      >
        <Box w="full">
          <Flex>
            <Heading size="h4">{nftName || "unknown name"}</Heading>
          </Flex>

          <Heading size="h6" color="brand.grayLight" noOfLines={[0, 1]} my={2}>
            {description || "unknown description"}
          </Heading>

          <Text color="#fff">
            Owned by <Link color="#7AE7FF">{owner}</Link>
          </Text>
        </Box>

        <HStack w="full" py={2}>
          {is_for_sale ? (
            <>
              <Flex
                w="full"
                alignItems="center"
                borderColor="#343333"
                px={4}
                py={1}
                borderWidth={2}
              >
                <Button h={10} maxW={32} variant="solid" onClick={buyToken}>
                  Buy now
                </Button>

                <Spacer />

                <Flex w="full">
                  <Spacer />
                  <Text textAlign="right" color="brand.grayLight">
                    <Text>Current price</Text>
                    <Tag h={4} pr={0} bg="transparent">
                      <TagLabel bg="transparent">{(price / (10 ** 12))}</TagLabel>
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
                {(!doOffer && !isBided) && (
                  <Button
                    h={10}
                    maxW={32}
                    variant="solid"
                    onClick={() => setDoOffer(true)}
                  >
                    Make offer
                  </Button>
                )}

              {(!doOffer && isBided) && (
                  <Button
                    h={10}
                    maxW={32}
                    variant="solid"
                    onClick={removeBid}
                  >
                    Remove Bid
                  </Button>
                )}

                {doOffer && (
                  <InputGroup
                    w={32}
                    bg="black"
                    h={10}
                    py={1}
                    color="black"
                    borderRadius="0"
                  >
                    <InputRightElement bg="transparent" h={10} w="48px">
                      <IconButton
                        aria-label="telegram"
                        icon={<FaTelegram size="1.5rem" />}
                        size="icon"
                        variant="outline"
                        borderWidth={0}
                        h={10}
                        onClick={placeOffer}
                      />
                    </InputRightElement>
                    <Input
                      bg="black"
                      color="white"
                      variant="unstyled"
                      my={1}
                      pl={1.5}
                      placeholder="0"
                      _placeholder={{
                        color: "brand.grayLight",
                        fontSize: "lg",
                      }}
                      onChange={({ target }) => {
                        setBidPrice(target.value);
                      }}
                      value={bidPrice}
                    />
                  </InputGroup>
                )}

                <Spacer />

                <Flex w="full">
                  <Spacer />
                  <Text textAlign="right" color="brand.grayLight">
                    <Text>Current offer</Text>
                    <Tag pr={0} bg="transparent">
                      <TagLabel bg="transparent">{bidPrice}</TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                  </Text>
                </Flex>
              </Flex>
            </>
          ) : (
            <>
              <Heading size="h6">Not for sale</Heading>
            </>
          )}
        </HStack>

        <Grid
          maxH="28"
          pr={"0.25rem"}
          w="100%"
          templateColumns="repeat(auto-fill, minmax(min(100%, 10rem), 1fr))"
          gap={3}
          overflowY="auto"
          overflowX="hidden"
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.3rem",
              borderRadius: "1px",
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
          }}
        >
          {attrsList?.length
            ? attrsList
                .filter((i) => !JSON.stringify(Object.values(i)).includes("|"))
                .map((item) => {
                  return (
                    <GridItem id="abc" w="100%" h="100%">
                      <Box
                        w="full"
                        textAlign="left"
                        alignItems="end"
                        bg="brand.semiBlack"
                        p={3}
                      >
                        <Flex w="full">
                          <Text color="brand.grayLight">
                            <Text>{Object.keys(item)[0]}</Text>
                            <Heading
                              size="h6"
                              mt={1}
                              isTruncated
                              maxW={"10rem"}
                            >
                              {Object.values(item)[0]}
                            </Heading>
                          </Text>
                          <Spacer />
                        </Flex>
                        <Flex w="full" color="#7AE7FF">
                          <Spacer />
                          <Text> </Text>
                        </Flex>
                      </Box>
                    </GridItem>
                  );
                })
            : ""}
        </Grid>

        {attrsList?.length
          ? attrsList
              .filter((i) => JSON.stringify(Object.values(i)).includes("|"))
              .map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Box
                      w="full"
                      textAlign="left"
                      alignItems="end"
                      bg="brand.semiBlack"
                      p={2}
                      mt={2}
                    >
                      <Flex w="full" mb={2}>
                        <Heading size="h6" mt={1} color="#fff">
                          {Object.keys(item)[0]}
                        </Heading>
                        <Spacer />
                        <Text color="#fff">
                          {Object.values(item)[0].slice(0, 1)} of{" "}
                          {Object.values(item)[0].slice(-1)}
                        </Text>
                      </Flex>
                      <Progress
                        colorScheme="telegram"
                        size="sm"
                        value={Number(
                          (Object.values(item)[0].slice(0, 1) * 100) /
                            Object.values(item)[0].slice(-1)
                        )}
                        height="6px"
                      />
                    </Box>
                  </React.Fragment>
                );
              })
          : null}
      </Flex>
    </HStack>
  );
};

export default NFTTabCollectible;
