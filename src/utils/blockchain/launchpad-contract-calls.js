import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import {
  getEstimatedGas,
  handleContractCallAnimation,
  isValidAddressPolkadotAddress,
} from "@utils";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import { AccountActionTypes } from "@store/types/account.types";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import launchpad_manager from "@utils/blockchain/launchpad-manager";
import { APICall } from "@api/client";

let contract;

export const setLaunchPadContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function getAttributes(caller_account, collection_address, attributes) {
  if (!contract || !caller_account) {
    return null;
  }
  let attributeVals;
  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getAttributes(
    address,
    { value: azero_value, gasLimit },
    collection_address,
    attributes
  );
  if (result.isOk) {
    attributeVals = output.toHuman();
  }
  return attributeVals;
}

async function getProjectsByOwner(caller_account, ownerAddress) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getProjectsByOwner(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    ownerAddress
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

// No use ?
async function setMultipleAttributes(
  account,
  collection_address,
  attributes,
  values,
  dispatch
) {
  let unsubscribe;

  const address = account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(account?.meta?.source);

  account &&
    contract.tx
      .setMultipleAttributes(
        { gasLimit, value },
        collection_address,
        attributes,
        values
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
            handleContractCallAnimation(status, dispatchError, dispatch);

            if (status?.isFinalized) {
              await APICall.askBeUpdateCollectionData({
                collection_address: collection_address,
              });
            }

            // const statusText = Object.keys(status.toHuman())[0];
            // toast.success(
            //   `Update Collection Attributes ${
            //     statusText === "0" ? "started" : statusText.toLowerCase()
            //   }.`
            // );
          }
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((e) => {
        dispatch({
          type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
        });
        const mess = `Tnx is ${e.message}`;

        toast.error(mess);
      });

  return unsubscribe;
}

async function owner(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query["ownable::owner"](address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
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
  console.log("LP contract", contract);
  console.log("LP caller_account", caller_account);

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });

  console.log("LP output.toHuman()", output.toHuman());
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getProjectCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getProjectCount(address, {
    value: azero_value,
    gasLimit,
  });
  // console.log(output);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getProjectById(caller_account, project_id) {
  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getProjectById(
    address,
    { value: azero_value, gasLimit },
    project_id
  );
  if (result.isOk) {
    return output.toHuman();
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

  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getProjectByNftAddress(
    address,
    { value: azero_value, gasLimit },
    nft_address
  );
  if (result.isOk) {
    return output.toHuman();
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
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = await getProjectAddingFee(caller_account);

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "addNewProject",
    address,
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

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .addNewProject(
      { gasLimit, value },
      address,
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
        });

        if (status.isInBlock) {
          events.forEach(({ event: { data, method, section }, phase }) => {
            if (section === "contracts" && method === "ContractEmitted") {
              const [accId, bytes] = data.map((data, _) => data).slice(0, 2);

              const contract_address = accId.toString();

              if (contract_address === launchpad_manager.CONTRACT_ADDRESS) {
                const abi_launchpad_contract = new Abi(
                  launchpad_manager.CONTRACT_ABI
                );

                const decodedEvent = abi_launchpad_contract.decodeEvent(bytes);

                let event_name = decodedEvent.event.identifier;

                if (event_name === "AddNewProjectEvent") {
                  const eventValues = [];

                  for (let i = 0; i < decodedEvent.args.length; i++) {
                    const value = decodedEvent.args[i];
                    eventValues.push(value.toString());
                  }

                  const nft_address = eventValues[1];

                  (async () =>
                    await APICall.askBeUpdateProjectData({
                      project_address: nft_address,
                    }))();

                  console.lof("addNewProject nft_address,", nft_address);
                  createNewCollection(nft_address);
                }
              }
            }
          });
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
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

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

  console.log("ret ret uri xxx", gasLimit);

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
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getProjectAddingFee(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le");
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
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "updateIsActiveProject",
    isActive,
    collection_address
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .updateIsActiveProject({ gasLimit, value }, isActive, collection_address)
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

        console.log("ret", ret);
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const launchpad_contract_calls = {
  setLaunchPadContract,
  getAttributes,
  setMultipleAttributes,
  addNewProject,
  getProjectCount,
  getProjectByNftAddress,
  getProjectById,
  getProjectAddingFee,
  getAdminAddress,
  owner,
  updateIsActiveProject,
  editProject,
  getProjectsByOwner,
};

export default launchpad_contract_calls;

export const getProjectMintFeeRate = async function (caller_account, api) {
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  setLaunchPadContract(api, launchpad_manager);
  const { result, output } = await contract.query[
    "crossArtZeroLaunchPadPSP34::getProjectMintFeeRate"
  ](address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    const ret = output.toHuman();
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
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`Amount can not be less than 0!`);
    return;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  const amountFormatted = new BN(parseFloat(amount) * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "withdrawFee",
    amountFormatted
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.withdrawFee(
    { gasLimit, value },
    amountFormatted
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
