import React, { useEffect } from 'react'

import {
  useSubstrate,
  useSubstrateState,
} from '../../utils/substrate/SubstrateContext'

import WalletNotConnected from './WalletNotConnected'
import WalletMenu from './WalletMenu'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
  Spacer,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { AccountActionTypes } from '../../store/types/account.types'
// import { getProfile } from '@actions/account'

function WalletSelector(props) {
  const dispatch = useDispatch()

  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()

  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    address: account.address,
    name: account.meta.name,
    icon: 'user',
  }))

  const initialAddress =
    keyringOptions?.length > 0 ? keyringOptions[0].address : ''

  useEffect(() => {
    if (!currentAccount && initialAddress?.length > 0) {
      setCurrentAccount(keyring.getPair(initialAddress))
      dispatch({
        type: AccountActionTypes.SET_ACTIVE_ADDRESS,
        payload: initialAddress,
      })
    }
  }, [dispatch, currentAccount, setCurrentAccount, keyring, initialAddress])

  function selectAccountHandler(address) {
    setCurrentAccount(keyring.getPair(address))
    dispatch({
      type: AccountActionTypes.SET_ACTIVE_ADDRESS,
      payload: address,
    })
  }

  return (
    <Box color="blackAlpha.900" height="100%" minW="sm" mx="auto">
      <Flex align="center" justify="space-between" height="100%" mx="2">
        <Menu>
          <MenuButton mx="2" as={Button} rightIcon={<ChevronDownIcon />}>
            {currentAccount?.meta?.name}
          </MenuButton>
          <MenuList>
            {keyringOptions.map(({ address, name }) => (
              <MenuItem
                onClick={() => selectAccountHandler(address)}
                key={address}
                isDisabled={currentAccount?.address === address ? true : false}
              >
                {name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Spacer />
        <WalletMenu address={currentAccount?.address} />
      </Flex>
    </Box>
  )
}

export default function AccountSelector(props) {
  const { keyring, api } = useSubstrateState()

  return keyring?.getPairs && api?.query ? (
    <WalletSelector {...props} />
  ) : (
    <WalletNotConnected />
  )
}
