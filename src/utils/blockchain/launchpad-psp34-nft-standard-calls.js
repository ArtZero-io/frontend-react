import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { clientAPI } from "@api/client";
import { APICall } from "../../api/client";
import { isValidAddressPolkadotAddress } from "@utils";
import launchpad_contract_calls from "./launchpad-contract-calls";
import launchpad_psp34_nft_standard from "@utils/blockchain/launchpad-psp34-nft-standard";

import { ContractPromise } from "@polkadot/api-contract";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";

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
  price
) {
  if (!contract || !caller_account) {
    return null;
  }
  console.log(parseInt(amount) <= 0);
  console.log(account);
  console.log(!isValidAddressPolkadotAddress(account));
  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const minting_fee = new BN(price * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log(contract);
  contract.tx
    .updateWhitelist(
      { gasLimit, value: azero_value },
      account,
      phaseId,
      amount,
      minting_fee
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Update Whitelist ${
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

async function addWhitelist(caller_account, account, phaseId, amount, price) {
  if (!contract || !caller_account) {
    return null;
  }
  console.log(parseInt(amount) <= 0);
  console.log(account);
  console.log(!isValidAddressPolkadotAddress(account));
  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const minting_fee = new BN(price * 10 ** 6).mul(new BN(10 ** 6)).toString();
  console.log(contract);
  contract.tx
    .addWhitelist(
      { gasLimit, value: azero_value },
      account,
      phaseId,
      amount,
      minting_fee
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Add Whitelist ${
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

async function getPhaseAccountLinkByPhaseId(caller_account, phaseId, index) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query.getPhaseAccountLinkByPhaseId(
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

async function getProjectInfoByHash(ipfsHash) {
  const ipfsUrl = `https://artzeronft.infura-ipfs.io/ipfs/${ipfsHash}`;
  const projecInfoRes = await clientAPI("get", ipfsUrl, {});
  return projecInfoRes;
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
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .editProjectInformation({ gasLimit, value: azero_value }, projectInfo)
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
}

async function mint(caller_account, phaseId, mintAmount) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;

  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .mint({ gasLimit, value: azero_value }, phaseId, mintAmount)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Add Whitelist ${
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
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;

  const azero_value = new BN(mintingFee * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .publicMint({ gasLimit, value: azero_value }, phaseId, mintAmount)
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
}

async function whitelistMint(
  caller_account,
  phaseId,
  amount,
  minting_fee,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  console.log("whitelistMint::minting_fee", minting_fee);
  const azero_value = new BN(minting_fee / 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();
  const injector = await web3FromSource(caller_account?.meta?.source);
  console.log("whitelistMint::azero_value", azero_value);
  contract.tx
    .whitelistMint({ gasLimit, value: azero_value }, phaseId, amount)
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
  api
) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  console.log(contract);
  contract.tx
    .updateAdminAddress({ gasLimit, value: azero_value }, adminAddress)
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
}

async function updateBaseUri(caller_account, uri, dispatch, txType, api) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  console.log(contract);
  contract.tx["launchPadPsp34NftStandardTraits::setBaseUri"](
    { gasLimit, value: azero_value },
    uri
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
      }
    )
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

  const { result, output } = await contract.query[
    "launchPadPsp34NftStandardTraits::tokenUri"
  ](
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
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  publicMintingFee = new BN(publicMintingFee * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  console.log(contract);

  const txNotSign = contract.tx.addNewPhase(
    { gasLimit, value: azero_value },
    phaseCode,
    isPublic,
    publicMintingFee,
    publicMintingAmount,
    publicMaxMintingAmount,
    startTime,
    endTime
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
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  publicMintingFee = new BN(publicMintingFee * 10 ** 6)
    .mul(new BN(10 ** 6))
    .toString();

  console.log(contract);

  const txNotSign = contract.tx.updateSchedulePhase(
    { gasLimit, value: azero_value },
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

async function withdrawFee(caller_account, amount, dispatch, txType, api) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .withdrawFee(
      { gasLimit, value: azero_value },
      new BN(parseFloat(amount) * 10 ** 6).mul(new BN(10 ** 6)).toString()
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
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => console.log("e", e));
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
  getPhaseAccountLinkByPhaseId,
  getProjectInfoByHash,
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
};

export default launchpad_psp34_nft_standard_calls;

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
    ret = output.toHuman().Ok.U64;
  }

  return ret;
};
