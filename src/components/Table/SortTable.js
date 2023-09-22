import { flexRender } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { SCROLLBAR } from "@constants";
import { motion } from "framer-motion";
import { BeatLoader } from "react-spinners";

export function SortTable({ table, isLoading, isFetched }) {
  return (
    <TableContainer w="full" fontSize="lg" sx={SCROLLBAR} overflowY="scroll">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      cursor="pointer"
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                      textAlign="left"
                      fontFamily="Evogria"
                      color="#888"
                      bg="#171717"
                      fontSize="15px"
                      fontWeight="400"
                      dropShadow="lg"
                      py={{ base: "1rem", "2xl": "1.75rem" }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <Flex as="span" h="24px" alignItems="center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <ChevronUpIcon
                                  fontSize="24px"
                                  color="#7ae7ff"
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  fontSize="24px"
                                  color="#7ae7ff"
                                />
                              ),
                            }[header.column.getIsSorted()] ?? null}
                          </Flex>
                        </div>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>

          {isLoading || !isFetched ? (
            <Tbody>
              <Tr bg="#171717">
                <Td colSpan={table.options.columns.length} textAlign="center">
                  <HStack py="20px" w="full" justifyContent="center">
                    <BeatLoader color="#7ae7ff" size="10px" />
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </motion.div>
    </TableContainer>
  );
}
