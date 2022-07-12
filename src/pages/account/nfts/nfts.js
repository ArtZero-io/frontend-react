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
import { FINALIZED } from "@constants";
import { clearTxStatus } from "../../../store/actions/txStatus";

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
    <Box as="section" maxW="container.3xl">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "4", xl: "12", "2xl": "20" }}
      >
        <Flex
          w="full"
          alignItems="start"
          justify="space-between"
          pb={{ base: "12px", xl: "48px" }}
          direction={{ base: "column", xl: "row" }}
        >
          <Heading minW="100px" fontSize={{ base: "26px", xl: "48px" }}>
            My NFTs
          </Heading>

          <Spacer />
          <HStack
            maxW={{ base: "320px", xl: "500px" }}
            overflowX="scroll"
            mt="20px"
            pb="8px"
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
      </Box>
    </Box>
  );
};

export default MyNFTsPage;
