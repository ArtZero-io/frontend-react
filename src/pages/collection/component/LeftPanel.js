import {
  Box,
  Button,
  Collapse,
  Flex,
  Spacer,
  Square,
  Text,
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
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

function LeftPanel() {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <Box textAlign="left" px={2}>
      <Flex>
        <Spacer />
        <Button variant="icon" onClick={onToggle}>
          <Square size="3.125rem">
            <BiLeftArrowAlt />
          </Square>
        </Button>
      </Flex>
      <Collapse textAlign="left" in={isOpen} animateOpacity>
        <Text h={8}>Filter</Text>

        <Button
          textAlign="left"
          variant="transparent"
          fontFamily="Oswald"
          minW={80}
         >
          Price filter
        </Button>

        <Box
          textAlign="center"
          color="white"
          my={4}
          py={2}
          borderWidth={1}
          borderColor="brand.blue"
          shadow="md"
        
        >
          {`0 AZERO -> 999 AZERO`}
        </Box>
        <Text h={8}>Attribute</Text>
        <VStack>
          <Button variant="transparent" fontFamily="Oswald" minW={80}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
        </VStack>
      </Collapse>
    </Box>
  );
}

export default LeftPanel;
