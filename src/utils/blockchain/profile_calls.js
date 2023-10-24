import { ContractPromise } from "@polkadot/api-contract";

import {
  getPublicCurrentAccount,
  truncateStr,
  getEstimatedGas,
  readOnlyGasLimit,
} from "..";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { clientAPI } from "@api/client";
import toast from "react-hot-toast";
import { formatBalance } from "@polkadot/util";

export let contract;
const value = 0;

export const setProfileContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

let signer;

export const setSigner = (adapter) => {
  signer = adapter?.signer;
};

export async function getProfileOnChain({ callerAccount, accountAddress }) {
  if (!contract || !callerAccount) {
    toast.error(`caller or Contract not valid!`);
    return null;
  }

  const address = callerAccount?.address;

  let profileInfo;
  let gasLimit = readOnlyGasLimit(contract);

  try {
    const { result, output } = await contract.query.getAttributes(
      address,
      { value, gasLimit },
      accountAddress || address,
      [
        "username",
        "avatar",
        "bio",
        "facebook",
        "twitter",
        "instagram",
        "telegram",
      ]
    );
    if (result.isOk) {
      profileInfo = {
        status: "OK",
        data: {
          username: output.toHuman().Ok[0],
          avatar: output.toHuman().Ok[1],
          bio: output.toHuman().Ok[2],
          facebook: output.toHuman().Ok[3],
          twitter: output.toHuman().Ok[4],
          instagram: output.toHuman().Ok[5],
          telegram: output.toHuman().Ok[6],
        },
      };
    } else {
      profileInfo = {
        status: "ERROR",
        message: "Error when fetch profile info.",
      };
    }
  } catch (error) {
    console.log("error", error);
  }

  return profileInfo;
}

export async function setMultipleAttributesProfileOnChain(
  caller_account,
  attributes,
  values,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "setMultipleAttributes",
    attributes,
    values
  );
  contract.tx
    .setMultipleAttributes({ gasLimit, value }, attributes, values)
    .signAndSend(address, { signer }, async ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
      });
      if (status?.isFinalized) {
        if (attributes?.length) {
          let cacheImages = [];
          for (let i = 0; i < attributes.length; i++) {
            if (attributes[i] === "avatar") {
              cacheImages.push({
                input: values[i],
                imageType: "profile",
                metadata: {
                  walletAddress: address,
                  type: "avatar",
                },
              });
            }
          }

          if (cacheImages.length) {
            await clientAPI("post", "/cacheImages", {
              images: JSON.stringify(cacheImages),
            });
          }
        }
      }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

const blockchainModule = {
  getProfileOnChain,
  setProfileContract,
  setMultipleAttributesProfileOnChain,
};

export default blockchainModule;

export const getUsernameOnchain = async ({ accountAddress }) => {
  const {
    data: { username },
  } = await getProfileOnChain({
    callerAccount: getPublicCurrentAccount(),
    accountAddress,
  });

  return username || truncateStr(accountAddress);
};

export async function execContractQuery(
  callerAddress, // -> currentAccount?.address
  api,
  contractAbi,
  contractAddress,
  queryName,
  ...args
) {
  if (contractAddress === undefined) return;

  if (
    !api ||
    !callerAddress ||
    !queryName ||
    !contractAbi ||
    !contractAddress
  ) {
    console.log("Api invalid");
    // return toast.error("Api invalid");
  }
  //  console.log("@_@ ", queryName, " callerAddress ", callerAddress);

  const contract = new ContractPromise(api, contractAbi, contractAddress);

  const gasLimit = readOnlyGasLimit(contract);

  try {
    const { result, output } = await contract.query[queryName](
      callerAddress,
      { gasLimit, storageDepositLimit: null, value: 0 },
      ...args
    );

    if (result.isOk) {
      return output;
    }
  } catch (error) {
    console.log("@_@ ", queryName, " error >>", error.message);
  }
}

export const formatQueryResultToNumber = (result, chainDecimals = 12) => {
  const ret = result?.toHuman().Ok?.replaceAll(",", "");

  const formattedStrBal = formatBalance(ret, {
    withSi: false,
    forceUnit: "-",
    decimals: chainDecimals,
  });

  return formattedStrBal;
};

export async function execContractTx(
  caller, // -> currentAccount Object
  dispatch,
  txType,
  api,
  contractAbi,
  contractAddress,
  value = 0,
  queryName,
  ...args
) {
  // NOTE: amount need to convert before passing in
  // const totalAmount = new BN(token_amount * 10 ** 6).mul(new BN(10 ** 6)).toString();
  // console.log("execContractTx ", queryName);

  const contract = new ContractPromise(api, contractAbi, contractAddress);

  let unsubscribe;
  let gasLimit;

  gasLimit = await getEstimatedGas(
    caller?.address,
    contract,
    value,
    queryName,
    ...args
  );

  const txNotSign = contract.tx[queryName]({ gasLimit, value }, ...args);

  await txNotSign
    .signAndSend(
      caller.address,
      { signer },
      async ({ events = [], status, dispatchError }) => {
        // console.log("txResponseErrorHandler...1");
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller,
        });
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}
