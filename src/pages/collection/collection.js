import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import { clientAPI } from "@api/client";
import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHero from "./component/Header/Header";
// import contractData from "@utils/blockchain/index";
// import {
//   setNft721Psp34Contract,
//   setAccount as setAccountNft721Psp34Module,
// } from "@utils/blockchain/nft721-psp34-standard-calls";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
// import { IPFS_BASE_URL } from "@constants/index";
// import axios from 'axios';
// import { ContractPromise } from "@polkadot/api-contract";
// import BN from "bn.js";
import { createObjAttrsNFT } from "@utils/index";

function CollectionPage() {
  const { collection_address } = useParams();
  const { currentAccount } = useSubstrateState();

  const [isShowUnlisted, setIsShowUnlisted] = useState(false);
  const [formattedCollection, setFormattedCollection] = useState(null);

  // useEffect(() => {
  //   contractData.nft721Psp34.CONTRACT_ADDRESS = collection_address;

  //   const setNft721Psp34ContractModule = async () => {
  //     setAccountNft721Psp34Module(currentAccount);
  //     setNft721Psp34Contract(api, contractData.nft721Psp34);
  //   };

  //   apiState === "READY" && setNft721Psp34ContractModule();
  // }, [api, apiState, collection_address, currentAccount]);

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  const forceUpdate = useCallback(() => {
    setFormattedCollection(null);
  }, []);

  useEffect(() => {
    function onCloseHandler() {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });
        forceUpdate();

        console.log("forceUpdate...");
      }
    }

    onCloseHandler();
  }, [tnxStatus, dispatch, forceUpdate]);

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      const NFTListOptions = {
        limit: 12,
        offset: 0,
        sort: -1,
        collection_address,
      };

      try {
        console.log("1");
        const [collectionDetail] = await clientAPI(
          "post",
          "/getCollectionByAddress",
          {
            collection_address,
          }
        );
        console.log("2");
        const [floorPrice] = await clientAPI("post", "/getFloorPrice", {
          collection_address,
        });

        collectionDetail.floorPrice = floorPrice || 0;

        const NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);
        console.log('xxx NFTList', NFTList)
        collectionDetail.floorPrice = floorPrice?.price || 0;
        collectionDetail.nftTotalCount = NFTList?.length;

        Promise.all(
          NFTList.map((item) => {
            const itemData = createObjAttrsNFT(
              item.attributes,
              item.attributesValue
            );

            return { ...item, ...itemData };
          })
        ).then((NFTListFormatted) => {
          collectionDetail.NFTListFormatted = NFTListFormatted;

          setFormattedCollection(collectionDetail);
        });
      } catch (error) {
        console.log("fetchCollectionDetail error", error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    !formattedCollection && fetchCollectionDetail();
  }, [currentAccount, formattedCollection, collection_address]);

  useEffect(() => {
    isShowUnlisted &&
      formattedCollection?.nftList?.filter((i) => i.is_for_sale === false);
  }, [formattedCollection, isShowUnlisted]);

  console.log("xxx formattedCollection", formattedCollection);

  const tabData = [
    {
      label: "Items",
      content: (
        <TabCollectionItems
          {...formattedCollection}
          isShowUnlisted={isShowUnlisted}
          setIsShowUnlisted={setIsShowUnlisted}
          forceUpdate={forceUpdate}
        />
      ),
    },
    {
      label: "Activity",
      content: <TabActivity />,
    },
  ];

  return (
    <Layout backdrop={formattedCollection?.headerImage}>
      <CollectionHero {...formattedCollection} />

      <Tabs isLazy align="center">
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>

        <TabPanels h="full">
          {tabData.map((tab, index) => (
            <TabPanel
              pt={4}
              px={24}
              bg="#171717"
              key={index}
              h="full"
              flexGrow="1"
            >
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export default CollectionPage;
