import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
import NewCollectionButton from './components/NewCollectionButton'

const MyCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState()
  console.log("props.match.params.collectionAddress", props.match.params.collectionAddress);
// => 5gjksdfgksdkaf
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
