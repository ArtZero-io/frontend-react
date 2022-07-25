import React from "react";
import { Box } from "@chakra-ui/react";
import CommonTable from "@components/Table/Table";

function HistoryTab() {
  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <CommonTable />
    </Box>
  );
}

export default HistoryTab;
