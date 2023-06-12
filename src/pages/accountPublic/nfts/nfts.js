import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  useMediaQuery,
} from "@chakra-ui/react";

import React, { useCallback, useEffect, useState } from "react";
import MyNFTGroupCard from "@components/Card/MyNFTGroup";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { clientAPI } from "@api/client";
import AnimationLoader from "@components/Loader/AnimationLoader";
import CommonButton from "@components/Button/CommonButton";
import CommonContainer from "@components/Container/CommonContainer";
import useForceUpdate from "@hooks/useForceUpdate";
import useTxStatus from "@hooks/useTxStatus";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import { formatBalance } from "@polkadot/util";
import { web3FromSource } from "@utils/wallets/extension-dapp";
import { getEstimatedGas } from "@utils/";

import {
  REMOVE_BID,
  UNLIST_TOKEN,
  LIST_TOKEN,
  LOCK,
  TRANSFER,
  ACCEPT_BID,
} from "@constants";
import { APICall } from "../../../api/client";
import { ContractPromise } from "@polkadot/api-contract";
import toast from "react-hot-toast";
import { readOnlyGasLimit } from "@utils";
import { useParams } from "react-router-dom";

const MyNFTsPage = () => {
  const { actionType } = useTxStatus();

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [REMOVE_BID, ACCEPT_BID, UNLIST_TOKEN, LIST_TOKEN, LOCK, TRANSFER],
    () => handleForceUpdate()
  );

  const {address} = useParams()

  // eslint-disable-next-line no-unused-vars
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(null);
  const [filterSelected, setFilterSelected] = useState("COLLECTED");
  const [myCollections, setMyCollections] = useState(null);

  const handleForceUpdate = async () => {
    if (actionType === ACCEPT_BID) {
      fetchMyCollections();
      return setFilterSelected("LISTING");
    }

    if (actionType === TRANSFER) {
      fetchMyCollections();
      return setFilterSelected("COLLECTED");
    }

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

  const fetchMyCollections = useCallback(async () => {
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
            owner: address,
            limit: 10000,
            offset: 0,
            sort: -1,
          };

          let { ret: dataList } = await APICall.getNFTsByOwnerAndCollection(
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
        setMyCollections([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMyCollections([]);

      setLoading(false);
    }
  }, [address, filterSelected]);

  const fetchMyBids = useCallback(
    async (isMounted) => {
      try {
        setLoading(true);

        const options = {
          bidder: address,
          limit: 10000,
          offset: 0,
          sort: -1,
        };

        let { ret: Bids } = await APICall.getBidsByBidderAddress(options);

        if (!isMounted) return;

        if (!Bids?.length) {
          setOwner(null);
          setMyCollections([]);

          setLoading(false);

          return;
        }

        setOwner(Bids[0].bidder);

        let length = Bids.length;

        let collections = [];
        for (var i = 0; i < length; i++) {
          let bid = Bids[i];

          let { ret: collection } = await APICall.getCollectionByAddress({
            collection_address: bid.nftContractAddress,
          });

          if (!collection) return;

          const options = {
            collection_address: bid.nftContractAddress,
            token_id: bid.tokenID,
          };

          let { ret: dataList } = await APICall.getNFTByID(options);

          if (!dataList) return;

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
          setMyCollections([]);
        }

        setLoading(false);
      } catch (error) {
        setMyCollections([]);

        setLoading(false);
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, filterSelected]
  );

  useEffect(() => {
    let isMounted = true;

    filterSelected !== "BIDS" ? fetchMyCollections() : fetchMyBids(isMounted);

    return () => (isMounted = false);
  }, [address, fetchMyBids, fetchMyCollections, filterSelected]);

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
          nfts
        </Heading>

        <Spacer />

        {isBigScreen && (
          <HStack maxW={{ base: "320px", md: "500px" }}>
            {[
              { id: "COLLECTED", text: "collected" },
              { id: "LISTING", text: "listing" },
              { id: "BIDS", text: "bids" },
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
              onClick={() => {
                fetchMyCollections();
              }}
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
            onClick={() => fetchMyCollections()}
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
                  type="public"
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

export async function execContractQuery(
  callerAddress, // -> address
  api,
  contractAbi,
  contractAddress,
  queryName,
  ...args
) {
  if (contractAddress === undefined) return;

  if (
    !api ||
    !callerAddress ||
    !queryName ||
    !contractAbi ||
    !contractAddress
  ) {
    console.log("Api invalid");
    // return toast.error("Api invalid");
  }
  // console.log("@_@ ", queryName, " callerAddress ", callerAddress);

  const contract = new ContractPromise(api, contractAbi, contractAddress);

  const gasLimit = readOnlyGasLimit(contract);

  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit, storageDepositLimit: null, value: 0 },
      ...args
    );

    if (result.isOk) {
      return output;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export const formatQueryResultToNumber = (result, chainDecimals = 18) => {
  const ret = result?.toHuman().Ok?.replaceAll(",", "");

  const formattedStrBal = formatBalance(ret, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  return formattedStrBal;
};

export async function execContractTx(
  caller, // -> currentAccount Object
  api,
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  // NOTE: amount need to convert before passing in
  // const totalAmount = new BN(token_amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  // console.log("execContractTx ", queryName);

  const contract = new ContractPromise(api, contractAbi, contractAddress);

  let unsubscribe;
  let gasLimit;
  // 6946816000 * 5;

  const { signer } = await web3FromSource(caller?.meta?.source);

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    queryName,
    ...args
  );

  const txNotSign = contract.tx[queryName]({ gasLimit, value }, ...args);

  await txNotSign
    .signAndSend(caller.address, { signer }, ({ events = [], status }) => {
      if (Object.keys(status.toHuman())[0] === "0") {
        toast.success(`Processing ...`);
      }

      events.forEach(({ event: { method } }) => {
        if (method === "ExtrinsicSuccess" && status.type === "InBlock") {
          toast.success("Successful!");
        } else if (method === "ExtrinsicFailed") {
          toast.error(`Error: ${method}.`);
        }
      });
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => {
      console.log("error", error);
      toast.error(`Error ${error}.`);
    });

  return unsubscribe;
}
