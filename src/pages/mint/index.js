import {
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Heading,
  Center,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Layout from "@components/Layout/Layout";

import MintHeader from "./components/Header";
import NFTMintTab from "./components/Tab/NFTMint";

import { delay } from "@utils";
import { clientAPI } from "@api/client";
import { AccountActionTypes } from "@store/types/account.types";

import { useSubstrateState } from "@utils/substrate";
import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import AnimationLoader from "@components/Loader/AnimationLoader";

const MintPage = () => {
  const { currentAccount, keyringState } = useSubstrateState();
  const [myAZNFTs, setMyAZNFTs] = useState(null);
  const [, setOwner] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingTime, setLoadingTime] = useState(null);

  const dispatch = useDispatch();

  const { addNftTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );

  useEffect(() => {
    const forceUpdateAfterMint = async () => {
      if (addNftTnxStatus?.status !== "End") {
        return;
      }

      const { status, timeStamp, endTimeStamp } = addNftTnxStatus;

      if (status && timeStamp && endTimeStamp) {
        const diffTime = 9000 - Number(endTimeStamp - timeStamp);
        const delayTime = diffTime >= 0 ? diffTime : 500;

        setLoading(true);

        setLoadingTime(delayTime / 1000);

        await delay(delayTime).then(() => {
          dispatch({
            type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
          });
          setLoadingTime(null);
          setLoading(false);
        });
      }
    };

    forceUpdateAfterMint();
  }, [addNftTnxStatus, addNftTnxStatus?.status, dispatch, loadingTime]);

  useEffect(() => {
    const fetchMyAZNFTs = async () => {
      setLoading(true);

      let tokenUri = await artzero_nft_calls.tokenUri(
        currentAccount?.address,
        1
      );
      tokenUri = tokenUri?.replace("1.json", "");

      const options = {
        collection_address: artzero_nft.CONTRACT_ADDRESS,
        owner: currentAccount?.address,
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
            dataList[i].tokenID?.toString() +
            ".json",
          {}
        );

        var obj = {
          is_for_sale: dataList[i].is_for_sale,
          price: dataList[i].price,
          avatar: metadata.image,
          nftName: metadata.name,
          stakeStatus: 0,
          isBid: false,
        };
        myNFTs.push(obj);
      }

      setLoading(false);
      setLoadingTime(null);
      setOwner(currentAccount?.address);
      return setMyAZNFTs(myNFTs);
    };

    !loadingTime && fetchMyAZNFTs();
  }, [currentAccount?.address, loadingTime]);

  return (
    <Layout>
      <Box
        as="section"
        h="full"
        // maxW="container.3xl"
        position="relative"
        mx="auto"
      >
        <MintHeader loading={loading} />

        <Tabs isLazy align="center" colorScheme="brand.blue">
          <TabList bg="#000" borderBottomColor="#000">
            <Tab px="0.5px" pb="20px" fontSize="lg" fontStyle="italic">
              my artzero nfts
            </Tab>
          </TabList>
          {keyringState === "READY" ? (
            <TabPanels h="full" minH="xs" bg="#171717">
              <TabPanel
                pt={4}
                px={{ base: 2, "2xl": 24 }}
                bg="#171717"
                h="full"
                minH="600px"
              >
                {loading ? (
                  <Center h="full">
                    <AnimationLoader />
                  </Center>
                ) : (
                  <NFTMintTab myAZNFTs={myAZNFTs} />
                )}
              </TabPanel>
            </TabPanels>
          ) : (
            <TabPanels h="full" minH="xs" bg="#171717">
              <TabPanel
                pt={4}
                px={{ base: 2, "2xl": 24 }}
                h="full"
                bg="#171717"
              >
                <Center h="full">
                  <Heading size="h6" my={10}>
                    Please connect wallet to view your ArtZero NFTs.
                  </Heading>
                </Center>
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Box>
    </Layout>
  );
};
export default MintPage;
