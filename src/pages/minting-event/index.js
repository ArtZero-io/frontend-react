import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'

const MintingEventPage = () => {
  const { currentAccount } = useSubstrateState()

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <p>HELLO</p>
      )}
    </>
  )
}
export default MintingEventPage
