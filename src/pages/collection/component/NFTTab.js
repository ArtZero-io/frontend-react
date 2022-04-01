import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "./NFTTabCollectible";
import NFTTabOffers from "./NFTTabOffers";

function NFTTab() {
  return (
    <Tabs isLazy align="left">
      <TabList>
        {tabData.map((tab, index) => (
          <Tab key={index} fontSize='md' fontFamily='Evogria Italic'>{tab.label}</Tab>
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

const tabData = [
  {
    label: "Collectible",
    content: <NFTTabCollectible />,
  },
  {
    label: "Offers",
    content: <NFTTabOffers />,
  },
];
