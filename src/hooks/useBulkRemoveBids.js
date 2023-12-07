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
import { useEffect, useState } from "react";

export default function useBulkRemoveBids({ listNFTFormatted }) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();

  const [multiDebidData, setMultiDebidData] = useState({
    action: null,
    list: [],
    listInfo: [],
    selectedCollectionAddress: "",
  });
  const {
    // action,
    list,
    listInfo,
    selectedCollectionAddress,
  } = multiDebidData;

  // Remove bids
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

    let tokenID = getTokenID(listInfo[0].info);

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "removeBid",
      listInfo[0].info?.nftContractAddress,
      tokenID
    );

    await Promise.all(
      listInfo.map(async ({ info }) => {
        let tokenID = getTokenID(info);

        const ret = marketplaceContract.tx["removeBid"](
          { gasLimit, value },
          info?.nftContractAddress,
          tokenID
        );

        return ret;
      })
    ).then((res) => (removeBidsTxALL = res));

    dispatch(
      setTxStatus({
        type: "MULTI_REMOVE_BIDS",
        step: START,
        tokenIDArray: list,
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

            await listInfo?.map(async ({ info }) => {
              try {
                const options = info?.azDomainName
                  ? { azDomainName: info?.azDomainName }
                  : { token_id: info?.tokenID };

                await APICall.askBeUpdateBidsData({
                  collection_address: info?.nftContractAddress,
                  seller: info?.nft_owner,
                  ...options,
                });

                await APICall.askBeUpdateNftData({
                  collection_address: info?.nftContractAddress,
                  ...options,
                });
              } catch (error) {
                console.log("error", error);
              }
            });
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Bulk debidings are not fully successful! ${totalSuccessTxCount} debidings completed successfully.`
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

  const [showSlideMultiDebid, setShowSlideMultiDebid] = useState(false);

  const [multiDebidActionMode, setMultiDebidActionMode] = useState(null);

  useEffect(() => {
    if (!multiDebidData?.action) {
      setShowSlideMultiDebid(false);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {},
      });
    } else {
      setShowSlideMultiDebid(true);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {
          selectedCollectionAddress,
          bulkTxMode: multiDebidActionMode,
        },
      });
    }
  }, [
    dispatch,
    multiDebidActionMode,
    multiDebidData?.action,
    selectedCollectionAddress,
  ]);

  // Handle select multi remove bids
  function handleSelectMultiDebid(tokenID, action, isChecked) {
    let newData = { ...multiDebidData };

    let info = listNFTFormatted?.find(
      (item) => item.azDomainName === tokenID || item.tokenID === tokenID
    );

    // Initial data is empty
    if (multiDebidData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [tokenID];
      newData.listInfo = [{ price: null, info }];
      setMultiDebidData(newData);
      setMultiDebidActionMode(action);
      return;
    }

    if (multiDebidData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiDebidData?.list.includes(tokenID);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiDebidData?.list;
      const newListInfo = multiDebidData?.listInfo;

      newData.list = [...newList, tokenID];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiDebidData(newData);
      setMultiDebidActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiDebidData?.list?.filter((item) => item !== tokenID);

      const idxFound = multiDebidData?.list?.indexOf(tokenID);
      newData.listInfo = multiDebidData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiDebidData(newData);
      setMultiDebidActionMode(action);
    }
  }

  // Handle select multi remove bids Azero Domains
  function handleSelectMultiDebidAzeroDomains(azDomainName, action, isChecked) {
    let newData = { ...multiDebidData };

    let info = listNFTFormatted?.find(
      (item) => item.azDomainName === azDomainName
    );

    // Initial data is empty
    if (multiDebidData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [azDomainName];
      newData.listInfo = [{ price: null, info }];
      setMultiDebidData(newData);
      setMultiDebidActionMode(action);
      return;
    }

    if (multiDebidData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiDebidData?.list.includes(azDomainName);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiDebidData?.list;
      const newListInfo = multiDebidData?.listInfo;

      newData.list = [...newList, azDomainName];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiDebidData(newData);
      setMultiDebidActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiDebidData?.list?.filter(
        (item) => item !== azDomainName
      );

      const idxFound = multiDebidData?.list?.indexOf(azDomainName);
      newData.listInfo = multiDebidData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiDebidData(newData);
      setMultiDebidActionMode(action);
    }
  }

  function resetList() {
    const newData = {
      action: null,
      list: [],
      listInfo: [],
      selectedCollectionAddress: "",
    };
    setMultiDebidData(newData);
  }

  return {
    multiDebidData,
    showSlideMultiDebid,
    doBulkRemoveBids,
    handleSelectMultiDebid,
    handleSelectMultiDebidAzeroDomains,
    resetList,
  };
}
