import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress } from "@utils";
import { ContractPromise, Abi } from "@polkadot/api-contract";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { APICall } from "@api/client";
import { clientAPI } from "@api/client";
import collection_manager from "@utils/blockchain/collection-manager";
import { getEstimatedGas } from "..";

let contract;

export const setCollectionContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
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

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "addNewCollection",
    data?.nftContractAddress,
    data.attributes,
    data.attributeVals,
    data.collectionAllowRoyaltyFee,
    data.collectionRoyaltyFeeData
  );

  contract.tx
    .addNewCollection(
      { gasLimit, value },
      data?.nftContractAddress,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyaltyFee,
      data.collectionRoyaltyFeeData
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
        toast.success("Collection is created successful!");

        let transactionData = data;
        await APICall.askBeUpdateCollectionData({
          collection_address: data?.nftContractAddress,
        });
        if (transactionData.attributes?.length) {
          let cacheImages = [];

          for (let i = 0; i < transactionData.attributes.length; i++) {
            console.log(transactionData.attributes[i]);
            if (transactionData.attributes[i] === "avatar_image") {
              cacheImages.push({
                input: transactionData.attributeVals[i],
                is1920: false,
                imageType: "collection",
                metadata: {
                  collectionAddress: data?.nftContractAddress,
                  type: "avatar_image",
                },
              });
            }
            if (transactionData.attributes[i] === "header_image") {
              cacheImages.push({
                input: transactionData.attributeVals[i],
                is1920: false,
                imageType: "collection",
                metadata: {
                  collectionAddress: data?.nftContractAddress,
                  type: "header_image",
                },
              });
            }
            if (transactionData.attributes[i] === "header_square_image") {
              cacheImages.push({
                input: transactionData.attributeVals[i],
                is1920: true,
                imageType: "collection",
                metadata: {
                  collectionAddress: data?.nftContractAddress,
                  type: "header_square_image",
                },
              });
            }
          }

          if (cacheImages.length) {
            await clientAPI("post", "/cacheImages", {
              images: JSON.stringify(cacheImages),
            });
          }
        }
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
  let transactionData = data;
  console.log("data", data);
  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = await getSimpleModeAddingFee(caller_account);

  contract.tx
    .autoNewCollection(
      { gasLimit, value },
      data.nftName,
      data.nftSymbol,
      data.attributes,
      data.attributeVals,
      data.collectionAllowRoyaltyFee,
      data.collectionRoyaltyFeeData
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
        if (status?.isFinalized) {
          toast.success("Collection is created successful!");

          events.forEach(
            async ({ event: { data, method, section }, phase }) => {
              if (section === "contracts" && method === "ContractEmitted") {
                const [accId, bytes] = data.map((data, _) => data).slice(0, 2);
                const contract_address = accId.toString();
                if (contract_address === collection_manager.CONTRACT_ADDRESS) {
                  const abi_collection_contract = new Abi(
                    collection_manager.CONTRACT_ABI
                  );
                  const decodedEvent =
                    abi_collection_contract.decodeEvent(bytes);
                  let event_name = decodedEvent.event.identifier;
                  const eventValues = [];

                  for (let i = 0; i < decodedEvent.args.length; i++) {
                    const value = decodedEvent.args[i];
                    eventValues.push(value.toString());
                  }
                  if (event_name === "AddNewCollectionEvent") {
                    await APICall.askBeUpdateCollectionData({
                      collection_address: eventValues[1],
                    });
                    if (transactionData.attributes?.length) {
                      let cacheImages = [];

                      for (
                        let i = 0;
                        i < transactionData.attributes.length;
                        i++
                      ) {
                        if (transactionData.attributes[i] === "avatar_image") {
                          cacheImages.push({
                            input: transactionData.attributeVals[i],
                            is1920: false,
                            imageType: "collection",
                            metadata: {
                              collectionAddress: eventValues[1],
                              type: "avatar_image",
                            },
                          });
                        }
                        if (transactionData.attributes[i] === "header_image") {
                          cacheImages.push({
                            input: transactionData.attributeVals[i],
                            is1920: false,
                            imageType: "collection",
                            metadata: {
                              collectionAddress: eventValues[1],
                              type: "header_image",
                            },
                          });
                        }
                        if (
                          transactionData.attributes[i] ===
                          "header_square_image"
                        ) {
                          cacheImages.push({
                            input: transactionData.attributeVals[i],
                            is1920: true,
                            imageType: "collection",
                            metadata: {
                              collectionAddress: eventValues[1],
                              type: "header_square_image",
                            },
                          });
                        }
                      }

                      if (cacheImages.length) {
                        await clientAPI("post", "/cacheImages", {
                          images: JSON.stringify(cacheImages),
                        });
                      }
                    }
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

async function updateIsActive(
  caller_account,
  collection_address,
  isActive,
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
    "updateIsActive",
    collection_address,
    isActive
  );

  contract.tx
    .updateIsActive({ gasLimit, value }, collection_address, isActive)
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

//GETTERS
async function getCollectionCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

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

  const { result, output } = await contract.query[
    "crossArtZeroCollection::isActive"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getRoyaltyFee(caller_account, collection_address) {
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

  const { result, output } = await contract.query[
    "artZeroCollectionTrait::getRoyaltyFee"
  ](address, { value: azero_value, gasLimit }, collection_address);
  if (result.isOk) {
    console.log("new BN(output, 10,", new BN(output, 10, "le").toNumber());
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

async function getMaxRoyaltyFeeRate(caller_account) {
  const gasLimit = -1;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getMaxRoyaltyFeeRate(
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

async function owner(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

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
          toast.success("Collection is updated successful!");

          await APICall.askBeUpdateCollectionData({
            collection_address: collection_address,
          });
          if (attributes?.length) {
            let cacheImages = [];

            for (let i = 0; i < attributes.length; i++) {
              if (attributes[i] === "avatar_image") {
                cacheImages.push({
                  input: values[i],
                  is1920: false,
                  imageType: "collection",
                  metadata: {
                    collectionAddress: collection_address,
                    type: "avatar_image",
                  },
                });
              }
              if (attributes[i] === "header_image") {
                cacheImages.push({
                  input: values[i],
                  is1920: false,
                  imageType: "collection",
                  metadata: {
                    collectionAddress: collection_address,
                    type: "header_image",
                  },
                });
              }
              if (attributes[i] === "header_square_image") {
                cacheImages.push({
                  input: values[i],
                  is1920: true,
                  imageType: "collection",
                  metadata: {
                    collectionAddress: collection_address,
                    type: "header_square_image",
                  },
                });
              }
            }

            if (cacheImages.length) {
              await clientAPI("post", "/cacheImages", {
                images: JSON.stringify(cacheImages),
              });
            }
          }
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
  getRoyaltyFee,
  getContractType,
  getCollectionOwner,
  updateIsActive,
  owner,
  getActiveCollectionCount,
  getAttributes,
  setCollectionContract,
  setMultipleAttributes,
  getMaxRoyaltyFeeRate,
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
