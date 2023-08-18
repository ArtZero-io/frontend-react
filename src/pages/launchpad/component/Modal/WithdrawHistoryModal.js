import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  TableContainer,
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Skeleton,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import PaginationMP from "@components/Pagination/Pagination";

import toast from "react-hot-toast";
import { usePagination } from "@ajna/pagination";
import { APICall } from "@api/client";
import moment from "moment/moment";
import { formatNumDynamicDecimal } from "@utils";

const NUMBER_PER_PAGE = 5;

export default function WithdrawHistoryModal({
  collection_address,
  isOpen,
  onClose,
}) {
  // const dispatch = useDispatch();
  const { currentAccount, apiState } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  const [events, setEvents] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  const {
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    offset,
    pageSize,
  } = usePagination({
    total: totalCount,
    initialState: {
      currentPage: 1,
      isDisabled: false,
      pageSize: NUMBER_PER_PAGE,
    },
  });

  const fetchEvents = useCallback(
    async (isMounted) => {
      const options = {
        nftContractAddress: collection_address,
        limit: pageSize,
        offset: offset,
      };

      try {
        const {
          ret: dataList,
          totalCount,
          totalBalanceAmount,
        } = await APICall.getWithdrawEvent(options);

        setTotalCount(totalCount?.count);
        setTotalWithdrawn(totalBalanceAmount);
        setEvents(dataList);
      } catch (error) {
        console.log(error);
        setEvents([]);

        toast.error("There was an error while fetching the collections.");
      }
    },
    [collection_address, offset, pageSize]
  );

  useEffect(() => {
    if (apiState !== "READY") return;

    let isMounted = true;

    fetchEvents(isMounted);

    return () => {
      isMounted = false;
    };
  }, [currentAccount, fetchEvents, apiState]);

  // if (rest.step === FINALIZED) {
  //   dispatch(clearTxStatus());
  //   onClose();
  // }

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={["xs", "xl"]}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />

      <ModalContent
        px={["4px", "24px", "24px"]}
        pb={["4px", "32px", "32px"]}
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={["500px", "1100px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top="4"
          right="4"
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            Withdraw history
          </Heading>
          <Text fontWeight="500" fontSize="16px">
            Total withdrawn: {formatNumDynamicDecimal(totalWithdrawn)} AZERO
          </Text>
        </ModalHeader>

        <ModalBody>
          <Box mt={"30px"}>
            <TableContainer
              maxW="6xl-mid"
              fontSize="lg"
              h="full"
              overflow="auto"
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
              <Skeleton w="full" isLoaded={true}>
                <Table
                  variant="striped"
                  colorScheme="blackAlpha"
                  overflow="auto"
                >
                  <Thead>
                    <Tr>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        BlockNumber
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Address
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Balance
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Date
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {events.length === 0 ? (
                      <Tr color="#fff">
                        <Td colSpan={4} py={7} textAlign="center">
                          No record found
                        </Td>
                      </Tr>
                    ) : (
                      events.map((reward, index) => (
                        <Tr key={index} color="#fff">
                          {/* <Td py={7}>{truncateStr(reward.address, 5)}</Td> */}
                          <Td textAlign="left" py={7}>
                            {reward.blockNumber}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {reward.receiver}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {formatNumDynamicDecimal(reward?.withdrawAmount)}{" "}
                            <AzeroIcon
                              mb="4px"
                              w={["14px", "16px"]}
                              h={["14px", "16px"]}
                            />
                          </Td>
                          <Td textAlign="left" py={7}>
                            {moment(reward.createdTime).format(
                              "MMMM D YYYY, h:mm:ss a"
                            )}
                          </Td>
                        </Tr>
                      ))
                    )}
                  </Tbody>
                </Table>
              </Skeleton>
            </TableContainer>
            <Stack w="full" py="30px">
              <PaginationMP
                bg="#333"
                maxW="230px"
                hasGotoPage={false}
                pagesCount={pagesCount}
                isDisabled={isDisabled}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
