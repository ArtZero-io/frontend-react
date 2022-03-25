import BN from "bn.js";
import toast from 'react-hot-toast'
import { web3FromSource } from '../wallets/extension-dapp'
import {isValidAddressPolkadotAddress} from '../../utils'
let staking_contract

function isLoaded() {
  if (staking_contract) return true; else return false;
}

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  staking_contract = c
}
//GETTERS
async function getTotalStaked(caller_account) {
  if (!staking_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(staking_contract);

  const { result, output } = await staking_contract.query.getTotalStaked(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalStakedByAccount(caller_account,account) {
  if (!staking_contract || !caller_account ||
    !isValidAddressPolkadotAddress(account)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(staking_contract);

  const { result, output } = await staking_contract.query["crossArtZeroStaking::getTotalStakedByAccount"](
    address,
    { value:azero_value, gasLimit },
    account
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getStakedId(caller_account,account,index) {
  if (!staking_contract || !caller_account ||
    !isValidAddressPolkadotAddress(account)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(staking_contract);

  const { result, output } = await staking_contract.query.getStakedId(
    address,
    { value:azero_value, gasLimit },
    account,index
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

//SETTERS
async function stake(caller_account, token_ids) {
  if (!staking_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  staking_contract.tx
    .stake({ gasLimit, value:azero_value }, token_ids)
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
            `Stake Artzero NFTs ${
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
async function unstake(caller_account, token_ids) {
  if (!staking_contract || !caller_account
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  staking_contract.tx
    .unstake({ gasLimit, value:azero_value }, token_ids)
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
            `Unstake Artzero NFTs ${
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

const staking_calls = {
  getTotalStaked,
  getTotalStakedByAccount,
  getStakedId,
  stake,
  unstake,
  setContract,
  isLoaded
}

export default staking_calls
