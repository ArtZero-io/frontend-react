import {
  Box,
  Flex,
  Heading,
  Spacer,
  Link,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import { CollectionCard } from "@components/Card/Collection";
import PaginationMP from "@components/Pagination/Pagination";

import { clientAPI } from "@api/client";
import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import SimpleModeModal from "./components/Modal/SimpleMode";
import AdvancedModeModal from "./components/Modal/AdvancedMode";
import AddNewCollectionModal from "./components/Modal/AddNew";
import { AccountActionTypes } from "../../../store/types/account.types";
import { delay } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "../../../components/Loader/CommonLoader";

function MyCollectionsPage() {
  const [collections, setCollections] = useState(null);
  const [owner, setOwner] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);

  const {
    isOpen: isOpenSimpleMode,
    // onOpen: onOpenSimpleMode,
    onClose: onCloseSimpleMode,
  } = useDisclosure();

  const {
    isOpen: isOpenAdvancedMode,
    // onOpen: onOpenAdvancedMode,
    onClose: onCloseAdvancedMode,
  } = useDisclosure();

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

          return setCollections(dataList);
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
  //   console.log('MyCollectionsPage fforceUpdateirst')
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
          delay(3000).then(() => {
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
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My collections</Heading>

          <Spacer />

          <AddNewCollectionModal mode="add" />
        </Flex>
        {/* {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )} */}

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
                <SimpleGrid
                  py={10}
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing="7"
                >
                  
                  {collections?.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <Box pos="relative">
                        <AddNewCollectionModal mode="edit" id={item.index} />
                        {Number(item.contractType) === 2 && (
                          <SimpleModeModal
                            nftContractAddress={item.nftContractAddress}
                            mode="edit"
                            id={item.index}
                            isOpen={isOpenSimpleMode}
                            onClose={onCloseSimpleMode}
                          />
                        )}
                        {Number(item.contractType) === 1 && (
                          <AdvancedModeModal
                            mode="edit"
                            id={item.index}
                            isOpen={isOpenAdvancedMode}
                            onClose={onCloseAdvancedMode}
                          />
                        )}
                        <Link
                          minW={{ base: "auto", "2xl": "25rem" }}
                          as={ReactRouterLink}
                          to={`${ROUTES.DETAIL_COLLECTION_BASE}/${item?.nftContractAddress}`}
                          className="collection-card-hover"
                          style={{ textDecoration: "none" }}
                        >
                          <CollectionCard {...item} variant="my-collection" />
                        </Link>
                      </Box>
                    </React.Fragment>
                  ))}
                </SimpleGrid>
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
