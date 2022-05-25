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
import { truncateStr } from "@utils/index";

function WalletSelector() {
  const dispatch = useDispatch();
  const [, setActiveAddressLocal] = useLocalStorage("activeAddress");
  const { setCurrentAccount, state } = useSubstrate();
  const { keyring, currentAccount } = state;

  const keyringOptions = keyring.getPairs().map((account) => ({
    key: account.address,
    address: account.address,
    name: account.meta.name,
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
    <>
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
            _active={{ bg: "black", borderBottom: 0 }}
            bg="black"
            borderRadius="0"
            border="2px #7ae7ff solid"
            fontFamily="Oswald, sans-serif"
            color="brand.blue"
            ring={0}
            // minW={64}
            // maxW={64}
            mx="10px"
            p="0"
            pl="15px"
            w="250px"
            h="50px"
            as={Button}
            rightIcon={<ChevronDownIcon fontSize="3xl" w="30px" m="0" />}
            fontSize="lg"
            textTransform="capitalize"
            lineHeight="38px"
          >
            <Flex justifyContent="start" w="full">
              <Text w="78px" isTruncated mr="2px" textAlign="left">
                {currentAccount?.meta?.name}
              </Text>
              <Text> - {truncateStr(currentAccount?.address, 6)}</Text>
            </Flex>
          </MenuButton>
          <MenuList
            // minW={64}
            // maxW={64}
            w="250px"
            borderRadius="0"
            borderWidth="2px"
            borderColor="brand.blue"
            bg="black"
            borderTop="0"
            px="15px"
            py="0"
          >
            {keyringOptions.map(({ address, name }) => (
              <MenuItem
                key={address}
                fontFamily="Oswald"
                textTransform="capitalize"
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
                  <Text w="78px" isTruncated mr="2px" textAlign="left">
                    {name}
                  </Text>
                  <Text> - {truncateStr(address, 6)}</Text>
                  {/* {address.slice(0, 6)} ... {address.slice(-6)} */}
                  {/* <Box w="24px"></Box> */}
                </Flex>
              </MenuItem>
            ))}
            <Spacer />
            <MenuItem
              _hover={{ color: "brand.blue" }}
              color="white"
              textDecoration="underline"
              fontFamily="Oswald"
              onClick={() => logoutHandler()}
              fontSize="lg"
              p="0"
              textTransform="capitalize"
              lineHeight="26.68px"
              my="18px"
              bg="black"
            >
              Disconnect Wallet
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
    <WalletNotConnected {...props} />
  );
}
