import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Spacer,
  IconButton,
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
  const [isOwnerCollection, setIsOwnerCollection] = useState(false);
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
  };

  return (
    <Box w="full" textAlign="left">
      <Flex w="full">
        <IconButton
          aria-label="download"
          icon={<RepeatIcon fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1}
        />
        <Button variant="outline">Show unlisted</Button>

        <Input placeholder="Search items, collections, and accounts" />

        <Dropdown options={options} defaultItem={options[0]} />
        <IconButton
          aria-label="download"
          icon={<RiLayoutGridLine fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1}
        />
        <IconButton
          aria-label="download"
          icon={<BsGrid3X3 fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1}
        />
      </Flex>
      <Flex align="center" py={4}>
        <Text px={2}>123 items</Text>
        <Spacer />
        {/* // Comment when done */}
        <AddNewNFTModal />
        {/* // Comment when done */}
        {isOwnerCollection && currentCollection.contractType === 2 ? (
          <AddNewNFTModal />
        ) : (
          ""
        )}
      </Flex>
      <CollectionNFT />
    </Box>
  );
};

export default RightPanel;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
