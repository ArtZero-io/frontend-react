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
import collection_manager_calls from '../../utils/blockchain/collection-manager-calls';
import collection_manager from "../../utils/blockchain/collection-manager";
import artzero_nft from "../../utils/blockchain/artzero-nft";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {delay, truncateStr} from '../../utils';
import toast from 'react-hot-toast'
import BN from "bn.js";

let wl_count = 0;
let collection_count = 0;
const AdminPage = () => {
  const { api, currentAccount } = useSubstrateState()
  const { activeAddress } = useSelector((s) => s.account);

  const [art0_NFT_owner,setArt0NFTOwner] = useState("");
  const [whitelistAmount,setWhitelistAmount] = useState(1);
  const [whitelistAddress,setWhitelistAddress] = useState("");
  const [whitelistCount,setWhitelistCount] = useState(0);
  const [whitelist,setwhitelist] = useState([]);
  const [withdrawAmount,setWithdrawAmount] = useState(0);
  const [azNFTContractBalance, setAzNFTContractBalance] = useState(0);

  const [collectionCount,setCollectionCount] = useState(0);
  const [collections,setCollections] = useState([]);
  const [collectionContractOwner,setCollectionContractOwner] = useState("");
  const [collectionContractBalance, setCollectionContractBalance] = useState(0);

  const onRefreshCollection = async () =>{
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
  }
  const onRefreshAZNFT = async () =>{
    await getAZNFTContractBalance();
    await getCollectionContractBalance();

    await onGetOwner();
    await onGetCollectionContractOwner();

    await onGetWhitelistCount();
    await delay(1000);
    await getAllWhiteList();
  }
  useEffect(async () => {
    onRefreshCollection();
  }, [collection_manager_calls.isLoaded()]);

  useEffect(async () => {
    onRefreshAZNFT();
  }, [artzero_nft_calls.isLoaded()]);


  const getAZNFTContractBalance = async () =>{

    const {data: balance } = await api.query.system.account(artzero_nft.CONTRACT_ADDRESS);
    setAzNFTContractBalance(new BN(balance.free, 10, "le").toNumber() / (10**12));

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

    if (res){
      wl_count = res;
      setWhitelistCount(res);
    }
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
    if (art0_NFT_owner !== activeAddress) {
      toast.error(
        `You are not owner of this contract`
      )
      return;
    }
    console.log(whitelistAddress,whitelistAmount)
    //check whitelistAddress
    await artzero_nft_calls.addWhitelist(currentAccount,whitelistAddress,whitelistAmount);
    await delay(10000);
    await onRefreshAZNFT();

  }
  const onAddWhitelistUpdate = async () =>{
    if (art0_NFT_owner !== activeAddress) {
      toast.error(
        `You are not owner of this contract`
      )
      return;
    }
    console.log(whitelistAddress,whitelistAmount)
    //check whitelistAddress
    await artzero_nft_calls.updateWhitelistAmount(currentAccount,whitelistAddress,whitelistAmount);
    await delay(10000);
    await onRefreshAZNFT();

  }
  const onWithdraw = async () =>{
    if (art0_NFT_owner !== activeAddress) {
      toast.error(
        `You are not owner of this contract`
      )
      return;
    }
    //check whitelistAddress
    await artzero_nft_calls.onWithdraw(currentAccount,withdrawAmount);
    await delay(5000);
    await onRefreshAZNFT();

  }

  const getCollectionContractBalance = async () =>{

    const {data: balance } = await api.query.system.account(collection_manager.CONTRACT_ADDRESS);
    setCollectionContractBalance(new BN(balance.free, 10, "le").toNumber() / (10**12));

  }
  const onGetCollectionContractOwner = async (e) => {
    let res = await collection_manager_calls.owner(currentAccount);
    if (res)
      setCollectionContractOwner(res);
    else
      setCollectionContractOwner("");
  }
  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res){
      collection_count = res;
      setCollectionCount(res);
    }
    else
      setCollectionCount(0);
  }
  const getAllCollections = async (e) => {
    var collections = [];
    for (var i=0;i<collection_count;i++) {
      let collection_account = await collection_manager_calls.getContractById(currentAccount,i+1);
      console.log(collection_account);
      let data = await collection_manager_calls.getCollectionByAddress(currentAccount,collection_account);
      collections.push(data);
    }
    console.log(collections);
    setCollections(collections);
  }
  const onEnableCollection = async (collection_contract) =>{

    if (collectionContractOwner != activeAddress) {
      toast.error(
        `You are not owner of this contract`
      )
      return;
    }
    await collection_manager_calls.updateIsActive(currentAccount,collection_contract);
    await delay(5000);
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
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
                <Text> Contract Balance: <strong>{azNFTContractBalance} SZERO</strong></Text>
                <br/>
                <Text>Owner Withdraw AZERO:</Text>
                <NumberInput defaultValue={0}
                  onChange={(valueString) => setWithdrawAmount(valueString)}
                  value={withdrawAmount}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput> <br/>
                <Button
                  size="sm"
                  color='black'
                  onClick={() => onWithdraw()}
                >
                  Withdraw
                </Button>
                <br/>
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
                  marginRight='2'
                  onClick={() => onAddWhitelist()}
                >
                  Add Whitelist
                </Button>
                <Button
                  size="sm"
                  color='black'
                  onClick={() => onAddWhitelistUpdate()}
                >
                  Update Whitelist
                </Button>
                <br/>
                <br/>
                <Text>Total Whitelist account: <strong>{whitelistCount}</strong></Text>
                <br/>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Address</Th>
                      <Th isNumeric>Amount</Th>
                      <Th isNumeric>Claimed</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {whitelist.map((wl,index) => (
                    <Tr key={index}>
                      <Td>{truncateStr(wl.account,5)}</Td>
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
                <Text> <strong>Quản lý Collection:</strong></Text>
                <Text>Total Collection: <strong>{collectionCount}</strong></Text>
                <Text>Collection Contract Owner: <strong>{collectionContractOwner}</strong></Text>
                <Text>Collection Contract Balance: <strong>{collectionContractBalance} SZERO</strong></Text>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Collection Address</Th>
                      <Th>Owner</Th>
                      <Th isNumeric>Type</Th>
                      <Th>Status</Th>
                      <Th isNumeric>Royal Fee</Th>
                      <Th>Metadata</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {collections.map((collection,index) => (
                    <Tr key={index}>
                      <Td>{truncateStr(collection.nftContractAddress,5)}</Td>
                      <Td>{truncateStr(collection.collectionOwner,5)}</Td>
                      <Td isNumeric>{collection.contractType == 2 ? "Auto" : "Manual"} </Td>
                      <Td>{collection.isActive ? "Active" : "Inactive"} </Td>
                      <Td>{collection.isCollectRoyalFee ? collection.royalFee/100 : "N/A"} </Td>
                      <Td>{collection.showOnChainMetadata ? "On-chain" : "Off-chain"} </Td>
                      <Td>
                        {
                          !collection.isActive ?
                            <Button
                              size="sm"
                              color='black'
                              onClick={() => onEnableCollection(collection.nftContractAddress)}
                            >
                              Enable
                            </Button>
                          :
                          null

                        }
                      </Td>

                    </Tr>

                  ))}

                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Collection Address</Th>
                      <Th isNumeric>Owner</Th>
                      <Th isNumeric>Type</Th>
                      <Th isNumeric>Status</Th>
                      <Th isNumeric>Royal Fee</Th>
                      <Th isNumeric>Metadata</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </Box>
            </Flex>
          </Box>
        </>
      )}
    </>
  )
}
export default AdminPage
