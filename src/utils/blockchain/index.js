import { web3FromSource } from "../wallets/extension-dapp";
import toast from "react-hot-toast";

let account;
let profileContract;

const gasLimit = -1;
const value = 0;

const currentAccountLocal = JSON.parse(
  window.localStorage.getItem("currentAccount")
);
account = currentAccountLocal || null;

function isLoaded() {
  if (profileContract) return true; else return false;
}

function setAccount(newAccount) {
  // console.log(`Setting a new account in blockchain module`, newAccount.address)
  account = newAccount;
}

function setProfileContract(contract) {
  // console.log(`Setting contract in blockchain module`, c)
  profileContract = contract;
}

async function getWalletAddress() {
  const address = account?.address;

  if (address) {
    return address;
  } else {
    console.log(`Unable to get wallet address.`);
    return "";
  }
}

export async function getProfileOnChain() {
  const address = await getWalletAddress();

  let profile;

  const { result, output } = await profileContract.query.getAttributes(
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
    profile = {
      username: output.toHuman()[0],
      avatar: output.toHuman()[1],
      bio: output.toHuman()[2],
      facebook: output.toHuman()[3],
      twitter: output.toHuman()[4],
      instagram: output.toHuman()[5],
      telegram: output.toHuman()[6],
    };
    console.log("Load profile successful.");
  }

  return profile;
}

export async function setSingleAttributeProfileOnChain(data) {
  let unsubscribe;

  const address = account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(account?.meta?.source);

  account &&
    profileContract.tx
      .setProfileAttribute({ gasLimit, value }, data?.attribute, data?.value)
      .signAndSend(
        address,
        { signer: injector.signer },
        async ({ status, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = profileContract.registry.findMetaError(
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
export async function setMultipleAttributesProfileOnChain(attributes, values) {
  let unsubscribe;

  const address = account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(account?.meta?.source);

  account &&
    profileContract.tx
      .setMultipleAttributes({ gasLimit, value }, attributes, values)
      .signAndSend(
        address,
        { signer: injector.signer },
        async ({ status, dispatchError }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = profileContract.registry.findMetaError(
                dispatchError.asModule
              );
              const { docs, name, section } = decoded;

              console.log(`Lỗi: ${section}.${name}: ${docs.join(" ")}`);
            } else {
              console.log(dispatchError.toString());
            }
          }

          if (status) {
            const statusText = Object.keys(status.toHuman())[0];
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

const blockchainModule = {
  // My account
  getProfileOnChain,
  setAccount,
  setProfileContract,
  setSingleAttributeProfileOnChain,
  setMultipleAttributesProfileOnChain,
  isLoaded
};

export default blockchainModule;
