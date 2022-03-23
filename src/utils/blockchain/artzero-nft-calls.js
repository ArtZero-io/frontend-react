//import { web3FromSource } from '@polkadot/extension-dapp'

let artzero_contract

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

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  artzero_contract = c
}

const artzero_contract_calls = {
  setContract,
  getWhitelist,
  getMintMode
}

export default artzero_contract_calls
