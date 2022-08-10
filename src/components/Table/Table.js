/* eslint-disable no-unused-vars */
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
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { truncateStr } from "@utils";
import StatusBuyButton from "../Button/StatusBuyButton";
import { AccountActionTypes } from "@store/types/account.types";
import { SCROLLBAR, ACCEPT_BID } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import CommonButton from "@components/Button/CommonButton";

function CommonTable({
  tableHeaders,
  tableData,
  onClickHandler,
  isOwner,
  // idSelected,
  // saleInfo,
}) {
  const { actionType, tokenIDArray, ...rest } = useTxStatus();

  return (
    <TableContainer
      h="full"
      maxW="6xl-mid"
      sx={SCROLLBAR}
      overflow="auto"
      overflowY="scroll"
      fontSize={["md", "lg", "lg"]}
      maxH={{ base: "20rem", "2xl": "30rem" }}
    >
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      > */}
      {tableData?.length ? (
        <>
          <Table variant="striped" size="md" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                {tableHeaders?.map((item, idx) => (
                  <Th
                    top={0}
                    bg="#222"
                    key={idx}
                    zIndex={1}
                    fontSize="sm"
                    position="sticky"
                    fontWeight="normal"
                    textAlign="center"
                    fontFamily="Evogria"
                    py={{ base: "1rem", "2xl": "1.75rem" }}
                    display={item === "action" && !isOwner && "none"}
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
                        <CommonButton
                          mx="0"
                          px="8px"
                          h="40px"
                          {...rest}
                          text="accept bid"
                          onClick={() => onClickHandler(item?.bidId)}
                          isDisabled={
                            actionType && !tokenIDArray?.includes(item.bidId)
                          }
                        />
                      </Td>
                    ) : (
                      ""
                    )}
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
        </>
      ) : null}
      {/* </motion.div> */}
    </TableContainer>
  );
}

export default CommonTable;
