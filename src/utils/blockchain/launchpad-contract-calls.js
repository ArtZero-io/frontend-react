import toast from "react-hot-toast";
import BN from "bn.js";
import { web3FromSource } from "../wallets/extension-dapp";
import {
  handleContractCallAnimation,
  isValidAddressPolkadotAddress
} from "@utils";
import { ContractPromise } from "@polkadot/api-contract";
import { clientAPI } from "@api/client";
import { AccountActionTypes } from "@store/types/account.types";

let contract;

export const setLaunchPadContract = (api, data) => {
  contract = new ContractPromise(
    api,
    data?.CONTRACT_ABI,
    data?.CONTRACT_ADDRESS
  );
};

async function getAttributes(caller_account, collection_address, attributes) {
  if (!contract || !caller_account) {
    return null;
  }
  let attributeVals;
  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;
  const { result, output } = await contract.query.getAttributes(
    address,
    { value: azero_value, gasLimit },
    collection_address,
    attributes
  );
  if (result.isOk) {
    attributeVals = output.toHuman();
  }
  return attributeVals;
}

async function setMultipleAttributes(
  account,
  collection_address,
  attributes,
  values,
  dispatch
) {
  let unsubscribe;

  const address = account?.address;
  const gasLimit = -1;
  const value = 0;

  const injector = await web3FromSource(account?.meta?.source);

  account &&
    contract.tx
      .setMultipleAttributes(
        { gasLimit, value },
        collection_address,
        attributes,
        values
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
            handleContractCallAnimation(status, dispatchError, dispatch);

            if (status.isFinalized === true) {
              await clientAPI("post", "/updateCollection", {
                collection_address: collection_address,
              });
            }

            // const statusText = Object.keys(status.toHuman())[0];
            // toast.success(
            //   `Update Collection Attributes ${
            //     statusText === "0" ? "started" : statusText.toLowerCase()
            //   }.`
            // );
          }
        }
      )
      .then((unsub) => (unsubscribe = unsub))
      .catch((e) => {
        dispatch({
          type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
        });
        const mess = `Tnx is ${e.message}`;

        toast.error(mess);
      });

  return unsubscribe;
}

async function getProjectInfoByHash(ipfsHash) {
  const ipfsUrl = `https://ipfs.infura.io/ipfs/${ipfsHash}`;
  const projecInfoRes = await clientAPI("get", ipfsUrl, {});
  return projecInfoRes;
}

async function owner(caller_account) {
  console.log('zxczxc');
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query["ownable::owner"](address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getAdminAddress(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getAdminAddress(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getProjectCount(caller_account) {
  if (!contract || !caller_account) {
    return null;
  }
  console.log('xzczxc');
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);
 
  const { result, output } = await contract.query.getProjectCount(address, {
    value: azero_value,
    gasLimit,
  });
  console.log(output);
  if (result.isOk) {
    return new BN(output, 10, "le").toNumber();
  }
  return null;
}

async function getProjectById(caller_account, project_id) {
  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getProjectById(
    address,
    { value: azero_value, gasLimit },
    project_id
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function getProjectByNftAddress(caller_account, nft_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_address)
  ) {
    return null;
  }

  const gasLimit = -1;
  const azero_value = 0;
  const address = caller_account?.address;

  const { result, output } = await contract.query.getProjectByNftAddress(
    address,
    { value: azero_value, gasLimit },
    nft_address
  );
  if (result.isOk) {
    return output.toHuman();
  }
  return null;
}

async function addNewProject(
  caller_account,
  data,
  dispatch
) {
  
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const value = await getProjectAddingFee(caller_account);
  contract.tx
    .addNewProject(
      { gasLimit, value: value },
      address,
      data.total_supply,
      data.start_time,
      data.end_time,
      data.project_info,
      data.code_phases,
      data.start_time_phases,
      data.end_time_phases
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        
        if (status.isFinalized === true) {
          toast.success(`Success`);
        }

        if (dispatchError) {
          console.log(dispatchError.toString());
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;

      toast.error(mess);
    });
  return unsubscribe;
}

async function editProject(
  caller_account,
  data,
  dispatch
) {
  
  let unsubscribe;
  const address = caller_account?.address;
  const gasLimit = -1;
  const injector = await web3FromSource(caller_account?.meta?.source);
  const value = 0;

  contract.tx
    .editProject(
      { gasLimit, value: value },
      data.contract_address,
      data.start_time,
      data.end_time,
      data.project_info
    )
    .signAndSend(
      address,
      { signer: injector.signer },
      async ({ status, dispatchError }) => {
        
        if (status.isFinalized === true) {
          toast.success(`Success`);
        }

        if (dispatchError) {
          console.log(dispatchError.toString());
          if (dispatchError.isModule) {
            toast.error(`There is some error with your request`);
          } else {
            console.log("dispatchError ", dispatchError.toString());
          }
        }
      }
    )
    .then((unsub) => {
      unsubscribe = unsub;
    })
    .catch((e) => {
      dispatch({
        type: AccountActionTypes.CLEAR_ADD_COLLECTION_TNX_STATUS,
      });
      const mess = `Tnx is ${e.message}`;

      toast.error(mess);
    });
  return unsubscribe;
}

async function getProjectAddingFee(caller_account) {
  if (!contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await contract.query.getProjectAddingFee(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output, 10, "le");
  }
  return null;
}

async function updateIsActiveProject(caller_account, isActive, collection_address) {
  if (
    !contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {
    return null;
  }
  let unsubscribe;

  const address = caller_account?.address;
  const gasLimit = -1;
  const azero_value = 0;
  const injector = await web3FromSource(caller_account?.meta?.source);
  contract.tx
    .updateIsActiveProject(
      { gasLimit, value: azero_value },
      isActive,
      collection_address
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
          const statusText = Object.keys(status.toHuman())[0];
          toast.success(
            `Update Collection Status ${
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

const launchpad_contract_calls = {
  setLaunchPadContract,
  getAttributes,
  setMultipleAttributes,
  addNewProject,
  getProjectCount,
  getProjectByNftAddress,
  getProjectById,
  getProjectAddingFee,
  getProjectInfoByHash,
  getAdminAddress,
  owner,
  updateIsActiveProject,
  editProject
};

export default launchpad_contract_calls;
