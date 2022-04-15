import React, { useState } from "react";
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

function NFTTabInfo({
  nft_contract_address,
  selectedNFT,
  nft_detail,
  collection_detail,
}) {
  const { name, description, isListed, isBid, atts, img, price } = selectedNFT;
  const { api, currentAccount } = useSubstrateState();
  const [sale_price, setSalePrice] = useState(0);

  const listToken = async () => {
    if (collection_detail?.contractType === "2") {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        collection_detail.nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const ownerAddress =
        await nft721_psp34_standard_calls.getOwnerAddressByTokenId(
          currentAccount,
          nft_detail.id
        );

      if (ownerAddress == currentAccount.address) {
        const is_allownce = await nft721_psp34_standard_calls.allowance(
          currentAccount,
          marketplace.CONTRACT_ADDRESS,
          nft_detail.id
        );

        if (is_allownce) {
          await marketplace_contract_calls.list(
            currentAccount,
            nft_contract_address,
            nft_detail.id,
            sale_price
          );
        } else {
          const is_approve = await nft721_psp34_standard_calls.approve(
            currentAccount,
            marketplace.CONTRACT_ADDRESS,
            nft_detail.id,
            true
          );
          if (is_approve) {
            await marketplace_contract_calls.list(
              currentAccount,
              nft_contract_address,
              nft_detail.id,
              sale_price
            );
          }
        }
      } else {
        toast.error(`This token is not yours!`);
      }
    }
  };

  const unlistToken = async () => {
    await marketplace_contract_calls.unlist(
      currentAccount,
      nft_contract_address,
      nft_detail.id
    );
  };

  return (
    <HStack>
      <Image
        boxShadow="lg"
        boxSize="30rem"
        alt="nft-img"
        objectFit="cover"
        src={img}
        fallbackSrc="https://via.placeholder.com/480"
      />

      <VStack
        minH="30rem"
        w="full"
        pl={10}
        py={0}
        justifyContent="space-between"
      >
        <Box w="full">
          <Flex>
            <Heading size="h4"> {name}</Heading>
            <Spacer />
          </Flex>
          <Heading size="h6" py={3} color="brand.grayLight">
            {description}
          </Heading>
        </Box>

        <Grid
          overflowY="auto"
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={5}
        >
          {atts?.map((item) => {
            return (
              <GridItem
                id="abc"
                w="100%"
                h="100%"
                _hover={{ bg: "brand.blue" }}
              >
                <Box w="full" textAlign="left" bg="#171717" px={4} py={2}>
                  <Flex w="full">
                    <Text color="brand.grayLight">
                      <Text>{item.trait_type}</Text>
                      <Heading size="h6" isTruncated mt={1}>
                        {item.name}
                      </Heading>
                    </Text>
                    <Spacer />
                  </Flex>
                  <Flex w="full" textAlign="left">
                    <Spacer />
                    <Text color="brand.blue"> {item.value}</Text>
                  </Flex>
                </Box>
              </GridItem>
            );
          })}
        </Grid>

        {!isListed && (
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
                variant="unstyled"
                m={0}
                h={14}
                pl={5}
                bg="black"
                placeholder="100"
                _placeholder={{
                  color: "#888",
                  fontSize: "lg",
                }}
              />
              <InputRightElement bg="transparent" h={14} w={16}>
                <AzeroIcon />
              </InputRightElement>
            </InputGroup>

            <InputGroup
              maxW={64}
              mx="auto"
              mr={2}
              w="full"
              bg="black"
              h={14}
              py={0}
              color="#fff "
              borderRadius="0"
            >
              <InputRightElement bg="transparent" h={14} w={16}>
                $
              </InputRightElement>
              <Input
                variant="unstyled"
                my={0}
                h={14}
                pl={5}
                bg="black"
                placeholder="100"
                _placeholder={{
                  color: "#888",
                  fontSize: "lg",
                }}
                onChange={({ target }) => setSalePrice(target.value)}
              />
            </InputGroup>

            <Button ml={2} variant="solid" onClick={listToken}>
              Push for sale
            </Button>
          </Flex>
        )}
        {isListed && (
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
        {isBid?.status && (
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
