import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";
import { TypeRegistry, U64 } from "@polkadot/types";
import { clientAPI } from "@api/client";

import TabCollectionItems from "./component/TabItems";
import CollectionHero from "./component/Header/Header";

import { useSubstrateState } from "@utils/substrate";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";

import { ContractPromise } from "@polkadot/api-contract";
import BN from "bn.js";
import { createObjAttrsNFT } from "@utils/index";

import { delay, getPublicCurrentAccount } from "../../utils";
import Loader from "@components/Loader/CommonLoader";
import artzero_nft from "@utils/blockchain/artzero-nft";
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

        if (Number(collectionDetail.contractType) === 2) {
          return Promise.all(
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
        }
        
        if (
          Number(collectionDetail.contractType) === 1 &&
          !collectionDetail.showOnChainMetadata
        ) {
          const nft_contract = new ContractPromise(
            api,
            artzero_nft.CONTRACT_ABI,
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
              //console.log('token_count',token_count);
              for (let i = 1; i <= token_count; i++) {
                const token_id = new U64(new TypeRegistry(), i);
                const { result, output } = await nft_contract.query[
                  "psp34Traits::tokenUri"
                ](
                  currentAccount?.address,
                  { value: azero_value, gasLimit },
                  token_id
                );

                if (result.isOk) {
                  const token_uri = output.toHuman();
                  //console.log('token_uri',token_uri);
                  const metadata = await clientAPI(
                    "get",
                    "/getJSON?input=" + token_uri,
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
                }

                collectionDetail.NFTListFormatted = NFTListFormattedAdv;
              }
              console.log('collectionDetail', collectionDetail);
              
            }
            setFormattedCollection(collectionDetail);
          }
        }
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
      {console.log('formattedCollection', formattedCollection)}
      {
        <>
          <CollectionHero {...formattedCollection} loading={loading} />

          <Tabs isLazy align="center">
            <TabList bg="#000" borderBottomColor="#000">
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
                  {loading ? <Loader /> : tab.content}
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
