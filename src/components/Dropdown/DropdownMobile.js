import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function DropdownMobile({ options, selectedItem, setSelectedItem, ...rest }) {
  const onClickHandler = (item) => setSelectedItem(item);

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

        <MenuList zIndex={10} bg="brand.grayDark" borderRadius="0" minW="325px">
          {options?.map((_, idx) => {
            return (
              <MenuItem
                key={idx}
                color="#fff"
                onClick={() => onClickHandler(idx)}
                display={idx === selectedItem ? "none" : ""}
                _hover={{ bg: "brand.grayLight", color: "white" }}
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

export default DropdownMobile;
