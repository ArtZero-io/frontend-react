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
import {
  formatNumberOutput,
  formatOutput,
  getEstimatedGas,
  readOnlyGasLimit,
} from "..";

let contract;

export const setContract = (c) => {
  contract = c;
};

async function getTotalSupply(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getTotalSupply(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function getPhaseScheduleById(caller_account, phaseId) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseScheduleById(
    address,
    { value: azero_value, gasLimit },
    phaseId
  );
  if (result.isOk) {
    return output.toHuman().Ok;
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
  let gasLimit;

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
  let gasLimit;

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
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getLastPhaseId(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatNumberOutput(output);
  }
  return null;
}

async function getCurrentPhase(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getCurrentPhase(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getPhaseAccountLastIndex(caller_account, phaseId) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
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
    return output.toHuman().Ok;
  }
  return null;
}

async function getPhaseAccountLink(caller_account, phaseId, index) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
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
    return output.toHuman().Ok;
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
  const gasLimit = readOnlyGasLimit(contract);
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

  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getLastTokenId(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const { result, output } = await contract.query.getLastTokenId(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function editProjectInformation(
  caller_account,
  projectInfo,
  dispatch,
  txType,
  api,
  nftContractAddress
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

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

      if (status.isFinalized) {
        const res = await APICall.askBeUpdateProjectData({
          project_address: nftContractAddress,
        });

        console.log("askBeUpdateProjectData res", res);
      }
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
  let gasLimit;

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
  api,
  collection_address
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }

  let unsubscribe;
  let gasLimit;

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

  const txNotSign = contract.tx.publicMint(
    { gasLimit, value },
    phaseId,
    mintAmount
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

      if (status.isFinalized) {
        contract.query
          .getLastTokenId(address, {
            value: 0,
            gasLimit,
          })
          .then(async ({ result, output }) => {
            if (result.isOk) {
              const lastTokenId = formatOutput(output);

              for (
                let token_id = lastTokenId - mintAmount + 1;
                token_id <= lastTokenId;
                token_id++
              ) {
                await APICall.askBeUpdateNftData({
                  collection_address,
                  token_id,
                });
              }
            }
          });
      }
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
  api,
  collection_address
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }
  let unsubscribe;
  let gasLimit;

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

      if (status.isFinalized) {
        contract.query
          .getLastTokenId(address, {
            value: 0,
            gasLimit,
          })
          .then(async ({ result, output }) => {
            if (result.isOk) {
              const lastTokenId = formatOutput(output);

              for (
                let token_id = lastTokenId - mintAmount + 1;
                token_id <= lastTokenId;
                token_id++
              ) {
                await APICall.askBeUpdateNftData({
                  collection_address,
                  token_id,
                });
              }
            }
          });
      }
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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const { result, output } = await contract.query.getProjectInfo(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman().Ok;
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
  let gasLimit;

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
        const res = await APICall.askBeUpdateProjectData({
          project_address: collection_address,
        });

        console.log("askBeUpdateProjectData res", res);
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function grantAdminRoleToAddress(
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
  let gasLimit;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "accessControl::grantRole",
    3739740293,
    adminAddress
  );

  contract.tx["accessControl::grantRole"](
    { gasLimit, value },
    3739740293,
    adminAddress
  )
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
        const res = await APICall.askBeUpdateProjectData({
          project_address: collection_address,
        });

        console.log("askBeUpdateProjectData res", res);
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
  let gasLimit;

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

async function ownerOf(caller_account, tokenID) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
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
    return output.toHuman().Ok;
  }
  return null;
}

async function tokenUri(caller_account, tokenId) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
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
    return output.toHuman().Ok;
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
  let gasLimit;

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
  let gasLimit;

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
  let gasLimit;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "deactivePhase",
    phaseId
  );

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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const { result, output } = await contract.query.getPublicMintedCount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return formatOutput(output);
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

async function getAvailableTokenAmount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const { result, output } = await contract.query.getAvailableTokenAmount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getOwnerClaimedAmount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;
  const { result, output } = await contract.query.getOwnerClaimedAmount(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman().Ok;
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
  let gasLimit;

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
    "adminTrait::withdrawFee",
    withdrawAmount,
    address
  );

  contract.tx["adminTrait::withdrawFee"](
    { gasLimit, value },
    withdrawAmount,
    address
  )
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

export const getPhaseAccountPublicClaimedAmount = async (
  currentAccount,
  nftContractAddress,
  phaseId,
  api
) => {
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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } =
    await contract.query.getPhaseAccountPublicClaimedAmount(
      address,
      {
        value: azero_value,
        gasLimit,
      },
      address,
      phaseId
    );

  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
};

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
  updateAdminAddress,
  grantAdminRoleToAddress,
  mint,
  withdrawFee,
  deactivePhase,
  getAvailableTokenAmount,
  getOwnerClaimedAmount,
  getPhaseAccountPublicClaimedAmount,
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
  const gasLimit = readOnlyGasLimit(contract);

  const { result, output } = await contract.query["psp34::balanceOf"](
    currentAccount?.address,
    { value, gasLimit },
    targetAddress || currentAccount?.address
  );

  let ret = null;

  if (result.isOk) {
    ret = formatNumberOutput(output);
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
  const gasLimit = readOnlyGasLimit(contract);

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
    ret = output.toHuman().Ok?.Ok?.U64;
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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getCurrentPhase(address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    return output.toHuman().Ok;
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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseScheduleById(
    address,
    { value: azero_value, gasLimit },
    phaseId
  );

  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
};
