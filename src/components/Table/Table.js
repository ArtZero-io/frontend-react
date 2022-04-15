import React from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function DataTable() {
  return (
    <TableContainer maxW="6xl-mid" fontSize="lg">
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
              Address
            </Th>
            <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
              Date
            </Th>
            <Th
              fontFamily="Evogria"
              fontSize="sm"
              fontWeight="normal"
              py={7}
              isNumeric
            >
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(5)].map((i) => (
            <Tr key={i} color="#fff">
              <Td color="#7ae7ff" py={7}>
                FjSn...WXGd
              </Td>
              <Td py={7}>2 hours ago</Td>
              <Td py={7} isNumeric>
                25.41
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
