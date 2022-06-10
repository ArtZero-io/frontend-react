import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

import Layout from "@components/Layout/Layout";
import StatsHeader from "./component/Header/StatsHeader";
import TopCollectionsTab from "./Tab/TopCollectionsTab";
import PayoutHistoryTab from "./Tab/PayoutHistoryTab";

function StatsPage() {
  const tabData = [
    {
      label: "top nft collections",
      content: <TopCollectionsTab />,
    },
    {
      label: "payout history",
      content: <PayoutHistoryTab />,
    },
  ];

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <Layout>
      {
        <>
          <StatsHeader />

          <Tabs isLazy align="center" colorScheme="brand.blue">
            <TabList bg="#000" borderBottomColor="#000">
              {tabData.map((tab, index) => (
                <Tab
                  key={index}
                  fontStyle="italic"
                  px="0.5px"
                  pb="20px"
                  fontSize="lg"
                  mx="25px"
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>

            <TabPanels h="full" minH="md" bg="#171717">
              {tabData.map((tab, index) => (
                <TabPanel
                  px={{ base: "12px", "2xl": "100px" }}
                  pt="40px"
                  key={index}
                >
                  {tab.content}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </>
      }
    </Layout>
  );
}

export default StatsPage;
