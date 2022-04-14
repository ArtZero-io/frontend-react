import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabActivity from "./TabActivity";
import CollectionItems from "./Items";

function CollectionMain() {
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

const tabData = [
  {
    label: "items",
    content: <CollectionItems />,
  },
  {
    label: "activity",
    content: <TabActivity />,
  },
];