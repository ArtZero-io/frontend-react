import { ContractPromise } from "@polkadot/api-contract";

import { getEstimatedGasBatchTx } from "@utils";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
  setTxStatus,
} from "@store/actions/txStatus";
import { stringToU8a } from "@polkadot/util";
import { START } from "@constants";
import { APICall } from "../api/client";
import { azero_domains_nft } from "@utils/blockchain/abi";
import { useSubstrateState, useSubstrate } from "@utils/substrate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { clearTxStatus } from "@store/actions/txStatus";
import { useEffect, useState } from "react";
import { isValidAddress } from "../utils";

export default function useBulkAzeroDomainsTransfer({ listNFTFormatted }) {
  const { adapter } = useSubstrate();

  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const [multiTransferData, setMultiTransferData] = useState({
    action: null,
    list: [],
    listInfo: [],
    selectedCollectionAddress: "",
    receiverAddress: "",
  });
  const {
    // action,
    list,
    listInfo,
    selectedCollectionAddress,
    receiverAddress,
  } = multiTransferData;

  const doBulkTransfer = async () => {
    if (!receiverAddress) {
      toast.error("Receiver address can not be empty!");
      return;
    }

    if (!isValidAddress(receiverAddress)) {
      toast.error("Receiver address is not valid!");
      return;
    }

    toast(`Bulk transfer...`);

    let unsubscribe;
    let transferTxALL;

    const address = currentAccount?.address;

    toast("Estimated transaction fee...");

    // Change to get gasEst for every single tx to 1 for all
    const value = 0;
    let gasLimit;
    let additionalData = "";
    const azeroDomainsNftContract = new ContractPromise(
      api,
      azero_domains_nft.CONTRACT_ABI,
      azero_domains_nft.CONTRACT_ADDRESS
    );

    gasLimit = await getEstimatedGasBatchTx(
      address,
      azeroDomainsNftContract,
      value,
      "psp34::transfer",
      receiverAddress,
      { bytes: listInfo[0].info?.azDomainName },
      stringToU8a("")
    );

    await Promise.all(
      listInfo.map(async ({ info }) => {
        const ret = azeroDomainsNftContract.tx["psp34::transfer"](
          { gasLimit, value },
          receiverAddress,
          { bytes: info?.azDomainName },
          stringToU8a(additionalData)
        );

        return ret;
      })
    ).then((res) => (transferTxALL = res));

    dispatch(
      setTxStatus({
        type: "MULTI_TRANSFER",
        step: START,
        tokenIDArray: list,
      })
    );

    api.tx.utility
      .batch(transferTxALL)
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
                  toast.success("All NFTs have been transferred successfully");
                }
              }
            );

            await listInfo.map(
              async ({ info }) =>
                await APICall.askBeUpdateAzeroDomainsNftData({
                  collection_address: info?.nftContractAddress,
                  azDomainName: info?.azDomainName,
                })
            );
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Bulk transfer are not fully successful! ${totalSuccessTxCount} transfers completed successfully.`
              );

              dispatch(clearTxStatus());
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "MULTI_TRANSFER",
            api,
            currentAccount,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };

  const [showSlideMultiTransfer, setShowSlideMultiTransfer] = useState(false);

  const [multiTransferActionMode, setMultiTransferActionMode] = useState(null);

  useEffect(() => {
    if (!multiTransferData?.action) {
      setShowSlideMultiTransfer(false);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {},
      });
    } else {
      setShowSlideMultiTransfer(true);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {
          selectedCollectionAddress,
          bulkTxMode: multiTransferActionMode,
        },
      });
    }
  }, [
    dispatch,
    multiTransferActionMode,
    multiTransferData?.action,
    selectedCollectionAddress,
  ]);

  function handleSelectMultiTransfer(azDomainName, action, isChecked) {
    let newData = { ...multiTransferData };

    let info = listNFTFormatted?.find(
      (item) => item.azDomainName === azDomainName
    );

    // Initial data is empty
    if (multiTransferData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [azDomainName];
      newData.listInfo = [{ price: null, info }];
      setMultiTransferData(newData);
      setMultiTransferActionMode(action);
      return;
    }

    if (multiTransferData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiTransferData?.list.includes(azDomainName);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiTransferData?.list;
      const newListInfo = multiTransferData?.listInfo;

      newData.list = [...newList, azDomainName];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiTransferData(newData);
      setMultiTransferActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiTransferData?.list?.filter(
        (item) => item !== azDomainName
      );

      const idxFound = multiTransferData?.list?.indexOf(azDomainName);
      newData.listInfo = multiTransferData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiTransferData(newData);
      setMultiTransferActionMode(action);
    }
  }

  function handleInputChangeReceiverAddress(address) {
    setMultiTransferData((prev) => {
      return { ...prev, receiverAddress: address };
    });
  }

  function handleCloseButtonForMultiTransfer() {
    setMultiTransferData({ action: null, list: [], listInfo: [] });
    setMultiTransferActionMode(null);
    dispatch(clearTxStatus());
  }

  /**
   * Azero Domains Functions
   */
  function handleSelectAzeroDomainsMultiTransfer(
    azDomainName,
    action,
    isChecked
  ) {
    let newData = { ...multiTransferData };

    let info = listNFTFormatted?.find(
      (item) => item.azDomainName === azDomainName
    );

    // Initial data is empty
    if (multiTransferData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [azDomainName];
      newData.listInfo = [{ price: null, info }];
      setMultiTransferData(newData);
      setMultiTransferActionMode(action);
      return;
    }

    if (multiTransferData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiTransferData?.list.includes(azDomainName);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiTransferData?.list;
      const newListInfo = multiTransferData?.listInfo;

      newData.list = [...newList, azDomainName];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiTransferData(newData);
      setMultiTransferActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiTransferData?.list?.filter(
        (item) => item !== azDomainName
      );

      const idxFound = multiTransferData?.list?.indexOf(azDomainName);
      newData.listInfo = multiTransferData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiTransferData(newData);
      setMultiTransferActionMode(action);
    }
  }
  /**
   * End Azero Domains Functions
   */

  return {
    receiverAddress,
    selectedCollectionAddress,
    multiTransferData,
    showSlideMultiTransfer,
    multiTransferActionMode,
    doBulkTransfer,
    handleSelectMultiTransfer,
    handleInputChangeReceiverAddress,
    handleCloseButtonForMultiTransfer,
    handleSelectAzeroDomainsMultiTransfer,
  };
}

// function handleInputChangeMultiListing(price, idx) {
//   let newData = { ...multiTransferData };

//   let newListInfo = newData.listInfo;

//   newListInfo.map((item, index) => {
//     if (index === idx) {
//       return (item.price = price);
//     }

//     return item;
//   });

//   setMultiTransferData((prev) => {
//     return { ...prev, listInfo: newListInfo };
//   });
// }
