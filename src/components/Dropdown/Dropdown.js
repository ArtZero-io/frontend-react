import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function Dropdown({ options, selectedItem, setSelectedItem }) {
  const onClickHandler = (item) => setSelectedItem(item);

  return (
    <Box color="brand.blue" height="100%">
      <Menu autoSelect={false} placement="bottom-end">
        <MenuButton
          _hover={{ borderColor: "#7ae7ff" }}
          _active={{ bg: "brand.grayDark" }}
          fontFamily="Oswald"
          ring={0}
          minW={{ xl: "max", "2xl": "3xs" }}
          textAlign="left"
          px={4}
          variant="outline"
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {options[selectedItem]}
        </MenuButton>
        <MenuList
          minW={{ xl: "max", "2xl": "3xs" }}
          bg="brand.grayDark"
          borderRadius="0"
        >
          {[0, 1].map((item, idx) => {
            return (
              <MenuItem
                _hover={{ bg: "brand.grayLight", color: "white" }}
                fontFamily="Oswald"
                onClick={() => onClickHandler(item)}
                key={idx}
                isDisabled={item === selectedItem ? true : false}
              >
                {options[item]}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Dropdown;
