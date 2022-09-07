import BN from "bn.js";
import { web3FromSource } from "../wallets/extension-dapp";
import { isValidAddressPolkadotAddress } from "@utils";
import { TypeRegistry, U32 } from "@polkadot/types";
import { ContractPromise } from "@polkadot/api-contract";

import { APICall } from "@api/client";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import toast from "react-hot-toast";

let contract;

export const setMarketplaceContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
  // console.log("contract setMarketplaceContract", contract);
};

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
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
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
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
  }
  return null;
}
async function getNftSaleInfo(caller_account, nft_contract_address, token_id) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !token_id
  ) {
    !contract && console.log("invalid inputs > contract", contract);
    !caller_account &&
      !isValidAddressPolkadotAddress(nft_contract_address) &&
      console.log(
        "invalid inputs > nft_contract_address",
        nft_contract_address
      );
    !token_id && console.log("invalid inputs > token_id", token_id);
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
async function getAllBids(
  caller_account,
  nft_contract_address,
  seller,
  token_id
) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
  ) {
    !contract && console.log("invalid inputs > contract", contract);
    !caller_account &&
      // console.log("invalid inputs > caller_account ", caller_account);
      !isValidAddressPolkadotAddress(nft_contract_address) &&
      console.log(
        "invalid inputs > nft_contract_address",
        nft_contract_address
      );
    // !isValidAddressPolkadotAddress(seller) &&
    // console.log("invalid inputs > seller", seller);
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
    token_id
  );
  if (result.isOk) {
    if (output.isSome) return output.toHuman();
    else {
      return null;
    }
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
    return new BN(output, 10, "le");
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
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
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
    /* eslint-disable no-useless-escape */
    const a = output.toHuman().replace(/\,/g, "");
    return a / 10 ** 12;
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
  dispatch,
  txType,
  api
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

  const sale_price = new BN(price * 10 ** 6).mul(new BN(10 ** 6)).toString();

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
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function unlist(
  caller_account,
  nft_contract_address,
  seller,
  token_id,
  dispatch,
  txType,
  api
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
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateBidsData({
            collection_address: nft_contract_address,
            seller: seller,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateCollectionData({
            collection_address: nft_contract_address,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function bid(
  caller_account,
  nft_contract_address,
  seller,
  token_id,
  bid_amount,
  dispatch,
  txType,
  api
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

  const injector = await web3FromSource(caller_account?.meta?.source);
  const azero_value = new BN(bid_amount * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  contract.tx
    .bid({ gasLimit, value: azero_value }, nft_contract_address, token_id)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateBidsData({
            collection_address: nft_contract_address,
            seller: seller,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function removeBid(
  caller_account,
  nft_contract_address,
  seller,
  token_id,
  dispatch,
  txType,
  api
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
    .removeBid({ gasLimit, value: azero_value }, nft_contract_address, token_id)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateBidsData({
            collection_address: nft_contract_address,
            seller: seller,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function buy(
  caller_account,
  nft_contract_address,
  seller,
  token_id,
  price,
  dispatch,
  txType,
  api
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

  const azero_value = new BN(price / 10 ** 6).mul(new BN(10 ** 6)).toString();
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .buy({ gasLimit, value: azero_value }, nft_contract_address, token_id)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateCollectionData({
            collection_address: nft_contract_address,
          });

          await APICall.askBeUpdateBidsData({
            collection_address: nft_contract_address,
            seller: seller,
            token_id: token_id.u64,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function acceptBid(
  caller_account,
  nft_contract_address,
  seller,
  token_id,
  bidIndex,
  dispatch,
  txType,
  api
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
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        if (status?.isFinalized) {
          await APICall.askBeUpdateNftData({
            collection_address: nft_contract_address,
            token_id: token_id.u64,
          });

          await APICall.askBeUpdateCollectionData({
            collection_address: nft_contract_address,
          });

          await APICall.askBeUpdateBidsData({
            collection_address: nft_contract_address,
            seller: seller,
            token_id: token_id.u64,
          });
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

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
  setMarketplaceContract,
  removeBid,
  getStakingDiscountCriteria,
  getStakingDiscountRate,
};

export default marketplace_contract_calls;

export const withdrawMarketplaceContract = async (
  caller_account,
  amount,
  dispatch,
  txType,
  api,
  receiver_address
) => {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`Amount can not be less than 0!`);
    return;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  const amountFormatted = new BN(parseFloat(amount) * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  // withdrawFee for emergency withdraw only
  // withdrawProfit for normal use case
  // address set fixed due to withdraw to admin address only

  const txNotSign = contract.tx.withdrawProfit(
    { gasLimit, value: azero_value },
    amountFormatted,
    receiver_address || address
  );

  await txNotSign
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
};
