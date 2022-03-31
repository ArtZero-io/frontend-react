import React, { useState } from "react";
import Layout from "@components/Layout/Layout";
import { useParams } from "react-router-dom";
import CollectionHero from "./component/CollectionHero";
import CollectionMain from "./component/CollectionMain";

const backdrop =
  "https://cdn-image.solanart.io/unsafe/1080x360/filters:format(webp)/www.datocms-assets.com/58930/1639537046-degenape.webp";

function CollectionPage() {
  const [collection] = useState(collectionData);
  const param = useParams();
  console.log("props.id", param.collectionAddress);

  return (
    <Layout backdrop={backdrop}>
      <CollectionHero {...collection} />
      <CollectionMain {...collection}/>
     </Layout>
  );
}

export default CollectionPage;

const collectionData = {
  id: "18",
  avatar:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fsolpunkspreview.webp&w=256&q=75",
  backdrop:
    "https://solanart.io/_next/image?url=https%3A%2F%2Fdata.solanart.io%2Fimg%2Fcollections%2Fdegods.webp&w=1920&q=75",
  description:
    "The Degenerate Ape Academy is an NFT brand housed on the Solana blockchain. The academy consists of 10,000 degenerate ape NFTs.",
  volume: "11.1b",
  name: "Degenerate Trash Pandas",
};
