import {
  Button, Box, Flex, Text
} from "@chakra-ui/react";
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
//import { ContractPromise } from "@polkadot/api-contract";
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getProfile } from "@actions/account";
import artzero_nft_calls from "../../utils/blockchain/artzero-nft-calls";

const MintingEventPage = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [whitelist,setWhitelist]  = useState(null);
  const [mintMode,setMintMode]    = useState(-1);
  const [fee1,setFee1]            = useState(-1);
  const [fee2,setFee2]            = useState(-1);
  const [amount1,setAmount1]      = useState(-1);

  useEffect(async () => {
    dispatch(getProfile());
    await onGetWhiteList();
    await onGetMintMode();
    await onGetFee1();
    await onGetFee2();
    await onGetAmount1();
  }, [dispatch, activeAddress]);

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
    await artzero_nft_calls.whitelistMint(currentAccount,1);
    await onGetWhiteList();
  }
  const onPaidMint = async () => {
    if (mintMode == 1)
      await artzero_nft_calls.paidMint(currentAccount,fee1);
    else if (mintMode == 2)
      await artzero_nft_calls.paidMint(currentAccount,fee2);
    await onGetWhiteList();
  }
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
        <Box as="section" pt="20" pb="12" position="relative">
          <Flex
            position="relative"
            direction="column"
            align={{ sm: 'center' }}
            maxW="2xl"
            mx="auto"
            color='white'
            shadow={{ sm: 'base' }}
            rounded={{ sm: 'lg' }}
            px={{ base: '6', md: '8' }}
            pb={{ base: '6', md: '8' }}
          >
            <Button
              size="sm"
              color='black'
              onClick={() => onGetWhiteList()}
            >
              get_whitelist
            </Button>
            <Text>Your address: {activeAddress}</Text>
            <Text>You are {whitelist ? "in the whitelist for minting ArtZero NFTs" : "not in the whitelist for minting ArtZero NFTs"}</Text>
            <Text>{whitelist ? "You can claim " + whitelist.whitelistAmount + " ArtZero NFTs" : ""}</Text>
            <Text>{whitelist ? "You already claimed " + whitelist.claimedAmount + " ArtZero NFTs" : ""}</Text>
            <Text>------------</Text>
            <Text>Minting is {mintMode <=0 ? "disabled" : "enabled"}</Text>
            {mintMode == 1 ?
                <>
                  <Text>Minting fee is {fee1} AZERO</Text>
                  <Text>Max Mint: {amount1} NFTs</Text>
                </>
              :
              null
            }
            {mintMode == 2 ?
                <>
                  <Text>Minting fee is {fee2} AZERO</Text>
                  <Text>Max Mint: {amount1} NFTs</Text>
                </>
              :
              null
            }
            <Button
              size="sm"
              color='black'
              onClick={() => onWhiteListMint()}
            >
              WhiteList Mint (FREE)
            </Button>
            <Button
              size="sm"
              color='black'
              onClick={() => onPaidMint()}
            >
              Mint Now (WITH FEE)
            </Button>
          </Flex>

          </Box>
        </>
      )}
    </>
  )
}
export default MintingEventPage
