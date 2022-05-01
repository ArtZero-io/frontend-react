import { Box, Flex, Heading, Spacer, Link, Text } from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { usePagination } from "@ajna/pagination";
import toast from "react-hot-toast";

import { NUMBER_PER_PAGE } from "@constants/index";
import { CollectionCard } from "@components/Card/Collection";
// eslint-disable-next-line no-unused-vars
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

import { motion, useAnimation } from "framer-motion";

function MyCollectionsPage() {
  const [collections, setCollections] = useState(null);
  const [owner, setOwner] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [totalCollectionsCount, setTotalCollectionsCount] = useState(0);

  // const {
  //   isOpen: isOpenSimpleMode,
  //   onOpen: onOpenSimpleMode,
  //   onClose: onCloseSimpleMode,
  // } = useDisclosure();

  // const {
  //   isOpen: isOpenAdvancedMode,
  //   onOpen: onOpenAdvancedMode,
  //   onClose: onCloseAdvancedMode,
  // } = useDisclosure();

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
  //   console.log('MyCollectionsPage forceUpdateirst')
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
    <Box as="section" maxW="container.3xl" h="full">
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

            {collections?.length ? <GridA collections={collections} /> : null}

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
        )}
      </Box>
    </Box>
  );
}

export default MyCollectionsPage;

function GridA({ collections }) {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const delayPerPixel = 0.0008;

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{}}
      id="grid-item-div"
      style={{
        margin: "2.5rem auto",
        display: "grid",
        gridGap: "1.875rem",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 24.5625rem), 1fr))`,
        gridAutoRows: "31.25rem",
        gridAutoFlow: "dense",
      }}
    >
      {collections?.map((c, i) => (
        <GridItemA
          key={i}
          i={i}
          delayPerPixel={delayPerPixel}
          originOffset={originOffset}
          id="grid-item-a"
        >
          {Number(c.contractType) === 2 && (
            <SimpleModeModal mode="edit" id={c.index} />
          )}

          {Number(c.contractType) === 1 && (
            <AdvancedModeModal mode="edit" id={c.index} />
          )}
          <Link
            as={ReactRouterLink}
            to={`${ROUTES.DETAIL_COLLECTION_BASE}/${c?.nftContractAddress}`}
            className="collection-card-hover"
            style={{ textDecoration: "none" }}
          >
            <CollectionCard {...c} variant="my-collection" />
          </Link>
        </GridItemA>
      ))}
    </motion.div>
  );
}

function GridItemA({ delayPerPixel, i, originIndex, originOffset, children }) {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: (delayRef) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delayRef.current },
    }),
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, []);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      custom={delayRef}
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}
