import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabActivity from "./TabActivity";
import TabItems from "./TabItems";
 

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
            <TabPanel p={4} key={index}>
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
    content: <TabItems />,
  },
  {
    label: "activity",
    content: <TabActivity />,
  },
];
