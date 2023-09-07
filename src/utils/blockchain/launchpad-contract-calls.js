import BN from "bn.js";
import toast from "react-hot-toast";

import { getEstimatedGas, isValidAddressPolkadotAddress } from "@utils";
import { ContractPromise, Abi } from "@polkadot/api-contract";

import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import { APICall } from "@api/client";
import { readOnlyGasLimit, formatOutput } from "..";
import { reformatAddress } from "@utils/substrate/SubstrateContext";
import { networkSS58 } from "@constants";

let contract;

export const setLaunchPadContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

let signer;

export const setSigner = (adapter) => {
  signer = adapter?.signer;
};

// no use???
async function getAttributes(caller_account, collection_address, attributes) {
  if (!contract || !caller_account) {
    return null;
  }
  let attributeVals;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getAttributes(
    address,
    { value: azero_value, gasLimit },
    collection_address,
    attributes
  );
  if (result.isOk) {
    attributeVals = output.toHuman().Ok;
  }
  return attributeVals;
}

async function getProjectsByOwner(caller_account, ownerAddress) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectsByOwner"
  ](
    address,
    {
      value: azero_value,
      gasLimit,
    },
    ownerAddress
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

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

async function getProjectCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectCount"
  ](address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    return formatOutput(output);
  }

  return null;
}

async function getProjectById(caller_account, project_id) {
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectById"
  ](address, { value: azero_value, gasLimit }, project_id);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getProjectByNftAddress(caller_account, nft_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_address)
  ) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectByNftAddress"
  ](address, { value: azero_value, gasLimit }, nft_address);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function addNewProject(
  caller_account,
  data,
  dispatch,
  txType,
  api,
  createNewCollection
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;

  const value = await getProjectAddingFee(caller_account);

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "addNewProject",
    data.total_supply,
    data.start_time,
    data.end_time,
    data.project_info,
    data.code_phases,
    data.is_public_phases,
    data.public_minting_fee_phases,
    data.public_minting_amout_phases,
    data.public_max_minting_amount_phases,
    data.start_time_phases,
    data.end_time_phases
  );

  contract.tx
    .addNewProject(
      { gasLimit, value: value },
      data.total_supply,
      data.start_time,
      data.end_time,
      data.project_info,
      data.code_phases,
      data.is_public_phases,
      data.public_minting_fee_phases,
      data.public_minting_amout_phases,
      data.public_max_minting_amount_phases,
      data.start_time_phases,
      data.end_time_phases
    )
    .signAndSend(
      address,
      { signer },
      async ({ status, events, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
          isApprovalTx: true,
        });

        if (status.isInBlock) {
          events.forEach(
            async ({ event: { data, method, section }, phase }) => {
              if (section === "contracts" && method === "ContractEmitted") {
                const [accId, bytes] = data.map((data, _) => data).slice(0, 2);

                const contract_address = accId.toString();

                if (contract_address === launchpad_manager.CONTRACT_ADDRESS) {
                  const abi_launchpad_contract = new Abi(
                    launchpad_manager.CONTRACT_ABI
                  );

                  const decodedEvent =
                    abi_launchpad_contract.decodeEvent(bytes);

                  let event_name = decodedEvent.event.identifier;

                  if (event_name === "AddNewProjectEvent") {
                    const eventValues = [];

                    for (let i = 0; i < decodedEvent.args.length; i++) {
                      const value = decodedEvent.args[i];
                      eventValues.push(value.toString());
                    }

                    const nft_address = reformatAddress(
                      eventValues[1],
                      networkSS58
                    );

                    const res = await APICall.askBeUpdateProjectData({
                      project_address: nft_address,
                    });
                    console.log("askBeUpdateProjectData res", res);
                  }
                }
              }
            }
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

// No use ?
async function editProject(caller_account, data, dispatch, txType, api) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "editProject",
    data.contract_address,
    data.start_time,
    data.end_time,
    data.project_info
  );

  contract.tx
    .editProject(
      { gasLimit, value },
      data.contract_address,
      data.start_time,
      data.end_time,
      data.project_info
    )
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
      });
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function getProjectAddingFee(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectAddingFee"
  ](address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatOutput(output);
  }

  return null;
}

async function updateIsActiveProject(
  caller_account,
  isActive,
  collection_address,
  dispatch,
  txType,
  api
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "artZeroLaunchPadTrait::updateIsActiveProject",
    isActive,
    collection_address
  );

  contract.tx["artZeroLaunchPadTrait::updateIsActiveProject"](
    { gasLimit, value },
    isActive,
    collection_address
  )
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
      });

      if (status.isFinalized) {
        const ret = await APICall.askBeUpdateProjectData({
          project_address: collection_address,
        });

        console.log("askBeUpdateProjectData", ret);
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const launchpad_contract_calls = {
  setLaunchPadContract,
  getAttributes,
  // setMultipleAttributes,
  addNewProject,
  getProjectCount,
  getProjectByNftAddress,
  getProjectById,
  getProjectAddingFee,
  owner,
  updateIsActiveProject,
  editProject,
  getProjectsByOwner,
};

export default launchpad_contract_calls;

export const getProjectMintFeeRate = async function (caller_account, api) {
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  setLaunchPadContract(api, launchpad_manager);
  const { result, output } = await contract.query[
    "artZeroLaunchPadTrait::getProjectMintFeeRate"
  ](address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    const ret = output.toHuman().Ok;
    return ret;
  }
  return null;
};

export const withdrawLaunchpadContract = async (
  caller_account,
  amount,
  dispatch,
  txType,
  api
) => {
  if (!contract || !caller_account) {
    console.log("Contract or caller not valid!");
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`Amount can not be less than 0!`);
    return;
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;

  const value = 0;

  const amountFormatted = new BN(parseFloat(amount) * 10 ** 6)
    .mul(new BN(10 ** 12))
    .toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "adminTrait::withdrawFee",
    amountFormatted,
    address
  );

  const txNotSign = contract.tx["adminTrait::withdrawFee"](
    { gasLimit, value },
    amountFormatted,
    address
  );

  await txNotSign
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
      });
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
};
