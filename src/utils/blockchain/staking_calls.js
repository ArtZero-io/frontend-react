import BN from "bn.js";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress } from "@utils";
import artzero_nft from "@utils/blockchain/artzero-nft";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { APICall } from "../../api/client";

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
    !isValidAddressPolkadotAddress(account)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);
  console.log(account, index);
  const { result, output } = await contract.query.getStakedId(
    address,
    { value: azero_value, gasLimit },
    account,
    index
  );
  
  if (result.isOk) {
    return output.toHuman();
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

async function getStakedAccountsAccountByIndex(caller_account, index) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } =
    await contract.query.getStakedAccountsAccountByIndex(
      address,
      {
        value: azero_value,
        gasLimit,
      },
      index
    );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function isClaimed(caller_account, account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.isClaimed(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    account
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getIsLocked(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getIsLocked(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getRewardStarted(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getRewardStarted(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getClaimableReward(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getClaimableReward(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
  }
  return null;
}

async function getRewardPool(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getRewardPool(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
  }
  return null;
}

async function getAdminAddress(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function claimReward(caller_account, dispatch, txType, api) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .claimReward({ gasLimit, value })
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
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function setClaimable(caller_account, account) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .setClaimedStatus({ gasLimit, value }, account)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = contract.registry.findMetaError(
              dispatchError.asModule
            );
            const { docs, name, section } = decoded;

            console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
          } else {
            console.log("dispatchError claimReward", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];

          toast.success(
            `claim Reward ${
              statusText === "0" ? "start" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));

  return unsubscribe;
}

async function addReward(caller_account, amount) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = amount * 10 ** 12;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .addReward({ gasLimit, value })
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = contract.registry.findMetaError(
              dispatchError.asModule
            );
            const { docs, name, section } = decoded;

            console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
          } else {
            console.log("dispatchError claimReward", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];

          toast.success(
            `add Reward ${
              statusText === "0" ? "start" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));

  return unsubscribe;
}
async function updateIsLocked(caller_account, status) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .updateIsLocked({ gasLimit, value }, status)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = contract.registry.findMetaError(
              dispatchError.asModule
            );
            const { docs, name, section } = decoded;

            console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
          } else {
            console.log("dispatchError claimReward", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];

          toast.success(
            `add Reward ${
              statusText === "0" ? "start" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));

  return unsubscribe;
}

async function startRewardDistribution(caller_account) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .startRewardDistribution({ gasLimit, value })
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = contract.registry.findMetaError(
              dispatchError.asModule
            );
            const { docs, name, section } = decoded;

            console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
          } else {
            console.log("dispatchError claimReward", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];

          toast.success(
            `start Reward Distribution ${
              statusText === "0" ? "start" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));

  return unsubscribe;
}
async function stopRewardDistribution(caller_account) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx
    .stopRewardDistribution({ gasLimit, value })
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            const decoded = contract.registry.findMetaError(
              dispatchError.asModule
            );
            const { docs, name, section } = decoded;

            console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
          } else {
            console.log("dispatchError claimReward", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];

          toast.success(
            `stop Reward Distribution ${
              statusText === "0" ? "start" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));

  return unsubscribe;
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

        if (status.isFinalized) {
          for (var i = 0; i < token_ids.length; i++) {
            await APICall.askBeUpdateNftData({
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
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

        if (status.isFinalized) {
          for (var i = 0; i < token_ids.length; i++) {
            await APICall.askBeUpdateNftData({
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
          }
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

        if (status?.isFinalized) {
          for (var i = 0; i < token_ids.length; i++) {
            await APICall.askBeUpdateNftData({
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
          }
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

        if (status.isFinalized) {
          for (var i = 0; i < token_ids.length; i++) {
            await APICall.askBeUpdateNftData({
              collection_address: artzero_nft.CONTRACT_ADDRESS,
              token_id: token_ids[i],
            });
          }
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const staking_calls = {
  setClaimable,
  stopRewardDistribution,
  startRewardDistribution,
  getRewardStarted,
  getStakedAccountsAccountByIndex,
  getAdminAddress,
  updateIsLocked,
  getIsLocked,
  claimReward,
  addReward,
  getRewardPool,
  getClaimableReward,
  isClaimed,
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
