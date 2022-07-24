import {
  Flex,
  Heading,
  Spacer,
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
import { FINALIZED } from "@constants";
import { clearTxStatus } from "../../../store/actions/txStatus";
import CommonButton from "../../../components/Button/CommonButton";
import CommonContainer from "../../../components/Container/CommonContainer";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();
  const [owner, setOwner] = useState(null);

  const [myCollections, setMyCollections] = useState(null);

  const [filterSelected, setFilterSelected] = useState(0);

  const dispatch = useDispatch();
  const { addNftTnxStatus } = useSelector((s) => s.account.accountLoaders);
  const txStatus = useSelector((state) => state.txStatus);

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
      if (
        addNftTnxStatus?.status === "End" ||
        txStatus?.lockStatus === FINALIZED
      ) {
        if (
          addNftTnxStatus?.status &&
          addNftTnxStatus?.timeStamp &&
          addNftTnxStatus?.endTimeStamp
        ) {
          const diffTime =
            9000 -
            Number(addNftTnxStatus?.endTimeStamp - addNftTnxStatus?.timeStamp);
          const delayTime = diffTime >= 0 ? diffTime : 500;

          setLoading(true);

          setLoadingTime(delayTime / 1000);

          await delay(delayTime).then(() => {
            dispatch({
              type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
            });
            dispatch(clearTxStatus());
            setMyCollections(null);

            setLoading(false);
          });
        }
      }
    };

    forceUpdateAfterPushForSale();
  }, [
    addNftTnxStatus,
    addNftTnxStatus?.status,
    dispatch,
    loadingTime,
    txStatus.lockStatus,
  ]);

  useEffect(() => {
    const forceUpdateAfterLockNFT = async () => {
      if (txStatus?.lockStatus === FINALIZED) {
        setLoading(true);

        await delay(8000).then(() => {
          dispatch(clearTxStatus());
          setMyCollections(null);

          setLoading(false);
        });
      }
    };

    forceUpdateAfterLockNFT();
  }, [addNftTnxStatus, dispatch, txStatus?.lockStatus]);

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
          MY NFTs
        </Heading>

        <Spacer />

        <HStack
          pb="8px"
          mt="20px"
          overflowX="scroll"
          maxW={{ base: "320px", md: "500px" }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
              borderRadius: "0px",
              backgroundColor: `transparent`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: `#7ae7ff`,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: `transparent`,
            },
          }}
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
