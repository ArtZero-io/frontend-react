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
  HStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import { motion } from "framer-motion";
import { formatNumDynamicDecimal } from "@utils";
import { memo } from "react";
import { SCROLLBAR } from "@constants";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import CommonButton from "../Button/CommonButton";
import AddressCopier from "@components/AddressCopier/AddressCopier";

function EventTable({
  tableHeaders,
  tableData,
  collectionOwnerName,
  type,
  fetchBack,
  fetchMore,
  currentPage,
  hasMore,
}) {
  return (
    <>
      {tableData?.length === 0 ? (
        <Heading py="30px" size="h6">
          No event found!
        </Heading>
      ) : (
        <>
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
                        textAlign="left"
                        fontFamily="Evogria"
                        color="#888"
                        bg="#171717"
                        fontSize="15px"
                        fontWeight="400"
                        dropShadow="lg"
                        py={{ base: "1rem", "2xl": "1.75rem" }}
                      >
                        creator
                      </Th>
                      {Object.values(tableHeaders)?.map((item, idx) =>
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
                            {item}
                          </Th>
                        )
                      )}
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
                          textAlign="left"
                          color="#7ae7ff"
                        >
                          <AddressCopier address={collectionOwnerName} />
                        </Td>
                        {Object.keys(tableHeaders)?.map((i, idx) =>
                          i === "avatar" ? null : (
                            <Td
                              key={idx}
                              textAlign="left"
                              // minW={["auto", "250px"]}
                              // isNumeric={i === "price" ? true : false}
                              py={{ base: "1rem", "2xl": "1.75rem" }}
                            >
                              {i === "price" ||
                              i === "platformFee" ||
                              i === "royaltyFee" ? (
                                <>
                                  {formatNumDynamicDecimal(item[i])}
                                  <TagRightIcon as={AzeroIcon} w="16px" />
                                </>
                              ) : i === "nftName" ? (
                                <HStack justifyContent="start">
                                  <ImageCloudFlare
                                    w="50px"
                                    h="50px"
                                    size="100"
                                    mr="20px"
                                    src={item["avatar"]}
                                  />

                                  <Text>{item.nftName}</Text>
                                </HStack>
                              ) : i === "sellerName" ||
                                i === "traderName" ||
                                i === "buyerName" ||
                                i === "nftContractAddress" ? (
                                <Text
                                  color={
                                    [
                                      "nftContractAddress",
                                      "sellerName",
                                      "traderName",
                                      "buyerName",
                                    ].includes(i) && "#7ae7ff"
                                  }
                                >
                                  <AddressCopier address={item[i]} />
                                </Text>
                              ) : (
                                <Text>{item[i]}</Text>
                              )}
                            </Td>
                          )
                        )}
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
          <Flex mt="30px">
            <CommonButton
              px="2px"
              h="40px"
              isDisabled={currentPage === 1}
              text="Back"
              onClick={fetchBack}
            />
            <CommonButton
              mx="10px"
              px="2px"
              h="40px"
              isDisabled={!hasMore}
              text="Next"
              onClick={fetchMore}
            />
          </Flex>
        </>
      )}
    </>
  );
}

export default memo(EventTable);
