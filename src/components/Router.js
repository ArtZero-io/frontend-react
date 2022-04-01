import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '@constants/routes'

import HomePage from '@pages/home'
import AccountPage from '../pages/account/account'
// import CollectionPage from '../pages/collections'
import MyCollectionPage from '../pages/collections/index'
import NewCollectionPage from '../pages/collections/new'
import MintPage from '../pages/launchpad'
import AdminPage from '../pages/admin'
import StakePage from '../pages/stake'
// import MarketplacePage from '../pages/marketplace'
import CollectionsPage from '../pages/collections/collections'
import DetailCollectionPage from '../pages/collections/detail'
import CollectionPage from '../pages/collection/collection'

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.MARKETPLACE} component={CollectionsPage} />
        {/* <Route exact path={ROUTES.MARKETPLACE} component={MarketplacePage} /> */}
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
        <Route exact path={ROUTES.STAKE} component={StakePage} />

        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.MY_COLLECTION} component={MyCollectionPage} />
        <Route exact path={`${ROUTES.NEW_COLLECTION}:type`} component={NewCollectionPage} />
        <Route exact path={ROUTES.DETAIL_COLLECTION} component={DetailCollectionPage} />
        <Route
          exact
          path={`${ROUTES.COLLECTIONS}/`}
          component={CollectionsPage}
        />
        {/* /New UI */}
        <Route path={`/collectionNew/:collectionAddress`} component={CollectionPage} />


        <Route exact path={ROUTES.NEW_COLLECTION} component={NewCollectionPage} />
        {/*  TODO Add Private Route */}
      </Switch>
    </>
  )
}

export default Router
