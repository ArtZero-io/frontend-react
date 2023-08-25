import { Box, Flex, Spacer, Text, Tooltip } from "@chakra-ui/react";
import { formatNumDynamicDecimal } from "@utils";
import moment from "moment/moment";

export default function PropCard({
  item,
  traitCount,
  totalNftCount,
  variant = "",
}) {
  const [objItem] = Object.entries(item);

  function formatTime(time) {
    if (typeof time === "string") {
      time = time?.replaceAll(",", "");
    }

    const testTime = moment(parseInt(time)).format("MMM D YYYY, H:mm");

    return testTime;
  }

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
              <Text fontSize={["sm", "sm"]} isTruncated pt="2px">
                {formatNumDynamicDecimal((100 * traitCount) / totalNftCount)}%
              </Text>
            ) : (
              ""
            )}
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
            {["Expiration Time", "Registration Time"].includes(objItem[0])
              ? formatTime(objItem[1])
              : objItem[1]}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
}
