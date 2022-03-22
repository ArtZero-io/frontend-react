import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'

const AdminPage = () => {
  const { currentAccount } = useSubstrateState()

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <p>HELLO ADMIN</p>
      )}
    </>
  )
}
export default AdminPage
