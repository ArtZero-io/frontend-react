/* eslint-disable no-unused-vars */
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NFTChangeSize from "@components/Card/NFTChangeSize";
import NFTDetailModal from "./Modal/NFTDetail";
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
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { TypeRegistry, U64 } from "@polkadot/types";
import { useSelector } from "react-redux";

const NFTGrid = ({ bigCard, nftList }) => {
  const [NFTList, setNFTList] = useState([]);
  const [address, setAddress] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const { api, currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});
  const { activeAddress } = useSelector((s) => s.account);

  const [selectedNft, setSelectedNft] = useState(null);

  function handleOnClick(item) {
    setSelectedNft(item);
    onOpen();
  }

  return (
    <div>
      <NFTDetailModal
        selectedNft={selectedNft}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Grid
        templateColumns={`repeat(auto-fill, minmax(min(100%, ${
          bigCard ? "25rem" : "20rem"
        }), 1fr))`}
        gap={6}
      >
        {nftList?.map((item) => {
          return (
            <GridItem
              w="100%"
              h="100%"
              cursor="pointer"
              _hover={{ bg: "brand.blue" }}
              onClick={() => handleOnClick(item)}
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
