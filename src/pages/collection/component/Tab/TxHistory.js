import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import { Text } from "@chakra-ui/react";

import { APICall } from "@api/client";
import HistoryTable from "@components/Table/HistoryTable";
import azero_domains_nft from "@blockchain/azero-domains-nft";

function TxHistory({
  nftContractAddress,
  tokenID,
  is_for_sale,
  nft_owner,
  owner,
  azDomainName,
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
      const options = { collection_address: nftContractAddress, owner };

      if (nftContractAddress === azero_domains_nft.CONTRACT_ADDRESS) {
        options.azDomainName = azDomainName;
      } else {
        options.token_id = tokenID;
      }

      const { ret: historyListData } = await APICall.getOwnershipHistoryOfNFT(
        options
      );

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
    azDomainName,
    currentAccount,
    is_for_sale,
    nftContractAddress,
    nft_owner,
    owner,
    tokenID,
  ]);

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
