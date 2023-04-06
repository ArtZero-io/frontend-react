import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../wallets/extension-dapp";
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

let contract;
const value = 0;

export const setProfileContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

export async function getProfileOnChain({ callerAccount, accountAddress }) {
  if (!contract || !callerAccount) {
    toast.error(`Contract or caller not valid!`);
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
  const { signer } = await web3FromSource(caller_account?.meta?.source);

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
