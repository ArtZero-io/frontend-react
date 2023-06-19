import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { formatNumDynamicDecimal } from "@utils";
import StatsCardContentLoader from "../StatsCardContentLoader";
import { useSubstrateState } from "@utils/substrate";
import AzeroIcon from "@theme/assets/icon/Azero.js";

const isAleph = process.env.REACT_APP_NETWORK === "alephzero";

function StatsHeader({ platformStatistics, isLoading = true, azeroPrice }) {
  const { chainToken } = useSubstrateState();

  return (
    <Box as="section" position="relative" w="full">
      <Box
        mx="auto"
        pt={{ base: "12", "2xl": "110px" }}
        pb={{ base: "4", "2xl": "20px" }}
      >
        <Box w="full" maxW="500px" mx="auto" textAlign="center" mb="44px">
          <Heading fontSize={["3xl-mid", "5xl", "5xl"]} mb="10px">
            statistics
          </Heading>
          <Text maxW="320px" fontSize={["md", "lg", "lg"]} mx="auto">
            Payout Rewards will be paid on monthly basis to all staked{" "}
            {process.env.REACT_APP_MAIN_COLLECTION_SHORT_NAME} NFTs owner.
            Remember to claim your rewards.
          </Text>
        </Box>

        <Grid
          mx="auto"
          px="16px"
          w="full"
          gap={["15px", "30px"]}
          maxW={isAleph ? "1000px" : "1200px"}
          minH={"120px"}
          templateColumns={{
            base: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
          }}
        >
          {!platformStatistics &&
            [...Array(isAleph ? 6 : 4)].map((_, idx) => (
              <GridItem
                m="0"
                bg="brand.grayDark"
                key={idx}
                w="full"
                h={["96px", "131px"]}
              >
                <StatsCardContentLoader />
              </GridItem>
            ))}

          {platformStatistics?.map((item, idx) => (
            <GridItem key={idx} w="full" h="full">
              <Box
                minH={["auto", "115px"]}
                textAlign="left"
                bg="brand.grayDark"
                px="20px"
                py="14px"
                fontSize="lg"
              >
                <Flex w="full" mb={["8px", "16px"]}>
                  <Text color="brand.grayLight" fontSize={["md", "lg", "lg"]}>
                    {item.title}
                  </Text>
                  {item?.unit === "azero" && (
                    <>
                      <Spacer />$
                      <Text as="span" color="#b4b4b4">
                        {formatNumDynamicDecimal(item.value * azeroPrice, 0)}
                      </Text>
                    </>
                  )}
                </Flex>

                <Flex
                  h="full"
                  w="full"
                  alignItems="center"
                  justifyContent="end"
                >
                  <Text bg="transparent" fontSize={["24px", "40px"]}>
                    {formatNumDynamicDecimal(item.value)}
                  </Text>

                  {item.unit === "azero" ? (
                    <AzeroIcon mb="0px" chainToken={chainToken} />
                  ) : (
                    <>
                      <Text ml="6px" color="brand.blue">
                        {item.unit}
                      </Text>
                    </>
                  )}
                </Flex>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default StatsHeader;
