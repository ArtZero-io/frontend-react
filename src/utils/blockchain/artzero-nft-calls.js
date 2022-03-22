//import { web3FromSource } from '@polkadot/extension-dapp'

let artzero_contract

async function getWhitelist(caller_account, account) {
  if (!artzero_contract || !caller_account || !account ){
    console.log('invalid inputs');
    return null;
  }
  const address = account?.address
  const gasLimit = -1
  const azero_value = 0
  console.log(artzero_contract);

  const { result, output } = await artzero_contract.query.getWhitelist(
    address,
    { value:azero_value, gasLimit },
    account
  )
  //console.log(account,result,output);
  if (result.isOk) {
    //console.log('get_whitelist',output.toHuman())
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
  getWhitelist
}

export default artzero_contract_calls
