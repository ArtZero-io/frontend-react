import React, { useEffect, useMemo } from "react";

import {
  useSubstrate,
  useSubstrateState,
} from "@utils/substrate/SubstrateContext";

import WalletNotConnected from "./WalletNotConnected";
import WalletMenu from "./WalletMenu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "../../store/types/account.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { truncateStr } from "@utils/index";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

function WalletSelector({ display }) {
  const { path } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [, setActiveAddressLocal] = useLocalStorage("activeAddress");
  const { setCurrentAccount, doLogOut, state } = useSubstrate();
  const { keyring, currentAccount } = state;

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

  useEffect(() => {
    if (!currentAccount && initialAddress?.length > 0) {
      const currAccount = keyringOptions.find(
        (item) => item.address === initialAddress
      );

      setCurrentAccount(currAccount);

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
    keyringOptions,
  ]);

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

  return (
    <>
      <Flex
        display={display}
        align="center"
        justify="space-between"
        height="full"
        maxH="55px"
        px={{ base: "10px", md: "auto" }}
        mb={{ base: "20px", md: "auto" }}
        flexDirection={{ md: "colum" }}
      >
        <Menu autoSelect={false} placement="bottom-end" offset={[-0, -1]}>
          <MenuButton
            _hover={{ bg: "brand.grayDark" }}
            _active={{ bg: "black", borderBottom: 0 }}
            bg="black"
            borderRadius="0"
            border="2px #7ae7ff solid"
            fontFamily="Oswald, sans-serif"
            color="brand.blue"
            ring={0}
            // mx={{ base: "15px", md: "10px" }}
            mx={"10px"}
            p="0"
            pl="15px"
            w="180px"
            h="50px"
            as={Button}
            rightIcon={<ChevronDownIcon fontSize="3xl" w="30px" m="0" />}
            fontSize="lg"
            textTransform="none"
            lineHeight="38px"
          >
            <Flex justifyContent="start" w="full">
              {/* <Text w="54px" isTruncated mr="2px" textAlign="left">
                {currentAccount?.meta?.name}
              </Text>
              <Text> - {truncateStr(currentAccount?.address, 6)}</Text> */}
              <Text>
                {currentAccount?.addressDomain ??
                  truncateStr(currentAccount?.address, 6)}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList
            minW="180px"
            w="180px"
            borderRadius="0"
            borderWidth="2px"
            borderColor="brand.blue"
            bg="black"
            borderTop="0"
            px="15px"
            py="0"
            // ml={{ base: "5px", lg: "auto" }}
          >
            {keyringOptions.map(({ address, name, addressDomain }) => (
              <MenuItem
                w="160px"
                key={address}
                fontFamily="Oswald"
                textTransform="none"
                onClick={() => selectAccountHandler(address)}
                display={currentAccount?.address === address ? "none" : ""}
                p="0"
                lineHeight="38px"
              >
                <Flex
                  _hover={{ color: "#fff" }}
                  w="full"
                  fontSize="lg"
                  justifyContent="start"
                  color="#888"
                  lineHeight="38px"
                >
                  {/* <Text w="54px" isTruncated mr="2px" textAlign="left">
                    {name}
                  </Text>
                  <Text> - {addressDomain ?? truncateStr(address, 6)}</Text> */}
                  <Text>{addressDomain ?? truncateStr(address, 6)}</Text>
                </Flex>
              </MenuItem>
            ))}
            <Spacer display={{ base: "none", md: "flex" }} />
            <MenuItem
              _hover={{ color: "brand.blue", bg: "black" }}
              color="white"
              textDecoration="underline"
              fontFamily="Oswald"
              onClick={() => logoutHandler()}
              fontSize="lg"
              p="0"
              textTransform="capitalize"
              lineHeight="26.68px"
              bg="black"
            >
              <Text as="span" my="18px">
                Disconnect Wallet
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

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
