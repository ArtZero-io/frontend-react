import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../wallets/extension-dapp";
import { getPublicCurrentAccount, truncateStr } from "..";
import {
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";

// let account;
let contract;
const value = 0;
const gasLimit = -1;
// export const setAccount = (newAccount) => (account = newAccount);

export const setProfileContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
  // console.log("contract setProfileContract", contract);
};

export async function getProfileOnChain({ callerAccount, accountAddress }) {
  const address = callerAccount?.address;

  let profileInfo;

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
        username: output.toHuman()[0],
        avatar: output.toHuman()[1],
        bio: output.toHuman()[2],
        facebook: output.toHuman()[3],
        twitter: output.toHuman()[4],
        instagram: output.toHuman()[5],
        telegram: output.toHuman()[6],
      },
    };
  } else {
    profileInfo = {
      status: "ERROR",
      message: "Error when fetch profile info.",
    };
  }

  return profileInfo;
}

export async function setSingleAttributeProfileOnChain(currentAccount, data) {
  let unsubscribe;

  const address = currentAccount?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(currentAccount?.meta?.source);

  currentAccount &&
    contract.tx
      .setProfileAttribute({ gasLimit, value }, data?.attribute, data?.value)
      .signAndSend(
        address,
        { signer: injector.signer },
        async ({ status, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = contract.registry.findMetaError(
                dispatchError.asModule
              );
              const { docs, name, section } = decoded;

              console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
            } else {
              console.log(
                "dispatchError setProfileAttribute",
                dispatchError.toString()
              );
            }
          }

          if (status) {
            const statusText = Object.keys(status.toHuman())[0];

            console.log(
              `Profile update ${
                statusText === "0" ? "start" : statusText.toLowerCase()
              }.`
            );
            toast.success(
              `Profile update ${
                statusText === "0" ? "start" : statusText.toLowerCase()
              }.`
            );
          }
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((e) => console.log("e", e));

  return unsubscribe;
}

export async function setMultipleAttributesProfileOnChain(
  caller_account,
  attributes,
  values,
  dispatch,
  txType,
  api
) {
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(caller_account?.meta?.source);

  caller_account &&
    contract.tx
      .setMultipleAttributes({ gasLimit, value }, attributes, values)
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

const blockchainModule = {
  getProfileOnChain,
  setProfileContract,
  setSingleAttributeProfileOnChain,
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
