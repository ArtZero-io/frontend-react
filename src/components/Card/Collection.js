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
import process from "process";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export const CollectionCard = ({
  headerImage,
  avatarImage,
  name,
  description,
  volume,
  isActive,
  variant,
}) => {
  const getCollectionImage = (imageHash, size) => {
    const callbackUrl = `${IPFS_BASE_URL}/${imageHash}`;
    return (
      baseURL +
      "/getImage?input=" +
      imageHash +
      "&size=" +
      size +
      "&url=" +
      callbackUrl
    );
  };

  return (
    <Box
      className="my-collection-card"
      h="full"
      w="full"
      mx="auto"
      maxW="24.5625rem"
      borderColor="transparent"
      borderWidth={"2px"}
      _hover={{ borderColor: "brand.blue" }}
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        bg="brand.grayDark"
        shadow="lg"
        h="full"
      >
        <Box
          pos="relative"
          width="full"
          h={"16.25rem"}
          sx={{
            ".my-collection-card:hover &": {
              _before: {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "full",
                height: "6rem",
                backgroundImage:
                  "linear-gradient(180deg, #7ae7ff00 25%, #7AE7FF 100%)",
              },
            },
          }}
        >
          <Image
            alt={`header-img-${name}`}
            w="full"
            h={"16.25rem"}
            objectFit="cover"
            src={getCollectionImage(headerImage, 500)}
            fallback={<Skeleton w="full" h="full" maxH={"16.25rem"} />}
          />
        </Box>

        <Center
          rounded="full"
          w={16}
          h={16}
          mt={-8}
          p="-px"
          border="2px solid white"
          filter="drop-shadow(0px 4px 4px #ffffff25)"
        >
          <Image
            alt={`avatar-img-${name}`}
            w="full"
            h="full"
            rounded="full"
            objectFit="cover"
            src={getCollectionImage(avatarImage, 100)}
            fallback={<Skeleton w={16} h={16} rounded="full" />}
          />
        </Center>

        <VStack
          pb={6}
          justifyContent="space-between"
          flexGrow="1"
          w="full"
          px={5}
        >
          <Box mt="4">
            <Heading size="h6">{name}</Heading>
          </Box>

          <Text
            noOfLines={[1, 3]}
            maxW={{ base: "unset", md: "20rem" }}
            minH={"4.5rem"}
          >
            {description}
          </Text>

          <Flex
            w={variant === "my-collection" ? "full" : 36}
            alignItems="center"
            justify="center"
          >
            <Tag>
              <TagLeftIcon>
                <AzeroIcon fill={isActive ? "#7AE7FF" : "#888"} />
              </TagLeftIcon>
              <TagLabel color={isActive ? "#fff" : "#888"}>
                Volume {volume || 0}
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
