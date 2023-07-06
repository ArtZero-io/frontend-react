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
import { useEffect, useState } from "react";
import azero_domains_nft from "@blockchain/azero-domains-nft";


export default function useBulkDelist({ listNFTFormatted }) {
  const dispatch = useDispatch();
  const { api, currentAccount } = useSubstrateState();
  const [multiDelistData, setMultiDelistData] = useState({
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
  } = multiDelistData;

  const doBulkDelist = async () => {
    toast(`Bulk delist...`);

    let unsubscribe;
    let delistTxALL;

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

    let tokenID = getTokenID(listInfo[0].info);

    gasLimit = await getEstimatedGasBatchTx(
      address,
      marketplaceContract,
      value,
      "unlist",
      listInfo[0].info?.nftContractAddress,
      tokenID
    );

    await Promise.all(
      listInfo.map(async ({ info }) => {
        let tokenID = getTokenID(info);

        const ret = marketplaceContract.tx["unlist"](
          { gasLimit, value },
          info?.nftContractAddress,
          tokenID
        );

        return ret;
      })
    ).then((res) => (delistTxALL = res));

    dispatch(
      setTxStatus({
        type: "MULTI_DELIST",
        step: START,
        tokenIDArray: list,
      })
    );

    api.tx.utility
      .batch(delistTxALL)
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
                toast.success("All NFTs have been delisted successfully.");
              }
            });

            await listInfo.map(async ({ info }) => {
              try {
                let options = {
                  collection_address: info?.nftContractAddress,
                };

                if (info?.azDomainName) {
                  options.azDomainName = info?.azDomainName;
                } else {
                  options.token_id = info?.tokenID;
                }

                await APICall.askBeUpdateNftData(options);
              } catch (error) {
                console.log("error", error);
              }
            });
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!totalSuccessTxCount) {
              toast.error(
                `Bulk delistings are not fully successful!${totalSuccessTxCount} delistings completed successfully.`
              );

              dispatch(clearTxStatus());
            }
          }

          batchTxResponseErrorHandler({
            status,
            dispatchError,
            dispatch,
            txType: "MULTI_DELIST",
            api,
            currentAccount,
          });
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

    return unsubscribe;
  };

  const [showSlideMultiDelist, setShowSlideMultiDelist] = useState(false);

  const [multiDelistActionMode, setMultiDelistActionMode] = useState(null);

  useEffect(() => {
    if (!multiDelistData?.action) {
      setShowSlideMultiDelist(false);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {},
      });
    } else {
      setShowSlideMultiDelist(true);
      dispatch({
        type: "SET_BULK_TX_STATUS",
        payload: {
          selectedCollectionAddress,
          bulkTxMode: multiDelistActionMode,
        },
      });
    }
  }, [
    dispatch,
    multiDelistActionMode,
    multiDelistData?.action,
    selectedCollectionAddress,
  ]);

  function handleSelectMultiDelist(tokenID, action, isChecked) {
    let newData = { ...multiDelistData };

    let info = listNFTFormatted?.find(
      (item) => item.azDomainName === tokenID || item.tokenID === tokenID
    );

    // Initial data is empty
    if (multiDelistData?.action === null) {
      if (!isChecked) return;

      newData.action = action;
      newData.selectedCollectionAddress = info?.nftContractAddress;
      newData.list = [tokenID];
      newData.listInfo = [{ price: null, info }];
      setMultiDelistData(newData);
      setMultiDelistActionMode(action);
      return;
    }

    if (multiDelistData?.action !== action) {
      return toast.error("Please select same action!");
    }

    const isExisted = multiDelistData?.list.includes(tokenID);

    if (isChecked) {
      if (isExisted) return toast.error("This item is already added!");

      const newList = multiDelistData?.list;
      const newListInfo = multiDelistData?.listInfo;

      newData.list = [...newList, tokenID];
      newData.listInfo = [...newListInfo, { price: null, info }];

      setMultiDelistData(newData);
      setMultiDelistActionMode(action);

      return;
    } else {
      if (!isExisted) return toast.error("This item is not add yet!");

      newData.list = multiDelistData?.list?.filter((item) => item !== tokenID);

      const idxFound = multiDelistData?.list?.indexOf(tokenID);
      newData.listInfo = multiDelistData?.listInfo?.filter(
        (_, idx) => idx !== idxFound
      );
      if (newData?.list?.length === 0) {
        newData.action = null;
      }

      setMultiDelistData(newData);
      setMultiDelistActionMode(action);
    }
  }

  return {
    multiDelistData,
    showSlideMultiDelist,
    doBulkDelist,
    handleSelectMultiDelist,
  };
}

export function getTokenID(info) {
  let tokenID;

  if (azero_domains_nft.CONTRACT_ADDRESS === info?.nftContractAddress) {
    tokenID = { bytes: info?.azDomainName };
  } else {
    tokenID = { u64: info?.tokenID };
  }
  return tokenID;
}
