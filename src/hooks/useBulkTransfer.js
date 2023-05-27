import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../utils/wallets/extension-dapp";
import { getEstimatedGasBatchTx } from "@utils";
import {
  txErrorHandler,
  batchTxResponseErrorHandler,
  setTxStatus,
} from "@store/actions/txStatus";

import { START } from "@constants";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { useSubstrateState } from "@utils/substrate";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { APICall } from "../api/client";
import { clearTxStatus } from "@store/actions/txStatus";
import { useEffect, useState } from "react";
import { isValidAddress } from "../utils";
import { stringToU8a } from "@polkadot/util";

export default function useBulkTransfer({ listNFTFormatted }) {
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
    const { signer } = await web3FromSource(currentAccount?.meta?.source);

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
      "psp34::transfer",
      receiverAddress,
      { u64: listInfo[0].info?.tokenID },
      stringToU8a("")
    );

    await Promise.all(
      listInfo.map(async ({ info }) => {
        // const value = 0;
        // let gasLimit;

        // const nftPsp34Contract = new ContractPromise(
        //   api,
        //   nft721_psp34_standard.CONTRACT_ABI,
        //   info?.nftContractAddress
        // );

        // gasLimit = await getEstimatedGasBatchTx(
        //   address,
        //   nftPsp34Contract,
        //   value,
        //   "psp34::transfer",
        //   receiverAddress,
        //   { u64: info?.tokenID },
        //   stringToU8a("")
        // );

        const ret = nftPsp34Contract.tx["psp34::transfer"](
          { gasLimit, value },
          receiverAddress,
          { u64: info?.tokenID },
          stringToU8a("")
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

    // const info = await api.tx.utility.batchAll(transferTxALL);

    // console.log(`estimated fees: ${info}`);
    // const nonce = await api.rpc.system.accountNextIndex(address);
    // console.log("nonce", nonce.toString());
    api.tx.utility
      .batch(transferTxALL)
      .signAndSend(
        address,
        { signer },
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
                await APICall.askBeUpdateNftData({
                  collection_address: info?.nftContractAddress,
                  token_id: info?.tokenID,
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

  function handleSelectMultiTransfer(tokenID, action, isChecked) {
    let newData = { ...multiTransferData };
    console.log('handleSelectMultiTransfer::listNFTFormatted', listNFTFormatted);
    let info = listNFTFormatted?.find((item) => item.tokenID === tokenID);

    // Initial data is empty
    if (multiTransferData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [tokenID];
      newData.listInfo = [{ price: null, info }];
      setMultiTransferData(newData);
      setMultiTransferActionMode(action);
      return;
    }

    if (multiTransferData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiTransferData?.list.includes(tokenID);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiTransferData?.list;
      const newListInfo = multiTransferData?.listInfo;

      newData.list = [...newList, tokenID];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiTransferData(newData);
      setMultiTransferActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiTransferData?.list?.filter(
        (item) => item !== tokenID
      );

      const idxFound = multiTransferData?.list?.indexOf(tokenID);
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

  function handleSelectAzeroDomainsMultiTransfer(azDomainName, action, isChecked) {
    let newData = { ...multiTransferData };
    console.log('handleSelectAzeroDomainsMultiTransfer::listNFTFormatted', listNFTFormatted);
    let info = listNFTFormatted?.find((item) => item.azDomainName === azDomainName);

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
    handleSelectAzeroDomainsMultiTransfer
  };
}
