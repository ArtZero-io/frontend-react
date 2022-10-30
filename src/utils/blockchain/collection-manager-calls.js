import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress } from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { APICall } from "@api/client";
import { getEstimatedGas } from "..";

let contract;

export const setCollectionContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
  // console.log("contract setCollectionContract", contract);
};

//SETTERS

// CREATE COLLECTION ADVANCED MODE
async function addNewCollection(caller_account, data, dispatch, txType, api) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  if (!isValidAddressPolkadotAddress(data?.nftContractAddress)) {
    toast.error(`Address not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = await getAdvanceModeAddingFee(caller_account);

  // gasLimit = await getEstimatedGas(
  //   address,
  //   contract,
  //   value,
  //   "addNewCollection",
  //   address,
  //   data?.nftContractAddress,
  //   data.attributes,
  //   data.attributeVals,
  //   data.collectionAllowRoyalFee,
  //   data.collectionRoyalFeeData
  // );

  // console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .addNewCollection(
      { gasLimit, value },
      address,
      data?.nftContractAddress,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyalFee,
      data.collectionRoyalFeeData
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

      if (status?.isFinalized) {
        await APICall.askBeUpdateCollectionData({
          collection_address: data.nftContractAddress,
        });
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

// CREATE COLLECTION SIMPLE MODE
async function autoNewCollection(caller_account, data, dispatch, txType, api) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = await getSimpleModeAddingFee(caller_account);

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "autoNewCollection",
    data.nftName,
    data.nftSymbol,
    address,
    data.attributes,
    data.attributeVals,
    data.collectionAllowRoyalFee,
    data.collectionRoyalFeeData
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .autoNewCollection(
      { gasLimit, value },
      data.nftName,
      data.nftSymbol,
      address,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyalFee,
      data.collectionRoyalFeeData
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

      if (status?.isFinalized) {
        await APICall.askBeUpdateCollectionData({
          collection_address: data.nftContractAddress,
        });
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function updateIsActive(caller_account, collection_address, isActive) {
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
    "updateIsActive",
    collection_address,
    isActive
  );

  console.log("ret ret uri xxx", gasLimit);

  //TODO: update tx and Error handler
  contract.tx
    .updateIsActive({ gasLimit, value }, collection_address, isActive)
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      if (dispatchError) {
        if (dispatchError.isModule) {
          toast.error(`There is some error with your request`);
        } else {
          console.log("dispatchError ", dispatchError.toString());
        }
      }

      if (status) {
        const statusText = Object.keys(status.toHuman())[0];
        toast.success(
          `Update Collection Status ${
            statusText === "0" ? "started" : statusText.toLowerCase()
          }.`
        );

        if (status?.isFinalized) {
          await APICall.askBeUpdateCollectionData({
            collection_address: collection_address,
          });
        }
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
//GETTERS
async function getCollectionCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getCollectionCount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getCollectionsByOwner(caller_account, owner) {
  if (!contract || !caller_account || !isValidAddressPolkadotAddress(owner)) {
    return null;
  }
  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getCollectionsByOwner(
    address,
    { value: azero_value, gasLimit },
    owner
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getContractById(caller_account, collection_id) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getContractById(
    address,
    { value: azero_value, gasLimit },
    collection_id
  );
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
  console.log("CCC contract", contract);
  console.log("CCC caller_account", caller_account);

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });

  console.log("CCC output.toHuman()", output.toHuman());

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function isActive(caller_account, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query[
    "crossArtZeroCollection::isActive"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getRoyalFee(caller_account, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query[
    "crossArtZeroCollection::getRoyalFee"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getContractType(caller_account, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query[
    "crossArtZeroCollection::getContractType"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getCollectionOwner(caller_account, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query[
    "crossArtZeroCollection::getCollectionOwner"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getCollectionByAddress(caller_account, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getCollectionByAddress(
    address,
    { value: azero_value, gasLimit },
    collection_address
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getSimpleModeAddingFee(caller_account) {
  const gasLimit = -1;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getSimpleModeAddingFee(
    address,
    {
      gasLimit,
    }
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getAdvanceModeAddingFee(caller_account) {
  const gasLimit = -1;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getAdvanceModeAddingFee(
    address,
    {
      gasLimit,
    }
  );

  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getMaxRoyalFeeRate(caller_account) {
  const gasLimit = -1;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getMaxRoyalFeeRate(address, {
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
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

async function getActiveCollectionCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getActiveCollectionCount(
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

async function setMultipleAttributes(
  caller_account,
  collection_address,
  attributes,
  values,
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
    "setMultipleAttributes",
    collection_address,
    attributes,
    values
  );

  console.log("ret ret uri xxx", gasLimit);

  caller_account &&
    contract.tx
      .setMultipleAttributes(
        { gasLimit, value },
        collection_address,
        attributes,
        values
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

        if (status?.isFinalized) {
          await APICall.askBeUpdateCollectionData({
            collection_address: collection_address,
          });
        }
      })
      .then((unsub) => (unsubscribe = unsub))
      .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const collection_manager_calls = {
  getAdvanceModeAddingFee,
  getSimpleModeAddingFee,
  addNewCollection,
  autoNewCollection,
  getCollectionCount,
  getCollectionsByOwner,
  getCollectionByAddress,
  getContractById,
  getAdminAddress,
  isActive,
  getRoyalFee,
  getContractType,
  getCollectionOwner,
  updateIsActive,
  owner,
  getActiveCollectionCount,
  getAttributes,
  setCollectionContract,
  setMultipleAttributes,
  getMaxRoyalFeeRate,
};

export default collection_manager_calls;

export const withdrawCollectionContract = async (
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
