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

  const [whitelist,setWhitelist] = useState(null);

  useEffect(async () => {
    dispatch(getProfile());
    await onClickWhiteList();
  }, [dispatch, activeAddress]);

  const onClickWhiteList = async (e) => {
    let whitelist = await artzero_nft_calls.getWhitelist(currentAccount,activeAddress);
    if (whitelist)
      setWhitelist(whitelist);
    else
      setWhitelist(null);
  }
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
        <Button
          size="sm"
          onClick={() => onClickWhiteList()}
        >
          get_whitelist
        </Button>
        <p>Your address: {activeAddress}</p>
        <p>You are {whitelist ? "in the whitelist" : "not in the whitelist"}</p>
        <p>{whitelist ? "You can claim " + whitelist.whitelistAmount + " NFTs" : ""}</p>
        <p>{whitelist ? "You already claimed " + whitelist.claimedAmount + " NFTs" : ""}</p>
        </>
      )}
    </>
  )
}
export default MintingEventPage
