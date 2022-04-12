import { Route, Redirect } from "react-router-dom";

import * as ROUTES from "@constants/routes";
import { useSubstrateState } from "@utils/substrate";

import Loader from "../Loader/Loader";

const PrivateRoute = ({ ...rest }) => {
  const { keyringState, currentAccount } = useSubstrateState();

  if (keyringState !== "READY") return <Loader />;

  if (!currentAccount?.address) return <Redirect to={ROUTES.HOME} />;

  return <Route {...rest} />;
};

export default PrivateRoute;
