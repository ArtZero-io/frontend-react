import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";
import App from "@components/App";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" useSystemColorMode="false" />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
