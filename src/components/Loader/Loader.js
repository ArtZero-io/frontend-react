import { Center } from '@chakra-ui/react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const Loader = () => {
  return (
    <Center width="100%" height="100%" minH="xl">
      <LoadingSpinner addText text='Click "Connect Wallet" for using.' />
    </Center>
  )
}

export default Loader
