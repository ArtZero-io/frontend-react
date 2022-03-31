import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";

export const NFTCard = (props) => {
  const { name, askPrice, bidPrice, img } = props;
  return (
    <Box
      // style={{
      //   position: "absolute",
      //   transitionProperty: "all",
      //   transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
      //   transitionDuration: "0.5s",
      // }}
    >
      <Flex
        m="0.5"
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        minH="25rem"
      >
        <Image
          alt={img}
          objectFit="cover"
          src={img}
          minH={18}
          fallbackSrc="https://via.placeholder.com/390x260"
        />

        <VStack
          pb={4}
          justifyContent="space-between"
          alignItems="start"
          flexGrow="1"
        >
          <Box mt="4">
            <Heading size="md" fontWeight="400">
              {name}
            </Heading>
          </Box>

          <Flex w="full">
            <Flex
              bg="blackAlpha.900"
              h={10}
              px={3}
              alignItems="center"
              justifyContent="center"
            >
              <Text>{askPrice}</Text>
              <Avatar
                src={AzeroIcon}
                h={5}
                w={5}
                ml={2}
                name="AzeroLogo"
                bg="transparent"
              />
            </Flex>
            <Spacer />
            <Flex w="full">
              <Spacer />
              <Text textAlign="right" color="brand.grayLight" mt="5">
                Offer
                <Text>
                  <Flex pl={3} alignItems="center" justifyContent="center">
                    <Text color="white">{bidPrice}</Text>
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
        </VStack>
      </Flex>
    </Box>
  );
};
