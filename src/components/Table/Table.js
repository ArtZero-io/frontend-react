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
import { SCROLLBAR } from "../../constants";
import useTxStatus from "../../hooks/useTxStatus";
import CommonButton from "../../components/Button/CommonButton";

function CommonTable({
  tableHeaders,
  tableData,
  onClickHandler,
  isOwner,
  idSelected,
  ...rest
}) {
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);

  const { actionType, tokenIDArray } = useTxStatus();

  return (
    <TableContainer
      {...rest}
      h="full"
      maxW="6xl-mid"
      sx={SCROLLBAR}
      overflow="auto"
      overflowY="scroll"
      fontSize={["md", "lg", "lg"]}
      maxH={{ base: "20rem", "2xl": "30rem" }}
    >
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
                          <Flex justifyContent="center" w="full">
                            <CommonButton
                              isDisabled={
                                (addNftTnxStatus?.status &&
                                  idSelected !== item?.bidId) ||
                                (actionType &&
                                  !tokenIDArray.includes(item.bidId))
                              }
                              mx="auto"
                              isDo={idSelected === item?.bidId}
                              type={AccountActionTypes.SET_ADD_NFT_TNX_STATUS}
                              text="accept bid"
                              isLoading={addNftTnxStatus}
                              loadingText={`${addNftTnxStatus?.status}`}
                              onClick={() => onClickHandler(item?.bidId)}
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
    </TableContainer>
  );
}

export default CommonTable;
