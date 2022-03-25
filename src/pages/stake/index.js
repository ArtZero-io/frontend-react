
import {
  Box, Text, Button
} from '@chakra-ui/react'
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
//import { ContractPromise } from "@polkadot/api-contract";
import {  useSelector } from "react-redux";
import { useEffect,useState } from "react";
import staking_calls from "../../utils/blockchain/staking_calls";

const StakePage = () => {
  //const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [totalStaked,setTotalStaked] = useState(0);
  const [myTotalStaked,setMyTotalStaked] = useState(0);

  useEffect(async () => {
    await onRefresh();
  }, [activeAddress,staking_calls.isLoaded()]);

  const onRefresh = async () => {
    await onGetTotalStake();
    await onGetMyTotalStake();
  }
  const onGetTotalStake = async () => {
    let res = await staking_calls.getTotalStaked(currentAccount);
    if (res)
      setTotalStaked(res);
    else
      setTotalStaked(0);
  }
  const onGetMyTotalStake = async () => {
    let res = await staking_calls.getTotalStakedByAccount(currentAccount,activeAddress);
    if (res)
      setMyTotalStaked(res);
    else
      setMyTotalStaked(0);
  }
  const onStakeMore = () => {

  }
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
        <br/>
        <Box  align='center' position="relative" bg='green.500' padding='2'>
          <Text> Total ArtZero's NFTs staked: <strong>{totalStaked}</strong></Text>
          <Text> Your total staked: <strong>{myTotalStaked}</strong></Text>
          <Button
            size="sm"
            color='black'
            onClick={() => onStakeMore()}
          >
            Stake More
          </Button>
          <Text> Click Stake More --> Go to My Stakes in My Account</Text>
        </Box>
        <br/>
        <Box  align='center' position="relative" bg='green.500' padding='2'>
          <Text as='mark'> <strong>THÔNG TIN TOKENOMICS ở đây: </strong></Text>
        </Box>
        </>
      )}
    </>
  )
}
export default StakePage
