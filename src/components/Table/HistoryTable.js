import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagRightIcon,
  Heading,
  Text,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { formatNumDynamicDecimal } from "@utils";
import { SCROLLBAR } from "@constants";
import { truncateStr } from "../../utils";

function HistoryTable({ tableHeaders, tableData }) {
  const formatDataCell = (itemObj, headerValue) => {
    switch (headerValue) {
      case "blockNumber":
        return formatNumDynamicDecimal(itemObj[headerValue]);

      case "price":
        return (
          <>
            {formatNumDynamicDecimal(itemObj[headerValue])}
            <TagRightIcon as={AzeroIcon} />
          </>
        );

      case "trader":
        return truncateStr(itemObj[headerValue]);

      case "seller":
        return truncateStr(itemObj[headerValue]);

      case "buyer":
        return truncateStr(itemObj[headerValue]);

      case "nftContractAddress":
        return truncateStr(itemObj[headerValue]);

      default:
        return <Text textAlign="left">{itemObj[headerValue]}</Text>;
    }
  };

  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <TableContainer
          w="full"
          fontSize="lg"
          sx={SCROLLBAR}
          overflowY="scroll"
          h={{ base: "390px", "2xl": "480px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tableData?.length ? (
              <Table variant="striped" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    {tableHeaders.map((item, idx) =>
                      item === "image" ? null : (
                        <Th
                          position="sticky"
                          top={0}
                          zIndex={1}
                          textAlign="left"
                          key={idx}
                          fontFamily="Evogria"
                          color="#888"
                          bg="#171717"
                          fontSize="15px"
                          fontWeight="400"
                          dropShadow="lg"
                          py={{ base: "1rem", "2xl": "1.75rem" }}
                        >
                          {item?.label}
                        </Th>
                      )
                    )}
                  </Tr>
                </Thead>

                <Tbody>
                  {tableData?.map((itemObj, idx) => (
                    <Tr key={idx} color="#fff">
                      {tableHeaders.map((item) => (
                        <Td
                          key={item.name}
                          textAlign="left"
                          // minW={["auto", "250px"]}
                          py={{ base: "1rem", "2xl": "1.75rem" }}
                        >
                          {formatDataCell(itemObj, item.name)}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : null}
          </motion.div>
        </TableContainer>
      )}
    </>
  );
}

export default HistoryTable;
