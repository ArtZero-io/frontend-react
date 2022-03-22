import React, { useEffect } from "react";
import { useSubstrateState } from "../../utils/substrate";
import Loader from "../../components/Loader/Loader";
import NewCollectionButton from "./components/NewCollectionButton";

const NewCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState();
  console.log(
    "props.match.params.collectionAddress",
    props.match.params.collectionAddress
  );
  useEffect(() => {});
  return <>{!currentAccount?.address ? <Loader /> : <NewCollectionButton />}</>;
};
export default NewCollectionPage;
