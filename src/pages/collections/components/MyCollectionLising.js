import {
    Grid,
    GridItem,
    Text,
    Box,
    Image,
    Link
} from '@chakra-ui/react';
import {  delay, isValidImage } from '../../../utils';
import { useEffect, useState } from 'react';
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import { useSubstrateState } from '../../../utils/substrate'
import { Link as ReactRouterLink } from "react-router-dom";
import * as ROUTES from '@constants/routes'
// import * as ROUTES from '@constants/routes'


const MyCollectionListing = () => {
    const [collections, setCollections] = useState([]);
    const { currentAccount } = useSubstrateState();
    const [collectionCount,setCollectionCount] = useState(0);

    const getAllCollections = async () => {
        var myCollections = [];
        let collection_account = await collection_manager_calls.getCollectionsByOwner(currentAccount, currentAccount?.address);
        if (collection_account) {
            for (let collection of collection_account) {
                let data = await collection_manager_calls.getCollectionByAddress(currentAccount, collection);
                myCollections.push(data);
            }
        }
        setCollectionCount(myCollections.length);
        setCollections(myCollections);
    }

    useEffect(async () => {
        await onRefresh();
    }, [collection_manager_calls.isLoaded()]);
    
    const onRefresh = async () => {
        await delay(1000);
        await getAllCollections();
    }

    return (
        <>
          {!currentAccount?.address ? (
            <div>Connect to wallet</div>
          ) : (
            <>
            <br/>
            <Box  align='center' position="relative" bg='green.500' padding='2'>
              <Text>Total Collections: <strong>{collectionCount}</strong></Text>
    
            </Box>
            <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                {console.log(collections)}
              {collections.map((collection,index) => (
                <GridItem w='100%' h='10' bg='blue.500' key={index}>
                    <Link
                        as={ReactRouterLink}
                        to={`${ROUTES.DETAIL_COLLECTION_BASE}/${collection?.nftContractAddress}`}
                        fontWeight="medium"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderBottom="2px"
                        borderColor="transparent"
                        transition="all 0.2s"
                    >
                        <Image src={isValidImage(collection.headerImage) ? collection.headerImage : "https://picsum.photos/350/200"} alt={collection.name} />
                        <Text>{collection.name}</Text>
                        <Text>{collection.description}</Text>
                    </Link>
                </GridItem>
              ))}
            </Grid>
            <br/>
    
            </>
          )}
        </>
      )
}

export default MyCollectionListing;