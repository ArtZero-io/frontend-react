import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { TypeRegistry, U64 } from "@polkadot/types";
// import { ContractPromise } from "@polkadot/api-contract";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./collection-manager";
// import { handleContractCall } from "@utils";
// import { useSubstrateState } from "@utils/substrate/SubstrateContext";

// const { api, currentAccount } = useSubstrateState();

let nft721_psp34_standard_contract;
function setContract(c) {
  // console.log(`Setting contract in blockchain module`, c);
  nft721_psp34_standard_contract = c;
}

async function getTotalSupply(caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34::totalSupply"
  ](caller_account, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function mint(caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
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

async function mintWithAttributes(caller_account, attributes, dispatch) {
  console.log(
    "caller_account, attributes, dispatch",
    caller_account,
    attributes,
    dispatch
  );

  console.log("nft721_psp34_standard_contract", nft721_psp34_standard_contract);
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  let resStatus = false;

  console.log("1 injector", injector);
  console.log(
    "1 nft721_psp34_standard_contract",
    nft721_psp34_standard_contract
  );
  
  let attribute_label = [];
  let attribute_value = [];

  for (const attribute of attributes) {
    attribute_label.push(attribute.name);
    attribute_value.push(attribute.value);
  }

  if (attribute_label.length == attribute_value.length ) {
    nft721_psp34_standard_contract.tx
      .mintWithAttributes({ gasLimit, value: azero_value }, attribute_label, attribute_value)
      .signAndSend(
        address,
        { signer: injector.signer },
        async ({ status, dispatchError, output }) => {
          console.log("status", status, dispatchError, output);

          console.log(output);
          if (dispatchError) {
            if (dispatchError.isModule) {
              toast.error(`There is some error with your request`);
            } else {
              console.log("dispatchError", dispatchError.toString());
            }
          }

          if (status) {
            toast.success(`Okay`);
          }
        }
      )
      .then((unsub) => {
        unsubscribe = unsub;
        console.log(unsubscribe);
      })
      .catch((e) => console.log("e", e));

    console.log(
      "2 nft721_psp34_standard_contract",
      nft721_psp34_standard_contract
    );
  }

  return resStatus;
}

async function getAttribute(caller_account, tokenId, attribute) {
  console.log(
    "getAttribute:getAttribute nft721_psp34_standard_contract",
    nft721_psp34_standard_contract
  );
  console.log("getAttribute:getAttribute caller_account", caller_account);
  console.log(
    "getAttribute precheck",
    !nft721_psp34_standard_contract || !caller_account
  );
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  console.log("getAttribute:getAttribute caller_account", caller_account);
  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Metadata::getAttribute"
  ](caller_account, { value: azero_value, gasLimit }, tokenId, attribute);
  console.log("getAttribute:getAttribute result", result);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAttributes(caller_account, tokenId, attributes) {
  if (!nft721_psp34_standard_contract || !caller_account) {
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

async function getOwnerAddressByTokenId(caller_account, token_id) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  console.log(new U64(new TypeRegistry(), token_id));
  // const tokenId = new U64(new TypeRegistry(), token_id);
  const tokenId = await nft721_psp34_standard_contract.api.createType(
    "ContractsPsp34Id",
    { U64: new U64(new TypeRegistry(), token_id) }
  );
  console.log(tokenId);
  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34::ownerOf"
  ](address, { value: azero_value, gasLimit }, tokenId);

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function allowance(caller_account, operator_address, token_id) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const tokenId = await nft721_psp34_standard_contract.api.createType(
    "ContractsPsp34Id",
    { U64: new U64(new TypeRegistry(), token_id) }
  );
  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34::allowance"
  ](
    address,
    { value: azero_value, gasLimit },
    address,
    operator_address,
    tokenId
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function approve(caller_account, operator_address, token_id, is_approve) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const tokenId = await nft721_psp34_standard_contract.api.createType(
    "ContractsPsp34Id",
    { U64: new U64(new TypeRegistry(), token_id) }
  );
  nft721_psp34_standard_contract.tx["psp34::approve"](
    { gasLimit, value: azero_value },
    operator_address,
    tokenId,
    is_approve
  ).signAndSend(address, { signer: injector.signer }, ({ status }) => {
    if (status) {
      const statusText = Object.keys(status.toHuman())[0];
      if (status.isFinalized) {
        toast.success(
          `Approve ${
            statusText === "0" ? "started" : statusText.toLowerCase()
          }.`
        );
        return true;
      }
    }
  });
  return false;
}

const nft721_psp34_standard_calls = {
  mint,
  mintWithAttributes,
  getTotalSupply,
  setContract,
  getAttributeCount,
  getAttributeName,
  getAttributes,
  getAttribute,
  getOwnerAddressByTokenId,
  approve,
  allowance,
};

export default nft721_psp34_standard_calls;
