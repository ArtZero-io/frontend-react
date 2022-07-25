import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  Stack,
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
import CommonContainer from "../../components/Container/CommonContainer";
import CommonButton from "../../components/Button/CommonButton";
import { SCROLLBAR } from "../../constants";

const MyStakesPage = () => {
  const txStatus = useSelector((state) => state.txStatus);
  const dispatch = useDispatch();

  const { currentAccount, api } = useSubstrateState();

  const [loading, setLoading] = useState(false);
  const [statsInfo, setStatsInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(tabList.NOT_STAKED);
  const [PMPCollectionDetail, setPMPCollectionDetail] = useState(null);
  const [platformTradingFee, setPlatformTradingFee] = useState(0);

  const fetchCollectionDetail = useCallback(async () => {
    setLoading(true);
    try {
      const stakedCount = await fetchMyPMPStakedCount(
        currentAccount,
        staking_calls
      );

      const pendingCount = await fetchMyPMPPendingCount(
        currentAccount,
        staking_calls
      );

      const unstakedCount = await fetchMyPMPUnstakedCount(
        currentAccount,
        artzero_nft_calls
      );

      const totalCount = stakedCount + pendingCount + unstakedCount;

      const myTradingFee = await fetchMyTradingFee(
        stakedCount,
        currentAccount,
        marketplace_contract_calls
      );
      const fee = await fetchPlatformTradingFee(
        currentAccount,
        marketplace_contract_calls
      );
      setPlatformTradingFee(fee);

      const stats = {
        totalCount,
        unstakedCount,
        pendingCount,
        stakedCount,
        myTradingFee,
      };
      setStatsInfo(stats);

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
          pendingCount: pendingCount,
          currentAccount,
        });

        PMPCollectionDetail.listNFT = myPendingPMP;
      }

      if (activeTab === tabList.STAKED) {
        const myStakedPMP = await getMyStakedPMP({
          api,
          stakedCount: stakedCount,
          currentAccount,
        });

        PMPCollectionDetail.listNFT = myStakedPMP;
      }

      setPMPCollectionDetail(PMPCollectionDetail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [activeTab, api, currentAccount]);

  useEffect(() => {
    fetchCollectionDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentAccount]);

  useEffect(() => {
    const forceUpdate = async () => {
      if (
        txStatus?.stakeStatus === FINALIZED ||
        txStatus?.unstakeStatus === FINALIZED ||
        txStatus?.cancelRequestUnstakeStatus === FINALIZED ||
        txStatus?.requestUnstakeStatus === FINALIZED
      ) {
        await delay(7000).then(() => {
          txStatus?.stakeStatus && setActiveTab(tabList.STAKED);
          txStatus?.cancelRequestUnstakeStatus && setActiveTab(tabList.STAKED);
          txStatus?.requestUnstakeStatus &&
            setActiveTab(tabList.PENDING_UNSTAKE);
          txStatus?.unstakeStatus && setActiveTab(tabList.NOT_STAKED);

          dispatch(clearTxStatus());
          refresh();
        });
      }
    };

    forceUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, txStatus]);

  const refresh = () => {
    fetchCollectionDetail();
  };

  return (
    <CommonContainer>
      <Flex
        w="full"
        alignItems="start"
        pb={{ base: "12px", xl: "48px" }}
        direction={{ base: "column", xl: "row" }}
      >
        <Heading fontSize={["3xl-mid", "5xl", "5xl"]} minW="100px">
          my stakes
        </Heading>

        <Spacer />

        <HStack
          pb="8px"
          mt="20px"
          sx={SCROLLBAR}
          overflowX="scroll"
          maxW={{ base: "320px", md: "600px" }}
        >
          {Object.keys(tabList).map((item) => (
            <CommonButton
              key={item}
              variant="outline"
              text={item.replace("_", " ")}
              isActive={item === activeTab}
              onClick={() => setActiveTab(item)}
            />
          ))}

          <IconButton
            mx={1}
            size="icon"
            variant="iconSolid"
            aria-label="refresh"
            icon={<RefreshIcon />}
            onClick={() => refresh()}
          />
        </HStack>
      </Flex>

      <Text textAlign="left" color="#fff">
        Praying Mantis Predators NFT Stats:
      </Text>

      <Stack
        py={5}
        borderBottomWidth={1}
        h={{ base: "195px", xl: "75px" }}
        direction={{ base: "column", lg: "row" }}
      >
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
      </Stack>
      <Stack minHeight="504px" h="full">
        {loading ? (
          <Stack h="574px">
            <AnimationLoader />
          </Stack>
        ) : PMPCollectionDetail?.listNFT?.length === 0 ? (
          <Heading py="3rem" size="h6">
            No NFTs found
          </Heading>
        ) : (
          <motion.div
            style={{ minHeight: "574px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {
              <MyNFTGroupCard
                {...PMPCollectionDetail}
                hasBottomBorder={false}
              />
            }
          </motion.div>
        )}
      </Stack>
    </CommonContainer>
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

export const fetchMyPMPStakedCount = async (currentAccount, staking_calls) => {
  return await staking_calls.getTotalStakedByAccount(
    currentAccount,
    currentAccount.address
  );
};

export const fetchMyPMPPendingCount = async (currentAccount, staking_calls) => {
  return await staking_calls.getTotalPendingUnstakedByAccount(
    currentAccount,
    currentAccount.address
  );
};

export const fetchMyPMPUnstakedCount = async (
  currentAccount,
  artzero_nft_calls
) => {
  return await artzero_nft_calls.balanceOf(
    currentAccount,
    currentAccount.address
  );
};

export const fetchPlatformStakingDiscountStep = async (
  currentAccount,
  marketplace_contract_calls
) => {
  const response = await marketplace_contract_calls.getStakingDiscountCriteria(
    currentAccount
  );
  return Array.from(response);
};

export const fetchPlatformStakingDiscountRate = async (
  currentAccount,
  marketplace_contract_calls
) => {
  const response = await marketplace_contract_calls.getStakingDiscountRate(
    currentAccount
  );

  const ret = response.map((rate) => {
    return rate.div(createNumberBN(100)).toNumber();
  });

  return ret;
};

export const fetchPlatformTradingFee = async (
  currentAccount,
  marketplace_contract_calls
) => {
  const response = await marketplace_contract_calls.getPlatformFee(
    currentAccount
  );

  return response / 100;
};

export const fetchMyTradingFee = async (
  PMPStaked,
  currentAccount,
  marketplace_contract_calls
) => {
  let ret;

  const stepArr = await fetchPlatformStakingDiscountStep(
    currentAccount,
    marketplace_contract_calls
  );
  const rateArr = await fetchPlatformStakingDiscountRate(
    currentAccount,
    marketplace_contract_calls
  );
  const platformTradingFee = await fetchPlatformTradingFee(
    currentAccount,
    marketplace_contract_calls
  );

  ret = platformTradingFee;

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
    limit: 10000,
    offset: 0,
    sort: -1,
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
