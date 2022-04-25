/* eslint-disable no-unused-vars */
import { Box, Grid, Button } from "@chakra-ui/react";
import React, { Fragment } from "react";
import MyNFTCard from "../../../account/components/Card/MyNFT";
import { useSubstrateState } from "@utils/substrate";
import { useEffect, useState } from "react";
import { clientAPI } from "@api/client";
import artzero_nft from "@utils/blockchain/artzero-nft";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";

function NFTMintTab() {
  const { currentAccount } = useSubstrateState();
  const [myAZNFTs, setMyAZNFTs] = useState([]);

  useEffect(() => {
    get_my_AZ_NFTs();
  }, [currentAccount.address]);
  const get_my_AZ_NFTs = async () =>{

    let tokenUri = await artzero_nft_calls.tokenUri(currentAccount.address,1);
    tokenUri = tokenUri.replace("1.json","");
    //console.log('tokenUri',tokenUri);
    const options = {
      collection_address: artzero_nft.CONTRACT_ADDRESS,
      owner: currentAccount.address,
      limit: 10000,
      offset: 0,
      sort: -1,
    };

    const dataList = await clientAPI("post", "/getNFTsByOwnerAndCollection", options);
    console.log(dataList);
    const length = dataList.length;
    let myNFTs = [];
    for (var i=0;i<length;i++){
      //get the off-chain metadata
      const metadata = await clientAPI("get", "/getJSON?input="+tokenUri + (dataList[i].tokenID).toString() + ".json",{});
      //console.log(tokenUri + (i+1).toString() + ".json",metadata);

      var obj = {
        is_for_sale:dataList[i].is_for_sale,
        price:dataList[i].price,
        avatar:metadata.image.replace("ipfs://",""),
        nftName:metadata.name,
        isStaked:false,
        isBid:false,
      }
      myNFTs.push(obj);
    }
    setMyAZNFTs(myNFTs);

    console.log(myNFTs);
  }

  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Button
        variant="solid"
        onClick={() => get_my_AZ_NFTs()}
      >
        Refresh
      </Button>
      <Grid
        templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
        gap={6}
        maxW="6xl-mid"
        mx="auto"
        mb={12}
      >

        {myAZNFTs?.map((item, idx) => (
          <Fragment key={idx}>
            <MyNFTCard {...item} />
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}

export default NFTMintTab;
