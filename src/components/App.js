import React from 'react'

import { ChakraProvider, Grid } from '@chakra-ui/react'
import { SubstrateContextProvider, useSubstrateState } from '../utils/substrate'
import Router from '@components/Router'

// import { ColorModeSwitcher } from '../components/ColorModeSwitcher/ColorModeSwitcher'
import { Toaster } from 'react-hot-toast'
import Layout from './Layout/Layout'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@store/store'
import theme from '../theme/theme'

function Main() {
  const { apiState, apiError } = useSubstrateState()

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <div
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Toaster position="top-right" reverseOrder={false} />
        <Router />
      </Layout>
    </ChakraProvider>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </SubstrateContextProvider>
  )
}
