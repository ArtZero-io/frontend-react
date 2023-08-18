/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Box, HStack, Heading, Spacer, Stack } from "@chakra-ui/react";
import { APICall } from "@api/client";
import { useSubstrateState } from "@utils/substrate";
// import AzeroIcon from "@theme/assets/icon/Azero.js";
// import { FaDollarSign } from "react-icons/fa";
import EventTable from "@components/Table/EventTable";
import { getTimestamp, resolveDomain } from "@utils";
import { BeatLoader } from "react-spinners";

function TopNftTradesTab() {
  const [loading, setLoading] = useState(false);
  // const [useAzeroUnit, setUseAzeroUnit] = useState(true);
  const [topNftTradesList, setTopNftTradesList] = useState([]);
  const { api } = useSubstrateState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { ret } = await APICall.getTopNftTrades({});

        if (ret?.length > 0) {
          ret = await Promise.all(
            ret?.map(async (event, idx) => {
              const { blockNumber, buyer, seller, trader } = event;

              const buyerDomain = await resolveDomain(buyer, api);
              const sellerDomain = await resolveDomain(seller, api);
              const traderDomain = await resolveDomain(trader, api);

              const eventFormatted = {
                ...event,
                buyerDomain,
                sellerDomain,
                traderDomain,
                rank: idx + 1,
              };

              const timestamp = await getTimestamp(api, blockNumber);

              if (timestamp) {
                eventFormatted.timestamp = timestamp;
              }

              return eventFormatted;
            })
          );
          setTopNftTradesList(ret);
          setLoading(false);
        }
      } catch (error) {
        setTopNftTradesList([]);
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);
  return (
    <Box as="section" maxW="container.3xl">
      <Box mx="auto" py={["4", "12", "20"]}>
        <Stack
          direction={{ base: "column", xl: "row" }}
          w="full"
          alignItems="center"
          mb="30px"
        >
          <Heading mb="10px" minW="400px" fontSize={["3xl-mid", "5xl", "5xl"]}>
            top nft trades
          </Heading>{" "}
          <Spacer />
          {/* <HStack w="full">
            <Spacer />

            <Text color="brand.grayLight" pr={["5px", "25px"]}>
              Switch currency
            </Text>
            <IconButton
              width="50px"
              mr={0}
              size="icon"
              variant="iconSolid"
              borderColor={!useAzeroUnit ? "#343333" : "#7ae7ff"}
              borderWidth={!useAzeroUnit ? "2px" : "0px"}
              borderRightWidth={"0px"}
              disabled={useAzeroUnit}
              _disabled={{
                bg: "brand.blue",
                cursor: "not-allowed",
              }}
              _hover={{
                bg: useAzeroUnit ? "brand.blue" : "transparent",
              }}
              bg={!useAzeroUnit ? "transparent" : "brand.blue"}
              color={useAzeroUnit ? "brand.grayLight" : "black"}
              icon={
                <AzeroIcon
                  chainToken={chainToken}
                  fill={!useAzeroUnit ? "#888" : "#000"}
                  fontSize="24px"
                />
              }
              onClick={() => setUseAzeroUnit(true)}
            />

            <IconButton
              width="50px"
              style={{ marginLeft: 0 }}
              size="icon"
              variant="iconSolid"
              borderWidth={useAzeroUnit ? "2px" : "0px"}
              borderColor={!useAzeroUnit ? "#7ae7ff" : "#343333"}
              borderLeftWidth={"0px"}
              disabled={!useAzeroUnit}
              _disabled={{
                bg: "brand.blue",
                cursor: "not-allowed",
              }}
              _hover={{
                bg: !useAzeroUnit ? "brand.blue" : "transparent",
              }}
              bg={!useAzeroUnit ? "brand.blue" : "transparent"}
              color={!useAzeroUnit ? "black" : "brand.grayLight"}
              icon={<FaDollarSign fontSize="20px" />}
              onClick={() => setUseAzeroUnit(false)}
            />
          </HStack> */}
        </Stack>
        {loading ? (
          <HStack pt="80px" pb="20px" justifyContent="center" w="full">
            <BeatLoader color="#7ae7ff" size="10px" />
          </HStack>
        ) : (
          <EventTable tableHeaders={headers} tableData={topNftTradesList} />
        )}
      </Box>
    </Box>
  );
}

export default TopNftTradesTab;

const headers = {
  rank: "rank",
  nftName: "nft name",
  avatar: "image",
  price: "price",
  platformFee: "platform Fee",
  royaltyFee: "royalty fee",
  seller: "seller",
  buyer: "buyer",
  timestamp: "timestamp",
  eventDataType: "type",
};
