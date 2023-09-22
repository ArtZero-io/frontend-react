import React, { useEffect, useState, useMemo } from "react";

import {
  useSubstrate,
  useSubstrateState,
} from "@utils/substrate/SubstrateContext";

import WalletNotConnected from "./WalletNotConnected";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  TagRightIcon,
  TagLabel,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  useClipboard,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  useBreakpointValue,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "../../store/types/account.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { truncateStr } from "@utils/index";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { PiCopy } from "react-icons/pi";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import BN from "bn.js";
import { shortenNumber } from "@utils";
import * as ROUTES from "@constants/routes";
import { formMode } from "@constants";
import { Link as ReactRouterLink } from "react-router-dom";
import AddNewCollectionModal from "@pages/account/collections/components/Modal/AddNew";
import MenuGeneralIcon from "@theme/assets/icon/MenuGeneral.js";
import MenuCollectionIcon from "@theme/assets/icon/MenuCollection.js";
import MenuNftIcon from "@theme/assets/icon/MenuNft.js";
import MenuStakeIcon from "@theme/assets/icon/MenuStake.js";
import MenuProjectIcon from "@theme/assets/icon/MenuProject.js";
import MenuActivityIcon from "@theme/assets/icon/MenuActivity.js";
import MenuDisconnectIcon from "@theme/assets/icon/MenuDisconnect.js";
import MenuSwitchIcon from "@theme/assets/icon/MenuSwitch.js";
import ChainDropdown from "../Dropdown/ChainDropdown";
import { SCROLLBAR } from "@constants";

function WalletSelector({ display }) {
  const { path } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [, setActiveAddressLocal] = useLocalStorage("activeAddress");
  const { setCurrentAccount, doLogOut, state } = useSubstrate();
  const { api, keyring, currentAccount } = state;

  const keyringOptions = keyring.getPairs().map((account) => {
    return {
      ...account,
      key: account.address,
      address: account.address,
      name: account.meta.name,
      addressDomain: account.meta.addressDomain,
    };
  });

  const initialAddress =
    keyringOptions?.length > 0 ? keyringOptions[0].address : "";

  useEffect(
    () => {
      const currAccount = keyringOptions.find(
        (item) => item.address === initialAddress
      );

      setCurrentAccount(currAccount);

      dispatch({
        type: AccountActionTypes.SET_ACTIVE_ADDRESS,
        payload: initialAddress,
      });

      setActiveAddressLocal(initialAddress);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function selectAccountHandler(address) {
    const currAccount = keyringOptions.find((item) => item.address === address);

    setCurrentAccount(currAccount);
    dispatch({
      type: AccountActionTypes.SET_ACTIVE_ADDRESS,
      payload: address,
    });
    setActiveAddressLocal(address);
  }

  function logoutHandler() {
    dispatch({ type: "SET_CURRENT_ACCOUNT", payload: null });

    doLogOut();

    window.localStorage.clear();

    history.push(path);
  }

  const { hasCopied, onCopy } = useClipboard(currentAccount?.address);

  useEffect(() => {
    hasCopied && toast.success("Copied to clipboard!");
  }, [hasCopied]);

  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    let unsubscribe;

    currentAccount &&
      api?.query.system
        .account(currentAccount.address, (balance) => {
          let oneSZERO = new BN(10 ** 12);
          let balSZERO = new BN(balance.data.free, 10, "le");
          let miscFrozenBalSZERO = new BN(balance.data.miscFrozen, 10, "le");
          // console.log(balance?.data.toHuman());
          if (balSZERO.gt(oneSZERO)) {
            balSZERO =
              balSZERO.div(new BN(10 ** 12)).toNumber() -
              miscFrozenBalSZERO.div(new BN(10 ** 12)).toNumber();
          } else {
            balSZERO = balSZERO.toNumber() / 10 ** 12;
          }
          // console.log('balSZERO - freeze', balSZERO);
          if (balSZERO >= 1) {
            balSZERO = shortenNumber(balSZERO);
          } else {
            balSZERO = parseFloat(balSZERO).toFixed(3);
          }
          setAccountBalance(balSZERO);
        })
        .then((unsub) => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [currentAccount?.address, api, currentAccount]);

  const [isBigScreen] = useMediaQuery("(min-width: 480px)");

  return isBigScreen ? (
    <Flex
      display={display}
      maxH="55px"
      height="full"
      w={["full", "auto"]}
      align="center"
      justify="space-between"
      pl={{ base: "10px", md: "auto" }}
      mb={{ base: "20px", md: "auto" }}
      ml={{ base: "10px", md: "auto" }}
      flexDirection={{ md: "colum" }}
    >
      <Menu autoSelect={false} placement="bottom-end" offset={[0, 25]}>
        <MenuButton
          _hover={{ bg: "transparent", border: 0 }}
          _active={{ bg: "transparent", border: 0 }}
          _focus={{ bg: "transparent", border: 0 }}
          ring={0}
          p="0"
          w="160px"
          h="40px"
          bg="black"
          as={Button}
          borderRadius="0"
          color="brand.blue"
          border="0px #7ae7ff solid"
          fontSize="lg"
          lineHeight="38px"
          textTransform="none"
          rightIcon={<ChevronDownIcon fontSize="3xl" w="30px" m="0" />}
        >
          <Flex
            w="full"
            h="40px"
            alignItems="start"
            flexDirection="column"
            justifyContent="start"
          >
            <Text
              isTruncated
              maxW="120px"
              color="#fff"
              fontSize="15px"
              textAlign="left"
              lineHeight="20px"
              textTransform="lowercase"
              fontFamily="Evogria,sans-serif"
            >
              {currentAccount?.meta?.name}
            </Text>
            <Text
              fontSize="15px"
              lineHeight="20px"
              fontFamily="Oswald, sans-serif"
            >
              {currentAccount?.addressDomain ??
                truncateStr(currentAccount?.address, 5)}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList
          minW="260px"
          display="flex"
          flexDirection="column"
          borderRadius="0"
          borderWidth="2px"
          borderColor="brand.blue"
          bg="#222"
        >
          <Flex borderBottom="2px #303030 solid" p="20px" pt="12px" pb="18px">
            <Flex alignItems="center">
              <Flex
                width="40px"
                height="40px"
                alignItems="center"
                justifyContent="center"
                mr="12px"
              >
                <Image
                  src="https://registry.nightly.app/wallets/nightly/default.png"
                  alt={currentAccount?.meta?.source}
                />
              </Flex>
              <Flex
                w="full"
                h="48px"
                alignItems="start"
                flexDirection="column"
                justifyContent="start"
              >
                <Flex>
                  <Text
                    pr="12px"
                    isTruncated
                    maxW="120px"
                    color="#fff"
                    fontSize="15px"
                    textAlign="left"
                    lineHeight="20px"
                    textTransform="lowercase"
                    fontFamily="Evogria,sans-serif"
                  >
                    {currentAccount?.meta?.name}
                  </Text>{" "}
                  <PiCopy
                    onClick={onCopy}
                    w="18px"
                    h="18px"
                    color="#999999"
                    cursor="pointer"
                  />
                </Flex>

                <Flex
                  alignItems="center"
                  variant="grayBg"
                  height="28px"
                  minW="fit-content"
                  bg="transparent"
                >
                  <TagLabel color="#7ae7ff" fontSize="18px">
                    {accountBalance}
                  </TagLabel>
                  <TagRightIcon as={AzeroIcon} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex p="20px" pb="12px" display="flex" flexDirection="column">
            <WalletSubmenu
              keyringOptions={keyringOptions}
              selectAccountHandler={selectAccountHandler}
            />

            {myAccountList?.slice(0, 1)?.map((item, idx) => (
              <MenuItem
                to="#"
                key={idx}
                ml={["20px", "auto"]}
                py={["4px", "12px"]}
                p={["4px", "10px"]}
                as={ReactRouterLink}
                fontFamily="Evogria, sans-serif"
                fontSize={{ base: "18px", md: "15px" }}
                _hover={{ color: "brand.blue", bg: "black" }}
                onClick={() =>
                  item?.isExternal
                    ? window.open(item.href, "_blank")
                    : history.push(item.href)
                }
              >
                {item.icon}
                <Text ml="10px">{item.label}</Text>
              </MenuItem>
            ))}

            {currentAccount?.address && (
              <AddNewCollectionModal mode={formMode.ADD} variant="navbar" />
            )}

            {myAccountList
              ?.slice(1, myAccountList?.length)
              ?.map((item, idx) => (
                <MenuItem
                  to="#"
                  key={idx}
                  ml={["20px", "auto"]}
                  py={["4px", "12px"]}
                  px={["4px", "10px"]}
                  _hover={{ color: "brand.blue", bg: "black" }}
                  as={ReactRouterLink}
                  fontFamily="Evogria, sans-serif"
                  fontSize={{ base: "18px", md: "15px" }}
                  onClick={() =>
                    item?.isExternal
                      ? window.open(item.href, "_blank")
                      : history.push(item.href)
                  }
                >
                  {item.icon}
                  <Text ml="10px">{item.label}</Text>
                </MenuItem>
              ))}
            <MenuItem
              _hover={{ color: "brand.blue", bg: "black" }}
              color="white"
              onClick={() => logoutHandler()}
              fontSize={{ base: "18px", md: "15px" }}
              ml={["20px", "auto"]}
              py={["4px", "12px"]}
              px={["4px", "10px"]}
            >
              <MenuDisconnectIcon />
              <Text ml="10px">disconnect wallet</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  ) : (
    <WalletSubDrawer
      display={display}
      onCopy={onCopy}
      accountBalance={accountBalance}
      logoutHandler={logoutHandler}
      keyringOptions={keyringOptions}
      selectAccountHandler={selectAccountHandler}
    />
  );
}

export default function AccountSelector(props) {
  const { keyring, api } = useSubstrateState();

  const isWalletConnect = useMemo(() => {
    const walletPairs = keyring?.getPairs();

    return walletPairs?.length && api?.query;
  }, [api?.query, keyring]);

  return isWalletConnect ? (
    <WalletSelector {...props} />
  ) : (
    <WalletNotConnected {...props} />
  );
}

const myAccountList = [
  { label: "General", href: ROUTES.ACCOUNT, icon: <MenuGeneralIcon /> },
  {
    label: "My Collections",
    href: ROUTES.ACCOUNT_MY_COLLECTIONS,
    icon: <MenuCollectionIcon />,
  },
  { label: "My NFTs", href: ROUTES.ACCOUNT_MY_NFTS, icon: <MenuNftIcon /> },
  {
    label: "My Stakes",
    href: ROUTES.ACCOUNT_MY_STAKES,
    icon: <MenuStakeIcon />,
  },
  {
    label: "My Projects",
    href: ROUTES.ACCOUNT_MY_PROJECTS,
    icon: <MenuProjectIcon />,
  },
  {
    label: "My Activities",
    href: ROUTES.ACCOUNT_MY_ACTIVITIES,
    icon: <MenuActivityIcon />,
  },
];

function WalletSubmenu({ keyringOptions, selectAccountHandler }) {
  const { currentAccount } = useSubstrateState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue(["xs", "md"]);

  return (
    <>
      <Flex
        alignItems="center"
        w="full"
        h={["54px", "48px"]}
        cursor="pointer"
        color="white"
        fontFamily="Evogria, sans-serif"
        _hover={{ color: "brand.blue", bg: "black" }}
        ml={["0px", "auto"]}
        py={["4px", "12px"]}
        px={["0px", "10px"]}
        fontSize={{ base: "18px", md: "16px" }}
        onClick={() =>
          keyringOptions?.length === 1
            ? toast("You have only 1 account!")
            : onOpen()
        }
      >
        <MenuSwitchIcon />
        <Text ml="10px">switch account</Text>
      </Flex>
      <Modal
        isCentered
        size={modalSize}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          borderRadius="0"
          position="relative"
          bg="brand.grayDark"
          px={["4px", "24px", "24px"]}
          py={["4px", "14px"]}
        >
          <ModalCloseButton
            borderWidth={2}
            borderRadius="0"
            position="absolute"
            _hover="none"
            bg="#171717"
            top="4"
            right="4"
          />

          <ModalHeader textAlign="center" borderBottom="2px #303030 solid">
            <Heading fontSize={["xl", "24px"]}>choose account</Heading>
          </ModalHeader>

          <ModalBody px="0px" w="full" overflowY="auto" sx={SCROLLBAR}>
            <Flex
              w="full"
              minW="260px"
              display="flex"
              bg="#222"
              flexDirection="column"
            >
              {keyringOptions?.map(({ address, name, addressDomain }) => (
                <Flex
                  w="full"
                  to="#"
                  key={address}
                  py={["4px"]}
                  as={ReactRouterLink}
                  fontFamily="Evogria, sans-serif"
                  fontSize={{ base: "18px", md: "15px" }}
                  _hover={{ color: "brand.blue", bg: "black" }}
                  onClick={() => {
                    selectAccountHandler(address);
                    onClose();
                  }}
                  display={currentAccount?.address === address ? "none" : ""}
                >
                  <Flex alignItems="center" pl="10px">
                    <Flex
                      width="40px"
                      height="40px"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        src="https://registry.nightly.app/wallets/nightly/default.png"
                        alt={currentAccount?.meta?.source}
                      />
                    </Flex>
                    <Flex
                      pl="10px"
                      w="full"
                      h="70px"
                      alignItems="start"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Text
                        isTruncated
                        maxW="90%"
                        minW="90%"
                        mr="10px"
                        mb="4px"
                        color="#fff"
                        fontSize="15px"
                        textAlign="left"
                        lineHeight="20px"
                        textTransform="lowercase"
                        fontFamily="Evogria,sans-serif"
                      >
                        {name}
                      </Text>
                      <Text
                        fontSize="16px"
                        lineHeight="20px"
                        textTransform="none"
                        fontFamily="Oswald, sans-serif"
                      >
                        {addressDomain ?? truncateStr(address, 5)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function WalletSubDrawer({
  display,
  onCopy,
  accountBalance,
  logoutHandler,
  keyringOptions,
  selectAccountHandler,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentAccount } = useSubstrateState();
  const history = useHistory();

  return (
    <Flex
      display={display}
      height="full"
      w={["full", "auto"]}
      align="center"
      justify="space-between"
      pl={{ base: "10px", md: "auto" }}
      mb={{ base: "20px", md: "auto" }}
      ml={{ base: "10px", md: "auto" }}
      flexDirection={{ md: "colum" }}
    >
      <Button
        height="full"
        onClick={onOpen}
        _hover={{ bg: "transparent", border: 0 }}
        _active={{ bg: "transparent", border: 0 }}
        _focus={{ bg: "transparent", border: 0 }}
        ring={0}
        px="0"
        pb="15px"
        bg="#080E09"
        as={Button}
        borderRadius="0"
        color="#fff"
        textTransform="none"
        w="95%"
        rightIcon={<ChevronRightIcon fontSize="3xl" w="30px" m="0" />}
        borderBottom="2px #333 solid"
      >
        <Flex
          w="full"
          alignItems="start"
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            mb="8px"
            isTruncated
            maxW="90%"
            color="#fff"
            fontSize="24px"
            textAlign="left"
            textTransform="lowercase"
            fontFamily="Evogria,sans-serif"
          >
            {currentAccount?.meta?.name}
          </Text>
          <Text
            fontSize="18px"
            lineHeight="20px"
            fontFamily="Oswald, sans-serif"
          >
            {currentAccount?.addressDomain ??
              truncateStr(currentAccount?.address, 5)}
          </Text>
        </Flex>
      </Button>
      <Drawer size="full" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#080E09">
          <DrawerCloseButton
            right="14px"
            top="16px"
            borderRadius="0"
            color="#fff"
          />
          <DrawerHeader pl="18px" bg="transparent">
            <Flex minH="30px" justifyContent="start" alignItems="center">
              <DrawerCloseButton
                right="14px"
                top="16px"
                borderRadius="0"
                color="#fff"
              />

              <ChainDropdown />
            </Flex>
          </DrawerHeader>
          <Flex pl="10px" alignItems="center">
            <ChevronLeftIcon fontSize="3xl" w="30px" m="0" />

            <Button
              variant="ghost"
              size="sm"
              px="8px"
              onClick={onClose}
              fontFamily="Oswald, sans-serif"
              textTransform="capitalize"
              fontSize="18px"
            >
              Back
            </Button>
          </Flex>
          <DrawerBody>
            <Flex
              minW="260px"
              display="flex"
              flexDirection="column"
              borderRadius="0"
              borderWidth="0px"
            >
              <Flex borderBottom="2px #303030 solid" pt="12px" pb="18px">
                <Flex alignItems="center">
                  <Flex
                    width="40px"
                    height="40px"
                    alignItems="center"
                    justifyContent="center"
                    mr="12px"
                  >
                    <Image
                      src="https://registry.nightly.app/wallets/nightly/default.png"
                      alt={currentAccount?.meta?.source}
                    />
                  </Flex>
                  <Flex
                    w="full"
                    h="48px"
                    alignItems="start"
                    flexDirection="column"
                    justifyContent="start"
                  >
                    <Flex>
                      <Text
                        maxW="200px"
                        color="#fff"
                        fontSize="15px"
                        textAlign="left"
                        lineHeight="20px"
                        textTransform="lowercase"
                        fontFamily="Evogria,sans-serif"
                      >
                        {currentAccount?.meta?.name}
                      </Text>{" "}
                      <PiCopy
                        onClick={onCopy}
                        w="18px"
                        h="18px"
                        color="#999999"
                        cursor="pointer"
                      />
                    </Flex>

                    <Flex
                      alignItems="center"
                      variant="grayBg"
                      height="28px"
                      minW="fit-content"
                      bg="transparent"
                    >
                      <TagLabel color="#7ae7ff" fontSize="18px">
                        {accountBalance}
                      </TagLabel>
                      <TagRightIcon as={AzeroIcon} />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex pb="12px" display="flex" flexDirection="column">
                <WalletSubmenu
                  keyringOptions={keyringOptions}
                  selectAccountHandler={selectAccountHandler}
                />
                {myAccountList?.slice(0, 1)?.map((item, idx) => (
                  <Flex
                    h="54px"
                    alignItems="center"
                    to="#"
                    key={idx}
                    py={["4px", "12px"]}
                    as={ReactRouterLink}
                    fontFamily="Evogria, sans-serif"
                    fontSize={{ base: "18px", md: "15px" }}
                    _hover={{ color: "brand.blue", bg: "black" }}
                    onClick={() =>
                      item?.isExternal
                        ? window.open(item.href, "_blank")
                        : history.push(item.href)
                    }
                  >
                    {item.icon}
                    <Text ml="10px">{item.label}</Text>
                  </Flex>
                ))}

                {currentAccount?.address && (
                  <AddNewCollectionModal mode={formMode.ADD} variant="navbar" />
                )}

                {myAccountList
                  ?.slice(1, myAccountList?.length)
                  ?.map((item, idx) => (
                    <Flex
                      h="54px"
                      alignItems="center"
                      to="#"
                      key={idx}
                      py={["4px", "12px"]}
                      _hover={{ color: "brand.blue", bg: "black" }}
                      as={ReactRouterLink}
                      fontFamily="Evogria, sans-serif"
                      fontSize={{ base: "18px", md: "15px" }}
                      onClick={() =>
                        item?.isExternal
                          ? window.open(item.href, "_blank")
                          : history.push(item.href)
                      }
                    >
                      {item.icon}
                      <Text ml="10px">{item.label}</Text>
                    </Flex>
                  ))}
                <Flex
                  h="54px"
                  alignItems="center"
                  _hover={{ color: "brand.blue", bg: "black" }}
                  color="white"
                  onClick={() => logoutHandler()}
                  fontSize={{ base: "18px", md: "15px" }}
                  py={["4px", "12px"]}
                  fontFamily="Evogria, sans-serif"
                >
                  <MenuDisconnectIcon />
                  <Text ml="10px">disconnect wallet</Text>
                </Flex>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
