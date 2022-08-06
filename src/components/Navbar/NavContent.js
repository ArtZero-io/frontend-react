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
  Text,
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
import { ArtZeroLogo } from "@theme/assets/logo/ArtZeroLogo";
import SocialCard from "../Card/Social";
import SearchDrawer from "../SearchBox/SearchDrawer";

const links = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Marketplace", href: ROUTES.MARKETPLACE },
  { label: "TGE", href: ROUTES.MINTING_EVENT },
  // { label: "Lpad", href: ROUTES.LAUNCHPAD_BASE },
  // { label: "Stats", href: ROUTES.STATS },
];

const MobileNavContent = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  isOpen
    ? (document.body.style.position = "fixed")
    : (document.body.style.position = "static");

  const { currentAccount } = useSubstrateState();

  return (
    <Flex
      w="full"
      {...props}
      justifyContent="center"
      display={{ base: "flex", md: "none" }}
    >
      <Center
        position="absolute"
        top="13px"
        left="0"
        as="button"
        mx="2"
        fontSize="2xl"
        color="white"
        onClick={onToggle}
      >
        {isOpen ? <HiX size="20px" /> : <HiOutlineMenu size="20px" />}
      </Center>

      <ArtZeroLogo
        zIndex="99"
        alt="ArtZeroLogo"
        height="20px"
        width="138px"
        display={{ base: "flex", md: "none" }}
      />

      <SearchDrawer
        position="absolute"
        top="0px"
        right="0px"
        as="button"
        mx="2"
        fontSize="2xl"
        color="white"
        onClick={onToggle}
        display={{ base: "flex", md: "none" }}
      />

      <NavList
        bg="black"
        pos="absolute"
        zIndex={"99"}
        inset="0"
        top="-15px"
        left="-10px"
        animate={isOpen ? "enter" : "exit"}
        h="100vh"
        w="100vw"
      >
        <Center
          position="absolute"
          top="28px"
          left="10px"
          as="button"
          mx="2"
          fontSize="2xl"
          color="white"
          onClick={onToggle}
          zIndex={"90"}
        >
          {isOpen ? <HiX size="20px" /> : <HiOutlineMenu size="20px" />}
        </Center>
        <Flex w="full" marginTop="30px" justifyContent="center" bg="black">
          <ArtZeroLogo
            zIndex="99"
            alt="ArtZeroLogo"
            height="20px"
            width="138px"
            display={{ base: "flex", md: "none" }}
          />
        </Flex>
        <Stack
          h="full"
          w="full"
          spacing="0"
          pt="40px"
          justify="start"
          position="relative"
        >
          <WalletSelector display={{ base: "flex", md: "none" }} />

          {links.map((link, index) => (
            <NavListItem key={index}>
              <NavLink.Mobile label={link.label} to={link.href} />
            </NavListItem>
          ))}

          {<NavLink.Mobile label="Docs" to={ROUTES.DOCS} isExternal={true} />}

          {currentAccount?.address && <MyAccountDropdown />}

          <Flex
            w="full"
            justifyContent="center"
            direction="column"
            pos="absolute"
            bottom="160px"
            display={{ base: "flex", md: "none" }}
          >
            <Center w="full" textAlign="center">
              <SocialCard profile={profile} />
            </Center>

            <Center w="full" textAlign="center">
              <Text
                fontSize={["13px", "sm", "sm"]}
                color="#ababab"
                width={["260px", "full", "full"]}
              >
                © Copyright 2022 ArtZero. All Rights Reserved
              </Text>
            </Center>
          </Flex>
        </Stack>
      </NavList>
    </Flex>
  );
};

const DesktopNavContent = (props) => {
  const { currentAccount } = useSubstrateState();

  return (
    <Flex w="full" display={{ base: "none", md: "flex" }}>
      <HStack
        w="full"
        align="stretch"
        overflowX="hidden"
        alignItems="center"
        justifyContent={{
          base: "flex-start",
          md: "space-between",
          xl: "flex-start",
        }}
        spacing={{ xl: "35px", "2xl": "55px" }}
        pl={{ base: "8px", md: "32px", xl: "50px" }}
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

      <SearchDrawer display={{ base: "none", md: "flex" }} />

      <WalletSelector display={{ base: "none", lg: "flex" }} />
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
  { label: "My Projects", href: ROUTES.ACCOUNT_MY_PROJECTS },
  { label: "WhiteList Manager", href: ROUTES.ACCOUNT_WHITELIST_PROJECTS },
];

const MyAccountDropdown = () => {
  const history = useHistory();
  const location = useLocation();

  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <Box px={{ base: "23px", lg: "0" }} py={{ base: "0px", lg: "0" }}>
      <Menu
        autoSelect={false}
        placement="bottom"
        offset={[-82, 12]}
        borderBottom="0"
        // borderColor={path.includes("/account/") ? "brand.blue" : "transparent"}
      >
        <MenuButton
          p={0}
          ring={0}
          h="41px"
          py="10px"
          as={Button}
          display="flex"
          bg="transparent"
          textAlign="left"
          borderBottom="2px"
          transition="all 0.2s"
          justifyContent="center"
          fontSize={{ base: "24px", md: "15px" }}
          _hover={{
            borderColor: "brand.blue",
            color: "brand.blue",
          }}
          _focus={{
            bg: "transparent",
          }}
          borderColor={
            path.includes("/account/") ? "brand.blue" : "transparent"
          }
          color={path.includes("/account/") ? "brand.blue" : "#fff"}
        >
          my account
        </MenuButton>
        <MenuList
          p="15px"
          minW="250px"
          borderWidth={2}
          borderRadius="0"
          bg="brand.grayDark"
          borderColor="brand.blue"
          // ml={{ base: "20px", lg: "auto" }}
        >
          {myAccountList.map((item, idx) => (
            <MenuItem
              to="#"
              py="12px"
              px="15px"
              key={idx}
              _hover={{ bg: "black" }}
              as={ReactRouterLink}
              fontFamily="Evogria, sans-serif"
              onClick={() => history.push(item.href)}
              fontSize={{ base: "24px", md: "15px" }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

const profile = [
  { discord: "https://discord.gg/wzkZ2JTvN4" },
  { twitter: "https://twitter.com/ArtZero_io" },
  { medium: "https://medium.com/@artzero_io" },
  { telegram: "https://t.me/artzero_io" },
  { mail: "mailto:admin@artzero.io" },
];
