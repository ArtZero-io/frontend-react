import React, { useEffect, useState } from "react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import DataTable from "@components/Table/Table";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AccountActionTypes } from "@store/types/account.types";
import { Text } from "@chakra-ui/react";

function NFTTabActivity({ nftContractAddress, tokenID }) {
  const [bidders, setBidders] = useState(null);
  const { currentAccount } = useSubstrateState();
  const [saleInfo, setSaleInfo] = useState({});
  const dispatch = useDispatch();
  const [idSelected, setIdSelected] = useState(null);
  const headers = ["Address", "Time", "Price", "Action"];

  const acceptBid = async (bidId) => {
    if (currentAccount.address === saleInfo.nftOwner) {
      setIdSelected(bidId);

      dispatch({
        type: AccountActionTypes.SET_ADD_NFT_TNX_STATUS,
        payload: {
          status: "Start",
        },
      });

      await marketplace_contract_calls.acceptBid(
        currentAccount,
        nftContractAddress,
        saleInfo.nftOwner,
        { u64: tokenID },
        bidId,
        dispatch
      );
    } else {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      setIdSelected(null);
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

        listBidder ? setBidders(listBidder) : setBidders([]);
      }
    };

    fetchBidder();
  }, [currentAccount, nftContractAddress, tokenID]);

  return (
    <>
      {bidders?.length === 0 ? (
        <Text textAlign="center" py="2rem">
          There is no bid yet.
        </Text>
      ) : (
        <DataTable
          idSelected={idSelected}
          tableHeaders={headers}
          tableData={bidders}
          saleInfo={saleInfo}
          onClickHandler={acceptBid}
          isOwner={currentAccount?.address === saleInfo?.nftOwner}
        />
      )}
    </>
  );
}

export default NFTTabActivity;
