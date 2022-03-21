import { Route, Redirect } from 'react-router-dom'
import * as ROUTES from '@constants/routes'
import Loader from './Loader'
import { useSubstrateState } from '../../utils/substrate'

const PrivateRoute = ({ ...rest }) => {
  const { apiState, currentAccount } = useSubstrateState()

  if (apiState !== 'READY') return <Loader />

  if (!currentAccount?.address) {
    return <Redirect to={ROUTES.HOME} />
  }

  return <Route {...rest} />
}

export default PrivateRoute
