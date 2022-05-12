import React, { useEffect, useState } from "react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import DataTable from "@components/Table/Table";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function NFTTabActivity({ nftContractAddress, tokenID }) {
  const [bidders, setBidders] = useState([]);
  const { currentAccount } = useSubstrateState();
  const [saleInfo, setSaleInfo] = useState({});
  const dispatch = useDispatch();
  // const { tnxStatus } = useSelector((s) => s.account.accountLoaders);

  const headers = ["Address", "Time", "Price", "Action"];

  const acceptBid = async (bidId) => {
    if (currentAccount.address === saleInfo.nftOwner) {
      await marketplace_contract_calls.acceptBid(
        currentAccount,
        nftContractAddress,
        saleInfo.nftOwner,
        { u64: tokenID },
        bidId,
        dispatch
      );
    } else {
      toast.error(`You not owner of token`);
    }
  };

  useEffect(() => {
    const fetchBidder = async () => {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        currentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      setSaleInfo(sale_info);
      if (sale_info) {
        const listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        setBidders(listBidder);
      }
    };

    fetchBidder();
  }, [currentAccount, nftContractAddress, tokenID]);

  return (
    <DataTable
      tableHeaders={headers}
      tableData={bidders}
      saleInfo={saleInfo}
      onClickHandler={acceptBid}
      isOwner={currentAccount?.address === saleInfo?.nftOwner}
    />
  );
}

export default NFTTabActivity;
