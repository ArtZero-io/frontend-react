import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Dropdown() {
  const [selectedItem, setSelectedItem] = useState("Oldest");

  const options = ["Oldest", "Price: Low to High", "Price: High to Low"];

  return (
    <Box color="brand.blue" height="100%" mx="auto" minW={48} >
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        mx="2"
        flexDirection={{ md: "colum" }}
      >
        <Menu autoSelect={false} placement="bottom-end" offset={[-0.5, -1]}>
          <MenuButton
            _hover={{ bg: "brand.grayDark" }}
            _active={{ bg: "transparent", borderBottom: 0 }}
            bg="transparent"
            borderRadius="0"
            borderWidth={2}
            borderColor="brand.blue"
            fontFamily="Oswald"
            color="brand.blue"
            ring={0}
            minW={72}
            mx="2"
                        h={14}

            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {selectedItem}
          </MenuButton>
          <MenuList
            minW={72}
            borderRadius="0"
            borderWidth={2}
            borderColor="brand.blue"
            bg="transparent"
            borderTop="0"
            px={2}
          >
            {options.map((option, idx) => (
              <MenuItem
                _hover={{ bg: "brand.grayLight", color: "white" }}
                fontFamily="Oswald"
                onClick={() => setSelectedItem(option)}
                key={idx}
                isDisabled={option === selectedItem ? true : false}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default Dropdown;
