import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

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
        <Box color="brand.grayLight" w="full">
          <Text textTransform="capitalize" isTruncated fontSize={["sm", "md"]}>
            {objItem[0]}
          </Text>
        </Box>
        <Spacer />{" "}
        {variant !== "add-nft" && (
          <Flex w="full" fontSize={["sm", "md"]} color="#fff">
            <Spacer />

            <Text fontSize={["sm", "sm"]} isTruncated pr={1}>
              {((100 * traitCount) / totalNftCount).toFixed(0)}%
            </Text>
          </Flex>
        )}
      </Flex>

      <Box h="6px"></Box>

      <Flex
        justifyContent="flex-end"
        w="full"
        color="#7AE7FF"
        fontSize={["sm", "lg"]}
        // fontFamily="Evogria Italic"
      >
        <Text textTransform="capitalize" isTruncated pr={1} fontStyle="italic">
          {objItem[1]}
        </Text>
        {/* <Spacer /> */}
      </Flex>
    </Box>
  );
}
