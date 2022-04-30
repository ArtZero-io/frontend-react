import { ContractPromise } from "@polkadot/api-contract";
import toast from "react-hot-toast";
import BN from "bn.js";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress, handleContractCall, delay } from "@utils";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { clientAPI } from "@api/client";
// eslint-disable-next-line no-unused-vars
let account;
let contract;

export const setAccount = (newAccount) => (account = newAccount);

export const setStakingContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
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
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(account) || !index) {
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
async function getPendingUnstakedId(caller_account, account, index){
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(account) || !index) {
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
async function getRequestUnstakeTime(caller_account, account, token_id){
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(account) || !token_id) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getRequestUnstakeTime(
    address,
    { value: azero_value, gasLimit },
    account,
    token_id
  );
  console.log(output);
  if (result.isOk) {
    return new BN(output.value, 10, "le").toNumber();
  }
  return null;
}

//SETTERS
async function stake(caller_account, token_ids, dispatch) {
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
        handleContractCall(status, dispatchError, dispatch, contract);
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          for (var i=0;i<token_ids.length;i++){
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            await delay(300);
          }

          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Stake Artzero NFTs ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function unstake(caller_account, token_ids, dispatch) {
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
        handleContractCall(status, dispatchError, dispatch, contract);
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          for (var i=0;i<token_ids.length;i++){
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            await delay(300);
          }
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Unstake Artzero NFTs ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function requestUnstake(caller_account, token_ids, dispatch) {
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
        handleContractCall(status, dispatchError, dispatch, contract);
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          for (var i=0;i<token_ids.length;i++){
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            await delay(300);
          }
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Request Unstake Artzero NFTs ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function cancelRequestUnstake(caller_account, token_ids, dispatch) {
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
        handleContractCall(status, dispatchError, dispatch, contract);
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          for (var i=0;i<token_ids.length;i++){
            await clientAPI("post", "/updateNFT", {
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
            await delay(300);
          }
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Cancel Request Unstake Artzero NFTs ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
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
  setAccount,
  getTotalPendingUnstakedByAccount
};

export default staking_calls;
