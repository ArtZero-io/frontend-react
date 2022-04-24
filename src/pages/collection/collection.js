/* eslint-disable no-unused-vars */
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "@components/Layout/Layout";

import { clientAPI } from "@api/client";
import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHero from "./component/Header/Header";
import contractData from "@utils/blockchain/index";
import {
  setNft721Psp34Contract,
  setAccount as setAccountNft721Psp34Module,
} from "@utils/blockchain/nft721-psp34-standard-calls";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch, useSelector } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { IPFS_BASE_URL } from "@constants/index";
import axios from 'axios';
import { ContractPromise } from "@polkadot/api-contract";
import BN from "bn.js";

function CollectionPage() {
  const { collection_address } = useParams();
  const { api, apiState, currentAccount } = useSubstrateState();

  const [collection, setCollection] = useState(null);
  const [isShowUnlisted, setIsShowUnlisted] = useState(false);

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
    setCollection(null);
  }, []);
  useEffect(() => {
    function onCloseHandler() {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });
        // forceUpdate();
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
        console.log('1');
        const [collectionDetail] = await clientAPI(
          "post",
          "/getCollectionByAddress",
          {
            collection_address,
          }
        );
        console.log('2');
        const [floorPrice] = await clientAPI("post", "/getFloorPrice", {
          collection_address,
        });
        console.log('3');
        if (collectionDetail.contractType == 2) {
          const NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);
          collectionDetail.floorPrice = floorPrice?.price || 0;
          collectionDetail.nftList = NFTList;
          collectionDetail.nftTotalCount = NFTList?.length;
        // }
        } else if (collectionDetail.contractType == 1 && !collectionDetail.showOnChainMetadata) {
          const abiJson = `${IPFS_BASE_URL}/${collectionDetail.abi_file}`;
          axios.get(abiJson)
          .then( async (response) => {
            // handle success
            const nft_contract = new ContractPromise(
              api,
              JSON.parse(response.request.response),
              collectionDetail.nftContractAddress
            );
            const gasLimit = -1;
            const azero_value = 0;

            const { result, output } = await nft_contract.query['getTokenCount'](currentAccount.address, { value: azero_value, gasLimit });
            if (result.isOk) {
              const token_count = new BN(output, 10, "le").toNumber();
              if (token_count) {
                for (let i = 1; i <= token_count; i++) {
                  console.log(i);
                }
              }
            }
            console.log({result, output});
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        }
        
        console.log('4');
        console.log('before collectionDetail', collectionDetail);
        setCollection(collectionDetail);
        console.log('after collectionDetail', collectionDetail);
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

  const tabData = [
    {
      label: "Items",
      content: (
        <TabCollectionItems
          {...collection}
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
    <Layout backdrop={collection?.headerImage}>
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
