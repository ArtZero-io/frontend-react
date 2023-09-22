import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtual } from "react-virtual";

import { APICall } from "@api/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Link,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import { SCROLLBAR } from "@constants";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import {
  formatNumDynamicDecimal,
  getTimestamp,
  resolveDomain,
  truncateStr,
} from "@utils";
import { azero_domains_nft } from "@utils/blockchain/abi";
import { useSubstrateState } from "@utils/substrate";
import { motion } from "framer-motion";
import { Link as ReactRouterLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

const NUMBER_NFT_PER_PAGE = 10;

export default function SortTable({ collection_address, type }) {
  const { chainToken, api } = useSubstrateState();

  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "nftName",
        header: () => <Text as="span">NFT name</Text>,
        size: 120,
        cell: (info) => (
          <HStack justifyContent="start">
            <ImageCloudFlare
              w="50px"
              h="50px"
              size="100"
              mr="20px"
              src={info.row.original.avatar}
            />

            <p>{info.getValue()}</p>
          </HStack>
        ),
      },
      {
        accessorKey: "price",
        header: () => <Text as="span">price</Text>,
        size: 120,
        cell: (info) => (
          <Flex>
            {formatNumDynamicDecimal(info.getValue())}
            <AzeroIcon chainToken={chainToken} w="16px" />
          </Flex>
        ),
      },
      {
        accessorKey: "platformFee",
        header: () => <Text as="span">platform fee</Text>,
        size: 120,
        cell: (info) => (
          <Flex>
            {formatNumDynamicDecimal(info.getValue())}
            <AzeroIcon chainToken={chainToken} w="16px" />
          </Flex>
        ),
      },
      {
        accessorKey: "royaltyFee",
        header: () => <Text as="span">royalty fee</Text>,
        size: 120,
        cell: (info) => (
          <Flex>
            {formatNumDynamicDecimal(info.getValue())}
            <AzeroIcon chainToken={chainToken} w="16px" />
          </Flex>
        ),
      },
      {
        accessorKey: "seller",
        header: () => <Text as="span">seller</Text>,
        size: 120,
        cell: (info) => (
          <Text color="#7ae7ff">
            <Link
              color="#7AE7FF"
              textTransform="none"
              textDecoration="underline"
              as={ReactRouterLink}
              to={`/public-account/collections/${info.getValue()}`}
            >
              {info.row.original[`${info.column.id}Domain`] ??
                truncateStr(info.getValue())}
            </Link>
          </Text>
        ),
      },
      {
        accessorKey: "buyer",
        header: () => <Text as="span">buyer</Text>,
        size: 120,
        cell: (info) => (
          <Text color="#7ae7ff">
            <Link
              color="#7AE7FF"
              textTransform="none"
              textDecoration="underline"
              as={ReactRouterLink}
              to={`/public-account/collections/${info.getValue()}`}
            >
              {info.row.original[`${info.column.id}Domain`] ??
                truncateStr(info.getValue())}
            </Link>
          </Text>
        ),
      },
      {
        accessorKey: "timestamp",
        header: () => <Text as="span">timestamp</Text>,
        size: 120,
      },
    ],
    [chainToken]
  );

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetched,
    ...rest
  } = useInfiniteQuery(
    ["table-data", sorting, collection_address],
    async ({ pageParam = 0 }) => {
      const eventsData = await fetchEvents({ pageParam });
      return eventsData;
    },
    {
      getNextPageParam: (lastGroup) => {
        if (lastGroup?.data?.length < NUMBER_NFT_PER_PAGE) {
          return undefined;
        }
        return lastGroup.nextId || 0;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log("rest", rest);
  console.log("isFetching", isFetching);
  console.log("isLoading", isLoading);
  console.log("isFetchingNextPage", isFetchingNextPage);
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const table = useReactTable({
    data: flatData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const orderParam = useMemo(() => {
    return sorting.map((item) => {
      const type = item.desc === true ? "DESC" : "ASC";
      return `${item.id} ${type}`;
    });
  }, [sorting]);

  const fetchEvents = useCallback(
    async ({ pageParam }) => {
      if (pageParam === undefined) return;

      let eventsList = [];

      if (type === "SALE") {
        let { ret } = await APICall.getUserBuySellEvent({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            nftContractAddress: collection_address,
          },
        });

        eventsList = ret;
      }
      console.log("type", type);
      if (type === "LIST") {
        let { ret } = await APICall.getNewListEvents({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            nftContractAddress: collection_address,
          },
        });
        console.log("LIST ret", ret);
        eventsList = ret;
        //   eventsList = await APICall.getNewListEvents({
        //     collection_address,
        //     offset: pageParam,
        //     limit: NUMBER_NFT_PER_PAGE,
        //   });
      }

      // if (type === "UNLIST") {
      //   eventsList = await APICall.getUnlistEvents({
      //     collection_address,
      //     offset: pageParam,
      //     limit: NUMBER_NFT_PER_PAGE,
      //   });
      // }

      if (eventsList?.length > 0) {
        eventsList = await Promise.all(
          eventsList?.map(async ({ nftContractAddress, tokenID, ...rest }) => {
            let options = {
              collection_address: nftContractAddress,
            };

            if (nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
              options.azDomainName = rest?.azDomainName;
            } else {
              options.token_id = tokenID;
            }

            const { status, ret } = await APICall.getNFTByID(options);

            const buyerDomain = await resolveDomain(rest?.buyer, api);
            const sellerDomain = await resolveDomain(rest?.seller, api);
            const traderDomain = await resolveDomain(rest?.trader, api);

            const eventFormatted = {
              nftContractAddress,
              tokenID,
              ...rest,
              buyerDomain,
              sellerDomain,
              traderDomain,
            };

            const timestamp = await getTimestamp(api, rest?.blockNumber);

            if (timestamp) {
              eventFormatted.timestamp = timestamp;
            }

            if (status === "OK") {
              eventFormatted.nftName = ret[0]?.nftName;
              eventFormatted.avatar = ret[0]?.avatar;
            }
            return eventFormatted;
          })
        );
      }

      return {
        data: eventsList,
        nextId: pageParam + NUMBER_NFT_PER_PAGE,
      };
    },
    [api, collection_address, orderParam, type]
  );

  return (
    <>
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

      {flatData?.length && !isLoading && isFetched ? (
        <HStack pt="80px" pb="20px" justifyContent="center" w="full">
          <Text ref={ref}>
            {isFetchingNextPage ? (
              <BeatLoader color="#7ae7ff" size="10px" />
            ) : hasNextPage ? (
              ""
            ) : (
              "Nothing more to load"
            )}
          </Text>
        </HStack>
      ) : null}
    </>
  );
}
