import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import { store } from "@store/store";
import { SubstrateContextProvider } from "@utils/substrate";

import App from "@components/App";

ReactDOM.render(
  <>
    <SubstrateContextProvider>
      <Provider store={store}>
        <HashRouter basename={"/"}>
          <App />
        </HashRouter>
      </Provider>
    </SubstrateContextProvider>
  </>,
  document.getElementById("root")
);
