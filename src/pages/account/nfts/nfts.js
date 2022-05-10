import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import MyNFTGroupCard from "../components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { clientAPI } from "@api/client";
import { useDispatch, useSelector } from "react-redux";
import CommonLoader from "@components/Loader/CommonLoader";
import { delay } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import toast from "react-hot-toast";
// import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();

  const [myCollections, setMyCollections] = useState(null);
  // const [myListings, setMyListings] = useState(null);

  const [filterSelected, setFilterSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  function onClickHandler(v) {
    if (filterSelected !== v) {
      setFilterSelected(v);
      setMyCollections(null);
    }
  }
  const fetchMyCollections = async () => {
    const allCollectionsOwned = await clientAPI(
      "post",
      "/getCollections",
      {
        limit: 10000,
        offset: 0,
        sort: -1,
        isActive:true
      }
    );

    let data = await Promise.all(
      allCollectionsOwned?.map(async (collection) => {
        const options = {
          collection_address: collection.nftContractAddress,
          owner: currentAccount?.address,
          limit: 10000,
          offset: 0,
          sort: -1,
        };

        let dataList = await clientAPI(
          "post",
          "/getNFTsByOwnerAndCollection",
          options
        );

        if (Number(filterSelected) === 0) {
          dataList = dataList.filter((item) => item.is_for_sale !== true);
        }

        if (Number(filterSelected) === 1) {
          dataList = dataList.filter((item) => item.is_for_sale === true);
        }
        const data = dataList?.map((item) => {
          return { ...item, stakeStatus: 0 };
        });

        collection.listNFT = data;

        return collection;
      })
    );
    //Dont Display Collection with no NFT
    data = data.filter((item) => item.listNFT?.length > 0);
    data.length ? setMyCollections(data) : setMyCollections(null);
  };
  const fetchMyBids = async () => {
    const options = {
      bidder: currentAccount?.address,
      limit: 10000,
      offset: 0,
      sort: -1,
    };

    let Bids = await clientAPI("post", "/getBidsByBidderAddress", options);
    //let ret = await marketplace_contract_calls.getAllBids(currentAccount,"5EHiDZu9MUFg7TtmZuGnfpq4DHhDSX2EJSuaTfn25U6eWnXW",currentAccount.address,{u64:2});
    console.log("getBidsByBidderAddress", Bids);
    let length = Bids.length;
    console.log(length);
    // let data = await Promise.all(
    //   Bids.map(async (bid) => {
    //     const options = {
    //       collection_address: bid.nftContractAddress,
    //       owner: bid.seller,
    //       limit: 10000,
    //       offset: 0,
    //       sort: -1,
    //     };
    //
    //     let dataList = await clientAPI("post", "/getNFTsByOwnerAndCollection", options);
    //     dataList = dataList.filter((item) => item.tokenID == bid.tokenID);
    //
    //     collection.listNFT = data;
    //
    //     return collection;
    //   })
    // );
    // //Dont Display Collection with no NFT
    // data = data.filter((item) => item.listNFT?.length>0);
    // data.length ? setMyCollections(data) : setMyCollections(null);

    //getCollectionByAddress
    let collections = [];
    for (var i = 0; i < length; i++) {
      let bid = Bids[i];

      let collection = await clientAPI("post", "/getCollectionByAddress", {
        collection_address: bid.nftContractAddress,
      });

      const options = {
        collection_address: bid.nftContractAddress,
        token_id: bid.tokenID,
      };

      let dataList = await clientAPI("post", "/getNFTByID", options);
      const data = dataList?.map((item) => {
        return {
          ...item,
          stakeStatus: 0,
          isBid: {
            status: true,
            bidPrice: bid.bid_value,
          },
        };
      });

      collection[0].listNFT = data;

      console.log("collection", collection[0]);
      collections.push(collection[0]);
    }

    collections = collections.filter((item) => item.listNFT?.length > 0);
    collections.length ? setMyCollections(collections) : setMyCollections(null);
  };
  useEffect(() => {
    if (!myCollections & (filterSelected !== 2)) {
      fetchMyCollections();
      setLoading(false);
    } else if (!myCollections & (filterSelected == 2)) {
      fetchMyBids();
      setLoading(false);
    }
  }, [
    currentAccount?.address,
    filterSelected,
    myCollections,
    tnxStatus?.status,
  ]);

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
            setMyCollections(null);
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
    <Box as="section" maxW="container.3xl" minH="60rem">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My NFTs</Heading>

          <Spacer />

          <Button
            isActive={filterSelected === 0}
            variant="outline"
            mx={1}
            id="collected"
            onClick={() => onClickHandler(0)}
          >
            Collected
          </Button>

          <Button
            isActive={filterSelected === 1}
            variant="outline"
            mx={1}
            id="listed"
            onClick={() => onClickHandler(1)}
          >
            My Listing
          </Button>

          <Button
            isActive={filterSelected === 2}
            variant="outline"
            mx={1}
            id="bid"
            onClick={() => onClickHandler(2)}
          >
            My Bids
          </Button>

          <IconButton
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
            onClick={() => setMyCollections(null)}
          />
        </Flex>

        {loading && (
          <CommonLoader
            addText={`Please wait a moment...`}
            size="md"
            maxH={"4.125rem"}
          />
        )}

        <>
          {(!myCollections || myCollections?.length === 0) && (
            <HStack
              py={10}
              align="start"
              ml={3}
              justifyContent="center"
              w={"full"}
            >
              <Text textAlign="center" color="brand.grayLight" size="2xs">
                No NFT found.
              </Text>
            </HStack>
          )}

          {myCollections &&
            myCollections?.map((item, idx) => {
              return <MyNFTGroupCard {...item} key={idx} />;
            })}
        </>
      </Box>
    </Box>
  );
};

export default MyNFTsPage;
