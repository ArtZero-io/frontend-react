import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../utils/wallets/extension-dapp";
import { getEstimatedGasBatchTx } from "@utils";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
  setTxStatus,
} from "@store/actions/txStatus";

import { START } from "@constants";
import marketplace from "@utils/blockchain/marketplace";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { APICall } from "../api/client";
import { clearTxStatus } from "@store/actions/txStatus";

export default function useBulkRemoveBids({ listNFTFormatted }) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const doBulkRemoveBids = async () => {
    toast(`Bulk remove bids...`);

    let unsubscribe;
    let removeBidsTxALL;

    const address = currentAccount?.address;
    const { signer } = await web3FromSource(currentAccount?.meta?.source);

    toast("Estimated transaction fee...");

    // Change to get gasEst for every single tx to 1 for all
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
      listNFTFormatted[0]?.nftContractAddress,
      { u64: listNFTFormatted[0]?.tokenID }
    );

    await Promise.all(
      listNFTFormatted?.map(async (item) => {
        const ret = marketplaceContract.tx["removeBid"](
          { gasLimit, value },
          item?.nftContractAddress,
          { u64: item?.tokenID }
        );

        return ret;
      })
    ).then((res) => (removeBidsTxALL = res));

    dispatch(
      setTxStatus({
        type: "MULTI_REMOVE_BIDS",
        step: START,
      })
    );

    api.tx.utility
      .batch(removeBidsTxALL)
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
                toast.success("Bulk remove bids TXs are fully completed");
              }
            });

            await listNFTFormatted?.map(async (item) => {
              await APICall.askBeUpdateBidsData({
                collection_address: item?.nftContractAddress,
                seller: item?.nft_owner,
                token_id: item?.tokenID,
              });
              await APICall.askBeUpdateNftData({
                collection_address: item?.nftContractAddress,
                token_id: item?.tokenID,
              });
            });
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Bulk remove bids TXs are NOT fully success! Only ${totalSuccessTxCount} TX done.`
              );

              dispatch(clearTxStatus());
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "MULTI_REMOVE_BIDS",
            api,
            currentAccount,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };

  return { doBulkRemoveBids };
}
