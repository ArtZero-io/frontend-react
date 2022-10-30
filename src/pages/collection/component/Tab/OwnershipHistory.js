import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import { Text } from "@chakra-ui/react";

import { APICall } from "@api/client";
import HistoryTable from "@components/Table/HistoryTable";

function OwnershipHistory({
  nftContractAddress,
  tokenID,
  is_for_sale,
  nft_owner,
  owner,
}) {
  const { currentAccount } = useSubstrateState();

  const [historyList, setHistoryList] = useState(null);

  const headers = [
    { name: "tokenID", label: "token ID" },
    { name: "blockNumber", label: "block number" },
    { name: "nftContractAddress", label: "nft address" },
    { name: "price", label: "price" },
    { name: "seller", label: "seller" },
    { name: "buyer", label: "buyer" },
    { name: "trader", label: "trader" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const ownerAddress = is_for_sale ? nft_owner : owner;
      const { ret: historyListData } = await APICall.getOwnershipHistoryOfNFT({
        token_id: tokenID,
        owner: ownerAddress,
        collection_address: nftContractAddress,
      });
      // console.log("historyListData", historyListData);

      setHistoryList(historyListData);
    };

    fetchData();
  }, [
    currentAccount,
    is_for_sale,
    nftContractAddress,
    nft_owner,
    owner,
    tokenID,
  ]);

  if (!currentAccount) {
    return (
      <Text textAlign="center" py="2rem">
        Please connect wallet first!{" "}
      </Text>
    );
  }

  return (
    <>
      {historyList?.length === 0 ? (
        <Text textAlign="center" py="2rem">
          There is no activity yet.
        </Text>
      ) : (
        <>
          <HistoryTable tableHeaders={headers} tableData={historyList} />
        </>
      )}
    </>
  );
}

export default OwnershipHistory;
