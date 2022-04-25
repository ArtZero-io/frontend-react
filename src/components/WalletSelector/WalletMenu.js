import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import BN from "bn.js";

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
          let balSZERO = new BN(balance.data.free, 10, "le").div(new BN(10 ** 12)).toNumber();
          let formatter = Intl.NumberFormat('en', { notation: 'compact' });
          if (balSZERO >= 1) balSZERO = formatter.format(balSZERO);
          else balSZERO = parseFloat(balSZERO).toFixed(3)
          setAccountBalance(balSZERO);
        })
        .then((unsub) => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount, activeAddress, accountBalance]);

  return currentAccount ? (
    <Tag variant="grayBg" size="2xl" minW={24} justifyContent="end">
      <TagLabel>{accountBalance}</TagLabel>
      <TagRightIcon as={AzeroIcon} />
    </Tag>
  ) : null;
}

export default WalletMenu;
