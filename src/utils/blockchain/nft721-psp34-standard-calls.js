import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { numberToU8a } from "@polkadot/util";

let nft721_psp34_standard_contract;
function setContract(c) {
  console.log(`Setting contract in blockchain module`, c);
  nft721_psp34_standard_contract = c;
}

async function getTotalSupply(caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34::totalSupply"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
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
    .then((unsub) => {
      unsubscribe = unsub;
      console.log(unsubscribe);
    })
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function getAttributeName(caller_account, attributeIndex) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributeName"
  ](address, { value: azero_value, gasLimit }, attributeIndex);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAttributeCount(caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributeCount"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function mintWithAttributes(caller_account, attributes) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  let resStatus = false;
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
          if (status.isFinalized) {
            // eslint-disable-next-line
            const lastTokenId = await this.getTotalSupply(caller_account);
            let atributeName = [];
            let attributeVal = [];
            for (const attribute of attributes) {
              atributeName.push(attribute.name);
              attributeVal.push(attribute.value);
            }
            const tokenIdOnChain = await nft721_psp34_standard_contract.api.createType('ContractsPsp34Id', {'U8': numberToU8a(lastTokenId)});

            nft721_psp34_standard_contract.tx["psp34Traits::setMultipleAttributes"]({ gasLimit, value: azero_value }, tokenIdOnChain, atributeName, attributeVal).signAndSend(address,
              { signer: injector.signer },({ status }) => {
                if (status) {
                  const statusText = Object.keys(status.toHuman())[0];
                  if (status.isFinalized) {
                    toast.success(
                      `Public Minting ${
                        statusText === "0" ? "started" : statusText.toLowerCase()
                      }.`
                    );
                  }
                }
              });
          }
          

        }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
      console.log(unsubscribe);
    })
    .catch((e) => console.log("e", e));
  return resStatus;
}

async function getAttribute(caller_account, tokenId, attribute) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Metadata::getAttribute"
  ](address, { value: azero_value, gasLimit }, tokenId, attribute);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAttributes(caller_account, tokenId, attributes) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  
  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributes"
  ](address, { value: azero_value, gasLimit }, tokenId, attributes);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

const nft721_psp34_standard_calls = {
  mint,
  mintWithAttributes,
  getTotalSupply,
  setContract,
  getAttributeCount,
  getAttributeName,
  getAttributes,
  getAttribute
};

export default nft721_psp34_standard_calls;
