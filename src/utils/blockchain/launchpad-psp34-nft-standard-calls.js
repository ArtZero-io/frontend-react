/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { APICall } from "../../api/client";
import { isValidAddressPolkadotAddress } from "@utils";
import launchpad_contract_calls from "./launchpad-contract-calls";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";
import { ContractPromise } from "@polkadot/api-contract";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { BN_MILLION, BN_ONE } from "@polkadot/util";
import { formatNumDynamicDecimal, getEstimatedGas } from "..";

let contract;

export const setContract = (c) => {
  contract = c;
};

async function getTotalSupply(caller_account) {
  // console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await contract.query.getTotalSupply(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getPhaseScheduleById(caller_account, phaseId) {
  // console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await contract.query.getPhaseScheduleById(
    address,
    { value: azero_value, gasLimit },
    phaseId
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function updateWhitelist(
  caller_account,
  account,
  phaseId,
  amount,
  price,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  if (parseInt(amount) < 0) {
    toast.error(`Amount can not be less than 0!`);
    return;
  }

  if (!isValidAddressPolkadotAddress(account)) {
    toast.error(`Address not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  const minting_fee = new BN(price * 10 ** 6).mul(new BN(10 ** 6)).toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "updateWhitelist",
    account,
    phaseId,
    amount,
    minting_fee
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.updateWhitelist(
    { gasLimit, value },
    account,
    phaseId,
    amount,
    minting_fee
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
}

async function addWhitelist(
  caller_account,
  account,
  phaseId,
  amount,
  price,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  if (parseInt(amount) < 0) {
    toast.error(`Amount can not be less than 0!`);
    return;
  }

  if (!isValidAddressPolkadotAddress(account)) {
    toast.error(`Address not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  const minting_fee = new BN(price * 10 ** 6).mul(new BN(10 ** 6)).toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "addWhitelist",
    account,
    phaseId,
    amount,
    minting_fee
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.addWhitelist(
    { gasLimit, value },
    account,
    phaseId,
    amount,
    minting_fee
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
}

async function getLastPhaseId(caller_account) {
  // console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await contract.query.getLastPhaseId(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getCurrentPhase(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getCurrentPhase(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getPhaseAccountLastIndex(caller_account, phaseId) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseAccountLastIndex(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    phaseId
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getPhaseAccountLink(caller_account, phaseId, index) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseAccountLink(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    phaseId,
    index
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getWhitelistByAccountId(
  caller_account,
  phaseId,
  accountAddress
) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getWhitelistByAccountId(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    accountAddress,
    phaseId
  );
  // console.log(accountAddress, phaseId);
  // console.log("getWhitelistByAccountId", accountAddress);
  // console.log("getWhitelistByAccountId::index", phaseId);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function editProjectInformation(
  caller_account,
  projectInfo,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
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
    "editProjectInformation",
    projectInfo
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .editProjectInformation({ gasLimit, value }, projectInfo)
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
}

async function mint(caller_account, mintAmount, dispatch, txType, api) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
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
    "mint",
    mintAmount
  );

  console.log("ret ret uri xxx", gasLimit);

  const txNotSign = contract.tx.mint({ gasLimit, value }, mintAmount);

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
}

async function publicMint(
  caller_account,
  phaseId,
  mintingFee,
  mintAmount,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = new BN(mintingFee * 10 ** 6).mul(new BN(10 ** 6)).toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "publicMint",
    phaseId,
    mintAmount
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.publicMint(
    { gasLimit, value },
    phaseId,
    mintAmount
  );

  await txNotSign
    .signAndSend(address, { signer }, ({ status, dispatchError }) => {
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
}

async function whitelistMint(
  caller_account,
  phaseId,
  mintAmount,
  mintingFee,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }
  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = new BN(mintingFee * 10 ** 6).mul(new BN(10 ** 6)).toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "whitelistMint",
    phaseId,
    mintAmount
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .whitelistMint({ gasLimit, value }, phaseId, mintAmount)
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
}

async function getProjectInfo(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getProjectInfo(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function updateAdminAddress(
  caller_account,
  adminAddress,
  dispatch,
  txType,
  api,
  collection_address
) {
  if (!contract || !caller_account) {
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
    "updateAdminAddress",
    adminAddress
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .updateAdminAddress({ gasLimit, value }, adminAddress)
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
      });

      if (status.isFinalized) {
        await APICall.askBeUpdateProjectData({
          project_address: collection_address,
        });
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function updateBaseUri(caller_account, uri, dispatch, txType, api) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
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
    "psp34Traits::setBaseUri",
    uri
  );

  console.log("ret ret uri xxx", gasLimit);

  const txNotSign = contract.tx["psp34Traits::setBaseUri"](
    { gasLimit, value },
    uri
  );

  await txNotSign
    .signAndSend(address, { signer }, ({ status, dispatchError }) => {
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
}

async function getLastTokenId(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getLastTokenId(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function ownerOf(caller_account, tokenID) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query["psp34::ownerOf"](
    address,
    {
      value: azero_value,
      gasLimit,
    },
    tokenID
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function tokenUri(caller_account, tokenId) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    address,
    {
      value: azero_value,
      gasLimit,
    },
    tokenId
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function addNewPhase(
  caller_account,
  phaseCode,
  isPublic,
  publicMintingFee,
  publicMintingAmount,
  publicMaxMintingAmount,
  startTime,
  endTime,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  publicMintingFee = new BN(publicMintingFee * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "addNewPhase",
    phaseCode,
    isPublic,
    publicMintingFee,
    publicMintingAmount,
    publicMaxMintingAmount,
    startTime,
    endTime
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.addNewPhase(
    { gasLimit, value },
    phaseCode,
    isPublic,
    publicMintingFee,
    publicMintingAmount,
    publicMaxMintingAmount,
    startTime,
    endTime
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
}

async function updateSchedulePhase(
  caller_account,
  phaseId,
  phaseCode,
  isPublic,
  publicMintingFee,
  publicMintingAmount,
  publicMaxMintingAmount,
  startTime,
  endTime,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  publicMintingFee = new BN(publicMintingFee * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "updateSchedulePhase",
    phaseId,
    phaseCode,
    isPublic,
    publicMintingFee,
    publicMintingAmount,
    publicMaxMintingAmount,
    startTime,
    endTime
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.updateSchedulePhase(
    { gasLimit, value },
    phaseId,
    phaseCode,
    isPublic,
    publicMintingFee,
    publicMintingAmount,
    publicMaxMintingAmount,
    startTime,
    endTime
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
}

async function deactivePhase(caller_account, phaseId, dispatch, txType, api) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  console.log("deactivePhase phaseId", phaseId);
  
  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "deactivePhase",
    phaseId
  );

  console.log("ret ret xxx", gasLimit);

  const txNotSign = contract.tx.deactivePhase({ gasLimit, value }, phaseId);

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
}

async function getPublicMintedCount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getPublicMintedCount(
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
// jjj

export const getProjectListDetails = async ({ currentAccount, api }) => {
  let ret = [];

  const projectTotalCount = await launchpad_contract_calls.getProjectCount(
    currentAccount
  );

  for (let i = 1; i <= projectTotalCount; i++) {
    const nftAddress = await launchpad_contract_calls.getProjectById(
      currentAccount,
      i
    );

    const project = await launchpad_contract_calls.getProjectByNftAddress(
      currentAccount,
      nftAddress
    );

    const contract = new ContractPromise(
      api,
      launchpad_psp34_nft_standard.CONTRACT_ABI,
      nftAddress
    );

    setContract(contract);

    const projectHash = await getProjectInfo(currentAccount);

    const { avatar, headerSquare, ...rest } =
      await APICall.getProjectInfoByHash({
        projectHash,
      });

    const proj = {
      ...rest,
      ...project,
      avatarImage: avatar,
      squareImage: headerSquare,
      nftContractAddress: nftAddress,
      endTime: parseInt(project?.endTime?.replaceAll(",", "")),
      startTime: parseInt(project?.startTime?.replaceAll(",", "")),
    };
    ret.push(proj);
  }
  return ret;
};

async function getAdminAddress(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
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

async function getAvailableTokenAmount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getAvailableTokenAmount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getOwnerClaimedAmount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getOwnerClaimedAmount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function withdrawFee(caller_account, amount, dispatch, txType, api) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  if (parseInt(amount) <= 0) {
    throw Error(`Amount must greater than 0!`);
  }

  let unsubscribe;
  let gasLimit = -1;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = 0;
  const withdrawAmount = new BN(parseFloat(amount) * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "withdrawFee",
    withdrawAmount
  );

  console.log("ret ret uri xxx", gasLimit);

  contract.tx
    .withdrawFee({ gasLimit, value }, withdrawAmount)
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
}

const launchpad_psp34_nft_standard_calls = {
  getTotalSupply,
  getLastPhaseId,
  setContract,
  getPhaseScheduleById,
  addWhitelist,
  getCurrentPhase,
  getWhitelistByAccountId,
  whitelistMint,
  getPhaseAccountLastIndex,
  getPhaseAccountLink,
  getProjectInfo,
  editProjectInformation,
  updateBaseUri,
  getLastTokenId,
  ownerOf,
  tokenUri,
  getPublicMintedCount,
  publicMint,
  updateWhitelist,
  addNewPhase,
  updateSchedulePhase,
  getAdminAddress,
  updateAdminAddress,
  mint,
  withdrawFee,
  deactivePhase,
  getAvailableTokenAmount,
  getOwnerClaimedAmount,
};

export default launchpad_psp34_nft_standard_calls;

// jjj
export const getAccountBalanceOfPsp34NFT = async ({
  currentAccount,
  targetAddress,
}) => {
  if (!contract || !currentAccount) {
    return null;
  }

  const value = 0;
  const gasLimit = -1;

  const { result, output } = await contract.query["psp34::balanceOf"](
    currentAccount?.address,
    { value, gasLimit },
    targetAddress || currentAccount?.address
  );

  let ret = null;

  if (result.isOk) {
    ret = new BN(output, 10, "le").toNumber();
  }

  return ret;
};

export const getIdOfPsp34NFT = async ({
  currentAccount,
  ownerAddress,
  tokenID,
}) => {
  if (!contract || !currentAccount) {
    return null;
  }

  const value = 0;
  const gasLimit = -1;

  const { result, output } = await contract.query[
    "psp34Enumerable::ownersTokenByIndex"
  ](
    currentAccount?.address,
    { value, gasLimit },
    ownerAddress || currentAccount?.address,
    tokenID
  );

  let ret = null;

  if (result.isOk) {
    ret = output.toHuman().Ok?.U64;
  }

  return ret;
};

export const getCurrentPhaseByProjectAddress = async ({
  currentAccount,
  nftContractAddress,
  api,
}) => {
  if (!nftContractAddress || !currentAccount) {
    console.log("invalid inputs nftContractAddress || currentAccount");
    return null;
  }

  const contract = new ContractPromise(
    api,
    launchpad_psp34_nft_standard.CONTRACT_ABI,
    nftContractAddress
  );

  const address = currentAccount?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getCurrentPhase(address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
};

export const getCurrentPhaseStatusOfProject = async ({
  currentAccount,
  nftContractAddress,
  api,
}) => {
  if (!nftContractAddress || !currentAccount) {
    console.log("invalid inputs nftContractAddress || currentAccount");
    return null;
  }

  const contract = new ContractPromise(
    api,
    launchpad_psp34_nft_standard.CONTRACT_ABI,
    nftContractAddress
  );

  const phaseId = await getCurrentPhaseByProjectAddress({
    currentAccount,
    nftContractAddress,
    api,
  });

  const address = currentAccount?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseScheduleById(
    address,
    { value: azero_value, gasLimit },
    phaseId
  );

  if (result.isOk) {
    // console.log("output.toHuman", output.toHuman());
    return output.toHuman();
  }
  return null;
};
