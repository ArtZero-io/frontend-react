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

const NUMBER_NFT_PER_PAGE = 5;

function TabActivity({ collectionOwner, nftContractAddress }) {
  const tabData = [
    {
      label: "SALE",
      content: (
        <NewEventTable
          type="SALE"
          collectionOwner={collectionOwner}
          tableHeaders={headers.sale}
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

      if (type === "SALE") {
        let { ret } = await APICall.getUserBuySellEvent({
          offset: pageParam,
          order: ["blockNumber DESC"],
          limit: NUMBER_NFT_PER_PAGE,
          where: {
            nftContractAddress: collection_address,
          },
        });

        eventsList = ret;
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

      if (eventsList?.length > 0) {
        eventsList = await Promise.all(
          eventsList?.map(async ({ nftContractAddress, tokenID, ...rest }) => {
            const { status, ret } = await APICall.getNFTByID({
              token_id: tokenID,
              collection_address: nftContractAddress,
            });

            const eventFormatted = {
              nftContractAddress,
              tokenID,
              ...rest,
            };

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
    [collection_address, type]
  );

  const { hasNextPage, data, isFetchingNextPage, fetchNextPage, isLoading } =
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
      {isLoading ? (
        <HStack pt="80px" pb="20px" justifyContent="center" w="full">
          <BeatLoader color="#7ae7ff" size="10px" />
        </HStack>
      ) : (
        <EventTable
          type={type}
          collectionOwner={collectionOwner}
          tableHeaders={tableHeaders}
          tableData={dataFormatted}
          ref={ref}
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
  SALE: "sale",
  LIST: "list",
  UNLIST: "unlist",
};

const headers = {
  sale: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    platformFee: "platform Fee",
    royaltyFee: "royalty fee",
    seller: "seller",
    buyer: "buyer",
    blockNumber: "block no#",
  },
  list: {
    nftName: "nft name",
    avatar: "image",
    price: "price",
    trader: "trader",
    blockNumber: "block no#",
  },
  unlist: {
    nftName: "nft name",
    avatar: "image",
    trader: "trader",
    blockNumber: "block no#",
  },
};
