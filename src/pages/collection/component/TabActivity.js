import React, { useCallback, useEffect, useRef, useState } from "react";
import EventTable from "@components/Table/EventTable";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { getPublicCurrentAccount, truncateStr } from "@utils";
import profile_calls from "@utils/blockchain/profile_calls";
import { APICall, clientAPI } from "../../../api/client";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { SCROLLBAR } from "../../../constants";

function TabActivity({
  tokenUriType1,
  latestBlockNumber,
  collectionOwner,
  ...rest
}) {
  const { platformEvents } = useSelector((s) => s.account);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [collectionOwnerName, setCollectionOwnerName] = useState(null);
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

  useEffect(() => {
    const collectionOwnerName = async () => {
      const name = await getUsername({
        accountAddress: collectionOwner,
      });

      return name;
    };

    collectionOwnerName().then((name) => {
      setCollectionOwnerName(name);
    });
  }, [collectionOwner, getUsername]);

  const tabData = [
    {
      label: "PURCHASE",
      content: (
        <EventTable
          {...rest}
          type="PURCHASE"
          collectionOwnerName={collectionOwnerName}
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
          collectionOwnerName={collectionOwnerName}
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
          collectionOwnerName={collectionOwnerName}
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
          collectionOwnerName={collectionOwnerName}
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
        // orientation={["horizontal", "vertical", "vertical"]}
        // orientation={{ base: "horizontal", xl: "vertical" }}
      >
        <TabList
          pt="11px"
          pr="5px"
          pb="8px"
          sx={SCROLLBAR}
          overflowX="scroll"
          borderColor="#171717"
          justifyContent="start"
          // maxW={{ base: "320px", xl: "600px" }}
        >
          {tabData.map((tab, index) => (
            <Tab
              minW="50px"
              key={index}
              alignItems="center"
              justifyContent="center"
              py={{ base: "4px", xl: "12px" }}
              fontSize={{ base: "md", xl: "lg" }}
              fontFamily="Evogria Italic, san serif"
              _selected={{ bg: "#7ae7ff", color: "#000" }}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
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

const getMetaDataType1 = async (tokenID, token_uri) => {
  console.log(
    "getJSON?input",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json"
  );
  const metadata = await clientAPI(
    "get",
    "/getJSON?input=" + token_uri + tokenID.toString() + ".json",
    {}
  );

  console.log("metadata", metadata);

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    const ret = {
      // ...metadata,
      attrsList,
      avatar: metadata.image,
      nftName: metadata.name,
      description: metadata.description,
    };
    return ret;
  }
};
