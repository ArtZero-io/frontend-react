import {
    SimpleGrid,
    // Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import collection_manager_calls from "../../../utils/blockchain/collection-manager-calls";
import { useSubstrateState } from '../../../utils/substrate'

const MyCollectionListing = () => {
    const [collections, setCollections] = useState([]);
    const [isLoadedCollection, setIsLoadedCollection] = useState(false);
    const { currentAccount } = useSubstrateState();

    useEffect(async () => {
        if (!isLoadedCollection) {
            const res = await collection_manager_calls.getCollectionsByOwner(currentAccount, currentAccount?.address);
            if (res.length) {
                setCollections(res);
            }
            setIsLoadedCollection(true);
        }
    }, [isLoadedCollection]);

    return (
        <>
            <SimpleGrid columns={4} spacing={10}>
                {(collections.length) ? collections.length : 'No Collection!'}
            </SimpleGrid>
        </>
    );
}

export default MyCollectionListing;