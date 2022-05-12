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
import contractData from "@utils/blockchain/";

import { setAZNFTContract } from "@utils/blockchain/artzero-nft-calls";
import { setCollectionContract } from "@utils/blockchain/collection-manager-calls";
import { setMarketplaceContract } from "@utils/blockchain/marketplace_contract_calls";
import { setProfileContract } from "@utils/blockchain/profile_calls";
import { setStakingContract } from "@utils/blockchain/staking_calls";
import { Fragment, useEffect, useState } from "react";

export default function App() {
  const { apiState, apiError } = useSubstrateState();

  return (
    <ChakraProvider theme={theme}>
      {apiState === "ERROR" ? (
        <InitModal
          apiState={apiState}
          loadingErrorMess={` ${apiError.target.url} failed.`}
        />
      ) : apiState !== "READY" ? (
        <InitModal apiState={apiState} loadingErrorMess={`to network ...`} />
      ) : (
        <Main />
      )}
    </ChakraProvider>
  );
}

const InitModal = ({ apiState, loadingErrorMess }) => {
  return (
    <Modal size="full" isCentered isOpen={apiState !== "READY"}>
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

const Main = () => {
  const { api, apiState } = useSubstrateState();
  const { artzeroNft, collection, marketplace, profile, staking } =
    contractData;
  const [loadContractDone, setLoadContractDone] = useState(false);

  useEffect(() => {
    const initContract = async () => {
      try {
        if (apiState === "READY") {
          await setCollectionContract(api, collection);
          await setMarketplaceContract(api, marketplace);
          await setProfileContract(api, profile);
          await setStakingContract(api, staking);
          await setAZNFTContract(api, artzeroNft);
          setLoadContractDone(true);
        }
      } catch (e) {
        return console.log("err iniContract", e);
      }
    };
    initContract();
    console.log("initContract()...");
  }, [api, apiState, artzeroNft, collection, marketplace, profile, staking]);

  return (
    <>
      {loadContractDone && (
        <Fragment>
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
          {console.log("apiState", apiState)}
          <Router />
        </Fragment>
      )}
    </>
  );
};
