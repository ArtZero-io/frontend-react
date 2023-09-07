import { ContractPromise } from "@polkadot/api-contract";
import { getEstimatedGasBatchTx } from "@utils";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
  setTxStatus,
} from "@store/actions/txStatus";

import { START } from "@constants";
import marketplace from "@utils/blockchain/marketplace";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { APICall } from "../api/client";
import { clearTxStatus } from "@store/actions/txStatus";
import { getTokenID } from "./useBulkDelist";

export default function useBulkRemoveBids({ listNFTFormatted }) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const doBulkRemoveBids = async () => {
    toast(`Bulk remove bids...`);

    let unsubscribe;
    let removeBidsTxALL;

    const address = currentAccount?.address;

    toast("Estimated transaction fee...");

    // Change to get gasEst for every single tx to 1 for all
    const value = 0;
    let gasLimit;

    const marketplaceContract = new ContractPromise(
      api,
      marketplace.CONTRACT_ABI,
      marketplace.CONTRACT_ADDRESS
    );

    let tokenID = getTokenID(listNFTFormatted[0]);

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "removeBid",
      listNFTFormatted[0]?.nftContractAddress,
      tokenID
    );

    await Promise.all(
      listNFTFormatted?.map(async (item) => {
        let tokenID = getTokenID(item);

        const ret = marketplaceContract.tx["removeBid"](
          { gasLimit, value },
          item?.nftContractAddress,
          tokenID
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
        { signer: adapter.signer },
        async ({ events, status, dispatchError }) => {
          if (status?.isFinalized) {
            let totalSuccessTxCount = null;

            events.forEach(async ({ event, event: { data } }) => {
              if (api.events.utility?.BatchInterrupted.is(event)) {
                totalSuccessTxCount = data[0]?.toString();
              }

              if (api.events.utility?.BatchCompleted.is(event)) {
                toast.success(
                  "All bids from this collection have been removed successfully"
                );
              }
            });

            await listNFTFormatted?.map(async (item) => {
              try {
                const options = item?.azDomainName
                  ? { azDomainName: item?.azDomainName }
                  : { token_id: item?.tokenID };

                await APICall.askBeUpdateBidsData({
                  collection_address: item?.nftContractAddress,
                  seller: item?.nft_owner,
                  ...options,
                });

                await APICall.askBeUpdateNftData({
                  collection_address: item?.nftContractAddress,
                  ...options,
                });
              } catch (error) {
                console.log("error", error);
              }
            });
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Bulk delistings are not fully successful! ${totalSuccessTxCount} delistings completed successfully.`
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
