import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Input,
  Spacer,
  Stack,
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
import { useRef } from "react";

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

  const [draftPriceQuery, setDraftPriceQuery] = useState({ max: "", min: "" });

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

  const rarityTableRef = useRef(rarityTable);
  if (rarityTable !== undefined && rarityTableRef.current !== rarityTable) {
    rarityTableRef.current = rarityTable;
  }

  const totalNftCountRef = useRef(totalNftCount);
  if (
    totalNftCount !== undefined &&
    totalNftCountRef.current !== totalNftCount
  ) {
    totalNftCountRef.current = totalNftCount;
  }

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
          Attributes
        </Heading>

        <Box sx={SCROLLBAR} overflowY="scroll" h="350px" pr="10px">
          <VStack spacing="10px">
            <Accordion w="full" allowToggle p="4px" border="0px solid #0000">
              {rarityTableRef.current &&
                Object.entries(rarityTableRef.current).map(([key, value]) => (
                  <Fragment key={key}>
                    <AccordionItem>
                      <AccordionButton
                        my="4px"
                        w="full"
                        h="50px"
                        px="18px"
                        bg="black"
                        color="#fff"
                        fontSize="18px"
                        fontWeight="400"
                        textTransform="none"
                        variant="outline"
                        fontFamily="Oswald, sans-serif;"
                        border="1px solid #fff0"
                        _hover={{ border: "1px solid #7ae7ff" }}
                      >
                        <Text mr="10px">{key}</Text>
                        <Spacer />
                        <Text mr="10px">({value.length})</Text>
                        <AccordionIcon />
                      </AccordionButton>

                      <AccordionPanel my="8px" p="0px" w="full">
                        <Stack spacing="10px" w="full">
                          {value.map((item) => (
                            <Stack
                              border={
                                !traitsQuery[key] ||
                                traitsQuery[key]?.indexOf(item.name) === -1
                                  ? "1px solid #333"
                                  : "1px solid #7AE7FF"
                              }
                              key={item.name}
                              p="16px"
                              cursor="pointer"
                              _hover={{ bg: "#222" }}
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
                              <Flex>
                                <Text
                                  fontFamily="Oswald, sans-serif"
                                  fontStyle="italic"
                                  color="#7AE7FF"
                                  fontSize="18px"
                                >
                                  {item.name}
                                </Text>
                                <Spacer />
                                <Text>
                                  {item.count}/{totalNftCountRef.current}
                                </Text>
                              </Flex>
                              <Flex>
                                {" "}
                                <Spacer />
                                <Text
                                  fontSize="12px"
                                  border="1px solid #7ae7ff"
                                  px="2px"
                                  lineHeight="22px"
                                >
                                  {(
                                    (item.count / totalNftCountRef.current) *
                                    100
                                  ).toFixed(0)}
                                  %
                                </Text>
                              </Flex>
                            </Stack>
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
