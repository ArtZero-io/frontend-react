import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabGeneral from "../components/TabGeneral";

function AccountTab() {
  return (
    <>
      <Tabs isLazy align="center">
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index} fontFamily="Evogria Italic, san serif">
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {tabData.map((tab, index) => (
            <TabPanel p={4} key={index}  bg="#171717">
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

export default AccountTab;

const tabData = [
  {
    label: "General",
    content: <TabGeneral />,
  },
  {
    label: "My Collections",
    content: "My Collections",
  },
  {
    label: "My NFT",
    content: "My NFT",
  },
  {
    label: "My Stakes",
    content: "My Stakes",
  },
];
