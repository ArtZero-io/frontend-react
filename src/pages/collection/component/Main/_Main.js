import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabActivity from "./TabActivity";
import TabCollectionItems from "./TabItems";

function CollectionMain() {
  const tabData = [
    {
      label: "Items",
      content: <TabCollectionItems />,
    },
    {
      label: "Activity",
      content: <TabActivity />,
    },
  ];

  return (
    <>
      <Tabs isLazy align="center">
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabData.map((tab, index) => (
            <TabPanel pt={4} px={24} bg="#171717" key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CollectionMain;
