import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabCollectible from "./Collectible";
import NFTTabActivity from "./Activity";

function NFTDetailTab({ address }) {
  const tabData = [
    {
      label: "Collectible",
      content: <NFTTabCollectible address={address} />,
    },
    {
      label: "Activity",
      content: <NFTTabActivity address={address} />,
    },
  ];

  return (
    <Tabs isLazy align="left">
      <TabList bg="#171717">
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            ml={12}
            fontSize="md"
            fontFamily="Evogria Italic"
            minH="4.5rem"
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabData.map((tab, index) => (
          <TabPanel px={12} py={8} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default NFTDetailTab;
