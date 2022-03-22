import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '@constants/routes'

import HomePage from '@pages/home'
import AccountPage from '../pages/account/index'
import MyCollectionPage from '../pages/mycollection/index'
import NewCollectionPage from '../pages/mycollection/new'
import MintPage from '../pages/minting-event'
import AdminPage from '../pages/admin'

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.MINTING_EVENT} component={MintPage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.MY_COLLECTION} component={MyCollectionPage} />
        <Route exact path={ROUTES.NEW_COLLECTION} component={NewCollectionPage} />
        {/*  TODO Add Private Route */}
      </Switch>
    </>
  )
}

export default Router
