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
        const dataList = await clientAPI(
          "post",
          "/getCollectionsByOwner",
          options
        );

        if (dataList?.length) {
          setOwner(dataList[0].collectionOwner || options.owner);
          setTotalCollectionsCount(dataList?.length);
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

        setCollections(null);
      } catch (error) {
        console.log(error);

        toast.error("There was an error while fetching the collections.");
      }
    };

    (!collections || owner !== currentAccount?.address) &&
      fetchCollectionsOwned();
  }, [collections, currentAccount, offset, owner, pageSize]);

  const dispatch = useDispatch();
  const { addCollectionTnxStatus } = useSelector(
    (s) => s.account.accountLoaders
  );
  const [loadingTime, setLoadingTime] = useState(null);

  useEffect(() => {
    const forceUpdateAfterMint = async ({ addCollectionTnxStatus }) => {
      if (!addCollectionTnxStatus) {
        return console.log(
          "addCollectionTnxStatus error",
          addCollectionTnxStatus
        );
      }

      const { status, timeStamp, endTimeStamp } = addCollectionTnxStatus;

      if (status === "End") {
        // Get timestamp end
        const delayTime = 9000 - endTimeStamp - timeStamp || 9000;

        if (delayTime > 0) {
          setLoadingTime(delayTime / 1000);

          delay(delayTime).then(() => {
            dispatch({
              type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
              payload: null,
            });
            setCollections(null);
            setLoadingTime(null);
          });
        }

        if (delayTime <= 0) {
          dispatch({
            type: AccountActionTypes.SET_ADD_COLLECTION_TNX_STATUS,
            payload: null,
          });
          setCollections(null);
          setLoadingTime(null);
        }
      }
    };

    forceUpdateAfterMint({ addCollectionTnxStatus });
  }, [addCollectionTnxStatus, dispatch]);

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

        {loadingTime ? (
          <AnimationLoader loadingTime={loadingTime} />
        ) : (
          <>
            <AnimatePresence>
              {collections?.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Text textAlign="left" color="brand.grayLight">
                    There are {collections?.length || 0} collections
                  </Text>
                </motion.div>
              )}
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
