import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";

import React, { useCallback, useEffect, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import PaginationMP from "@components/Pagination/Pagination";

import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";

import AddNewCollectionModal from "./components/Modal/AddNew";
import AnimationLoader from "@components/Loader/AnimationLoader";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import GridA from "@components/Grid/GridA";
import { motion } from "framer-motion";
import { formMode, CREATE_COLLECTION, EDIT_COLLECTION } from "@constants";
import CommonContainer from "@components/Container/CommonContainer";
import useForceUpdate from "@hooks/useForceUpdate";

function MyCollectionsPage() {
  const [collections, setCollections] = useState(null);
  const [, setOwner] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [CREATE_COLLECTION, EDIT_COLLECTION],
    () => fetchCollectionsOwned()
  );

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

  const fetchCollectionsOwned = useCallback(async () => {
    console.log("first...");
    setLoading(true);

    const options = {
      owner: currentAccount?.address,
      limit: pageSize,
      offset: offset,
      sort: -1,
    };
    console.log("options", options);
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
      console.log("dataList", dataList);

      let listCollection = [];
      let ownerAddress;

      if (!dataList?.length) {
        ownerAddress = options.owner;
      }

      if (dataList?.length) {
        ownerAddress = dataList[0].collectionOwner;

        for (let item of dataList) {
          item.volume = await marketplace_contract_calls.getVolumeByCollection(
            currentAccount,
            item.nftContractAddress
          );

          listCollection.push(item);
        }
      }

      setOwner(ownerAddress);
      setCollections(listCollection);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      toast.error("There was an error while fetching the collections.");
    }
  }, [currentAccount, offset, pageSize]);

  useEffect(() => {
    // if (!collections || owner !== currentAccount?.address) {
    //   fetchCollectionsOwned();
    // }
    fetchCollectionsOwned();
  }, [currentAccount, fetchCollectionsOwned]);

  // const dispatch = useDispatch();
  // const { addCollectionTnxStatus } = useSelector(
  //   (s) => s.account.accountLoaders
  // );
  // const [loadingTime, setLoadingTime] = useState(null);

  // const forceUpdateAfterMint = useCallback(async () => {
  //   if (addCollectionTnxStatus?.status !== "End") {
  //     return;
  //   }

  //   const { status, timeStamp, endTimeStamp } = addCollectionTnxStatus;

  //   if (status && timeStamp && endTimeStamp) {
  //     const diffTime = 9000 - Number(endTimeStamp - timeStamp);
  //     const delayTime = diffTime >= 0 ? diffTime : 500;

  //     setLoading(true);

  //     setLoadingTime(delayTime / 1000);

  //     await delay(delayTime).then(() => {
  //       dispatch({
  //         type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
  //       });

  //       setCollections(null);
  //       setLoading(false);
  //     });
  //   }
  // }, [addCollectionTnxStatus, dispatch]);

  // useEffect(() => {
  //   forceUpdateAfterMint();
  // }, [currentAccount, forceUpdateAfterMint]);

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="start"
        pb={["20px", "20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]}>my collections</Heading>

        <Spacer mt={{ base: "20px", xl: "0px" }} />

        <AddNewCollectionModal mode={formMode.ADD} />
      </Flex>

      {loading || loadingForceUpdate ? (
        <AnimationLoader loadingTime={loadingTime || 2} />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Text textAlign="left" color="brand.grayLight">
              There are {collections?.length || 0} collections
            </Text>
          </motion.div>

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
    </CommonContainer>
  );
}

export default MyCollectionsPage;
