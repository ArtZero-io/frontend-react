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
// import { delay } from "@utils";
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
  const [bidPrice, setBidPrice] = useState(null);
  // const { collection_address } = useParams();
  
  const { api, currentAccount } = useSubstrateState();

  useEffect(async () => {
    await onRefresh();
  }, [artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    
  };

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

  const placeOffer = async () => {
    console.log("placeOffer", bidPrice, "AZERO");
    
    //TODO Handle validate price

    const { data: balance } = await api.query.system.account(
      currentAccount.address
    );

    marketplace_contract_calls.setMarketplaceContract(api, contractData.marketplace);
    
    if (balance.free.toNumber() / (10 ** 12) > bidPrice) {
      await marketplace_contract_calls.bid(
        currentAccount,
        nftContractAddress,
        {'u64': tokenID},
        bidPrice
      );
      
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
                      <TagLabel bg="transparent">{price}</TagLabel>
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
                {!doOffer && (
                  <Button
                    h={10}
                    maxW={32}
                    variant="solid"
                    onClick={() => setDoOffer(true)}
                  >
                    Make offer
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
