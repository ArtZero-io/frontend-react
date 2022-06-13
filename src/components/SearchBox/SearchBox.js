import React, { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import {
  Input,
  List,
  ListItem,
  Flex,
  InputGroup,
  InputRightElement,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { APICall } from "../../api/client";
import { getCachedImageShort } from "@utils/index";
import { useHistory } from "react-router-dom";

const ComboboxInput = React.forwardRef(({ ...props }, ref) => {
  return <Input {...props} ref={ref} bg="transparent" px="0px" fontSize="lg" />;
});

const ComboboxList = React.forwardRef(({ isOpen, ...props }, ref) => {
  return (
    <List
      zIndex="overlay"
      w="full"
      mt="12px"
      p="20px"
      bg="#222"
      display={isOpen ? null : "none"}
      {...props}
      ref={ref}
    />
  );
});

const ComboboxItem = React.forwardRef(
  ({ itemIndex, highlightedIndex, ...props }, ref) => {
    const isActive = itemIndex === highlightedIndex;

    return (
      <ListItem
        alignItems="center"
        fontSize="lg"
        textTransform="none"
        transition="background-color 220ms, color 220ms"
        color={!isActive ? "#888" : "#fff"}
        cursor="pointer"
        ref={ref}
        {...props}
      />
    );
  }
);

export default function SearchBox() {
  const [items, setItems] = useState("");
  const [itemsInfo, setItemsInfo] = useState([]);

  const history = useHistory();

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    items,
  });

  useEffect(() => {
    const doSearch = async () => {
      const res = await APICall.getSearchResult({ keywords: inputValue });
      const nameArr = res.map((i) => i.name);
      setItems(nameArr);
      setItemsInfo(res);
    };

    !!inputValue && doSearch();
  }, [inputValue]);

  return (
    <InputGroup
      w={{ base: "auto", "2xl": "full" }}
      minW={{ base: "100px", xl: "200px", "2xl": "250px" }}
      maxW={{ base: "100px", xl: "200px", "2xl": "400px" }}
      h={"50px"}
      py={1}
      mx={{ base: "10px", xl: "10px", "2xl": "60px" }}
      color="brand.darkGray"
      borderWidth="0"
      borderRadius="0"
      borderColor="#ffffff25"
      borderBottomWidth="2px"
    >
      <InputRightElement
        transform="translateX(22px)"
        bg="transparent"
        h="full"
        w={16}
        cursor="pointer"
      >
        <FiSearch size="22px" p="0" />
      </InputRightElement>
      <Flex direction="column" align="center" w="full">
        <Flex
          {...getComboboxProps()}
          direction="column"
          flex="1 1 auto"
          w="full"
        >
          <Flex direction="row" alignItems="baseline">
            <ComboboxInput
              {...getInputProps()}
              placeholder="Search collections ..."
              flex="0 0 auto"
              width="full"
            />
          </Flex>

          {itemsInfo?.length ? (
            <ComboboxList
              isOpen={isOpen}
              {...getMenuProps()}
              flex={1}
              overflowY="auto"
            >
              {itemsInfo?.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  mb={"12px"}
                  onClick={() => {
                    history.push(`/collection/${item.nftContractAddress}`);
                  }}
                >
                  <Image
                    w="28px"
                    h="28px"
                    mr="10px"
                    src={getCachedImageShort(item.squareImage, 100)}
                  />

                  <ComboboxItem
                    {...getItemProps({ item, index })}
                    itemIndex={index}
                    highlightedIndex={highlightedIndex}
                  >
                    <Text
                      maxW={{ base: "100px", xl: "110px", "2xl": "300px" }}
                      isTruncated
                    >
                      {item.name}
                    </Text>
                  </ComboboxItem>
                </Flex>
              ))}
            </ComboboxList>
          ) : null}
        </Flex>
      </Flex>
    </InputGroup>
  );
}
