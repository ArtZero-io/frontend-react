import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'

const NewCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState()

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        test
      )}
    </>
  )
}
export default NewCollectionPage
