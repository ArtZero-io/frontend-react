import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { NFTCard } from "@components/Card/NFT";
import NFTDetailModal from "../Modal/NFTDetail";
import { useParams } from "react-router-dom";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import { useSubstrateState } from "@utils/substrate";
import { delay } from "@utils";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { ContractPromise } from "@polkadot/api-contract";
import axios from "axios";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import { numberToU8a, stringToHex } from "@polkadot/util";
import { IPFS_BASE_URL } from "@constants/index";

const NFTGrid = ({bigCard}) => {
  const [NFTList, setNFTList] = useState([]);
  const [address, setAddress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});
  // const [nft721Psp34StandardContract, setNft721Psp34StandardContract] = useState({});
  console.log('NFTList', NFTList)
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
        param.address
      );
    setCurrentCollection(currentCollection);
    if (currentCollection?.showOnChainMetadata) {
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.address
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const totalSupply = await nft721_psp34_standard_calls.getTotalSupply(
        currentAccount
      );
      for (let i = 1; i <= totalSupply; i++) {
        const tokenId = nft721_psp34_standard_contract.api.createType(
          "ContractsPsp34Id",
          { U8: numberToU8a(i) }
        );
        console.log(stringToHex("nft_name"));
        const tokenName = await nft721_psp34_standard_calls.getAttribute(
          currentAccount,
          tokenId,
          stringToHex("nft_name")
        );
        const tokenAvatar = await nft721_psp34_standard_calls.getAttribute(
          currentAccount,
          tokenId,
          stringToHex("avatar")
        );
        const nft = {
          id: i,
          askPrice: "12.3",
          bidPrice: "12.3",
          name: tokenName,
          img: `${IPFS_BASE_URL}/${tokenAvatar}`,
        };
        NFTDataList.push(nft);
        // const attribute_count = await nft721_psp34_standard_calls.getAttributeCount(currentAccount);
        // let attributes = [];
        // for (let j = 1; j <= attribute_count; j++) {
        //   const attribute_name = await nft721_psp34_standard_calls.getAttributeName(currentAccount, j);
        //   console.log(attribute_name);
        //   if (attribute_name && attribute_name != 'nft_name' && attribute_name != 'description' && attribute_name != 'avatar') {
        //     attributes.push(attribute_name);
        //   }
        // }
        // const tokenId = nft721_psp34_standard_contract.api.createType('ContractsPsp34Id', {'U8': numberToU8a(i)});
        // const attributeVals = await nft721_psp34_standard_calls.getAttributes(currentAccount, tokenId, attributes);
        // console.log(attributeVals);
      }
      setNFTList(NFTDataList);
    } else {
      if (
        currentCollection?.nftContractAddress === artzero_nft?.CONTRACT_ADDRESS
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
          axios
            .get(res)
            .then((response) => {
              if (response.status === 200) {
                const nft = {
                  id: i,
                  askPrice: "12.3",
                  bidPrice: "12.3",
                  name: response.data.name,
                  img: response.data.image,
                };
                NFTDataList.push(nft);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
    setNFTList(NFTDataList);
  };

  return (
    <div>
      {console.log('currentCollection',currentCollection)}
      <NFTDetailModal address={address} isOpen={isOpen} onClose={onClose} />
      <Grid
        templateColumns={`repeat(auto-fill, minmax(min(100%, ${bigCard ? '25rem' : '20rem'}), 1fr))`}
        gap={6}
      >
        {NFTList.map((item) => {
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

export default NFTGrid;
