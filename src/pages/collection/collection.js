import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import { clientAPI } from "@api/client";
import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHero from "./component/Header/Header";

function CollectionPage() {
  const { collection_address } = useParams();

  const [collection, setCollection] = useState({});
  const [isShowUnlisted, setIsShowUnlisted] = useState(false);

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
        console.log("collectionDetail", collectionDetail);
        setCollection(collectionDetail);
      } catch (error) {
        console.log("fetchCollectionDetail error", error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    fetchCollectionDetail();
  }, [collection_address]);

  useEffect(() => {
    isShowUnlisted &&
      collection?.nftList?.filter((item) => item.is_for_sale === false);
  }, [collection, isShowUnlisted]);

  console.log("CollectionPage collection", collection);
  console.log("CollectionPage collection.nftList", collection.nftList);
  const tabData = [
    {
      label: "Items",
      content: (
        <TabCollectionItems
          {...collection}
          isShowUnlisted={isShowUnlisted}
          setIsShowUnlisted={setIsShowUnlisted}
        />
      ),
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
