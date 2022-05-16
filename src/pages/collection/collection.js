import {
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { clientAPI } from "@api/client";
import Layout from "@components/Layout/Layout";

import TabCollectionItems from "./component/TabItems";
import CollectionHeader from "./component/Header/Header";

import { AccountActionTypes } from "@store/types/account.types";

import { ContractPromise } from "@polkadot/api-contract";

import { useSubstrateState } from "@utils/substrate";
import { createObjAttrsNFT, delay, getPublicCurrentAccount } from "@utils";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { usePagination } from "@ajna/pagination";
import PaginationMP from "@components/Pagination/Pagination";

const NUMBER_PER_PAGE = 10;

function CollectionPage() {
  const [formattedCollection, setFormattedCollection] = useState(null);
  const { collection_address } = useParams();
  const { currentAccount, api } = useSubstrateState();

  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const [loading, setLoading] = useState(null);
  const [loadingTime, setLoadingTime] = useState(null);

  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);

  const [isShowUnlisted, setIsShowUnlisted] = useState(1);
  const {
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    offset,
    pageSize,
  } = usePagination({
    total: totalCollectionsCount,
    initialState: {
      pageSize: NUMBER_PER_PAGE,
      isDisabled: false,
      currentPage: 1,
    },
  });

  useEffect(() => {
    if (currentPage > pagesCount) {
      console.log("currentPage", currentPage);
      console.log("pagesCount", pagesCount);
      setCurrentPage(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesCount]);

  const forceUpdate = useCallback(() => {
    setFormattedCollection(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const forceUpdateAfterCreateNFT = async () => {
      if (addNftTnxStatus?.status !== "End") {
        return;
      }

      const { status, timeStamp, endTimeStamp } = addNftTnxStatus;

      if (status && timeStamp && endTimeStamp) {
        const diffTime = 9000 - Number(endTimeStamp - timeStamp);
        const delayTime = diffTime >= 0 ? diffTime : 500;

        setLoading(true);

        setLoadingTime(delayTime / 1000);

        await delay(delayTime).then(() => {
          dispatch({
            type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
          });
          setFormattedCollection(null);
          setLoading(false);
        });
      }
    };

    forceUpdateAfterCreateNFT();
  }, [addNftTnxStatus, addNftTnxStatus?.status, dispatch, loadingTime]);

  useEffect(() => {
    const fetchCollectionDetail = async () => {
      setLoading(true);
      const NFTListOptions = {
        limit: pageSize,
        offset: offset,
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

        collectionDetail.floorPrice = floorPrice || 0;

        let NFTList;

        const collectionsCountTotal = collectionDetail?.nft_count;
        const collectionsCountListed = collectionDetail?.totalListed;
        const collectionsCountUnListed =
          collectionsCountTotal - collectionsCountListed;

        if (isShowUnlisted % 3 === 0) {
          NFTList = await clientAPI("post", "/getNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountTotal || 0);
        }

        if (isShowUnlisted % 3 === 1) {
          NFTList = await clientAPI("post", "/getListedNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountListed || 0);
        }

        if (isShowUnlisted % 3 === 2) {
          NFTList = await clientAPI("post", "/getUnlistedNFTs", NFTListOptions);

          setTotalCollectionsCount(collectionsCountUnListed || 0);
        }

        collectionDetail.floorPrice = floorPrice?.price || 0;

        const volumeData =
          await marketplace_contract_calls.getVolumeByCollection(
            publicCurrentAccount,
            collection_address
          );

        collectionDetail.volume = volumeData || 0;

        if (collectionDetail?.nft_count === 0) {
          return collectionDetail;
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

          Promise.all(
            NFTList.map(async (item) => {
              const res = await getMetaDataType1(item.tokenID, token_uri);

              return { ...item, ...res };
            })
          ).then((result) => {
            collectionDetail.NFTListFormatted = result;

            setFormattedCollection(collectionDetail);
            setLoading(false);
          });
        }
      } catch (error) {
        toast.error("There was an error while fetching the collections.");
      }
    };

    fetchCollectionDetail();
  }, [
    api,
    collection_address,
    currentAccount,
    isShowUnlisted,
    offset,
    pageSize,
  ]);

  const tabData = [
    {
      label: "Collection Items",
      content: (
        <TabCollectionItems
          {...formattedCollection}
          loadingTime={loadingTime}
          loading={loading}
          forceUpdate={forceUpdate}
          isShowUnlisted={isShowUnlisted}
          setIsShowUnlisted={setIsShowUnlisted}
          totalCollectionsCount={totalCollectionsCount}
        />
      ),
    },
    // {
    //   label: "Activity",
    //   content: <TabActivity />,
    // },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="collection-detail"
    >
      {
        <>
          <CollectionHeader {...formattedCollection} loading={loading} />

          <Tabs isLazy align="center">
            <TabList bg="#000" borderBottomColor="#000">
              {tabData.map((tab, index) => (
                <Tab key={index}>{tab.label}</Tab>
              ))}
            </TabList>

            <TabPanels h="full" minH="xs" bg="#171717">
              {tabData.map((tab, index) => (
                <TabPanel
                  pt={4}
                  px={{ base: 2, "2xl": 24 }}
                  key={index}
                  h="full"
                >
                  {tab.content}
                  <Flex
                    w="full"
                    py="1.5rem"
                    alignItems={{ base: "start", xl: "end" }}
                    direction={{ base: "column", xl: "row" }}
                  >
                    <PaginationMP
                      pagesCount={pagesCount}
                      isDisabled={isDisabled}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                    <Spacer my={{ base: "3", "2xl": "auto" }} />
                  </Flex>
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

const getMetaDataType1 = async (tokenID, token_uri) => {
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
