import React, { useEffect } from "react";

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
  Box,
  Spacer,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "../../store/types/account.types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function WalletSelector(props) {
  const dispatch = useDispatch();
  const [, setActiveAddressLocal] = useLocalStorage("activeAddress");
  const { setCurrentAccount, state } = useSubstrate();
  const { keyring, currentAccount } = state;

  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    address: account.address,
    name: account.meta.name,
    icon: "user",
  }));

  const initialAddress =
    keyringOptions?.length > 0 ? keyringOptions[0].address : "";

  useEffect(() => {
    if (!currentAccount && initialAddress?.length > 0) {
      setCurrentAccount(keyring.getPair(initialAddress));
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
    setCurrentAccount(keyring.getPair(address));
    dispatch({
      type: AccountActionTypes.SET_ACTIVE_ADDRESS,
      payload: address,
    });
    setActiveAddressLocal(address);
  }

  function logoutHandler() {
    window.localStorage.clear();
    window.location.assign("/");
  }
  return (
    <Box color="brand.blue" height="100%" mx="auto" minW={96}>
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        mx="2"
        flexDirection={{ md: "colum" }}
      >
        <Menu autoSelect={false} placement="bottom-end" offset={[-0.5, -1]}>
          <MenuButton
            _hover={{ bg: "brand.grayDark" }}
            _active={{ bg: "transparent", borderBottom: 0 }}
            bg="transparent"
            borderRadius="0"
            borderWidth={2}
            borderColor="brand.blue"
            fontFamily="Oswald"
            color="brand.blue"
            ring={0}
            minW={72}
            mx="2"
            h="12"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {currentAccount?.meta?.name} - {currentAccount?.address.slice(0, 6)}{" "}
            ... {currentAccount?.address.slice(-6)}
          </MenuButton>
          <MenuList
            minW={72}
            borderRadius="0"
            borderWidth={2}
            borderColor="brand.blue"
            bg="transparent"
            borderTop="0" px={2}
          >
            {keyringOptions.map(({ address, name }) => (
              <MenuItem
                _hover={{ bg: "brand.grayLight", color: "white" }}
                fontFamily="Oswald"
                onClick={() => selectAccountHandler(address)}
                key={address}
                isDisabled={currentAccount?.address === address ? true : false}
              >
                {name} - {address.slice(0, 6)}...{address.slice(-6)}
              </MenuItem>
            ))}
            <Spacer />
            <MenuItem
              _hover={{ bg: "brand.grayLight", color: "brand.blue" }}
              color="white"
              textDecoration="underline"
              fontFamily="Oswald"
              onClick={() => logoutHandler()}
            >
              Disconnect wallet.
            </MenuItem>
          </MenuList>
        </Menu>
        <Spacer />
        <WalletMenu address={currentAccount?.address} />
      </Flex>
    </Box>
  );
}

export default function AccountSelector(props) {
  const { keyring, api, walletPendingApprove } = useSubstrateState();
  if (walletPendingApprove)
    return (
      <Box pr="2">
        <Alert status="warning" maxW="10rem" py="1">
          <AlertIcon />
          <Text fontSize="sm">Please approve on you wallet.</Text>
        </Alert>
      </Box>
    );

  return keyring?.getPairs && api?.query ? (
    <WalletSelector {...props} />
  ) : (
    <WalletNotConnected />
  );
}
