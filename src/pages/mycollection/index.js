import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
import NewCollectionButton from './components/NewCollectionButton'

const MyCollectionPage = () => {
  const { currentAccount } = useSubstrateState()

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <NewCollectionButton />
      )}
    </>
  )
}
export default MyCollectionPage
