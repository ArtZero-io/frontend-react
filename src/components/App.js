import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { SubstrateContextProvider, useSubstrateState } from "@utils/substrate";
import Router from "@components/Router";
import { store } from "@store/store";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@theme/theme";
import "@fontsource/oswald";

function Main() {
  const { apiState, apiError } = useSubstrateState();

  if (apiState === "ERROR") return toast.error(apiError);

  return (
    <ChakraProvider theme={theme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: 0,
            padding: "16px",
            color: "#000",
            background: "#7AE7FF",
          },
        }}
      />
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
