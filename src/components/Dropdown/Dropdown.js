import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Dropdown({ options = [], defaultItem = "" }) {
  const [selectedItem, setSelectedItem] = useState(defaultItem);

  return (
    <Box color="brand.blue" height="100%">
      <Menu autoSelect={false} placement="bottom-end">
        <MenuButton
          _hover={{ bg: "brand.grayLight" }}
          _active={{ bg: "brand.grayLight" }}
          fontFamily="Oswald"
          ring={0}
          minW={{ xl: "max", "2xl": "3xs" }}
          textAlign="left"
          px={4}
          variant='outline'
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {selectedItem}
        </MenuButton>
        <MenuList
          minW={{ xl: "max", "2xl": "3xs" }}
          bg="brand.grayLight"
          borderRadius="0"
        >
          {options.map((item, idx) => (
            <MenuItem
              _hover={{ bg: "brand.grayLight", color: "white" }}
              fontFamily="Oswald"
              onClick={() => setSelectedItem(item)}
              key={idx}
              isDisabled={item === selectedItem ? true : false}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Dropdown;
