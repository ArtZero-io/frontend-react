import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";

function StaticsHeader({
  avatarImage,
  name,
  description,
  website,
  twitter,
  discord,
  volume,
  floorPrice,
  totalListed,
  nft_count,
}) {
  return (
    <Box
      // maxH={"34rem"}
      // minH={{ base: "22rem", "2xl": "34rem" }}
      as="section"
      position="relative"
      w="full"
    >
      <Box
        mx="auto"
        pt={{ base: "12", "2xl": "110px" }}
        pb={{ base: "4", "2xl": "110px" }}
      >
        <Box w="full" maxW="410px" mx="auto" textAlign="center" mb="44px">
          <Heading size="h2" mb="10px">
            Platform Statics
          </Heading>
          <Text maxW="360px" fontSize="lg" mx="auto">
            The Degenerate Ape Academy is an NFT brand housed on the blockchain.{" "}
          </Text>
        </Box>
        <Grid
          mx="auto"
          w="full"
          maxW="960px"
          templateColumns="repeat(auto-fill, minmax(min(100%, 300px), 1fr))"
          gap="30px"
          minH={"260px"}
        >
          {dashboardInfo.map((item, idx) => {
            return (
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
                      {item.value}
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
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default StaticsHeader;

const dashboardInfo = [
  { title: "Reward share from Validator", value: "2222", unit: "azero" },
  { title: "Reward share from Platform revenue", value: "2222", unit: "azero" },
  { title: "Total Reward Share", value: "2222", unit: "azero" },
  { title: "Total Staked (platform)", value: "2222", unit: "NFTs" },
  { title: "Total Stakers", value: "2222", unit: "Stakers" },
  { title: "Total Payout (AZERO)", value: "2222", unit: "azero" },
];
