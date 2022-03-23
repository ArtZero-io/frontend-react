import React, { useEffect } from "react";
import { useSubstrateState } from "../../utils/substrate";
import Loader from "../../components/Loader/Loader";
import AdvancedERC721Form from './components/AdvancedERC721Form';

const NewCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState();
  console.log(
    "props.match.params.type",
    props.match.params.type
  );
  useEffect(() => {});
  return <>{!currentAccount?.address ? <Loader /> : <AdvancedERC721Form />}</>;
};
export default NewCollectionPage;
