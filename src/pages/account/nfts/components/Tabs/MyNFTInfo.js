import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Progress,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";

import AzeroIcon from "@theme/assets/icon/Azero.js";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import marketplace from "@utils/blockchain/marketplace";
import { IPFS_BASE_URL } from "@constants/index";
import marketplace_contract from "@utils/blockchain/marketplace";
import { createLevelAttribute } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../../../components/Loader/CommonLoader";
import { getCachedImage } from "@utils";

function MyNFTTabInfo({
  avatar,
  nftName,
  description,
  attrsList,
  is_for_sale,
  price,
  isOffered,
  tokenID,
  owner,
  nftContractAddress,
  contractType,
}) {
  const { api, currentAccount } = useSubstrateState();
  const [askPrice, setAskPrice] = useState(10);
  const [isAllowanceMarketplaceContract, setIsAllowanceMarketplaceContract] =
    useState(false);
  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  useEffect(() => {
    const checkAllowMarketplaceContract = async () => {
      if (Number(contractType) === 2) {
        const nft721_psp34_standard_contract = new ContractPromise(
          api,
          nft721_psp34_standard.CONTRACT_ABI,
          nftContractAddress
        );

        nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);

        const isAllowance = await nft721_psp34_standard_calls.allowance(
          currentAccount,
          currentAccount?.address,
          marketplace_contract.CONTRACT_ADDRESS,
          { u64: tokenID },
          dispatch
        );

        setIsAllowanceMarketplaceContract(isAllowance);
      }
    };

    checkAllowMarketplaceContract();
  }, [
    isAllowanceMarketplaceContract,
    currentAccount,
    contractType,
    api,
    nftContractAddress,
    tokenID,
    dispatch,
  ]);

  const listToken = async () => {
    // if (Number(contractType) === 2) {
    if (owner === currentAccount?.address) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );

      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const isAllowance = await nft721_psp34_standard_calls.allowance(
        currentAccount,
        currentAccount?.address,
        marketplace_contract.CONTRACT_ADDRESS,
        { u64: tokenID },
        dispatch
      );
      if (!isAllowance) {
        toast("Approve...");
        await nft721_psp34_standard_calls.approve(
          currentAccount,
          marketplace.CONTRACT_ADDRESS,
          { u64: tokenID },
          true,
          dispatch
        );
      }
      toast("Listing ...");
      await marketplace_contract_calls.list(
        currentAccount,
        nftContractAddress,
        { u64: tokenID },
        askPrice,
        dispatch
      );
    } else {
      toast.error(`This token is not yours!`);
    }
    // }
  };

  const unlistToken = async () => {
    await marketplace_contract_calls.unlist(
      currentAccount,
      nftContractAddress,
      { u64: tokenID },
      dispatch
    );
  };

  // const approveMarketplaceContract = async () => {
  //   if (owner === currentAccount?.address) {
  // const is_approve =

  //     if (is_approve) {
  //       setIsAllowanceMarketplaceContract(true);
  //     }
  //   } else {
  //     toast.error(`This token is not yours!`);
  //   }
  // };

  const gridSize = useBreakpointValue({ base: `8rem`, "2xl": `11rem` });
  return (
    <Flex h="full">
      <Box minW={{ base: "20rem", "2xl": "30rem" }} bg="#372648">
        <Image
          w="full"
          h="full"
          boxShadow="lg"
          alt="nft-img"
          objectFit="cover"
          src={
            avatar
              ? getCachedImage(
                  avatar,
                  500,
                  IPFS_BASE_URL + "/" + avatar.replace("ipfs://", "")
                )
              : ""
          }
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
            <Spacer />
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
        </Box>

        <Grid
          boxShadow="lg"
          mb={2}
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
                .map((item, idx) => {
                  return (
                    <Fragment key={idx}>
                      <GridItem w="100%" h="100%">
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
                                // minH='2.5rem'
                                isTruncated
                                maxW={"10rem"}
                                fontSize={{ base: "0.875rem", "2xl": "1rem" }}
                              ></Heading>
                            </Box>
                            <Spacer />
                          </Flex>
                          <Flex w="full" color="#7AE7FF">
                            <Spacer />
                            <Text fontStyle="italic">
                              {Object.values(item)[0]}
                            </Text>
                          </Flex>
                        </Box>
                      </GridItem>
                    </Fragment>
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

        {tnxStatus ? (
          <CommonLoader
            addText={`${tnxStatus?.status}`}
            size="md"
            maxH={"4.125rem"}
          />
        ) : (
          <>
            {/* {!is_for_sale && !isAllowanceMarketplaceContract ? (
              <Flex w="full" py={2} alignItems="center" justifyContent="start">
                <Spacer />
                <Text>
                  (You need to approve permission for marketplace contract)
                </Text>
                <Button
                  ml={2}
                  variant="solid"
                  onClick={approveMarketplaceContract}
                >
                  Approve
                </Button>
              </Flex>
            ) : (
              ""
            )} */}

            {!is_for_sale && (
              <Flex
                w="full"
                py={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Spacer />
                <InputGroup
                  maxW={32}
                  mr={2}
                  px={0}
                  w="full"
                  bg="brand.semiBlack"
                  h={14}
                  py={0}
                  color="#fff "
                  borderRadius="0"
                >
                  <Input
                    value={askPrice}
                    onChange={({ target }) => setAskPrice(target.value)}
                    m={0}
                    h={14}
                    pl={5}
                    bg="black"
                    variant="unstyled"
                    placeholder="10"
                    _placeholder={{
                      color: "#888",
                      fontSize: "lg",
                    }}
                  />
                  <InputRightElement bg="transparent" h={14} w={16}>
                    <AzeroIcon />
                  </InputRightElement>
                </InputGroup>
                <Button ml={2} variant="solid" onClick={listToken}>
                  Push for sale
                </Button>
              </Flex>
            )}

            {owner === marketplace.CONTRACT_ADDRESS && is_for_sale && (
              <Flex w="full" py={2} alignItems="center" justifyContent="start">
                <Spacer />
                <Flex
                  alignItems="center"
                  justifyContent="start"
                  fontSize="lg"
                  mr={3}
                >
                  <Text color="brand.grayLight">For Sale At</Text>

                  <Text color="#fff" mx={2}>
                    {price / 10 ** 12}
                  </Text>
                  <AzeroIcon />
                </Flex>
                <Button ml={2} variant="solid" onClick={unlistToken}>
                  remove from sale
                </Button>
              </Flex>
            )}

            {isAllowanceMarketplaceContract && isOffered?.status && (
              <Flex w="full" py={2} alignItems="center" justifyContent="start">
                <Spacer />
                <Flex
                  alignItems="center"
                  justifyContent="start"
                  fontSize="lg"
                  mr={3}
                >
                  <Text color="brand.grayLight">My Offer</Text>

                  <Text color="#fff" mx={2}>
                    22.22
                  </Text>
                  <AzeroIcon />
                </Flex>
                <Button ml={2} variant="solid">
                  Cancel Offer
                </Button>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default MyNFTTabInfo;
