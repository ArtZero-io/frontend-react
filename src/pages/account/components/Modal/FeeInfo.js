/* eslint-disable no-unused-vars */
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
import { FiUpload, FiRefreshCw } from "react-icons/fi";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import marketplace from "@utils/blockchain/marketplace";

const FeeInfoModal = ({
  nft_detail,
  collection_detail,
  nft_contract_address,
  isSale = false,
}) => {
  const { api, currentAccount } = useSubstrateState();
  const [sale_price, setSalePrice] = useState(0);

  const listToken = async () => {
    console.log(nft_contract_address);
    console.log(sale_price);
    console.log(nft_detail.id);
    console.log(collection_detail);
    if (Number(collection_detail.contractType) === 2) {
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
      console.log(ownerAddress);

      if (ownerAddress === currentAccount.address) {
        const is_allownce = await nft721_psp34_standard_calls.allowance(
          currentAccount,
          currentAccount.address,
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
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button
        variant="filled"
        bg="transparent"
        color="#fff"
        ml={3}
        onClick={() => onOpen()}
      >
        more information
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          position="relative"
          bg="brand.semiBlack"
          p={{ base: "3", "2xl": "6" }}
          borderRadius="0"
        >
          <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
          />
          <ModalHeader textAlign="center">
            <Heading size="h4" my={3}>
              Trade discount for Artzero NFT staked
            </Heading>
          </ModalHeader>

          <ModalBody>
            <Grid
              w="full"
              templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
              gap={6}
            >
              <Box
                w="full"
                textAlign="center"
                px={4}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full">
                  <Heading size="h5" mb={3} p={0}>
                    Stakers
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Flex align="center" justify="center" borderWidth={1}>
                        <Box
                          minH={{ base: "4.5rem", "2xl": "5rem" }}
                          py={{ base: "4", "2xl": "6" }}
                        >
                          <Heading size="h5" minW={"5rem"}>
                            {item.qty} NFTs
                          </Heading>
                        </Box>
                      </Flex>
                    </React.Fragment>
                  ))}
                </Flex>
              </Box>
              <Box
                w="full"
                textAlign="left"
                px={4}
                py={{ base: "1", "2xl": "4" }}
              >
                <Flex direction="column" w="full" align="center">
                  <Heading size="h5" mb={3}>
                    Trade discount
                  </Heading>
                  {feeChart.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Flex borderWidth={1} w="full" pl={10}>
                        <Box minH={{ base: "4.5rem", "2xl": "5rem" }} mr={3}>
                          <Text
                            fontFamily="DS-Digital"
                            fontSize="5xl"
                            color="#fff"
                          >
                            {item.percent}%
                          </Text>
                        </Box>
                        <Flex
                          direction="column"
                          align="start"
                          justify="center"
                          pr={3}
                        >
                          <Heading size="h6" color="#7AE7FF" mb="2">
                            Off
                          </Heading>
                          <Heading size="h6">Trade Fee</Heading>
                        </Flex>
                      </Flex>
                    </React.Fragment>
                  ))}
                </Flex>
              </Box>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeeInfoModal;

const feeChart = [
  {
    qty: 1,
    percent: 30,
  },
  {
    qty: 5,
    percent: 50,
  },
  {
    qty: 7,
    percent: 66,
  },
  {
    qty: 9,
    percent: 80,
  },
  {
    qty: 20,
    percent: 90,
  },
];
