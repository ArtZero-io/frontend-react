/* eslint-disable no-unused-vars */
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import BN from "bn.js";
import { TypeRegistry, U64 } from "@polkadot/types";
import { clientAPI } from "@api/client";
import {
  handleContractCallAddNftAnimation,
  // handleContractCallAnimation,
} from "@utils";
import { AccountActionTypes } from "@store/types/account.types";
import { APICall } from "../../api/client";
import { ContractPromise } from "@polkadot/api-contract";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import { createObjAttrsNFT } from "..";
import {
  setTxStatus,
  txErrorHandler,
  txResponseErrorHandler,
} from "../../store/actions/txStatus";
import { START } from "@constants";

let contract;

export const setContract = (c) => {
  contract = c;
  // console.log("contract setPsp34Contract", contract);
};
console.log("xxxcontract", contract);
async function getTotalSupply(caller_account) {
  // console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } = await contract.query["psp34::totalSupply"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function tokenUri(caller_account, token_id) {
  // console.log("getTotalSupply before check", !caller_account);
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    address,
    { value: azero_value, gasLimit },
    token_id
  );
  if (result.isOk) {
    return output.toHuman();
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
              // console.log("dispatchError.isModule", dispatchError.isModule);
              return toast.error(`There is some error with your request`);
            } else {
              // console.log("dispatchError", dispatchError.toString());
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
  dispatch,
  txType,
  api
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

        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        // if (status) {
        // handleContractCallAddNftAnimation(status, dispatchError, dispatch);

        // const statusText = Object.keys(status.toHuman())[0];
        if (status.isFinalized) {
          // set status for next step
          dispatch(
            setTxStatus({
              type: txType,
              step: START,
            })
          );
          // dispatch({
          //   type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
          // });
          //   toast.success(
          //     `Approve ${
          //       statusText === "0" ? "started" : statusText.toLowerCase()
          //     }.`
          //   );
        }
        // }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function setMultipleAttributesNFT(
  account,
  collection_address,
  tokenID,
  attributes,
  dispatch
) {
  let attribute_label = [];
  let attribute_value = [];

  for (const attribute of attributes) {
    if (attribute_label.includes(attribute.name.trim()) === false) {
      attribute_label.push(attribute.name.trim());
      attribute_value.push(attribute.value);
    }
  }
  let unsubscribe;

  const address = account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(account?.meta?.source);

  await contract.tx["psp34Traits::setMultipleAttributes"](
    { value, gasLimit },
    { u64: tokenID },
    attribute_label,
    attribute_value
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
          handleContractCallAddNftAnimation(status, dispatchError, dispatch);

          if (status.isFinalized === true) {
            const response = await APICall.askBeUpdateNftData({
              collection_address,
              token_id: tokenID,
            });

            if (response !== "OK") return toast.error(response);
          }
        }
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_NFT_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;

      toast.error(mess);
    });

  return unsubscribe;
}

// jjj

const getTokenUriType1 = async function (
  api,
  currentAccount,
  collectionAddress,
  tokenID
) {
  const contract = new ContractPromise(
    api,
    nft721_psp34_standard.CONTRACT_ABI,
    collectionAddress
  );

  const value = 0;
  const gasLimit = -1;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    currentAccount?.address,
    { value, gasLimit },
    tokenID
  );

  if (result.isOk) {
    return output.toHuman();
  }

  return null;
};

const getBaseTokenUriType1 = async function (
  api,
  currentAccount,
  collectionAddress
) {
  const contract = new ContractPromise(
    api,
    nft721_psp34_standard.CONTRACT_ABI,
    collectionAddress
  );

  const value = 0;
  const gasLimit = -1;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    currentAccount?.address,
    { value, gasLimit },
    1
  );

  if (result.isOk) {
    return output.toHuman()?.replace("1.json", "");
  }

  return null;
};

const getNftAttrsType1 = async function (
  api,
  currentAccount,
  collectionAddress,
  tokenID
) {
  const token_uri = await getTokenUriType1(
    api,
    currentAccount,
    collectionAddress,
    tokenID
  );

  const metadata = await clientAPI("get", "/getJSON?input=" + token_uri, {});

  if (metadata) {
    const attrsList = metadata?.attributes?.map((item) => {
      return { [item.trait_type]: item.value };
    });

    const ret = {
      attrsList,
      nftName: metadata.name,
      avatar: metadata.image,
      description: metadata.description,
    };

    return ret;
  }
};

export const getNFTDetails = async function (
  api,
  currentAccount,
  collection_address,
  token_id,
  contractType
) {
  let [tokenDetails] = await APICall.getNFTByID({
    collection_address,
    token_id,
  });

  // Collections Type 2 - Simple Mode
  if (contractType === 2) {
    const data = createObjAttrsNFT(
      tokenDetails.attributes,
      tokenDetails.attributesValue
    );

    tokenDetails = { ...tokenDetails, ...data };
  }

  // Collections Type 1 - Adv Mode
  if (contractType === 1) {
    const data = await getNftAttrsType1(
      api,
      currentAccount,
      collection_address,
      token_id
    );

    tokenDetails = { ...tokenDetails, ...data };
  }

  console.log("tokenDetails", tokenDetails);
  return tokenDetails;
};

const nft721_psp34_standard_calls = {
  tokenUri,
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
  setMultipleAttributesNFT,
};

export default nft721_psp34_standard_calls;
