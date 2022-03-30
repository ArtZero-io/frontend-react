import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "../../utils/substrate/SubstrateContext";
import AzeroIcon from "@theme/assets/icon/Azero.png";

function WalletMenu() {
  const { api, currentAccount } = useSubstrateState();
  const [accountBalance, setAccountBalance] = useState(0);
  const { activeAddress } = useSelector((s) => s.account);

  useEffect(() => {
    let unsubscribe;

    api &&
      currentAccount &&
      activeAddress &&
      api.query.system
        .account(activeAddress, (balance) => {
          const balToHuman = balance.data.free.toHuman();
          const balSZERO = balToHuman.slice(0, balToHuman.length - 16);
          setAccountBalance(balSZERO ? balSZERO : 0);
        })
        .then((unsub) => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount, activeAddress, accountBalance]);

  return currentAccount ? (
    <Flex
      bg="brand.grayDark"
      color="white"
      minW={24}
      height="12"
      px="4"
      alignItems="center"
      justifyContent="end"
    >
      <Text> {accountBalance}</Text>
      <Avatar
        src={AzeroIcon}
        h={5}
        w={5}
        ml={2}
        name="AzeroLogo"
        bg="transparent"
      />
    </Flex>
  ) : null;
}

export default WalletMenu;
