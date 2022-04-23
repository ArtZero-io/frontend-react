import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";

import CollectionNFTGrid from "./NFTGrid";
import AddNewNFTModal from "./Modal/AddNewNFT";

import Dropdown from "@components/Dropdown/Dropdown";
import RefreshIcon from "@theme/assets/icon/Refresh.js";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";

const CollectionItems = ({
  nftTotalCount,
  nftList,
  collectionOwner,
  contractType,
  setIsShowUnlisted,
  isShowUnlisted,
  forceUpdate,
}) => {
  const { currentAccount } = useSubstrateState();

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
          onClick={() => forceUpdate()}
        />
        <Button
          mx={1.5}
          variant="outline"
          minW={"11rem"}
          onClick={() => setIsShowUnlisted(!isShowUnlisted)}
        >
          {isShowUnlisted ? "Show all" : "Show unlisted"}
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

      <Flex align="center" py={4} minH={24}>
        <Text px={2}>{nftTotalCount || 0} items</Text>

        <Spacer />

        {currentAccount?.address === collectionOwner && contractType === 2 ? (
          <AddNewNFTModal
            collectionOwner={collectionOwner}
            forceUpdate={forceUpdate}
          />
        ) : null}
      </Flex>
          {console.log(nftList)}
      <CollectionNFTGrid bigCard={bigCard} nftList={nftList} />
    </Box>
  );
};

export default CollectionItems;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
