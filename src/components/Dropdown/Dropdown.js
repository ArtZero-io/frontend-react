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
          px={4}
          ring={0}
          w="full"
          as={Button}
          color="#fff"
          minW="195px"
          textAlign="left"
          variant="outline"
          bg="brand.grayDark"
          fontFamily="Oswald"
          fontSize={["md", "lg"]}
          borderColor="transparent"
          textTransform="capitalize"
          _active={{ bg: "brand.grayDark" }}
          _hover={{ borderColor: "#7ae7ff" }}
          rightIcon={<ChevronDownIcon fontSize="2xl" />}
        >
          {options[selectedItem]}
        </MenuButton>
        <MenuList minW="195px" w="full" bg="brand.grayDark" borderRadius="0">
          {options?.map((_, idx) => {
            return (
              <MenuItem
                w="full"
                key={idx}
                color="#fff"
                fontFamily="Oswald"
                fontSize={["md", "lg"]}
                textTransform="capitalize"
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

export default Dropdown;
