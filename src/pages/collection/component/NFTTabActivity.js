import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function NFTTabActivity({ address }) {
  return (
    <Box as="section" maxW="container.3xl" px={5} position="relative">
      { address }
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th isNumeric>Price</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(5)].map((i) => (
              <Tr key={i}>
                <Td>Sale</Td>
                <Td isNumeric>25.41</Td>
                <Td>FjSn...WXGd</Td>
                <Td>FjSn...WXGd</Td>
                <Td>2 hours ago</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default NFTTabActivity;
