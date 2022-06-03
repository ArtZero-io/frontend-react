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
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { convertStringToPrice, convertStringToDateTime } from "@utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { truncateStr } from "@utils";
import StatusBuyButton from "../Button/StatusBuyButton";
import { AccountActionTypes } from "@store/types/account.types";

function DataTable({
  tableHeaders,
  tableData,
  onClickHandler,
  isOwner,
  idSelected,
}) {
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);

  return (
    <TableContainer
      maxW="6xl-mid"
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
            <Skeleton minH="200px" isLoaded={tableData}>
              <Table variant="striped" size="md" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    {tableHeaders?.map((item, idx) => (
                      <Th
                        position="sticky"
                        top={0}
                        zIndex={1}
                        bg="#222"
                        textAlign="center"
                        key={idx}
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                        display={item === "Action" && !isOwner && "none"}
                        // display={"none"}
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
                          {truncateStr(item.bidder, 6)}
                        </Td>

                        <Td
                          py={{ base: "1rem", "2xl": "1.75rem" }}
                          textAlign="center"
                        >
                          {convertStringToDateTime(item.bidDate)}
                        </Td>

                        <Td py={{ base: "1rem", "2xl": "1.75rem" }} isNumeric>
                          <Tag pr={0} bg="transparent">
                            <TagLabel bg="transparent">
                              {convertStringToPrice(item.bidValue)}
                            </TagLabel>
                            <TagRightIcon as={AzeroIcon} />
                          </Tag>
                        </Td>
                        {isOwner ? (
                          <Td
                            py={{ base: "1rem", "2xl": "1.75rem" }}
                            textAlign="center"
                          >
                            <Flex justifyContent="center" w="full">
                              <StatusBuyButton
                                isDisabled={
                                  addNftTnxStatus?.status && idSelected !== idx
                                }
                                mx="auto"
                                isDo={idSelected === idx}
                                type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                                text="accept bid"
                                isLoading={addNftTnxStatus}
                                loadingText={`${addNftTnxStatus?.status}`}
                                onClick={() => onClickHandler(idx)}
                              />
                            </Flex>
                          </Td>
                        ) : (
                          ""
                        )}
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </Skeleton>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </TableContainer>
  );
}

export default DataTable;
