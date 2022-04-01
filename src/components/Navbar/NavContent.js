import {
  Box,
  Center,
  HStack,
  Stack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Heading,
  Button,
} from "@chakra-ui/react";
import * as React from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { NavLink } from "./NavLink";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import WalletSelector from "../WalletSelector/index";
import * as ROUTES from "@constants/routes";

import { useSubstrateState } from "../../utils/substrate/SubstrateContext";
import { Link as ReactRouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
const links = [
  // { label: "NewC", href: "/collections" },
  { label: "Marketplace", href: ROUTES.MARKETPLACE },
  // { label: "Mint", href: ROUTES.MINTING_EVENT },
  // { label: "Staking", href: ROUTES.STAKE },

  { label: "Admin", href: ROUTES.ADMIN },
  // { label: "Collection", href: ROUTES.MY_COLLECTION },
];

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
        <Stack spacing="0">
          {links.map((link, index) => (
            <NavListItem key={index}>
              <NavLink.Mobile label={link.label} to={link.href} />
            </NavListItem>
          ))}
          <NavListItem
            style={{ flex: "1", display: "flex", flexDirection: "column" }}
          >
            <WalletSelector />
          </NavListItem>
        </Stack>
      </NavList>
    </Box>
  );
};

const DesktopNavContent = (props) => {
  const { currentAccount } = useSubstrateState();

  return (
    <HStack
      spacing="8"
      align="stretch"
      {...props}
      overflowX="hidden"
      alignItems="center"
    >
      {links.map((link, index) => (
        <NavLink.Desktop key={index} label={link.label} to={link.href} />
      ))}
      {currentAccount && currentAccount?.address && <MyAccountDropdown />}
      <WalletSelector />
    </HStack>
  );
};

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
};
const myAccountList = [
  { label: "General", href: ROUTES.ACCOUNT },
  { label: "My Collection", href: ROUTES.MY_COLLECTION },
  { label: "My NFT", href: ROUTES.MINTING_EVENT },
  { label: "My Stakes", href: ROUTES.STAKE },
];
const MyAccountDropdown = () => {
  const history = useHistory();
  return (
    <Box>
      <Menu autoSelect={false} placement="bottom" offset={[-32, 12]}>
        <MenuButton
          _hover={{
            borderColor: "brand.blue",
            color: "brand.blue",
          }}
          ring={0}
          textAlign="left"
          borderBottom="2px"
          borderColor="transparent"
          transition="all 0.2s"
          as={Button}
          p={0}
          h={7}
          bg="transparent"
        >
          <Heading
            size="sm"
            m={0}
            fontFamily="Evogria, sans-serif"
            fontWeight="medium"
          >
            My Account
          </Heading>
        </MenuButton>
        <MenuList
          minW={8}
          bg="brand.grayDark"
          borderWidth={2}
          borderColor="brand.blue"
          borderRadius="0"
          px={2}
        >
          {myAccountList.map((item, idx) => (
            <MenuItem
              as={ReactRouterLink}
              fontFamily="Evogria, sans-serif"
              _hover={{ bg: "black" }}
              onClick={() => history.push(item.href)}
              key={idx}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
