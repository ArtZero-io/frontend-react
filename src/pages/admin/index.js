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
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
import artzero_nft_calls from "../../utils/blockchain/artzero-nft-calls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {delay, truncateStr} from '../../utils';
import { getProfile } from "@actions/account";
import toast from 'react-hot-toast'

let wl_count = 0;
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
  const [whitelistCount,setWhitelistCount] = useState(0);
  const [whitelist,setwhitelist] = useState([]);
  const onRefresh = async () => {
    await onGetOwner();
    await onGetWhitelistCount();
    await delay(1000);
    await getAllWhiteList();
  }
  const getAllWhiteList = async (e) => {
    var whitelist = [];
    for (var i=0;i<wl_count;i++) {
      let account = await artzero_nft_calls.getWhitelistAccount(currentAccount,i+1);
      console.log(account);
      let data = await artzero_nft_calls.getWhitelist(currentAccount,account);
      console.log(data);
      data["account"] = account;
      whitelist.push(data);
    }
    console.log(whitelist);
    setwhitelist(whitelist);
  }
  const onGetWhitelistCount = async (e) => {
    let res = await artzero_nft_calls.getWhitelistCount(currentAccount);
    wl_count = res;
    if (res)
      setWhitelistCount(res);
    else
      setWhitelistCount(0);
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
                <br/>
                <br/>
                <Text>Total Whitelist account: <strong>{whitelistCount}</strong></Text>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Address</Th>
                      <Th isNumeric>Amount</Th>
                      <Th isNumeric>Claimed</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {whitelist.map((wl) => (
                    <Tr>
                      <Td>{truncateStr(wl.account,9)}</Td>
                      <Td isNumeric>{wl.whitelistAmount}</Td>
                      <Td isNumeric>{wl.claimedAmount}</Td>
                    </Tr>

                  ))}

                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Address</Th>
                      <Th isNumeric>Amount</Th>
                      <Th isNumeric>Claimed</Th>
                    </Tr>
                  </Tfoot>
                </Table>
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
