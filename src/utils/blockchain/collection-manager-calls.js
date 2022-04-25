/* eslint-disable no-unused-vars */
import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { handleContractCall, isValidAddressPolkadotAddress } from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import { clientAPI } from "@api/client";

let account;
let contract;

export const setAccount = (newAccount) => (account = newAccount);

export const setCollectionContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

//SETTERS
async function addNewCollection(caller_account, data, dispatch) {
  if (!isValidAddressPolkadotAddress(data?.nftContractAddress)) {
    return null;
  }
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const azero_value = await getAddingFee(caller_account);
  contract.tx
    .addNewCollection(
      { gasLimit, value: azero_value },
      address,
      data?.nftContractAddress,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyalFee,
      data.collectionRoyalFeeData
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        handleContractCall(status, dispatchError, dispatch, contract);

        if (status.isFinalized === true) {
          console.log("status", status);
          const update_collection_api_res = await clientAPI(
            "post",
            "/updateCollection",
            {
              collection_address: data.nftContractAddress,
            }
          );
          console.log("update_collection_api_res", update_collection_api_res);
        }
        // if (dispatchError) {
        //   if (dispatchError.isModule) {
        //     toast.error(`There is some error with your request`);
        //   } else {
        //     console.log("dispatchError ", dispatchError.toString());
        //   }
        // }

        // if (status) {
        //   const statusText = Object.keys(status.toHuman())[0];
        //   toast.success(
        //     `Add New Collection ${
        //       statusText === "0" ? "started" : statusText.toLowerCase()
        //     }.`
        //   );
        // }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      if (e === "Error: Cancelled") {
        toast.error(
          "You cancelled this transaction. Please add new collection again!"
        );
      } else {
        toast.error("Has something wrong in this transaction!");
      }
    });
  return unsubscribe;
}

async function autoNewCollection(caller_account, data, dispatch) {
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const azero_value = await getAddingFee(caller_account);
  contract.tx
    .autoNewCollection(
      { gasLimit, value: azero_value },
      data.nftName,
      data.nftSymbol,
      address,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyalFee,
      data.collectionRoyalFeeData
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        handleContractCall(status, dispatchError, dispatch, contract);
        // if (dispatchError) {
        //   if (dispatchError.isModule) {
        //     toast.error(`There is some error with your request`);
        //   } else {
        //     console.log("dispatchError ", dispatchError.toString());
        //   }
        // }

        // if (status) {
        //   const statusText = Object.keys(status.toHuman())[0];
        //   toast.success(
        //     `Add New Collection ${
        //       statusText === "0" ? "started" : statusText.toLowerCase()
        //     }.`
        //   );
        // }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      if (e === "Error: Cancelled") {
        toast.error(
          "You cancelled this transaction. Please add new collection again!"
        );
      } else {
        toast.error("Has something wrong in this transaction!");
      }
    });
  return unsubscribe;
}

async function updateIsActive(caller_account, collection_address, isActive) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .updateIsActive(
      { gasLimit, value: azero_value },
      collection_address,
      isActive
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
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Update Colleciont Status ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
          if (status.isFinalized === true) {
            const update_collection_api_res = await clientAPI(
              "post",
              "/updateCollection",
              {
                collection_address: collection_address,
              }
            );
            console.log("update_collection_api_res", update_collection_api_res);
          }
        }
      }
    )
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

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });
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
async function getAddingFee(caller_account) {
  const gasLimit = -1;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getAddingFee(address, {
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

async function getAttributes(caller_account, nft_contract_address, attributes) {
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
    nft_contract_address,
    attributes
  );
  if (result.isOk) {
    attributeVals = output.toHuman();
  }
  return attributeVals;
}

const collection_manager_calls = {
  getAddingFee,
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
  setAccount,
};

export default collection_manager_calls;
