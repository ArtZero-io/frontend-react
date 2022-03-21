import { Box, Heading, Text } from '@chakra-ui/react'
import { CardContent } from './components/CardContent'
import { CardWithAvatar } from './components/CardWithAvatar'
import { UserInfo } from './components/UserInfo'
import { useSubstrateState } from '../../utils/substrate'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '@actions/account'
import Form from './components/Form/index'
import Loader from '../../components/Loader/Loader'
// import Modal from './components/Modal'

const AccountPage = () => {
  const dispatch = useDispatch()
  const { currentAccount } = useSubstrateState()
  const { profile, activeAddress } = useSelector(s => s.account)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch, activeAddress])

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
          <Box as="section" pt="20" pb="12" position="relative">
            <Box position="absolute" inset="0" height="32" bg="blue.600" />
            <CardWithAvatar
              maxW="xl"
              avatarProps={{
                src: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHdvbWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                name: profile?.username,
              }}
              action={
                <div>
                  123
                  {/* <Modal /> */}
                </div>
              }
            >
              <CardContent>
                <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
                  {profile?.username || 'unknown'}
                </Heading>
                <Text color="gray.600">
                  {profile?.bio || 'Write your bio here'}
                </Text>
                <UserInfo
                  facebook={profile?.facebook || 'facebook'}
                  twitter={profile?.twitter || 'twitter'}
                  telegram={profile?.telegram || 'telegram'}
                  instagram={profile?.instagram || 'instagram'}
                />
              </CardContent>
            </CardWithAvatar>
          </Box>
          <Form profile={profile}/>
        </>
      )}
    </>
  )
}
export default AccountPage
