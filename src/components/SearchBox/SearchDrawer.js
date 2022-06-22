import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { APICall } from "@api/client";
import debounce from "lodash.debounce";
import { useHistory } from "react-router-dom";
import { getCachedImageShort } from "@utils/index";

const SearchDrawer = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const [resultList, setResultList] = useState(null);
  const [keywords, setKeywords] = useState("");

  const getSearchResult = async (keywords) => {
    try {
      const response = await APICall.getSearchResult({ keywords });
      console.log("response", response);
      setResultList(response);
    } catch (error) {
      console.log(error);
      setResultList(null);
    }
  };

  const debounceGetSearchResult = useCallback(
    debounce((k) => getSearchResult(k), 1500),
    []
  );

  const handleInputOnchange = (e) => {
    const { value } = e.target;

    setKeywords(value);
    debounceGetSearchResult(value);
  };

  return (
    <>
      <Button
        leftIcon={<FiSearch size="22px" p="0" />}
        onClick={onOpen}
        variant={{ base: "unstyled", xl: "outline" }}
        fontSize="15px"
        color="#fff"
        borderWidth="0"
        mr={0}
        _hover={{ borderWidth: "0", color: "#7ae7ff" }}
        _focus={{ borderWidth: "0", color: "#7ae7ff", bg: "transparent" }}
        _active={{ borderWidth: "0", color: "#7ae7ff", bg: "transparent" }}
      >
        <Text display={{ base: "none", md: "flex" }} as="span">
          Search
        </Text>
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="top"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton color="#fff" />

          <DrawerBody bg="#222">
            <Stack
              spacing="2px"
              maxW="700px"
              w="full"
              mx="auto"
              mt="35px"
              mb="75px"
            >
              <InputGroup
                borderColor="#ffffff25"
                borderBottomWidth="2px"
                mb="20px"
              >
                <Input
                  h="40px"
                  bg="transparent"
                  px="0px"
                  fontSize="lg"
                  value={keywords}
                  ref={firstField}
                  id="keywords"
                  onChange={handleInputOnchange}
                  placeholder="Search collections ..."
                />
                <InputRightElement
                  transform="translateX(22px)"
                  bg="transparent"
                  h="full"
                  w={16}
                  cursor="pointer"
                >
                  <FiSearch size="22px" p="0" />
                </InputRightElement>
              </InputGroup>

              {resultList?.length === 0 ? (
                <Text color="#888" textAlign="center">
                  No result.
                </Text>
              ) : (
                resultList?.map((item) => (
                  <Box>
                    <Flex
                      cursor="pointer"
                      key={item._id}
                      alignItems="center"
                      mb={"12px"}
                      onClick={() => {
                        onClose();
                        history.push(`/collection/${item.nftContractAddress}`);
                      }}
                    >
                      <Image
                        w="28px"
                        h="28px"
                        mr="10px"
                        src={getCachedImageShort(item.squareImage, 100)}
                      />
                      <Text
                        color="#888"
                        _hover={{
                          color: "#fff",
                        }}
                        isTruncated
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </Box>
                ))
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
