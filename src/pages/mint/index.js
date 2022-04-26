import { Box, Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";

import MintHeader from "@pages/mint/components/Header";

import Layout from "@components/Layout/Layout";
import NFTMintTab from "./components/Tab/NFTMint";

import { useSubstrateState } from "@utils/substrate";
import { useEffect, useState } from "react";
import { clientAPI } from "@api/client";
import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useDispatch, useSelector } from "react-redux";

import { AccountActionTypes } from "@store/types/account.types";
import toast from "react-hot-toast";
import { delay } from "../../utils";
import Loader from "@components/Loader/Loader";
const MintPage = () => {
  const { currentAccount } = useSubstrateState();
  const [myAZNFTs, setMyAZNFTs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();

  const { tnxStatus } = useSelector((state) => state.account.accountLoaders);

  useEffect(() => {
    const forceUpdateAfterMint = async () => {
      if (tnxStatus?.status === "Finalized") {
        dispatch({
          type: AccountActionTypes.SET_TNX_STATUS,
          payload: null,
        });

        setLoading(true);
        toast.promise(
          delay(10000).then(() => {
            setMyAZNFTs(null);
            setLoading(false);
          }),
          {
            loading: "Loading new data...",
            success: `Done!`,
            error: "Could not load data.",
          }
        );
      }
    };

    forceUpdateAfterMint();
  }, [tnxStatus, dispatch]);

  useEffect(() => {
    const fetchMyAZNFTs = async () => {
      let tokenUri = await artzero_nft_calls.tokenUri(
        currentAccount.address,
        1
      );
      tokenUri = tokenUri.replace("1.json", "");

      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        owner: currentAccount.address,
        limit: 10000,
        offset: 0,
        sort: -1,
      };

      const dataList = await clientAPI(
        "post",
        "/getNFTsByOwnerAndCollection",
        options
      );

      const length = dataList.length;
      let myNFTs = [];
      for (var i = 0; i < length; i++) {
        //get the off-chain metadata
        const metadata = await clientAPI(
          "get",
          "/getJSON?input=" +
            tokenUri +
            dataList[i].tokenID.toString() +
            ".json",
          {}
        );
        //console.log(tokenUri + (i+1).toString() + ".json",metadata);

        var obj = {
          is_for_sale: dataList[i].is_for_sale,
          price: dataList[i].price,
          avatar: metadata.image.replace("ipfs://", ""),
          nftName: metadata.name,
          isStaked: false,
          isBid: false,
        };
        myNFTs.push(obj);
      }
      setMyAZNFTs(myNFTs);
      setOwner(currentAccount.address);

      console.log(myNFTs);
    };

    (myAZNFTs === null || owner !== currentAccount.address) && fetchMyAZNFTs();
  }, [currentAccount, myAZNFTs, owner]);

  return (
    <Layout>
      <Box as="section" maxW="container.3xl" position="relative">
        <MintHeader setMyAZNFTs={setMyAZNFTs} />

        <Tabs isLazy align="center">
          <TabList>
            <Tab>My Artzero Nfts</Tab>
            {/* {tabData.map((tab) => (
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
            ))} */}
          </TabList>
          <TabPanels bg="#171717">
            {loading ? (
              <Loader />
            ) : (
              <TabPanel px={12} py={8}>
                <NFTMintTab myAZNFTs={myAZNFTs} />
              </TabPanel>
            )}

            {/* {tabData.map((tab, index) => (
              <TabPanel px={12} py={8} key={index}>
                {tab.content}
              </TabPanel>
            ))} */}
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};
export default MintPage;

// const tabData = [
//   {
//     label: "My Artzero Nfts",
//     content: <NFTMintTab myAZNFTs={myAZNFTs} />,
//   },
//   {
//     label: "Minting history",
//     content: <MintHistoryTab />,
//   },
// ];
