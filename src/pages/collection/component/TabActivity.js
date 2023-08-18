import React, { useEffect } from "react";
import EventTable from "@components/Table/EventTable";
import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { APICall } from "@api/client";
import { SCROLLBAR } from "@constants";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { BeatLoader } from "react-spinners";
import { useSubstrateState } from "@utils/substrate";
import azero_domains_nft from "../../../utils/blockchain/azero-domains-nft";
import { resolveDomain, getTimestamp } from "@utils";

const NUMBER_NFT_PER_PAGE = 5;

function TabActivity({ collectionOwner, nftContractAddress }) {
  const tabData = [
    {
      label: "PURCHASE",
      content: (
        <NewEventTable
          type="PURCHASE"
          collectionOwner={collectionOwner}
          tableHeaders={headers.purchase}
          collection_address={nftContractAddress}
        />
      ),
    },
    {
      label: "LIST",
      content: (
        <NewEventTable
          type="LIST"
          collectionOwner={collectionOwner}
          tableHeaders={headers.list}
          collection_address={nftContractAddress}
        />
      ),
    },
    {
      label: "UNLIST",
      content: (
        <NewEventTable
          type="UNLIST"
          collectionOwner={collectionOwner}
          tableHeaders={headers.unlist}
          collection_address={nftContractAddress}
        />
      ),
    },
    {
      label: "BID ACCEPTED",
      content: (
        <NewEventTable
          type="BID ACCEPTED"
          collectionOwner={collectionOwner}
          tableHeaders={headers.bidAccepted}
          collection_address={nftContractAddress}
        />
      ),
    },
  ];

  const [tabIndex, setTabIndex] = React.useState(0);
  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <>
      <Tabs
        px="12px"
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
    </>
  );
}

export default TabActivity;

const NewEventTable = ({
  type,
  tableHeaders,
  collection_address,
  collectionOwner,
}) => {
  const { ref, inView } = useInView();
  const { api } = useSubstrateState();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const fetchEvents = useCallback(
    async ({ pageParam }) => {
      if (pageParam === undefined) return;

      let eventsList = [];

      if (type === "PURCHASE") {
        eventsList = await APICall.getPurchaseEvents({
          collection_address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
      }

      if (type === "LIST") {
        eventsList = await APICall.getNewListEvents({
          collection_address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
      }

      if (type === "UNLIST") {
        eventsList = await APICall.getUnlistEvents({
          collection_address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
      }

      if (type === "BID ACCEPTED") {
        eventsList = await APICall.getBidWinEvents({
          collection_address,
          offset: pageParam,
          limit: NUMBER_NFT_PER_PAGE,
        });
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
        eventsList,
        nextId: pageParam + NUMBER_NFT_PER_PAGE,
      };
    },
    [api, collection_address, type]
  );

  const { hasNextPage, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [`getEvents${type}`, collection_address],
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
      <EventTable
        type={type}
        collectionOwner={collectionOwner}
        tableHeaders={tableHeaders}
        tableData={dataFormatted}
        ref={ref}
      />

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
    // blockNumber: "block no#",
    timestamp: "timestamp",
  },
  list: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    trader: "trader",
    // blockNumber: "block no#",
    timestamp: "timestamp",
  },
  unlist: {
    nftName: "nft name",
    avatar: "image",
    trader: "trader",
    // blockNumber: "block no#",
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
    // blockNumber: "block no#",
    timestamp: "timestamp",
  },
};
