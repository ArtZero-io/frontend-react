import React, { useEffect, useMemo, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { APICall } from "../../api/client";
import { getMetaDataType1 } from "../collection/collection";
import AnimationLoader from "@components/Loader/AnimationLoader";
import { motion } from "framer-motion";
import { FINALIZED } from "@constants";
import { clearTxStatus } from "../../store/actions/txStatus";
import { delay } from "@utils";

const MyStakesPage = () => {
  const txStatus = useSelector((state) => state.txStatus);
  const dispatch = useDispatch();

  const { currentAccount, api } = useSubstrateState();

  const [loading, setLoading] = useState(false);
  const [statsInfo, setStatsInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(tabList.NOT_STAKED);
  const [PMPCollectionDetail, setPMPCollectionDetail] = useState(null);
  const [platformTradingFee, setPlatformTradingFee] = useState(0);
  const prepareStatsInfo = async () => {
    const stakedCount = await fetchMyPMPStakedCount(currentAccount);

    const pendingCount = await fetchMyPMPPendingCount(currentAccount);

    const unstakedCount = await fetchMyPMPUnstakedCount(currentAccount);

    const totalCount = stakedCount + pendingCount + unstakedCount;

    const myTradingFee = await fetchMyTradingFee(stakedCount, currentAccount);

    const fee = await fetchPlatformTradingFee(currentAccount);
    setPlatformTradingFee(fee);

    const stats = {
      totalCount,
      unstakedCount,
      pendingCount,
      stakedCount,
      myTradingFee,
    };

    setStatsInfo(stats);
  };
  useEffect(() => {
    !statsInfo && prepareStatsInfo();
  }, [statsInfo, api, currentAccount]);

  const fetchCollectionDetail = useMemo(
    () => async () => {
      setLoading(true);
      try {
        const PMPCollectionDetail = await getPMPCollectionDetail();

        PMPCollectionDetail.listNFT = [];

        if (activeTab === tabList.NOT_STAKED) {
          const myUnstakePMP = await getMyUnstakePMP({
            owner: currentAccount.address,
            collection_address: artzero_nft.CONTRACT_ADDRESS,
          });
          PMPCollectionDetail.listNFT = myUnstakePMP;
        }

        if (activeTab === tabList.PENDING_UNSTAKE) {
          const myPendingPMP = await getMyPendingPMP({
            api,
            pendingCount: statsInfo?.pendingCount,
            currentAccount,
          });

          PMPCollectionDetail.listNFT = myPendingPMP;
        }

        if (activeTab === tabList.STAKED) {
          const myStakedPMP = await getMyStakedPMP({
            api,
            stakedCount: statsInfo?.stakedCount,
            currentAccount,
          });

          PMPCollectionDetail.listNFT = myStakedPMP;
        }

        setPMPCollectionDetail(PMPCollectionDetail);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [activeTab, currentAccount]
  );

  useEffect(() => {
    fetchCollectionDetail();
  }, [currentAccount, activeTab]);

  useEffect(() => {
    const forceUpdate = async () => {
      if (
        txStatus?.stakeStatus === FINALIZED ||
        txStatus?.unstakeStatus === FINALIZED ||
        txStatus?.cancelRequestUnstakeStatus === FINALIZED ||
        txStatus?.requestUnstakeStatus === FINALIZED
      ) {
        await delay(1000).then(() => {
          dispatch(clearTxStatus());
          refresh();
        });
      }
    };

    forceUpdate();
  }, [dispatch, txStatus]);

  const refresh = () => {
    fetchCollectionDetail();
    prepareStatsInfo();
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

          {Object.keys(tabList).map((item) => (
            <Button
              key={item}
              isActive={item === activeTab}
              id={item}
              variant="outline"
              mx={1}
              onClick={() => setActiveTab(item)}
            >
              {item.replace("_", " ")}
            </Button>
          ))}

          <IconButton
            onClick={() => refresh()}
            mx={1}
            aria-label="refresh"
            icon={<RefreshIcon />}
            size="icon"
            variant="iconSolid"
          />
        </Flex>

        <Text textAlign="left" color="#fff">
          Praying Mantis Predators NFT Stats:
        </Text>

        <HStack py={5} borderBottomWidth={1} h="75px">
          {statsInfo &&
            Object.keys(statsInfo).map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Flex alignItems="start" pr={"5rem"}>
                  <Text color="brand.grayLight">
                    {item === "totalCount"
                      ? "Total"
                      : item === "unstakedCount"
                      ? "Total Not Staked"
                      : item === "pendingCount"
                      ? "Total Pending Unstake"
                      : item === "stakedCount"
                      ? "Total Staked"
                      : item === "myTradingFee"
                      ? "Trading Fee"
                      : null}
                    :
                  </Text>

                  <Text ml={1}>
                    {item === "myTradingFee"
                      ? `${statsInfo[item] || platformTradingFee} %`
                      : statsInfo[item] > 1
                      ? `${statsInfo[item]} items`
                      : `${statsInfo[item]} item`}
                  </Text>
                </Flex>
              </motion.div>
            ))}
        </HStack>

        {loading ? (
          <AnimationLoader />
        ) : PMPCollectionDetail?.listNFT?.length === 0 ? (
          <Heading py="3rem" size="h6">
            No NFTs found
          </Heading>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {<MyNFTGroupCard {...PMPCollectionDetail} />}
          </motion.div>
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

export const fetchMyPMPStakedCount = async (currentAccount) => {
  return await staking_calls.getTotalStakedByAccount(
    currentAccount,
    currentAccount.address
  );
};

export const fetchMyPMPPendingCount = async (currentAccount) => {
  return await staking_calls.getTotalPendingUnstakedByAccount(
    currentAccount,
    currentAccount.address
  );
};

export const fetchMyPMPUnstakedCount = async (currentAccount) => {
  return await artzero_nft_calls.balanceOf(
    currentAccount,
    currentAccount.address
  );
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

export const fetchMyTradingFee = async (PMPStaked, currentAccount) => {
  let ret;

  const stepArr = await fetchPlatformStakingDiscountStep(currentAccount);
  const rateArr = await fetchPlatformStakingDiscountRate(currentAccount);
  const platformTradingFee = await fetchPlatformTradingFee(currentAccount);

  for (var i = 0; i < stepArr.length; i++) {
    if (PMPStaked >= stepArr[i]) {
      ret = platformTradingFee * (1 - rateArr[i] / 100);
      break;
    }
  }
  return ret && ret.toFixed(2);
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

  ret = await Promise.all(
    [...Array(pendingCount)].map(async (_, index) => {
      const token_id = await getTokenIdOfPendingPMP({ currentAccount, index });

      const [token_info] = await APICall.getNFTByID({
        collection_address: PMPContractAddress,
        token_id,
      });

      const tokenMeta = await getMetaDataType1(token_id, token_uri);

      return { ...token_info, ...tokenMeta, stakeStatus: 3 };
    })
  );

  return ret;
};

export const getMyStakedPMP = async ({ stakedCount, currentAccount }) => {
  let ret = [];

  if (stakedCount === 0) return ret;

  const PMPContractAddress = artzero_nft.CONTRACT_ADDRESS;
  const token_uri = await getTokenURI({
    currentAccount,
  });

  ret = await Promise.all(
    [...Array(stakedCount)].map(async (_, index) => {
      const token_id = await getTokenIdOfStakedPMP({ currentAccount, index });

      const [token_info] = await APICall.getNFTByID({
        collection_address: PMPContractAddress,
        token_id,
      });
      const tokenMeta = await getMetaDataType1(token_id, token_uri);
      return { ...token_info, ...tokenMeta, stakeStatus: 2 };
    })
  );
  return ret;
};

export const getTokenURI = async ({ currentAccount }) => {
  const tokenUriFull = await artzero_nft_calls.tokenUri(
    currentAccount?.address,
    1
  );

  return tokenUriFull.replace("1.json", "");
};

export const getTokenIdOfPendingPMP = async ({ currentAccount, index }) => {
  return await staking_calls.getPendingUnstakedId(
    currentAccount,
    currentAccount.address,
    index + 1
  );
};

export const getTokenIdOfStakedPMP = async ({ currentAccount, index }) => {
  return await staking_calls.getStakedId(
    currentAccount,
    currentAccount.address,
    index + 1
  );
};

export const getPMPCollectionDetail = async () => {
  const [ret] = await APICall.getCollectionByAddress({
    collection_address: artzero_nft.CONTRACT_ADDRESS,
  });

  return ret;
};

export const tabList = {
  NOT_STAKED: "NOT_STAKED",
  PENDING_UNSTAKE: "PENDING_UNSTAKE",
  STAKED: "STAKED",
};
