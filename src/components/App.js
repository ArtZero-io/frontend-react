import React from 'react'

import { SubstrateContextProvider } from '../utils/substrate'
import Router from '@components/Router'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/store'

export default function App() {
  return (
    <SubstrateContextProvider>
      <Provider store={store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
      </Provider>
    </SubstrateContextProvider>
  )
}
