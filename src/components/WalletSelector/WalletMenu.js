import {
  Flex,
  IconButton,
  Tag,
  TagLabel,
  useClipboard,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "@utils/substrate/SubstrateContext";
import AzeroIcon from "@theme/assets/icon/Azero.js";
import BN from "bn.js";
import { shortenNumber } from "@utils";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CopyIcon } from "@chakra-ui/icons";

function WalletMenu() {
  const { api, currentAccount, chainToken, chainDecimal } = useSubstrateState();
  const [accountBalance, setAccountBalance] = useState(0);
  const { activeAddress } = useSelector((s) => s.account);

  useEffect(() => {
    let unsubscribe;
    api &&
      currentAccount &&
      activeAddress &&
      api.query.system
        .account(activeAddress, (balance) => {
          const chainDecimalSplit = chainDecimal - 12;

          let oneSZERO = new BN(10 ** 12).mul(new BN(10 ** chainDecimalSplit));
          let balSZERO = new BN(balance.data.free, 10, "le");
          let miscFrozenBalSZERO = new BN(balance.data.miscFrozen, 10, "le");

          if (balSZERO.gt(oneSZERO)) {
            balSZERO =
              balSZERO
                .div(new BN(10 ** 12))
                .div(new BN(10 ** chainDecimalSplit))
                .toNumber() -
              miscFrozenBalSZERO
                .div(new BN(10 ** 12))
                .div(new BN(10 ** chainDecimalSplit))
                .toNumber();
          } else {
            balSZERO = balSZERO.toNumber() / 10 ** chainDecimal;
          }
          // console.log("balSZERO - freeze", balSZERO);
          if (balSZERO >= 1) {
            balSZERO = shortenNumber(balSZERO);
          } else {
            balSZERO = parseFloat(balSZERO).toFixed(3);
          }
          console.log("balSZERO", balSZERO);
          setAccountBalance(balSZERO);
        })
        .then((unsub) => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [activeAddress, api, chainDecimal, currentAccount]);

  const { hasCopied, onCopy } = useClipboard(currentAccount?.address);

  useEffect(() => {
    hasCopied && toast.success("Copied to clipboard!");
  }, [hasCopied]);

  return currentAccount ? (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex alignItems="center">
          <IconButton
            display={["none", "flex"]}
            mr={2}
            size="icon"
            color="#fff"
            variant="iconOutline"
            aria-label="copy"
            icon={<CopyIcon w="18px" h="18px" />}
            onClick={onCopy}
          />

          <Tag variant="grayBg" size="2xl" minW={24} justifyContent="end">
            <TagLabel>{accountBalance}</TagLabel>
            <AzeroIcon chainToken={chainToken} />
          </Tag>
        </Flex>
      </motion.div>
    </>
  ) : null;
}

export default WalletMenu;
