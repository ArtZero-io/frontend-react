import {
  Box,
  Center,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { NavLink } from "./NavLink";
import { NavList } from "./NavList";
import { NavListItem } from "./NavListItem";
import WalletSelector from "../WalletSelector/index";
import * as ROUTES from "@constants/routes";

import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import { Link as ReactRouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Marketplace", href: ROUTES.MARKETPLACE },
  { label: "TGE", href: ROUTES.MINTING_EVENT },
];

const MobileNavContent = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box {...props}>
      <Center
        as="button"
        p="2"
        mx="2"
        fontSize="3xl"
        color="brand.blue"
        onClick={onToggle}
      >
        {isOpen ? <HiX /> : <HiOutlineMenu />}
      </Center>
      <NavList
        pos="absolute"
        zIndex={"99"}
        insetX="0"
        top="76px"
        left="0px"
        animate={isOpen ? "enter" : "exit"}
        h="full"
        w="full"
      >
        <Stack h="full" w="full" spacing="0">
          {links.map((link, index) => (
            <NavListItem key={index} bg="brand.semiBlack">
              <NavLink.Mobile label={link.label} to={link.href} />
            </NavListItem>
          ))}
          {<NavLink.Mobile label="Docs" to={ROUTES.DOCS} isExternal={true} />}
          {/* {currentAccount && currentAccount?.address && <MyAccountDropdown />} */}
        </Stack>
      </NavList>
    </Box>
  );
};

const DesktopNavContent = (props) => {
  const { currentAccount } = useSubstrateState();

  return (
    <Flex w="full">
      <HStack
        spacing="55px"
        align="stretch"
        overflowX="hidden"
        alignItems="center"
        justifyContent="center"
        pl={1}
        w="full"
        {...props}
      >
        {links.map((link, index) => (
          <NavLink.Desktop key={index} label={link.label} to={link.href} />
        ))}

        {/* {currentAccount && currentAccount?.address && (
          <NavLink.Desktop label="Admin" to={ROUTES.ACCOUNT_ADMIN} />
        )} */}

        {<NavLink.Desktop label="Docs" to={ROUTES.DOCS} isExternal={true} />}

        {currentAccount?.address && <MyAccountDropdown />}
      </HStack>

      <WalletSelector />
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContent,
  Desktop: DesktopNavContent,
};

const myAccountList = [
  { label: "General", href: ROUTES.ACCOUNT },
  { label: "My Collections", href: ROUTES.ACCOUNT_MY_COLLECTIONS },
  { label: "My NFTs", href: ROUTES.ACCOUNT_MY_NFTS },
  { label: "My Stakes", href: ROUTES.ACCOUNT_MY_STAKES },
];

const MyAccountDropdown = () => {
  const history = useHistory();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <Box>
      <Menu
        autoSelect={false}
        placement="bottom"
        offset={[-82, 12]}
        borderBottom="0"
        // borderColor={path.includes("/account/") ? "brand.blue" : "transparent"}
      >
        <MenuButton
          // bg="yellow"
          h="41px"
          _hover={{
            borderColor: "brand.blue",
            color: "brand.blue",
          }}
          _focus={{
            bg: "transparent",
          }}
          ring={0}
          textAlign="left"
          borderBottom="2px"
          // borderColor="yellow"
          transition="all 0.2s"
          as={Button}
          p={0}
          // h={7}
          bg="transparent"
          borderColor={
            path.includes("/account/") ? "brand.blue" : "transparent"
          }
          py="10px"
          display="flex"
          justifyContent="center"
          color={path.includes("/account/") ? "brand.blue" : "#fff"}
        >
          My Account
        </MenuButton>
        <MenuList
          minW="250px"
          bg="brand.grayDark"
          borderWidth={2}
          borderColor="brand.blue"
          borderRadius="0"
          p="15px"
        >
          {myAccountList.map((item, idx) => (
            <MenuItem
              as={ReactRouterLink}
              fontFamily="Evogria, sans-serif"
              _hover={{ bg: "black" }}
              onClick={() => history.push(item.href)}
              key={idx}
              to="#"
              fontSize="15px"
              py="12px"
              px="15px"
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
