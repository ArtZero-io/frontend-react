/* eslint-disable no-unused-vars */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CloseButton,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  NumberInput,
  Spacer,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  // Square,
  // Text,
  // Drawer,
  // DrawerBody,
  // DrawerCloseButton,
  // DrawerContent,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  // Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import LeftArrowIcon from "@theme/assets/icon/LeftArrow";
import RightArrowIcon from "@theme/assets/icon/RightArrow";
import { motion } from "framer-motion";
import { SCROLLBAR } from "@constants";
import { useEffect } from "react";
import { APICall } from "@api/client";

function LeftPanel({ rarityTable }) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  // Test search NFY by traits

  useEffect(() => {
    const traitsFilter = [
      { $or: [{ "traits.Skin": "Red" }, { "traits.Skin": "Yellow" }] },
      { $or: [{ "traits.Hands": "Blue" }] },
    ];
    const fetchData = async () => {
      let resTraits = await APICall.searchNFTOfCollectionByTraits({
        isForSale: false,
        sort: -1,
        offset: 0,
        limit: 10,
        traitFilters: JSON.stringify(traitsFilter),
        collectionAddress: "5EQXQ5E1NfU6Znm3avpZM7mArxZDwQeugJG3pFNADU6Pygfw",
      });

      console.log("LeftPanel resTraits", resTraits);
    };

    fetchData();
  }, []);

  return (
    <Box textAlign="left" pr="20px">
      <Flex alignItems="center" mb={"24px"}>
        {isOpen && <Heading size="h5">Filter</Heading>}

        <Spacer />

        <IconButton
          bg="transparent"
          _focus={{ border: "none" }}
          size="icon"
          variant="iconSolid"
          onClick={() => onToggle()}
          icon={
            <motion.div
              animate={{
                rotate: isOpen ? 0 : 180,
              }}
            >
              <LeftArrowIcon />
            </motion.div>
          }
          _hover={{ color: "black", bg: "#7ae7ff" }}
        />
      </Flex>

      <Collapse textAlign="left" in={isOpen} animateOpacity>
        <Button
          w="full"
          textAlign="left"
          variant="outline"
          fontFamily="Oswald"
          minW={80}
        >
          Price filter
        </Button>

        <Flex
          alignItems="center"
          color="#7AE7FF"
          my={4}
          py={2}
          shadow="md"
          fontSize="15px"
          fontWeight={400}
        >
          <Input type="number" placeholder="Min" />
          <RightArrowIcon width={"18px"} height={"18px"} />
          <Input type="number" placeholder="Max" />
        </Flex>

        <Heading size="h5" mb={"24px"}>
          Attribute
        </Heading>
        <HStack spacing={4}>
          {["sm", "md", "lg"].map((size) => (
            <Tag size={size} key={size} variant="outline" colorScheme="black">
              <TagLabel>Blue</TagLabel>
              <CloseButton size='sm' />
            </Tag>
          ))}
        </HStack>
        <Box sx={SCROLLBAR} overflowY="scroll" h="350px" pr="10px">
          <VStack spacing="10px">
            <Accordion w="full" maxW="300px" allowToggle>
              {rarityTable &&
                Object.entries(rarityTable).map(([key, value]) => (
                  <>
                    <Button
                      hidden
                      w="full"
                      h="50px"
                      px="18px"
                      bg="black"
                      color="#fff"
                      minW={80}
                      fontSize="18px"
                      fontWeight="400"
                      textTransform="none"
                      variant="outline"
                      fontFamily="Oswald"
                    >
                      <Flex
                        w="full"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {key} <Spacer />
                        <Text mr="10px">({value.length})</Text>
                        <RightArrowIcon
                          ml="4px"
                          width={"18px"}
                          height={"18px"}
                        />
                      </Flex>
                    </Button>
                    <AccordionItem>
                      <AccordionButton fontFamily="Oswald, sans-serif;">
                        <Text mr="10px">{key}</Text>
                        <Spacer />
                        <Text mr="10px">({value.length})</Text>
                        <AccordionIcon />
                      </AccordionButton>

                      {console.log("value", value)}
                      <AccordionPanel>
                        <Stack spacing="10px">
                          {value.map((item) => (
                            <Box
                              border="1px yellow solid"
                              onClick={() => alert("item.name", item.name)}
                            >
                              {item.name}-{item.count}/totalCount
                            </Box>
                          ))}
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </>
                ))}
            </Accordion>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default LeftPanel;
