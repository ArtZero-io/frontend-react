import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";

import React, { useCallback, useEffect, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import PaginationMP from "@components/Pagination/Pagination";

import { useSubstrateState } from "@utils/substrate";

import AddNewCollectionModal from "./components/Modal/AddNew";
import AnimationLoader from "@components/Loader/AnimationLoader";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import GridA from "@components/Grid/GridA";
import { motion } from "framer-motion";
import { formMode, CREATE_COLLECTION, EDIT_COLLECTION } from "@constants";
import CommonContainer from "@components/Container/CommonContainer";
import useForceUpdate from "@hooks/useForceUpdate";
import { APICall } from "@api/client";

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

  const fetchCollectionsOwned = useCallback(
    async (isMounted) => {
      setLoading(true);

      const options = {
        owner: currentAccount?.address,
        limit: pageSize,
        offset: offset,
        sort: -1,
      };

      try {
        const { ret: totalCollectionsCountData } =
          await APICall.getCollectionsCountByOwner({
            owner: currentAccount?.address,
            noNFT: true,
          });

        setTotalCollectionsCount(totalCollectionsCountData);

        const { ret: dataList } = await APICall.getCollectionsByOwner(options);

        let listCollection = [];
        let ownerAddress;

        if (!dataList?.length) {
          ownerAddress = options.owner;
        }

        if (dataList?.length) {
          ownerAddress = dataList[0].collectionOwner;

          for (let item of dataList) {
            item.volume =
              await marketplace_contract_calls.getVolumeByCollection(
                currentAccount,
                item.nftContractAddress
              );

            listCollection.push(item);
          }
        }
        if (!isMounted) return;

        setOwner(ownerAddress);
        setCollections(listCollection);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (!isMounted) return;

        setLoading(false);

        toast.error("There was an error while fetching the collections.");
      }
    },
    [currentAccount, offset, pageSize]
  );

  useEffect(() => {
    let isMounted = true;

    fetchCollectionsOwned(isMounted);

    return () => (isMounted = false);
  }, [currentAccount, fetchCollectionsOwned]);

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="center"
        mb={["20px", "48px"]}
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
              You have created {collections?.length || 0} collection
              {collections?.length > 1 ? "s" : ""}.
            </Text>
          </motion.div>

          {collections?.length ? (
            <>
              <GridA collections={collections} variant="my-collection" />

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
