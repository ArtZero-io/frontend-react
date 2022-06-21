/* eslint-disable no-unused-vars */
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
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";

import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BN from "bn.js";
import { clientAPI } from "@api/client";
import MyNFTGroupCard from "../account/components/Card/MyNFTGroup";

import { useSelector } from "react-redux";
import { delay } from "../../utils";
import { formatNumber } from "@polkadot/util";
import { APICall } from "../../api/client";
import { getMetaDataType1 } from "../collection/collection";
import { ContractPromise } from "@polkadot/api-contract";

let az_collection = [];
let my_az_nfts = [];
let my_staked_az_nfts = [];
let my_pending_az_nfts = [];

const MyStakesPage = () => {
  const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  const { currentAccount, api } = useSubstrateState();
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

    const myStakedCount = await fetchMyPMPStakedCount(
      currentAccount,
      currentAccount.address
    );
    console.log("myStakedCount", myStakedCount);

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
    console.log("dataList", dataList);
    if (dataList) {
      const data = dataList?.map((item) => {
        return { ...item, stakeStatus: 1 };
      });
      my_az_nfts = data;
      if (az_collection?.length) {
        az_collection[0].listNFT = my_az_nfts;
      }
      console.log("qwe 1az_collection", az_collection);
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
    console.log("qwe 2my_staked_az_nfts", my_staked_az_nfts);
  };

  const getMyPendingUnstakeAZNFTs = async (total_pending) => {
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
    console.log("qwe 3my_pending_az_nfts", my_pending_az_nfts);
  };

  const getAZCollection = async () => {
    //Get all Not Staked AZ NFTs
    az_collection = await clientAPI("post", "/getCollectionByAddress", {
      collection_address: artzero_nft.CONTRACT_ADDRESS,
    });
    console.log("qwe 4az_collection", az_collection);
  };
  // const xxx = getMyUnstakePMP({ owner, collection_address });

  // console.log("xxx", xxx);
  useEffect(() => {
    getGeneralStats();
  }, [currentAccount.address, tnxStatus]);

  const onClickHandler = async (e) => {
    const id = e.target.getAttribute("id").toString();
    if (az_collection.length) {
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
            Trade Fee:
            <Text color="#fff" ml={2}>
              {generalStats.my_discount_rate}%
            </Text>
          </Flex>
        </HStack>

        {currentTabList?.listNFT?.length === 0 ? (
          <Text>No NFTs found</Text>
        ) : (
          currentTabList?.map((item, idx) => (
            <MyNFTGroupCard {...item} key={idx} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyStakesPage;

export const isNotNumber = (value) => {
  return (
    typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)
  );
};

export const createNumberBN = (num, pow = 1) => {
  const numPF = parseFloat(num);
  const powPF = parseFloat(pow);

  return isNotNumber(numPF) || isNotNumber(powPF)
    ? 0
    : new BN(numPF, 10).pow(new BN(powPF));
};

export const fetchMyPMPStakedCount = async (currentAccount, address) => {
  return await staking_calls.getTotalStakedByAccount(currentAccount, address);
};

export const fetchMyPMPPendingCount = async (currentAccount, address) => {
  return await staking_calls.getTotalPendingUnstakedByAccount(
    currentAccount,
    address
  );
};

export const fetchMyPMPUnstakedCount = async (currentAccount, address) => {
  return await artzero_nft_calls.balanceOf(currentAccount, address);
};

export const fetchPlatformStakingDiscountStep = async (currentAccount) => {
  const response = await marketplace_contract_calls.getStakingDiscountCriteria(
    currentAccount
  );

  return Array.from(response);
};

export const fetchPlatformStakingDiscountRate = async (currentAccount) => {
  const response = await marketplace_contract_calls.getStakingDiscountRate(
    currentAccount
  );

  const ret = response.map((rate) => {
    return rate.div(createNumberBN(100)).toNumber();
  });

  return ret;
};

export const fetchPlatformTradingFee = async (currentAccount) => {
  const response = await marketplace_contract_calls.getPlatformFee(
    currentAccount
  );

  return response / 100;
};

export const fetchMyTradingFee = async (
  PMPStaked,
  stepArr,
  rateArr,
  platformTradingFee
) => {
  let ret;

  for (var i = 0; i < stepArr.length; i++) {
    if (PMPStaked >= stepArr[i]) {
      ret = platformTradingFee * (1 - rateArr[i] / 100);
      break;
    }
  }
  return ret.toFixed(2);
};

export const getMyUnstakePMP = async ({ owner, collection_address }) => {
  let ret = [];

  const dataList = await clientAPI("post", "/getNFTsByOwnerAndCollection", {
    collection_address,
    owner,
  });

  if (dataList.length === 0) return ret;

  ret = dataList.map((item) => {
    return { ...item, stakeStatus: 1 };
  });

  console.log("ret", ret);
  return ret;
};

export const getMyPendingPMP = async ({
  api,
  pendingCount,
  currentAccount,
}) => {
  let ret = [];

  if (pendingCount === 0) return ret;

  const PMPContractAddress = artzero_nft.CONTRACT_ADDRESS;
  const token_uri = await getTokenURI({
    api,
    nftContractAddress: PMPContractAddress,
    currentAccount,
  });

  console.log("token_uri", token_uri);
  const getTokenIdOfPendingPMP = async ({ currentAccount, index }) => {
    return await staking_calls.getPendingUnstakedId(
      currentAccount,
      currentAccount.address,
      index + 1
    );
  };

  Promise.all(
    [...Array(pendingCount)].map(async (_, index) => {
      const id = await getTokenIdOfPendingPMP({ currentAccount, index });
      console.log("id", id);
      return id;
    })
  ).then((arr) => {
    console.log("arr", arr);
    ret = arr.map(async (token_id) => {
      console.log("token_id", token_id);
      const [token_info] = await APICall.getNFTByID({
        collection_address: PMPContractAddress,
        token_id,
      });

      const tokenMeta = await getMetaDataType1(token_id, token_uri);

      const xxx = { ...token_info, ...tokenMeta, stakeStatus: 3 };
      console.log("xxxxxx", xxx);
      return token_info;
    });
  });
  // my_pending_az_nfts = tokens;
  console.log("qwe 3ret", ret);
  return ret;
};

export const getMyStakedPMP = async ({ api, stakedCount, currentAccount }) => {
  let ret = [];

  if (stakedCount === 0) return ret;

  const PMPContractAddress = artzero_nft.CONTRACT_ADDRESS;
  const token_uri = await getTokenURI({
    api,
    nftContractAddress: PMPContractAddress,
    currentAccount,
  });

  console.log("token_uri", token_uri);
  const getTokenIdOfPendingPMP = async ({ currentAccount, index }) => {
    return await staking_calls.getStakedId(
      currentAccount,
      currentAccount.address,
      index + 1
    );
  };

  Promise.all(
    [...Array(stakedCount)].map(async (_, index) => {
      const id = await getTokenIdOfPendingPMP({ currentAccount, index });
      console.log("id", id);
      return id;
    })
  ).then((arr) => {
    console.log("arr", arr);
    ret = arr.map(async (token_id) => {
      console.log("token_id", token_id);
      const [token_info] = await APICall.getNFTByID({
        collection_address: PMPContractAddress,
        token_id,
      });

      const tokenMeta = await getMetaDataType1(token_id, token_uri);

      const xxx = { ...token_info, ...tokenMeta, stakeStatus: 3 };
      console.log("xxxxxx", xxx);
      return token_info;
    });
  });
  // my_pending_az_nfts = tokens;
  console.log("qwe 3ret", ret);
  return ret;
};

export const getTokenURI = async ({
  api,
  nftContractAddress,
  currentAccount,
}) => {
  const nft_contract = new ContractPromise(
    api,
    nft721_psp34_standard.CONTRACT_ABI,
    nftContractAddress
  );

  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await nft_contract.query["psp34Traits::tokenUri"](
    currentAccount?.address,
    { value: azero_value, gasLimit },
    1
  );

  console.log("output", output);
  const token_uri = output.toHuman()?.replace("1.json", "");
  console.log("token_uri", token_uri);
  return token_uri;
};
