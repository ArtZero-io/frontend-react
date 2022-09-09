import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function DropdownMobile({
  options,
  selectedItem,
  setSelectedItem,
  minW,
  ...rest
}) {
  const onClickHandler = (item) => setSelectedItem(item);

  console.log("options", options);
  console.log("selectedItem", selectedItem);

  return (
    <Box color="brand.blue" height="100%" {...rest}>
      <Menu autoSelect={false} placement="bottom">
        <MenuButton
          px={4}
          ring={0}
          w="full"
          as={Button}
          color="#fff"
          textAlign="left"
          variant="outline"
          _active={{ bg: "brand.grayDark" }}
          rightIcon={<ChevronDownIcon fontSize="2xl" />}
        >
          {options[selectedItem]}
        </MenuButton>

        <MenuList
          zIndex="dropdown"
          bg="brand.grayDark"
          borderRadius="0"
          minW={minW}
        >
          {Object.entries(options)?.map(([k, v]) => {
            return (
              <MenuItem
                key={k}
                color="#fff"
                onClick={() => onClickHandler(k)}
                display={k === selectedItem ? "none" : ""}
                _hover={{ bg: "brand.grayLight", color: "white" }}
              >
                {v}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default DropdownMobile;
