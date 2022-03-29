import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";

export const CollectionCard = (props) => {
  const { avatar, name, desc, volume, backdrop } = props;
  return (
    <Box
      className="collection-card-hover"
      _hover={{
        bg: "brand.blue",
      }}
    >
      <Flex
        m="0.5"
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        minH="31.25rem"
      >
        <Image
          alt={backdrop}
          h={64}
          w="auto"
          maxH={64}
          objectFit="cover"
          src={backdrop}
          fallbackSrc="https://via.placeholder.com/390x260"
        />
        <Center
          rounded="full"
          w={16}
          h={16}
          mt={-8}
          p="-px"
          border="2px solid"
          borderColor="whiteAlpha.900"
        >
          <Image
            alt={avatar}
            w="full"
            h="full"
            rounded="full"
            objectFit="cover"
            src={avatar}
            fallbackSrc="https://via.placeholder.com/64"
          />
        </Center>
        <VStack pb={6} justifyContent="space-between" flexGrow="1">
          <Box mt="4">
            <Heading as="h4" size="md">
              {name}
            </Heading>
          </Box>
          <Text color="brand.grayLight" maxW={{ base: "unset", md: "20rem" }}>
            {desc}
          </Text>
          <Flex
            bg="blackAlpha.900"
            h={10}
            w={36}
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              src={AzeroIcon}
              h={5}
              w={5}
              mr={2}
              name="AzeroLogo"
              bg="transparent"
            />
            <Text>Volume {volume}m</Text>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};
