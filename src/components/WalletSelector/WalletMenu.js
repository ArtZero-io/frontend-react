import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "../../utils/substrate/SubstrateContext";
import AzeroIcon from "@theme/assets/icon/Azero.js";

function WalletMenu() {
  const { api, currentAccount } = useSubstrateState();
  const [accountBalance, setAccountBalance] = useState(0);
  const { activeAddress } = useSelector((s) => s.account);

  useEffect(() => {
    let unsubscribe;
    // TODO: Update balance to Number Format
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
    <Tag variant="grayBg" size="2xl" minW={24} justifyContent="end">
      <TagLabel>{accountBalance}</TagLabel>
      <TagRightIcon as={AzeroIcon} />
    </Tag>
  ) : null;
}

export default WalletMenu;
