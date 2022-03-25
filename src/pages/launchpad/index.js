
import {
  Button, Box, Flex, Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
//import { ContractPromise } from "@polkadot/api-contract";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import artzero_nft_calls from "../../utils/blockchain/artzero-nft-calls";
import {delay, truncateStr} from '../../utils';
const MintingEventPage = () => {
  //const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [balance,setBalance]      = useState(0);
  const [whitelist,setWhitelist]  = useState(null);
  const [mintMode,setMintMode]    = useState(-1);
  const [fee1,setFee1]            = useState(-1);
  const [fee2,setFee2]            = useState(-1);
  const [amount1,setAmount1]      = useState(-1);
  const [totalMinted,setTotalMinted] = useState(0);
  const [whitelistAmount,setWhitelistAmount] = useState(1);

  useEffect(async () => {
    await onRefresh();
  }, [activeAddress,artzero_nft_calls.isLoaded()]);

  const onRefresh = async () => {
    await onGetBalance();
    await onGetWhiteList();
    await onGetMintMode();
    await onGetFee1();
    await onGetFee2();
    await onGetAmount1();
    await onGetTotalMinted();
  }
  const onGetTotalMinted = async (e) => {
    let res = await artzero_nft_calls.totalSupply(currentAccount);
    if (res)
      setTotalMinted(res);
    else
      setTotalMinted(0);
  }
  const onGetBalance = async (e) => {
    let res = await artzero_nft_calls.balanceOf(currentAccount,activeAddress);
    if (res)
      setBalance(res);
    else
      setBalance(0);
  }
  const onGetWhiteList = async (e) => {
    let whitelist = await artzero_nft_calls.getWhitelist(currentAccount,activeAddress);
    if (whitelist)
      setWhitelist(whitelist);
    else
      setWhitelist(null);
  }
  const onGetMintMode = async (e) => {
    let mintMode = await artzero_nft_calls.getMintMode(currentAccount);
    if (mintMode)
      setMintMode(mintMode);
    else
      setMintMode(-1);
  }
  const onGetFee1 = async (e) => {
    let res = await artzero_nft_calls.getFee1(currentAccount);
    if (res)
      setFee1(res);
    else
      setFee1(-1);
  }
  const onGetFee2 = async (e) => {
    let res = await artzero_nft_calls.getFee2(currentAccount);
    if (res)
      setFee2(res);
    else
      setFee2(-1);
  }
  const onGetAmount1 = async (e) => {
    let res = await artzero_nft_calls.getAmount1(currentAccount);
    if (res)
      setAmount1(res);
    else
      setAmount1(-1);
  }
  const onWhiteListMint = async () => {
    await artzero_nft_calls.whitelistMint(currentAccount,whitelistAmount);
    await delay(10000);
    await onRefresh();
  }
  const onPaidMint = async () => {
    if (mintMode == 1)
      await artzero_nft_calls.paidMint(currentAccount,fee1);
    else if (mintMode == 2)
      await artzero_nft_calls.paidMint(currentAccount,fee2);
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
          <Text> <strong>Nếu ai được thưởng token thì sẽ nằm trong Whitelist và sẽ mint (tạo ra) được NFT của ArtZero miễn phí. Còn lại sẽ phải Mint với 1 mức phí nhất định tuỳ giai đoạn. GĐ 1: tối đa {amount1} NFTs giá {fee1}, GĐ 2: giá {fee2}</strong></Text>
        </Box>
        <Box as="section" pt="20" pb="12" position="relative">
          <Flex
            color='white'
          >
          <Box flex='1' bg='blue.500' margin='2' padding='2' >
            <Text>Your Account:</Text>
            <Text>Your address: <strong>{truncateStr(activeAddress,9)}</strong></Text>
            <Text>Your ArtZero's NFT Balance: <strong>{balance} NFTs</strong></Text>
            <br/>
            <Text>ArtZero's NFT information:</Text>
            <Text>Total Supply: <strong>10,000</strong></Text>
            <Text>Total Minted: <strong>{totalMinted}</strong></Text>
          </Box>
          <Box flex='1' bg='blue.500' margin='2' padding='2'>
            <Text>You are {whitelist ? "in the whitelist for minting ArtZero NFTs" : "not in the whitelist for minting ArtZero NFTs"}</Text>
            <Text>{whitelist ? "You can claim " + whitelist.whitelistAmount + " ArtZero NFTs" : ""}</Text>
            <Text>{whitelist ? "You already claimed " + whitelist.claimedAmount + " ArtZero NFTs" : ""}</Text>
            <br/>
            <Text>Enter amount to mint:</Text>
            <NumberInput defaultValue={1} min={1} max={50}
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
              onClick={() => onWhiteListMint()}
            >
              WhiteList Mint (FREE)
            </Button>

          </Box>
          <Box flex='1' bg='blue.500' margin='2' padding='2'>
            <Text>Public Minting is {mintMode <=0 ? <strong>Disabled</strong> : <strong>Enabled</strong>}</Text>
            {mintMode == 1 ?
                <>
                  <Text>Minting fee is <strong>{fee1} AZERO</strong></Text>
                  <Text>Max Mint: <strong>{amount1} NFTs</strong></Text>
                </>
              :
              null
            }
            {mintMode == 2 ?
                <>
                  <Text>Minting fee is <strong>{fee2} AZERO</strong></Text>
                  <Text>Max Mint: <strong>{amount1} NFTs</strong></Text>
                </>
              :
              null
            }
            <br/>
            <Button
              size="sm"
              color='black'
              onClick={() => onPaidMint()}
            >
              Mint Now
            </Button>
          </Box>


          </Flex>

        </Box>
        <Box  align='center' position="relative" bg='green.500' padding='2'>
          <Text as='mark'> <strong>TO SHOW ALL ARTZERO NFTs BELONG TO USER HERE</strong></Text>
        </Box>
        <br/>
        <Box  align='center' position="relative" bg='green.500' padding='2'>
          <Text as='mark'> <strong>TO SHOW ALL MINT HISTORY HERE</strong></Text>
        </Box>
        </>
      )}
    </>
  )
}
export default MintingEventPage
