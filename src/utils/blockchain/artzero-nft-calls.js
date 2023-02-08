import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress, getEstimatedGas } from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "../../store/actions/txStatus";
import { formatOutput, readOnlyGasLimit } from "..";

let contract;

export const setAZNFTContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

/*
  PSP34 functions
*/

async function owner(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["ownable::owner"](address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function totalSupply(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34::totalSupply"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function balanceOf(caller_account, account) {
  if (!contract || !caller_account || !account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34::balanceOf"](
    address,
    { value: azero_value, gasLimit },
    account
  );
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

/*
  ARTZERO NFT Contract functions
*/
async function getWhitelistAccount(caller_account, index) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getWhitelistAccount(
    address,
    { value: azero_value, gasLimit },
    index
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getWhitelistCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getWhitelistCount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function getWhitelist(caller_account, account) {
  if (!contract || !caller_account || !account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  try {
    const { result, output } = await contract.query.getWhitelist(
      address,
      { value: azero_value, gasLimit },
      account
    );
    if (result.isOk) {
      return output.toHuman().Ok;
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getMintingFee(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getMintingFee(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().Ok.replace(/\,/g, "");
    return a / 10 ** 12;
  }
  return null;
}

async function getPublicSaleAmount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getPublicSaleAmount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}
async function getPublicSaleMintedAmount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getPublicSaleMintedCount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function tokenUri(caller_account, tokenId) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    address,
    {
      value: azero_value,
      gasLimit,
    },
    tokenId
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function whitelistMint(
  caller_account,
  mint_amount,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "whitelistMint",
    mint_amount
  );

  const txNotSign = contract.tx.whitelistMint({ gasLimit, value }, mint_amount);

  await txNotSign
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
      });
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function paidMint(
  caller_account,
  fee,
  mint_amount,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = Math.round(fee * 10 ** 12);
  const injector = await web3FromSource(caller_account?.meta?.source);

  const txNotSign = contract.tx.paidMint(
    { gasLimit, value: azero_value },
    mint_amount
  );

  await txNotSign
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
        });
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function addWhitelist(caller_account, account, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .addWhitelist({ gasLimit, value: azero_value }, account, amount)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman().Ok)[0];
          toast.success(
            `Add Whitelist ${
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

async function initialize(
  caller_account,
  admin_address,
  name,
  symbol,
  total_supply,
  minting_fee,
  public_sale_amount
) {
  if (!contract || !caller_account) {
    return null;
  }

  if (!isValidAddressPolkadotAddress(admin_address)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .initialize(
      { gasLimit, value: azero_value },
      admin_address,
      name,
      symbol,
      total_supply,
      minting_fee,
      public_sale_amount
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman().Ok)[0];
          toast.success(
            `Initialize ${
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

async function updateWhitelistAmount(caller_account, account, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .updateWhitelistAmount({ gasLimit, value: azero_value }, account, amount)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman().Ok)[0];
          toast.success(
            `Update Whitelist ${
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

async function withdrawFee(caller_account, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx["adminTrait::withdrawFee"](
    { gasLimit, value: azero_value },
    new BN(parseFloat(amount) * 10 ** 6).mul(new BN(10 ** 6)).toString()
  )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman().Ok)[0];
          toast.success(
            `Withdraw Fee ${
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

async function allowance(
  caller_account,
  owner_address,
  operator_address,
  token_id
) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  // const tokenId = await contract.api.createType("ContractsPsp34Id", {
  //   U64: new U64(new TypeRegistry(), token_id),
  // });
  const { result, output } = await contract.query["psp34::allowance"](
    address,
    { value: azero_value, gasLimit },
    owner_address,
    operator_address,
    token_id
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function approve(
  caller_account,
  operator_address,
  token_id,
  is_approve,
  dispatch
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "psp34::approve",
    operator_address,
    token_id,
    is_approve
  );

  await contract.tx["psp34::approve"](
    { gasLimit, value },
    operator_address,
    token_id,
    is_approve
  )
    .signAndSend(address, { signer }, ({ dispatchError, status }) => {
      if (dispatchError) {
        if (dispatchError.isModule) {
          toast.error(`There is some error with your request`);
        } else {
          console.log("dispatchError ", dispatchError.toString());
        }
      }

      if (status) {
        const statusText = Object.keys(status?.toHuman().Ok)[0];
        if (status.isFinalized) {
          toast.success(
            `Approve ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function getPublicMaxMintingAmount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getPublicMaxMintingAmount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

const contract_calls = {
  allowance,
  approve,
  getWhitelistAccount,
  getWhitelistCount,
  getWhitelist,
  getMintingFee,
  getPublicSaleAmount,
  getPublicSaleMintedAmount,
  tokenUri,
  whitelistMint,
  paidMint,
  balanceOf,
  totalSupply,
  owner,
  addWhitelist,
  updateWhitelistAmount,
  withdrawFee,
  initialize,
  getPublicMaxMintingAmount,
  // isLoaded,
};

export default contract_calls;
