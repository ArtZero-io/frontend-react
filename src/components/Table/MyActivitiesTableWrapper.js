import { useCallback, useEffect, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { APICall } from "@api/client";
import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import ImageCloudFlare from "@components/ImageWrapper/ImageCloudFlare";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import {
  formatNumDynamicDecimal,
  getTimestamp,
  resolveDomain,
  truncateStr,
} from "@utils";
import { azero_domains_nft } from "@utils/blockchain/abi";
import { useSubstrateState } from "@utils/substrate";
import { Link as ReactRouterLink } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import { SortTable } from "./SortTable";
import { useParams } from "react-router-dom";

const NUMBER_NFT_PER_PAGE = 10;

export default function MyActivitiesTableWrapper({ type, mode }) {
  const { api, apiState, chainToken, currentAccount } = useSubstrateState();

  const { address } = useParams();

  const userAccount =
    mode === "MY_ACCOUNT"
      ? currentAccount?.address
      : mode === "PUBLIC_ACCOUNT"
      ? address
      : null;
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(() => {
    let ret = [
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
    ];

    if (type === "BUY") {
      ret = ret.concat([
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
      ]);
    }

    if (type === "SELL") {
      ret = ret.concat([
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
      ]);
    }

    if (type === "LIST") {
      ret = ret.concat([
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
          accessorKey: "trader",
          header: () => <Text as="span">trader</Text>,
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
      ]);
    }

    if (type === "UNLIST") {
      ret.push({
        accessorKey: "trader",
        header: () => <Text as="span">trader</Text>,
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
      });
    }

    ret.push({
      accessorKey: "timestamp",
      header: () => <Text as="span">timestamp</Text>,
      size: 120,
    });

    return ret;
  }, [chainToken, type]);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    isFetched,
  } = useInfiniteQuery(
    ["my-activities-table", sorting, type],
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

      if (type === "BUY") {
        let { ret } = await APICall.getUserBuySellEvent({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            buyer: currentAccount?.address,
          },
        });

        eventsList = ret;
      }

      if (type === "SELL") {
        let { ret } = await APICall.getUserBuySellEvent({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            seller: currentAccount?.address,
          },
        });

        eventsList = ret;
      }

      if (type === "LIST") {
        let { ret } = await APICall.getNewListEvents({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            trader: currentAccount?.address,
          },
        });

        eventsList = ret;
      }

      if (type === "UNLIST") {
        let { ret } = await APICall.getUnlistEvents({
          offset: pageParam,
          order: orderParam.length === 0 ? ["blockNumber DESC"] : orderParam,
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            trader: currentAccount?.address,
          },
        });

        eventsList = ret;
      }

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
            if (!tokenID) return { nftContractAddress, tokenID, ...rest };

            console.log("options", options);
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
      console.log("eventsList", eventsList);
      return {
        data: eventsList,
        nextId: pageParam + NUMBER_NFT_PER_PAGE,
      };
    },
    [api, currentAccount?.address, orderParam, type]
  );

  return (
    <>
      <SortTable table={table} isLoading={isLoading} isFetched={isFetched} />

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
