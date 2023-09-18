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
            minW="180px"
            w="180px"
            borderRadius="0"
            borderWidth="2px"
            borderColor="brand.blue"
            bg="black"
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
