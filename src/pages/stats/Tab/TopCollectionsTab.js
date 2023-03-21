import React, { useState } from "react";

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import StatsTable from "@components/Table/StatsTable";

function TopCollectionsTab({ topCollections, azeroPrice }) {
  const [useAzeroUnit, setUseAzeroUnit] = useState(true);

  return (
    <>
      <Box as="section" maxW="container.3xl">
        <Box mx="auto" py={["30px", "12", "20"]}>
          <Stack
            w="full"
            mb="30px"
            alignItems="center"
            direction={{ base: "column", xl: "row" }}
          >
            <Heading
              mb="10px"
              minW="400px"
              fontSize={["3xl-mid", "5xl", "5xl"]}
            >
              Top Collections
            </Heading>

            <Spacer />

            <HStack w="full">
              <Spacer />
              {/* <Text fontSize='sm' pr={["5px", "15px"]}>
                ( AZERO/USD ${azeroPrice} )
              </Text> */}
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
            </HStack>
          </Stack>

          <StatsTable
            tableHeaders={headers}
            tableData={topCollections}
            useAzeroUnit={useAzeroUnit}
            azeroPrice={azeroPrice}
          />
        </Box>
      </Box>
    </>
  );
}

export default TopCollectionsTab;

const headers = {
  order: "#",
  name: "collection",
  marketCap: "market cap",
  volume: "total volume",
  floorPrice: "floor price",
};
