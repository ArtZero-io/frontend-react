import { useSubstrateState } from '../../utils/substrate'
import NewCollectionButton from './components/NewCollectionButton';
import MyCollectionLising from './components/MyCollectionLising';

const MyCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState()
  console.log("props.match.params.collectionAddress", props.match.params.collectionAddress);
// => 5gjksdfgksdkaf
  return (
    <>
      {!currentAccount?.address ? (
        <div>Please connect wallet first!</div>
      ) : (
        <NewCollectionButton />
      )}
      <MyCollectionLising />
    </>
  )
}
export default MyCollectionPage
