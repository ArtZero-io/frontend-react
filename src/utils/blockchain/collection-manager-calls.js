import BN from "bn.js";
import toast from 'react-hot-toast'
import { web3FromSource } from '../wallets/extension-dapp'
import {isValidAddressPolkadotAddress} from '../../utils'

let collection_manager_contract

function isLoaded() {
  if (collection_manager_contract) return true; else return false;
}
//SETTERS
async function addNewCollection(caller_account ,data) {
  if (!isValidAddressPolkadotAddress(data.nftContractAddress)) {
    console.log('invalid addresses');
    return null;
  }
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const azero_value = await getAddingFee(caller_account);
  collection_manager_contract.tx.addNewCollection(
    { gasLimit, value: azero_value },
    address,
    data.nftContractAddress,
    data.collectionName,
    data.collectionDescription,
    data.avatarData,
    data.headerImageData,
    data.collectionAllowRoyalFee,
    data.collectionRoyalFeeData
  ).signAndSend(address, { signer: injector.signer }, 
    async ({ status, dispatchError }) => {
      if (dispatchError) {
        if (dispatchError.isModule) {
          toast.error(
            `There is some error with your request`
          )
        } else {
          console.log(
            'dispatchError ',
            dispatchError.toString()
          )
        }
      }

      if (status) {
        const statusText = Object.keys(status.toHuman())[0]
        toast.success(
          `Add New Collection ${
            statusText === '0' ? 'started' : statusText.toLowerCase()
          }.`
        )
      }
    }
    ).then((unsub) => {
    unsubscribe = unsub;
  }).catch((e) => {
      if (e === 'Error: Cancelled') {
          toast.error("You cancelled this transaction. Please add new collection again!");
      } else {
          toast.error("Has something wrong in this transaction!");
      }
  });
  return unsubscribe;
}

async function updateIsActive(caller_account,collection_address){
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  collection_manager_contract.tx
    .updateIsActive({ gasLimit, value:azero_value }, collection_address)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(
              `There is some error with your request`
            )
          } else {
            console.log(
              'dispatchError ',
              dispatchError.toString()
            )
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0]
          toast.success(
            `Update Colleciont Status ${
              statusText === '0' ? 'started' : statusText.toLowerCase()
            }.`
          )
        }
      }
    )
    .then(unsub => (unsubscribe = unsub))
    .catch(e => console.log('e', e));
    return unsubscribe;
}
//GETTERS
async function getCollectionCount(caller_account) {
  if (!collection_manager_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query.getCollectionCount(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getCollectionsByOwner(caller_account,owner) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(owner)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query.getCollectionsByOwner(
    address,
    { value:azero_value, gasLimit },
    owner
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getContractById(caller_account,collection_id) {
  if (!collection_manager_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query.getContractById(
    address,
    { value:azero_value, gasLimit },
    collection_id
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getAdminAddress(caller_account) {
  if (!collection_manager_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query.getAdminAddress(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function isActive(caller_account,collection_address) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query["crossArtZeroCollection::isActive"](
    address,
    { value:azero_value, gasLimit },
    collection_address
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getRoyalFee(caller_account,collection_address) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query["crossArtZeroCollection::getRoyalFee"](
    address,
    { value:azero_value, gasLimit },
    collection_address
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getContractType(caller_account,collection_address) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query["crossArtZeroCollection::getContractType"](
    address,
    { value:azero_value, gasLimit },
    collection_address
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getCollectionOwner(caller_account,collection_address) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query["crossArtZeroCollection::getCollectionOwner"](
    address,
    { value:azero_value, gasLimit },
    collection_address
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getCollectionByAddress(caller_account,collection_address) {
  if (!collection_manager_contract || !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query.getCollectionByAddress(
    address,
    { value:azero_value, gasLimit },
    collection_address
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getAddingFee(caller_account) {
  const gasLimit = -1
  const address = caller_account?.address
  const { result, output } = await collection_manager_contract.query.getAddingFee(
    address,
    {gasLimit}
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function owner(caller_account){
  if (!collection_manager_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(collection_manager_contract);

  const { result, output } = await collection_manager_contract.query["ownable::owner"](
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;

}

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  collection_manager_contract = c
}

const collection_manager_calls = {
  setContract,
  getAddingFee,
  addNewCollection,
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
  isLoaded
}

export default collection_manager_calls
