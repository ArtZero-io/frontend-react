import { Box, Button, Flex, Square, Input, Text } from "@chakra-ui/react";
import React from "react";
import CollectionNFT from "./CollectionNFT";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import { RepeatIcon } from "@chakra-ui/icons";
 import NFTModal from "./NFTModal";

function RightPanel() {
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

      <Text px={2} py={4}>
        123 items
      </Text>
      <NFTModal/>

      <CollectionNFT />
    </Box>
  );
}

export default RightPanel;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
