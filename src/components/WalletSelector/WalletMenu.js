import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import BN from "bn.js";
import { shortenNumber } from "@utils";
import { AnimatePresence, motion } from "framer-motion";

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
          let oneSZERO = new BN(10 ** 12);
          let balSZERO = new BN(balance.data.free, 10, "le");

          console.log(
            "bal mil-AZERO:",
            balSZERO.toHuman().slice(0, -16) +
              "." +
              balSZERO.toHuman().slice(-15, -8)
          );
          if (balSZERO.gt(oneSZERO)) {
            balSZERO = balSZERO.div(new BN(10 ** 12)).toNumber();
          } else {
            balSZERO = balSZERO.toNumber() / 10 ** 12;
          }

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
  }, [activeAddress, api, currentAccount]);

  return currentAccount ? (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Tag variant="grayBg" size="2xl" minW={24} justifyContent="end">
          <TagLabel>{accountBalance}</TagLabel>
          <TagRightIcon as={AzeroIcon} />
        </Tag>
      </motion.div>
    </AnimatePresence>
  ) : null;
}

export default WalletMenu;
