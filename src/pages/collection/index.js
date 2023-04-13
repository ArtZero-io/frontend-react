import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from "@components/Layout/Layout";

import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHeader from "./component/Header/Header";

import { APICall } from "@api/client";

import { AccountActionTypes } from "@store/types/account.types";
import { getPublicCurrentAccount } from "@utils";

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
import { Helmet } from "react-helmet";
import qs from "qs";
import * as ROUTES from "@constants/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NUMBER_NFT_PER_PAGE } from "@constants";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { HStack } from "@chakra-ui/react";

const OFFSET_ACTIVITY = 6;

function CollectionPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { search, state } = useLocation();
  const { collection_address } = useParams();

  const { actionType } = useTxStatus();

  const [keyword, setKeyword] = useState();
  const [priceQuery, setPriceQuery] = useState({});
  const [traitsQuery, setTraitsQuery] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState("LISTED");
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);

  const [currentPageActivity, setCurrentPageActivity] = useState(1);

  const [hasMorePage, setHasMorePage] = useState([true, true, true, true]);

  const [sortData, setSortData] = useState(1);
  const [collectionInfo, setCollectionInfo] = useState(null);

  const fetchCollectionInfo = useCallback(
    async (isMounted) => {
      let info;

      const { ret, status } = await APICall.getCollectionByAddress({
        collection_address,
      });

      if (status === "OK") {
        info = ret[0];
      }

      const totalListedCount =
        await marketplace_contract_calls.getListedTokenCountByCollectionAddress(
          getPublicCurrentAccount(),
          collection_address
        );

      info.totalListed = totalListedCount || 0;

      const { ret: floorPrice } = await APICall.getCollectionFloorPrice({
        collection_address,
      });

      info.floorPrice = !floorPrice?.length ? 0 : floorPrice[0]?.price;

      if (isMounted) {
        setCollectionInfo(info);
      }
    },
    [collection_address]
  );

  useEffect(() => {
    let isMounted = true;

    fetchCollectionInfo(isMounted);

    return () => (isMounted = false);
  }, [fetchCollectionInfo]);

  useEffect(() => {
    if (state?.selectedItem === 1) {
      setSortData(-1);
    } else {
      setSortData(1);
    }
  }, [state?.selectedItem]);

  useEffect(() => {
    if (!search) return;
    const query = qs.parse(search, { ignoreQueryPrefix: true });

    if (query?.price?.min && query?.price?.max) {
      setPriceQuery({ ...query.price });
    }

    if (query?.keyword) {
      setKeyword(query.keyword);
    }

    if (query?.is_for_sale === undefined) {
      setActiveTab("ALL");
    }
    if (query?.is_for_sale === "true") {
      setActiveTab("LISTED");
    }
    if (query?.is_for_sale === "false") {
      setActiveTab("UNLISTED");
    }

    if (query?.traits && Object.keys(query?.traits).length) {
      setTraitsQuery({ ...query.traits });
    }
    initEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryFilter = { keyword, traits: traitsQuery, price: priceQuery };

  if (activeTab === tabList.LISTED) {
    queryFilter["is_for_sale"] = true;
  }

  if (activeTab === tabList.UNLISTED) {
    queryFilter["is_for_sale"] = false;
  }

  const fetchData = async ({ pageParam }) => {
    const makeSubTrait = (name, arr) => {
      return arr.map((v) => {
        return { [`traits.${name}`]: v };
      });
    };

    let traitsFilter = { keyword };

    if (queryFilter?.is_for_sale !== undefined) {
      traitsFilter["is_for_sale"] = queryFilter.is_for_sale;
    }

    if (Object.keys(traitsQuery).length) {
      traitsFilter = {
        ...traitsFilter,
        and: Object.entries(queryFilter.traits).map(([k, v]) => {
          return { or: makeSubTrait(k, v) };
        }),
      };
    }

    if (priceQuery.min && priceQuery.max) {
      const formatPriceQuery = ({ max, min }) => {
        return { price: { between: [min * 10 ** 18, max * 10 ** 18] } };
      };

      const priceQueryFormat = formatPriceQuery(queryFilter.price);

      traitsFilter = {
        ...traitsFilter,
        ...priceQueryFormat,
        keyword,
      };
    }

    let ret = {};

    const { ret: result, status } = await APICall.searchNFTOfCollectionByTraits(
      {
        sort: sortData,
        offset: pageParam,
        limit: NUMBER_NFT_PER_PAGE,
        traitFilters: JSON.stringify(traitsFilter),
        collectionAddress: collection_address,
      }
    );

    if (status === "OK") {
      ret = result;
    }

    setTotalCount(ret?.result?.totalResults || 0);

    return {
      data: ret?.result?.NFTList,
      nextId: pageParam + NUMBER_NFT_PER_PAGE,
    };
  };

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [
      BUY,
      BID,
      LOCK,
      REMOVE_BID,
      ACCEPT_BID,
      LIST_TOKEN,
      UNLIST_TOKEN,
      TRANSFER,
      CREATE_NFT,
      EDIT_NFT,
    ],
    () => {
      if ([BID, REMOVE_BID].includes(actionType)) {
        setActiveTab(tabList.LISTED);
        return;
      }

      if ([CREATE_NFT, EDIT_NFT, LOCK, TRANSFER].includes(actionType)) {
        setActiveTab(tabList.UNLISTED);
        return;
      }

      setActiveTab(tabList.ALL);
    }
  );

  const { ref, inView } = useInView();

  const { isLoading, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [
        "getAllNFTs",
        traitsQuery,
        priceQuery,
        activeTab,
        search,
        sortData,
        loadingForceUpdate,
        collection_address,
      ],
      ({ pageParam = 0 }) => fetchData({ pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.nextId || 0,
      }
    );

  const isLastPageResult = useMemo(() => {
    const pageParams = data?.pageParams;
    let nextId = pageParams && [...pageParams]?.pop();

    nextId = nextId ?? 0;

    return totalCount < nextId;
  }, [data?.pageParams, totalCount]);

  useEffect(() => {
    if (inView) {
      !isLastPageResult && fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    initEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageActivity]);

  useEffect(() => {
    const cleanQuery = { ...queryFilter };

    if (!cleanQuery?.price?.min || !cleanQuery?.price?.max) {
      delete cleanQuery.price;
    }

    const query = qs.stringify(cleanQuery);

    history.push(
      `${ROUTES.DETAIL_COLLECTION_BASE}/${collection_address}?${query}`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection_address, traitsQuery, priceQuery, activeTab, keyword]);

  const resetPage = () => {
    if (currentPageActivity !== 1) {
      setHasMorePage([true, true, true, true]);
      setCurrentPageActivity(1);
    }
  };

  const tabsData = [
    {
      label: "items",
      isDisabled: false,
      component: (
        <TabCollectionItems
          {...collectionInfo}
          {...data}
          traitsQuery={traitsQuery}
          setTraitsQuery={setTraitsQuery}
          priceQuery={priceQuery}
          setPriceQuery={setPriceQuery}
          activeTab={activeTab}
          loadingTime={loadingTime}
          setActiveTab={setActiveTab}
          loading={isLoading || loadingForceUpdate}
          totalCount={totalCount}
          setSortData={setSortData}
          keyword={keyword}
          setKeyword={setKeyword}
          ref={ref}
          isFetchingNextPage={isFetchingNextPage}
          isLastPageResult={isLastPageResult}
        />
      ),
    },
    {
      label: "activity",
      isDisabled: false,
      component: (
        <TabActivity
          {...data}
          {...collectionInfo}
          latestBlockNumber={latestBlockNumber}
          fetchMore={() => setCurrentPageActivity(currentPageActivity + 1)}
          fetchBack={() =>
            currentPageActivity > 1 &&
            setCurrentPageActivity(currentPageActivity - 1)
          }
          currentPage={currentPageActivity}
          resetPage={resetPage}
          hasMore={hasMorePage}
        />
      ),
    },
  ];

  const fetchPlatformEvents = useCallback(async () => {
    try {
      const getPurchaseEvents = APICall.getPurchaseEvents({
        collection_address,
        limit: OFFSET_ACTIVITY + 1,
        offset: currentPageActivity * OFFSET_ACTIVITY - OFFSET_ACTIVITY,
      });

      const getBidWinEvents = APICall.getBidWinEvents({
        collection_address,
        offset: currentPageActivity * OFFSET_ACTIVITY - OFFSET_ACTIVITY,
        limit: OFFSET_ACTIVITY + 1,
      });

      const getUnlistEvents = APICall.getUnlistEvents({
        collection_address,
        offset: currentPageActivity * OFFSET_ACTIVITY - OFFSET_ACTIVITY,
        limit: OFFSET_ACTIVITY + 1,
      });

      const getNewListEvents = APICall.getNewListEvents({
        collection_address,
        offset: currentPageActivity * OFFSET_ACTIVITY - OFFSET_ACTIVITY,
        limit: OFFSET_ACTIVITY + 1,
      });

      let result;

      await Promise.all([
        hasMorePage[0] ? getPurchaseEvents : [],
        hasMorePage[1] ? getBidWinEvents : [],
        hasMorePage[2] ? getUnlistEvents : [],
        hasMorePage[3] ? getNewListEvents : [],
      ]).then(async (res) => {
        const newMore = res.map((el) => el.length === OFFSET_ACTIVITY + 1);
        setHasMorePage(newMore);
        const newArray = res.map((el) => el.slice(0, 6));
        result = newArray
          .reduce((a, b) => [...a, ...b])
          .sort((a, b) => b.blockNumber - a.blockNumber);
      });
      const latestBlockNumber = result?.length && result[0].blockNumber;

      return { events: result, latestBlockNumber };
    } catch (error) {
      console.log("error", error);

      return error;
    }
  }, [collection_address, currentPageActivity, hasMorePage]);

  const initEvents = async () => {
    const payload = await fetchPlatformEvents();

    dispatch({
      type: AccountActionTypes.SET_EVENTS,
      payload,
    });

    setLatestBlockNumber(payload?.latestBlockNumber);
  };

  const imageUrl = collectionInfo?.avatarImage?.replace(
    "ipfs://",
    "https://ipfs.io/ipfs/"
  );

  return (
    <Layout backdrop={collectionInfo?.headerImage} variant="collection-detail">
      <Helmet>
        <title>{collectionInfo?.name}</title>
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="image" content={imageUrl} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:image" content={imageUrl} />{" "}
        <meta property="twitter:url" content={window.location.href} />
      </Helmet>

      <CollectionHeader {...data} {...collectionInfo} />

      <CommonTabs tabsData={tabsData} />

      <HStack py={7} justifyContent="center" w="" full>
        <div ref={ref}></div>
      </HStack>
    </Layout>
  );
}

export default CollectionPage;

export const tabList = {
  ALL: "ALL",
  LISTED: "LISTED",
  UNLISTED: "UNLISTED",
};
