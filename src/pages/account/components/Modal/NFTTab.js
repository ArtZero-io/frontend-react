import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabInfo from "./NFTTabInfo";
import NFTTabOffers from "./NFTTabOffers";

function NFTTab({ address }) {
  const tabData = [
    {
      label: "NFT info",
      content: <NFTTabInfo address={address} />,
    },
    {
      label: "Offers",
      content: <NFTTabOffers address={address} />,
    },
  ];

  return (
    <Tabs isLazy align="left">
      <TabList>
        {tabData.map((tab, index) => (
          <Tab key={index} fontSize="md" fontFamily="Evogria Italic">
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabData.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default NFTTab;
