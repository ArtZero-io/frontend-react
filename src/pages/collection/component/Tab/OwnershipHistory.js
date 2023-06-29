import React, { useEffect, useState } from "react";
import { useSubstrateState } from "@utils/substrate";
import { Text } from "@chakra-ui/react";

import { APICall } from "@api/client";
import HistoryTable from "@components/Table/HistoryTable";
import { azero_domains_nft } from "@utils/blockchain/abi";

function OwnershipHistory({
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
    { name: "blockNumber", label: "block number" },
    { name: "nftContractAddress", label: "nft address" },
    { name: "price", label: "price" },
    { name: "seller", label: "prev owner" },
    { name: "buyer", label: "new owner" },
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

      const data = historyListData.filter((item) => {
        return !!item.seller;
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

export default OwnershipHistory;
