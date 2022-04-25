import { Box, Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";
// import { useSubstrateState } from "@utils/substrate";

// import Loader from "@components/Loader/Loader";
import Layout from "@components/Layout/Layout";
import MintHeader from "@pages/mint/components/Header";

import NFTMintTab from "./components/Tab/NFTMint";
//import MintHistoryTab from "./components/Tab/History";

const MintPage = () => {
  //  const { currentAccount, keyringState, apiState } = useSubstrateState();
  // const { activeAddress } = useSelector((s) => s.account);
  // const { profileContract } = useSubstrateState();

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" position="relative">
        <MintHeader />

        <Tabs isLazy align="center">
          <TabList>
            {tabData.map((tab) => (
              <Tab
                key={tab.label}
                fontFamily="Evogria Italic, san serif"
                color="#fff"
                pb={5}
                px={1}
                mx={4}
                fontSize="lg"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <TabPanels bg="#171717">
            {tabData.map((tab, index) => (
              <TabPanel px={12} py={8} key={index}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};
export default MintPage;

const tabData = [
  {
    label: "My Artzero Nfts",
    content: <NFTMintTab />,
  },
  // {
  //   label: "Minting history",
  //   content: <MintHistoryTab />,
  // },
];
