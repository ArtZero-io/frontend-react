import React, { useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
import { FiUpload, FiRefreshCw } from "react-icons/fi";
import marketplace_contract_calls from '../../../../utils/blockchain/marketplace_contract_calls';
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "../../../../utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "../../../../utils/blockchain/nft721-psp34-standard-calls";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import marketplace from "../../../../utils/blockchain/marketplace";
import BN from 'bn.js';
import { BN_BILLION, BN_THOUSAND } from "@polkadot/util";

const NFTTabInfo = ({ nft_detail, collection_detail, nft_contract_address, isSale = false }) => {
  const { api, currentAccount } = useSubstrateState();
  const [sale_price, setSalePrice] = useState(0);

  const listToken = async () => {
    console.log(nft_contract_address);
    console.log(sale_price);
    console.log(nft_detail.id);
    console.log(collection_detail);
    if (collection_detail.contractType == '2') {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        collection_detail.nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const ownerAddress = await nft721_psp34_standard_calls.getOwnerAddressByTokenId(currentAccount, nft_detail.id);
      console.log(ownerAddress);
      
      if (ownerAddress == currentAccount.address) {
        const is_allownce = await nft721_psp34_standard_calls.allowance(currentAccount, marketplace.CONTRACT_ADDRESS, nft_detail.id);
        const token_price = new BN(sale_price).mul(BN_BILLION).mul(BN_THOUSAND).toNumber();
        if (is_allownce) {
          await marketplace_contract_calls.list(currentAccount, nft_contract_address, nft_detail.id, token_price);
        } else {
          const is_approve = await nft721_psp34_standard_calls.approve(currentAccount, marketplace.CONTRACT_ADDRESS, nft_detail.id, true);
          if (is_approve) {
            await marketplace_contract_calls.list(currentAccount, nft_contract_address, nft_detail.id, token_price);
          }
        }
        
      } else {
        toast.error(`This token is not yours!`);
      }
      
    }
    
  }

  return (
    <HStack>
      <Avatar src={nft_detail.img} w={{ xl: "16rem" }} h={{ xl: "16rem" }} rounded="none"></Avatar>
      <VStack w="full" px={10} py={2}>
        <Box w="full">
          <Flex>
            <Heading fontSize="3xl">{nft_detail.name}</Heading>
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
            {nft_detail.name}
          </Heading>
        </Box>

        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={6}
        >
          {nft_detail.atts.map((item) => {
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
                  {/* <Flex w="full" textAlign="left">
                    <Spacer />
                    <Text color="brand.blue"> {item.value}</Text>
                  </Flex> */}
                </Box>
              </GridItem>
            );
          })}
        </Grid>

        {!isSale && (
          <Flex w="full" py={2} alignItems="center" justifyContent="start">
            {/* <Input
              flexGrow={1}
              id="price-azero"
              type="text"
              bg="black"
              placeholder="100"
              onChange={(val) => setSalePrice(val)}
            /> */}
            <Input
              flexGrow={1}
              id="price-use"
              type="text"
              bg="black"
              placeholder="100"
              onChange={({ target }) => setSalePrice(target.value)}
            />
            <Button ml={2} variant="solid" onClick={listToken}>
              Push for sale
            </Button>
          </Flex>
        )}
        {isSale && (
          <Flex w="full" py={2} alignItems="center" justifyContent="start">
            <Spacer />
            <Flex alignItems="center" justifyContent="start">
              <Text color="brand.grayLight">For Sale At</Text>

              <Text mx={2}>72.00</Text>
              <Avatar
                src={AzeroIcon}
                h={4}
                w={4}
                mx={1}
                name="AzeroLogo"
                bg="transparent"
              />
            </Flex>
            <Button ml={2} variant="solid">
              remove from sale
            </Button>
          </Flex>
        )}
      </VStack>
    </HStack>
  );
}

export default NFTTabInfo;

// const atts = [
//   { name: "Background", text: "Blue", value: "21.6%" },
//   { name: "Fur / Skin", text: "Albino / Blue", value: "21.6%" },
//   { name: "Head", text: "Sun Hat  ", value: "21.6%" },
//   { name: "Mouth", text: "Banana", value: "21.6%" },
//   { name: "generation", text: "1", value: "21.6%" },
//   { name: "Background", text: "Blue", value: "21.6%" },
// ];
