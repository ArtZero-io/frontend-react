import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
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

import { motion } from "framer-motion";
import ImageCloudFlare from "../ImageWrapper/ImageCloudFlare";

const SearchDrawer = ({ display = true, ...rest }) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const [resultList, setResultList] = useState(null);
  const [keywords, setKeywords] = useState("");

  const getSearchResult = async (keywords) => {
    try {
      let { ret: response } = await APICall.getSearchResult({ keywords });

      if (response.length > 0) {
        response = response.filter((item) => item.nft_count > 0);
      }
      setResultList(response);
    } catch (error) {
      console.log(error);
      setResultList(null);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetSearchResult = useCallback(
    debounce((k) => getSearchResult(k), 1000),
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
        {...rest}
        mr={0}
        color="#fff"
        fontSize="15px"
        borderWidth="0"
        onClick={onOpen}
        display={display}
        px={{ base: "4px", xl: "30px" }}
        leftIcon={<FiSearch size="22px" p="0" />}
        variant={{ base: "unstyled", xl: "outline" }}
        _hover={{ borderWidth: "0", color: "#7ae7ff" }}
        _focus={{ borderWidth: "0", color: "#7ae7ff", bg: "transparent" }}
        _active={{ borderWidth: "0", color: "#7ae7ff", bg: "transparent" }}
      >
        <Text display={{ base: "none", xl: "flex" }} as="span">
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

          <DrawerBody
            bg="#222"
            overflowY="hidden"
            style={{
              maxHeight: (resultList?.length || 0) * 42 + 188,
              transition: "max-height 0.5s cubic-bezier(0.19, 1, 0.22, 1) 0.1s",
            }}
          >
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Text color="#888" textAlign="center">
                    No result.
                  </Text>
                </motion.div>
              ) : (
                resultList?.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Box>
                      <Flex
                        cursor="pointer"
                        key={item._id}
                        alignItems="center"
                        mb={"12px"}
                        onClick={() => {
                          onClose();
                          history.push(
                            `/collection/${item.nftContractAddress}`
                          );
                        }}
                      >
                        <ImageCloudFlare
                          size="100"
                          w="28px"
                          h="28px"
                          mr="10px"
                          src={item.squareImage}
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
                  </motion.div>
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
