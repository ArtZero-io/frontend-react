import {
  Button,
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

  useEffect(async () => {
    dispatch(getProfile());
    await onGetWhiteList();
    await onGetMintMode();
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
  const onWhiteListMint = async () => {

  }
  const onPaidMint = async () => {

  }
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
        <Button
          size="sm"
          onClick={() => onGetWhiteList()}
        >
          get_whitelist
        </Button>
        <p>Your address: {activeAddress}</p>
        <p>You are {whitelist ? "in the whitelist for minting ArtZero NFTs" : "not in the whitelist for minting ArtZero NFTs"}</p>
        <p>{whitelist ? "You can claim " + whitelist.whitelistAmount + " ArtZero NFTs" : ""}</p>
        <p>{whitelist ? "You already claimed " + whitelist.claimedAmount + " ArtZero NFTs" : ""}</p>
        <p>------------</p>
        <p>Minting is {mintMode <=0 ? "disabled" : "enabled"}</p>
        <Button
          size="sm"
          onClick={() => onWhiteListMint()}
        >
          WhiteList Mint (FREE)
        </Button>
        <Button
          size="sm"
          onClick={() => onPaidMint()}
        >
          Mint Now (WITH FEE)
        </Button>
        </>
      )}
    </>
  )
}
export default MintingEventPage
