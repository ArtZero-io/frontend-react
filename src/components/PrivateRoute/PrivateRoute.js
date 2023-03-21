/* eslint-disable no-unused-vars */
import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import CommonLoader from "../Loader/CommonLoader";
import { Heading, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

const PrivateRoute = ({ ...rest }) => {
  const { keyringState, currentAccount } = useSubstrateState();

  // if (keyringState !== "READY") {
  //   return (
  //     <Modal isCentered>
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
  //         <CommonLoader
  //           color="#7ae7ff"
  //           size={15}
  //           margin={3}
  //           speedMultiplier={1.5}
  //         />
  //         <Heading
  //           size="h6"
  //           my={14}
  //           mx="auto"
  //           maxW="250px"
  //           minH="100px"
  //           textAlign="center"
  //         >
  //           Re - connecting to network . . .
  //         </Heading>
  //       </ModalContent>
  //     </Modal>
  //   );
  // }

  if (!currentAccount?.address) return <Redirect to={ROUTES.HOME} />;

  return <Route {...rest} />;
};

export default PrivateRoute;
