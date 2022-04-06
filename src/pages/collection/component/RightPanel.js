import {
  Box,
  Button,
  Flex,
  Square,
  Input,
  Text,
  Spacer,
} from "@chakra-ui/react";
import CollectionNFT from "./CollectionNFT";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import { RepeatIcon } from "@chakra-ui/icons";
import AddNewNFTModal from "./Modal/AddNewNFT";
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import { useParams } from "react-router-dom";
import { useSubstrateState } from "../../../utils/substrate";
import { delay } from "../../../utils";
import React, { useState, useEffect } from "react";

const RightPanel = () => {

  const param = useParams();
  const [ isOwnerCollection, setIsOwnerCollection] = useState(false);
  const { currentAccount } = useSubstrateState();
  const [currentCollection, setCurrentCollection] = useState({});

  useEffect(async () => {
    await onRefresh();
  }, [collection_manager_calls.isLoaded()]);

  const onRefresh = async () => {
    await checkIsOwnerCollection();
    await delay(1000);
    await loadCurrentCollection();
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

  const loadCurrentCollection = async () => {
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        param.collectionAddress
      );
      setCurrentCollection(currentCollection);
  }

  return (
    <Box w="full" textAlign="left">
      <Flex w="full">
        <Button variant="icon">
          <Square size="3.125rem">
            <RepeatIcon />
          </Square>
        </Button>

        <Button variant="outline">Show unlisted</Button>

        <Input placeholder="Search items, collections, and accounts" />

        <Dropdown options={options} defaultItem={options[0]} />

        <Button variant="icon">
          <Square size="3.125rem">
            <RiLayoutGridLine />
          </Square>
        </Button>

        <Button variant="icon">
          <Square size="3.125rem">
            <BsGrid3X3 />
          </Square>
        </Button>
      </Flex>
      <Flex align="center" py={4}>
        <Text px={2}  >
          123 items
        </Text>
        <Spacer />
        {(isOwnerCollection && currentCollection.contractType == 2) ? <AddNewNFTModal /> : ''}
      </Flex>
      <CollectionNFT />
    </Box>
  );
}

export default RightPanel;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
