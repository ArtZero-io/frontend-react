import React, {useEffect, useState} from "react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { useSubstrateState } from '@utils/substrate'
import {  delay } from '@utils';
import NewNFTForm from './components/_NewNFTForm';

const DetailCollectionPage = (props) => {

    const { currentAccount } = useSubstrateState();
    const [collection,setCollection] = useState({});
    const [collectionLoaded, setCollectionLoaded] = useState(false);
    
    
    useEffect(async () => {
        await onRefresh();
    }, [collection_manager_calls.isLoaded()]);

    const getCollection = async () => {
        let data = await collection_manager_calls.getCollectionByAddress(currentAccount, props.match.params.address);
        console.log(data);
        if (!collectionLoaded) {
            setCollection(data);
            setCollectionLoaded(true);
        }
    }

    const onRefresh = async () => {
        await delay(1000);
        await getCollection();
    }

    return (
        <>
            {(collection) ? (
                <div>{(collection.contractType === '2' && collection.showOnChainMetadata) ? <NewNFTForm nftAddress={props.match.params.address} /> : ''}</div>
            ) : ""}
        </>
    );
};
export default DetailCollectionPage;
