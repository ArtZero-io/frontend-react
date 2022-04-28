import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import CommonLoader from "../Loader/CommonLoader";
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
import {
  setCollectionContract,
  setAccount as setAccountCollectionModule,
} from "@utils/blockchain/collection-manager-calls";

import {
  setMarketplaceContract,
  setAccount as setAccountMarketplaceModule,
} from "@utils/blockchain/marketplace_contract_calls";

import {
  setAZNFTContract,
  setAccount as setAccountAZNFTModule,
} from "@utils/blockchain/artzero-nft-calls";

const PrivateRoute = ({ ...rest }) => {
  const { api, keyringState, currentAccount } = useSubstrateState();

  if (keyringState !== "READY") {
    return (
      <Modal isCentered>
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
          <CommonLoader
            color="#7ae7ff"
            size={15}
            margin={3}
            speedMultiplier={1.5}
          />
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

  setAccountCollectionModule(currentAccount);
  setCollectionContract(api, contractData.collection);

  setAccountMarketplaceModule(currentAccount);
  setMarketplaceContract(api, contractData.marketplace);

  setAccountAZNFTModule(currentAccount);
  setAZNFTContract(api, contractData.artzeroNft);

  return <Route {...rest} />;
};

export default PrivateRoute;
