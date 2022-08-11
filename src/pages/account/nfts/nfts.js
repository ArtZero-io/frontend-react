/* eslint-disable no-unused-vars */
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import MyNFTGroupCard from "@components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { clientAPI } from "@api/client";
import AnimationLoader from "@components/Loader/AnimationLoader";
import CommonButton from "@components/Button/CommonButton";
import CommonContainer from "@components/Container/CommonContainer";
import useForceUpdate from "@hooks/useForceUpdate";
import useTxStatus from "@hooks/useTxStatus";

import {
  REMOVE_BID,
  UNLIST_TOKEN,
  LIST_TOKEN,
  SCROLLBAR,
  LOCK,
  TRANSFER,
} from "@constants";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();
  const [owner, setOwner] = useState(null);

  const [myCollections, setMyCollections] = useState(null);

  const [filterSelected, setFilterSelected] = useState(0);

  const [loading, setLoading] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [REMOVE_BID, UNLIST_TOKEN, LIST_TOKEN, LOCK, TRANSFER],
    () => handleForceUpdate()
  );
  const { actionType } = useTxStatus();

  const handleForceUpdate = async () => {
    // 1/ List xong thì về My listed - (Page My NFT) PUSH FOR SALE => (Page My NFT) Tab My Listing?
    // 2/ Unlist xong thì về Unlisted -  (Page My NFT) REMOVE FROM SALE => (Page My NFT) Tab Collected?
    actionType === LIST_TOKEN && setFilterSelected(1);
    actionType === UNLIST_TOKEN && setFilterSelected(0);
  };

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

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="start"
        justify="space-between"
        pb={{ base: "12px", xl: "48px" }}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]} minW="100px">
          my nfts
        </Heading>

        <Spacer />

        <HStack
          pb="8px"
          mt="20px"
          sx={SCROLLBAR}
          overflowX="scroll"
          maxW={{ base: "320px", md: "500px" }}
        >
          {[
            { id: "collected", text: "collected" },
            { id: "listed", text: "my listing" },
            { id: "bid", text: "my bids" },
          ].map((i, idx) => (
            <CommonButton
              {...i}
              key={i.id}
              variant="outline"
              isActive={filterSelected === idx}
              onClick={() => onClickHandler(idx)}
            />
          ))}

          <IconButton
            mx={1}
            size="icon"
            variant="iconSolid"
            aria-label="refresh"
            icon={<RefreshIcon />}
            onClick={() => setMyCollections(null)}
          />
        </HStack>
      </Flex>

      {loading ? (
        <AnimationLoader loadingTime={loadingTime} />
      ) : (
        <>
          {(!myCollections || myCollections?.length === 0) && (
            <HStack
              py={10}
              ml={3}
              w={"full"}
              align="start"
              justifyContent="center"
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
                  hasBottomBorder={true}
                />
              );
            })}
        </>
      )}
    </CommonContainer>
  );
};

export default MyNFTsPage;
