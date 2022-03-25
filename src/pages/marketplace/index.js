
import {
  Box, Text, Grid, GridItem, Image
} from '@chakra-ui/react'
import { useSubstrateState } from '../../utils/substrate'
import Loader from '../../components/Loader/Loader'
//import { ContractPromise } from "@polkadot/api-contract";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
// import staking_calls from "../../utils/blockchain/staking_calls";
import {delay, isValidImage} from '../../utils';
import collection_manager_calls from '../../utils/blockchain/collection-manager-calls';
//import collection_manager from "../../utils/blockchain/collection-manager";

let collection_count = 0;

const MarketplacePage = () => {
  //const dispatch = useDispatch();
  const { currentAccount } = useSubstrateState();
  const { activeAddress } = useSelector((s) => s.account);

  const [collectionCount,setCollectionCount] = useState(0);
  const [collections,setCollections] = useState([]);

  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res){
      collection_count = res;
      setCollectionCount(res);
    }
    else
      setCollectionCount(0);
  }
  const getAllCollections = async (e) => {
    var collections = [];
    for (var i=0;i<collection_count;i++) {
      let collection_account = await collection_manager_calls.getContractById(currentAccount,i+1);
      let data = await collection_manager_calls.getCollectionByAddress(currentAccount,collection_account);
      collections.push(data);
    }
    console.log(collections);
    setCollections(collections);
  }

  useEffect(async () => {
    await delay(5000);
    console.log("HERE");
    await onRefresh();
  }, [activeAddress]);

  const onRefresh = async () => {

    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
  }

  return (
    <>
      {!currentAccount?.address ? (
        <Loader />
      ) : (
        <>
        <br/>
        <Box  align='center' position="relative" bg='green.500' padding='2'>
          <Text>Total Collections: <strong>{collectionCount}</strong></Text>

        </Box>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {collections.map((collection,index) => (
            <GridItem w='100%' h='10' bg='blue.500' key={index}>
                <Image src={isValidImage(collection.headerImage) ? collection.headerImage : "https://picsum.photos/350/200"} alt={collection.name} />
                <Text>{collection.name}</Text>
                <Text>{collection.description}</Text>
            </GridItem>
          ))}
        </Grid>
        <br/>

        </>
      )}
    </>
  )
}
export default MarketplacePage
