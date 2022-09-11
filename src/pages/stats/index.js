import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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

const url =
  "https://api.coingecko.com/api/v3/simple/price?ids=aleph-zero&vs_currencies=usd";

function StatsPage() {
  const { currentAccount, api } = useSubstrateState();

  const [platformStatistics, setPlatformStatistics] = useState(null);
  const [topCollections, setTopCollections] = useState(null);
  const [azeroPrice, setAzeroPrice] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const prepareStats = async () => {
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((res) => setAzeroPrice(res["aleph-zero"]?.usd));

      const platformTotalStaked = await staking_calls.getTotalStaked(
        currentAccount || getPublicCurrentAccount()
      );
      // const platformTotalStakeholders =
      //   await staking_calls.getTotalCountOfStakeholders(
      //     currentAccount || getPublicCurrentAccount()
      //   );

      // TODO: get total Payouts
      const data = await APICall.getAllRewardPayout({
        limit: 1000,
        offset: 0,
        sort: -1,
      });

      const totalPayouts = data.reduce((acc, curr) => {
        return acc + curr.rewardAmount;
      }, 0);

      const currentProfit = await marketplace_contract_calls.getCurrentProfit(
        currentAccount || getPublicCurrentAccount()
      );

      const launchpadBalance = await fetchUserBalance({
        currentAccount: currentAccount || getPublicCurrentAccount(),
        api,
        address: launchpad_manager?.CONTRACT_ADDRESS,
      });

      const collectionBalance = await fetchUserBalance({
        currentAccount: currentAccount || getPublicCurrentAccount(),
        api,
        address: collection_manager?.CONTRACT_ADDRESS,
      });

      // console.log("PF profit before %---------------");
      // console.log("PF currentProfitMP", currentProfit);
      // console.log("PF collectionBal", collectionBalance?.balance);
      // console.log("PF launchpadBal", launchpadBalance?.balance);

      const totalVolume = await marketplace_contract_calls.getTotalVolume(
        currentAccount || getPublicCurrentAccount()
      );

      const totalProfit =
        currentProfit + launchpadBalance?.balance + collectionBalance?.balance;
      // console.log("PF totalProfit", totalProfit);
      // console.log("PF totalProfit 30%", totalProfit * 0.3);
      // console.log("PF profit End %---------------");

      const dataList = await APICall.getCollectionByVolume({ limit: 5 });

      const dataListWithFP = await Promise.all(
        dataList.map(async (item, index) => {
          const [data] = await APICall.getCollectionFloorPrice({
            collection_address: item.nftContractAddress,
          });

          return {
            ...item,
            order: index + 1,
            floorPrice: data?.price / 10 ** 12 || 0,
          };
        })
      );

      setIsLoading(false);

      const ret = {
        platformStatistics: [
          {
            title: "Total Payout",
            value: totalPayouts.toFixed(2),
            unit: "azero",
          },
          {
            title: "Total Marketplace Vol",
            value: totalVolume.toFixed(2),
            unit: "azero",
          },
          {
            title: "Next Payout",
            value: (totalProfit * 0.3).toFixed(2),
            unit: "azero",
          },
          {
            title: "Total NFTs Staked",
            value: platformTotalStaked,
            unit: "NFTs",
          },
        ],
        topCollections: dataListWithFP,
      };

      return ret;
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (!platformStatistics || !topCollections) {
      setIsLoading(true);
      prepareStats().then((data) => {
        setPlatformStatistics(data.platformStatistics);
        setTopCollections(data.topCollections);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    prepareStats().then((data) => {
      setPlatformStatistics(data.platformStatistics);
      setTopCollections(data.topCollections);
    });
  }, 5000);

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
