import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import { Text } from "@chakra-ui/react";

import { APICall } from "@api/client";
import HistoryTable from "@components/Table/HistoryTable";

function TxHistory({
  nftContractAddress,
  tokenID,
  is_for_sale,
  nft_owner,
  owner,
}) {
  const { currentAccount } = useSubstrateState();

  const [historyList, setHistoryList] = useState(null);

  const headers = [
    // { name: "tokenID", label: "token ID" },
    { name: "blockNumber", label: "block number" },
    // { name: "nftContractAddress", label: "nft address" },
    { name: "trader", label: "owner" },
    { name: "seller", label: "seller" },
    { name: "buyer", label: "buyer" },
    { name: "type", label: "action" },
    { name: "price", label: "price" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { ret: historyListData } = await APICall.getOwnershipHistoryOfNFT({
        token_id: tokenID,
        collection_address: nftContractAddress,
      });

      const data = historyListData.map((i) => {
        const type = i.seller
          ? "BUY/BID ACCEPTED"
          : !i.price
          ? "UNLIST"
          : "LIST";

        return { ...i, type };
      });

      setHistoryList(data);
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

export default TxHistory;