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

  return (
    <ChakraProvider theme={theme}>
      {apiState === "ERROR" ? (
        <InitModal
          isCentered
          apiState={apiState}
          loadingErrorMess={` ${apiError.target.url} failed.`}
        />
      ) : apiState !== "READY" ? (
        <InitModal
          isCentered
          apiState={apiState}
          loadingErrorMess={`to network ...`}
        />
      ) : (
        <>
          <Toaster
            position="bottom-left"
            reverseOrder={true}
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
        </>
      )}
    </ChakraProvider>
  );
}

const InitModal = ({ apiState, loadingErrorMess }) => {
  return (
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
  );
};
