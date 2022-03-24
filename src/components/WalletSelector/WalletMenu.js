import { Box, Flex, Skeleton, Tag } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "../../utils/substrate/SubstrateContext";

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
    <Box height="100%" minW="30" w="32">
      <Flex align="center" justify="end" height="100%" w="100%">
        {!accountBalance && <Skeleton height="20px" />}
        <Tag size="lg">{accountBalance} SZERO</Tag>
      </Flex>
    </Box>
  ) : (
    <>0</>
  );
}

export default WalletMenu;
