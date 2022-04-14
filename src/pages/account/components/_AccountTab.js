import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TabGeneral from "./TabGeneral";
import TabMyCollections from "./TabMyCollections";
import TabMyNFT from "./TabMyNFT";
import { useLocation } from "react-router-dom";


function AccountTab() {

  
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
