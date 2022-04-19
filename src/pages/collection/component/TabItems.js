import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import CollectionNFTGrid from "./NFTGrid";
import Dropdown from "@components/Dropdown/Dropdown";
import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import AddNewNFTModal from "./Modal/AddNewNFT";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useParams } from "react-router-dom";
import { delay } from "@utils";
import React, { useState, useEffect, useCallback } from "react";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { useSelector } from "react-redux";

const CollectionItems = ({nftTotalCount, nftList}) => {
  const param = useParams();
  const { activeAddress } = useSelector((s) => s.account);
  const [isOwnerCollection, setIsOwnerCollection] = useState(false);
  const [currentCollection, setCurrentCollection] = useState({});

  useEffect(async () => {
    await onRefresh();
  }, [activeAddress, collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    console.log(activeAddress);
    await checkIsOwnerCollection();
    await delay(1000);
    await loadCurrentCollection();
  };

  const checkIsOwnerCollection = async () => {
    let res = await collection_manager_calls.getCollectionOwner(
      activeAddress,
      param.address
    );
    console.log(res);

    if (res === activeAddress) {
      setIsOwnerCollection(true);
    } else {
      setIsOwnerCollection(false);
    }
  };

  const loadCurrentCollection = async () => {
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        activeAddress,
        param.address
      );

    setCurrentCollection(currentCollection);
  };

  const forceUpdate = useCallback(() => {
    onRefresh();
  }, []);

  const [bigCard, setBigCard] = useState(false);

  return (
    <Box w="full" textAlign="left" minH={"54rem"}>
      <Flex w="full">
        <IconButton
          aria-label="download"
          icon={<RefreshIcon fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
          onClick={() => onRefresh()}
        />
        <Button mx={1.5} variant="outline">
          Show unlisted
        </Button>

        <Input
          ml={1.5}
          mr={3}
          placeholder="Search items, collections, and accounts"
        />

        <Dropdown mx={1.5} options={options} defaultItem={options[0]} />

        <IconButton
          aria-label="download"
          icon={<RiLayoutGridLine fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mr={1.5}
          ml={3}
          onClick={() => setBigCard(true)}
        />
        <IconButton
          aria-label="download"
          icon={<BsGrid3X3 fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
          onClick={() => setBigCard(false)}
        />
      </Flex>

      <Flex align="center" py={4} minH={20}>
        <Text px={2}>{nftTotalCount} items</Text>
        <Spacer />

        {isOwnerCollection && currentCollection.contractType === "2" ? (
          <AddNewNFTModal forceUpdate={forceUpdate} />
        ) : null}
      </Flex>

      <CollectionNFTGrid bigCard={bigCard} nftList={nftList}/>
    </Box>
  );
};

export default CollectionItems;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
