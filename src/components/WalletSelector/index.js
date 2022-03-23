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
import { useHistory } from "react-router-dom";

function WalletSelector(props) {
  const dispatch = useDispatch();

  const { setCurrentAccount, state } = useSubstrate();
  const { keyring, currentAccount, walletPendingApprove } = state;

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
    }
  }, [
    dispatch,
    currentAccount,
    setCurrentAccount,
    keyring,
    initialAddress,
    walletPendingApprove,
  ]);

  function selectAccountHandler(address) {
    setCurrentAccount(keyring.getPair(address));
    dispatch({
      type: AccountActionTypes.SET_ACTIVE_ADDRESS,
      payload: address,
    });
  }
  const history = useHistory();

  function logoutHandler() {
    window.location.reload();
    history.push("/home");
  }
  return (
    <Box color="blackAlpha.900" height="100%" mx="auto" w="28rem">
      <Flex
        align="center"
        justify="space-between"
        height="100%"
        mx="2"
        flexDirection={{ md: "colum" }}
      >
        <Menu>
          <MenuButton
            ringColor="transparent"
            ring={0}
            minW={72}
            mx="0"
            h="8"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {currentAccount?.meta?.name} - {currentAccount?.address.slice(0, 6)}{" "}
            ... {currentAccount?.address.slice(-6)}
          </MenuButton>
          <MenuList>
            {keyringOptions.map(({ address, name }) => (
              <MenuItem
                onClick={() => selectAccountHandler(address)}
                key={address}
                isDisabled={currentAccount?.address === address ? true : false}
              >
                {name} - {address.slice(0, 6)} ... {address.slice(-6)}
              </MenuItem>
            ))}
            <Spacer />
            <MenuItem color="red" onClick={() => logoutHandler()}>
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
  console.log("walletPendingApprove", walletPendingApprove);
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
