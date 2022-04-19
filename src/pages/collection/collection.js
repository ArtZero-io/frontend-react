import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

import CollectionHero from "./component/Header/Header";

import Layout from "@components/Layout/Layout";

// import { useSubstrateState } from "@utils/substrate";
import { clientAPI } from "@api/client";
import toast from "react-hot-toast";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
function CollectionPage() {
  const { collection_address } = useParams();

  // const { currentAccount } = useSubstrateState();
  // const { activeAddress } = useSelector((s) => s.account);

  const [collection, setCollection] = useState({});

  // useEffect(async () => {
  //   console.log("hehe call contract");
  //   await onRefresh();
  // }, [activeAddress, currentAccount, collection_manager_calls.isLoaded()]);

  // const onRefresh = async () => {
  //   await getCollectionData();
  //   await delay(1000);
  // };

  // const getCollectionData = async () => {
  //   let data = await collection_manager_calls.getCollectionByAddress(
  //     currentAccount,
  //     param.address
  //   );

  //   let attributes = await collection_manager_calls.getAttributes(
  //     currentAccount,
  //     data?.nftContractAddress,
  //     ["name", "description", "avatar_image", "header_image"]
  //   );

  //   let res = {
  //     id: param.address,
  //     avatar: `${IPFS_BASE_URL}/${attributes[2]}`,
  //     backdrop: `${IPFS_BASE_URL}/${attributes[3]}`,
  //     volume: "11.1b",
  //     name: attributes[0],
  //     description: attributes[1],
  //   };

  //   setCollection(res);
  // };

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      const NFTListOptions = {
        limit: 12,
        offset: 0,
        sort: -1,
        collection_address,
      };
      try {
        const [collectionDetail] = await clientAPI(
          "post",
          "/getCollectionByAddress",
          {
            collection_address,
          }
        );

        const [floorPrice] = await clientAPI("post", "/getFloorPrice", {
          collection_address,
        });

        const NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);

        collectionDetail.floorPrice = floorPrice || 0;
        collectionDetail.nftList = NFTList;
        collectionDetail.nftTotalCount = NFTList?.length;

        setCollection(collectionDetail);
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    fetchCollectionDetail();
  }, []);

  const tabData = [
    {
      label: "Items",
      content: <TabCollectionItems {...collection} />,
    },
    {
      label: "Activity",
      content: <TabActivity />,
    },
  ];

  return (
    <Layout backdrop={collection.headerImage}>
      <CollectionHero {...collection} />

      <Tabs isLazy align="center">
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabData.map((tab, index) => (
            <TabPanel pt={4} px={24} bg="#171717" key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export default CollectionPage;
