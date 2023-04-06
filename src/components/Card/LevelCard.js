import { Box, Flex, Progress, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { createLevelAttribute } from "@utils";

export default function LevelCard({
  item,
  traitCount,
  totalNftCount,
  variant = "",
}) {
  const [objItem] = Object.entries(item);

  const { level, levelMax } = createLevelAttribute(objItem[1]);

  return (
    <Box
      w="full"
      px={["10px", "20px"]}
      py={["12px", "20px"]}
      textAlign="left"
      alignItems="end"
      bg="brand.semiBlack"
    >
      <Flex w="full" pb={["8px"]}>
        <Box color="brand.grayLight" w="full" maxW="100px">
          <Tooltip
            hasArrow
            bg="#333"
            color="#fff"
            cursor="pointer"
            borderRadius="0"
            label={objItem[0]}
          >
            <Text
              isTruncated
              fontSize={["sm", "md"]}
              textTransform="capitalize"
            >
              {objItem[0]}
            </Text>
          </Tooltip>
        </Box>

        <Spacer />
        {variant !== "add-nft" && (
          <Flex w="full" fontSize={["sm", "md"]} color="#fff">
            <Spacer />

            <Text fontSize={["sm", "sm"]} isTruncated pt="2px">
              {((100 * traitCount) / totalNftCount).toFixed(2)}%
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex
        w="full"
        fontStyle="italic"
        display={["none", "flex"]}
        fontSize={["sm", "lg"]}
        justifyContent="end"
      >
        <Text color="#7AE7FF">{`${level} of ${levelMax}`}</Text>
      </Flex>
      <Flex
        w="full"
        justifyContent="end"
        fontSize={["sm", "lg"]}
        display={["flex", "none"]}
      >
        <Text color="#7AE7FF">{`${level} of ${levelMax}`}</Text>
      </Flex>
      <Progress
        size="sm"
        height="6px"
        colorScheme="telegram"
        value={Number((level * 100) / levelMax)}
      />
    </Box>
  );
}
