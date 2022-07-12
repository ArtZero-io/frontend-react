import React, { useState } from "react";

import { Heading, IconButton, Spacer, Stack, Text } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import StatsTable from "@components/Table/StatsTable";

function TopCollectionsTab({ topCollections, azeroPrice }) {
  const [useAzeroUnit, setUseAzeroUnit] = useState(true);

  return (
    <>
      <Stack
        direction={{ base: "column", xl: "row" }}
        w="full"
        alignItems="center"
        mb="30px"
      >
        <Heading size="h3" mb="10px">
          Top NFT Collections
        </Heading>

        <Spacer />

        <Text color="brand.grayLight" pr="25px">
          Switch currency
        </Text>

        <IconButton
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
          display={{ base: "none", xl: "flex" }}
          icon={
            <AzeroIcon fill={!useAzeroUnit ? "#888" : "#000"} fontSize="24px" />
          }
          onClick={() => setUseAzeroUnit(true)}
        />

        <IconButton
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
          display={{ base: "none", xl: "flex" }}
          icon={<FaDollarSign fontSize="20px" />}
          onClick={() => setUseAzeroUnit(false)}
        />
      </Stack>

      <StatsTable
        tableHeaders={headers}
        tableData={topCollections}
        useAzeroUnit={useAzeroUnit}
        azeroPrice={azeroPrice}
      />
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
