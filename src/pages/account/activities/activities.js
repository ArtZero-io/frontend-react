import {
  Box,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import EventTable from "@components/Table/EventTable";
import React, { useEffect } from "react";

import { APICall } from "@api/client";
import CommonContainer from "@components/Container/CommonContainer";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { SCROLLBAR } from "@constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTimestamp, resolveDomain } from "@utils";
import { useSubstrateState } from "@utils/substrate";
import { useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";

const NUMBER_NFT_PER_PAGE = 5;

function ActivityPages() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  const tabData = [
    {
      label: "PURCHASE",
      content: (
        <EventTableWrapper type="PURCHASE" tableHeaders={headers.purchase} />
      ),
    },
    {
      label: "LIST",
      content: <EventTableWrapper type="LIST" tableHeaders={headers.list} />,
    },
    {
      label: "UNLIST",
      content: (
        <EventTableWrapper type="UNLIST" tableHeaders={headers.unlist} />
      ),
    },
    {
      label: "BID ACCEPTED",
      content: (
        <EventTableWrapper
          type="BID ACCEPTED"
          tableHeaders={headers.bidAccepted}
        />
      ),
    },
  ];

  return (
    <CommonContainer>
      <VStack as="section" w="full">
        <Box w="full" textAlign="left" mb={[0, "24px"]}>
          <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>My Activities</Heading>
        </Box>
      </VStack>

      <Tabs
        px="0px"
        isLazy
        index={tabIndex}
        align="center"
        colorScheme="brand.blue"
        onChange={(i) => setTabIndex(i)}
      >
        {!isBigScreen ? (
          <DropdownMobile
            minW="325px"
            my="20px"
            border="1px solid #343333"
            fontSize="15px"
            fontFamily="Evogria, san serif"
            options={dropDownMobileOptions}
            selectedItem={Object.keys(dropDownMobileOptions)[tabIndex]}
            setSelectedItem={(i) =>
              setTabIndex(Object.keys(dropDownMobileOptions).indexOf(i))
            }
          />
        ) : (
          <TabList
            pt="11px"
            pr="5px"
            pb="8px"
            sx={SCROLLBAR}
            overflowX="scroll"
            borderColor="#171717"
            justifyContent="center"
          >
            {tabData.map((tab, index) => (
              <Tab
                color="#888"
                border="1px solid #343333"
                minW="180px"
                minH="50px"
                key={index}
                alignItems="center"
                justifyContent="center"
                py={{ base: "4px", xl: "12px" }}
                fontSize={{ base: "sm", xl: "15px" }}
                fontFamily="Evogria , san serif"
                _selected={{ border: "2px solid #7ae7ff", color: "#7ae7ff" }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        )}

        <TabPanels h="full" minH="md">
          {tabData.map((tab, index) => (
            <TabPanel p="0px" key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </CommonContainer>
  );
}

export default ActivityPages;

const EventTableWrapper = ({ type, tableHeaders }) => {
  const { ref, inView } = useInView();
  const { api, apiState, currentAccount } = useSubstrateState();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const fetchEvents = useCallback(
    async ({ pageParam }) => {
      if (pageParam === undefined || apiState !== "READY") return;

      let eventsList = [];

      if (type === "PURCHASE") {
        const { ret } = await APICall.getUserPurchaseEvents({
          buyer: currentAccount?.address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
        eventsList = ret;
      }

      if (type === "LIST") {
        const { ret } = await APICall.getUserNewListEvents({
          trader: currentAccount?.address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
        eventsList = ret;
      }

      if (type === "UNLIST") {
        const { ret } = await APICall.getUserUnlistEvents({
          trader: currentAccount?.address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
        eventsList = ret;
      }

      if (type === "BID ACCEPTED") {
        const { ret } = await APICall.getUserBidWinEvents({
          seller: currentAccount?.address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
        eventsList = ret;
      }

      if (eventsList?.length > 0) {
        eventsList = await Promise.all(
          eventsList?.map(async (event) => {
            const { blockNumber, buyer, seller, trader } = event;

            const buyerDomain = await resolveDomain(buyer, api);
            const sellerDomain = await resolveDomain(seller, api);
            const traderDomain = await resolveDomain(trader, api);

            const eventFormatted = {
              ...event,
              buyerDomain,
              sellerDomain,
              traderDomain,
            };

            const timestamp = await getTimestamp(api, blockNumber);

            if (timestamp) {
              eventFormatted.timestamp = timestamp;
            }

            return eventFormatted;
          })
        );
      }

      return {
        eventsList,
        nextId: pageParam + NUMBER_NFT_PER_PAGE,
      };
    },
    [api, apiState, type, currentAccount?.address]
  );

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      [`getEvents${type}`, currentAccount?.address, apiState],
      ({ pageParam = 0 }) => fetchEvents({ pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.eventsList?.length < NUMBER_NFT_PER_PAGE) {
            return undefined;
          }
          return lastPage.nextId || 0;
        },
      }
    );

  const dataFormatted = useMemo(
    () =>
      data?.pages?.reduce((a, b) => {
        return a.concat(b?.eventsList);
      }, []),
    [data]
  );

  return (
    <>
      {isLoading ? (
        <HStack pt="80px" pb="20px" justifyContent="center" w="full">
          <BeatLoader color="#7ae7ff" size="10px" />
        </HStack>
      ) : (
        <EventTable
          type={type}
          tableHeaders={tableHeaders}
          tableData={dataFormatted}
        />
      )}

      {dataFormatted?.length ? (
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
      ) : (
        ""
      )}
    </>
  );
};

const dropDownMobileOptions = {
  PURCHASE: "purchase",
  LIST: "list",
  UNLIST: "unlist",
  BID_ACCEPTED: "bid accepted",
};

const headers = {
  purchase: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    platformFee: "platform Fee",
    royaltyFee: "royalty fee",
    seller: "seller",
    buyer: "buyer",
    timestamp: "timestamp",
  },
  list: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    trader: "trader",
    timestamp: "timestamp",
  },
  unlist: {
    nftName: "nft name",
    avatar: "image",
    trader: "trader",
    timestamp: "timestamp",
  },
  bidAccepted: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    platformFee: "platform fee",
    royaltyFee: "royalty fee",
    seller: "seller",
    buyer: "buyer",
    timestamp: "timestamp",
  },
};
