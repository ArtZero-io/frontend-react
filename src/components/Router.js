import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '@constants/routes'

import HomePage from '@pages/home'
import AccountPage from '../pages/account/index'

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        {/* <Route
          exact
          path={`${ROUTES.COLLECTIONS}/:collectionAddress`}
          component={CollectionPage}
        /> */}
        {/*  TODO Add Private Route */}
      </Switch>
    </>
  )
}

export default Router
