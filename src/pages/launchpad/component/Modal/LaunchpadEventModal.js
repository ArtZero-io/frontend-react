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
  Text,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useSubstrateState } from "@utils/substrate";
import useTxStatus from "@hooks/useTxStatus";
import { FINALIZED } from "@constants";
// import { clearTxStatus } from "@store/actions/txStatus";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import PaginationMP from "@components/Pagination/Pagination";

import toast from "react-hot-toast";
import { usePagination } from "@ajna/pagination";
import { APICall } from "@api/client";
import { formatNumDynamicDecimal } from "@utils";
import { useRef } from "react";

const NUMBER_PER_PAGE = 5;

export default function LaunchpadEventModal({
  collection_address,
  isOpen,
  onClose,
}) {
  // const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { tokenIDArray, actionType, ...rest } = useTxStatus();
  const [totalCount, setTotalCount] = useState(0);
  const [, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [totalMintedAmount, setTotalMintedAmount] = useState(0);
  const [searchAddress, setSearchAddress] = useState("");
  const [address, setAddress] = useState("");

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
    async (isMounted = true) => {
      setLoading(true);

      const options = {
        nftContractAddress: collection_address,
        limit: pageSize,
        offset: offset,
      };

      // eslint-disable-next-line no-extra-boolean-cast
      if (!!searchAddress) {
        options.keyword = searchAddress;
      }

      try {
        const {
          ret: dataList,
          totalCount,
          totalMintedAmount,
        } = await APICall.getLaunchpadEvent(options);
        if (!isMounted) return;
        setTotalCount(totalCount?.count);
        setTotalMintedAmount(totalMintedAmount);
        setEvents(dataList);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setEvents([]);

        setLoading(false);

        toast.error("There was an error while fetching the collections.");
      }
    },
    [collection_address, offset, pageSize, searchAddress]
  );

  useEffect(() => {
    let isMounted = true;

    fetchEvents(isMounted);

    return () => {
      isMounted = false;
    };
  }, [currentAccount, fetchEvents]);

  const searchAddressRef = useRef(null);

  const onChangeHandler = (value) => {
    setAddress(value);

    if (searchAddressRef.current) {
      clearTimeout(searchAddressRef.current);
    }

    searchAddressRef.current = setTimeout(() => setSearchAddress(value), 500);
  };
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
          top="4"
          right="4"
          onClick={() => rest?.step === FINALIZED && rest?.onEndClick()}
        />
        <ModalHeader textAlign="center">
          <Heading size="h4" my={2}>
            Minting history
          </Heading>{" "}
          <Text fontWeight="500" fontSize="16px">
            Total minted: {formatNumDynamicDecimal(totalMintedAmount)} NFTs
          </Text>
        </ModalHeader>

        <ModalBody>
          <Flex>
            <InputGroup size="md">
              <Input
                borderRadius={0}
                variant="outline"
                pr="4.5rem"
                type="text"
                placeholder="Enter minter address"
                value={address}
                onChange={({ target }) => onChangeHandler(target.value)}
              />
              <InputRightElement mr="4px" width="4.5rem">
                <Button
                  size="sm"
                  isDisabled={!searchAddress}
                  onClick={() => onChangeHandler("")}
                >
                  clear
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Box mt={"0px"}>
            <TableContainer
              maxH="380px"
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
                        py={4}
                      >
                        BlockNumber
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={4}
                      >
                        Minter Address
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={4}
                      >
                        Mint Amount
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={4}
                      >
                        Minting Fee
                      </Th>
                      <Th
                        textAlign="left"
                        fontFamily="Evogria"
                        fontSize="sm"
                        fontWeight="normal"
                        py={4}
                      >
                        Project Mint Fee
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {events?.length === 0 ? (
                      <Tr color="#fff">
                        <Td colSpan={5} py={4} textAlign="center">
                          No record found
                        </Td>
                      </Tr>
                    ) : (
                      events?.map((reward, index) => (
                        <Tr key={index} color="#fff">
                          <Td textAlign="left" py={4}>
                            {reward.blockNumber}
                          </Td>
                          <Td textAlign="left" py={4}>
                            {reward.minter}
                          </Td>
                          <Td textAlign="left" py={4}>
                            {reward.mintAmount}
                          </Td>
                          <Td textAlign="left" py={4}>
                            {reward.mintingFee.toFixed(3)}{" "}
                          </Td>
                          <Td textAlign="left" py={4}>
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
            <Stack w="full" py="10px">
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
