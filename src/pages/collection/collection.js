import {
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { APICall } from "../../api/client";

const NUMBER_PER_PAGE = 10;

function CollectionPage() {
  const { collection_address } = useParams();
  const { currentAccount, api } = useSubstrateState();

  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  const [formattedCollection, setFormattedCollection] = useState(null);
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
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesCount]);

  const forceUpdate = () => {
    setLoading(false);
    setLoadingTime(0);
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
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
          // setFormattedCollection(null);
          setLoadingTime(null);
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

        const volumeData =
          await marketplace_contract_calls.getVolumeByCollection(
            publicCurrentAccount,
            collection_address
          );

        collectionDetail.volume = volumeData || 0;

        if (collectionDetail?.nft_count === 0) {
          setLoading(false);
          setLoadingTime(null);
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
            setLoadingTime(null);
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
            setLoadingTime(null);
          });
        }
      } catch (error) {
        console.log("error", error);
        toast.error("There was an error while fetching the collections.");
      }
    };

    !loadingTime && fetchCollectionDetail();
  }, [
    api,
    collection_address,
    currentAccount,
    isShowUnlisted,
    offset,
    pageSize,
    loadingTime,
  ]);

  const tabData = [
    {
      label: "Collection Items",
      content: (
        <TabCollectionItems
          {...formattedCollection}
          offset={offset}
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

  // useEffect(() => {
  //   window.scrollTo(0, window?.scrollY);
  // }, []);

  return (
    <Layout
      backdrop={formattedCollection?.headerImage}
      variant="collection-detail"
    >
      {
        <>
          <CollectionHeader {...formattedCollection} />

          <Tabs isLazy align="center" colorScheme="brand.blue">
            <TabList bg="#000" borderBottomColor="#000">
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  fontStyle="italic"
                  px="0.5px"
                  pb="20px"
                  fontSize="lg"
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabPanels h="full" minH="md" bg="#171717">
              {tabData.map((tab, index) => (
                <TabPanel
                  pt={4}
                  px={{ base: "10px", "2xl": "100px" }}
                  // px="100px"
                  key={index}
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
