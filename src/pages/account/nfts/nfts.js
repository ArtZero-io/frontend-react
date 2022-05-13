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
import { delay } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import AnimationLoader from "@components/Loader/AnimationLoader";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();
  const [owner, setOwner] = useState(null);

  const [myCollections, setMyCollections] = useState(null);

  const [filterSelected, setFilterSelected] = useState(0);

  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);
  const [loading, setLoading] = useState(null);
  const [loadingTime, setLoadingTime] = useState(null);

  function onClickHandler(v) {
    if (filterSelected !== v) {
      setFilterSelected(v);
      setMyCollections(null);
    }
  }
  useEffect(() => {
    const fetchMyCollections = async () => {
      const allCollectionsOwned = await clientAPI("post", "/getCollections", {
        limit: 10000,
        offset: 0,
        sort: -1,
        isActive: true,
      });

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

      if (data?.length) {
        setMyCollections(data);
        const nft = data[0].listNFT[0];

        setOwner(nft.is_for_sale ? nft.nft_owner : nft.owner);
      } else {
        setMyCollections(null);
      }
    };

    const fetchMyBids = async () => {
      const options = {
        bidder: currentAccount?.address,
        limit: 10000,
        offset: 0,
        sort: -1,
      };

      let Bids = await clientAPI("post", "/getBidsByBidderAddress", options);

      Bids.length ? setOwner(Bids[0].bidder) : setOwner(null);

      let length = Bids.length;

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
        let data = dataList?.map((item) => {
          return {
            ...item,
            stakeStatus: 0,
            isBid: {
              status: true,
              bidPrice: bid.bid_value,
            },
          };
        });

        // filter nft have is_for_sale is false
        data = data.filter((item) => item.is_for_sale === true);

        collection[0].listNFT = data;

        collections.push(collection[0]);
      }

      collections = collections.filter((item) => item.listNFT?.length > 0);

      if (collections?.length) {
        setMyCollections(collections);
      } else {
        setMyCollections(null);
      }
    };
    if (!myCollections || owner !== currentAccount?.address) {
      filterSelected !== 2 ? fetchMyCollections() : fetchMyBids();
    }
  }, [currentAccount?.address, filterSelected, myCollections, owner]);

  useEffect(() => {
    const forceUpdateAfterPushForSale = async () => {
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
          setMyCollections(null);
          setLoading(false);
        });
      }
    };

    forceUpdateAfterPushForSale();
  }, [addNftTnxStatus, addNftTnxStatus?.status, dispatch, loadingTime]);

  // useEffect(() => {
  //   const forceUpdateAfterMint = async () => {
  //     if (tnxStatus?.status === "Finalized") {
  //       dispatch({
  //         type: AccountActionTypes.SET_TNX_STATUS,
  //         payload: null,
  //       });

  //       setLoading(true);
  //       toast.promise(
  //         delay(9000).then(() => {
  //           setMyCollections(null);
  //           setLoading(false);
  //         }),
  //         {
  //           loading: "Loading new data...",
  //           success: `Done!`,
  //           error: "Could not load data.",
  //         }
  //       );
  //     }
  //   };

  //   forceUpdateAfterMint();
  // }, [tnxStatus, dispatch]);

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

        {loading ? (
          <AnimationLoader loadingTime={loadingTime} />
        ) : (
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
                return (
                  <MyNFTGroupCard
                    {...item}
                    key={idx}
                    filterSelected={filterSelected}
                  />
                );
              })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyNFTsPage;
