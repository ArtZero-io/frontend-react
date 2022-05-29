import {
  Flex,
  Heading,
  Image,
  Skeleton,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
  VStack,
  Square,
  Text,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { getCachedImageShort } from "@utils/index";
import { motion } from "framer-motion";

export default function NFTChangeSizeCard({
  is_for_sale,
  price,
  avatar,
  nftName,
  highest_bid,
  width,
}) {
  return (
    <motion.div
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        width: width || 0,
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
        textAlign="left"
        bg="brand.grayDark"
        h="full"
        w="full"
        shadow="lg"
      >
        <Square h={width} w={width} borderWidth='2px' borderColor='#ffffff00'>
          <Image
            alt={nftName}
            objectFit="cover"
            objectPosition="center"
            src={avatar && getCachedImageShort(avatar, 500)}
            h="full"
            w="full"
            minH={width}
            fallback={<Skeleton h="full" w="full" />}
          />
        </Square>
        <VStack
          p={4}
          w="full"
          h="full"
          justifyContent="space-between"
          alignItems="start"
          flex="1"
          // minH={is_for_sale ? "8.125rem" : ""}
        >
          <Heading
            fontSize={["13px", "16px", "16px"]}
            textTransform="uppercase"
          >
            {nftName}
          </Heading>

          {is_for_sale ? (
            <>
              <Flex w="full">
                <Tag h={10}>
                  <TagLabel>{price / 10 ** 12}</TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Tag>

                <Spacer />
              </Flex>
              <Flex
                w="full"
                align="center"
                textAlign="right"
                color="brand.grayLight"
                m="0"
                py="0"
              >
                <Spacer />
                {highest_bid ? (
                  <>
                    <Text bg="transparent" color="#fff">
                      Highest Offer {highest_bid / 10 ** 12}
                    </Text>
                    <TagRightIcon as={AzeroIcon} />
                  </>
                ) : (
                  <Text bg="transparent">No offer yet</Text>
                )}
              </Flex>
            </>
          ) : (
            <Tag h={10}>
              <TagLabel>Not for sale</TagLabel>
            </Tag>
          )}
        </VStack>
      </Flex>
    </motion.div>
  );
}
