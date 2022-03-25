import React, { useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "../wallets/extension-dapp";
import { keyring as Keyring } from "@polkadot/ui-keyring";
import { isTestChain } from "@polkadot/util";
import { TypeRegistry } from "@polkadot/types/create";

import config from "./config";
import blockchainModule from "../blockchain";
import profile from "../blockchain/profile";

import artzero_nft from "../blockchain/artzero-nft";
import artzero_nft_calls from "../blockchain/artzero-nft-calls";

import marketplace from "../blockchain/marketplace";
import marketplace_contract_calls from "../blockchain/marketplace_contract_calls";

import staking from "../blockchain/staking";
import staking_calls from "../blockchain/staking_calls";

import collection_manager from "../blockchain/collection-manager";
import collection_manager_calls from "../blockchain/collection-manager-calls";
import { ContractPromise } from "@polkadot/api-contract";

const parsedQuery = new URLSearchParams(window.location.search);
const connectedSocket = parsedQuery.get("rpc") || config.PROVIDER_SOCKET;
///
// Initial state for `useReducer`
const currentAccountLocal = JSON.parse(
  window.localStorage.getItem("currentAccount")
);
const selectedExtension = JSON.parse(
  window.localStorage.getItem("selectedExtension")
);

const initialState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: currentAccountLocal || null,
  profileContract: null,
  walletPendingApprove: false,
  supportedWallet: null,
  selectedExtension: selectedExtension || null,
};

const registry = new TypeRegistry();

///
// Reducer function for `useReducer`

const reducer = (state, action) => {
  switch (action.type) {
    case "CONNECT_INIT":
      return { ...state, apiState: "CONNECT_INIT" };
    case "CONNECT":
      return { ...state, api: action.payload, apiState: "CONNECTING" };
    case "CONNECT_SUCCESS":
      return { ...state, apiState: "READY" };
    case "CONNECT_ERROR":
      return { ...state, apiState: "ERROR", apiError: action.payload };
    case "LOAD_KEYRING":
      return { ...state, keyringState: "LOADING" };
    case "SET_KEYRING":
      return { ...state, keyring: action.payload, keyringState: "READY" };
    case "KEYRING_ERROR":
      return { ...state, keyring: null, keyringState: "ERROR" };
    case "SET_CURRENT_ACCOUNT":
      return { ...state, currentAccount: action.payload };
    case "SET_CONTRACT":
      return { ...state, contract: action.payload };
    case "SET_SUPPORTED_EXTENSIONS":
      return { ...state, supportedExtensions: action.payload };
    case "SET_CURRENT_EXTENSION":
      return { ...state, currentExtension: action.payload };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  const { apiState, socket, jsonrpc } = state;

  if (apiState) return;
  dispatch({ type: "CONNECT_INIT" });

  console.log(`Connected socket: ${socket}`);
  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, rpc: jsonrpc });
  _api.on("connected", () => {
    dispatch({ type: "CONNECT", payload: _api });

    _api.isReady.then((_api) => {
      dispatch({ type: "CONNECT_SUCCESS" });
    });
  });

  _api.on("ready", () => {
    dispatch({ type: "CONNECT_SUCCESS" });
  });

  _api.on("error", (err) => {
    dispatch({ type: "CONNECT_ERROR", payload: err });
  });
};

const retrieveChainInfo = async (api) => {
  const [systemChain, systemChainType] = await Promise.all([
    api?.rpc?.system?.chain(),
    api?.rpc?.system?.chainType
      ? api?.rpc?.system?.chainType()
      : Promise.resolve(registry?.createType("ChainType", "Live")),
  ]);
  return {
    systemChain: (systemChain || "<unknown>").toString(),
    systemChainType,
  };
};

///
// Loading accounts from dev and polkadot-js extension

export const loadAccounts = async (state, dispatch, wallet) => {
  const { api } = state;

  dispatch({ type: "LOAD_KEYRING" });

  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME, [], wallet);

      let allAccounts = await web3Accounts();
      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name}` },
      }));

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      const { systemChain, systemChainType } = await retrieveChainInfo(api);
      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain);

      Keyring.loadAll({ isDevelopment }, allAccounts);
      dispatch({ type: "SET_KEYRING", payload: Keyring });
    } catch (e) {
      console.error(e);
      dispatch({ type: "KEYRING_ERROR" });
    }
  };

  asyncLoadAccounts();

  const contract = new ContractPromise(
    api,
    profile.CONTRACT_ABI,
    profile.CONTRACT_ADDRESS
  );
  dispatch({ type: "SET_CONTRACT", payload: contract });
  blockchainModule.setProfileContract(contract);

  const artzero_contract = new ContractPromise(
    api,
    artzero_nft.CONTRACT_ABI,
    artzero_nft.CONTRACT_ADDRESS
  );
  console.log("artzero_contract", artzero_contract);
  artzero_nft_calls.setContract(artzero_contract);

  const collection_contract = new ContractPromise(
    api,
    collection_manager.CONTRACT_ABI,
    collection_manager.CONTRACT_ADDRESS
  );
  console.log("collection_contract", collection_contract);
  collection_manager_calls.setContract(collection_contract);

  const marketplace_contract = new ContractPromise(
    api,
    marketplace.CONTRACT_ABI,
    marketplace.CONTRACT_ADDRESS
  );
  console.log("marketplace_contract", marketplace_contract);
  marketplace_contract_calls.setContract(marketplace_contract);

  const staking_contract = new ContractPromise(
    api,
    staking.CONTRACT_ABI,
    staking.CONTRACT_ADDRESS
  );
  console.log("staking_contract", staking_contract);
  staking_calls.setContract(staking_contract);


};

const SubstrateContext = React.createContext();

let keyringLoadAll = false;

const SubstrateContextProvider = (props) => {
  const neededPropNames = ["socket"];

  neededPropNames.forEach((key) => {
    initialState[key] =
      typeof props[key] === "undefined" ? initialState[key] : props[key];
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  connect(state, dispatch);

  useEffect(() => {
    const { apiState, keyringState } = state;

    if (apiState === "READY" && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true;
      state?.currentAccount?.address &&
        loadAccounts(state, dispatch, state?.selectedExtension);
    }
  }, [state, dispatch]);

  function setCurrentAccount(acct) {
    dispatch({ type: "SET_CURRENT_ACCOUNT", payload: acct });
    blockchainModule.setAccount(acct);
    window.localStorage.setItem("currentAccount", JSON.stringify(acct));
  }

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount, dispatch }}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
};

const useSubstrate = () => useContext(SubstrateContext);
const useSubstrateState = () => useContext(SubstrateContext).state;

export { SubstrateContextProvider, useSubstrate, useSubstrateState };
