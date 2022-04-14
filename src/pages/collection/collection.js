import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import CollectionHero from "./component/Header/Header";
import CollectionMain from "./component/Main/Main";

import Layout from "@components/Layout/Layout";

import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "@utils/substrate";
import { IPFS_BASE_URL } from "@constants/index";
import { delay } from "@utils";

function CollectionPage(props) {
  const param = useParams();

  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);


  
  const [collection, setCollection] = useState({});


  
  useEffect(async () => {
    console.log('hehe call contract')
    await onRefresh();
  }, [activeAddress, currentAccount, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {

    
    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.address
    );


    
    let attributes = await collection_manager_calls.getAttributes(
      currentAccount,
      data?.nftContractAddress,
      ["name", "description", "avatar_image", "header_image"]
    );


    
    let res = {
      id: param.address,
      avatar: `${IPFS_BASE_URL}/${attributes[2]}`,
      backdrop: `${IPFS_BASE_URL}/${attributes[3]}`,
      volume: "11.1b",
      name: attributes[0],
      description: attributes[1],
    };

    setCollection(res);
  };

  return (
    <Layout backdrop={collection.backdrop}>
      <CollectionHero {...collection} />

      <CollectionMain />
    </Layout>
  );
}

export default CollectionPage;
