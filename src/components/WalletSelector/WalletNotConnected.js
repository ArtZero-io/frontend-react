import { Button } from '@chakra-ui/react'
import { useSubstrate, loadAccounts } from '@utils/substrate/SubstrateContext'

function WalletNotConnected() {
  const { dispatch, state } = useSubstrate()
  const { keyring } = state

  function handleConnect() {
    if (!keyring) {
      loadAccounts(state, dispatch)
    }
  }

  return (
    <Button
      height="16"
      rounded="0"
      colorScheme="blue"
      minW="10rem"
      onClick={handleConnect}
    >
      Connect Wallet
    </Button>
  )
}

export default WalletNotConnected
