import { ContractPromise } from "@polkadot/api-contract";
import {
  batchTxResponseErrorHandler,
  setTxStatus,
  txErrorHandler,
} from "@store/actions/txStatus";
import { getEstimatedGasBatchTx } from "@utils";
import BN from "bn.js";
import { web3FromSource } from "../utils/wallets/extension-dapp";

import { START } from "@constants";
import { clearTxStatus } from "@store/actions/txStatus";
import marketplace from "@utils/blockchain/marketplace";
import { useSubstrateState } from "@utils/substrate";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { APICall } from "../api/client";

export default function useEditBidPrice({
  newBidPrice,
  nftContractAddress,
  tokenID,
  sellerAddress,
} = {}) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const doUpdateBidPrice = async () => {
    toast(`Update bid price...`);

    let unsubscribe;

    const address = currentAccount?.address;
    const { signer } = await web3FromSource(currentAccount?.meta?.source);

    const value = 0;
    let gasLimit;

    const marketplaceContract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "removeBid",
      nftContractAddress,
      { u64: tokenID }
    );

    const removeBidTx = marketplaceContract.tx["removeBid"](
      { gasLimit, value },
      nftContractAddress,
      { u64: tokenID }
    );

    // ============================================
    const bidValue = new BN(newBidPrice * 10 ** 6)
      .mul(new BN(10 ** 6))
      .toString();

    let bidGasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      bidValue,
      "bid",
      nftContractAddress,
      { u64: tokenID }
    );

    const newBidTx = marketplaceContract.tx["bid"](
      { gasLimit: bidGasLimit, value: bidValue },
      nftContractAddress,
      { u64: tokenID }
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
        { signer },
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

            await APICall.askBeUpdateBidsData({
              collection_address: nftContractAddress,
              seller: sellerAddress,
              token_id: tokenID,
            });
            await APICall.askBeUpdateNftData({
              collection_address: nftContractAddress,
              token_id: tokenID,
            });

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
