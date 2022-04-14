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
import AddNewNFTModal from "./Modal/AddNewNFT";
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import { useParams } from "react-router-dom";
import { useSubstrateState } from "../../../utils/substrate";
import { delay } from "../../../utils";
import React, { useState, useEffect, useCallback } from "react";
import RefreshIcon from "@theme/assets/icon/Refresh.js";

const CollectionItem = () => {
  const param = useParams();
  const { currentAccount } = useSubstrateState();

  const [isOwnerCollection, setIsOwnerCollection] = useState(false);
  const [currentCollection, setCurrentCollection] = useState({});
  console.log("isOwnerCollection", isOwnerCollection);

  console.log("param", param);
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
      param.address
    );
    console.log("res", res);
    if (res === currentAccount.address) {
      setIsOwnerCollection(true);
    } else {
      setIsOwnerCollection(false);
    }
  };

  const loadCurrentCollection = async () => {
    let currentCollection =
      await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        param.address
      );

    console.log("currentCollection", currentCollection);
    setCurrentCollection(currentCollection);
  };

  const forceUpdate = useCallback(() => {
    console.log("forceUpdate...");

    onRefresh();
  }, []);

  return (
    <Box w="full" textAlign="left" minH={"54rem"}>
      <Flex w="full">
        <IconButton
          aria-label="download"
          icon={<RefreshIcon fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
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
        />
        <IconButton
          aria-label="download"
          icon={<BsGrid3X3 fontSize="1.5rem" />}
          size="icon"
          variant="iconSolid"
          mx={1.5}
        />
      </Flex>
      <Flex align="center" py={4}>
        <Text px={2}>123 items</Text>
        <Spacer />

        {isOwnerCollection && currentCollection.contractType === "2" ? (
          <AddNewNFTModal forceUpdate={forceUpdate}/>
        ) : null}
      </Flex>
      <CollectionNFT />
    </Box>
  );
};

export default CollectionItem;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
