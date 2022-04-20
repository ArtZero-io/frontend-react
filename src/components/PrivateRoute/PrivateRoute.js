import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import Loader from "../Loader/Loader";
import { Heading, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import contractData from "@utils/blockchain/index";

import {
  setProfileContract,
  setAccount as setAccountProfileModule,
} from "@utils/blockchain/profile_calls";
import {
  setStakingContract,
  setAccount as setAccountStakingModule,
} from "@utils/blockchain/staking_calls";

const PrivateRoute = ({ ...rest }) => {
  const { api, keyringState, currentAccount } = useSubstrateState();

  if (keyringState !== "READY") {
    return (
      <Modal isCentered>
        <ModalOverlay
          bg="#33333330"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          bg="transparent"
          boxShadow={"none"}
          justifyContent="center"
          alignItems="center"
        >
          <Loader color="#7ae7ff" size={20} margin={5} speedMultiplier={1.5} />
          <Heading size="h6" my={14}>
            Re - connecting to network . . .
          </Heading>
        </ModalContent>
      </Modal>
    );
  }

  if (!currentAccount?.address) return <Redirect to={ROUTES.HOME} />;

  setAccountProfileModule(currentAccount);
  setProfileContract(api, contractData.profile);

  setAccountStakingModule(currentAccount);
  setStakingContract(api, contractData.staking);

  return <Route {...rest} />;
};

export default PrivateRoute;
