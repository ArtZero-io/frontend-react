import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabGeneral from "./TabGeneral";
import TabMyCollections from "./TabMyCollections";
import TabMyNFT from "./TabMyNFT";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AccountTab() {
  const history = useHistory();
  console.log("history", history);
  const location = useLocation();
  return (
    <>
      <Tabs isLazy align="center" value={location.pathname}>
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={tab.label} fontFamily="Evogria Italic, san serif">
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>{}</TabPanel>
          {/* {tabData.map((tab, index) => (
            <TabPanel p={4} key={index} bg="#171717">
              {tab.content}
            </TabPanel>
          ))} */}
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
    content: <TabMyCollections />,
  },
  {
    label: "My NFT",
    content: <TabMyNFT />,
  },
  {
    label: "My Stakes",
    content: "My Stakes",
  },
];
