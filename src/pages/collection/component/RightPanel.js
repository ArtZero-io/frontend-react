import { Box, Button, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import React from "react";
import CollectionNFT from "./CollectionNFT";
import { IoMdRefresh } from "react-icons/io";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { RiLayoutGridLine } from "react-icons/ri";
import { BsGrid3X3 } from "react-icons/bs";
// import { GrGrid } from "react-icons/gr";
function RightPanel() {
  return (
    <Box w="full" textAlign="left">
      <Flex>
        <Button variant="transparent" mx={2} h={14}>
          <IoMdRefresh />
        </Button>
        <Button variant="transparent" h={14}>
          Show unlisted
        </Button>
        <InputGroup
          mx="auto"
          maxW="container.md"
          w="full"
          bg="brand.grayDark"
          h={14}
          // py={1}
          borderRadius="0"
          color="white"
        >
          <Input
            variant="unstyled"
            my={1}
            pl={5}
            bg="brand.grayDark"
            placeholder="Search items, collections, and accounts"
            _placeholder={{
              fontSize: "lg",
              color: "white",
            }}
          />
        </InputGroup>
        <Dropdown />
        <Button
          variant="transparent"
          _hover={{ bg: "brand.grayDark" }}
          mx={2}
          h={14}
        >
          <RiLayoutGridLine h={14} w={14} />
        </Button>
        <Button variant="transparent" _hover={{ bg: "brand.grayDark" }} h={14}>
          <BsGrid3X3 h={14} w={14} />
        </Button>
      </Flex>
      <Text p={4}>123 items</Text>
      <CollectionNFT />
    </Box>
  );
}

export default RightPanel;
