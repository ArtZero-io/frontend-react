import { ContractPromise } from "@polkadot/api-contract";
import { getEstimatedGasBatchTx } from "@utils";
import { BN } from "bn.js";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
  setTxStatus,
} from "@store/actions/txStatus";

import { START } from "@constants";
import marketplace from "@utils/blockchain/marketplace";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { execContractQuery } from "@utils/blockchain/profile_calls";
import { APICall } from "../api/client";
import { clearTxStatus } from "@store/actions/txStatus";
import { useEffect, useState } from "react";

export default function useBulkListing({
  listNFTFormatted,
  nftContractAddress,
}) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const [multiListingData, setMultiListingData] = useState({
    action: null,
    list: [],
    listInfo: [],
  });
  const {
    // action,
    list,
    listInfo,
  } = multiListingData;

  let hasNullPrice = false;

  for (let index = 0; index < listInfo?.length; index++) {
    const element = listInfo[index];

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!element?.price) {
      continue;
    }
    hasNullPrice = true;
  }

  const hasUnapprovedTx = async () => {
    let resultArray = [];

    await Promise.all(
      listInfo?.map(async ({ info }) => {
        const queryResult = await execContractQuery(
          currentAccount?.address,
          api,
          nft721_psp34_standard.CONTRACT_ABI,
          info?.nftContractAddress,
          "psp34::allowance",
          currentAccount?.address,
          marketplace.CONTRACT_ADDRESS, //   operator_address
          { u64: info?.tokenID }
        );

        return queryResult.toHuman().Ok;
      })
    ).then((res) => (resultArray = res));

    return (
      resultArray?.length !==
      resultArray.reduce((acc, r) => (r ? acc + 1 : acc), 0)
    );
  };

  const handleApproveTx = async () => {
    if (hasNullPrice) {
      toast.error("Price can not be zero!");
      return;
    }

    toast("Step 1: Approving NFT transfer...");

    let unsubscribe;
    let approveTxALL;

    const address = currentAccount?.address;

    toast("Estimated transaction fee...");

    // Change to get gasEst for every single tx to 1 for all
    const value = 0;
    let gasLimit;

    const nftPsp34Contract = new ContractPromise(
      api,
      nft721_psp34_standard.CONTRACT_ABI,
      listInfo[0].info?.nftContractAddress
    );

    gasLimit = await getEstimatedGasBatchTx(
      address,
      nftPsp34Contract,
      value,
      "psp34::approve",
      marketplace.CONTRACT_ADDRESS, //   operator_address
      { u64: listInfo[0].info?.tokenID },
      true
    );

    await Promise.all(
      listInfo.map(async ({ info }) => {
        return nftPsp34Contract.tx["psp34::approve"](
          { gasLimit, value },
          marketplace.CONTRACT_ADDRESS, //   operator_address
          { u64: info?.tokenID },
          true
        );
      })
    ).then((res) => (approveTxALL = res));

    dispatch(
      setTxStatus({
        type: "APPROVE_MULTI_LISTING",
        step: START,
        tokenIDArray: list,
      })
    );

    api.tx.utility
      .batch(approveTxALL)
      .signAndSend(
        address,
        { signer: adapter.signer },
        ({ events, status, dispatchError }) => {
          if (status?.isFinalized) {
            let totalSuccessTxCount = null;

            events.forEach(
              ({ event, event: { data, method, section, ...rest } }) => {
                if (api.events.utility?.BatchInterrupted.is(event)) {
                  totalSuccessTxCount = data[0]?.toString();
                }

                if (api.events.utility?.BatchCompleted.is(event)) {
                  totalSuccessTxCount = list?.length;
                  toast.success(
                    totalSuccessTxCount === 1
                      ? "NFT have been approved successfully"
                      : "All NFTs have been approved successfully"
                  );
                }
              }
            );

            // eslint-disable-next-line no-extra-boolean-cast
            if (totalSuccessTxCount !== list?.length) {
              toast.error(
                list?.length === 1
                  ? "Approval is not successful!"
                  : `Approval are not fully successful! ${totalSuccessTxCount} approvals completed successfully.`
              );

              dispatch(clearTxStatus());
            } else {
              handleBulkListing();
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "APPROVE_MULTI_LISTING",
            api,
            currentAccount,
            isApprovalTx: true,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };

  const handleBulkListing = async () => {
    if (hasNullPrice) {
      toast.error("Price can not be zero!");
      return;
    }

    toast(
      listInfo?.length === 1
        ? "Listing on marketplace... "
        : `Bulk listing on marketplace...`
    );

    let unsubscribe;
    let listingTxALL;

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

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "list",
      listInfo[0].info?.nftContractAddress,
      { u64: listInfo[0].info?.tokenID },
      new BN(listInfo[0].price * 10 ** 6).mul(new BN(10 ** 6)).toString(),
      []
    );
    // TODOS: monitor gas is ok for different price above

    await Promise.all(
      listInfo.map(async ({ price, info }) => {
        const salePrice = new BN(price * 10 ** 6)
          .mul(new BN(10 ** 6))
          .toString();

        const ret = marketplaceContract.tx["list"](
          { gasLimit, value },
          info?.nftContractAddress,
          { u64: info?.tokenID },
          salePrice,
          []
        );

        return ret;
      })
    ).then((res) => (listingTxALL = res));

    dispatch(
      setTxStatus({
        type: "MULTI_LISTING",
        step: START,
        tokenIDArray: list,
      })
    );

    api.tx.utility
      .batch(listingTxALL)
      .signAndSend(
        address,
        { signer: adapter.signer },
        async ({ events, status, dispatchError }) => {
          if (status?.isFinalized) {
            let totalSuccessTxCount = null;

            events.forEach(
              async ({ event, event: { data, method, section, ...rest } }) => {
                if (api.events.utility?.BatchInterrupted.is(event)) {
                  totalSuccessTxCount = data[0]?.toString();
                }

                if (api.events.utility?.BatchCompleted.is(event)) {
                  toast.success(
                    listInfo?.length === 1
                      ? "NFT has been listed successfully                  "
                      : "All NFTs have been listed successfully"
                  );
                }
              }
            );

            await listInfo.map(
              async ({ info }) =>
                await APICall.askBeUpdateNftData({
                  collection_address: info?.nftContractAddress,
                  token_id: info?.tokenID,
                })
            );
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                listInfo?.length === 1
                  ? "The listings is not fully successful!                "
                  : `Bulk listings are not fully successful! ${totalSuccessTxCount} listings completed successfully.`
              );

              dispatch(clearTxStatus());
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "MULTI_LISTING",
            api,
            currentAccount,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };

  const doBulkListing = async () => {
    const hasUnapproved = await hasUnapprovedTx();

    if (hasUnapproved) {
      await handleApproveTx();
      return;
    }
    await handleBulkListing();
  };

  const [showSlideMultiListing, setShowSlideMultiListing] = useState(false);

  const [multiListingActionMode, setMultiListingActionMode] = useState(null);

  useEffect(() => {
    if (!multiListingData?.action) {
      setShowSlideMultiListing(false);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {},
      });
    } else {
      setShowSlideMultiListing(true);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {
          selectedCollectionAddress: nftContractAddress,
          bulkTxMode: multiListingActionMode,
        },
      });
    }
  }, [
    dispatch,
    multiListingActionMode,
    multiListingData?.action,
    nftContractAddress,
  ]);

  function handleSelectMultiListing(tokenID, action, isChecked) {
    let newData = { ...multiListingData };
    let info = listNFTFormatted?.find((item) => item.tokenID === tokenID);
    // Initial data is empty
    if (multiListingData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.list = [tokenID];
      newData.listInfo = [{ price: null, info }];
      setMultiListingData(newData);
      setMultiListingActionMode(action);
      return;
    }

    if (multiListingData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiListingData?.list.includes(tokenID);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiListingData?.list;
      const newListInfo = multiListingData?.listInfo;

      newData.list = [...newList, tokenID];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiListingData(newData);
      setMultiListingActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiListingData?.list?.filter((item) => item !== tokenID);

      const idxFound = multiListingData?.list?.indexOf(tokenID);
      newData.listInfo = multiListingData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiListingData(newData);
      setMultiListingActionMode(action);
    }
  }

  function handleInputChangeMultiListing(price, idx) {
    let newData = { ...multiListingData };

    let newListInfo = newData.listInfo;

    newListInfo.map((item, index) => {
      if (index === idx) {
        return (item.price = price);
      }

      return item;
    });

    setMultiListingData((prev) => {
      return { ...prev, listInfo: newListInfo };
    });
  }

  function handleCloseButtonForMultiListing() {
    setMultiListingData({ action: null, list: [], listInfo: [] });
    setMultiListingActionMode(null);
    dispatch(clearTxStatus());
  }

  return {
    multiListingData,
    showSlideMultiListing,
    multiListingActionMode,
    doBulkListing,
    handleSelectMultiListing,
    handleInputChangeMultiListing,
    handleCloseButtonForMultiListing,
  };
}
