// import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
// import { isValidAddressPolkadotAddress, getEstimatedGas } from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import {
  txErrorHandler,
  // txResponseErrorHandler,
} from "../../store/actions/txStatus";
import { formatOutput, getEstimatedGas, readOnlyGasLimit } from "..";

let contract;

export const setAZNFTContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

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

const contract_calls = {
  allowance,
  approve,
  tokenUri,
  balanceOf,
};

export default contract_calls;
