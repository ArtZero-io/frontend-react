import { Box, Flex, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { formatNumDynamicDecimal } from "@utils";

export default function PropCard({
  item,
  traitCount,
  totalNftCount,
  variant = "",
}) {
  const [objItem] = Object.entries(item);

  return (
    <Box
      w="full"
      px={["10px", "20px"]}
      py={["12px", "20px"]}
      textAlign="left"
      alignItems="end"
      bg="brand.semiBlack"
      h="full"
      m="auto"
    >
      <Flex w="full" pb={["8px"]}>
        <Tooltip
          hasArrow
          bg="#333"
          color="#fff"
          cursor="pointer"
          borderRadius="0"
          label={objItem[0]}
        >
          <Box color="brand.grayLight" w="full" maxW="110px">
            <Text
              textTransform="capitalize"
              isTruncated
              fontSize={["sm", "md"]}
            >
              {objItem[0]}
            </Text>
          </Box>
        </Tooltip>
        <Spacer />{" "}
        {variant !== "add-nft" && (
          <Flex w="full" fontSize={["sm", "md"]} color="#fff">
            <Spacer />

            {traitCount > 0 ? (
              <Text fontSize={["sm", "sm"]} isTruncated pr={1}>
                {formatNumDynamicDecimal((100 * traitCount) / totalNftCount)}%
              </Text>
            ) : null}
          </Flex>
        )}
      </Flex>

      <Box h="6px"></Box>

      <Flex
        w="full"
        color="#7AE7FF"
        fontSize={["sm", "lg"]}
        justifyContent="flex-end"
      >
        <Tooltip
          hasArrow
          bg="#333"
          color="#fff"
          cursor="pointer"
          borderRadius="0"
          label={objItem[1]}
        >
          <Text
            pr={1}
            isTruncated
            fontStyle="italic"
            textTransform="capitalize"
          >
            {objItem[1]}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
}
