import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";

let nft721_psp34_standard_contract;
function setContract(c) {
  console.log(`Setting contract in blockchain module`, c);
  nft721_psp34_standard_contract = c;
}

async function mint(caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);

  nft721_psp34_standard_contract.tx
    .mint({ gasLimit, value: azero_value })
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError, output }) => {
        console.log(output);
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
            `Public Minting ${
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


const nft721_psp34_standard_calls = {
  mint,
  setContract
};

export default nft721_psp34_standard_calls;
