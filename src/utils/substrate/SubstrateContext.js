import React, { useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import { ApiPromise, WsProvider } from "@polkadot/api";

import { keyring as Keyring } from "@polkadot/ui-keyring";
import { isTestChain } from "@polkadot/util";
import { TypeRegistry } from "@polkadot/types/create";

import config from "./config";

import { resolveDomain } from "..";
import { toast } from "react-hot-toast";

import { NightlyConnectAdapter } from "@nightlylabs/wallet-selector-polkadot";

import { setSigner as setSignerArtzeroNft } from "@utils/blockchain/artzero-nft-calls";
import { setSigner as setSignerAzeroDomainsNft } from "@utils/blockchain/azero-domains-nft-calls";
import { setSigner as setSignerCollectionManager } from "@utils/blockchain/collection-manager-calls";
import { setSigner as setSignerLaunchpadContract } from "@utils/blockchain/launchpad-contract-calls";
import { setSigner as setSignerLaunchpadPsp34Nft } from "@utils/blockchain/launchpad-psp34-nft-standard-calls";
import { setSigner as setSignerMarketplaceContract } from "@utils/blockchain/marketplace_contract_calls";
import { setSigner as setSignerMarketplaceAzeroDomains } from "@utils/blockchain/marketplace-azero-domains-calls";
import { setSigner as setSignerNft721Psp34Standard } from "@utils/blockchain/nft721-psp34-standard-calls";
import { setSigner as setSignerProfile } from "@utils/blockchain/profile_calls";
import { setSigner as setSignerStaking } from "@utils/blockchain/staking_calls";

const adapter = NightlyConnectAdapter.buildLazy(
  {
    appMetadata: {
      name: "a0-test.artzero.io",
      description:
        "ArtZero.io - NFT Marketplace for Aleph Zero Blockchain testnet",
      icon: "https://docs.nightly.app/img/logo.png",
      additionalInfo:
        "Discover, create, collect and trade NFTs on Aleph Zero Blockchain testnet with ArtZero.io",
    },
    network: "AlephZero",
  },
  true // should session be persisted
);

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
  chainSS58: null,
  chainDecimal: null,
  chainToken: null,
  chainName: null,
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
        // apiState: null,
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
      const chainSS58 = _api?.registry?.chainSS58;
      const chainDecimals = _api?.registry?.chainDecimals;
      const chainTokens = _api?.registry?.chainTokens;

      dispatch({
        type: "SET_CHAIN_INFO",
        payload: {
          chainSS58,
          chainDecimal: chainDecimals[0],
          chainToken: chainTokens[0],
        },
      });
      console.log("++++++++ CHAIN INFO ++++++++");
      console.log("+++ chainSS58", chainSS58);
      console.log("+++ chainDecimal", chainDecimals[0]);
      console.log("+++ chainToken", chainTokens[0]);
      console.log("++++++++++++++++++++++++++++");

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
  const [systemChain, systemChainType, chainSS58] = await Promise.all([
    api?.rpc?.system?.chain(),
    api?.rpc?.system?.chainType
      ? api?.rpc?.system?.chainType()
      : Promise.resolve(registry?.createType("ChainType", "Live")),
    api?.registry?.chainSS58,
  ]);

  return {
    systemChain: (systemChain || "<unknown>").toString(),
    systemChainType,
    chainSS58,
  };
};

///
// Loading accounts from dev and polkadot-js extension

function setContractsSigner(adapter) {
  setSignerArtzeroNft(adapter);
  setSignerAzeroDomainsNft(adapter);
  setSignerCollectionManager(adapter);
  setSignerLaunchpadContract(adapter);
  setSignerLaunchpadPsp34Nft(adapter);
  setSignerMarketplaceContract(adapter);
  setSignerMarketplaceAzeroDomains(adapter);
  setSignerNft721Psp34Standard(adapter);
  setSignerProfile(adapter);
  setSignerStaking(adapter);
}

export const loadAccounts = async (state, dispatch) => {
  const { api } = state;

  dispatch({ type: "LOAD_KEYRING" });
  console.log("asyncLoadAccounts A", new Date());
  const asyncLoadAccounts = async () => {
    try {
      await adapter.connect();

      let allAccounts = await adapter.accounts.get();

      setContractsSigner(adapter);

      allAccounts = allAccounts.map(({ address, ...rest }) => ({
        address,
        meta: { ...rest },
      }));
      console.log("asyncLoadAccounts A4", new Date());
      try {
        toast.success(
          `Loading ${allAccounts?.length} account${
            allAccounts?.length > 1 ? "s" : ""
          } ...`
        );

        allAccounts = await Promise.all(
          allAccounts.map(async (item) => {
            const addressDomain = await resolveDomain(item.address, api);
            console.log(
              "asyncLoadAccounts A4 addressDomain",
              addressDomain,
              new Date()
            );

            return {
              ...item,
              meta: {
                ...item.meta,
                addressDomain,
              },
            };
          })
        );
      } catch (error) {
        console.log("resolveDomain error", error);
      }

      console.log("asyncLoadAccounts A5", allAccounts, new Date());
      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      const { systemChain, systemChainType, chainSS58 } =
        await retrieveChainInfo(api);

      console.log("+++++++++++ CHAIN INFO +++++++++++");
      console.log("+++ chainName", systemChain);
      console.log("++++++++++++++++++++++++++++++++++");

      dispatch({
        type: "SET_CHAIN_INFO",
        payload: {
          chainName: systemChain,
        },
      });

      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain);

      console.log("asyncLoadAccounts A6", new Date());
      try {
        console.log("asyncLoadAccounts A7", allAccounts, new Date());
        Keyring.loadAll({ isDevelopment }, allAccounts);
        console.log("asyncLoadAccounts A7", Keyring, new Date());
      } catch (error) {
        allAccounts.forEach(({ address, meta }) => {
          Keyring.saveAddress(address, meta);
        });
      }
      console.log("asyncLoadAccounts A8", new Date());

      Keyring.setSS58Format(chainSS58);

      dispatch({ type: "SET_KEYRING", payload: Keyring });
      console.log("asyncLoadAccounts A9", Keyring, new Date());
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
    await adapter.disconnect();

    const accArr = Keyring.getAccounts();

    await Promise.all(
      accArr.map((item) => Keyring.forgetAccount(item.address))
    ).then(() => {
      dispatch({ type: "LOG_OUT" });

      window.localStorage.setItem("currentAccount", JSON.stringify(""));
    });
  }
  // console.table(state, ["Value"]);
  return (
    <SubstrateContext.Provider
      value={{ state, setCurrentAccount, doLogOut, dispatch, adapter }}
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
