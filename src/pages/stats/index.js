import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

import Layout from "@components/Layout/Layout";
import StatsHeader from "./component/Header/StatsHeader";
import TopCollectionsTab from "./Tab/TopCollectionsTab";
// import PayoutHistoryTab from "./Tab/PayoutHistoryTab";
import { useSubstrateState } from "@utils/substrate";

import { APICall } from "@api/client";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import staking_calls from "@utils/blockchain/staking_calls";
import useInterval from "use-interval";
import { getPublicCurrentAccount } from "@utils";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import collection_manager from "@utils/blockchain/collection-manager";
import { fetchUserBalance } from "../launchpad/component/Form/AddNewProject";
import toast from "react-hot-toast";
import { formatBalance } from "@polkadot/util";

const url = "https://min-api.cryptocompare.com/data/price?fsym=azero&tsyms=USD";
const INW_RATE = 120;

function StatsPage() {
  const { api } = useSubstrateState();

  const [platformStatistics, setPlatformStatistics] = useState(null);
  const [topCollections, setTopCollections] = useState(null);
  const [azeroPrice, setAzeroPrice] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const publicCurrentAccount = getPublicCurrentAccount();

  const fetchAzeroPrice = useCallback(async () => {
    await fetch(url)
      .then((res) => res.json())
      .then(({ USD }) => {
        console.log("5IRE - USD:", USD?.toFixed(4));
        setAzeroPrice(USD.toFixed(4));
      })
      .catch((err) => {
        setAzeroPrice(1);
        console.log(err);
        toast.error("Failed to fetch Azero price. Temp set to 1 USD");
      });
  }, []);

  const prepareStats = async () => {
    try {
      // Total Payout
      const { ret: data } = await APICall.getAllRewardPayout({
        limit: 1000,
        offset: 0,
        sort: -1,
      });

      const totalPayouts = data.reduce((acc, curr) => {
        return acc + curr.rewardAmount;
      }, 0);

      const totalNftPayouts = data.reduce((acc, curr) => {
        return acc + curr.totalStakedAmount * 10 ** 18;
      }, 0);

      let remainRewardPool = 0;
      let isRewardStarted = await staking_calls.getRewardStarted(
        publicCurrentAccount
      );

      if (!isRewardStarted) {
        let remainRewardPoolData = await staking_calls.getRewardPool(
          publicCurrentAccount
        );
        remainRewardPool = remainRewardPoolData;
      }
      // Total Marketplace Vol
      const totalVolume = await marketplace_contract_calls.getTotalVolume(
        publicCurrentAccount
      );

      // Calculator Next Payout
      const marketplaceProfit =
        await marketplace_contract_calls.getCurrentProfit(publicCurrentAccount);

      const { balance: launchpadProfit } = await fetchUserBalance({
        api,
        currentAccount: publicCurrentAccount,
        address: launchpad_manager?.CONTRACT_ADDRESS,
      });

      const { balance: collectionProfit } = await fetchUserBalance({
        api,
        currentAccount: publicCurrentAccount,
        address: collection_manager?.CONTRACT_ADDRESS,
      });

      const { balance: validatorProfit } = await fetchValidatorProfit({
        api,
        currentAccount: publicCurrentAccount,
        address: process.env.REACT_APP_VALIDATOR_ADDRESS,
      });

      const totalPlatformProfit =
        marketplaceProfit + launchpadProfit + collectionProfit;

      const totalNextPayout = totalPlatformProfit * 0.3 + validatorProfit * 0.5;

      process.env.NODE_ENV === "development" &&
        console.table({
          Marketplace: {
            "Total Profit": marketplaceProfit,
            "30% Share": marketplaceProfit * 0.3,
          },
          Launchpad: {
            "Total Profit": launchpadProfit,
            "30% Share": launchpadProfit * 0.3,
          },
          Collection: {
            "Total Profit": collectionProfit,
            "30% Share": collectionProfit * 0.3,
          },
          Validator: {
            "Total Profit": validatorProfit,
            "50% Share": validatorProfit * 0.5,
          },
          Sum: {
            "Total Profit": totalPlatformProfit + validatorProfit,
            "30% Share": totalPlatformProfit * 0.3,
            "50% Share": validatorProfit * 0.5,
            "Total Next Payout":
              totalPlatformProfit * 0.3 + validatorProfit * 0.5,
          },
        });

      // END Calculator Next Payout

      //Total NFTs Staked
      const platformTotalStaked = await staking_calls.getTotalStaked(
        publicCurrentAccount
      );

      // TOP COLLECTIONS
      const { ret: dataList } = await APICall.getCollectionsByVolume({
        limit: 20,
      });

      const dataListWithFP = await Promise.all(
        dataList.map(async (item, index) => {
          const {
            ret: [data],
          } = await APICall.getCollectionFloorPrice({
            collection_address: item.nftContractAddress,
          });

          return {
            ...item,
            order: index + 1,
            floorPrice: data?.price / 10 ** 18 || 0,
          };
        })
      );

      setIsLoading(false);

      const ret = {
        platformStatistics: [
          {
            title: "Total Payout (5IRE)",
            value: (totalPayouts - remainRewardPool)?.toFixed(2),
            unit: "azero",
          },
          {
            title: "Total Marketplace Vol",
            value: totalVolume?.toFixed(2),
            unit: "azero",
          },
          {
            title: "Next Payout (5IRE)",
            value: (totalNextPayout + remainRewardPool)?.toFixed(2),
            unit: "azero",
          },
          {
            title: "Total Payout (INW)",
            value: totalNftPayouts * INW_RATE,
            unit: "INW",
          },
          {
            title: "Total NFTs Staked",
            value: platformTotalStaked,
            unit: "NFTs",
          },
          {
            title: "Next Payout (INW)",
            value: platformTotalStaked * INW_RATE,
            unit: "INW",
          },
        ],
        topCollections: dataListWithFP,
      };

      return ret;
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to fetch stats", err.message);
    }
  };

  useEffect(() => {
    if (!platformStatistics || !topCollections) {
      setIsLoading(true);
      fetchAzeroPrice();
      prepareStats().then((data) => {
        setPlatformStatistics(data?.platformStatistics);
        setTopCollections(data?.topCollections);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    fetchAzeroPrice();
    prepareStats().then((data) => {
      setPlatformStatistics(data.platformStatistics);
      setTopCollections(data.topCollections);
    });
  }, 60000);

  const tabData = [
    {
      label: "top nft collections",
      content: (
        <TopCollectionsTab
          topCollections={topCollections}
          azeroPrice={azeroPrice}
        />
      ),
    },
    // {
    //   label: "payout history",
    //   content: <PayoutHistoryTab />,
    // },
  ];

  return (
    <Layout>
      <StatsHeader
        platformStatistics={platformStatistics}
        isLoading={isLoading}
        azeroPrice={azeroPrice}
      />

      <Tabs isLazy align="center" colorScheme="brand.blue">
        <TabList bg="#000" borderBottomColor="#000">
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              mx="25px"
              px="0.5px"
              py={["8px", "20px", "20px"]}
              fontSize={["md", "lg", "lg"]}
              fontFamily="Evogria Italic, san serif"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels h="full" minH="md" bg="#171717">
          {tabData.map((tab, index) => (
            <TabPanel
              // pt="40px"
              // pb="50px"
              p={0}
              key={index}
              px={{ base: "12px", "2xl": "100px" }}
            >
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export default StatsPage;

export const fetchValidatorProfit = async ({
  currentAccount,
  api,
  address,
}) => {
  if (currentAccount && api) {
    const {
      data: { free, reserved },
    } = await api.query.system.account(address || currentAccount?.address);

    const [chainDecimals] = await api.registry.chainDecimals;

    const formattedStrBal = formatBalance(free, {
      withSi: false,
      forceUnit: "-",
      chainDecimals,
    });
    const formattedStrBalReserved = formatBalance(reserved, {
      withSi: false,
      forceUnit: "-",
      chainDecimals,
    });

    const formattedNumBal =
      formattedStrBal?.replaceAll(",", "") * 1 +
      formattedStrBalReserved?.replaceAll(",", "") * 1;

    return { balance: formattedNumBal / 10 ** 18 };
  }
};
