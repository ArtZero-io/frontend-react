//import { web3FromSource } from '@polkadot/extension-dapp'
import BN from "bn.js";
import toast from 'react-hot-toast'
import { web3FromSource } from '@polkadot/extension-dapp'
import {isValidAddressPolkadotAddress} from '../../utils'
let artzero_contract

/*
  PSP34 functions
*/
async function owner(caller_account){
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query["ownable::owner"](
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;

}
async function totalSupply(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query["psp34::totalSupply"](
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function balanceOf(caller_account, account) {
  if (!artzero_contract || !caller_account || !account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query["psp34::balanceOf"](
    address,
    { value:azero_value, gasLimit },
    account
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}


/*
  ARTZERO NFT Contract functions
*/
async function getWhitelist(caller_account, account) {
  if (!artzero_contract || !caller_account || !account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getWhitelist(
    address,
    { value:azero_value, gasLimit },
    account
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getMintMode(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getMintMode(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getFee1(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getFee1(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {

    return new BN(output, 10, "le").toNumber()/ (10**12);
  }
  return null;
}
async function getFee2(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getFee2(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber()/ (10**12);
  }
  return null;
}
async function getAmount1(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getAmount1(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function tokenUri(caller_account) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0

  const { result, output } = await artzero_contract.query.tokenUri(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function whitelistMint(caller_account, mint_amount) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  artzero_contract.tx
    .whitelistMint({ gasLimit, value:azero_value }, mint_amount)
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
              'dispatchError setProfileAttribute',
              dispatchError.toString()
            )
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0]
          toast.success(
            `whitelist minting ${
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

async function paidMint(caller_account, fee) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = Math.round(fee * (10**12));
  const injector = await web3FromSource(caller_account?.meta?.source)

  artzero_contract.tx
    .paidMint({ gasLimit, value:azero_value })
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
              'dispatchError setProfileAttribute',
              dispatchError.toString()
            )
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0]
          toast.success(
            `Public Minting ${
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
async function addWhitelist(caller_account, account, amount) {
  if (!artzero_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  console.log(parseInt(amount),account,isValidAddressPolkadotAddress(account))
  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)){
    toast.error(
      `invalid inputs`
    )
    return;
  }
  //TODO: Check account and amount
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  artzero_contract.tx
    .paidMint({ gasLimit, value:azero_value })
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
              'dispatchError setProfileAttribute',
              dispatchError.toString()
            )
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0]
          toast.success(
            `Public Minting ${
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

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  artzero_contract = c
}

const artzero_contract_calls = {
  setContract,
  getWhitelist,
  getMintMode,
  getFee1,
  getFee2,
  getAmount1,
  tokenUri,
  whitelistMint,
  paidMint,
  balanceOf,
  totalSupply,
  owner,
  addWhitelist
}

export default artzero_contract_calls
