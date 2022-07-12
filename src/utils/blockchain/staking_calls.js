/* eslint-disable no-unused-vars */
import { ContractPromise } from "@polkadot/api-contract";
import toast from "react-hot-toast";
import BN from "bn.js";
import { web3FromSource } from "../wallets/extension-dapp";
import {
  isValidAddressPolkadotAddress,
  handleContractCall,
  delay,
} from "@utils";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { clientAPI } from "@api/client";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "../../store/actions/txStatus";

let contract;

export const setStakingContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
  // console.log("contract setStakingContract", contract);
};

//GETTERS
async function getTotalStaked(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getTotalStaked(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalStakedByAccount(caller_account, account) {
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(account)) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query[
    "crossArtZeroStaking::getTotalStakedByAccount"
  ](address, { value: azero_value, gasLimit }, account);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalPendingUnstakedByAccount(caller_account, account) {
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(account)) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query[
    "crossArtZeroStaking::getTotalPendingUnstakedByAccount"
  ](address, { value: azero_value, gasLimit }, account);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getStakedId(caller_account, account, index) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(account) ||
    !index
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getStakedId(
    address,
    { value: azero_value, gasLimit },
    account,
    index
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getPendingUnstakedId(caller_account, account, index) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(account) ||
    !index
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getPendingUnstakedId(
    address,
    { value: azero_value, gasLimit },
    account,
    index
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getRequestUnstakeTime(caller_account, account, token_id) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(account) ||
    !token_id
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getRequestUnstakeTime(
    address,
    { value: azero_value, gasLimit },
    address,
    token_id
  );

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getLimitUnstakeTime(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getLimitUnstakeTime(address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalCountOfStakeholders(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getStakedAccountsLastIndex(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

//SETTERS
async function stake(caller_account, token_ids, dispatch, txType, api) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .stake({ gasLimit, value: azero_value }, token_ids)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status.isFinalized === true) {
          for (var i = 0; i < token_ids.length; i++) {
            console.log("updateNFT token_ids", token_ids);
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            // await delay(300);
          }
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}
async function unstake(caller_account, token_ids, dispatch, txType, api) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .unstake({ gasLimit, value: azero_value }, token_ids)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status.isFinalized === true) {
          for (var i = 0; i < token_ids.length; i++) {
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            // await delay(300);
          }
          // const statusText = Object.keys(status.toHuman())[0];
          // toast.success(
          //   `Unstake Artzero NFTs ${
          //     statusText === "0" ? "started" : statusText.toLowerCase()
          //   }.`
          // );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}
async function requestUnstake(
  caller_account,
  token_ids,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .requestUnstake({ gasLimit, value: azero_value }, token_ids)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status) {
          // handleContractCall(status, dispatchError, dispatch, contract);

          for (var i = 0; i < token_ids.length; i++) {
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            // await delay(300);
          }
          // const statusText = Object.keys(status.toHuman())[0];
          // toast.success(
          //   `Request Unstake Artzero NFTs ${
          //     statusText === "0" ? "started" : statusText.toLowerCase()
          //   }.`
          // );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}
async function cancelRequestUnstake(
  caller_account,
  token_ids,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .cancelRequestUnstake({ gasLimit, value: azero_value }, token_ids)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });
        if (status.isFinalized === true) {
          // handleContractCall(status, dispatchError, dispatch, contract);

          for (var i = 0; i < token_ids.length; i++) {
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            // await delay(300);
          }
          // const statusText = Object.keys(status.toHuman())[0];
          // toast.success(
          //   `Cancel Request Unstake Artzero NFTs ${
          //     statusText === "0" ? "started" : statusText.toLowerCase()
          //   }.`
          // );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const staking_calls = {
  cancelRequestUnstake,
  requestUnstake,
  getPendingUnstakedId,
  getRequestUnstakeTime,
  getTotalStaked,
  getTotalStakedByAccount,
  getStakedId,
  stake,
  unstake,
  setStakingContract,
  getTotalPendingUnstakedByAccount,
  getLimitUnstakeTime,
  getTotalCountOfStakeholders,
};

export default staking_calls;
