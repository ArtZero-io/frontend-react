import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '@constants/routes'

import HomePage from '@pages/home'
import AccountPage from '../pages/account/index'
import CollectionPage from '../pages/collections'
import NewCollectionPage from '../pages/collections/new'
import MyCollectionPage from '../pages/collections'

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.MY_COLLECTION} component={MyCollectionPage} />
        <Route exact path={`${ROUTES.NEW_COLLECTION}:type`} component={NewCollectionPage} />
        <Route
          exact
          path={`${ROUTES.COLLECTIONS}/:collectionAddress`}
          component={CollectionPage}
        />
         
        {/*  TODO Add Private Route */}
      </Switch>
    </>
  )
}

export default Router
