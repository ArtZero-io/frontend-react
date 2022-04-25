import { Box, Grid } from "@chakra-ui/react";
import React, { Fragment } from "react";
import MyNFTCard from "../../../account/components/Card/MyNFT";

function NFTMintTab() {
  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Grid
        templateColumns="repeat(auto-fill, minmax(min(100%, 224px), 1fr))"
        gap={6}
        maxW="6xl-mid"
        mx="auto"
        mb={12}
      >
        {listNFT?.map((item, idx) => (
          <Fragment key={idx}>
            <MyNFTCard {...item} />
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}

export default NFTMintTab;

const listNFT = [
  {
    id: 1,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Degen Ape #1716",
    img: "https://ipfs.infura.io/ipfs/QmWu1iaRXKEwdxYAxjavTmaQDMBV2uuN5zFanqxYqef1MH",
    atts: [
      {
        name: "Background ",
        value: "Blue",
      },
      {
        name: "Fur / Skin",
        value: "Blue / Blue",
      },
      {
        name: "Head",
        value: "Fishing Hat",
      },
      {
        name: "Mouth",
        value: "Dirty Fiat",
      },
      {
        name: "Clothing",
        value: "Black T-Shirt",
      },
      {
        name: "generation",
        value: "1|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
  {
    id: 2,
    askPrice: "12.3",
    bidPrice: "12.3",
    name: "Aurorian #2190",
    img: "https://ipfs.infura.io/ipfs/QmaVzK6kPomPjfPf8ZL4XTz52XPi63pLLTfngjjVs5yRK4",
    atts: [
      {
        name: "Mouth",
        value: "None",
      },
      {
        name: "Clothing",
        value: "None",
      },
      {
        name: "Background",
        value: "Base Background",
      },
      {
        name: "Body color",
        value: "Human",
      },
      {
        name: "Clothes",
        value: "Jacket",
      },
      {
        name: "Neck",
        value: "Flowers",
      },
      {
        name: "Eye",
        value: "Glasses",
      },
      {
        name: "Headwear",
        value: "Had",
      },
      {
        name: "Hand",
        value: "Gun",
      },
      {
        name: "Generation",
        value: "5|5",
      },
    ],
    isListed: false,
    price: 0,
  },
];
