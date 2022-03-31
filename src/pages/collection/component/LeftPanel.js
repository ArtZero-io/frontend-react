import {
  Box,
  Button,
  Collapse,
  Flex,
  Spacer,
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
        <Button variant="transparent" onClick={onToggle} h={14}>
          <BiLeftArrowAlt />
        </Button>
      </Flex>
      <Collapse textAlign="left" in={isOpen} animateOpacity>
        <Text h={8}>Filter</Text>

        <Button
          textAlign="left"
          variant="transparent"
          fontFamily="Oswald"
          minW={80}
          h={14}
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
          h={14}
        >
          {`0 AZERO -> 999 AZERO`}
        </Box>
        <Text h={8}>Attribute</Text>
        <VStack>
          <Button variant="transparent" fontFamily="Oswald" minW={80} h={14}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80} h={14}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80} h={14}>
            <Flex w="full">
              Price filter
              <Spacer />
              (6)
              <BiRightArrowAlt />
            </Flex>
          </Button>
          <Button variant="transparent" fontFamily="Oswald" minW={80} h={14}>
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
