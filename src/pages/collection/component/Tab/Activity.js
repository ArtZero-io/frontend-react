/* eslint-disable no-unreachable */
import React, { useEffect, useState } from "react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import CommonTable from "@components/Table/Table";
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
  const headers = ["address", "time", "price", "action"];

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
      console.log("sale_info", sale_info);
      setSaleInfo(sale_info);

      if (sale_info) {
        let listBidder = await marketplace_contract_calls.getAllBids(
          currentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        // map array index to bidId
        listBidder = listBidder.map((i, idx) => {
          return { ...i, bidId: idx };
        });

        //sort highest price first
        listBidder?.length &&
          listBidder.sort((a, b) => {
            return (
              b.bidValue.replaceAll(",", "") * 1 -
              a.bidValue.replaceAll(",", "") * 1
            );
          });

        listBidder ? setBidders(listBidder) : setBidders([]);
      }
    };

    fetchBidder();
  }, [currentAccount, nftContractAddress, tokenID]);

  if (!currentAccount) {
    return (
      <Text textAlign="center" py="2rem">
        Please connect wallet first!{" "}
      </Text>
    );
  }

  return (
    <>
      {bidders?.length === 0 ? (
        <Text textAlign="center" py="2rem">
          There is no bid yet.
        </Text>
      ) : (
        <CommonTable
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
