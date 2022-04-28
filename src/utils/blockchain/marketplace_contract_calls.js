import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress } from "@utils";
import { TypeRegistry, U128, U32 } from "@polkadot/types";
import { ContractPromise } from "@polkadot/api-contract";
import { clientAPI } from "@api/client";
import { handleContractCall } from "..";

// eslint-disable-next-line no-unused-vars
let account;
let contract;

export const setAccount = (newAccount) => (account = newAccount);

// function isLoaded() {
//   if (contract) return true;
//   else return false;
// }

export const setMarketplaceContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

function setContract(c) {
  // console.log(`xyz 2 Setting contract in contract blockchain module`, c)
  contract = c;
}

//GETS
async function totalTokensForSale(
  caller_account,
  nft_contract_address,
  seller
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.totalTokensForSale(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address,
    seller
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getVolumeByCollection(caller_account, nft_contract_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return 0;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getVolumeByCollection(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address
  );
  if (result.isOk) {
    if (output) return new BN(output, 10, "le").toNumber();
    else return 0;
  }
  return 0;
}
async function getTotalVolume(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getTotalVolume(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getNftSaleInfo(caller_account, nft_contract_address, token_id) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getNftSaleInfo(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address,
    token_id
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function getForSaleTokenId(
  caller_account,
  nft_contract_address,
  seller,
  index
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getForSaleTokenId(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address,
    seller,
    index
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getAllBids(caller_account, nft_contract_address, seller, index) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getAllBids(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address,
    seller,
    index
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}
async function owner(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
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
async function getStakingDiscountCriteria(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getStakingDiscountCriteria(
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return output;
  }
  return null;
}
async function getStakingDiscountRate(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getStakingDiscountRate(
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return output;
  }
  return null;
}
async function getPlatformFee(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getPlatformFee(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getCurrentProfit(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getCurrentProfit(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getTotalProfit(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getTotalProfit(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getListedTokenCountByCollectionAddress(
  caller_account,
  nft_contract_address
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } =
    await contract.query.getListedTokenCountByCollectionAddress(
      address,
      { value: azero_value, gasLimit },
      nft_contract_address
    );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

//SETS
async function list(
  caller_account,
  nft_contract_address,
  token_id,
  price,
  dispatch
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  const sale_price = new U128(new TypeRegistry(), Math.round(price * 10 ** 12));

  contract.tx
    .list(
      { gasLimit, value: azero_value },
      nft_contract_address,
      token_id,
      sale_price
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        handleContractCall(status, dispatchError, dispatch, contract);

        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (status.isFinalized === true) {
            // toast.success(`Okay`);
            console.log("token_id", token_id);
            const update_nft_api_res = await clientAPI("post", "/updateNFT", {
              collection_address: nft_contract_address,
              token_id: token_id.u64,
            });
            console.log("update_nft_api_res", update_nft_api_res);
          }
          toast.success(
            `List NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function unlist(
  caller_account,
  nft_contract_address,
  token_id,
  dispatch
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .unlist({ gasLimit, value: azero_value }, nft_contract_address, token_id)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        handleContractCall(status, dispatchError, dispatch, contract);

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
            `Unlist NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
          if (status.isFinalized === true) {
            // toast.success(`Okay`);
            console.log("token_id", token_id);
            const update_nft_api_res = await clientAPI("post", "/updateNFT", {
              collection_address: nft_contract_address,
              token_id: token_id.u64,
            });
            console.log("update_nft_api_res", update_nft_api_res);
          }
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function bid(caller_account, nft_contract_address, token_id, bid_amount) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = Math.round(bid_amount * 10 ** 12);
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .bid({ gasLimit, value: azero_value }, nft_contract_address, token_id)
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
            `Bid NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function removeBid(caller_account, nft_contract_address, token_id) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .removeBid({ gasLimit, value: azero_value }, nft_contract_address, token_id)
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
            `Remove Bid NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function buy(caller_account, nft_contract_address, token_id, price) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  //const azero_value = new U128(new TypeRegistry(), price);
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .buy({ gasLimit, value: price }, nft_contract_address, token_id)
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
          if (status.isFinalized === true) {
            toast.success(`Okay`);
            console.log("token_id", token_id);
            const update_nft_api_res = await clientAPI("post", "/updateNFT", {
              collection_address: nft_contract_address,
              token_id: token_id.u64,
            });
            console.log("update_nft_api_res", update_nft_api_res);
          }
          toast.success(
            `Buy NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}
async function acceptBid(
  caller_account,
  nft_contract_address,
  token_id,
  bidIndex
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
  ) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const bid_id = new U32(new TypeRegistry(), bidIndex);
  contract.tx
    .acceptBid(
      { gasLimit, value: azero_value },
      nft_contract_address,
      token_id,
      bid_id
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
          if (status.isFinalized === true) {
            toast.success(`Okay`);
            console.log("token_id", token_id);
            const update_nft_api_res = await clientAPI("post", "/updateNFT", {
              collection_address: nft_contract_address,
              token_id: token_id.u64,
            });
            console.log("update_nft_api_res", update_nft_api_res);
          }
          toast.success(
            `Accept Bid NFT ${
              statusText === "0" ? "started" : statusText.toLowerCase()
            }.`
          );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

const marketplace_contract_calls = {
  getListedTokenCountByCollectionAddress,
  getTotalProfit,
  getCurrentProfit,
  getPlatformFee,
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
  setMarketplaceContract,
  setAccount,
  removeBid,
  getStakingDiscountCriteria,
  getStakingDiscountRate,
};

export default marketplace_contract_calls;
