import { Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { NFTCard } from "@components/NFTCard/NFTCard";
import NFTModal from "./NFTModal";
import AddNewNFTModal from "./AddNewNFTModal";
import { useParams } from "react-router-dom";
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import artzero_nft_calls from "../../../utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "../../../utils/substrate";
import { delay } from "../../../utils";
import artzero_nft from "../../../utils/blockchain/artzero-nft";

const CollectionNFT = () => {
  const [NFT, setNFTDataList] = useState([]);
  const [address, setAddress] = useState("default");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const [ , setIsOwnerCollection] = useState(false);
  const { currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded(), artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    await checkIsOwnerCollection();
    await loadListNFT();
    await delay(1000);
  };

  const checkIsOwnerCollection = async () => {
    let res = await collection_manager_calls.getCollectionOwner(
      currentAccount,
      param.collectionAddress
    );
    if (res == currentAccount.address) {
      setIsOwnerCollection(true);
    } else {
      setIsOwnerCollection(false);
    }
  };

  const loadListNFT = async () => {
    let NFTDataList = [
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
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        param.collectionAddress
      );
    setCurrentCollection(currentCollection);
    if (currentCollection.showOnChainMetadata) {
      console.log(currentCollection);
    } else {
      if (
        currentCollection.nftContractAddress == artzero_nft.CONTRACT_ADDRESS
      ) {
        console.log(currentCollection.nftContractAddress);
      }
    }
    setNFTDataList(NFTDataList);
  };

  return (
    <div>
      <NFTModal address={address} isOpen={isOpen} onClose={onClose} />
      <AddNewNFTModal
        collection={currentCollection}
        isOpen={isOpen}
        onClose={onClose}
      />

      {/* {isOwnerCollection ? ( */}
        <>
          <Button
            onClick={() => {
              onOpen();
            }}
          >
            Add New NFT
          </Button>
        </>
      {/* ) : (
        ""
      )} */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(min(100%, 250px), 1fr))"
        gap={6}
      >
        {NFT.map((item) => {
          return (
            <GridItem
              w="100%"
              h="100%"
              cursor="pointer"
              _hover={{ bg: "brand.blue" }}
              onClick={() => {
                setAddress(address);
                onOpen();
              }}
            >
              <NFTCard {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
};

export default CollectionNFT;
