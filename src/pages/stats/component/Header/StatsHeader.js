import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { formatNumDynamicDecimal } from "@utils";
import StatsCardContentLoader from "../StatsCardContentLoader";
import { useSubstrateState } from "@utils/substrate";
import { CHAIN_TOKEN_LIST } from "@constants";
import AstarLogoImage from "@theme/assets/icon/Astar.png";
import FiveireLogoImage from "@theme/assets/icon/5ire.png";

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
            Payout Rewards will be paid on monthly basis to all staked PMP NFTs
            owner. Remember to claim your rewards.
          </Text>
        </Box>

        <Grid
          mx="auto"
          px="16px"
          w="full"
          gap={["15px", "30px"]}
          maxW="1000px"
          minH={"120px"}
          templateColumns={{
            base: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
          }}
        >
          {!platformStatistics &&
            [...Array(6)].map((_, idx) => (
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
                    <ChainTokenImage
                      ml="6px"
                      w="20px"
                      h="20px"
                      chainToken={chainToken}
                    />
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

const ChainTokenImage = ({ chainToken, ...rest }) => {
  switch (chainToken) {
    case CHAIN_TOKEN_LIST.AZERO:
      return <AzeroIcon {...rest} />;

    case CHAIN_TOKEN_LIST.TZERO:
      return <AzeroIcon {...rest} />;

    case CHAIN_TOKEN_LIST.ASTR:
      return <Image {...rest} src={AstarLogoImage} />;

    case CHAIN_TOKEN_LIST.SBY:
      return <Image {...rest} src={AstarLogoImage} />;

    case CHAIN_TOKEN_LIST.FIVE_IRE:
      return <Image {...rest} src={FiveireLogoImage} />;

    default:
      return null;
  }
};
