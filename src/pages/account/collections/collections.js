import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import PaginationMP from "@components/Pagination/Pagination";

import { clientAPI } from "@api/client";
import { useSubstrateState } from "@utils/substrate";

import AddNewCollectionModal from "./components/Modal/AddNew";
import { AccountActionTypes } from "../../../store/types/account.types";
import { delay } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../components/Loader/CommonLoader";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import GridA from "../../../components/Grid/GridA";

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

  // const forceUpdate = useCallback(() => {
  //   console.log('MyCollectionsPage forceUpdate')
  //   setCollections(null);
  // }, []);

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const forceUpdateAfterMint = async () => {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });

        setLoading(true);
        toast.promise(
          delay(9000).then(() => {
            setCollections(null);
            setLoading(false);
          }),
          {
            loading: "Loading new data...",
            success: `Done!`,
            error: "Could not load data.",
          }
        );
      }
    };

    forceUpdateAfterMint();
  }, [tnxStatus, dispatch]);

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
          <CommonLoader
            addText={`Please wait a moment...`}
            size="md"
            maxH={"4.125rem"}
          />
        ) : (
          <>
            <Text textAlign="left" color="brand.grayLight">
              There are {collections?.length || 0} collections
            </Text>

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
