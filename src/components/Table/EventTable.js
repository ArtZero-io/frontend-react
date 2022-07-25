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
import { getCachedImageShort, formatNumDynamicDecimal } from "@utils";
import { memo } from "react";
import { SCROLLBAR } from "../../constants";

function EventTable({ tableHeaders, tableData, collectionOwnerName, type }) {
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
          // w={{ base: "1100px", "2xl": "1560px" }}
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
                    <Th
                      hidden={type === "UNLIST" || type === "LIST"}
                      position="sticky"
                      top={0}
                      zIndex={1}
                      textAlign="center"
                      fontFamily="Evogria"
                      color="#888"
                      bg="#171717"
                      fontSize="15px"
                      fontWeight="400"
                      dropShadow="lg"
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                    >
                      collection creator
                    </Th>
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
                    {/* <Th
                      position="sticky"
                      top={0}
                      zIndex={1}
                      textAlign="center"
                      fontFamily="Evogria"
                      color="#888"
                      bg="#171717"
                      fontSize="15px"
                      fontWeight="400"
                      dropShadow="lg"
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                    >
                      Time
                    </Th> */}
                  </Tr>
                </Thead>

                <Tbody>
                  {tableData?.map((item, idx) => (
                    <Tr key={idx} color="#fff">
                      <Td
                        hidden={type === "UNLIST" || type === "LIST"}
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                        textAlign="center"
                        color="#fff"
                      >
                        {collectionOwnerName}
                      </Td>
                      {Object.keys(tableHeaders)?.map((i, idx) => (
                        <Td
                          isNumeric={i === "price" ? true : false}
                          key={idx}
                          py={{ base: "1rem", "2xl": "1.75rem" }}
                          textAlign="center"
                          // color="#fff"
                          color={
                            i === "nftContractAddress" ||
                            i === "seller" ||
                            i === "trader" ||
                            i === "buyer"
                              ? "#7ae7ff"
                              : "#fff"
                          }
                        >
                          {i === "price" ||
                          i === "platformFee" ||
                          i === "royalFee" ? (
                            <>
                              {formatNumDynamicDecimal(item[i])}
                              <TagRightIcon as={AzeroIcon} w="16px" />
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
                      {/* <Td
                        key={idx}
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                        textAlign="center"
                        color="#fff"
                      >
                        {new Date(1657304023551).toLocaleString("en-US")}
                      </Td> */}
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
