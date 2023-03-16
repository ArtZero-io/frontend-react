import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSubstrateState } from "@utils/substrate";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import PaginationMP from "@components/Pagination/Pagination";

import toast from "react-hot-toast";
import { usePagination } from "@ajna/pagination";
import { APICall } from "../../../../api/client";
const NUMBER_PER_PAGE = 3;

export default function LaunchpadEventModal({
  collection_address,
  isOpen,
  onClose,
}) {
  const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  const [totalCount, setTotalCount] = useState(0);
  const [, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

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
      setLoading(true);

      const options = {
        nftContractAddress: collection_address,
        limit: pageSize,
        offset: offset,
      };

      try {
        const { ret: dataList, totalCount } = await APICall.getLaunchpadEvent(
          options
        );
        if (!isMounted) return;
        setTotalCount(totalCount?.count);
        setEvents(dataList);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setEvents([]);

        setLoading(false);

        toast.error("There was an error while fetching the collections.");
      }
    },
    [collection_address, offset, pageSize]
  );

  useEffect(() => {
    let isMounted = true;

    fetchEvents(isMounted);

    return () => {
      isMounted = false;
    };
  }, [currentAccount, fetchEvents]);

  if (rest.step === FINALIZED) {
    dispatch(clearTxStatus());
    onClose();
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      onClose={onClose}
      isCentered
      isOpen={isOpen}
      size={["xs", "xl"]}
    >
      <ModalContent
        pt="20px"
        pb="30px"
        px={[0, "10px"]}
        borderRadius="0"
        position="relative"
        bg="brand.grayDark"
        maxW={["600px", "1200px"]}
      >
        <ModalCloseButton
          borderWidth={2}
          borderRadius="0"
          position="absolute"
          top={["0", "-8", "-8"]}
          right={["0", "-8", "-8"]}
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            Minting history
          </Heading>
        </ModalHeader>

        <ModalBody>
          <Box mt={"20px"}>
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
                        Minter Address
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Mint Amount
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Minting Fee
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={7}
                      >
                        Project Mint Fee
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {events?.length === 0 ? (
                      <Tr color="#fff">
                        <Td colSpan={4} py={7} textAlign="center">
                          No record found
                        </Td>
                      </Tr>
                    ) : (
                      events?.map((reward, index) => (
                        <Tr key={index} color="#fff">
                          {/* <Td py={7}>{truncateStr(reward.address, 5)}</Td> */}
                          <Td textAlign="left" py={7}>
                            {reward.blockNumber}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {reward.minter}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {reward.mintAmount}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {reward.mintingFee.toFixed(3)}{" "}
                          </Td>
                          <Td textAlign="left" py={7}>
                            {reward.projectMintFee.toFixed(3)}{" "}
                            <AzeroIcon
                              mb="4px"
                              w={["14px", "16px"]}
                              h={["14px", "16px"]}
                            />
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
