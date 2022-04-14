import React from "react";
import { useSubstrateState } from "../../../utils/substrate";
import { Circle } from "@chakra-ui/react";
import Identicon from "@polkadot/react-identicon";

function IdenticonAvatar({size}) {
  const { currentAccount } = useSubstrateState();

  return (
    <Circle bg="white">
      <Identicon value={currentAccount?.address} size={size} theme="substrate" />
    </Circle>
  );
}

export default IdenticonAvatar;
