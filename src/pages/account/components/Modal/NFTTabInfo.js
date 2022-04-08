import React from "react";
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

function NFTTabInfo({ address, isSale = true }) {
  return (
    <HStack>
      <Avatar w={{ xl: "16rem" }} h={{ xl: "16rem" }} rounded="none"></Avatar>
      <VStack w="full" px={10} py={2}>
        <Box w="full">
          <Flex>
            <Heading fontSize="3xl">Degen Ape #1234 {address}</Heading>
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
            Degen Ape #1234
          </Heading>
        </Box>

        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={6}
        >
          {atts.map((item) => {
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
                        {item.text}
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

        {!isSale && (
          <Flex w="full" py={2} alignItems="center" justifyContent="start">
            <Input
              flexGrow={1}
              id="price-azero"
              type="text"
              bg="black"
              placeholder="100"
            />
            <Input
              flexGrow={1}
              id="price-use"
              type="text"
              bg="black"
              placeholder="100"
            />
            <Button ml={2} variant="solid">
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

const atts = [
  { name: "Background", text: "Blue", value: "21.6%" },
  { name: "Fur / Skin", text: "Albino / Blue", value: "21.6%" },
  { name: "Head", text: "Sun Hat  ", value: "21.6%" },
  { name: "Mouth", text: "Banana", value: "21.6%" },
  { name: "generation", text: "1", value: "21.6%" },
  { name: "Background", text: "Blue", value: "21.6%" },
];
