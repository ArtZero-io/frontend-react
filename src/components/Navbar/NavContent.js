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
import SearchBox from "../SearchBox/SearchBox";

const links = [
  { label: "Home", href: ROUTES.HOME },
  { label: "Marketplace", href: ROUTES.MARKETPLACE },
  { label: "TGE", href: ROUTES.MINTING_EVENT },
  // { label: "Stats", href: ROUTES.STATS },
];

const MobileNavContent = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  isOpen
    ? (document.body.style.position = "fixed")
    : (document.body.style.position = "static");

  return (
    <Flex w="full" {...props}>
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
        {isOpen ? <HiX /> : <HiOutlineMenu />}
      </Center>
      <Flex w="full" ml="106px">
        <ArtZeroLogo
          zIndex="99"
          alt="ArtZeroLogo"
          height="20px"
          width="138px"
          display={{ base: "flex", md: "none" }}
        />
      </Flex>
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
          top="30px"
          left="12px"
          as="button"
          mx="2"
          fontSize="2xl"
          color="white"
          onClick={onToggle}
          zIndex={"90"}
        >
          {isOpen ? <HiX /> : <HiOutlineMenu />}
        </Center>
        <Flex w="full" marginTop="32px" justifyContent="center" bg="black">
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
          {links.map((link, index) => (
            <NavListItem key={index}>
              <NavLink.Mobile label={link.label} to={link.href} />
            </NavListItem>
          ))}
          {<NavLink.Mobile label="Docs" to={ROUTES.DOCS} isExternal={true} />}
          {/* {currentAccount && currentAccount?.address && <MyAccountDropdown />} */}

          <Flex
            w="full"
            justifyContent="center"
            direction="column"
            pos="absolute"
            bottom="150px"
            display={{ base: "flex", md: "none" }}
          >
            <Center
              w="full"
              textAlign="center"
              // mt={["32px", "60px", "60px"]}
              // mb={["12px", "60px", "60px"]}
            >
              <SocialCard profile={profile} />
            </Center>
            <Center
              w="full"
              textAlign="center"
              // mb={["30px", "70px", "70px"]}
            >
              <Text
                textTransform="uppercase"
                fontSize={["13px", "sm", "sm"]}
                color="#ababab"
                width={["175px", "full", "full"]}
              >
                © copyright 2022 artzero <br />
                all rights reserved
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
    // <Flex w={[0, "full", "full"]}>
    <Flex w="full">
      <SearchBox />

      <HStack
        spacing={{ xl: "35px", "2xl": "55px" }}
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
      <WalletSelector display={{ base: "none", md: "flex" }} />
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
          transition="all 0.2s"
          as={Button}
          p={0}
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

const profile = [
  { discord: "https://discord.gg/wzkZ2JTvN4" },
  { twitter: "https://twitter.com/ArtZero_io" },
  { medium: "https://medium.com/@artzero_io" },
  { telegram: "https://t.me/artzero_io" },
  { mail: "mailto:admin@artzero.io" },
];

// const SearchBar = () => {
//   return (
//     <>
//       <InputGroup
//         maxW="400px"
//         minW={{ base: "auto", xl: "100px", "2xl": "400px" }}
//         bg="transparent"
//         h={14}
//         py={1}
//         mx={{ base: "auto", xl: "20px", "2xl": "60px" }}
//         color="brand.darkGray"
//         borderWidth="0"
//         borderRadius="0"
//         borderColor="#ffffff25"
//         borderBottomWidth="2px"
//       >
//         <InputRightElement
//           transform="translateX(22px)"
//           bg="transparent"
//           h="full"
//           w={16}
//           cursor="pointer"
//         >
//           <FiSearch size="22px" p="0" />
//         </InputRightElement>{" "}
//         <Input
//           hidden
//           variant="unstyled"
//           my={1}
//           pl={0}
//           color="#fff"
//           fontSize="lg"
//           bg="transparent"
//           placeholder="Search items, collections, and accounts"
//           _placeholder={{
//             color: "brand.darkGray",
//             fontSize: "lg",
//           }}
//         />
//       </InputGroup>
//     </>
//   );
// };
