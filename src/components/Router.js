import { Switch, Route } from "react-router-dom";
import * as ROUTES from "@constants/routes";

import HomePage from "@pages/home";
import MintPage from "@pages/mint";
import AdminPage from "@pages/admin";

import CollectionsPage from "@pages/collections/collections";
import CollectionPage from "@pages/collection/collection";

import MyCollectionsPage from "@pages/account/collections/collections";
import GeneralPage from "@pages/account/general";
import MyNFTsPage from "@pages/account/nfts/nfts";
import MyStakesPage from "@pages/account/stakes";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AccountLayout from "./Layout/AccountLayout";
import AdminLayout from "./Layout/AdminLayout";
// import MintLayout from "./Layout/MintLayout";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute
        path="/account"
        render={() => (
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
        )}
      />

      <PrivateRoute
        path="/admin"
        render={() => (
          <AdminLayout>
            <Switch>
              <Route exact path={ROUTES.ACCOUNT_ADMIN} component={AdminPage} />
            </Switch>
          </AdminLayout>
        )}
      />
      {/* <PrivateRoute
        path="/mint"
        render={() => (
          <MintLayout>
            <Switch>
              <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
            </Switch>
          </MintLayout>
        )}
      /> */}

      <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
      <Route exact path={ROUTES.DETAIL_COLLECTION} component={CollectionPage} />
      <Route exact path={ROUTES.MARKETPLACE} component={CollectionsPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
    </Switch>
  );
};

export default Router;
