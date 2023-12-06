import { Switch, Route } from "react-router-dom";
import * as ROUTES from "@constants/routes";

// import HomePage from "@pages/home";
// import AdminPage from "@pages/admin";

import CollectionsPage from "@pages/collections/collections";
import { LaunchpadPage } from "@pages/launchpad";
import CollectionPage from "@pages/collection";

import MyCollectionsPage from "@pages/account/collections/collections";
import GeneralPage from "@pages/account/general";
import MyNFTsPage from "@pages/account/nfts/nfts";
import MyStakesPage from "@pages/account/stakes";
import StatsPage from "@pages/stats";

import MyCollectionsPublicPage from "@pages/accountPublic/collections/collections";
import MyNFTsPublicPage from "@pages/accountPublic/nfts/nfts";
import MyStakesPublicPage from "@pages/accountPublic/stakes";
import MyProjectsPublicPage from "@pages/accountPublic/projects/projects";

import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AccountLayout from "./Layout/AccountLayout";
import AdminLayout from "./Layout/AdminLayout";
import LaunchpadDetailPage from "../pages/launchpad/detail";
import AddProject from "../pages/launchpad/add-project";
import MyProjectsPage from "@pages/account/projects/projects";
import MyWhiteListProjectPage from "@pages/account/projects/whitelist";
import MyMintingProjectPage from "@pages/account/projects/minting";
import NftDetailPage from "../pages/token/";
import PublicAccountLayout from "./Layout/PublicAccountLayout";
import ActivitiesPage from "../pages/account/activities/activities";
import MyBidsPages from "../pages/account/bids/my-bids";

// import NotFound from "./NotFound/NotFound";

const Router = () => {
  return (
    <Switch>
      <PrivateRoute
        path="/account"
        render={() => (
          <AccountLayout>
            <Route exact path={ROUTES.ACCOUNT} component={GeneralPage} />

            <Route
              exact
              path={ROUTES.ACCOUNT_MY_COLLECTIONS}
              component={MyCollectionsPage}
            />
            <Route exact path={ROUTES.ACCOUNT_MY_NFTS} component={MyNFTsPage} />
            <Route
              exact
              path={ROUTES.ACCOUNT_MY_STAKES}
              component={MyStakesPage}
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_MY_PROJECTS}
              component={MyProjectsPage}
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_MY_ACTIVITIES}
              component={ActivitiesPage}
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_MY_BIDS}
              component={MyBidsPages}
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_WHITELIST_PROJECTS}
              component={MyWhiteListProjectPage}
            />
            <Route
              exact
              path={ROUTES.ACCOUNT_MINTING_PROJECTS}
              component={MyMintingProjectPage}
            />
          </AccountLayout>
        )}
      />
      <Route
        path={"/public-account"}
        render={(props) => (
          <PublicAccountLayout match={props.match}>
            <Route
              exact
              path={ROUTES.PUBLIC_ACCOUNT_MY_COLLECTIONS}
              component={MyCollectionsPublicPage}
            />
            <Route
              exact
              path={ROUTES.PUBLIC_ACCOUNT_MY_NFTS}
              component={MyNFTsPublicPage}
            />
            <Route
              exact
              path={ROUTES.PUBLIC_ACCOUNT_MY_STAKES}
              component={MyStakesPublicPage}
            />
            <Route
              exact
              path={ROUTES.PUBLIC_ACCOUNT_MY_PROJECTS}
              component={MyProjectsPublicPage}
            />
          </PublicAccountLayout>
        )}
      />
      <PrivateRoute
        path="/admin"
        render={() => (
          <AdminLayout>
            <Route exact path={ROUTES.ACCOUNT_ADMIN} />
          </AdminLayout>
        )}
      />

      <Route exact path={ROUTES.STATS} component={StatsPage} />
      <Route exact path={ROUTES.NFT_DETAIL} component={NftDetailPage} />
      <Route exact path={ROUTES.MARKETPLACE} component={CollectionsPage} />

      <Route exact path={ROUTES.DETAIL_COLLECTION} component={CollectionPage} />
      <Route exact path={ROUTES.LAUNCHPAD_ADD_PROJECT} component={AddProject} />
      <Route
        exact
        path={ROUTES.LAUNCHPAD_DETAIL}
        component={LaunchpadDetailPage}
      />
      <Route exact path={ROUTES.LAUNCHPAD_BASE} component={LaunchpadPage} />
      <Route exact path={ROUTES.HOME} component={CollectionsPage} />
    </Switch>
  );
};

export default Router;
