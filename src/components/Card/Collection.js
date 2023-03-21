import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { shortenNumber } from "@utils";
// import ActiveIcon from '@theme/assets/icon/Active.js';
import InActiveIcon from "@theme/assets/icon/InActive.js";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";

import { useEffect, useRef } from "react";
import { delay } from "@utils";
import ImageCloudFlare from "../ImageWrapper/ImageCloudFlare";

export const CollectionCard = ({
  squareImage,
  avatarImage,
  name,
  description,
  volume,
  isActive,
  variant,
  nftContractAddress,
  scrollToCollectionAddress,
  royaltyFee,
  isDoxxed,
  isDuplicationChecked,
}) => {
  const restorationRef = useRef();

  useEffect(() => {
    const doScroll = async () => {
      await delay(1000).then(() => {
        restorationRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    };

    nftContractAddress === scrollToCollectionAddress && doScroll();
  }, [nftContractAddress, scrollToCollectionAddress]);

  return (
    <motion.div
      ref={restorationRef}
      className="my-collection-card"
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        borderWidth: "2px",
        borderColor: "#7ae7ff00",

        transitionDuration: "0.15s",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
      }}
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
          style={{
            transitionDuration: "0.15s",
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(.17,.67,.83,.67)",
          }}
          sx={{
            ".my-collection-card &": {
              _after: {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "full",
                height: "6rem",
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 25.77%, #000000 100%);",
              },
            },
            ".my-collection-card:hover &": {
              _after: {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "0",
                height: "0",
              },
              _before: {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "full",
                height: "6rem",
                backgroundImage:
                  "linear-gradient(180deg, rgba(122, 231, 255, 0) 25.77%, #7AE7FF 100%);",
              },
            },
          }}
        >
          <Flex
            alignItems="start"
            justifyContent="flex-start"
            position="absolute"
            top="0"
            left="0"
            minW="60px"
          >
            <>
              {isDoxxed && (
                <Tooltip label="At least one of the team members’ identity is verified.">
                  <Tag bg="#34B979" border="1px solid #7ae7ff">
                    DOXXED
                  </Tag>
                </Tooltip>
              )}

              {isDuplicationChecked && (
                <Tooltip label="Artwork is verified by third-party for its uniqueness">
                  <Tag ml="4px" bg="#34B979" border="1px solid #7ae7ff">
                    AUTHENTIC
                  </Tag>
                </Tooltip>
              )}
            </>
          </Flex>

          <ImageCloudFlare
            h={"260px"}
            w={"full"}
            src={squareImage}
            alt={`header-img-${name}`}
          />
        </Box>

        <Center
          zIndex="base"
          pos="relative"
          rounded="full"
          w={16}
          h={16}
          mt={-8}
          p="-px"
          border="2px solid white"
          bg="#d8d8d8"
          boxShadow="0px 30px 20px rgba(0, 0, 0, 0.25)"
        >
          <ImageCloudFlare
            size="500"
            h={"60px"}
            w={"60px"}
            bg="#d8d8d8"
            src={avatarImage}
            borderRadius="full"
            alt={`header-img-${name}`}
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
            textTransform="none"
            textAlign="center"
            noOfLines={3}
            maxW={{ base: "unset", md: "20rem" }}
            minH={"4.5rem"}
            color="#888"
          >
            {description}
          </Text>

          <Flex
            mt="24px !important"
            w={
              variant === "my-collection" || variant === "my-projects"
                ? "full"
                : 36
            }
            alignItems="center"
            justify="center"
          >
            {variant !== "my-projects" && (
              <Tag>
                <TagLeftIcon
                  h={["12px", "16px", "16px"]}
                  w={["12px", "16px", "16px"]}
                >
                  <AzeroIcon fill={isActive ? "#7AE7FF" : "#888"} />
                </TagLeftIcon>
                <TagLabel
                  color={isActive ? "#fff" : "#888"}
                  textTransform="capitalize"
                  fontSize={["14px", "16px"]}
                >
                  <Text as="span" fontWeight="400">
                    Volume
                  </Text>{" "}
                  <Text as="span" fontWeight="600">
                    {shortenNumber(volume) || 0}
                  </Text>
                </TagLabel>
              </Tag>
            )}
            <>
              {variant === "my-collection" && (
                <>
                  <Spacer />
                  <Box
                    textTransform="capitalize"
                    px="3px"
                    borderWidth="1px"
                    borderColor="#7ae7ff"
                    fontSize="12px"
                  >
                    {royaltyFee / 100}% Royalty
                  </Box>
                </>
              )}

              {variant !== "marketplace-collection" && (
                <>
                  {/* {isActive && (
                    <Tag variant="active" fontSize={['14px', '16px']}>
                      <TagLeftIcon as={ActiveIcon} />
                      <TagLabel textTransform="capitalize">Active</TagLabel>
                    </Tag>
                  )} */}
                  {!isActive && (
                    <>
                      <Tooltip
                        placeContent="start"
                        hasArrow
                        bg="#333"
                        color="#fff"
                        borderRadius="0"
                        label="Contact ArtZero to activate your Collection"
                      >
                        <Tag variant="inActive" fontSize={["14px", "16px"]}>
                          <TagLeftIcon as={InActiveIcon} />
                          <TagLabel textTransform="capitalize">
                            Inactive
                          </TagLabel>
                        </Tag>
                      </Tooltip>
                    </>
                  )}
                </>
              )}
            </>
          </Flex>
        </VStack>
      </Flex>
    </motion.div>
  );
};
