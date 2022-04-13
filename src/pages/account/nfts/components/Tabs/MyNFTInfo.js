import React from "react";
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

function NFTTabInfo({ selectedNFT }) {
  const { name, description, isListed, isBid, attributes, image } = selectedNFT;
  console.log("isListed", isListed);
  return (
    <HStack>
      <Image
        boxShadow="base"
        boxSize="30rem"
        alt=""
        objectFit="cover"
        src={image}
      />

      <VStack maxH="30rem" w="full" pl={10} py={0}>
        <Box w="full">
          <Flex>
            <Heading size="h4"> {name}</Heading>
            <Spacer />
          </Flex>
          <Heading size="h6" py={3} color="brand.grayLight">
            {description}
          </Heading>
        </Box>

        <Grid overflowY='auto'
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 11rem), 1fr))"
          gap={5}
        >
          {attributes?.map((item) => {
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
                        {item.value}
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

        {isListed && !isListed?.status && (
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
              />
            </InputGroup>

            <Button ml={2} variant="solid">
              Push for sale
            </Button>
          </Flex>
        )}
        {isListed && isListed?.status && (
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
                72.00
              </Text>
              <AzeroIcon />
            </Flex>
            <Button ml={2} variant="solid">
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
