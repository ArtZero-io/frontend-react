import { Switch, Route } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

import HomePage from '../pages/home'

const Router = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.AIRDROP} component={HomePage} />
      <Route exact path={ROUTES.ROADMAP} component={HomePage} />
      <Route exact path={ROUTES.PARTNERS} component={HomePage} />
      <Route exact path={ROUTES.TEAM} component={HomePage} />
      <Route exact path={ROUTES.SUBSCRIBE} component={HomePage} />
    </Switch>
  )
}

export default Router
