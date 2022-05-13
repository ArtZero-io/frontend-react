import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { TypeRegistry, U64 } from "@polkadot/types";
import { clientAPI } from "@api/client";
import { handleContractCallAddNftAnimation } from "@utils";
import { AccountActionTypes } from "@store/types/account.types";

let contract;

export const setContract = (c) => {
  contract = c;
  console.log("contract setPsp34Contract", contract);
};

async function getTotalSupply(caller_account) {
  console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await contract.query["psp34::totalSupply"](
    caller_account,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function mint(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
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
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Traits::getAttributeName"
  ](address, { value: azero_value, gasLimit }, attributeIndex);
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAttributeCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Traits::getAttributeCount"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function mintWithAttributes(
  caller_account,
  nft_address,
  attributes,
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
  let resStatus = false;

  let attribute_label = [];
  let attribute_value = [];

  for (const attribute of attributes) {
    if (attribute_label.includes(attribute.name.trim()) === false) {
      attribute_label.push(attribute.name.trim());
      attribute_value.push(attribute.value);
    }
  }

  if (attribute_label.length === attribute_value.length) {
    contract.tx
      .mintWithAttributes(
        { gasLimit, value: azero_value },
        attribute_label,
        attribute_value
      )
      .signAndSend(
        address,
        { signer: injector.signer },
        async ({ status, dispatchError, output }) => {
          if (dispatchError) {
            dispatch({
              type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
            });
            if (dispatchError.isModule) {
              console.log("dispatchError.isModule", dispatchError.isModule);
              return toast.error(`There is some error with your request`);
            } else {
              console.log("dispatchError", dispatchError.toString());
              return toast.error("dispatchError", dispatchError.toString());
            }
          }

          if (status) {
            handleContractCallAddNftAnimation(status, dispatchError, dispatch);

            if (status.isFinalized === true) {
              const token_id = await getTotalSupply(address);

              await clientAPI("post", "/updateNFT", {
                collection_address: nft_address,
                token_id: token_id,
              });
            }
          }
        }
      )
      .then((unsub) => {
        unsubscribe = unsub;
      })
      .catch((e) => {
        dispatch({
          type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
        });
        const mess = `Tnx is ${e.message}`;
        console.log("e.message", e.message);
        toast.error(mess);
      });
  }

  return resStatus && unsubscribe;
}

async function getAttribute(caller_account, tokenId, attribute) {
  if (!contract || !caller_account) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Metadata::getAttribute"
  ](caller_account, { value: azero_value, gasLimit }, tokenId, attribute);

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAttributes(caller_account, tokenId, attributes) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::getAttributes"](
    address,
    { value: azero_value, gasLimit },
    tokenId,
    attributes
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getOwnerAddressByTokenId(caller_account, token_id) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  // const tokenId = new U64(new TypeRegistry(), token_id);
  const tokenId = await contract.api.createType("ContractsPsp34Id", {
    U64: new U64(new TypeRegistry(), token_id),
  });

  const { result, output } = await contract.query["psp34::ownerOf"](
    address,
    { value: azero_value, gasLimit },
    tokenId
  );

  if (result.isOk) {
    return output.toHuman();
  }
  return null;
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
      ({ status, dispatchError }) => {
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
          if (status.isFinalized) {
            dispatch({
              type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
            });

            //   toast.success(
            //     `Approve ${
            //       statusText === "0" ? "started" : statusText.toLowerCase()
            //     }.`
            //   );
          }
        }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;
      console.log("e.message", e.message);
      toast.error(mess);
    });
  return unsubscribe;
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
