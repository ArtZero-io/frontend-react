import React, { useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "../wallets/extension-dapp";
import { keyring as Keyring } from "@polkadot/ui-keyring";
import { isTestChain } from "@polkadot/util";
import { TypeRegistry } from "@polkadot/types/create";

import config from "./config";

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
    case "SET_CHAIN_INFO":
      return { ...state, ...action.payload };
    case "KEYRING_ERROR":
      return { ...state, keyring: null, keyringState: "ERROR" };
    case "SET_CURRENT_ACCOUNT":
      return { ...state, currentAccount: action.payload };
    case "SET_PROFILE_CONTRACT":
      return { ...state, profileContract: "READY" };
    case "SET_SUPPORTED_EXTENSIONS":
      return { ...state, supportedExtensions: action.payload };
    case "SET_CURRENT_EXTENSION":
      return { ...state, currentExtension: action.payload };
    case "LOG_OUT":
      return {
        ...state,
        keyring: null,
        currentAccount: null,
        keyringState: null,
        apiState: null,
        apiStateState: null,
      };
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
  const _api = new ApiPromise({
    provider,
    rpc: jsonrpc,
    types: {
      ContractsPsp34Id: {
        _enum: {
          U8: "u8",
          U16: "u16",
          U32: "u32",
          U64: "u64",
          U128: "u128",
          Bytes: "Vec<u8>",
        },
      },
    },
  });
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
  const [systemChain, systemChainType, chainSS58, chainDecimals, chainTokens] =
    await Promise.all([
      api?.rpc?.system?.chain(),
      api?.rpc?.system?.chainType
        ? api?.rpc?.system?.chainType()
        : Promise.resolve(registry?.createType("ChainType", "Live")),
      api?.registry?.chainSS58,
      api?.registry?.chainDecimals,
      api?.registry?.chainTokens,
    ]);

  return {
    systemChain: (systemChain || "<unknown>").toString(),
    systemChainType,
    chainSS58,
    chainDecimal: chainDecimals[0],
    chainToken: chainTokens[0],
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
      const {
        systemChain,
        systemChainType,
        chainSS58,
        chainDecimal,
        chainToken,
      } = await retrieveChainInfo(api);

      console.log("+++++++++++ CHAIN INFO +++++++++++");
      console.log("+++   chainName", systemChain);
      console.log("+++   chainSS58", chainSS58);
      console.log("+++   chainDecimal", chainDecimal);
      console.log("+++   chainToken", chainToken);
      console.log("+++++++++++ CHAIN INFO +++++++++++");

      dispatch({
        type: "SET_CHAIN_INFO",
        payload: {
          chainName: systemChain,
          chainSS58,
          chainDecimal,
          chainToken,
        },
      });

      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain);

      try {
        Keyring.loadAll({ isDevelopment }, allAccounts);
      } catch (error) {
        allAccounts.forEach(({ address, meta }) => {
          Keyring.saveAddress(address, meta);
        });
      }

      Keyring.setSS58Format(chainSS58);

      dispatch({ type: "SET_KEYRING", payload: Keyring });
    } catch (e) {
      console.error(e);
      dispatch({ type: "KEYRING_ERROR" });
    }
  };

  await asyncLoadAccounts();
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
    // blockchainModule.setAccount(acct);
    window.localStorage.setItem("currentAccount", JSON.stringify(acct));
  }
  async function doLogOut() {
    const accArr = Keyring.getAccounts();

    await Promise.all(
      accArr.map((item) => Keyring.forgetAccount(item.address))
    ).then((result) => {
      dispatch({ type: "LOG_OUT" });

      window.localStorage.setItem("currentAccount", JSON.stringify(""));
    });
  }

  return (
    <SubstrateContext.Provider
      value={{ state, setCurrentAccount, doLogOut, dispatch }}
    >
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
