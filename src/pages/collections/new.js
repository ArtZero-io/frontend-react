import React from "react";
import { useSubstrateState } from "../../utils/substrate";
import Loader from "../../components/Loader/Loader";
import AdvancedERC721Form from './components/AdvancedERC721Form';
import SimpleERC721Form from "./components/SimpleERC721Form";

const NewCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState();

  return (
    <>
      {!currentAccount?.address ? <Loader /> : (props.match.params.type == 1) ? <SimpleERC721Form /> : <AdvancedERC721Form />}
    </>
  );
};
export default NewCollectionPage;
