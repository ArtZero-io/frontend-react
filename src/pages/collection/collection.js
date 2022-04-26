import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";
import { TypeRegistry, U64 } from "@polkadot/types";
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

import { ContractPromise } from "@polkadot/api-contract";
import BN from "bn.js";
import { createObjAttrsNFT } from "@utils/index";
// import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";

import { delay } from "../../utils";
import Loader from "@components/Loader/Loader";
import artzero_nft from "@utils/blockchain/artzero-nft";

function CollectionPage() {
  const { collection_address } = useParams();
  const { currentAccount, api } = useSubstrateState();

  const [isShowUnlisted, setIsShowUnlisted] = useState(false);
  const [formattedCollection, setFormattedCollection] = useState(null);

  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  const forceUpdate = useCallback(() => {
    setFormattedCollection(null);
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
          delay(3000).then(() => {
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
        console.log("xxx NFTList", NFTList);
        collectionDetail.floorPrice = floorPrice?.price || 0;
        collectionDetail.nftTotalCount = NFTList?.length;
        if (collectionDetail.contractType == "2") {
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
        } else if (
          collectionDetail.contractType == "1" &&
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
            currentAccount.address,
            { value: azero_value, gasLimit }
          );
          if (result.isOk) {
            const token_count = new BN(output, 10, "le").toNumber();
            collectionDetail.nftTotalCount = token_count;
            if (token_count) {
              let NFTListFormattedAdv = [];
              for (let i = 1; i <= token_count; i++) {
                const token_id = new U64(new TypeRegistry(), i);
                const { result, output } = await nft_contract.query["tokenUri"](
                  currentAccount.address,
                  { value: azero_value, gasLimit },
                  token_id
                );
                if (result.isOk) {
                  const token_uri = output.toHuman();
                  const metadata = await clientAPI(
                    "get",
                    "/getJSON?input=" +
                      token_uri,
                    {}
                  );
                  if (metadata) {
                    let nftItem = NFTList[i-1];
                    let attributeLabels = [];
                    let attributeVals = [];
                    let attrsList = [];
                    if (metadata.attributes.length) {
                      for (let attribute of metadata.attributes) {
                        attributeLabels.push(attribute.trait_type);
                        attributeVals.push(attribute.value);
                        attrsList.push(createObjAttrsNFT(
                          attributeLabels,
                          attributeVals
                        ));
                      }
                    }
                    
                    nftItem.attributes = attributeLabels;
                    nftItem.attributesValue = attributeLabels;
                    nftItem.attrsList = attrsList;
                    nftItem.nftName = metadata.name;
                    nftItem.description = metadata.description;
                    nftItem.avatar = metadata.image.replace("ipfs://", "");
                    NFTListFormattedAdv.push(nftItem);
                  }
                }
                collectionDetail.NFTListFormatted = NFTListFormattedAdv;
              }
              setFormattedCollection(collectionDetail);
            }
          }
        }
      } catch (error) {
        console.log("fetchCollectionDetail error", error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    !formattedCollection && fetchCollectionDetail();
  }, [currentAccount, formattedCollection, collection_address, api]);

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
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </Layout>
  );
}

export default CollectionPage;
