import { Switch, Route } from "react-router-dom";
import * as ROUTES from "@constants/routes";

// import MyCollectionPage from "@pages/collections/index";
// import NewCollectionPage from "@pages/collections/new";
// import StakePage from "../pages/_stake/_index";
// import DetailCollectionPage from "@pages/collections/detail";

import HomePage from "@pages/home";
import MintPage from "@pages/launchpad";
import AdminPage from "@pages/admin";

import CollectionsPage from "@pages/collections/collections";
import CollectionPage from "@pages/collection/collection";

import MyCollectionsPage from "@pages/account/collections/collections";
import GeneralPage from "@pages/account/general";
import MyNFTsPage from "@pages/account/nfts/nfts";
import MyStakesPage from "@pages/account/stakes";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AccountLayout from "./Layout/AccountLayout";

const Router = () => {
  return (
    <>
      <Switch>
        <PrivateRoute
          path="/account"
          render={() => {
            return (
              <AccountLayout>
                <Switch>
                  <Route exact path={ROUTES.ACCOUNT} component={GeneralPage} />
                  <Route
                    exact
                    path={ROUTES.ACCOUNT_MY_COLLECTIONS}
                    component={MyCollectionsPage}
                  />
                  <Route
                    exact
                    path={ROUTES.ACCOUNT_MY_NFTS}
                    component={MyNFTsPage}
                  />
                  <Route
                    exact
                    path={ROUTES.ACCOUNT_MY_STAKES}
                    component={MyStakesPage}
                  />
                </Switch>
              </AccountLayout>
            );
          }}
        />

        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
        <Route
          exact
          path={ROUTES.DETAIL_COLLECTION}
          component={CollectionPage}
        />
        <Route exact path={ROUTES.HOME} component={CollectionsPage} />

        {/* <Route exact path={ROUTES.MARKETPLACE} component={CollectionsPage} /> */}
        {/*   Private Route */}
        <Route exact path={ROUTES.DESIGN} component={HomePage} />
      </Switch>
    </>
  );
};

export default Router;
