import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import {
  isValidAddressPolkadotAddress,
  handleContractCallAddNftAnimation,
} from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import { AccountActionTypes } from "@store/types/account.types";
import { clearTxStatus } from "../../store/actions/txStatus";

let contract;

export const setAZNFTContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
  // console.log("contract setAZNFTContract", contract);
};

/*
  PSP34 functions
*/

async function owner(caller_account) {
  if (!contract || !caller_account) {
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

async function getAdminAddress(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function totalSupply(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query["psp34::totalSupply"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function balanceOf(caller_account, account) {
  if (!contract || !caller_account || !account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query["psp34::balanceOf"](
    address,
    { value: azero_value, gasLimit },
    account
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

/*
  ARTZERO NFT Contract functions
*/
async function getWhitelistAccount(caller_account, index) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getWhitelistAccount(
    address,
    { value: azero_value, gasLimit },
    index
  );
  if (result.isOk) {
    //console.log(output);
    return output.toHuman();
  }
  return null;
}

async function getWhitelistCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getWhitelistCount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getWhitelist(caller_account, account) {
  if (!contract || !caller_account || !account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);
  try {
    const { result, output } = await contract.query.getWhitelist(
      address,
      { value: azero_value, gasLimit },
      account
    );
    if (result.isOk) {
      return output.toHuman();
    }
  } catch (e) {
    return null;
  }

  return null;
}

async function getMintMode(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getMintMode(address, {
    value: azero_value,
    gasLimit,
  });

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getMintingFee(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getMintingFee(address, {
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

async function getPublicSaleAmount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getPublicSaleAmount(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}
async function getPublicSaleMintedAmount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getPublicSaleMintedCount(
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

async function whitelistMint(caller_account, mint_amount, dispatch) {
  if (!contract || !caller_account) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .whitelistMint({ gasLimit, value: azero_value }, mint_amount)
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        if (dispatchError) {
          dispatch({
            type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
          });
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          handleContractCallAddNftAnimation(status, dispatchError, dispatch);

          // const statusText = Object.keys(status.toHuman())[0];
          // toast.success(
          //   `Whitelist minting ${
          //     statusText === "0" ? "started" : statusText.toLowerCase()
          //   }.`
          // );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;
      // console.log("e.message", e.message);
      toast.error(mess);
    });
  return unsubscribe;
}

async function paidMint(caller_account, fee, dispatch) {
  if (!contract || !caller_account) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = Math.round(fee * 10 ** 12);
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .paidMint({ gasLimit, value: azero_value })
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
          handleContractCallAddNftAnimation(status, dispatchError, dispatch);

          // const statusText = Object.keys(status.toHuman())[0];
          // toast.success(
          //   `Public Minting ${
          //     statusText === "0" ? "started" : statusText.toLowerCase()
          //   }.`
          // );
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;
      // console.log("e.message", e.message);
      toast.error(mess);
    });
  return unsubscribe;
}

async function addWhitelist(caller_account, account, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .addWhitelist({ gasLimit, value: azero_value }, account, amount)
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

async function initialize(
  caller_account,
  admin_address,
  name,
  symbol,
  total_supply,
  minting_fee,
  public_sale_amount
) {
  if (!contract || !caller_account) {
    return null;
  }

  if (!isValidAddressPolkadotAddress(admin_address)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .initialize(
      { gasLimit, value: azero_value },
      admin_address,
      name,
      symbol,
      total_supply,
      minting_fee,
      public_sale_amount
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
            `Initialize ${
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

async function updateWhitelistAmount(caller_account, account, amount) {
  if (!contract || !caller_account) {
    return null;
  }

  if (parseInt(amount) <= 0 || !isValidAddressPolkadotAddress(account)) {
    toast.error(`invalid inputs`);
    return;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  contract.tx
    .updateWhitelistAmount({ gasLimit, value: azero_value }, account, amount)
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

async function withdrawFee(caller_account, amount) {
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
      parseFloat(amount) * 10 ** 12
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
          toast.success(
            `Withdraw Fee ${
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

async function allowance(
  caller_account,
  owner_address,
  operator_address,
  token_id
) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  // const tokenId = await contract.api.createType("ContractsPsp34Id", {
  //   U64: new U64(new TypeRegistry(), token_id),
  // });
  const { result, output } = await contract.query["psp34::allowance"](
    address,
    { value: azero_value, gasLimit },
    owner_address,
    operator_address,
    token_id
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function approve(
  caller_account,
  operator_address,
  token_id,
  is_approve,
  dispatch
) {
  if (!contract || !caller_account) {
    return null;
  }
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  await contract.tx["psp34::approve"](
    { gasLimit, value: azero_value },
    operator_address,
    token_id,
    is_approve
  )
    .signAndSend(
      address,
      { signer: injector.signer },
      ({ dispatchError, status }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman())[0];
          if (status.isFinalized) {
            toast.success(
              `Approve ${
                statusText === "0" ? "started" : statusText.toLowerCase()
              }.`
            );
          }
        }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      dispatch(clearTxStatus());
      const mess = `Tnx is ${e.message}`;
      // console.log("e.message", e.message);
      toast.error(mess);
      return;
    });
  return unsubscribe;
}

const contract_calls = {
  getAdminAddress,
  allowance,
  approve,
  getWhitelistAccount,
  getWhitelistCount,
  getWhitelist,
  getMintMode,
  getMintingFee,
  getPublicSaleAmount,
  getPublicSaleMintedAmount,
  tokenUri,
  whitelistMint,
  paidMint,
  balanceOf,
  totalSupply,
  owner,
  addWhitelist,
  updateWhitelistAmount,
  withdrawFee,
  initialize,
  // isLoaded,
};

export default contract_calls;
