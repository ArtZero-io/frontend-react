import React, { useEffect, useState } from "react";
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
  Input,
  Image,
  InputGroup,
  InputRightElement,
  Progress,
} from "@chakra-ui/react";
// import { FiUpload, FiRefreshCw } from "react-icons/fi";
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

function NFTTabInfo({
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
  const [isAllownceMarketplaceContract, setIsAllownceMarketplaceContract] =
    useState(false);

  useEffect(async () => {
    await checkAllowMarketplaceContract();
  }, [currentAccount]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAllowMarketplaceContract = async () => {
    if (contractType === "2") {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const isAllownceMarketplaceContract =
        await nft721_psp34_standard_calls.allowance(
          currentAccount,
          currentAccount.address,
          marketplace_contract.CONTRACT_ADDRESS,
          { u64: tokenID }
        );
      console.log(
        "isAllownceMarketplaceContract",
        isAllownceMarketplaceContract
      );
      setIsAllownceMarketplaceContract(isAllownceMarketplaceContract);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await checkAllowMarketplaceContract();
  }, [checkAllowMarketplaceContract, currentAccount]);

  const listToken = async () => {
    if (contractType === 2) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);

      if (owner === currentAccount.address) {
        await marketplace_contract_calls.list(
          currentAccount,
          nftContractAddress,
          { u64: tokenID },
          askPrice
        );
      } else {
        toast.error(`This token is not yours!`);
      }
    }
  };

  const unlistToken = async () => {
    await marketplace_contract_calls.unlist(
      currentAccount,
      nftContractAddress,
      { u64: tokenID }
    );
  };

  const approveMarketplaceContract = async () => {
    if (owner === currentAccount.address) {
      const is_approve = await nft721_psp34_standard_calls.approve(
        currentAccount,
        marketplace.CONTRACT_ADDRESS,
        { u64: tokenID },
        true
      );
      if (is_approve) {
        setIsAllownceMarketplaceContract(true);
      }
    } else {
      toast.error(`This token is not yours!`);
    }
  };

  return (
    <HStack>
      <Image
        boxShadow="lg"
        boxSize="26rem"
        alt="nft-img"
        objectFit="cover"
        src={`${IPFS_BASE_URL}/${avatar}`}
        fallbackSrc="https://via.placeholder.com/480"
      />
      {console.log("is_for_sale", is_for_sale)}
      <VStack
        minH="30rem"
        w="full"
        pl={10}
        py={0}
        justifyContent="start"
        alignItems={"start"}
      >
        <Box w="full">
          <Flex>
            <Heading size="h4">{nftName}</Heading>
            <Spacer />
          </Flex>
          <Heading size="h6" py={3} color="brand.grayLight">
            {description} <br></br>
            {owner}
          </Heading>
        </Box>

        <Grid
          pr={"0.25rem"}
          overflowY="auto"
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={5}
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
        {console.log(
          "isAllownceMarketplaceContract:",
          isAllownceMarketplaceContract
        )}

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
                      p={5}
                      mb={3}
                    >
                      <Flex w="full" mb={3}>
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
        {!is_for_sale && !isAllownceMarketplaceContract ? (
          <Flex w="full" py={2} alignItems="center" justifyContent="start">
            <Spacer />

            <Button ml={2} variant="solid" onClick={approveMarketplaceContract}>
              Approve (You need to approve permission for marketplace contract)
            </Button>
          </Flex>
        ) : (
          ""
        )}

        {isAllownceMarketplaceContract && !is_for_sale && (
          <Flex
            w="full"
            py={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <InputGroup
              maxW={64}
              mr={2}
              px={0}
              w="full"
              bg="black"
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

            <Spacer />
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
                {price}
              </Text>
              <AzeroIcon />
            </Flex>
            <Button ml={2} variant="solid" onClick={unlistToken}>
              remove from sale
            </Button>
          </Flex>
        )}
        {isAllownceMarketplaceContract && isOffered?.status && (
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
      </VStack>
    </HStack>
  );
}

export default NFTTabInfo;
