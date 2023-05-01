import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";

import {
  Modal,
  Heading,
  ModalContent,
  ModalOverlay,
  ChakraProvider,
  Text,
} from "@chakra-ui/react";
import "@fontsource/oswald";
import theme from "@theme/theme";
import toast from "react-hot-toast";

import Router from "@components/Router";
import { useSubstrateState } from "@utils/substrate";
import contractData from "@utils/blockchain/";

import { setAZNFTContract } from "@utils/blockchain/artzero-nft-calls";
import { setAzeroDomainsNFTContract } from "@utils/blockchain/azero-domains-nft-calls";
import { setCollectionContract } from "@utils/blockchain/collection-manager-calls";
import { setMarketplaceContract } from "@utils/blockchain/marketplace_contract_calls";
import { setProfileContract } from "@utils/blockchain/profile_calls";
import { setStakingContract } from "@utils/blockchain/staking_calls";
import { setLaunchPadContract } from "@utils/blockchain/launchpad-contract-calls";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@theme/assets/TimePicker.css";
import useTxStatus from "@hooks/useTxStatus";
import { START } from "../constants";
import { Helmet } from "react-helmet";
// import { useHistory } from "react-router-dom";
// import bannerImg from "@theme/assets/banner.jpg";

// const pmpLaunchpadUrl =
//   "/launchpad/5F4fBoxKBwXZ5fprZPtkhXtesR7PXEWny6KqwWEHbZWXkg55";

// const bannerUrl =
//   "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/QmV7JWVWPtTqoPjju2bPDEVp5PcfNcp6io8dd2XkVaSwRT/1024";

export default function App() {
  const { apiState } = useSubstrateState();

  return (
    <ChakraProvider theme={theme}>
      {apiState === "ERROR" ? (
        <InitModal apiState={apiState} loadingErrorMess={`...`} />
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
        <PuffLoader color="#7ae7ff" />

        <Heading
          size="h6"
          my="30px"
          mx="auto"
          maxW="250px"
          minH="100px"
          color="#7ae7ff"
          textAlign="center"
        >
          connecting {loadingErrorMess}
        </Heading>
      </ModalContent>
    </Modal>
  );
};

const Main = () => {
  const { api, apiState } = useSubstrateState();
  const {
    profile,
    staking,
    artzeroNft,
    azeroDomainsNft,
    collection,
    marketplace,
    launchpad_manager,
  } = contractData;
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
          await setAzeroDomainsNFTContract(api, azeroDomainsNft);
          await setLaunchPadContract(api, launchpad_manager);

          setLoadContractDone(true);
        }
      } catch (e) {
        return console.log("err iniContract", e);
      }
    };
    initContract();
  }, [
    api,
    apiState,
    artzeroNft,
    azeroDomainsNft,
    collection,
    marketplace,
    profile,
    staking,
    launchpad_manager,
  ]);

  const { addNftTnxStatus, tnxStatus, addCollectionTnxStatus } = useSelector(
    (state) => state.account.accountLoaders
  );
  const txStatus = useSelector((state) => state.txStatus);
  const { step } = useTxStatus();

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
      txStatus?.lockStatus === "Start" ||
      txStatus?.step === "Start" ||
      step === START;

    const message = (
      <Text as="span" fontSize={["sm", "md"]}>
        You have a transaction that needs to be approved.
        <br />
        Please <b>Approve</b> or <b>Cancel</b> in the pop-up window.
      </Text>
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
    step,
    tnxStatus?.status,
    txStatus?.cancelRequestUnstakeStatus,
    txStatus?.lockStatus,
    txStatus?.requestUnstakeStatus,
    txStatus?.stakeStatus,
    txStatus?.step,
    txStatus?.unstakeStatus,
  ]);

  // const history = useHistory();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const modalSize = useBreakpointValue(["xs", "xs", "xs", "lg"]);

  // useEffect(() => {
  //   if (
  //     history.location.pathname === "/marketplace" ||
  //     history.location.pathname === "/"
  //   ) {
  //     onOpen();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Helmet>
        <title>ArtZero.io - NFT Marketplace for Aleph Zero Blockchain</title>
      </Helmet>
      {/* <>
        <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
          <ModalOverlay bg="blackAlpha.800" />
          <ModalContent borderRadius="0">
            <ModalCloseButton
              w="24px"
              h="24px"
              top="0"
              right="0"
              bg="#17171700"
              borderRadius="0"
              _focus={{ borderWidth: "0px" }}
            />
            <ModalBody py="24px">
              <Image
                cursor="pointer"
                src={bannerImg}
                onClick={() => {
                  onClose();
                  history.push(pmpLaunchpadUrl);
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </> */}
      {loadContractDone && (
        <Fragment>
          <Toaster
            position="bottom-left"
            reverseOrder={true}
            toastOptions={{
              style: {
                borderRadius: 0,
                padding: "8px",
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
