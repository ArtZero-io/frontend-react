import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GridLoader } from "react-spinners";

import {
  Modal,
  Heading,
  ModalContent,
  ModalOverlay,
  ChakraProvider,
} from "@chakra-ui/react";
import "@fontsource/oswald";
import theme from "@theme/theme";

import Router from "@components/Router";
import { useSubstrateState } from "@utils/substrate";

export default function App() {
  const { apiState, apiError } = useSubstrateState();
  const [loadingErrorMess, setLoadingErrorMess] = useState(null);

  useEffect(() => {
    if (apiState === "ERROR") {
      setLoadingErrorMess("to websocket failed.");
    } else if (apiState !== "READY") {
      setLoadingErrorMess("to network . . .");
    }
  }, [apiError, apiState]);

  return (
    <ChakraProvider theme={theme}>
      <Modal isCentered isOpen={apiState !== "READY"}>
        <ModalOverlay
          bg="#33333330"
          backdropFilter="blur(50px) hue-rotate(90deg)"
        />
        <ModalContent
          bg="transparent"
          boxShadow={"none"}
          justifyContent="center"
          alignItems="center"
        >
          <GridLoader
            color="#7ae7ff"
            size={15}
            margin={3}
            speedMultiplier={1.8}
          />
          <Heading size="h6" my={14}>
            Connecting {loadingErrorMess}
          </Heading>
        </ModalContent>
      </Modal>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginRight: "2rem",
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
