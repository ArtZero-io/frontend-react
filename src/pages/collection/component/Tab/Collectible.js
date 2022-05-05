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
  Square,
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
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getPublicCurrentAccount } from "../../../../utils";

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
  const [bidPrice, setBidPrice] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const [isBided, setIsBided] = useState(false);
  const [saleInfo, setSaleInfo] = useState(null);
  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });
  const publicCurrentAccount = getPublicCurrentAccount();

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(() => {
    const doLoad = async () => {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount || publicCurrentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);

      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount || publicCurrentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );
        console.log("listBidder", listBidder);
        if (listBidder) {
          for (const item of listBidder) {
            if (item.bidder === currentAccount?.address) {
              setIsBided(true);
              setBidPrice(convertStringToPrice(item.bidValue));
            }
          }
        } else {
          console.log(
            "Detail NFTTabCollectible doLoad. => listBidder is: ",
            listBidder
          );
        }
      }

      setIsLoaded(true);
    };
    !saleInfo && doLoad();
  }, [
    api,
    currentAccount,
    nftContractAddress,
    publicCurrentAccount,
    saleInfo,
    tokenID,
  ]);

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

    // marketplace_contract_calls.setMarketplaceContract(
    //   api,
    //   contractData.marketplace
    // );

    //check owner of the NFT from marketplace
    if (saleInfo.nftOwner === currentAccount?.address) {
      toast.error(`Cant buy your own NFT!`);
      return;
    }

    if (balance.free.gte(new BN(price))) {
      //console.log('buy',tokenID,price);
      await marketplace_contract_calls.buy(
        currentAccount,
        nftContractAddress,
        { u64: tokenID },
        price,
        dispatch
      );
    } else {
      toast.error(`Not Enough Balance!`);
    }
  };

  const removeBid = async () => {
    const res = await marketplace_contract_calls.removeBid(
      currentAccount,
      nftContractAddress,
      { u64: tokenID },
      dispatch
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

    if (parseFloat(bidPrice) <= 0) {
      toast.error(`The bid price must greater than 0!`);
      return;
    }

    if (balance.free.gte(new BN(bidPrice).mul(new BN(10 ** 12)))) {
      if ( (new BN(bidPrice)).mul(new BN(10 ** 12)).gte(new BN (price)) )
        {
          toast.error(`Bid Amount must less than Selling Price`);
          return;
        }
        await marketplace_contract_calls.bid(
          currentAccount,
          nftContractAddress,
          { u64: tokenID },
          bidPrice,
          dispatch
        );
    } else {
      toast.error(`Not Enough Balance!`);
    }

    setDoOffer(false);
  };

  return (
    <Flex h="full">
      <Square
        w={{ base: "20rem", "2xl": "30rem" }}
        h={{ base: "20rem", "2xl": "30rem" }}
        bg="#372648"
      >
        <Image
          w="full"
          h="full"
          boxShadow="lg"
          alt="nft-img"
          objectFit="cover"
          src={getNFTImage(avatar, 500)}
          fallback={<Skeleton minW={{ base: "20rem", "2xl": "30rem" }} />}
        />
      </Square>

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

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Text color="#fff" pb={2}>
                Owned by{" "}
                <Link color="#7AE7FF">
                  {saleInfo ? truncateStr(saleInfo.nftOwner, 6) : owner}
                </Link>
              </Text>
            </motion.div>
          </AnimatePresence>
        </Box>

        {!saleInfo?.nftOwner ? (
          <Heading size="h6">Not for sale</Heading>
        ) : (
          <HStack w="full" py={2}>
            {currentAccount?.address !== saleInfo?.nftOwner && (
              <>
                <Flex
                  w="full"
                  alignItems="center"
                  borderColor="#343333"
                  px={4}
                  py={1}
                  borderWidth={2}
                  minH="4.75rem"
                >
                  <Button
                    spinnerPlacement="start"
                    isLoading={tnxStatus}
                    loadingText={`${tnxStatus?.status}`}
                    h={10}
                    maxW={32}
                    variant="solid"
                    onClick={buyToken}
                  >
                    Buy now
                  </Button>

                  <Spacer />

                  <Flex w="full">
                    <Spacer />

                    <Flex w="full">
                      <Spacer />
                      <Box textAlign="right" color="brand.grayLight">
                        <Text>Current price</Text>
                        <Tag h={4} pr={0} bg="transparent">
                          <TagLabel bg="transparent">
                            {price / 10 ** 12}
                          </TagLabel>
                          <TagRightIcon as={AzeroIcon} />
                        </Tag>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>

                {!doOffer && (
                  <Flex
                    w="full"
                    alignItems="center"
                    borderColor="#343333"
                    px={4}
                    py={1}
                    borderWidth={2}
                    minH="4.75rem"
                  >
                    {!isBided && (
                      <>
                        <Button
                          spinnerPlacement="start"
                          isLoading={tnxStatus}
                          loadingText={`${tnxStatus?.status}`}
                          h={10}
                          maxW={32}
                          variant="solid"
                          onClick={placeOffer}
                        >
                          Make offer
                        </Button>
                        <Spacer />
                        <InputGroup
                          w={24}
                          bg="black"
                          h={10}
                          py={1}
                          color="black"
                          borderRadius="0"
                        >
                          <Input
                            bg="black"
                            color="white"
                            variant="unstyled"
                            my={1}
                            pl={3}
                            placeholder="0"
                            _placeholder={{
                              color: "brand.grayDark",
                              fontSize: "lg",
                            }}
                            onChange={({ target }) => {
                              setBidPrice(target.value);
                            }}
                            value={bidPrice}
                          />
                          <AzeroIcon size="1.5rem" m={2} />
                        </InputGroup>
                      </>
                    )}

                    {isBided && (
                      <>
                        <Button
                          spinnerPlacement="start"
                          isLoading={tnxStatus}
                          loadingText={`${tnxStatus?.status}`}
                          h={10}
                          maxW={32}
                          variant="solid"
                          onClick={removeBid}
                        >
                          Remove Bid
                        </Button>

                        <Spacer />
                        <Box textAlign="right" color="brand.grayLight">
                          <Text>Your offer</Text>
                          <Tag h={4} pr={0} bg="transparent">
                            <TagLabel bg="transparent">{bidPrice}</TagLabel>
                            <TagRightIcon as={AzeroIcon} />
                          </Tag>
                        </Box>
                      </>
                    )}
                  </Flex>
                )}
              </>
            )}
          </HStack>
        )}

        <Grid
          boxShadow="lg"
          my={2}
          maxH={{ base: "8rem", "2xl": "15rem" }}
          w="full"
          h="full"
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
                .map((item, idx) => {
                  return (
                    <GridItem w="100%" h="100%" key={idx}>
                      <Box
                        w="full"
                        textAlign="left"
                        alignItems="end"
                        bg="brand.semiBlack"
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
                            ></Heading>
                          </Box>
                          <Spacer />
                        </Flex>
                        <Flex w="full" color="#7AE7FF">
                          <Spacer />
                          <Text
                            fontStyle="italic"
                            fontSize={{ base: "0.875rem", "2xl": "1rem" }}
                          >
                            {Object.values(item)[0]}
                          </Text>
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
  );
};

export default NFTTabCollectible;
