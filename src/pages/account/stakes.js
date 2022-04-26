/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Center,
  Spinner,
  Button,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { delay } from "@utils";
import MyNFTGroupCard from "./components/Card/MyNFTGroup";
import { useSubstrateState } from "@utils/substrate";

import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";
import { ContractPromise } from "@polkadot/api-contract";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BN from "bn.js";
import { clientAPI } from "@api/client";
import toast from "react-hot-toast";


let az_collection = [];
let my_az_nfts = [];
let my_staked_az_nfts = [];
let my_pending_az_nfts = [];

const MyStakesPage = () => {
  const { api, currentAccount } = useSubstrateState();

  const [generalStats, setGeneralStats] = useState({
    my_total_az_nfts:0,
    my_total_staked_az_nfts:0,
    my_total_unstaked_az_nfts:0,
    my_total_pending_az_nfts:0,
    my_discount_rate:0
  });
  const [currentTab,setCurrentTab] = useState("notStaked");
  const [loading,setLoading] = useState(true);
  const [currentTabList,setCurrentTabList] = useState([]);

  const getGeneralStats = async () =>{
    setLoading(true);
    let my_total_staked_az_nfts = await staking_calls.getTotalStakedByAccount(currentAccount,currentAccount.address);
    let my_total_pending_az_nfts = await staking_calls.getTotalPendingUnstakedByAccount(currentAccount,currentAccount.address);
    let my_total_unstaked_az_nfts = await artzero_nft_calls.balanceOf(currentAccount, currentAccount.address);
    let my_total_az_nfts = my_total_staked_az_nfts + my_total_pending_az_nfts + my_total_unstaked_az_nfts;

    let stakingDiscountCriteria = await marketplace_contract_calls.getStakingDiscountCriteria(currentAccount);
    let stakingDiscountRate = await marketplace_contract_calls.getStakingDiscountRate(currentAccount);
    let my_discount_rate = await marketplace_contract_calls.getPlatformFee(currentAccount)/100;
    let length = stakingDiscountRate.length;

    for (var index= 0;index<length;index++) {
        if (my_total_staked_az_nfts >= new BN(stakingDiscountCriteria[index]).toNumber()){
             my_discount_rate = my_discount_rate * (10000 - new BN(stakingDiscountRate[index]).toNumber())/10000;
             break;
        }
    }

    let obj = {
      my_total_az_nfts,
      my_total_staked_az_nfts,
      my_total_unstaked_az_nfts,
      my_total_pending_az_nfts,
      my_discount_rate
    }
    setGeneralStats(obj);
    await getAZCollection();
    await getMyAZNFTs();
    await getMyStakedAZNFTs(my_total_staked_az_nfts);
     await getMyPendingUnstakeAZNFTs(my_total_pending_az_nfts);
    setLoading(false);
  }

  const getMyAZNFTs = async () => {

    const options = {
      collection_address: artzero_nft.CONTRACT_ADDRESS,
      owner:currentAccount.address,
      limit: 10000,
      offset: 0,
      sort: -1,
    };

    const dataList = await clientAPI("post", "/getNFTsByOwnerAndCollection", options);
    console.log(dataList);
    if (dataList){
      my_az_nfts = dataList;
      az_collection[0].listNFT = my_az_nfts;
      setCurrentTabList(az_collection);
    }

  }

  const getMyStakedAZNFTs = async (total_staked) =>{

    if (total_staked == 0) return;

    let tokens = [];
    for (var i=1;i<=total_staked;i++){
      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        token_id: await staking_calls.getStakedId(currentAccount,currentAccount.address,i)
      };

      const token_info = await clientAPI("post", "/getNFTByID", options);
      tokens.push(token_info[0]);
    }
    my_staked_az_nfts = tokens;
  }

  const getMyPendingUnstakeAZNFTs = async (total_pending) =>{
    console.log('getMyPendingUnstakeAZNFTs');
    if (total_pending == 0) return;

    let tokens = [];
    for (var i=1;i<=total_pending;i++){
      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        token_id: await staking_calls.getPendingUnstakedId(currentAccount,currentAccount.address,i)
      };

      const token_info = await clientAPI("post", "/getNFTByID", options);

      tokens.push(token_info[0]);
    }
    my_pending_az_nfts = tokens;
  }

  const getAZCollection = async () =>{
    //Get all Not Staked AZ NFTs
    az_collection = await clientAPI(
      "post",
      "/getCollectionByAddress",
      {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
      }
    );
  }

  useEffect(() => {
    getGeneralStats();
  }, [currentAccount.address]);

  const onClickHandler = async (e) => {
    const id = e.target.getAttribute("id").toString();

    if (id == "staked") az_collection[0].listNFT = my_staked_az_nfts;
    else if (id == "notStaked") az_collection[0].listNFT = my_az_nfts;
    else if (id == "pending") az_collection[0].listNFT = my_pending_az_nfts;
    console.log(az_collection);
    setCurrentTabList(az_collection);
    setCurrentTab(id);

  }

  return (
    <Box as="section" maxW="container.3xl" px={5} minH="60rem">
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
            isActive={"notStaked" == currentTab}
            id="notStaked"
            variant="outline"
            mx={1}
            onClick={(e) => onClickHandler(e)}
          >
            Not Staked
          </Button>
          <Button
            isActive={"pending" == currentTab}
            id="pending"
            variant="outline"
            mx={1}
            onClick={(e) => onClickHandler(e)}
          >
            Pending Unstake
          </Button>
          <Button
            isActive={"staked" == currentTab}
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
          <br/>
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
        {loading && (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
        {currentTabList?.map((item) => <MyNFTGroupCard {...item} />)}
        {currentTabList?.length === 0 && (
          <Text>No NFTs found</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyStakesPage;
