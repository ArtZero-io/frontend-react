import { Container } from '@chakra-ui/react'
 import Navbar from '../Navbar/index'

const Layout = ({ children, loading = false }) => {
  return (
    <Container maxW="container.xl" bg="transparent" height="100%" px="0">
      <Navbar />
      <div>{children}</div>
    </Container>
  )
}

export default Layout
