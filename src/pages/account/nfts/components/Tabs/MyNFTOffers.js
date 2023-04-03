import React, { useEffect, useState } from "react";
import marketplace_contract_calls from "@utils/blockchain/marketplace_contract_calls";
import { useSubstrateState } from "@utils/substrate";
import CommonTable from "@components/Table/Table";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Text } from "@chakra-ui/react";

import { clearTxStatus } from "@store/actions/txStatus";
import { acceptBid } from "@pages/token";

import { getPublicCurrentAccount } from "@utils";

function MyNFTOffer({ nftContractAddress, tokenID }) {
  const { currentAccount, api } = useSubstrateState();
  const dispatch = useDispatch();

  const [bidders, setBidders] = useState(null);
  const [saleInfo, setSaleInfo] = useState({});
  const [isOwner, setIsOwner] = useState(false);

  const headers = ["address", "time", "price", "action"];

  const handleAcceptBidAction = async (bidId) => {
    try {
      await acceptBid(
        api,
        currentAccount,
        isOwner,
        nftContractAddress,
        tokenID,
        bidId,
        dispatch
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      dispatch(clearTxStatus());
    }
  };

  const publicCurrentAccount = getPublicCurrentAccount();
  useEffect(() => {
    let isMounted = true;

    const fetchBidder = async () => {
      const sale_info = await marketplace_contract_calls.getNftSaleInfo(
        publicCurrentAccount,
        nftContractAddress,
        { u64: tokenID }
      );

      if (!isMounted) return;

      setSaleInfo(sale_info);

      if (sale_info) {
        const ownerAddress = sale_info?.isForSale
          ? sale_info?.nftOwner
          : sale_info?.owner;

        if (ownerAddress === currentAccount?.address) {
          setIsOwner(true);
        }

        let listBidder = await marketplace_contract_calls.getAllBids(
          publicCurrentAccount,
          nftContractAddress,
          sale_info?.nftOwner,
          { u64: tokenID }
        );

        // map array index to bidId
        listBidder = listBidder?.map((i, idx) => {
          return { ...i, bidId: idx, bidDate: i.bidDate.replaceAll(",", "") };
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
    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftContractAddress, tokenID, currentAccount?.address]);

  return (
    <>
      {bidders?.length === 0 ? (
        <Text textAlign="center" py="2rem">
          There is no bid yet.
        </Text>
      ) : (
        <CommonTable
          tableHeaders={headers}
          tableData={bidders}
          onClickHandler={handleAcceptBidAction}
          isOwner={currentAccount?.address === saleInfo?.nftOwner}
        />
      )}
    </>
  );
}

export default MyNFTOffer;
