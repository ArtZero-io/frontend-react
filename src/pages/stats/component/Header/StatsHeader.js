import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Spacer,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { formatNumDynamicDecimal } from "@utils";

function StatsHeader({ platformStatistics, isLoading }) {
  return (
    <Box as="section" position="relative" w="full">
      <Box
        mx="auto"
        pt={{ base: "12", "2xl": "110px" }}
        pb={{ base: "4", "2xl": "20px" }}
      >
        <Box w="full" maxW="500px" mx="auto" textAlign="center" mb="44px">
          <Heading size="h2" mb="10px">
            Platform Statistics
          </Heading>
          <Text maxW="360px" fontSize="lg" mx="auto">
            Quis amet eu labore non deserunt dolor incididunt pariatur consequat
            ex consequat.
          </Text>
        </Box>

        <Skeleton isLoaded={!isLoading} maxW="1200px" mx="auto">
          <Grid
            mx="auto"
            w="full"
            gap="30px"
            maxW="1200px"
            minH={"120px"}
            // maxW="960px"
            templateColumns="repeat(auto-fill, minmax(min(100%, 250px), 1fr))"
          >
            {platformStatistics?.map((item, idx) => (
              <GridItem key={idx} w="full" h="full">
                <Box
                  minH="115px"
                  textAlign="left"
                  bg="brand.grayDark"
                  px="20px"
                  py="14px"
                  fontSize="lg"
                >
                  <Flex w="full" mb="16px">
                    <Text color="brand.grayLight">{item.title}</Text>
                  </Flex>

                  <Flex h="full" w="full" textAlign="left" alignItems="end">
                    <Text
                      lineHeight="42px"
                      bg="transparent"
                      fontSize="5xl"
                      fontFamily="DS-Digital"
                    >
                      {formatNumDynamicDecimal(item.value)}
                    </Text>

                    {item.unit === "azero" ? (
                      <TagRightIcon mb="8px" fontSize="23px" as={AzeroIcon} />
                    ) : (
                      <>
                        <Spacer />
                        <Text color="brand.blue">{item.unit}</Text>
                      </>
                    )}
                  </Flex>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Skeleton>
      </Box>
    </Box>
  );
}

export default StatsHeader;
