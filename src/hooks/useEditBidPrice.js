import { ContractPromise } from "@polkadot/api-contract";
import {
  batchTxResponseErrorHandler,
  setTxStatus,
  txErrorHandler,
} from "@store/actions/txStatus";
import { getEstimatedGasBatchTx } from "@utils";
import BN from "bn.js";

import { START } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import { marketplace } from "@utils/blockchain/abi";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { APICall } from "../api/client";
import { convertToBNString, getChainDecimal } from "../utils";
import { getTokenID } from "./useBulkDelist";

export default function useEditBidPrice({
  newBidPrice,
  nftContractAddress,
  tokenID,
  sellerAddress,
} = {}) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const doUpdateBidPrice = async () => {
    toast(`Update bid price...`);

    let unsubscribe;

    const address = currentAccount?.address;

    const value = 0;
    let gasLimit;

    const marketplaceContract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );

    const tokenIdFound = getTokenID({
      nftContractAddress,
      azDomainName: tokenID,
      tokenID,
    });

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "removeBid",
      nftContractAddress,
      tokenIdFound
    );

    const removeBidTx = marketplaceContract.tx["removeBid"](
      { gasLimit, value },
      nftContractAddress,
      tokenIdFound
    );

    // ============================================

    const bidValue = convertToBNString(
      newBidPrice,
      getChainDecimal(marketplaceContract)
    );

    let bidGasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      bidValue,
      "bid",
      nftContractAddress,
      tokenIdFound
    );

    const newBidTx = marketplaceContract.tx["bid"](
      { gasLimit: bidGasLimit, value: bidValue },
      nftContractAddress,
      tokenIdFound
    );

    dispatch(
      setTxStatus({
        type: "UPDATE_BID_PRICE",
        step: START,
      })
    );

    api.tx.utility
      .batch([removeBidTx, newBidTx])
      .signAndSend(
        address,
        { signer: adapter.signer },
        async ({ events, status, dispatchError }) => {
          if (status?.isFinalized) {
            let totalSuccessTxCount = null;

            events.forEach(async ({ event, event: { data } }) => {
              if (api.events.utility?.BatchInterrupted.is(event)) {
                totalSuccessTxCount = data[0]?.toString();
              }

              if (api.events.utility?.BatchCompleted.is(event)) {
                toast.success("Bid price have been updated successfully");
              }
            });

            const options = tokenIdFound.bytes
              ? { azDomainName: tokenIdFound?.bytes }
              : { token_id: tokenIdFound?.u64 };

            try {
              await APICall.askBeUpdateBidsData({
                collection_address: nftContractAddress,
                seller: sellerAddress,
                ...options,
              });

              await APICall.askBeUpdateNftData({
                collection_address: nftContractAddress,
                ...options,
              });
            } catch (error) {
              console.log("error", error);
            }

            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Update bid price are not fully successful! ${totalSuccessTxCount} edit completed successfully.`
              );

              dispatch(clearTxStatus());
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "UPDATE_BID_PRICE",
            api,
            currentAccount,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };
  return { doUpdateBidPrice };
}
