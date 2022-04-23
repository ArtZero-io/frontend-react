import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Skeleton,
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
import { IPFS_BASE_URL } from "@constants/index";

export const CollectionCard = ({
  headerImage,
  avatarImage,
  name,
  description,
  volume,
  isActive,
  variant,
}) => {
  return (
    <Box h="full" borderWidth={"2px"} _hover={{ borderColor: "brand.blue" }}>
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        shadow="lg"
        minH="30rem"
        h="full"
      >
        <Image
          alt={`header-img-${name}`}
          h={64}
          w="full"
          maxH={64}
          minH={"20rem"}
          objectFit="cover"
          src={`${IPFS_BASE_URL}/${headerImage}`}
          fallback={<Skeleton w="full" h="full" minH={"20rem"} />}
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
            alt={`avatar-img-${name}`}
            w="full"
            h="full"
            rounded="full"
            objectFit="cover"
            src={`${IPFS_BASE_URL}/${avatarImage}`}
            fallbackSrc="https://via.placeholder.com/84"
            fallback={<Skeleton w={16} h={16} rounded="full" />}
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
            <Heading size="h6">{name}</Heading>
          </Box>

          <Text
            noOfLines={[1, 2]}
            maxW={{ base: "unset", md: "20rem" }}
            minH={"3rem"}
          >
            {description}
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
                Volume {volume || 0} m
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
