/* eslint-disable no-unused-vars */
import BN from "bn.js";
import toast from "react-hot-toast";
import { web3FromSource } from "../wallets/extension-dapp";
import { TypeRegistry, U64 } from "@polkadot/types";
import { clientAPI } from "@api/client";

import { APICall } from "@api/client";
import { ContractPromise } from "@polkadot/api-contract";

import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import {
  createObjAttrsNFT,
  formatOutput,
  getEstimatedGas,
  readOnlyGasLimit,
} from "..";
import {
  setTxStatus,
  txErrorHandler,
  txResponseErrorHandler,
} from "@store/actions/txStatus";
import { START } from "@constants";

let contract;

export const setContract = (c) => {
  contract = c;
};

async function getTotalSupply(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34::totalSupply"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function tokenUri(caller_account, token_id) {
  if (!contract || !caller_account) {
    return null;
  }

  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    address,
    { value: azero_value, gasLimit },
    token_id
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }

  return null;
}

async function mint(caller_account) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = 0;

  gasLimit = await getEstimatedGas(address, contract, value, "mint");

  contract.tx
    .mint({ gasLimit, value })
    .signAndSend(
      address,
      { signer },
      async ({ status, dispatchError, output }) => {
        if (dispatchError) {
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError", dispatchError.toString());
          }
        }

        if (status) {
          const statusText = Object.keys(status.toHuman().Ok)[0];
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
    })
    .catch((e) => console.log("e", e));
  return unsubscribe;
}

async function getAttributeName(caller_account, attributeIndex) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Traits::getAttributeName"
  ](address, { value: azero_value, gasLimit }, attributeIndex);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getAttributeCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Traits::getAttributeCount"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return formatOutput(output);
  }
  return null;
}

async function mintWithAttributes(
  caller_account,
  nft_address,
  attributes,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    throw Error(`Contract or caller not valid!`);
  }

  let unsubscribe;
  let gasLimit;

  let metadata = [];
  for (const attribute of attributes) {
    metadata.push([attribute.name.trim(), attribute.value.trim()]);
  }

  const address = caller_account?.address;
  const { signer } = await web3FromSource(caller_account?.meta?.source);

  const value = 0;

  gasLimit = await getEstimatedGas(
    address,
    contract,
    value,
    "mintWithAttributes",
    metadata
  );
  contract.tx
    .mintWithAttributes({ gasLimit, value }, metadata)
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
        toast.success("NFT is created successful!");

        const token_id = await getTotalSupply(address);

        await APICall.askBeUpdateNftData({
          collection_address: nft_address,
          token_id: token_id,
        });
        if (attributes?.length) {
          let cacheImages = [];

          for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].name === "avatar") {
              cacheImages.push({
                input: attributes[i].value,
                is1920: false,
                imageType: "nft",
                metadata: {
                  collectionAddress: nft_address,
                  tokenId: token_id,
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

async function getAttribute(caller_account, tokenId, attribute) {
  if (!contract || !caller_account) {
    return null;
  }

  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query[
    "psp34Metadata::getAttribute"
  ](caller_account, { value: azero_value, gasLimit }, tokenId, attribute);

  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getAttributes(caller_account, tokenId, attributes) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34Traits::getAttributes"](
    address,
    { value: azero_value, gasLimit },
    tokenId,
    attributes
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

async function getOwnerAddressByTokenId(caller_account, token_id) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = readOnlyGasLimit(contract);
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
    return output.toHuman().Ok;
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
  const gasLimit = readOnlyGasLimit(contract);
  const azero_value = 0;

  const { result, output } = await contract.query["psp34::allowance"](
    address,
    { value: azero_value, gasLimit },
    owner_address,
    operator_address,
    token_id
  );
  if (result.isOk) {
    return output.toHuman().Ok;
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
    toast.error(`Contract or caller not valid!`);
    return null;
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
    "psp34::approve",
    operator_address,
    token_id,
    is_approve
  );

  await contract.tx["psp34::approve"](
    { gasLimit, value },
    operator_address,
    token_id,
    is_approve
  )
    .signAndSend(address, { signer }, ({ status, dispatchError }) => {
      txResponseErrorHandler({
        status,
        dispatchError,
        dispatch,
        txType,
        api,
        caller_account,
        isApprovalTx: true,
      });

      // if (status.isFinalized) {
      //   // set status for next step
      //   dispatch(
      //     setTxStatus({
      //       type: txType,
      //       step: START,
      //     })
      //   );
      // }
    })
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));

  return unsubscribe;
}

async function setMultipleAttributesNFT(
  caller_account,
  collection_address,
  tokenID,
  attributes,
  dispatch,
  txType,
  api
) {
  if (!contract || !caller_account) {
    toast.error(`Contract or caller not valid!`);
    return null;
  }
  let metadata = [];
  for (const attribute of attributes) {
    metadata.push([attribute.name.trim(), attribute.value.trim()]);
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
    "psp34Traits::setMultipleAttributes",
    { u64: tokenID },
    metadata
  );

  await contract.tx["psp34Traits::setMultipleAttributes"](
    { value, gasLimit },
    { u64: tokenID },
    metadata
  )
    .signAndSend(
      address,
      { signer },
      async ({ events = [], status, dispatchError }) => {
        txResponseErrorHandler({
          status,
          dispatchError,
          dispatch,
          txType,
          api,
          caller_account,
        });

        events.forEach(({ event: { method } }) => {
          if (method === "ExtrinsicSuccess" && status.type === "InBlock") {
            toast.success("NFT is updated successful!");
          } else if (method === "ExtrinsicFailed") {
            toast.error(`Error: ${method}.`);
          }
        });

        if (status.isFinalized) {
          await APICall.askBeUpdateNftData({
            collection_address,
            token_id: tokenID,
          });

          if (attributes?.length) {
            let cacheImages = [];

            for (let i = 0; i < attributes.length; i++) {
              if (attributes[i].name === "avatar") {
                cacheImages.push({
                  input: attributes[i].value,
                  is1920: false,
                  imageType: "nft",
                  metadata: {
                    collectionAddress: collection_address,
                    tokenId: tokenID,
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
      }
    )
    .then((unsub) => (unsubscribe = unsub))
    .catch((error) => txErrorHandler({ error, dispatch }));
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
  const gasLimit = readOnlyGasLimit(contract);

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    currentAccount?.address,
    { value, gasLimit },
    tokenID
  );

  if (result.isOk) {
    return output.toHuman().Ok;
  }

  return null;
};

// eslint-disable-next-line no-unused-vars
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
  const gasLimit = readOnlyGasLimit(contract);

  const { result, output } = await contract.query["psp34Traits::tokenUri"](
    currentAccount?.address,
    { value, gasLimit },
    1
  );

  if (result.isOk) {
    return output.toHuman().Ok?.replace("1.json", "");
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
  let {
    ret: [tokenDetails],
  } = await APICall.getNFTByID({
    collection_address,
    token_id,
  });

  // Collections Type 'Psp34Auto' - Simple Mode
  if (contractType === "Psp34Auto") {
    const data = createObjAttrsNFT(
      tokenDetails.attributes,
      tokenDetails.attributesValue
    );

    tokenDetails = { ...tokenDetails, ...data };
  }

  // Collections Type 'Psp34Manual' - Adv Mode
  if (contractType === "Psp34Manual") {
    const data = await getNftAttrsType1(
      api,
      currentAccount,
      collection_address,
      token_id
    );

    tokenDetails = { ...tokenDetails, ...data };
  }

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
