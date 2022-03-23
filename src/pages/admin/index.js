import {
  Button,
  Box,
  Flex,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input
} from '@chakra-ui/react'
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
import artzero_nft_calls from "../../utils/blockchain/artzero-nft-calls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {delay, truncateStr} from '../../utils';
import { getProfile } from "@actions/account";
import toast from 'react-hot-toast'

const AdminPage = () => {
  const { currentAccount } = useSubstrateState()
  const { activeAddress } = useSelector((s) => s.account);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getProfile());
    await onRefresh();
  }, [dispatch, activeAddress]);

  const [art0_NFT_owner,setArt0NFTOwner] = useState("");
  const [whitelistAmount,setWhitelistAmount] = useState(1);
  const [whitelistAddress,setWhitelistAddress] = useState("");

  const onRefresh = async () => {
    await onGetOwner();
  }
  const onGetOwner = async (e) => {
    let res = await artzero_nft_calls.owner(currentAccount);
    if (res)
      setArt0NFTOwner(res);
    else
      setArt0NFTOwner("");
  }
  const onAddWhitelist = async () =>{
    if (art0_NFT_owner != activeAddress) {
      toast.error(
        `You are not owner of this contract`
      )
      return;
    }
    console.log(whitelistAddress,whitelistAmount)
    //check whitelistAddress
    await artzero_nft_calls.addWhitelist(currentAccount,whitelistAddress,whitelistAmount);
    await delay(10000);
    await onRefresh();

  }
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
          <br/>
          <Box  align='center' position="relative" bg='green.500' padding='2'>

          </Box>
          <Box as="section" pt="20" pb="12" position="relative">
            <Flex
              color='white'
            >
              <Box flex='1' bg='blue.500' margin='2' padding='2' >
                <Text> <strong>Quản lý Artzero NFT Contract:</strong></Text>
                <Text> Contract Owner: <strong>{truncateStr(art0_NFT_owner,9)}</strong></Text>
                <br/>
                <Text>Add Whitelist:</Text>
                <Input placeholder='Enter address'
                  value={whitelistAddress}
                  onChange={(event) => setWhitelistAddress(event.target.value.toString())}
                  />

                <NumberInput defaultValue={1} min={1}
                  onChange={(valueString) => setWhitelistAmount(valueString)}
                  value={whitelistAmount}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput> <br/>
                <Button
                  size="sm"
                  color='black'
                  onClick={() => onAddWhitelist()}
                >
                  Add Whitelist
                </Button>
              </Box>
              <Box flex='1' bg='blue.500' margin='2' padding='2' >
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </>
  )
}
export default AdminPage
