import { Box } from "@chakra-ui/react";
import React from "react";
import DataTable from '@components/Table/Table'
function History() {
  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <DataTable/>
    </Box>
  );
}

export default History;
