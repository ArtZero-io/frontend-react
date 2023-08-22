/* eslint-disable no-unused-vars */
import {
  Flex,
  // useClipboard,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSubstrateState } from '@utils/substrate/SubstrateContext';
import BN from 'bn.js';
import { shortenNumber } from '@utils';
import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
import { CopyIcon } from "@chakra-ui/icons";

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
          let oneSZERO = new BN(10 ** 12).mul(new BN(10 ** 6));
          let balSZERO = new BN(balance.data.free, 10, 'le');
          let miscFrozenBalSZERO = new BN(balance.data.miscFrozen, 10, 'le');
          console.log('balSZERO', balSZERO);
          if (balSZERO.gt(oneSZERO)) {
            balSZERO =
              balSZERO.div(new BN(10 ** 12)).div(new BN(10 ** 6)).toNumber() -
              miscFrozenBalSZERO.div(new BN(10 ** 12)).div(new BN(10 ** 6)).toNumber();
          } else {
            balSZERO = balSZERO.toNumber() / 10 ** 18;
          }
          // console.log('balSZERO - freeze', balSZERO);
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex alignItems="center">
          {/* <IconButton
            display={['none', 'flex']}
            mr={2}
            size="icon"
            color="#fff"
            variant="iconOutline"
            aria-label="copy"
            icon={<CopyIcon w="18px" h="18px" />}
            onClick={onCopy}
          /> */}

          {/* <Tag variant="grayBg" size="2xl" minW={24} justifyContent="end">
            <TagLabel>{accountBalance}</TagLabel>
            <TagRightIcon as={AzeroIcon} />
          </Tag> */}
        </Flex>
      </motion.div>
    </>
  ) : null;
}

export default WalletMenu;
