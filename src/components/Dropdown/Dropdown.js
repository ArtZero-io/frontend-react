import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

function Dropdown({ options, selectedItem, setSelectedItem, width }) {
  const onClickHandler = (item) => setSelectedItem(item);

  return (
    <Box color="brand.blue" height="100%" w={width}>
      <Menu w="full" autoSelect={false} placement="bottom-end">
        <MenuButton
          _hover={{ borderColor: "#7ae7ff" }}
          _active={{ bg: "brand.grayDark" }}
          fontFamily="Oswald"
          ring={0}
          minW="195px"
          w="full"
          textAlign="left"
          px={4}
          variant="outline"
          as={Button}
          rightIcon={<ChevronDownIcon fontSize="2xl" />}
          bg="brand.grayDark"
          borderColor="transparent"
          textTransform="capitalize"
          color="#fff"
          fontSize="lg"
        >
          {options[selectedItem]}
        </MenuButton>
        <MenuList minW="195px" w="full" bg="brand.grayDark" borderRadius="0">
          {options?.map((_, idx) => {
            return (
              <MenuItem
                w="full"
                color="#fff"
                fontSize="lg"
                textTransform="capitalize"
                _hover={{ bg: "brand.grayLight", color: "white" }}
                fontFamily="Oswald"
                onClick={() => onClickHandler(idx)}
                key={idx}
                display={idx === selectedItem ? "none" : ""}
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
