import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

export default function PropCard({ item }) {
  const [objItem] = Object.entries(item);

  return (
    <Box
      w="full"
      px={["10px", "20px"]}
      py="12px"
      textAlign="left"
      alignItems="end"
      bg="brand.semiBlack"
    >
      <Flex w="full" pb={["15px", "5px"]}>
        <Box color="brand.grayLight" w="full">
          <Text textTransform="capitalize" isTruncated fontSize={["sm", "md"]}>
            {objItem[0]}
          </Text>
        </Box>
        <Spacer />
      </Flex>

      <Flex w="full" fontSize={["sm", "lg"]} color="#7AE7FF">
        <Spacer />
        <Text textTransform="capitalize" isTruncated pr={1} fontStyle="italic">
          {objItem[1]}
        </Text>
      </Flex>
    </Box>
  );
}
