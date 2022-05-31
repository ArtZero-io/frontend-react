import React, { useCallback, useEffect, useRef, useState } from "react";
import EventTable from "@components/Table/EventTable";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { getPublicCurrentAccount, truncateStr } from "@utils";
import profile_calls from "@utils/blockchain/profile_calls";
import { APICall, clientAPI } from "../../../api/client";
import AnimationLoader from "@components/Loader/AnimationLoader";

function TabActivity({ tokenUriType1, latestBlockNumber }) {
  const { platformEvents } = useSelector((s) => s.account);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loadingTime, setLoadingTime] = useState(null);
  const [collectionEventsFull, setCollectionEventsFull] = useState(null);

  const latestBlockNumberRef = useRef(latestBlockNumber);
  const shouldUpdate = latestBlockNumber !== latestBlockNumberRef.current;

  const getUsername = useCallback(async ({ accountAddress }) => {
    const {
      data: { username },
    } = await profile_calls.getProfileOnChain({
      callerAccount: getPublicCurrentAccount(),
      accountAddress,
    });

    return username || truncateStr(accountAddress);
  }, []);

  useEffect(() => {
    setLoading(true);

    const collectionEventsFull = async () => {
      try {
        platformEvents?.events &&
          (await Promise.all(
            platformEvents?.events?.map(async (event) => {
              const buyerName = await getUsername({
                accountAddress: event.buyer,
              });

              const sellerName = await getUsername({
                accountAddress: event.seller,
              });

              const traderName = await getUsername({
                accountAddress: event.trader,
              });

              const [{ name, contractType }] =
                await APICall.getCollectionByAddress({
                  collection_address: event.nftContractAddress,
                });

              event = {
                ...event,
                buyerName,
                sellerName,
                traderName,
                collectionName: name,
              };

              if (contractType === 2) {
                const [{ attributesValue }] = await APICall.getNFTByID({
                  collection_address: event.nftContractAddress,
                  token_id: event.tokenID,
                });

                event = {
                  ...event,
                  nftName: attributesValue[0],
                  avatar: attributesValue[2],
                };
              }

              if (contractType === 1) {
                const { name, avatar } = await getMetaDataType1(
                  event.tokenID,
                  tokenUriType1
                );

                event = {
                  ...event,
                  nftName: name,
                  avatar,
                };
              }

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
  }, [shouldUpdate]);

  const tabData = [
    {
      label: "PURCHASE",
      content: (
        <EventTable
          tableHeaders={headers.purchase}
          tableData={collectionEventsFull?.filter((i) => i.type === "PURCHASE")}
        />
      ),
    },
    {
      label: "LIST",
      content: (
        <EventTable
          tableHeaders={headers.list}
          tableData={collectionEventsFull?.filter((i) => i.type === "LIST")}
        />
      ),
    },
    {
      label: "UNLIST",
      content: (
        <EventTable
          tableHeaders={headers.unlist}
          tableData={collectionEventsFull?.filter((i) => i.type === "UNLIST")}
        />
      ),
    },
    {
      label: "BID ACCEPTED",
      content: (
        <EventTable
          tableHeaders={headers.bidAccepted}
          tableData={collectionEventsFull?.filter(
            (i) => i.type === "BID ACCEPTED"
          )}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs
        isLazy
        align="center"
        colorScheme="brand.blue"
        orientation="vertical"
      >
        <TabList
          justifyContent="start"
          borderColor="#171717"
          pt="11px"
          pr="5px"
        >
          {tabData.map((tab, index) => (
            <Tab
              _selected={{ bg: "#7ae7ff", color: "#000" }}
              fontSize="15px"
              minW="130px"
              alignItems="center"
              justifyContent="start"
              key={index}
              textAlign="left"
              py="15px"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        {!platformEvents?.events ? (
          <AnimationLoader loadingTime={5} />
        ) : (
          <TabPanels h="full" minH="md" bg="#171717">
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

const headers = {
  purchase: {
    collectionName: "Collection",
    nftName: "NFT Name",
    avatar: "Image",
    type: "Type",
    price: "Price",
    platformFee: "Platform Fee",
    royalFee: "Royal Fee",
    sellerName: "Seller",
    buyerName: "Buyer",
    blockNumber: "Block No#",
  },
  list: {
    collectionName: "Collection",
    nftName: "NFT Name",
    avatar: "Image",
    type: "Type",
    price: "Price",
    traderName: "Trader",
    blockNumber: "Block No#",
  },
  unlist: {
    collectionName: "Collection",
    nftName: "NFT Name",
    avatar: "Image",
    type: "Type",
    traderName: "Trader",
    blockNumber: "Block No#",
  },
  bidAccepted: {
    collectionName: "Collection",
    nftName: "NFT Name",
    avatar: "Image",
    type: "Type",
    price: "Price",
    platformFee: "Platform Fee",
    royalFee: "Royal Fee",
    sellerName: "Seller",
    buyerName: "Buyer",
    blockNumber: "Block No#",
  },
};

const getMetaDataType1 = async (tokenID, token_uri) => {
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    return {
      ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
    };
  }
};
