import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import Layout from "@components/Layout/Layout";

import TabActivity from "./component/TabActivity";
import TabCollectionItems from "./component/TabItems";
import CollectionHeader from "./component/Header/Header";

import { APICall } from "@api/client";

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
import qs from "qs";
import * as ROUTES from "@constants/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NUMBER_NFT_PER_PAGE } from "@constants";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";
import { HStack } from "@chakra-ui/react";
import { isValidAddressPolkadotAddress } from "@utils";
import { delay } from "@utils";
import toast from "react-hot-toast";
import { useSubstrateState } from "@utils/substrate";
import azero_domains_nft from "../../utils/blockchain/azero-domains-nft";

function CollectionPage() {
  const history = useHistory();
  const { apiState } = useSubstrateState();

  const { search, state } = useLocation();
  const { collection_address } = useParams();

  const { actionType } = useTxStatus();

  const [keyword, setKeyword] = useState();
  const [priceQuery, setPriceQuery] = useState({});
  const [traitsQuery, setTraitsQuery] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState("LISTED");

  const [sortData, setSortData] = useState(2);
  const [collectionInfo, setCollectionInfo] = useState(null);

  const fetchCollectionInfo = useCallback(
    async (isMounted) => {
      let info;

      const isValidAddr = isValidAddressPolkadotAddress(collection_address);

      if (!isValidAddr) {
        toast.error("Collection address invalid!");

        await delay(500).then(async () => {
          history.push(`${ROUTES.MARKETPLACE}`);
        });

        return;
      }

      const { ret, status } = await APICall.getCollectionByAddress({
        collection_address,
      });

      if (status === "FAILED") {
        toast.error("Collection address not exist!");

        await delay(500).then(async () => {
          history.push(`${ROUTES.MARKETPLACE}`);
        });
        return;
      }

      if (status === "OK") {
        info = ret[0];
      }

      let totalListedCount = 0;

      if (collection_address !== azero_domains_nft.CONTRACT_ADDRESS) {
        totalListedCount =
          await marketplace_contract_calls.getListedTokenCountByCollectionAddress(
            getPublicCurrentAccount(),
            collection_address
          );
      } else {
        const { ret } = await APICall.searchNFTOfCollectionByTraits({
          sort: 2,
          offset: 0,
          limit: 1,
          traitFilters: JSON.stringify({ is_for_sale: true }),
          collectionAddress: collection_address,
        });
        totalListedCount = ret?.result?.totalResults || 0;
      }

      info.totalListed = totalListedCount || 0;

      const { ret: floorPrice } = await APICall.getCollectionFloorPrice({
        collection_address,
      });

      info.floorPrice = !floorPrice?.length ? 0 : floorPrice[0]?.price;

      if (isMounted) {
        setCollectionInfo(info);
      }
    },
    [collection_address, history]
  );

  useEffect(() => {
    if (apiState !== "READY") return;

    let isMounted = true;

    fetchCollectionInfo(isMounted);

    return () => (isMounted = false);
  }, [fetchCollectionInfo, apiState]);

  useEffect(() => {
    if (state?.selectedItem) {
      setSortData(state?.selectedItem + 1);
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
        return { price: { between: [min * 10 ** 12, max * 10 ** 12] } };
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
  console.log("traitsQuery", traitsQuery);
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
          loadMoreRef={ref}
          isFetchingNextPage={isFetchingNextPage}
          isLastPageResult={isLastPageResult}
        />
      ),
    },
    {
      label: "activity",
      isDisabled: false,
      component: <TabActivity {...collectionInfo} />,
    },
  ];

  return (
    <Layout backdrop={collectionInfo?.headerImage} variant="collection-detail">
      <CollectionHeader {...data} {...collectionInfo} />

      <CommonTabs tabsData={tabsData} />
      <HStack py={7} justifyContent="center" w="full">
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
