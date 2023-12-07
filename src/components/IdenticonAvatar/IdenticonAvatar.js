import React from "react";
import { useSubstrateState } from "@utils/substrate";
import { Circle } from "@chakra-ui/react";
import Identicon from "@polkadot/react-identicon";

function IdenticonAvatar({ size, address }) {
  const { currentAccount } = useSubstrateState();

  return (
    <Circle bg="white">
      <Identicon
        size={size}
        theme="substrate"
        value={address ?? currentAccount?.address}
      />
    </Circle>
  );
}

export default IdenticonAvatar;
