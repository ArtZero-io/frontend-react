import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import { store } from "@store/store";
import { SubstrateContextProvider } from "@utils/substrate";

import App from "@components/App";
// import HeadHelmet from "@components/Helmet/Helmet";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SubstrateContextProvider>
      <Provider store={store}>
        <HashRouter basename={"/"}>
          <App />
        </HashRouter>
      </Provider>
    </SubstrateContextProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
