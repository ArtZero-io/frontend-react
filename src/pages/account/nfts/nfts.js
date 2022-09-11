import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  useMediaQuery,
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
import DropdownMobile from "@components/Dropdown/DropdownMobile";

import {
  REMOVE_BID,
  UNLIST_TOKEN,
  LIST_TOKEN,
  LOCK,
  TRANSFER,
  ACCEPT_BID,
} from "@constants";

const MyNFTsPage = () => {
  const { currentAccount } = useSubstrateState();
  const { actionType } = useTxStatus();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [REMOVE_BID, ACCEPT_BID, UNLIST_TOKEN, LIST_TOKEN, LOCK, TRANSFER],
    () => handleForceUpdate()
  );

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(null);
  const [filterSelected, setFilterSelected] = useState("COLLECTED");
  const [myCollections, setMyCollections] = useState(null);

  const handleForceUpdate = async () => {
    if (actionType === LIST_TOKEN) return setFilterSelected("LISTING");

    if (actionType === UNLIST_TOKEN) {
      return setFilterSelected("COLLECTED");
    }

    setFilterSelected("COLLECTED");
  };

  function onClickHandler(v) {
    if (filterSelected !== v) {
      setFilterSelected(Object.keys(tabList)[v]);
      setMyCollections(null);
    }
  }

  useEffect(() => {
    const fetchMyCollections = async () => {
      try {
        setLoading(true);
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

            if (filterSelected === "COLLECTED") {
              dataList = dataList.filter((item) => item.is_for_sale !== true);
            }

            if (filterSelected === "LISTING") {
              dataList = dataList.filter((item) => item.is_for_sale === true);
            }

            const data = dataList?.map((item) => {
              return { ...item, stakeStatus: 0 };
            });

            collection.listNFT = data;

            return collection;
          })
        );

        //Don't Display Collection with no NFT
        data = data.filter((item) => item.listNFT?.length > 0);

        if (data?.length) {
          setMyCollections(data);
          const nft = data[0].listNFT[0];

          setOwner(nft.is_for_sale ? nft.nft_owner : nft.owner);
        } else {
          setMyCollections(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchMyBids = async () => {
      try {
        setLoading(true);

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

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    // if (!myCollections || owner !== currentAccount?.address) {
    filterSelected !== "BIDS" ? fetchMyCollections() : fetchMyBids();
    // }
  }, [currentAccount?.address, filterSelected, owner]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="center"
        mb={["20px", "48px"]}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl"]} minW="100px">
          my nfts
        </Heading>

        <Spacer />

        {isBigScreen && (
          <HStack maxW={{ base: "320px", md: "500px" }}>
            {[
              { id: "COLLECTED", text: "my collected" },
              { id: "LISTING", text: "my listing" },
              { id: "BIDS", text: "my bids" },
            ].map((i, idx) => (
              <CommonButton
                {...i}
                key={i.id}
                variant="outline"
                isActive={filterSelected === i.id}
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
        )}
      </Flex>

      {!isBigScreen && (
        <HStack w="full" pb={[0, "8px"]} justifyContent="space-between">
          <IconButton
            mr="2px"
            size="icon"
            variant="iconSolid"
            aria-label="refresh"
            onClick={() => setMyCollections(null)}
            icon={<RefreshIcon />}
            _hover={{ color: "black", bg: "#7ae7ff" }}
          />

          <Spacer display={["none", "flex"]} />

          <DropdownMobile
            minW="256px"
            width="full"
            my="20px"
            border="1px solid #343333"
            fontSize="15px"
            fontFamily="Evogria, san serif"
            options={tabList}
            selectedItem={filterSelected}
            setSelectedItem={(i) => {
              setFilterSelected(i);
            }}
          />
        </HStack>
      )}

      {loading || loadingForceUpdate ? (
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

export const tabList = {
  COLLECTED: "COLLECTED",
  LISTING: "MY LISTING",
  BIDS: "MY BIDS",
};
