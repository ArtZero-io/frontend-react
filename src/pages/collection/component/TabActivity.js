import React, { useEffect, useRef, useState } from "react";
import EventTable from "@components/Table/EventTable";
import { useSelector } from "react-redux";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from "@chakra-ui/react";

import { truncateStr } from "@utils";
import { APICall } from "@api/client";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { SCROLLBAR } from "@constants";
import DropdownMobile from "@components/Dropdown/DropdownMobile";

function TabActivity({
  tokenUriType1,
  latestBlockNumber,
  collectionOwner,
  ...rest
}) {
  const { platformEvents } = useSelector((s) => s.account);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  const [collectionEventsFull, setCollectionEventsFull] = useState(null);

  const latestBlockNumberRef = useRef(latestBlockNumber);
  const shouldUpdate = latestBlockNumber !== latestBlockNumberRef.current;

  useEffect(() => {
    setLoading(true);

    const collectionEventsFull = async () => {
      try {
        platformEvents?.events &&
          (await Promise.all(
            platformEvents?.events?.map(async (event) => {
              const {
                ret: [{ name }],
              } = await APICall.getCollectionByAddress({
                collection_address: event.nftContractAddress,
              });

              const {
                ret: [{ nftName, avatar }],
              } = await APICall.getNFTByID({
                collection_address: event.nftContractAddress,
                token_id: event.tokenID,
              });

              event = {
                ...event,
                buyerName: truncateStr(event.buyer),
                sellerName: truncateStr(event.seller),
                traderName: truncateStr(event.trader),
                collectionName: name,
                nftName,
                avatar,
              };

              return event;
            })
          ).then((arr) => {
            setLoading(false);

            setCollectionEventsFull(arr);
          }));
      } catch (error) {
        console.log("error", error);
      }
    };
    latestBlockNumberRef.current = latestBlockNumber;
    collectionEventsFull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);

  const tabData = [
    {
      label: "PURCHASE",
      content: (
        <EventTable
          {...rest}
          type="PURCHASE"
          collectionOwnerName={truncateStr(collectionOwner)}
          tableHeaders={headers.purchase}
          tableData={collectionEventsFull?.filter((i) => i.type === "PURCHASE")}
        />
      ),
    },
    {
      label: "LIST",
      content: (
        <EventTable
          {...rest}
          type="LIST"
          collectionOwnerName={truncateStr(collectionOwner)}
          tableHeaders={headers.list}
          tableData={collectionEventsFull?.filter((i) => i.type === "LIST")}
        />
      ),
    },
    {
      label: "UNLIST",
      content: (
        <EventTable
          {...rest}
          type="UNLIST"
          collectionOwnerName={truncateStr(collectionOwner)}
          tableHeaders={headers.unlist}
          tableData={collectionEventsFull?.filter((i) => i.type === "UNLIST")}
        />
      ),
    },
    {
      label: "BID ACCEPTED",
      content: (
        <EventTable
          {...rest}
          type="BID ACCEPT"
          collectionOwnerName={truncateStr(collectionOwner)}
          tableHeaders={headers.bidAccepted}
          tableData={collectionEventsFull?.filter(
            (i) => i.type === "BID ACCEPTED"
          )}
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
        index={tabIndex}
        onChange={(i) => setTabIndex(i)}
        isLazy
        align="center"
        colorScheme="brand.blue"
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

        {!platformEvents?.events ? (
          <AnimationLoader loadingTime={5} />
        ) : (
          <TabPanels h="full" minH="md">
            {tabData.map((tab, index) => (
              <TabPanel p="0px" key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        )}
      </Tabs>
    </>
  );
}

export default TabActivity;

const dropDownMobileOptions = {
  PURCHASE: "purchase",
  LIST: "list",
  UNLIST: "unlist",
  BID_ACCEPTED: "bid accepted",
};

const headers = {
  purchase: {
    collectionName: "collection name",
    nftName: "nft name",
    avatar: "image",
    type: "type",
    price: "price",
    platformFee: "platform Fee",
    royalFee: "royal fee",
    sellerName: "seller",
    buyerName: "buyer",
    blockNumber: "block no#",
  },
  list: {
    collectionName: "collection name",
    nftName: "nft name",
    avatar: "image",
    type: "type",
    price: "price",
    traderName: "trader",
    blockNumber: "block no#",
  },
  unlist: {
    collectionName: "collection name",
    nftName: "nft name",
    avatar: "image",
    type: "type",
    traderName: "trader",
    blockNumber: "block no#",
  },
  bidAccepted: {
    collectionName: "collection name",
    nftName: "nft name",
    avatar: "image",
    type: "type",
    price: "price",
    platformFee: "platform fee",
    royalFee: "royal fee",
    sellerName: "seller",
    buyerName: "buyer",
    blockNumber: "block no#",
  },
};
