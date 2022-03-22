import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
//import { ContractPromise } from "@polkadot/api-contract";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "@actions/account";

const MintingEventPage = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, activeAddress]);
  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
          <p>HELLO</p>
        </>
      )}
    </>
  )
}
export default MintingEventPage
