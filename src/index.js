import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import { store } from "@store/store";
import { SubstrateContextProvider } from "@utils/substrate";

import App from "@components/App";
import HeadHelmet from "@components/Helmet/Helmet";

ReactDOM.render(
  <>
    <SubstrateContextProvider>
      <Provider store={store}>
        <HashRouter basename={"/"}>
          <HeadHelmet />
          <App />
        </HashRouter>
      </Provider>
    </SubstrateContextProvider>
  </>,
  document.getElementById("root")
);
