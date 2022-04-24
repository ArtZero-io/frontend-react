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
  const [isAllownceMarketplaceContract, setIsAllownceMarketplaceContract] = useState(false);
  
  useEffect(async () => {
    await checkAllowMarketplaceContract();
  }, [currentAccount]);

  const checkAllowMarketplaceContract = async () => {
    if (contractType == "2") {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        nftContractAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const isAllownceMarketplaceContract = await nft721_psp34_standard_calls.allowance(
        currentAccount, currentAccount.address, marketplace_contract.CONTRACT_ADDRESS, { "u64": tokenID }
        );
        console.log('isAllownceMarketplaceContract', isAllownceMarketplaceContract);
      setIsAllownceMarketplaceContract(isAllownceMarketplaceContract);
    }
  }

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
          {'u64': tokenID},
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
      {'u64': tokenID}
    );
  };

  const approveMarketplaceContract = async () => {
    if (owner == currentAccount.address) {
      const is_approve = await nft721_psp34_standard_calls.approve(
        currentAccount,
        marketplace.CONTRACT_ADDRESS,
        {"u64": tokenID},
        true
      );
      if (is_approve) {
        setIsAllownceMarketplaceContract(true);
      }
    } else {
      toast.error(`This token is not yours!`);
    }
    
  }

  return (
    <HStack>
      <Image
        boxShadow="lg"
        boxSize="30rem"
        alt="nft-img"
        objectFit="cover"
        src={`${IPFS_BASE_URL}/${avatar}`}
        fallbackSrc="https://via.placeholder.com/480"
      />
  {console.log('is_for_sale', is_for_sale)}
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
          overflowY="auto"
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={5}
        >
          {attrsList?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <GridItem
                  id="abc"
                  w="100%"
                  h="100%"
                  _hover={{ bg: "brand.blue" }}
                >
                  <Box w="full" textAlign="left" bg="#171717" px={4} py={2}>
                    <Flex w="full">
                      <Text color="brand.grayLight">
                        <Text>{Object.keys(item)[0]}</Text>
                        <Heading size="h6" isTruncated mt={1}>
                          {Object.values(item)[0]}
                        </Heading>
                      </Text>
                      <Spacer />
                    </Flex>
                    <Flex w="full" textAlign="left">
                      <Spacer />
                      <Text color="brand.blue"> </Text>
                    </Flex>
                  </Box>
                </GridItem>
              </React.Fragment>
            );
          })}
        </Grid>
          {console.log('isAllownceMarketplaceContract:', isAllownceMarketplaceContract)}

        { (!isAllownceMarketplaceContract && owner == currentAccount.address) ? (<Flex w="full" py={2} alignItems="center" justifyContent="start">
            <Spacer />
            
            <Button ml={2} variant="solid" onClick={approveMarketplaceContract}>
              Approve (You need to approve permission for marketplace contract)
            </Button>
            
          </Flex>) : '' }
        {(isAllownceMarketplaceContract) && !is_for_sale && (
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

            {/* <InputGroup
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
            </InputGroup> */}
            <Spacer />
            <Button ml={2} variant="solid" onClick={listToken}>
              Push for sale
            </Button>
          </Flex>
        )}
        
        {(owner == marketplace.CONTRACT_ADDRESS) && is_for_sale && (
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
                {price / (10 ** 12)}
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
