import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { NFTCard } from "@components/NFTCard/NFTCard";
import NFTModal from "./NFTModal";
import { useParams } from "react-router-dom";
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import artzero_nft_calls from "../../../utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "../../../utils/substrate";
import { delay } from "../../../utils";
import artzero_nft from "../../../utils/blockchain/artzero-nft";
import { ContractPromise } from "@polkadot/api-contract";
import axios from 'axios';
import nft721_psp34_standard from "../../../utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "../../../utils/blockchain/nft721-psp34-standard-calls";
import { numberToU8a } from "@polkadot/util";

const CollectionNFT = () => {
  const [NFT, setNFTDataList] = useState([]);
  const [address, setAddress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});
  // const [nft721Psp34StandardContract, setNft721Psp34StandardContract] = useState({});

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded(), artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    await loadListNFT();
    await delay(1000);
  };

  const loadListNFT = async () => {
    let NFTDataList = [];
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        param.collectionAddress
      );
    setCurrentCollection(currentCollection);
    if (currentCollection.showOnChainMetadata) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.collectionAddress
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const totalSupply = await nft721_psp34_standard_calls.getTotalSupply(currentAccount);
      for (let i = 1; i <= totalSupply; i++) {
        const attribute_count = await nft721_psp34_standard_calls.getAttributeCount(currentAccount);
        let attributes = [];
        for (let j = 1; j <= attribute_count; j++) {
          const attribute_name = await nft721_psp34_standard_calls.getAttributeName(currentAccount, j);
          console.log(attribute_name);
          if (attribute_name) {
            attributes.push(attribute_name);
          }
        }
        const tokenId = nft721_psp34_standard_contract.api.createType('ContractsPsp34Id', {'U8': numberToU8a(i)});
        const attributeVals = await nft721_psp34_standard_calls.getAttributes(currentAccount, tokenId, attributes);
        console.log(attributeVals);
      }
    } else {
      if (
        currentCollection.nftContractAddress == artzero_nft.CONTRACT_ADDRESS
      ) {
        if (!artzero_nft_calls.isLoaded()) {
          const artzero_nft_contract = new ContractPromise(
              api,
              artzero_nft.CONTRACT_ABI,
              artzero_nft.CONTRACT_ADDRESS
            );
            artzero_nft_calls.setContract(artzero_nft_contract);
        }

        //TODO: handle again total supply, add pagination
        const totalSupply = 10;
        for (let i = 1; i <= totalSupply - 7; i++) {
          const res = await artzero_nft_calls.tokenUri(currentAccount, i);
          axios.get(res)
            .then(response => {
                if (response.status === 200) {
                  const nft = {
                    id: i,
                    askPrice: "12.3",
                    bidPrice: "12.3",
                    name: response.data.name,
                    img: response.data.image
                  };
                  NFTDataList.push(nft);
                }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
    setNFTDataList(NFTDataList);
  };

  return (
    <div>
      {console.log(currentCollection)}
      <NFTModal address={address} isOpen={isOpen} onClose={onClose} />
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
                setAddress(item.id);
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
