import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";

import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BN from "bn.js";
import { clientAPI } from "@api/client";
import MyNFTGroupCard from "../account/components/Card/MyNFTGroup";

import { useSelector } from "react-redux";
import { delay } from "../../utils";
let az_collection = [];
let my_az_nfts = [];
let my_staked_az_nfts = [];
let my_pending_az_nfts = [];

const MyStakesPage = () => {
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  const { currentAccount } = useSubstrateState();

  const [generalStats, setGeneralStats] = useState({
    my_total_az_nfts: 0,
    my_total_staked_az_nfts: 0,
    my_total_unstaked_az_nfts: 0,
    my_total_pending_az_nfts: 0,
    my_discount_rate: 0,
  });
  const [currentTab, setCurrentTab] = useState("notStaked");
  const [, setLoading] = useState(true);
  const [currentTabList, setCurrentTabList] = useState([]);

  const getGeneralStats = async () => {
    setLoading(true);
    let my_total_staked_az_nfts = await staking_calls.getTotalStakedByAccount(
      currentAccount,
      currentAccount.address
    );
    let my_total_pending_az_nfts =
      await staking_calls.getTotalPendingUnstakedByAccount(
        currentAccount,
        currentAccount.address
      );
    let my_total_unstaked_az_nfts = await artzero_nft_calls.balanceOf(
      currentAccount,
      currentAccount?.address
    );
    let my_total_az_nfts =
      my_total_staked_az_nfts +
      my_total_pending_az_nfts +
      my_total_unstaked_az_nfts;

    let stakingDiscountCriteria =
      await marketplace_contract_calls.getStakingDiscountCriteria(
        currentAccount
      );
    let stakingDiscountRate =
      await marketplace_contract_calls.getStakingDiscountRate(currentAccount);
    let my_discount_rate =
      (await marketplace_contract_calls.getPlatformFee(currentAccount)) / 100;
    let length = stakingDiscountRate.length;

    for (var index = 0; index < length; index++) {
      if (
        my_total_staked_az_nfts >=
        new BN(stakingDiscountCriteria[index]).toNumber()
      ) {
        my_discount_rate =
          (my_discount_rate *
            (10000 - new BN(stakingDiscountRate[index]).toNumber())) /
          10000;
        break;
      }
    }

    let obj = {
      my_total_az_nfts,
      my_total_staked_az_nfts,
      my_total_unstaked_az_nfts,
      my_total_pending_az_nfts,
      my_discount_rate,
    };
    setGeneralStats(obj);
    await delay(3000);
    await getAZCollection();
    await getMyAZNFTs();
    await getMyStakedAZNFTs(my_total_staked_az_nfts);
    await getMyPendingUnstakeAZNFTs(my_total_pending_az_nfts);
    setLoading(false);
  };

  const getMyAZNFTs = async () => {
    const options = {
      collection_address: artzero_nft.CONTRACT_ADDRESS,
      owner: currentAccount.address,
      limit: 10000,
      offset: 0,
      sort: -1,
    };

    const dataList = await clientAPI(
      "post",
      "/getNFTsByOwnerAndCollection",
      options
    );
    console.log(dataList);
    if (dataList) {
      const data = dataList?.map((item) => {
        return { ...item, stakeStatus: 1 };
      });
      my_az_nfts = data;
      if (az_collection?.length) {
        az_collection[0].listNFT = my_az_nfts;
      }
      console.log('az_collection', az_collection)
      setCurrentTabList(az_collection);
    }
  };

  const getMyStakedAZNFTs = async (total_staked) => {
    if (total_staked === 0) {
      my_staked_az_nfts = [];
      return;
    }

    let tokens = [];
    for (var i = 1; i <= total_staked; i++) {
      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        token_id: await staking_calls.getStakedId(
          currentAccount,
          currentAccount.address,
          i
        ),
      };

      const token_info = await clientAPI("post", "/getNFTByID", options);
      token_info[0].stakeStatus = 2;
      tokens.push(token_info[0]);
    }
    my_staked_az_nfts = tokens;
  };

  const getMyPendingUnstakeAZNFTs = async (total_pending) => {
    console.log("getMyPendingUnstakeAZNFTs", total_pending);
    if (total_pending === 0) {
      my_pending_az_nfts = [];
      return;
    }

    let tokens = [];
    for (var i = 1; i <= total_pending; i++) {
      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        token_id: await staking_calls.getPendingUnstakedId(
          currentAccount,
          currentAccount.address,
          i
        ),
      };

      const token_info = await clientAPI("post", "/getNFTByID", options);
      token_info[0].stakeStatus = 3;
      tokens.push(token_info[0]);
    }
    my_pending_az_nfts = tokens;
  };

  const getAZCollection = async () => {
    //Get all Not Staked AZ NFTs
    az_collection = await clientAPI("post", "/getCollectionByAddress", {
      collection_address: artzero_nft.CONTRACT_ADDRESS,
    });
  };

  useEffect(() => {
    getGeneralStats();
  }, [currentAccount.address, tnxStatus]);

  const onClickHandler = async (e) => {
    const id = e.target.getAttribute("id").toString();
if(az_collection.length){

  if (id === "staked") az_collection[0].listNFT = my_staked_az_nfts;
  else if (id === "notStaked") az_collection[0].listNFT = my_az_nfts;
  else if (id === "pending") az_collection[0].listNFT = my_pending_az_nfts;
  // console.log(az_collection);
}
    setCurrentTabList(az_collection);
    setCurrentTab(id);
  };

  return (
    <Box as="section" maxW="container.3xl">
      <Box
        mx="auto"
        maxW={{ base: "6xl", "2xl": "7xl" }}
        px={{ base: "6", "2xl": "8" }}
        py={{ base: "12", "2xl": "20" }}
      >
        <Flex w="full" alignItems="start" pb={12}>
          <Heading size="h2">My Stakes</Heading>
          <Spacer />
          <Button
            isActive={"notStaked" === currentTab}
            id="notStaked"
            variant="outline"
            mx={1}
            onClick={(e) => onClickHandler(e)}
          >
            Not Staked
          </Button>
          <Button
            isActive={"pending" === currentTab}
            id="pending"
            variant="outline"
            mx={1}
            onClick={(e) => onClickHandler(e)}
          >
            Pending Unstake
          </Button>
          <Button
            isActive={"staked" === currentTab}
            id="staked"
            variant="outline"
            mx={1}
            onClick={(e) => onClickHandler(e)}
          >
            Staked
          </Button>

          <IconButton
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
          />
        </Flex>

        <HStack pb={5} borderBottomWidth={1}>
          <Text color="#fff">ArtZero NFT Stats:</Text>
          <br />
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total:
            <Text color="#fff" ml={2}>
              {generalStats.my_total_az_nfts}
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total Staked:
            <Text color="#fff" ml={2}>
              {generalStats.my_total_staked_az_nfts}
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total Pending Unstaked:
            <Text color="#fff" ml={2}>
              {generalStats.my_total_pending_az_nfts}
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight"></Text>
            Total Not Staked:
            <Text color="#fff" ml={2}>
              {generalStats.my_total_unstaked_az_nfts}
            </Text>
          </Flex>
          <Flex alignItems="start">
            <Text ml={1} color="brand.grayLight"></Text>
            Discount Rate:
            <Text color="#fff" ml={2}>
              {generalStats.my_discount_rate}%
            </Text>
          </Flex>
        </HStack>

        {/* {loading ? (
          <Loader my={'14rem'} />
        ) : (
          currentTabList?.map((item) => <MyNFTGroupCard {...item} />)
          )} */}
          {console.log('currentTabList', currentTabList)}
        {currentTabList?.listNFT?.length === 0 ? (
          <Text>No NFTs found</Text>
        ) : (
          currentTabList?.map((item, idx) => <MyNFTGroupCard {...item} key={idx}/>)
        )}
      </Box>
    </Box>
  );
};

export default MyStakesPage;
