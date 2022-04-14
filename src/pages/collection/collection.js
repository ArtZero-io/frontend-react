import React, { useEffect, useState } from "react";
import Layout from "@components/Layout/Layout";
import { useParams } from "react-router-dom";
import CollectionHero from "./component/Header/Header";
import CollectionMain from "./component/Main/Main";
import collection_manager_calls from "../../utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "../../utils/substrate";
import { delay } from "../../utils";
import { IPFS_BASE_URL } from "@constants/index";

function CollectionPage(props) {
  const { currentAccount } = useSubstrateState();
  const [collection, setCollection] = useState({});
  const param = useParams();
  console.log("CollectionPage collection", collection);

  useEffect(async () => {
    await onRefresh();
  }, [currentAccount, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {
    console.log("CollectionPage data...");

    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.address
    );
    console.log("CollectionPage data", data);
    let attributes = await collection_manager_calls.getAttributes(
      currentAccount,
      data?.nftContractAddress,
      ["name", "description", "avatar_image", "header_image"]
    );
    console.log("CollectionPage attributes", attributes);
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
