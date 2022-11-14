import { Flex, Spacer } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import { useDispatch } from "react-redux";

import Layout from "@components/Layout/Layout";
import PaginationMP from "@components/Pagination/Pagination";

import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHeader from "./component/Header/Header";

import { APICall } from "@api/client";
import useInterval from "@hooks/useInterval";

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
import { useQuery } from "react-query";
// import toast from "react-hot-toast";

const NUMBER_PER_PAGE = 12;

function CollectionPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const { collection_address } = useParams();

  const { actionType } = useTxStatus();

  const [priceQuery, setPriceQuery] = useState({});
  const [traitsQuery, setTraitsQuery] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState("LISTED");
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);

  const [sortData, setSortData] = useState(-1);

  useEffect(() => {
    if (!search) return;
    const query = qs.parse(search, { ignoreQueryPrefix: true });

    if (query?.price?.min && query?.price?.max) {
      setPriceQuery({ ...query.price });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const queryFilter = {
    traits: traitsQuery,
    price: priceQuery,
  };

  if (activeTab === tabList.LISTED) {
    queryFilter["is_for_sale"] = true;
  }

  if (activeTab === tabList.UNLISTED) {
    queryFilter["is_for_sale"] = false;
  }

  const fetchData = async () => {
    const makeSubTrait = (name, arr) => {
      return arr.map((v) => {
        return { [`traits.${name}`]: v };
      });
    };

    let traitsFilter = {};

    if (queryFilter?.is_for_sale !== undefined) {
      traitsFilter["is_for_sale"] = queryFilter.is_for_sale;
    }

    if (Object.keys(traitsQuery).length) {
      traitsFilter = {
        ...traitsFilter,
        $and: Object.entries(queryFilter.traits).map(([k, v]) => {
          return { $or: makeSubTrait(k, v) };
        }),
      };
    }

    if (priceQuery.min && priceQuery.max) {
      const formatPriceQuery = ({ max, min }) => {
        return { price: { $lte: max * 10 ** 12, $gte: min * 10 ** 12 } };
      };

      const priceQueryFormat = formatPriceQuery(queryFilter.price);

      traitsFilter = {
        ...traitsFilter,
        ...priceQueryFormat,
      };
    }

    const { ret } = await APICall.searchNFTOfCollectionByTraits({
      sort: sortData,
      offset: offset,
      limit: pageSize,
      traitFilters: JSON.stringify(traitsFilter),
      collectionAddress: collection_address,
    });

    // console.log("xx>> ret", ret);

    const totalListedCount =
      await marketplace_contract_calls.getListedTokenCountByCollectionAddress(
        getPublicCurrentAccount(),
        collection_address
      );

    ret.totalListed = totalListedCount || 0;

    const {
      // status,
      // message,
      ret: floorPrice,
    } = await APICall.getCollectionFloorPrice({
      collection_address,
    });
    // status === "FAILED" && toast.error(message);

    ret.floorPrice = !floorPrice?.length ? 0 : floorPrice[0]?.price;

    setTotalCount(ret?.result?.totalResults || 0);

    return ret;
  };

  const {
    pagesCount,
    currentPage,
    isDisabled,
    offset,
    pageSize,
    setCurrentPage,
  } = usePagination({
    total: totalCount,
    initialState: {
      currentPage: 1,
      isDisabled: false,
      pageSize: NUMBER_PER_PAGE,
    },
  });

  const { data, isLoading } = useQuery(
    [
      "getAllNFTs",
      traitsQuery,
      priceQuery,
      activeTab,
      currentPage,
      search,
      sortData,
    ],
    fetchData
  );

  useEffect(() => {
    if (currentPage > pagesCount) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesCount]);

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
  }, [collection_address, traitsQuery, priceQuery, activeTab]);

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

  const tabsData = [
    {
      label: "items",
      isDisabled: false,
      component: (
        <TabCollectionItems
          {...data}
          traitsQuery={traitsQuery}
          setTraitsQuery={setTraitsQuery}
          priceQuery={priceQuery}
          setPriceQuery={setPriceQuery}
          offset={offset}
          activeTab={activeTab}
          loadingTime={loadingTime}
          setActiveTab={setActiveTab}
          loading={isLoading || loadingForceUpdate}
          forceUpdate={() => fetchData()}
          totalCount={totalCount}
          setSortData={setSortData}
        />
      ),
    },
    {
      label: "activity",
      isDisabled: false,
      component: (
        <TabActivity {...data} latestBlockNumber={latestBlockNumber} />
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

  const [tabIndex, setTabIndex] = useState(0);
  const imageUrl = data?.avatarImage?.replace(
    "ipfs://",
    "https://ipfs.io/ipfs/"
  );

  return (
    <Layout backdrop={data?.headerImage} variant="collection-detail">
      <Helmet>
        <title>{data?.name}</title>
        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="image" content={imageUrl} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:image" content={imageUrl} />{" "}
        <meta property="twitter:url" content={window.location.href} />
      </Helmet>

      <>
        <CollectionHeader {...data} />

        <CommonTabs tabsData={tabsData} onChange={(idx) => setTabIndex(idx)} />

        <Flex
          w="full"
          bg="brand.semiBlack"
          pt={{ base: "14px", xl: "40px" }}
          pb={{ base: "50px", xl: "100px" }}
          px={{ base: "12px", "2xl": "100px" }}
          hidden={pagesCount === 0 ? true : false}
          display={tabIndex === 1 ? "none" : "flex"}
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
    </Layout>
  );
}

export default CollectionPage;

export const tabList = {
  ALL: "ALL",
  LISTED: "LISTED",
  UNLISTED: "UNLISTED",
};
