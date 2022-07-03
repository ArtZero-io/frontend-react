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
import toast from "react-hot-toast";

import Router from "@components/Router";
import { useSubstrateState } from "@utils/substrate";
import contractData from "@utils/blockchain/";

import { setAZNFTContract } from "@utils/blockchain/artzero-nft-calls";
import { setCollectionContract } from "@utils/blockchain/collection-manager-calls";
import { setMarketplaceContract } from "@utils/blockchain/marketplace_contract_calls";
import { setProfileContract } from "@utils/blockchain/profile_calls";
import { setStakingContract } from "@utils/blockchain/staking_calls";
import { setLaunchPadContract } from "@utils/blockchain/launchpad-contract-calls";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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
        <InitModal apiState={apiState} loadingErrorMess={`to network...`} />
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
        <Heading
          size="h6"
          my={14}
          mx="auto"
          maxW="250px"
          minH="100px"
          textAlign="center"
        >
          Connecting {loadingErrorMess}
        </Heading>
      </ModalContent>
    </Modal>
  );
};

const Main = () => {
  const { api, apiState } = useSubstrateState();
  const { artzeroNft, collection, marketplace, profile, staking, launchpad_manager } =
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
          await setLaunchPadContract(api, launchpad_manager);
          
          setLoadContractDone(true);
        }
      } catch (e) {
        return console.log("err iniContract", e);
      }
    };
    initContract();
    // console.log("initContract()...");
  }, [api, apiState, artzeroNft, collection, marketplace, profile, staking, launchpad_manager]);

  const { addNftTnxStatus, tnxStatus, addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const txStatus = useSelector((state) => state.txStatus);

  let id = useRef(null);

  useEffect(() => {
    const hasPendingTx =
      addNftTnxStatus?.status === "Start" ||
      addCollectionTnxStatus?.status === "Start" ||
      tnxStatus?.status === "Start" ||
      txStatus?.stakeStatus === "Start" ||
      txStatus?.requestUnstakeStatus === "Start" ||
      txStatus?.cancelRequestUnstakeStatus === "Start" ||
      txStatus?.unstakeStatus === "Start" ||
      txStatus?.lockStatus === "Start";

    console.log("txStatus?.stakeStatus", txStatus?.stakeStatus);
    const message = (
      <span>
        You have a transaction that needs to be signed.
        <br />
        Please <b>Sign</b> or <b>Cancel</b> it in the pop-up window.
      </span>
    );

    if (!id.current && hasPendingTx) {
      const toastId = toast(message, {
        duration: Infinity,
        icon: "⏳",
      });

      id.current = toastId;
    } else {
      addNftTnxStatus?.status !== "Start" && toast.dismiss(id.current);

      id.current = null;
    }
  }, [
    addCollectionTnxStatus?.status,
    addNftTnxStatus,
    tnxStatus?.status,
    txStatus?.cancelRequestUnstakeStatus,
    txStatus?.lockStatus,
    txStatus?.requestUnstakeStatus,
    txStatus?.stakeStatus,
    txStatus?.unstakeStatus,
  ]);

  return (
    <>
      {loadContractDone && (
        <Fragment>
          <Toaster
            position="bottom-left"
            reverseOrder={true}
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
        </Fragment>
      )}
    </>
  );
};
