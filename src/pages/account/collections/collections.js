import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import PaginationMP from "@components/Pagination/Pagination";

import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";

import AddNewCollectionModal from "./components/Modal/AddNew";
import { AccountActionTypes } from "@store/types/account.types";
import { delay } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import AnimationLoader from "@components/Loader/AnimationLoader";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import GridA from "@components/Grid/GridA";
import { AnimatePresence, motion } from "framer-motion";

function MyCollectionsPage() {
  const [collections, setCollections] = useState(null);
  const [owner, setOwner] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);

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
    const fetchCollectionsOwned = async () => {
      const options = {
        owner: currentAccount?.address,
        limit: pageSize,
        offset: offset,
        sort: -1,
      };

      try {
        const totalCollectionsCountData = await clientAPI(
          "post",
          "/countCollectionsByOwner",
          { owner: currentAccount?.address }
        );
        console.log("totalCollectionsCountData", totalCollectionsCountData);
        setTotalCollectionsCount(totalCollectionsCountData);

        const dataList = await clientAPI(
          "post",
          "/getCollectionsByOwner",
          options
        );

        if (dataList?.length) {
          setOwner(dataList[0].collectionOwner || options.owner);

          const listCollection = [];

          for (let item of dataList) {
            item.volume =
              await marketplace_contract_calls.getVolumeByCollection(
                currentAccount,
                item.nftContractAddress
              );
            listCollection.push(item);
          }
          return setCollections(listCollection);
        }
        setOwner(options.owner);
        setCollections([]);
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    if (!collections || owner !== currentAccount?.address) {
      fetchCollectionsOwned();
    }
  }, [
    currentPage,
    collections,
    owner,
    currentAccount?.address,
    offset,
    pageSize,
    currentAccount,
  ]);

  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(null);
  useEffect(() => {
    const forceUpdateAfterMint = async () => {
      if (addCollectionTnxStatus?.status !== "End") {
        return;
      }

      const { status, timeStamp, endTimeStamp } = addCollectionTnxStatus;

      if (status && timeStamp && endTimeStamp) {
        const diffTime = 9000 - Number(endTimeStamp - timeStamp);
        const delayTime = diffTime >= 0 ? diffTime : 500;

        setLoading(true);

        setLoadingTime(delayTime / 1000);

        await delay(delayTime).then(() => {
          dispatch({
            type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
          });
          console.log("setCollections...");
          setCollections(null);
          setLoading(false);
        });
      }
    };

    forceUpdateAfterMint();
  }, [
    addCollectionTnxStatus,
    addCollectionTnxStatus?.status,
    dispatch,
    loadingTime,
  ]);

  return (
    <Box as="section" maxW="container.3xl">
      <Box
        mx="auto"
        maxW={{ base: "auto", "2xl": "7xl" }}
        px={{ base: "8", "2xl": "4" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My collections</Heading>

          <Spacer />

          <AddNewCollectionModal mode="add" />
        </Flex>

        {loading ? (
          <AnimationLoader loadingTime={loadingTime} />
        ) : (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text textAlign="left" color="brand.grayLight">
                  There are {collections?.length || 0} collections
                </Text>
              </motion.div>
            </AnimatePresence>
            {collections?.length ? (
              <>
                <GridA collections={collections} />

                <Flex w="full">
                  <PaginationMP
                    isDisabled={isDisabled}
                    currentPage={currentPage}
                    pagesCount={pagesCount}
                    setCurrentPage={setCurrentPage}
                  />
                  <Spacer />
                </Flex>
              </>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  );
}

export default MyCollectionsPage;
