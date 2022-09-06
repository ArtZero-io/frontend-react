import { Flex, Spacer } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import { useDispatch } from "react-redux";
import { ContractPromise } from "@polkadot/api-contract";

import { clientAPI } from "@api/client";
import Layout from "@components/Layout/Layout";
import PaginationMP from "@components/Pagination/Pagination";

import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHeader from "./component/Header/Header";

import { APICall } from "@api/client";
import useInterval from "@hooks/useInterval";
import { useSubstrateState } from "@utils/substrate";
import { AccountActionTypes } from "@store/types/account.types";
import { createObjAttrsNFT, getPublicCurrentAccount } from "@utils";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import CommonTabs from "@components/Tabs/CommonTabs";
import {
  BUY,
  BID,
  REMOVE_BID,
  ACCEPT_BID,
  LIST_TOKEN,
  UNLIST_TOKEN,
  LOCK,
  TRANSFER,
  CREATE_NFT,
  EDIT_NFT,
} from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import useForceUpdate from "@hooks/useForceUpdate";

const NUMBER_PER_PAGE = 12;

function CollectionPage() {
  const { collection_address } = useParams();
  const { currentAccount, api } = useSubstrateState();

  const dispatch = useDispatch();

  const { actionType } = useTxStatus();

  const [loading, setLoading] = useState(null);

  const [tokenUriType1, setTokenUriType1] = useState("");
  const [activeTab, setActiveTab] = useState(tabList.LISTED);
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  const [formattedCollection, setFormattedCollection] = useState(null);
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);

  const [bigCard, setBigCard] = useState(true);

  const {
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    offset,
    pageSize,
    setPageSize,
  } = usePagination({
    total: totalCollectionsCount,
    initialState: {
      currentPage: 1,
      isDisabled: false,
      pageSize: NUMBER_PER_PAGE,
    },
  });

  useEffect(() => {
    bigCard ? setPageSize(12) : setPageSize(15);
  }, [bigCard, setPageSize]);

  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesCount]);

  const fetchCollectionDetail = useCallback(
    async ({ activeTab }) => {
      setLoading(true);
      const NFTListOptions = {
        limit: pageSize,
        offset: offset,
        sort: -1,
        collection_address,
      };

      try {
        const [collectionDetail] = await APICall.getCollectionByAddress({
          collection_address,
        });

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

        const [floorPrice] = await clientAPI("post", "/getFloorPrice", {
          collection_address,
        });

        collectionDetail.floorPrice = floorPrice?.price || 0;

        let NFTList;

        const collectionsCountTotal = collectionDetail?.nft_count;
        const collectionsCountListed = collectionDetail?.totalListed;
        const collectionsCountUnListed =
          collectionsCountTotal - collectionsCountListed;

        if (activeTab === tabList.ALL) {
          NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountTotal || 0);
        }

        if (activeTab === tabList.LISTED) {
          NFTList = await clientAPI("post", "/getListedNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountListed || 0);
        }

        if (activeTab === tabList.UNLISTED) {
          NFTList = await clientAPI("post", "/getUnlistedNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountUnListed || 0);
        }

        const volumeData =
          await marketplace_contract_calls.getVolumeByCollection(
            publicCurrentAccount,
            collection_address
          );

        collectionDetail.volume = volumeData || 0;

        if (collectionDetail?.nft_count === 0) {
          setLoading(false);
          // setLoadingTime(null);
          return setFormattedCollection(collectionDetail);
        }

        // Collections Type 2 - Simple Mode

        if (Number(collectionDetail.contractType) === 2) {
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
            setLoading(false);
            // setLoadingTime(null);
          });
        }

        // Collections Type 1 - Advanced Mode
        if (
          Number(collectionDetail.contractType) === 1 &&
          !collectionDetail.showOnChainMetadata
        ) {
          const nft_contract = new ContractPromise(
            api,
            nft721_psp34_standard.CONTRACT_ABI,
            collectionDetail.nftContractAddress
          );

          const gasLimit = -1;
          const azero_value = 0;

          const { result, output } = await nft_contract.query[
            "psp34Traits::tokenUri"
          ](currentAccount?.address, { value: azero_value, gasLimit }, 1);

          if (!result.isOk) {
            toast.error("There is an error when loading token_uri!");
            return;
          }

          const token_uri = output.toHuman()?.replace("1.json", "");

          setTokenUriType1(token_uri);

          Promise.all(
            NFTList.map(async (item) => {
              const res = await getMetaDataType1(item.tokenID, token_uri);

              return { ...item, ...res };
            })
          ).then((result) => {
            collectionDetail.NFTListFormatted = result;

            setFormattedCollection(collectionDetail);
            setLoading(false);
            // setLoadingTime(null);
          });
        }
      } catch (error) {
        console.log("error", error);
        toast.error("There was an error while fetching the collections.");
      }
    },
    [api, collection_address, currentAccount, offset, pageSize]
  );

  useEffect(() => {
    fetchCollectionDetail({ activeTab });
  }, [fetchCollectionDetail, activeTab]);

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [
      BUY,
      BID,
      REMOVE_BID,
      ACCEPT_BID,
      LIST_TOKEN,
      UNLIST_TOKEN,
      LOCK,
      TRANSFER,
      CREATE_NFT,
      EDIT_NFT,
    ],
    () => {
      if ([BID, REMOVE_BID].includes(actionType)) {
        setActiveTab(tabList.LISTED);
        fetchCollectionDetail({ activeTab: tabList.LISTED });
        return;
      }

      if ([CREATE_NFT, EDIT_NFT, LOCK, TRANSFER].includes(actionType)) {
        setActiveTab(tabList.UNLISTED);
        fetchCollectionDetail({ activeTab: tabList.UNLISTED });
        return;
      }

      setActiveTab(tabList.ALL);
      fetchCollectionDetail({ activeTab: tabList.ALL });
    }
  );

  const tabsData = [
    {
      label: "items",
      isDisabled: false,
      component: (
        <TabCollectionItems
          {...formattedCollection}
          offset={offset}
          activeTab={activeTab}
          loadingTime={loadingTime}
          setActiveTab={setActiveTab}
          loading={loading || loadingForceUpdate}
          forceUpdate={() => fetchCollectionDetail({ activeTab })}
          totalCollectionsCount={totalCollectionsCount}
          bigCard={bigCard}
          setBigCard={setBigCard}
        />
      ),
    },
    {
      label: "activity",
      isDisabled: false,
      component: (
        <TabActivity
          {...formattedCollection}
          tokenUriType1={tokenUriType1}
          latestBlockNumber={latestBlockNumber}
        />
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchPlatformEvents = useCallback(async () => {
    try {
      const getPurchaseEvents = await APICall.getPurchaseEvents({
        collection_address,
      });
      const getBidWinEvents = await APICall.getBidWinEvents({
        collection_address,
      });
      const getUnlistEvents = await APICall.getUnlistEvents({
        collection_address,
      });
      const getNewListEvents = await APICall.getNewListEvents({
        collection_address,
      });

      let result;

      await Promise.all([
        getPurchaseEvents,
        getBidWinEvents,
        getUnlistEvents,
        getNewListEvents,
      ]).then(async (res) => {
        result = res
          .reduce((a, b) => [...a, ...b])
          .sort((a, b) => b.blockNumber - a.blockNumber);
      });

      const latestBlockNumber = result?.length && result[0].blockNumber;

      return { events: result, latestBlockNumber };
    } catch (error) {
      console.log("error", error);

      return error;
    }
  }, [collection_address]);

  const initEvents = async () => {
    const payload = await fetchPlatformEvents();

    dispatch({
      type: AccountActionTypes.SET_EVENTS,
      payload,
    });

    const latestBlockNum =
      payload?.events?.length && payload?.events[0].blockNumber;

    setLatestBlockNumber(latestBlockNum);
  };

  useInterval(() => initEvents(), 10000);

  const [tabIndex, setTabIndex] = React.useState(0);

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="collection-detail"
    >
      {
        <>
          <CollectionHeader {...formattedCollection} />

          <CommonTabs
            tabsData={tabsData}
            onChange={(idx) => setTabIndex(idx)}
          />

          <Flex
            hidden={pagesCount === 0 ? true : false}
            w="full"
            bg="brand.semiBlack"
            pt={{ base: "14px", xl: "40px" }}
            pb={{ base: "50px", xl: "100px" }}
            px={{ base: "12px", "2xl": "100px" }}
            display={tabIndex === 1 ? "none" : "flex"}
            // alignItems={{ base: "start", xl: "end" }}
            // direction={{ base: "column", xl: "row" }}
          >
            <PaginationMP
              pagesCount={pagesCount}
              isDisabled={isDisabled}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <Spacer my={{ base: "3", "2xl": "auto" }} />
          </Flex>
        </>
      }
    </Layout>
  );
}

export default CollectionPage;

export const getMetaDataType1 = async (tokenID, token_uri) => {
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

export const tabList = {
  ALL: "ALL",
  LISTED: "LISTED",
  UNLISTED: "UNLISTED",
};
