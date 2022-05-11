import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "@store/store";
import { SubstrateContextProvider } from "@utils/substrate";

import App from "@components/App";

ReactDOM.render(
  <>
    <SubstrateContextProvider>
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </Provider>
    </SubstrateContextProvider>
  </>,
  document.getElementById("root")
);
