import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TagRightIcon,
  Skeleton,
  Image,
  Square,
  Heading,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { AnimatePresence, motion } from "framer-motion";
import { truncateStr } from "@utils";
import { shortenNumber } from "@utils";
import { getCachedImageShort } from "../../utils";
import { memo } from "react";

function EventTable({ tableHeaders, tableData }) {
  console.log(" tableData", tableData);
  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <TableContainer
          minH="500px"
          maxH={{ base: "20rem", "2xl": "30rem" }}
          fontSize="lg"
          h="full"
          overflow="auto"
          overflowY="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.3rem",
              height: "0.3rem",
              borderRadius: "1px",
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {tableData?.length ? (
                <Skeleton minH="200px" h="full" isLoaded={tableData}>
                  <Table variant="striped" size="md" colorScheme="blackAlpha">
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
                                  {shortenNumber(item[i])}
                                  <TagRightIcon as={AzeroIcon} />
                                </>
                              ) : i === "avatar" ? (
                                <>
                                  <Square size="64px" mx="auto">
                                    <Image
                                      width="full"
                                      height="full"
                                      src={
                                        item[i] && getCachedImageShort(item[i])
                                      }
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
                </Skeleton>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </TableContainer>
      )}
    </>
  );
}

export default memo(EventTable);