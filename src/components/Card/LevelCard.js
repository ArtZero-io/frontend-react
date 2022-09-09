import { Box, Flex, Progress, Spacer, Text } from "@chakra-ui/react";
import { createLevelAttribute } from "@utils";

export default function LevelCard({ item }) {
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
          <Text textTransform="capitalize" isTruncated fontSize={["sm", "md"]}>
            {objItem[0]}
          </Text>
        </Box>

        <Spacer />

        <Flex
          display={["none", "flex"]}
          fontSize={["sm", "lg"]}
          w="full"
          justifyContent="end"
        >
          <Text color="#fff">{`${level} of ${levelMax}`}</Text>
        </Flex>
      </Flex>

      <Flex
        w="full"
        justifyContent="end"
        fontSize={["sm", "lg"]}
        display={["flex", "none"]}
      >
        <Text color="#fff">{`${level} of ${levelMax}`}</Text>
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
