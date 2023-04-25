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
  Show,
  Collapse,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Link,
  Icon,
  DrawerFooter,
} from "@chakra-ui/react";

import { NavLink } from "./NavLink";
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
import AddNewCollectionModal from "@pages/account/collections/components/Modal/AddNew";

import { formMode } from "@constants";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import C14Modal from "../Modal/C14Modal";

const links = [
  { label: "Marketplace", href: ROUTES.MARKETPLACE },
  { label: "Launchpad", href: ROUTES.LAUNCHPAD_BASE },
  // { label: "Stats", href: ROUTES.STATS },
];

const MobileNavContent = (props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  isOpen
    ? (document.body.style.position = "fixed")
    : (document.body.style.position = "static");

  const docHeight = () => {
    const doc = document.documentElement;

    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };

  window.addEventListener("resize", docHeight);

  docHeight();

  return (
    <>
      <Box
        w="full"
        style={{ marginTop: "0px" }}
        display={{ base: "block", md: "none" }}
        zIndex="sticky"
        // backdropBlur="2px"
        // position={scroll ? "fixed" : "sticky"}
        // backdropFilter={scroll ? "auto" : ""}
        // bg={scroll ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0)"}
      >
        <Flex
          align={"center"}
          h={["57.25px", "79px"]}
          justifyContent="space-between"
        >
          <Flex
            h="31.25px"
            alignItems="center"
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} mx="auto" />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              h="15px"
              w="20px"
              onClick={onToggle}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>

          <Flex justify={{ base: "center", md: "start" }}>
            <ArtZeroLogo
              height="20px"
              width="138px"
              alt="ArtZeroLogo"
              display={{ base: "flex", md: "none" }}
            />
          </Flex>

          <SearchDrawer
            mx="2"
            as="button"
            fontSize="2xl"
            color="white"
            onClick={onToggle}
            display={{ base: "flex", md: "none" }}
          />
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav isOpen={isOpen} onClose={onClose} />
        </Collapse>
      </Box>
    </>
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
          xl: "center",
        }}
        spacing={{ xl: "35px", "2xl": "55px" }}
        pl={{ base: "8px", md: "32px", xl: "50px" }}
        pr="10px"
        {...props}
      >
        {links.map((link, index) => (
          <NavLink.Desktop key={index} label={link.label} to={link.href} />
        ))}

        {/* {
          <NavLink.Desktop
            label="Stake2Earn"
            to={ROUTES.STAKE2EARN}
            isExternal={true}
          />
        } */}

        <NavLink.Desktop label="Stats" to={ROUTES.STATS} />
        <NavLink.Desktop label="Docs" to={ROUTES.DOCS} isExternal={true} />

        {currentAccount?.address && <MyAccountDropdown />}

        <C14Modal />
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
];

const MyAccountDropdown = () => {
  const history = useHistory();
  const location = useLocation();
  const { currentAccount } = useSubstrateState();

  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const [myAccOpen, setMyAccOpen] = useState(false);
  return (
    <Box px={{ base: "23px", lg: "0" }} py={{ base: "0px", lg: "0" }}>
      <Menu
        autoSelect={false}
        placement="bottom"
        offset={[-82, 12]}
        borderBottom="0"
        // borderColor={path.includes("/account/") ? "brand.blue" : "transparent"}
      >
        {/* Desktop button here */}
        <Show above="sm">
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
          </MenuButton>{" "}
        </Show>

        {/* Phone button here */}
        <Show below="sm">
          <MenuButton
            w={["full", "auto"]}
            p={0}
            ring={0}
            h="41px"
            py="10px"
            onClick={() => setMyAccOpen(!myAccOpen)}
            rightIcon={
              !myAccOpen ? (
                <ChevronDownIcon fontSize="2xl" />
              ) : (
                <ChevronUpIcon fontSize="2xl" />
              )
            }
            as={Button}
            display="flex"
            bg="transparent"
            textAlign="left"
            border="none"
            transition="all 0.2s"
            justifyContent="center"
            fontSize={{ base: "24px", md: "15px" }}
            _hover={{
              borderBottomColor: "brand.blue",
              color: "brand.blue",
              borderBottomWidth: "2px",
            }}
            _focus={{
              bg: "transparent",
            }}
            _active={{
              bg: "transparent",
              borderBottom: "none",
            }}
            borderColor={
              path.includes("/account/") ? "brand.blue" : "transparent"
            }
            color={path.includes("/account/") ? "brand.blue" : "#fff"}
          >
            my account
          </MenuButton>
        </Show>

        <MenuList
          px={["0", "15px"]}
          py={["0", "15px"]}
          minW="250px"
          borderWidth={["0px", "2px"]}
          borderRadius="0"
          bg={["black", "brand.grayDark"]}
          borderColor="brand.blue"
          // ml={{ base: "20px", lg: "auto" }}
        >
          {myAccountList?.slice(0, 1)?.map((item, idx) => (
            <MenuItem
              to="#"
              key={idx}
              ml={["20px", "auto"]}
              py={["4px", "12px"]}
              px={["4px", "15px"]}
              _hover={{ bg: "black" }}
              as={ReactRouterLink}
              fontFamily="Evogria, sans-serif"
              onClick={() =>
                item?.isExternal
                  ? window.open(item.href, "_blank")
                  : history.push(item.href)
              }
              fontSize={{ base: "18px", md: "15px" }}
            >
              {item.label}
            </MenuItem>
          ))}

          {currentAccount?.address && (
            <AddNewCollectionModal mode={formMode.ADD} variant="navbar" />
          )}

          {myAccountList?.slice(1, myAccountList?.length)?.map((item, idx) => (
            <MenuItem
              to="#"
              key={idx}
              ml={["20px", "auto"]}
              py={["4px", "12px"]}
              px={["4px", "15px"]}
              _hover={{ bg: "black" }}
              as={ReactRouterLink}
              fontFamily="Evogria, sans-serif"
              onClick={() =>
                item?.isExternal
                  ? window.open(item.href, "_blank")
                  : history.push(item.href)
              }
              fontSize={{ base: "18px", md: "15px" }}
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

const MobileNav = ({ onClose, isOpen }) => {
  return (
    <>
      <Drawer
        size="full"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        zIndex="popover"
      >
        <DrawerOverlay />

        <DrawerContent
          // minH="100vh"
          bg="#080E09"
          id="drawer-content"
          h="var(--doc-height)"
        >
          <DrawerHeader bg="transparent">
            <Flex minH="30px" justifyContent="center" alignItems="end">
              <DrawerCloseButton
                left="14px"
                top="22px"
                borderRadius="0"
                color="#fff"
              />

              <ArtZeroLogo
                alt="ArtZeroLogo"
                height="20px"
                width="138px"
                display={{ base: "flex", md: "none" }}
              />
            </Flex>
          </DrawerHeader>

          <Flex pt="28px" w="full">
            <WalletSelector display={{ base: "flex", md: "none" }} />
          </Flex>

          <DrawerBody px="18px">
            {NAV_ITEMS.map((navItem) => (
              <MobileNavItem
                key={navItem.label}
                onCloseMenu={onClose}
                {...navItem}
              />
            ))}
            
            <C14Modal />
          </DrawerBody>

          <DrawerFooter>
            <Flex
              w="full"
              direction="column"
              justifyContent="center"
              display={{ base: "flex", md: "none" }}
            >
              <Center w="full" textAlign="center">
                <SocialCard profile={profile} />
              </Center>

              <Center w="full" textAlign="center">
                <Text
                  color="#ababab"
                  fontSize={["13px", "sm"]}
                  width={["260px", "full"]}
                >
                  &copy; Copyright {new Date().getFullYear()} ArtZero. All
                  Rights Reserved
                </Text>
              </Center>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const MobileNavItem = ({ label, children, href, isExternal, onCloseMenu }) => {
  const history = useHistory();
  const { isOpen, onToggle } = useDisclosure();
  const { currentAccount } = useSubstrateState();

  const handleNavigate = (href) => {
    history.push(href);
    onCloseMenu();
  };

  if (isExternal === true)
    return (
      <Stack>
        <Link
          _hover={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          _focus={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          pb="14px"
          isExternal
          href={href}
          textDecoration="none"
        >
          <Text
            _hover={{
              textDecoration: "none",
              color: "#7ae7ff",
            }}
            _focus={{
              textDecoration: "none",
              color: "#7ae7ff",
            }}
            fontSize="32px"
            lineHeight="shorter"
            fontFamily="Evogria, sans-serif"
            color={isOpen ? "#7ae7ff" : "#fff"}
          >
            {label}
          </Text>
        </Link>
      </Stack>
    );

  if (label === "my account") {
    if (!currentAccount?.address) {
      return null;
    } else {
      return (
        <Stack
          pb="14px"
          spacing={4}
          onClick={children ? onToggle : () => handleNavigate(href)}
        >
          <Flex align={"center"} justify={"space-between"}>
            <Text
              _hover={{
                textDecoration: "none",
                color: "#7ae7ff",
              }}
              _active={{
                textDecoration: "none",
                color: "#7ae7ff",
              }}
              _focus={{
                textDecoration: "none",
                color: "#7ae7ff",
              }}
              fontSize="32px"
              lineHeight="shorter"
              fontFamily="Evogria, sans-serif"
              color={isOpen ? "#7ae7ff" : "#fff"}
            >
              {label}
            </Text>

            {children && (
              <Icon
                w={6}
                h={6}
                as={ChevronDownIcon}
                color={isOpen ? "#7ae7ff" : "#fff"}
                transition={"all .25s ease-in-out"}
                transform={isOpen ? "rotate(180deg)" : ""}
              />
            )}
          </Flex>

          <Collapse
            in={isOpen}
            animateOpacity
            style={{ marginTop: "0!important" }}
          >
            <Stack
              align={"start"}
              fontSize="18px"
              lineHeight="shorter"
              fontFamily="Evogria, sans-serif"
            >
              {children &&
                children.map((child) => (
                  <Text
                    py={"5px"}
                    key={child.label}
                    onClick={() => handleNavigate(child.href)}
                  >
                    {child.label}
                  </Text>
                ))}
            </Stack>
          </Collapse>
        </Stack>
      );
    }
  }

  return (
    <Stack
      pb="14px"
      spacing={4}
      onClick={children ? onToggle : () => handleNavigate(href)}
    >
      <Flex align={"center"} justify={"space-between"}>
        <Text
          _hover={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          _active={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          _focus={{
            textDecoration: "none",
            color: "#7ae7ff",
          }}
          fontSize="32px"
          lineHeight="shorter"
          fontFamily="Evogria, sans-serif"
          color={isOpen ? "#7ae7ff" : "#fff"}
        >
          {label}
        </Text>

        {children && (
          <Icon
            w={6}
            h={6}
            as={ChevronDownIcon}
            color={isOpen ? "#7ae7ff" : "#fff"}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          align={"start"}
          fontSize="18px"
          lineHeight="shorter"
          fontFamily="Evogria, sans-serif"
        >
          {children &&
            children.map((child) => (
              <Text
                py={"5px"}
                key={child.label}
                onClick={() => handleNavigate(child.href)}
              >
                {child.label}
              </Text>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "marketplace",
    href: ROUTES.MARKETPLACE,
  },
  {
    label: "launchpad",
    href: ROUTES.LAUNCHPAD_BASE,
  },
  // {
  //   label: "stake2earn",
  //   href: ROUTES.STAKE2EARN,
  //   isExternal: true,
  // },
  {
    label: "stats",
    href: ROUTES.STATS,
  },
  {
    label: "docs",
    href: ROUTES.DOCS,
    isExternal: true,
  },
  {
    label: "my account",
    children: [
      {
        label: "general",
        href: ROUTES.ACCOUNT,
      },
      {
        label: "my collections",
        href: ROUTES.ACCOUNT_MY_COLLECTIONS,
      },
      {
        label: "my NFTs",
        href: ROUTES.ACCOUNT_MY_NFTS,
      },
      {
        label: "my stakes",
        href: ROUTES.ACCOUNT_MY_STAKES,
      },
      {
        label: "my projects",
        href: ROUTES.ACCOUNT_MY_PROJECTS,
      },
    ],
  },
];
