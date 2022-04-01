import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  VStack,
  Input,
  useClipboard,
  Badge,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import AzeroIcon from "@theme/assets/icon/Azero.png";

function TabGeneral() {
  const [address] = React.useState(
    "8jJPfNyVoKTb4E589WHErgUcJncyKcJ9SQasMw6j5Zkz"
  );
  const { hasCopied, onCopy } = useClipboard(address);

  return (
    <>
      <VStack w="full" pt={20} pb={10} maxW="container.xl">
        <Box w="full" textAlign="left" mb={6}>
          <Heading fontSize="3xl">DASHBOARD </Heading>
          <Flex alignItems="center">
            <Button onClick={onCopy} px={0} my={3} ml={0} bg="transparent">
              <Input
                value={address}
                px={2}
                h={8}
                mx={0}
                minW={"sm"}
                isReadOnly
                cursor="pointer"
                color="brand.blue"
                borderWidth={1}
                borderColor="brand.blue"
              />
            </Button>
            {hasCopied ? <Badge colorScheme="green">Copied</Badge> : ""}
            <Spacer />
          </Flex>
        </Box>

        <Grid
          w="full"
          templateColumns="repeat(auto-fill, minmax(min(100%, 20rem), 1fr))"
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
                <Box
                  w="full"
                  textAlign="left"
                  bg="brand.grayDark"
                  px={4}
                  py={3}
                >
                  <Flex w="full">
                    <Text color="brand.grayLight">
                      <Text>{item.name}</Text>
                      <Flex alignItems="center">
                        <Heading
                          fontSize="5xl"
                          color="white"
                          mt={2}
                          fontFamily="DS-Digital"
                        >
                          {item.text}
                        </Heading>
                        <Avatar
                          src={AzeroIcon}
                          h={6}
                          w={6}
                          ml={2}
                          mt={2}
                          name="AzeroLogo"
                          bg="transparent"
                        />
                      </Flex>
                    </Text>
                    <Spacer />
                  </Flex>
                  <Flex w="full" textAlign="left">
                    <Spacer />
                    <Text color="brand.blue"> $ {item.value}</Text>
                  </Flex>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </VStack>

      <HStack h="full" mx={10} p={10} maxW="container.xl" bg="black">
        <Avatar w={{ xl: "16rem" }} h={{ xl: "16rem" }} rounded="none"></Avatar>
        <VStack px={10} py={2} textAlign="left">
          <Flex w="full">
            <Heading fontSize="3xl" display="flex" w="full">
              Stake your Praying Mantis Predator to reduce your fees to reduce
              your fees
            </Heading>
            <Spacer />
            <Text
              p={1}
              h={8}
              w={20}
              mx={0}
              ml={10}
              isReadOnly
              cursor="pointer"
              color="brand.blue"
              borderWidth={1}
              borderColor="brand.blue"
            >
              Fee: 3%
            </Text>
          </Flex>
          <Flex w="full">
            <Text mt={4} mb={8}>
              You currently have 0 badgers staked.
            </Text>
            <Spacer />
          </Flex>

          <Flex w="full" alignItems="center">
            <Button variant="buy-sell">Stake now</Button>
            <Button variant="filled" bg="transparent">
              more information
            </Button>
          </Flex>
        </VStack>
      </HStack>
    </>
  );
}

export default TabGeneral;

const atts = [
  { name: "Min wallet value", text: "82.00", value: "21.6" },
  { name: "Min wallet value", text: "82.00", value: "21.6" },
  { name: "Min wallet value", text: "82.00", value: "21.6" },
  { name: "Min wallet value", text: "82.00", value: "21.6" },
  { name: "Min wallet value", text: "82.00", value: "21.6" },
  { name: "Min wallet value", text: "82.00", value: "21.6" },
];
