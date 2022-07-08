import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagRightIcon,
  Image,
  Square,
  Heading,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { truncateStr, getCachedImageShort } from "@utils";
import { memo } from "react";

function EventTable({ tableHeaders, tableData }) {
  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <TableContainer
          fontSize="lg"
          w={{ base: "1100px", "2xl": "1560px" }}
          h={{ base: "390px", "2xl": "480px" }}
          overflowY="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              borderRadius: "0px",
              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: `transparent`,
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tableData?.length ? (
              <Table id="abc" variant="striped" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    {Object.values(tableHeaders)?.map((item, idx) => (
                      <Th
                        position="sticky"
                        top={0}
                        zIndex={1}
                        textAlign="center"
                        key={idx}
                        fontFamily="Evogria"
                        color="#888"
                        bg="#171717"
                        fontSize="15px"
                        fontWeight="400"
                        dropShadow="lg"
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                      >
                        {item}
                      </Th>
                    ))}
                  </Tr>
                </Thead>

                <Tbody>
                  {tableData?.map((item, idx) => (
                    <Tr key={idx} color="#fff">
                      {Object.keys(tableHeaders)?.map((i, idx) => (
                        <Td
                          isNumeric={i === "price" ? true : false}
                          key={idx}
                          py={{ base: "1rem", "2xl": "1.75rem" }}
                          textAlign="center"
                          color="#7ae7ff"
                        >
                          {i === "nftContractAddress" ||
                          i === "seller" ||
                          i === "trader" ||
                          i === "buyer" ? (
                            truncateStr(item[i])
                          ) : i === "price" ||
                            i === "platformFee" ||
                            i === "royalFee" ? (
                            <>
                              {item[i].toFixed(6)}
                              <TagRightIcon as={AzeroIcon} />
                            </>
                          ) : i === "avatar" ? (
                            <>
                              <Square size="64px" mx="auto">
                                <Image
                                  width="full"
                                  height="full"
                                  src={item[i] && getCachedImageShort(item[i])}
                                />
                              </Square>
                            </>
                          ) : (
                            item[i]
                          )}
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

export default memo(EventTable);
