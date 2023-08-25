/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";

import {
  useSubstrate,
  useSubstrateState,
} from "@utils/substrate/SubstrateContext";

import WalletNotConnected from "./WalletNotConnected";
import WalletMenu from "./WalletMenu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  TagRightIcon,
  TagLabel,
  Tag,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Spacer,
  Text,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "../../store/types/account.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { truncateStr } from "@utils/index";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { reformatAddress } from "@utils/substrate/SubstrateContext";
import { networkSS58 } from "@constants";
import SubwalletLogo from "@utils/wallets/SubWalletLogo.svg";
import PolkadotjsLogo from "@utils/wallets/PolkadotjsLogo.svg";
import AzeroSignerLogo from "@utils/wallets/AzeroSignerLogo.svg";
import AzeroChain from "@theme/assets/icon/AzeroChain";
import toast from "react-hot-toast";
import { PiCopy } from "react-icons/pi";
import AzeroIcon from "@theme/assets/icon/Azero.js";

import { useSelector } from "react-redux";
import BN from "bn.js";
import { shortenNumber } from "@utils";
import { motion } from "framer-motion";
// import toast from 'react-hot-toast';
import { CopyIcon } from "@chakra-ui/icons";
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

function WalletSelector({ display }) {
  const { path } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [, setActiveAddressLocal] = useLocalStorage("activeAddress");
  const { setCurrentAccount, doLogOut, state } = useSubstrate();
  const { api, keyring, currentAccount } = state;

  const keyringOptions = keyring.getPairs().map((account) => ({
    key: reformatAddress(account.address, networkSS58),
    address: reformatAddress(account.address, networkSS58),
    name: account.meta.name,
  }));

  const initialAddress =
    keyringOptions?.length > 0 ? keyringOptions[0].address : "";

  useEffect(() => {
    if (!currentAccount && initialAddress?.length > 0) {
      setCurrentAccount({
        ...keyring.getPair(initialAddress),
        address: initialAddress,
      });
      dispatch({
        type: AccountActionTypes.SET_ACTIVE_ADDRESS,
        payload: initialAddress,
      });

      setActiveAddressLocal(initialAddress);
    }
  }, [
    setActiveAddressLocal,
    dispatch,
    currentAccount,
    setCurrentAccount,
    keyring,
    initialAddress,
  ]);

  function selectAccountHandler(address) {
    setCurrentAccount({ ...keyring.getPair(address), address: address });
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
          let oneSZERO = new BN(10 ** 12).mul(new BN(10 ** 6));
          let balSZERO = new BN(balance.data.free, 10, "le");
          let miscFrozenBalSZERO = new BN(balance.data.miscFrozen, 10, "le");
          console.log("balSZERO", balSZERO);
          if (balSZERO.gt(oneSZERO)) {
            balSZERO =
              balSZERO
                .div(new BN(10 ** 12))
                .div(new BN(10 ** 6))
                .toNumber() -
              miscFrozenBalSZERO
                .div(new BN(10 ** 12))
                .div(new BN(10 ** 6))
                .toNumber();
          } else {
            balSZERO = balSZERO.toNumber() / 10 ** 18;
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

  return (
    <>
      <Flex
        display={display}
        maxH="55px"
        height="full"
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
                  {currentAccount?.meta?.source === "subwallet-js" && (
                    <Image
                      src={SubwalletLogo}
                      alt={currentAccount?.meta?.source}
                    />
                  )}
                  {currentAccount?.meta?.source === "polkadot-js" && (
                    <Image
                      src={PolkadotjsLogo}
                      alt={currentAccount?.meta?.source}
                    />
                  )}
                  {currentAccount?.meta?.source === "aleph-zero-signer" && (
                    <AzeroChain />
                  )}
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

            <Flex borderBottom="2px #303030 solid" p="20px" pt="12px" pb="18px">
              <WalletSubmenu
                keyringOptions={keyringOptions}
                selectAccountHandler={selectAccountHandler}
              />
            </Flex>

            <Flex p="20px" pb="12px" display="flex" flexDirection="column">
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
                <Text ml="10px">Disconnect Wallet</Text>
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <WalletMenu address={currentAccount?.address} />
      </Flex>
    </>
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

  return (
    <Menu placement="left-start" offset={[0, 30]}>
      <MenuButton
        disabled={keyringOptions?.length === 1}
        _hover={{ color: "brand.blue", bg: "black" }}
        w="full"
        h="48px"
      >
        <MenuItem
          isDisabled={keyringOptions?.length === 1}
          color="white"
          ml={["20px", "auto"]}
          py={["4px", "12px"]}
          px={["4px", "10px"]}
          fontSize={{ base: "18px", md: "15px" }}
        >
          <MenuSwitchIcon />
          <Text ml="10px">Switch Account</Text>
        </MenuItem>
      </MenuButton>
      <MenuList
        minW="260px"
        display="flex"
        bg="#222"
        flexDirection="column"
        borderRadius="0"
        borderWidth="2px"
        borderColor="brand.blue"
        px={["4px", "10px"]}
      >
        {keyringOptions?.map(({ address, name, addressDomain }) => (
          <MenuItem
            to="#"
            key={address}
            ml={["20px", "auto"]}
            px={["4px", "10px"]}
            py={["4px"]}
            as={ReactRouterLink}
            fontFamily="Evogria, sans-serif"
            fontSize={{ base: "18px", md: "15px" }}
            _hover={{ color: "brand.blue", bg: "black" }}
            onClick={() => selectAccountHandler(address)}
            display={currentAccount?.address === address ? "none" : ""}
          >
            <Flex w="full" h="40px" justifyContent="start" alignItems="center">
              <Text
                isTruncated
                maxW="120px"
                minW="120px"
                mr="10px"
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
                fontSize="15px"
                lineHeight="20px"
                textTransform="none"
                fontFamily="Oswald, sans-serif"
              >
                {addressDomain ?? truncateStr(address, 5)}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
