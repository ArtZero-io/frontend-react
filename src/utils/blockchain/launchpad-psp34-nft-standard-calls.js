/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { TypeRegistry, U64 } from "@polkadot/types";
import { clientAPI } from "@api/client";
import { AccountActionTypes } from "@store/types/account.types";
import { APICall } from "../../api/client";
import { isValidAddressPolkadotAddress, convertStringToPrice } from "@utils";

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

  const { result, output } = await contract.query.getTotalSupply(
    address,
    { value: azero_value, gasLimit }
  );
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

async function updateWhitelist(caller_account, account, phaseId, amount, price) {
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
    .updateWhitelist({ gasLimit, value: azero_value }, account, phaseId, amount, minting_fee)
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
    .addWhitelist({ gasLimit, value: azero_value }, account, phaseId, amount, minting_fee)
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

  const { result, output } = await contract.query.getLastPhaseId(
    address,
    { value: azero_value, gasLimit }
  );
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

  const { result, output } = await contract.query.getPhaseAccountLastIndex(address, {
    value: azero_value,
    gasLimit,
  }, phaseId);
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

  const { result, output } = await contract.query.getPhaseAccountLinkByPhaseId(address, {
    value: azero_value,
    gasLimit,
  }, phaseId, index);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getProjectInfoByHash(ipfsHash) {
  const ipfsUrl = `https://ipfs.infura.io/ipfs/${ipfsHash}`;
  const projecInfoRes = await clientAPI("get", ipfsUrl, {});
  return projecInfoRes;
}

async function getWhitelistByAccountId(caller_account, phaseId, accountAddress) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getWhitelistByAccountId(address, {
    value: azero_value,
    gasLimit,
  }, accountAddress, phaseId);
  console.log(accountAddress, phaseId);
  console.log('getWhitelistByAccountId', accountAddress);
  console.log('getWhitelistByAccountId::index', phaseId);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}


async function editProjectInformation(caller_account, projectInfo) {
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
            `Edit project information ${
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

async function publicMint(caller_account, phaseId) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;

  const azero_value = await getPublicMintingFee(caller_account);
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .publicMint({ gasLimit, value: azero_value }, phaseId)
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

async function whitelistMint(caller_account, phaseId, amount, minting_fee) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  console.log('whitelistMint::minting_fee', minting_fee);
  const azero_value = new BN(minting_fee / 10 ** 6).mul(new BN(10 ** 6)).toString();
  const injector = await web3FromSource(caller_account?.meta?.source);
  console.log('whitelistMint::azero_value', azero_value);
  contract.tx
    .whitelistMint({ gasLimit, value: azero_value }, phaseId, amount)
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

async function updateBaseUri(caller_account, uri) {
  if (!contract || !caller_account) {
    return null;
  }

  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  console.log(contract);
  contract.tx["launchPadPsp34NftStandardTraits::setBaseUri"]({ gasLimit, value: azero_value }, uri)
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
            `Update base uri ${
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
  const { result, output } = await contract.query["psp34::ownerOf"](address, {
    value: azero_value,
    gasLimit,
  }, tokenID);
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

  const { result, output } = await contract.query["launchPadPsp34NftStandardTraits::tokenUri"](
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

async function getPublicMintingPhaseId(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getPublicMintingPhaseId(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getPublicMintingFee(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getPublicMintingFee(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getTotalPublicMintingAmount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getTotalPublicMintingAmount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getPublicMintedCount(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const { result, output } = await contract.query.getPublicMintedCount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
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
  getPublicMintingPhaseId,
  getPublicMintingFee,
  getTotalPublicMintingAmount,
  getPublicMintedCount,
  publicMint,
  updateWhitelist
};

export default launchpad_psp34_nft_standard_calls;
