import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  SubstrateContextProvider,
  useSubstrateState,
} from "../utils/substrate";
import Router from "@components/Router";
import { store } from "@store/store";

import { ChakraProvider, Grid } from "@chakra-ui/react";
import theme from "../theme/theme";
import "@fontsource/oswald";

function Main() {
  const { apiState, apiError } = useSubstrateState();

  const message = (errObj) => (
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
  );

  if (apiState === "ERROR") return message(apiError);

  return (
    <ChakraProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </ChakraProvider>
  );
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
  );
}
