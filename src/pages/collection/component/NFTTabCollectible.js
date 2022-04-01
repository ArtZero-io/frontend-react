/* eslint-disable */

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
  Link,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
import { FiUpload, FiRefreshCw } from "react-icons/fi";

function NFTTabCollectible({ address }) {
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
          <Text>
            Owned by <Link>8jJPfNyVoKTb4E589WHErgUcJncyKcJ9SQasMw6j5Zkz</Link>
          </Text>
        </Box>
        <HStack w="full" py={2}>
          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={3}
            borderWidth={2}
          >
            <Button variant="buy-sell">Buy now</Button>
            <Spacer />
            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                Current price
                <Text>
                  <Flex pl={3} alignItems="center" justifyContent="center">
                    <Text color="brand.blue">123</Text>
                    <Avatar
                      src={AzeroIcon}
                      h={5}
                      w={5}
                      ml={2}
                      name="AzeroLogo"
                      bg="transparent"
                    />
                  </Flex>
                </Text>
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="full"
            alignItems="center"
            borderColor="#343333"
            px={4}
            py={3}
            borderWidth={2}
          >
            <Button variant="buy-sell">Make offer</Button>
            <Spacer />
            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight">
                Current offer
                <Text>
                  <Flex pl={3} alignItems="center" justifyContent="center">
                    <Text color="brand.blue">123</Text>
                    <Avatar
                      src={AzeroIcon}
                      h={5}
                      w={5}
                      ml={2}
                      name="AzeroLogo"
                      bg="transparent"
                    />
                  </Flex>
                </Text>
              </Text>
            </Flex>
          </Flex>
        </HStack>
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
      </VStack>
    </HStack>
  );
}

export default NFTTabCollectible;

const atts = [
  { name: "Background", text: "Blue", value: "21.6%" },
  { name: "Fur / Skin", text: "Albino / Blue", value: "21.6%" },
  { name: "Head", text: "Sun Hat  ", value: "21.6%" },
  { name: "Mouth", text: "Banana", value: "21.6%" },
  { name: "generation", text: "1", value: "21.6%" },
  { name: "Background", text: "Blue", value: "21.6%" },
];
