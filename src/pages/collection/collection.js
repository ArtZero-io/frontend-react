import React, { useEffect, useState } from "react";
import Layout from "@components/Layout/Layout";
import { useParams } from "react-router-dom";
import CollectionHero from "./component/CollectionHero";
import CollectionMain from "./component/CollectionMain";
import collection_manager_calls from "../../utils/blockchain/collection-manager-calls";
import { useSubstrateState } from "../../utils/substrate";
import { delay } from "../../utils";
import { IPFS_BASE_URL } from "@constants/index";

const backdrop =
  "https://cdn-image.solanart.io/unsafe/1080x360/filters:format(webp)/www.datocms-assets.com/58930/1639537046-degenape.webp";

function CollectionPage(props) {
  const { currentAccount } = useSubstrateState();
  const [collection, setCollectionData] = useState({});
  const param = useParams();

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await getCollectionData();
    await delay(1000);
  };

  const getCollectionData = async () => {
    let data = await collection_manager_calls.getCollectionByAddress(
      currentAccount,
      param.collectionAddress
    );
    let attributes = await collection_manager_calls.getAttributes(
      currentAccount,
      data.nftContractAddress,
      ["name", "description", "avatar_image", "header_image"]
    );
    let res = {
      id: param.collectionAddress,
      avatar: IPFS_BASE_URL + attributes[2],
      backdrop: IPFS_BASE_URL + attributes[3],
      volume: "11.1b",
      name: attributes[0],
      description: attributes[1],
    };
    setCollectionData(res);
  };

  return (
    <Layout backdrop={backdrop}>
      <CollectionHero {...collection} />
      <CollectionMain />
    </Layout>
  );
}

export default CollectionPage;
