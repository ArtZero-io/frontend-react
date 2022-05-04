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
          minW="10rems"
          textAlign="left"
          px={4}
          variant="outline"
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="brand.grayDark"
          borderColor="transparent"
        >
          {options[selectedItem]}
        </MenuButton>
        <MenuList minW="10rem" bg="brand.grayDark" borderRadius="0">
          {options?.map((_, idx) => {
            return (
              <MenuItem
                _hover={{ bg: "brand.grayLight", color: "white" }}
                fontFamily="Oswald"
                onClick={() => onClickHandler(idx)}
                key={idx}
                isDisabled={idx === selectedItem ? true : false}
              >
                {options[idx]}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Dropdown;
