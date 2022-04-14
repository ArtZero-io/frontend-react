import React from "react";
import { useSubstrateState } from "@utils/substrate";
import AdvancedERC721Form from './components/AdvancedERC721Form';
import SimpleERC721Form from "./components/SimpleERC721Form";

const NewCollectionPage = (props) => {
  const { currentAccount } = useSubstrateState();

  return (
    <>
      {!currentAccount?.address ? <div>Please connect wallet first!</div>: (props.match.params.type == 1) ? <SimpleERC721Form /> : <AdvancedERC721Form />}
    </>
  );
};
export default NewCollectionPage;
