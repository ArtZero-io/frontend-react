import React, { useEffect, useState } from "react";
import staking_calls from "@utils/blockchain/staking_calls";
import { useSubstrateState } from "@utils/substrate";

function MyCollections() {
  const { currentAccount } = useSubstrateState();
  const [totalStaked, setTotalStaked] = useState(0);

  useEffect(() => {
    const fetchTotalStaked = async () => {
      const res = await staking_calls.getTotalStaked(currentAccount);
      setTotalStaked(res);
    };
    fetchTotalStaked();
  }, [currentAccount]);

  return (
    <>
      <div>MyCollections Summary</div>
      <div>Total NFT staked: {totalStaked}</div>
    </>
  );
}

export default MyCollections;
