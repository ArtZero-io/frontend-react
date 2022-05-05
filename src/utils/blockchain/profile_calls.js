import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { web3FromSource } from "../wallets/extension-dapp";
import { AccountActionTypes } from "@store/types/account.types";
import { truncateStr } from "..";

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
  console.log("contract setProfileContract", contract);
};

// async function getWalletAddress() {
//   const address = account?.address;

//   if (address) {
//     return address;
//   } else {
//     console.log(`Unable to get wallet address.`);
//     return "";
//   }
// }

export async function getProfileOnChain(currentAccount) {
  const address = currentAccount?.address;

  let profileInfo;

  const { result, output } = await contract.query.getAttributes(
    address,
    { value, gasLimit },
    address,
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
      username: output.toHuman()[0],
      avatar: output.toHuman()[1],
      bio: output.toHuman()[2],
      facebook: output.toHuman()[3],
      twitter: output.toHuman()[4],
      instagram: output.toHuman()[5],
      telegram: output.toHuman()[6],
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
  currentAccount,
  attributes,
  values,
  dispatch
) {
  let unsubscribe;

  const address = currentAccount?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(currentAccount?.meta?.source);

  currentAccount &&
    contract.tx
      .setMultipleAttributes({ gasLimit, value }, attributes, values)
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
              console.log(dispatchError.toString());
            }
          }

          if (status) {
            const statusToHuman = Object.entries(status.toHuman());

            if (Object.keys(status.toHuman())[0] === "0") {
              dispatch({
                type: AccountActionTypes.SET_TNX_STATUS,
                payload: { status: "Ready" },
              });
            } else {
              dispatch({
                type: AccountActionTypes.SET_TNX_STATUS,
                payload: {
                  status: statusToHuman[0][0],
                  value: truncateStr(statusToHuman[0][1], 6),
                },
              });
            }

            // const statusText = Object.keys(status.toHuman())[0];
            // toast.success(
            //   `Profile update ${
            //     statusText === "0" ? "start" : statusText.toLowerCase()
            //   }.`
            // );
          }
        }
      )
      .then((unsub) => {
        return (unsubscribe = unsub);
      })
      .catch((e) => console.log("e", e));

  return unsubscribe;
}

const blockchainModule = {
  getProfileOnChain,
  setProfileContract,
  setSingleAttributeProfileOnChain,
  setMultipleAttributesProfileOnChain,
};

export default blockchainModule;
