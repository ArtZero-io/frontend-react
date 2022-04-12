import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.png";
import { MdHighlightOff, MdCheckCircle } from "react-icons/md";

export const CollectionCard = (props) => {
  const { avatar, name, desc, volume, backdrop, isActive, variant } = props;
  return (
    <Box>
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
          borderColor="white "
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
        <VStack
          pb={6}
          justifyContent="space-between"
          flexGrow="1"
          w="full"
          px={4}
        >
          <Box mt="4">
            <Heading size="h4"> {name}</Heading>
          </Box>
          <Text maxW={{ base: "unset", md: "20rem" }}>{desc}</Text>

          <Flex
            w={variant === "my-collection" ? "full" : 36}
            alignItems="center"
          >
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
              <Text>Volume {volume} m</Text>
            </Flex>

            {variant === "my-collection" && (
              <>
                <Spacer />
                {isActive && (
                  <Flex color="brand.blue">
                    <Icon as={MdCheckCircle} w={6} h={6} color="brand.blue" />
                    <Text ml={1}>Active</Text>
                  </Flex>
                )}
                {!isActive && (
                  <Flex color="brand.grayLight">
                    <Icon
                      as={MdHighlightOff}
                      w={6}
                      h={6}
                      color="brand.grayLight"
                    />
                    <Text ml={1}>Inactive</Text>
                  </Flex>
                )}
              </>
            )}
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};
