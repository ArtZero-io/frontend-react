import {
  Box,
  Button,
  Flex,
  Square,
  Input,
  Text,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import CollectionNFT from "./CollectionNFT";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
import { RepeatIcon } from "@chakra-ui/icons";
import AddNewNFTModal from "./Modal/AddNewNFT";

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
      <Flex align="center" py={4}>
        <Text px={2}  >
          123 items
        </Text>
        <Spacer />
        <AddNewNFTModal />
      </Flex>
      <CollectionNFT />
    </Box>
  );
}

export default RightPanel;

const options = ["Price: Oldest", "Price: Low to High", "Price: High to Low"];
