import React, { useEffect, useState } from "react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import DataTable from "../../../../components/Table/Table";

function NFTTabActivity({ nftContractAddress, tokenID }) {
  const [bidders, setBidders] = useState([]);
  const { currentAccount } = useSubstrateState();
  const headers = ["Address", "Time", "Price", "Action"];

  const acceptBid = async (bidId) => {
    await marketplace_contract_calls.acceptBid(
      currentAccount,
      nftContractAddress,
      { u64: tokenID },
      bidId
    );
  };

  useEffect(() => {
    const fetchBidder = async () => {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      console.log(sale_info);

      const listBidder = await marketplace_contract_calls.getAllBids(
        currentAccount,
        nftContractAddress,
        sale_info?.nftOwner,
        { u64: tokenID }
      );

      setBidders(listBidder);
    };

    fetchBidder();
  }, [currentAccount, nftContractAddress, tokenID]);

  return (
    <DataTable
      tableHeaders={headers}
      tableData={bidders}
      onClickHandler={acceptBid}
    />
  );
}

export default NFTTabActivity;
