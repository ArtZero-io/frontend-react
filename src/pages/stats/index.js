/* eslint-disable no-unused-vars */
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
const url =
  "https://api.coingecko.com/api/v3/simple/price?ids=aleph-zero&vs_currencies=usd";

function StatsPage() {
  const { currentAccount } = useSubstrateState();

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
      const platformTotalStakeholders =
        await staking_calls.getTotalCountOfStakeholders(
          currentAccount || getPublicCurrentAccount()
        );

      const currentProfit = await marketplace_contract_calls.getCurrentProfit(
        currentAccount || getPublicCurrentAccount()
      );
      const totalProfit = await marketplace_contract_calls.getTotalProfit(
        currentAccount || getPublicCurrentAccount()
      );

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
            title: "Next Payout",
            value: currentProfit,
            unit: "azero",
          },
          // {
          //   title: "Total Reward Share (platform)",
          //   value: totalProfit,
          //   unit: "azero",
          // },
          {
            title: "Total NFTs Staked",
            value: platformTotalStaked,
            unit: "NFTs",
          },
          // {
          //   title: "Total Stakeholders",
          //   value: platformTotalStakeholders,
          //   unit: "users",
          // },
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
