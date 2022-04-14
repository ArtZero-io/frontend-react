import { Switch, Route } from "react-router-dom";
import * as ROUTES from "@constants/routes";

import HomePage from "@pages/home";
// import MyCollectionPage from "@pages/collections/index";
// import NewCollectionPage from "@pages/collections/new";
import MintPage from "@pages/launchpad";
import AdminPage from "@pages/admin";
import StakePage from "../pages/_stake/_index";
import CollectionsPage from "@pages/collections/collections";
// import DetailCollectionPage from "@pages/collections/detail";
import CollectionPage from "@pages/collection/collection";

import GeneralPage from "@pages/account/general";
import MyCollectionsPage from "@pages/account/collections/collections";
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
        <Route exact path={ROUTES.HOME} component={CollectionsPage} />
        <Route exact path={ROUTES.MARKETPLACE} component={CollectionsPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
        <Route exact path={ROUTES.STAKE} component={StakePage} />
        <Route
          exact
          path={ROUTES.DETAIL_COLLECTION}
          component={CollectionPage}
        />
        {/* <Route exact path={ROUTES.MY_COLLECTION} component={MyCollectionPage} /> */}

        {/* <Route
          exact
          path={`${ROUTES.NEW_COLLECTION}:type`}
          component={NewCollectionPage}
        /> */}
        {/* <Route
          exact
          path={ROUTES.DETAIL_COLLECTION}
          component={DetailCollectionPage}
        /> */}
        {/* <Route
          exact
          path={`${ROUTES.COLLECTIONS}/`}
          component={CollectionsPage}
        /> */}
        {/* /New UI */}

        {/* <Route
          exact
          path={ROUTES.NEW_COLLECTION}
          component={NewCollectionPage}
        /> */}

        {/*   Private Route */}
        <Route exact path={ROUTES.DESIGN} component={HomePage} />
      </Switch>
    </>
  );
};

export default Router;
