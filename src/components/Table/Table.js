import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  TagLabel,
  TagRightIcon,
  Button,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { convertStringToPrice } from "@utils";

function DataTable({ tableHeaders, tableData, onClickHandler }) {
  return (
    <TableContainer
      maxW="6xl-mid"
      maxH={{ base: "20rem", "2xl": "30rem" }}
      fontSize="lg"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "0.3rem",
          borderRadius: "1px",
          backgroundColor: `#7ae7ff`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `#7ae7ff`,
        },
      }}
    >
      <Table variant="striped" size="md" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            {tableHeaders?.map((item) => (
              <Th
                textAlign="center"
                key={item}
                fontFamily="Evogria"
                fontSize="sm"
                fontWeight="normal"
                py={{ base: "1rem", "2xl": "1.75rem" }}
              >
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {tableData?.map((item, idx) => (
            <>
              <Tr key={idx} color="#fff">
                <Td
                  color="#7ae7ff"
                  py={{ base: "1rem", "2xl": "1.75rem" }}
                  textAlign="center"
                >
                  {item.bidder}
                </Td>

                <Td py={{ base: "1rem", "2xl": "1.75rem" }} textAlign="center">
                  {item.bidDate}
                </Td>

                <Td py={{ base: "1rem", "2xl": "1.75rem" }} isNumeric>
                  <Tag pr={0} bg="transparent">
                    <TagLabel bg="transparent">
                      {convertStringToPrice(item.bidValue)}
                    </TagLabel>
                    <TagRightIcon as={AzeroIcon} />
                  </Tag>
                </Td>
                <Td py={{ base: "1rem", "2xl": "1.75rem" }} textAlign="center">
                  <Button size="sm" onClick={() => onClickHandler(idx)}>
                    Accept Bid
                  </Button>
                </Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
