import BN from "bn.js";
import toast from 'react-hot-toast'
import { web3FromSource } from '../wallets/extension-dapp'
import {isValidAddressPolkadotAddress} from '../../utils'
let marketplace_contract

function isLoaded() {
  if (marketplace_contract) return true; else return false;
}

function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c)
  marketplace_contract = c
}

//GETS
async function totalTokensForSale(caller_account,nft_contract_address,seller) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.totalTokensForSale(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address,seller
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getVolumeByCollection(caller_account,nft_contract_address) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getVolumeByCollection(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalVolume(caller_account) {
  if (!marketplace_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getTotalVolume(
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getNftSaleInfo(caller_account,nft_contract_address,token_id) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getNftSaleInfo(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address,token_id
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getForSaleTokenId(caller_account,nft_contract_address,seller,index) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getForSaleTokenId(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address,seller,index
  )
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getAllBids(caller_account,nft_contract_address,seller,index) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getAllBids(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address,seller,index
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function owner(caller_account){
  if (!marketplace_contract || !caller_account ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account?.address
  const gasLimit = -1
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query["ownable::owner"](
    address,
    { value:azero_value, gasLimit }
  )
  if (result.isOk) {
    return output.toHuman();
  }
  return null;

}

//SETS
async function list(caller_account, nft_contract_address,token_id,price) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  marketplace_contract.tx
    .list({ gasLimit, value:azero_value }, nft_contract_address,token_id,price)
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
            `List NFT ${
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
async function unlist(caller_account, nft_contract_address,token_id) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  marketplace_contract.tx
    .unlist({ gasLimit, value:azero_value }, nft_contract_address,token_id)
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
            `Unlist NFT ${
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
async function bid(caller_account, nft_contract_address,token_id,bid_amount) {
  if (!marketplace_contract || !caller_account  ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = Math.round(bid_amount * (10**12));
  const injector = await web3FromSource(caller_account?.meta?.source)

  marketplace_contract.tx
    .bid({ gasLimit, value:azero_value }, nft_contract_address,token_id)
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
            `Bid NFT ${
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
async function buy(caller_account, nft_contract_address,token_id,price) {
  if (!marketplace_contract || !caller_account  ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = Math.round(price * (10**12));
  const injector = await web3FromSource(caller_account?.meta?.source)

  marketplace_contract.tx
    .buy({ gasLimit, value:azero_value }, nft_contract_address,token_id)
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
            `Buy NFT ${
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
async function acceptBid(caller_account, nft_contract_address,token_id,bidIndex) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  let unsubscribe

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source)

  marketplace_contract.tx
    .acceptBid({ gasLimit, value:azero_value }, nft_contract_address,token_id,bidIndex)
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
            `Buy NFT ${
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

const marketplace_contract_calls = {
  totalTokensForSale,
  getVolumeByCollection,
  getTotalVolume,
  getNftSaleInfo,
  getForSaleTokenId,
  getAllBids,
  owner,
  list,
  unlist,
  bid,
  buy,
  acceptBid,
  setContract,
  isLoaded
}

export default marketplace_contract_calls
