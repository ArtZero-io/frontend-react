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
  Link,
  Image,
  Tag,
  TagLabel,
  TagRightIcon,
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  Progress,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import { useSubstrateState } from "@utils/substrate";
import { convertStringToPrice, createLevelAttribute } from "@utils";

import { IPFS_BASE_URL } from "@constants/index";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import toast from "react-hot-toast";
import { FaTelegram } from "react-icons/fa";
import contractData from "@utils/blockchain/index";
import { truncateStr } from "@utils";
import BN from "bn.js";
import process from "process";

import { motion, AnimatePresence } from "framer-motion";

const baseURL = process.env.REACT_APP_API_BASE_URL;

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
  // eslint-disable-next-line no-unused-vars
  const [NFT, setNFT] = useState({});
  const [doOffer, setDoOffer] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const [isBided, setIsBided] = useState(false);
  const [saleInfo, setSaleInfo] = useState(null);
  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });

  useEffect(() => {
    const doLoad = async () => {
      if (isLoaded === false) {
        marketplace_contract_calls.setMarketplaceContract(
          api,
          contractData.marketplace
        );
        const sale_info = await marketplace_contract_calls.getNftSaleInfo(
          currentAccount,
          nftContractAddress,
          { u64: tokenID }
        );
        setSaleInfo(sale_info);
        console.log(sale_info);
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );
        for (const item of listBidder) {
          if (item.bidder === currentAccount?.address) {
            setIsBided(true);
            setBidPrice(convertStringToPrice(item.bidValue));
          }
        }
        setIsLoaded(true);
      }
    };
    doLoad();
  }, [api, currentAccount, isLoaded, nftContractAddress, tokenID]);

  const getNFTImage = (imageHash, size) => {
    const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
    return (
      baseURL +
      "/getImage?input=" +
      imageHash +
      "&size=" +
      size +
      "&url=" +
      callbackUrl
    );
  };

  const buyToken = async () => {
    setNFT({});
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    marketplace_contract_calls.setMarketplaceContract(
      api,
      contractData.marketplace
    );
    //check owner of the NFT from marketplace
    if (saleInfo.nftOwner === currentAccount?.address) {
      toast.error(`Cant buy your own NFT!`);
      return;
    }

    if (balance.free.gte(new BN(price))) {
      await marketplace_contract_calls.buy(
        currentAccount,
        nftContractAddress,
        { u64: tokenID },
        price
      );
    } else {
      toast.error(`Not Enough Balance!`);
    }
  };

  const removeBid = async () => {
    const res = await marketplace_contract_calls.removeBid(
      currentAccount,
      nftContractAddress,
      { u64: tokenID }
    );
    console.log(res);
    setIsBided(false);
    setBidPrice(0);
  };

  const placeOffer = async () => {
    const { data: balance } = await api.query.system.account(
      currentAccount?.address
    );

    //check owner of the NFT from marketplace
    if (saleInfo.nftOwner === currentAccount?.address) {
      toast.error(`Cant bid your own NFT!`);
      return;
    }

    marketplace_contract_calls.setMarketplaceContract(
      api,
      contractData.marketplace
    );

    if (balance.free.toNumber() / 10 ** 12 > bidPrice) {
      if (price >= bidPrice) {
        await marketplace_contract_calls.bid(
          currentAccount,
          nftContractAddress,
          { u64: tokenID },
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
    <Flex h="full">
      <Box minW={{ base: "20rem", "2xl": "30rem" }} bg="#372648">
        <Image
          w="full"
          h="full"
          boxShadow="lg"
          alt="nft-img"
          objectFit="cover"
          src={getNFTImage(avatar, 500)}
          fallback={<Skeleton minW={{ base: "20rem", "2xl": "30rem" }} />}
        />
      </Box>

      <Flex
        w="full"
        ml={10}
        direction={"column"}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box w="full">
          <Flex>
            <Heading
              color="#fff"
              size="h4"
              fontSize={{ base: "1rem", "2xl": "2rem" }}
            >
              {nftName}
            </Heading>
          </Flex>

          <Heading
            size="h6"
            py={3}
            fontSize={{ base: "0.8rem", "2xl": "1rem" }}
            color="brand.grayLight"
            lineHeight="1.35"
          >
            {description}
          </Heading>

          <Text color="#fff" pb={2}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Owned by{" "}
                <Link color="#7AE7FF">
                  {saleInfo ? truncateStr(saleInfo.nftOwner, 6) : ""}
                </Link>
              </motion.div>
            </AnimatePresence>
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
                  <Box textAlign="right" color="brand.grayLight">
                    <Text>Current price</Text>
                    <Tag h={4} pr={0} bg="transparent">
                      <TagLabel bg="transparent">{price / 10 ** 12}</TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                  </Box>
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
                {!doOffer && !isBided && (
                  <Button
                    h={10}
                    maxW={32}
                    variant="solid"
                    onClick={() => setDoOffer(true)}
                  >
                    Make offer
                  </Button>
                )}

                {!doOffer && isBided && (
                  <Button h={10} maxW={32} variant="solid" onClick={removeBid}>
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
                  <Box textAlign="right" color="brand.grayLight">
                    <Text>Current offer</Text>
                    <Tag pr={0} bg="transparent">
                      <TagLabel bg="transparent">{bidPrice}</TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Tag>
                  </Box>
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
          boxShadow="lg"
          my={2}
          minH="10rem"
          w="full"
          templateColumns={`repeat(auto-fill, minmax(min(100%, ${gridSize}), 1fr))`}
          gap={5}
          pr={"0.25rem"}
          overflowY="auto"
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
                    <GridItem w="100%" h="100%">
                      <Box
                        w="full"
                        textAlign="left"
                        alignItems="end"
                        bg="black"
                        px={4}
                        py={3}
                      >
                        <Flex w="full">
                          <Box color="brand.grayLight" w="full">
                            <Text>{Object.keys(item)[0]}</Text>
                            <Heading
                              textAlign="right"
                              size="h6"
                              mt={1}
                              // minH="2.5rem"
                              isTruncated
                              maxW={"10rem"}
                              fontSize={{ base: "0.875rem", "2xl": "1rem" }}
                            >
                              {Object.values(item)[0]}
                            </Heading>
                          </Box>
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
                        // my={2}
                        minW="30%"
                        maxH={"4.625rem"}
                      >
                        <Flex w="full" my={2}>
                          <Heading
                            size="h6"
                            mt={1}
                            color="#fff"
                            fontSize={{ base: "1rem", "2xl": "1.125rem" }}
                          >
                            {Object.keys(item)[0]}
                          </Heading>

                          <Spacer />
                          <Text color="#fff">
                            {createLevelAttribute(Object.values(item)[0]).level}{" "}
                            of{" "}
                            {
                              createLevelAttribute(Object.values(item)[0])
                                .levelMax
                            }
                          </Text>
                        </Flex>

                        <Progress
                          colorScheme="telegram"
                          size="sm"
                          value={Number(
                            (createLevelAttribute(Object.values(item)[0])
                              .level *
                              100) /
                              createLevelAttribute(Object.values(item)[0])
                                .levelMax
                          )}
                          height="6px"
                        />
                      </Box>
                    </React.Fragment>
                  );
                })
            : null}
        </Grid>
      </Flex>
    </Flex>

    // <HStack justifyContent="space-between">
    //   <Image
    //     alt={nftName}
    //     boxShadow="lg"
    //     boxSize={{ base: "16rem", "2xl": "28rem" }}
    //     objectFit="cover"
    //     src={getNFTImage(avatar, 500)}
    //     fallback={
    //       <Skeleton w="30rem" boxSize={{ base: "16rem", "2xl": "28rem" }} />
    //     }
    //   />

    //   <Flex
    //     direction={"column"}
    //     justify="start"
    //     w="full"
    //     h="full"
    //     pl={10}
    //     py={0}
    //     maxW="38rem"
    //   >
    //     <Box w="full">
    //       <Flex>
    //         <Heading size="h4">{nftName || "unknown name"}</Heading>
    //       </Flex>

    //       <Heading size="h6" color="brand.grayLight" noOfLines={[0, 1]} my={2}>
    //         {description || "unknown description"}
    //       </Heading>

    //       <Text color="#fff">
    //         For Sale by{" "}
    //         <Link color="#7AE7FF">
    //           {saleInfo ? truncateStr(saleInfo.nftOwner, 5) : ""}
    //         </Link>
    //       </Text>
    //     </Box>

    //     <HStack w="full" py={2}>
    //       {is_for_sale ? (
    //         <>
    //           <Flex
    //             w="full"
    //             alignItems="center"
    //             borderColor="#343333"
    //             px={4}
    //             py={1}
    //             borderWidth={2}
    //           >
    //             <Button h={10} maxW={32} variant="solid" onClick={buyToken}>
    //               Buy now
    //             </Button>

    //             <Spacer />

    //             <Flex w="full">
    //               <Spacer />
    //               <Box textAlign="right" color="brand.grayLight">
    //                 <Text>Current price</Text>
    //                 <Tag h={4} pr={0} bg="transparent">
    //                   <TagLabel bg="transparent">{price / 10 ** 12}</TagLabel>
    //                   <TagRightIcon as={AzeroIcon} />
    //                 </Tag>
    //               </Box>
    //             </Flex>
    //           </Flex>

    //           <Flex
    //             w="full"
    //             alignItems="center"
    //             borderColor="#343333"
    //             px={4}
    //             py={1}
    //             borderWidth={2}
    //           >
    //             {!doOffer && !isBided && (
    //               <Button
    //                 h={10}
    //                 maxW={32}
    //                 variant="solid"
    //                 onClick={() => setDoOffer(true)}
    //               >
    //                 Make offer
    //               </Button>
    //             )}

    //             {!doOffer && isBided && (
    //               <Button h={10} maxW={32} variant="solid" onClick={removeBid}>
    //                 Remove Bid
    //               </Button>
    //             )}

    //             {doOffer && (
    //               <InputGroup
    //                 w={32}
    //                 bg="black"
    //                 h={10}
    //                 py={1}
    //                 color="black"
    //                 borderRadius="0"
    //               >
    //                 <InputRightElement bg="transparent" h={10} w="48px">
    //                   <IconButton
    //                     aria-label="telegram"
    //                     icon={<FaTelegram size="1.5rem" />}
    //                     size="icon"
    //                     variant="outline"
    //                     borderWidth={0}
    //                     h={10}
    //                     onClick={placeOffer}
    //                   />
    //                 </InputRightElement>
    //                 <Input
    //                   bg="black"
    //                   color="white"
    //                   variant="unstyled"
    //                   my={1}
    //                   pl={1.5}
    //                   placeholder="0"
    //                   _placeholder={{
    //                     color: "brand.grayLight",
    //                     fontSize: "lg",
    //                   }}
    //                   onChange={({ target }) => {
    //                     setBidPrice(target.value);
    //                   }}
    //                   value={bidPrice}
    //                 />
    //               </InputGroup>
    //             )}

    //             <Spacer />

    //             <Flex w="full">
    //               <Spacer />
    //               <Box textAlign="right" color="brand.grayLight">
    //                 <Text>Current offer</Text>
    //                 <Tag pr={0} bg="transparent">
    //                   <TagLabel bg="transparent">{bidPrice}</TagLabel>
    //                   <TagRightIcon as={AzeroIcon} />
    //                 </Tag>
    //               </Box>
    //             </Flex>
    //           </Flex>
    //         </>
    //       ) : (
    //         <>
    //           <Heading size="h6">Not for sale</Heading>
    //         </>
    //       )}
    //     </HStack>

    //     <Grid
    //       maxH="28"
    //       pr={"0.25rem"}
    //       w="100%"
    //       templateColumns="repeat(auto-fill, minmax(min(100%, 10rem), 1fr))"
    //       gap={3}
    //       overflowY="auto"
    //       overflowX="hidden"
    //       sx={{
    //         "&::-webkit-scrollbar": {
    //           width: "0.3rem",
    //           borderRadius: "1px",
    //           backgroundColor: `#7ae7ff`,
    //         },
    //         "&::-webkit-scrollbar-thumb": {
    //           backgroundColor: `#7ae7ff`,
    //         },
    //       }}
    //     >
    //       {attrsList?.length
    //         ? attrsList
    //             .filter((i) => !JSON.stringify(Object.values(i)).includes("|"))
    //             .map((item, idx) => {
    //               return (
    //                 <GridItem key={idx} w="100%" h="100%">
    //                   <Box
    //                     w="full"
    //                     textAlign="left"
    //                     alignItems="end"
    //                     bg="brand.semiBlack"
    //                     p={3}
    //                   >
    //                     <Flex w="full">
    //                       <Text color="brand.grayLight">
    //                         <Text>{Object.keys(item)[0]}</Text>
    //                         <Heading
    //                           size="h6"
    //                           mt={1}
    //                           isTruncated
    //                           maxW={"10rem"}
    //                         >
    //                           {Object.values(item)[0]}
    //                         </Heading>
    //                       </Text>
    //                       <Spacer />
    //                     </Flex>
    //                     <Flex w="full" color="#7AE7FF">
    //                       <Spacer />
    //                       <Text> </Text>
    //                     </Flex>
    //                   </Box>
    //                 </GridItem>
    //               );
    //             })
    //         : ""}
    //     </Grid>

    //     {attrsList?.length
    //       ? attrsList
    //           .filter((i) => JSON.stringify(Object.values(i)).includes("|"))
    //           .map((item, idx) => {
    //             return (
    //               <React.Fragment key={idx}>
    //                 <Box
    //                   w="full"
    //                   textAlign="left"
    //                   alignItems="end"
    //                   bg="brand.semiBlack"
    //                   p={2}
    //                   mt={2}
    //                 >
    //                   <Flex w="full" mb={2}>
    //                     <Heading size="h6" mt={1} color="#fff">
    //                       {Object.keys(item)[0]}
    //                     </Heading>
    //                     <Spacer />
    //                     <Text color="#fff">
    //                       {createLevelAttribute(Object.values(item)[0]).level}{" "}
    //                       of{" "}
    //                       {
    //                         createLevelAttribute(Object.values(item)[0])
    //                           .levelMax
    //                       }
    //                     </Text>
    //                   </Flex>
    //                   <Progress
    //                     colorScheme="telegram"
    //                     size="sm"
    //                     value={Number(
    //                       (createLevelAttribute(Object.values(item)[0]).level *
    //                         100) /
    //                         createLevelAttribute(Object.values(item)[0])
    //                           .levelMax
    //                     )}
    //                     height="6px"
    //                   />
    //                 </Box>
    //               </React.Fragment>
    //             );
    //           })
    //       : null}
    //   </Flex>
    // </HStack>
  );
};

export default NFTTabCollectible;
