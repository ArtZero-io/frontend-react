import {
  Box,
  Center,
  HStack,
  Stack,
  StackDivider,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { NavLink } from "./NavLink";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import WalletSelector from "../WalletSelector/index";
const links = [
  { label: 'Home', href: '/' },
  { label: 'My Account', href: '/account' },
  { label: 'My Collection', href: '/my-collection'}
]

const MobileNavContent = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box {...props}>
      <Center
        as="button"
        p="2"
        fontSize="2xl"
        color={useColorModeValue("gray.600", "gray.400")}
        onClick={onToggle}
      >
        {isOpen ? <HiX /> : <HiOutlineMenu />}
      </Center>
      <NavList
        pos="absolute"
        insetX="0"
        bg="blue.600"
        top="64px"
        animate={isOpen ? "enter" : "exit"}
      >
        <Stack
          spacing="0"
          divider={<StackDivider borderColor="whiteAlpha.200" />}
        >
          {links.map((link, index) => (
            <NavListItem key={index}>
              <NavLink.Mobile label={link.label} to={link.href} />
            </NavListItem>
          ))}
          <NavListItem style={{ flex: "1" }}>
            <NavLink.Mobile>
              <WalletSelector />
            </NavLink.Mobile>
          </NavListItem>
        </Stack>
      </NavList>
    </Box>
  );
};

const DesktopNavContent = (props) => {
  return (
    <HStack spacing="8" align="stretch" {...props}>
      {links.map((link, index) => (
        <NavLink.Desktop key={index} label={link.label} to={link.href} />
      ))}

      <WalletSelector />
    </HStack>
  );
};

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
};
