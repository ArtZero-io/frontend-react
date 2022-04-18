import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NFTChangeSize from "@components/Card/NFTChangeSize";
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
import marketplace_contract_calls from "../../../../utils/blockchain/marketplace_contract_calls";
import { TypeRegistry, U64 } from "@polkadot/types";
import { useSelector } from "react-redux";

const NFTGrid = ({ bigCard }) => {
  const [NFTList, setNFTList] = useState([]);
  const [address, setAddress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});
  const { activeAddress } = useSelector((s) => s.account);

  console.log("NFTList", NFTList);
  useEffect(async () => {
    await onRefresh();
  }, [activeAddress, collection_manager_calls.isLoaded(), artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    await loadListNFT();
    await delay(1000);
  };

  const loadListNFT = async () => {
    console.log('NFTGrid:loadListNFT()_param.address', param.address);
    let NFTDataList = [];
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        activeAddress,
        param.address
      );

    console.log('NFTGrid:loadListNFT()_activeAddress', activeAddress);
    setCurrentCollection(currentCollection);

    if (currentCollection?.showOnChainMetadata) {
      
      const nft721_psp34_standard_contract = new ContractPromise(
        api,
        nft721_psp34_standard.CONTRACT_ABI,
        param.address
      );
      nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
      const totalSupply = await nft721_psp34_standard_calls.getTotalSupply(
        activeAddress
      );
      console.log('NFTGrid:loadListNFT()_totalSupply', totalSupply);
      console.log(totalSupply);
      for (let i = 1; i <= totalSupply; i++) {
        const tokenId = nft721_psp34_standard_contract.api.createType(
          "ContractsPsp34Id",
          { U64: numberToU8a(i) }

        );
        console.log('NFTGrid:loadListNFT()_nft721_psp34_standard_contract', nft721_psp34_standard_contract);
        console.log('NFTGrid:loadListNFT()_nft721_psp34_standard_calls', nft721_psp34_standard_calls);
        const tokenName = await nft721_psp34_standard_calls.getAttribute(
          activeAddress,
          tokenId,
          stringToHex("nft_name")
        );
        console.log('NFTGrid:loadListNFT()_tokenName', tokenName);
        const tokenAvatar = await nft721_psp34_standard_calls.getAttribute(
          activeAddress,
          tokenId,
          stringToHex("avatar")
        );
        console.log('NFTGrid:loadListNFT()_tokenAvatar', tokenAvatar);
        const tokenIdU64 = nft721_psp34_standard_contract.api.createType(
          "ContractsPsp34Id",
          { U64: new U64(new TypeRegistry(), i) }
        );
        const nftSaleInfo = await marketplace_contract_calls.getNftSaleInfo(
          activeAddress,
          param.address,
          tokenIdU64
        );
        // if (nftSaleInfo?.isForSale) {
          const nft = {
            id: i,
            askPrice: nftSaleInfo?.price,
            bidPrice: "12.3",
            name: tokenName,
            img: `${IPFS_BASE_URL}/${tokenAvatar}`,
          };
          NFTDataList.push(nft);
        // }

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
      {console.log("currentCollection", currentCollection)}
      <NFTDetailModal address={address} isOpen={isOpen} onClose={onClose} />
      <Grid
        templateColumns={`repeat(auto-fill, minmax(min(100%, ${
          bigCard ? "25rem" : "20rem"
        }), 1fr))`}
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
              <NFTChangeSize {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
};

export default NFTGrid;
