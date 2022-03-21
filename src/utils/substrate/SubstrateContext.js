import React, { useReducer, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { isTestChain } from '@polkadot/util'
import { TypeRegistry } from '@polkadot/types/create'

import config from './config'
import blockchainModule from '../blockchain'
import smartContract from '../blockchain/contracts'
import { ContractPromise } from '@polkadot/api-contract'

const parsedQuery = new URLSearchParams(window.location.search)
const connectedSocket = parsedQuery.get('rpc') || config.PROVIDER_SOCKET
///
// Initial state for `useReducer`

const initialState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  contract: null,
}

const registry = new TypeRegistry()

///
// Reducer function for `useReducer`

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' }
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' }
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' }
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload }
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' }
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' }
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' }
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload }
    case 'SET_CONTRACT':
      return { ...state, contract: action.payload }
    default:
      throw new Error(`Unknown type: ${action.type}`)
  }
}

///
// Connecting to the Substrate node

const connect = (state, dispatch) => {
  const { apiState, socket, jsonrpc } = state
  // We only want this function to be performed once
  if (apiState) return

  dispatch({ type: 'CONNECT_INIT' })

  console.log(`Connected socket: ${socket}`)
  const provider = new WsProvider(socket)
  const _api = new ApiPromise({ provider, rpc: jsonrpc })

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api })
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api => dispatch({ type: 'CONNECT_SUCCESS' }))
  })

  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }))

  _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }))
}

const retrieveChainInfo = async api => {
  const [systemChain, systemChainType] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.chainType
      ? api.rpc.system.chainType()
      : Promise.resolve(registry.createType('ChainType', 'Live')),
  ])
  return {
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
  }
}

///
// Loading accounts from dev and polkadot-js extension
export const loadAccounts = (state, dispatch) => {
  const { api } = state
  dispatch({ type: 'LOAD_KEYRING' })

  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME)
      let allAccounts = await web3Accounts()

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }))

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      const { systemChain, systemChainType } = await retrieveChainInfo(api)
      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain)

      Keyring.loadAll({ isDevelopment }, allAccounts)
      dispatch({ type: 'SET_KEYRING', payload: Keyring })
    } catch (e) {
      console.error(e)
      dispatch({ type: 'KEYRING_ERROR' })
    }
  }

  asyncLoadAccounts()

  const contract = new ContractPromise(
    api,
    smartContract.VENDOR_ABI,
    smartContract.VENDOR_MANAGEMENT_ADDRESS
  )
  dispatch({ type: 'SET_CONTRACT', payload: contract })
  blockchainModule.setContract(contract)
}

const SubstrateContext = React.createContext()

let keyringLoadAll = false

const SubstrateContextProvider = props => {
  const neededPropNames = ['socket']

  neededPropNames.forEach(key => {
    initialState[key] =
      typeof props[key] === 'undefined' ? initialState[key] : props[key]
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  connect(state, dispatch)

  useEffect(() => {
    const { apiState, keyringState } = state
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true
      // loadAccounts(state, dispatch)
    }
  }, [state, dispatch])

  function setCurrentAccount(acct) {
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: acct })
    blockchainModule.setAccount(acct)
  }

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount, dispatch }}>
      {props.children}
    </SubstrateContext.Provider>
  )
}

// prop typechecking
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
}

const useSubstrate = () => useContext(SubstrateContext)
const useSubstrateState = () => useContext(SubstrateContext).state

export { SubstrateContextProvider, useSubstrate, useSubstrateState }
