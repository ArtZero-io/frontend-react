/* eslint-disable no-unused-vars */
import { Toaster } from "react-hot-toast";
import { PuffLoader } from "react-spinners";

import {
  Modal,
  Heading,
  ModalContent,
  ModalOverlay,
  ChakraProvider,
  Text,
  useToast,
  Box,
  Flex,
  Link,
  CloseButton,
  Button,
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
import { setMarketplaceAzeroDomainsContract } from "@utils/blockchain/marketplace-azero-domains-calls";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "@theme/assets/TimePicker.css";
import useTxStatus from "@hooks/useTxStatus";
import { ArtZero_Privacy, START } from "../constants";
import { Helmet } from "react-helmet";
import useInterval from "use-interval";
// import { useHistory } from "react-router-dom";
// import bannerImg from "@theme/assets/banner.jpg";

// const pmpLaunchpadUrl =
//   "/launchpad/5F4fBoxKBwXZ5fprZPtkhXtesR7PXEWny6KqwWEHbZWXkg55";

// const bannerUrl =
//   "https://imagedelivery.net/AHcX2l0hfeTsnvkojY22Eg/QmV7JWVWPtTqoPjju2bPDEVp5PcfNcp6io8dd2XkVaSwRT/1024";

export default function App() {
  const { apiState } = useSubstrateState();

  useEffect(() => {
    (apiState === "READY" || apiState === "CONNECT_INIT") &&
      toast(`Network ${apiState?.replaceAll("_", " ")?.toLowerCase()}`, {
        style: {
          minWidth: "180px",
        },
      });
  }, [apiState]);

  return (
    <ChakraProvider theme={theme}>
      {/* {apiState === "ERROR" ? (
        <InitModal apiState={apiState} loadingErrorMess={`... A`} />
      ) : apiState !== "READY" ? (
        <InitModal apiState={apiState} loadingErrorMess={`to network...B`} />
      ) : (
        <Main />
      )} */}

      <Main />
    </ChakraProvider>
  );
}

// const InitModal = ({ apiState, loadingErrorMess }) => {
//   return (
//     <Modal size="full" isCentered isOpen={apiState !== "READY"}>
//       <ModalOverlay
//         bg="#33333330"
//         backdropFilter="blur(50px) hue-rotate(90deg)"
//       />

//       <ModalContent
//         bg="transparent"
//         boxShadow={"none"}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <PuffLoader color="#7ae7ff" />

//         <Heading
//           size="h6"
//           my="30px"
//           mx="auto"
//           maxW="250px"
//           minH="100px"
//           color="#7ae7ff"
//           textAlign="center"
//         >
//           connecting {loadingErrorMess}
//         </Heading>
//       </ModalContent>
//     </Modal>
//   );
// };

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

  const initContract = useCallback(async () => {
    try {
      if (apiState === "READY") {
        await setCollectionContract(api, collection);
        await setMarketplaceContract(api, marketplace);
        await setProfileContract(api, profile);
        await setStakingContract(api, staking);
        await setAZNFTContract(api, artzeroNft);
        await setAzeroDomainsNFTContract(api, azeroDomainsNft);
        await setLaunchPadContract(api, launchpad_manager);
        await setMarketplaceAzeroDomainsContract(api, marketplace);
        setLoadContractDone(true);
        console.log("initContract setLoadContractDone apiState", apiState);
      }
    } catch (e) {
      return console.log("err iniContract", e);
    }
  }, [
    api,
    apiState,
    artzeroNft,
    azeroDomainsNft,
    collection,
    launchpad_manager,
    marketplace,
    profile,
    staking,
  ]);

  useEffect(() => {
    initContract();
  }, [api, apiState, initContract]);

  // useInterval(() => {
  //   console.log("useInterval", apiState);

  // if (apiState !== "READY") {
  //   console.log("A useInterval apiState READY", apiState);
  //   toast("Trying again in 3s... ", { position: "bottom-right" });
  // } else {
  //   console.log("B useInterval apiState READY", apiState);
  //   initContract();
  // }
  // }, 3000);

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
        <title>ArtZero.io - NFT Marketplace for 5ire Blockchain</title>
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

      <AlertCookiesAccepted />

      {/* {loadContractDone && ( */}
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
      {/* )} */}
    </>
  );
};

const AlertCookiesAccepted = () => {
  const toast = useToast();

  const id = "cookies-settings-toast";
  const isAccepted =
    localStorage.getItem("ARTZERO_COOKIES_STATUS") === "ACCEPTED";

  const handleAccept = () => {
    localStorage.setItem("ARTZERO_COOKIES_STATUS", "ACCEPTED");
    toast.closeAll();
  };

  useEffect(() => {
    if (!isAccepted) {
      toast({
        id,
        position: "bottom-right",
        duration: 999999,
        status: "warning",
        render: () => (
          <Box color="white" p={3} bg="#333">
            <Flex>
              <Text>
                This website uses cookies to improve your experience. By
                continuing to use this website, you agree to its{" "}
                <Link
                  textTransform="none"
                  color="#7ae7ff"
                  fontWeight="500"
                  target="_blank"
                  href={ArtZero_Privacy}
                  _hover={{
                    color: "#7ae7ff",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </Link>
                .
              </Text>
              <CloseButton color="white" onClick={() => toast.closeAll()} />
            </Flex>
            <Button mt="4px" size="xs" onClick={() => handleAccept()}>
              OK
            </Button>
          </Box>
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccepted, toast]);

  return <></>;
};
