import {
  Flex,
  Heading,
  Image,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Stack,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { getCloudFlareImage } from "@utils/index";
import { motion } from "framer-motion";
import { formatNumDynamicDecimal } from "@utils";
import { useEffect, useState } from "react";

export const CommonCard = (props) => {
  const {
    is_for_sale,
    price,
    avatar,
    nftName,
    highest_bid,
    stackSpacing,
    cardWidth,
    bigCardNew,
  } = props;

  const [projImage, setProjImage] = useState("");

  useEffect(() => {
    avatar &&
      getCloudFlareImage(avatar, 500).then((res) => {
        setProjImage(res);
      });
  }, [avatar]);

  const fontSizeHeading = useBreakpointValue({
    base: "12px",
    md: bigCardNew ? "18px" : "14px",
    "2xl": "18px",
  });

  const cardWidthRes = useBreakpointValue({
    base: cardWidth - 18,
    md: cardWidth - 4,
  });

  return (
    <motion.div
      whileHover={{
        borderColor: "#7ae7ff",
      }}
      style={{
        border: "solid 2px #7ae7ff00",
        transition: "all 0.15s cubic-bezier(.17,.67,.83,.67)",
      }}
    >
      <Stack borderColor="#fff0" bg="#222" spacing={stackSpacing}>
        <Flex direction="column" align="center" textAlign="left">
          <Image
            alt={nftName}
            objectFit="contain"
            objectPosition="center"
            width={cardWidth}
            height={cardWidth}
            fallback={<Skeleton width={cardWidthRes} height={cardWidthRes} />}
            src={projImage}
          />
        </Flex>

        <Stack
          textAlign="left"
          p={{
            base: "10px",
            md: !bigCardNew ? "12px" : "20px",
            "2xl": "20px",
          }}
          pt={["2px", "12px"]}
          spacing={["5px", "10px"]}
        >
          <Heading fontSize={fontSizeHeading}>{nftName}</Heading>
          {is_for_sale ? (
            <>
              <Flex w="full">
                <Tag minH={["30px", "40px"]}>
                  <TagLabel fontSize={["14px", "16px", "16px"]}>
                    {formatNumDynamicDecimal(price / 10 ** 12)}
                  </TagLabel>
                  <TagRightIcon
                    h={["12px", "16px", "16px"]}
                    w={["12px", "16px", "16px"]}
                    as={AzeroIcon}
                  />
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
                    <Text
                      fontSize={["14px", "16px"]}
                      bg="transparent"
                      color="#fff"
                    >
                      Best Offer{" "}
                      {formatNumDynamicDecimal(highest_bid / 10 ** 12)}
                    </Text>
                    <TagRightIcon
                      h={["12px", "16px", "16px"]}
                      w={["12px", "16px", "16px"]}
                      as={AzeroIcon}
                    />
                  </>
                ) : (
                  <Text fontSize={["14px", "16px"]} bg="transparent">
                    No offer yet
                  </Text>
                )}
              </Flex>
            </>
          ) : (
            <Tag minH={["30px", "40px"]}>
              <TagLabel fontSize={["14px", "16px"]}>Not for sale</TagLabel>
            </Tag>
          )}
        </Stack>
      </Stack>
    </motion.div>
  );
};
