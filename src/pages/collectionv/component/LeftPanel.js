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
  Spacer,
  Stack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import LeftArrowIcon from "@theme/assets/icon/LeftArrow";
import RightArrowIcon from "@theme/assets/icon/RightArrow";
import { motion } from "framer-motion";
import { SCROLLBAR } from "@constants";
import { useEffect } from "react";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { memo } from "react";

function LeftPanel({
  rarityTable,
  traitsQuery,
  setTraitsQuery,
  totalNftCount,
  setPriceQuery,
  activeTab,
  priceQuery,
}) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  const [draftPriceQuery, setDraftPriceQuery] = useState({});

  useEffect(() => {
    if (
      priceQuery?.max &&
      priceQuery?.min &&
      !draftPriceQuery?.max &&
      !draftPriceQuery?.min
    ) {
      setDraftPriceQuery(() => {
        return { min: priceQuery?.min, max: priceQuery?.max };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceQuery]);

  useEffect(() => {
    if (activeTab !== "LISTED") {
      setPriceQuery(() => {
        return { min: "", max: "" };
      });

      setDraftPriceQuery(() => {
        return { min: "", max: "" };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Box textAlign="left" pr="20px" maxW="300px">
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

      <Collapse in={isOpen} animateOpacity>
        <Button
          isDisabled={activeTab !== "LISTED"}
          onClick={() => {
            if (!draftPriceQuery.min || !draftPriceQuery.max) {
              return toast.error("Please enter min and max price");
            }

            setPriceQuery((p) => {
              return { ...p, ...draftPriceQuery };
            });
          }}
          w="full"
          textAlign="left"
          variant="outline"
          fontFamily="Oswald"
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
          <Input
            isDisabled={activeTab !== "LISTED"}
            type="number"
            placeholder="Min"
            onChange={({ target }) =>
              setDraftPriceQuery((p) => {
                return { ...p, min: target.value };
              })
            }
            value={draftPriceQuery.min}
          />
          <RightArrowIcon width={"18px"} height={"18px"} />
          <Input
            isDisabled={activeTab !== "LISTED"}
            type="number"
            placeholder="Max"
            onChange={({ target }) =>
              setDraftPriceQuery((p) => {
                return { ...p, max: target.value };
              })
            }
            value={draftPriceQuery.max}
          />
        </Flex>

        <Heading size="h5" mb={"24px"}>
          Attribute
        </Heading>
        <HStack my="20px" spacing={"8px"} flexWrap="wrap">
          {Object.entries(traitsQuery).map(([k, arr]) => (
            <Fragment key={k}>
              {arr.map((item, idx) => (
                <Tag
                  key={idx}
                  my="8px"
                  size="sm"
                  variant="outline"
                  colorScheme="black"
                >
                  <TagLabel mr="4px" fontSize="13px">
                    {k}: {item}
                  </TagLabel>
                  <CloseButton
                    size="sm"
                    onClick={() => {
                      const newTraitsQuery = { ...traitsQuery };
                      const newArray = traitsQuery[k].filter((i) => i !== item);

                      newArray.length === 0
                        ? delete newTraitsQuery[k]
                        : (newTraitsQuery[k] = newArray);

                      setTraitsQuery(newTraitsQuery);
                    }}
                  />
                </Tag>
              ))}
            </Fragment>
          ))}
        </HStack>
        <Box sx={SCROLLBAR} overflowY="scroll" h="350px" pr="10px">
          <VStack spacing="10px">
            <Accordion w="full" maxW="300px" allowToggle>
              {rarityTable &&
                Object.entries(rarityTable).map(([key, value]) => (
                  <Fragment key={key}>
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
                      <AccordionButton
                        fontFamily="Oswald, sans-serif;"
                        w="full"
                        h="50px"
                        px="18px"
                        bg="black"
                        color="#fff"
                        fontSize="18px"
                        fontWeight="400"
                        textTransform="none"
                        variant="outline"
                      >
                        <Text mr="10px">{key}</Text>
                        <Spacer />
                        <Text mr="10px">({value.length})</Text>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel>
                        <Stack spacing="10px">
                          {value.map((item) => (
                            <Flex
                              key={item.name}
                              p="4px"
                              cursor="pointer"
                              _hover={{ bg: "#7ae7ff", color: "black" }}
                              onClick={() => {
                                const newTraitsQuery = { ...traitsQuery };

                                if (!newTraitsQuery[key]) {
                                  newTraitsQuery[key] = [];
                                }

                                const idx = newTraitsQuery[key].indexOf(
                                  item.name
                                );

                                if (idx !== -1) {
                                  return toast.error(
                                    "This item is already selected!"
                                  );
                                }

                                newTraitsQuery[key].push(item.name);

                                setTraitsQuery(newTraitsQuery);
                              }}
                            >
                              {item.name}
                              <Spacer />
                              {((item.count / totalNftCount) * 100).toFixed(0)}%
                            </Flex>
                          ))}
                        </Stack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Fragment>
                ))}
            </Accordion>
          </VStack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default memo(LeftPanel);
