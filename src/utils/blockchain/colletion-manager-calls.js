import BN from "bn.js";
import toast from 'react-hot-toast'
import { web3FromSource } from '@polkadot/extension-dapp'
import {isValidAddressPolkadotAddress} from '../../utils';

let collection_manager_contract

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
    1, 
    data.collectionAllowRoyalFee, 
    data.collectionRoyalFeeData
  ).signAndSend(address, { signer: injector.signer }, async (result) => {
      let isSuccess = false;
      result.toHuman().events.map((e) => {if (e.method == "ExtrinsicSuccess") { isSuccess = true}});
      if (isSuccess) {
          toast.success("Added collection successfully!");
      } else {
          toast.error("Has something wrong in this transaction!");
      }
  }).then((unsub) => {
    unsubscribe = unsub;
  }).catch((e) => {
      if (e == 'Error: Cancelled') {
          toast.error("You cancelled this transaction. Please add new collection again!");
      } else {
          toast.error("Has something wrong in this transaction!");
      }
  });
  return unsubscribe;
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

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  collection_manager_contract = c
}

const collection_manager_calls = {
  setContract,
  getAddingFee,
  addNewCollection
}

export default collection_manager_calls
