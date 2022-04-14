import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

import ActiveIcon from "@theme/assets/icon/Active.js";
import InActiveIcon from "@theme/assets/icon/InActive.js";
import AzeroIcon from "@theme/assets/icon/Azero.js";
export const CollectionCard = (props) => {
  const { avatar, name, desc, volume, backdrop, isActive = true, variant } = props;
  return (
    <Box>
      <Flex
        m="0.5"
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        shadow="lg"
        minH="30rem"
        minW={{ base: "auto", "2xl": "24.5rem" }}
      >
        <Image
          alt={backdrop}
          h={64}
          w="full"
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
            <Heading size="h6"> {name}</Heading>
          </Box>
          <Text noOfLines={[1,3]} maxW={{ base: "unset", md: "20rem" }}>
            {desc}
          </Text>

          <Flex
            w={variant === "my-collection" ? "full" : 36}
            alignItems="center"
          >
            <Tag>
              <TagLeftIcon>
                <AzeroIcon fill={isActive ? "#7AE7FF" : "#888"} />
              </TagLeftIcon>
              <TagLabel color={isActive ? "#fff" : "#888"}>
                Volume {volume} m
              </TagLabel>
            </Tag>

            {variant === "my-collection" && (
              <>
                <Spacer />

                {isActive && (
                  <Tag variant="active">
                    <TagLeftIcon as={ActiveIcon} />
                    <TagLabel>Active</TagLabel>
                  </Tag>
                )}
                {!isActive && (
                  <Tag variant="inActive">
                    <TagLeftIcon as={InActiveIcon} />
                    <TagLabel>Inactive</TagLabel>
                  </Tag>
                )}
              </>
            )}
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};
