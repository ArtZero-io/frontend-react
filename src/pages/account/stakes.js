import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Text,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";

import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import staking_calls from "@utils/blockchain/staking_calls";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";

import RefreshIcon from "@theme/assets/icon/Refresh.js";
import BN from "bn.js";
import { APICall } from "@api/client";
import MyNFTGroupCard from "@components/Card/MyNFTGroup";

import AnimationLoader from "@components/Loader/AnimationLoader";
import { motion } from "framer-motion";
import {
  STAKE,
  UNSTAKE,
  REQUEST_UNSTAKE,
  CANCEL_REQUEST_UNSTAKE,
} from "@constants";
import CommonContainer from "@components/Container/CommonContainer";
import CommonButton from "@components/Button/CommonButton";
import { SCROLLBAR } from "@constants";
import useTxStatus from "@hooks/useTxStatus";
import useForceUpdate from "@hooks/useForceUpdate";
import DropdownMobile from "@components/Dropdown/DropdownMobile";
import toast from "react-hot-toast";

const MyStakesPage = () => {
  const { currentAccount, api, apiState } = useSubstrateState();

  const [loading, setLoading] = useState(false);
  const [statsInfo, setStatsInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("NOT_STAKED");
  const [PMPCollectionDetail, setPMPCollectionDetail] = useState(null);
  const [platformTradingFee, setPlatformTradingFee] = useState(0);
  const [isStakingContractLocked, setIsStakingContractLocked] = useState(false);

  const { actionType } = useTxStatus();

  const fetchCollectionDetail = useCallback(
    async (isMounted) => {
      if (apiState !== "READY") return;

      setLoading(true);

      try {
        const isLocked = await staking_calls.getIsLocked(currentAccount);
        setIsStakingContractLocked(isLocked);

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

        const totalCount =
          stakedCount * 1 + pendingCount * 1 + unstakedCount * 1;

        const myTradingFee = await fetchMyTradingFee(
          stakedCount * 1,
          currentAccount,
          marketplace_contract_calls
        );

        const fee = await fetchPlatformTradingFee(
          currentAccount,
          marketplace_contract_calls
        );

        if (!isMounted) return;

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

        if (activeTab === "NOT_STAKED") {
          const myUnstakePMP = await getMyUnstakePMP({
            owner: currentAccount.address,
            collection_address: artzero_nft.CONTRACT_ADDRESS,
          });
          PMPCollectionDetail.listNFT = myUnstakePMP;
        }

        if (activeTab === "PENDING_UNSTAKE") {
          const myPendingPMP = await getMyPendingPMP({
            api,
            pendingCount: pendingCount * 1,
            currentAccount,
          });

          PMPCollectionDetail.listNFT = myPendingPMP;
        }

        if (activeTab === "STAKED") {
          const myStakedPMP = await getMyStakedPMP({
            api,
            stakedCount: stakedCount * 1,
            currentAccount,
          });

          PMPCollectionDetail.listNFT = myStakedPMP;
        }

        setPMPCollectionDetail(PMPCollectionDetail);
        setLoading(false);
      } catch (error) {
        console.log("x_x error fetchCollectionDetail:", error);
        setLoading(false);
      }
    },
    [activeTab, api, apiState, currentAccount]
  );

  const { loading: loadingForceUpdate, loadingTime } = useForceUpdate(
    [STAKE, UNSTAKE, REQUEST_UNSTAKE, CANCEL_REQUEST_UNSTAKE],
    () => handleForceUpdate()
  );

  const handleForceUpdate = async () => {
    actionType === STAKE && setActiveTab("STAKED");
    actionType === REQUEST_UNSTAKE && setActiveTab("PENDING_UNSTAKE");
    actionType === CANCEL_REQUEST_UNSTAKE && setActiveTab("STAKED");
    actionType === UNSTAKE && setActiveTab("NOT_STAKED");
  };

  useEffect(() => {
    let isMounted = true;

    fetchCollectionDetail(isMounted);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentAccount]);

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
          my stakes
        </Heading>

        <Spacer />

        {isBigScreen && (
          <HStack
            sx={SCROLLBAR}
            overflowX="scroll"
            maxW={{ base: "320px", md: "600px" }}
          >
            {Object.keys(tabList).map((item) => (
              <CommonButton
                // minW="140"
                key={item}
                variant="outline"
                text={item.replace("_", " ")}
                isActive={item === activeTab}
                onClick={() => {
                  if (item === activeTab) return;

                  setActiveTab(item);
                  setPMPCollectionDetail(null);
                }}
              />
            ))}

            <IconButton
              mx={1}
              size="icon"
              variant="iconSolid"
              aria-label="refresh"
              icon={<RefreshIcon />}
              onClick={() => fetchCollectionDetail(true)}
            />
          </HStack>
        )}
      </Flex>

      {!isBigScreen && (
        <HStack
          mb="20px"
          w="full"
          pb={[0, "8px"]}
          justifyContent="space-between"
        >
          <IconButton
            mr="2px"
            size="icon"
            variant="iconSolid"
            aria-label="refresh"
            onClick={() => fetchCollectionDetail(true)}
            icon={<RefreshIcon />}
            _hover={{ color: "black", bg: "#7ae7ff" }}
          />
          <Spacer display={["none", "flex"]} />
          (
          <DropdownMobile
            minW="256px"
            width="full"
            my="20px"
            border="1px solid #343333"
            fontSize="15px"
            fontFamily="Evogria, san serif"
            options={tabList}
            selectedItem={activeTab}
            setSelectedItem={(i) => {
              setActiveTab(i);
              setPMPCollectionDetail(null);
            }}
          />
          )
        </HStack>
      )}
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
                    ? "Total Stakeable"
                    : item === "pendingCount"
                    ? "Total Pending Unstake"
                    : item === "stakedCount"
                    ? "Total Staked"
                    : item === "myTradingFee"
                    ? "Your Trading Fee"
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
        {loading || loadingForceUpdate ? (
          <Stack h="574px">
            <AnimationLoader loadingTime={loadingTime || 3} />
          </Stack>
        ) : !PMPCollectionDetail?.listNFT ||
          PMPCollectionDetail?.listNFT?.length === 0 ? (
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
                isStakingContractLocked={isStakingContractLocked}
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

  if (!response) {
    toast.error("Error when fetch Platform Staking Discount Step");
    return [];
  }

  return Array.from(response);
};

export const fetchPlatformStakingDiscountRate = async (
  currentAccount,
  marketplace_contract_calls
) => {
  const response = await marketplace_contract_calls.getStakingDiscountRate(
    currentAccount
  );
  const ret = response?.map((rate) => {
    return rate?.replaceAll(",", "") / 100;
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

  const { ret: dataList } = await APICall.getNFTsByOwnerAndCollection({
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
  try {
    ret = await Promise.all(
      [...Array(pendingCount)].map(async (_, index) => {
        let token_id = await getTokenIdOfPendingPMP({
          currentAccount,
          index,
        });

        token_id = token_id?.replaceAll(",", "");
        let token_info;

        const { ret, status } = await APICall.getNFTByID({
          collection_address: PMPContractAddress,
          token_id,
        });
        console.log("token_id token_id", token_id);
        if (status === "OK") {
          token_info = ret[0];
        }

        return { ...token_info, stakeStatus: 3 };
      })
    );
  } catch (error) {
    console.log(error);
  }

  return ret;
};

export const getMyStakedPMP = async ({ stakedCount, currentAccount }) => {
  let ret = [];

  if (stakedCount === 0) return ret;

  const PMPContractAddress = artzero_nft.CONTRACT_ADDRESS;

  ret = await Promise.all(
    [...Array(stakedCount)].map(async (_, index) => {
      let token_id = await getTokenIdOfStakedPMP({ currentAccount, index });

      token_id = token_id?.replaceAll(",", "");
      let token_info;

      const { ret, status } = await APICall.getNFTByID({
        collection_address: PMPContractAddress,
        token_id,
      });

      if (status === "OK") {
        token_info = ret[0];
      }
      return { ...token_info, stakeStatus: 2 };
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
    index
  );
};

export const getTokenIdOfStakedPMP = async ({ currentAccount, index }) => {
  return await staking_calls.getStakedId(
    currentAccount,
    currentAccount.address,
    index
  );
};

export const getPMPCollectionDetail = async () => {
  const { ret, status } = await APICall.getCollectionByAddress({
    collection_address: artzero_nft.CONTRACT_ADDRESS,
  });

  if (status === "OK") {
    return ret[0];
  }

  return {};
};

const NOT_STAKED = "NOT STAKED";
const PENDING_UNSTAKE = "PENDING UNSTAKE";
const STAKED = "STAKED";

export const tabList = {
  NOT_STAKED,
  PENDING_UNSTAKE,
  STAKED,
};
