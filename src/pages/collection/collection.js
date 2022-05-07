import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import BN from "bn.js";

import { clientAPI } from "@api/client";
import Layout from "@components/Layout/Layout";

import TabCollectionItems from "./component/TabItems";
import CollectionHero from "./component/Header/Header";

import { AccountActionTypes } from "@store/types/account.types";

import { ContractPromise } from "@polkadot/api-contract";

import { useSubstrateState } from "@utils/substrate";
import { createObjAttrsNFT, delay, getPublicCurrentAccount } from "@utils";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

function CollectionPage() {
  const [formattedCollection, setFormattedCollection] = useState(null);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();
  const { collection_address } = useParams();
  const { currentAccount, api } = useSubstrateState();
  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  const forceUpdate = useCallback(() => {
    setFormattedCollection(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function onCloseHandler() {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });

        setLoading(true);

        toast.promise(
          delay(9000).then(() => {
            setFormattedCollection(null);
            setLoading(false);
          }),
          {
            loading: "Loading new data...",
            success: `Done!`,
            error: "Could not load data.",
          }
        );
      }
    }

    onCloseHandler();
  }, [tnxStatus, dispatch, forceUpdate]);

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      console.log("fetchCollectionDetail start", Date.now());

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

        collectionDetail.floorPrice = floorPrice || 0;

        const NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);

        collectionDetail.floorPrice = floorPrice?.price || 0;

        collectionDetail.nftTotalCount = NFTList?.length;

        //Get fake public CurrentAccount
        const publicCurrentAccount = currentAccount
          ? currentAccount
          : getPublicCurrentAccount();

        const totalListedData =
          await marketplace_contract_calls.getListedTokenCountByCollectionAddress(
            publicCurrentAccount,
            collection_address
          );

        collectionDetail.totalListed = totalListedData || 0;

        const volumeData =
          await marketplace_contract_calls.getVolumeByCollection(
            publicCurrentAccount,
            collection_address
          );
        collectionDetail.volume = volumeData || 0;
        console.log(
          "fetchCollectionDetail start check contractType 2",
          Date.now()
        );

        if (Number(collectionDetail.contractType) === 2) {
          console.log("fetchCollectionDetail start contractType 2", Date.now());
          console.log('1 NFTList', NFTList)
          return Promise.all(
            NFTList.map((item) => {
              const itemData = createObjAttrsNFT(
                item.attributes,
                item.attributesValue
              );

              return { ...item, ...itemData };
            })
          ).then((NFTListFormatted) => {
            console.log('2 NFTList', NFTList)

            collectionDetail.NFTListFormatted = NFTListFormatted;
            console.log("collectionDetail contractType 2 Done ", Date.now());
            console.log('collectionDetail - formatted', collectionDetail)
            setFormattedCollection(collectionDetail);
          });
        }
        console.log(
          "fetchCollectionDetail start check contractType 1",
          Date.now()
        );

        if (
          Number(collectionDetail.contractType) === 1 &&
          !collectionDetail.showOnChainMetadata
        ) {
          console.log("fetchCollectionDetail start contractType 1", Date.now());

          const nft_contract = new ContractPromise(
            api,
            nft721_psp34_standard.CONTRACT_ABI,
            collectionDetail.nftContractAddress
          );

          const gasLimit = -1;
          const azero_value = 0;

          const { result, output } = await nft_contract.query["getTokenCount"](
            currentAccount?.address,
            { value: azero_value, gasLimit }
          );

          if (result.isOk) {
            const token_count = new BN(output, 10, "le").toNumber();

            collectionDetail.nftTotalCount = token_count;

            if (token_count) {
              let NFTListFormattedAdv = [];
              let token_uri = null;
              const { result, output } = await nft_contract.query[
                "psp34Traits::tokenUri"
              ](currentAccount?.address, { value: azero_value, gasLimit }, 1);
              if (result.isOk) {
                token_uri = output.toHuman()?.replace("1.json", "");
              }

              for (let i = 1; i <= token_count; i++) {
                const metadata = await clientAPI(
                  "get",
                  "/getJSON?input=" + token_uri + i.toString() + ".json",
                  {}
                );
                if (metadata) {
                  let item = NFTList[i - 1];
                  let attributes = [];
                  let attributeValues = [];

                  attributes.push("nftName");
                  attributes.push("description");
                  attributes.push("avatar");

                  attributeValues.push(metadata.name);
                  attributeValues.push(metadata.description);
                  attributeValues.push(metadata.image);

                  let length = metadata.attributes.length;

                  for (var index = 0; index < length; index++) {
                    attributes.push(metadata.attributes[index].trait_type);
                    attributeValues.push(metadata.attributes[index].value);
                  }

                  const itemData = createObjAttrsNFT(
                    attributes,
                    attributeValues
                  );

                  NFTListFormattedAdv.push({ ...item, ...itemData });
                }

                collectionDetail.NFTListFormatted = NFTListFormattedAdv;
              }
              console.log("collectionDetail contractType 1 Done ", Date.now());
            }
            setFormattedCollection(collectionDetail);
          }
        }
        console.log("fetchCollectionDetail end", Date.now());
      } catch (error) {
        console.log("fetchCollectionDetail error", error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    !formattedCollection && fetchCollectionDetail();
  }, [api, collection_address, currentAccount, formattedCollection]);

  const tabData = [
    {
      label: "Collection Items",
      content: (
        <TabCollectionItems
          {...formattedCollection}
          forceUpdate={forceUpdate}
          loading={loading}
        />
      ),
    },
    // {
    //   label: "Activity",
    //   content: <TabActivity />,
    // },
  ];

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="collection-detail"
    >
      {
        <>
          <CollectionHero {...formattedCollection} loading={loading} />
          <Tabs isLazy align="center">
            <TabList bg="#000" borderBottomColor="#000">
              {tabData.map((tab, index) => (
                <Tab key={index}>{tab.label}</Tab>
              ))}
            </TabList>

            <TabPanels h="full" minH="xs">
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
        </>
      }
    </Layout>
  );
}

export default CollectionPage;
