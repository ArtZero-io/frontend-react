import React from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NFTTabInfo from "./MyNFTInfo";
import NFTTabOffers from "./MyNFTOffers";

function NFTTab({
  nft_detail,
  collection_detail,
  nft_contract_address,
  address,
  selectedNFT,
}) {
  const tabData = [
    {
      label: "NFT info",
      content: (
        <NFTTabInfo
          nft_detail={nft_detail}
          nft_contract_address={nft_contract_address}
          address={address}
          collection_detail={collection_detail}
          selectedNFT={selectedNFT}
        />
      ),
    },
    {
      label: "Offers",
      content: <NFTTabOffers selectedNFT={selectedNFT} />,
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

export default NFTTab;