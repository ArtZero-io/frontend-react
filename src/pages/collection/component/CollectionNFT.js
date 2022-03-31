import { Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { NFTCard } from "../../../components/NFTCard/NFTCard";

function CollectionNFT() {
  const [NFT] = useState(NFTDataList);

  return (
    <div>
      <Grid
        templateColumns="repeat(auto-fill, minmax(min(100%, 250px), 1fr))"
        gap={6}
      >
        {NFT.map((item) => {
          return (
            <GridItem w="100%" h="100%" _hover={{ bg: "brand.blue" }}>
              <NFTCard {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}

export default CollectionNFT;
const NFTDataList = [
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",

    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
  {
    id: "18",
    img: "https://cdn-image.solanart.io/unsafe/600x600/filters:format(webp)/arweave.net/RlVE3yH-p4YPw2wpQxcgGDRzm91bNKbRsHrtG8rGgSU",
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degenerate ape #4262",
  },
];
