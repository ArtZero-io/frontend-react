import {
    Button,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useSubstrateState } from "@utils/substrate";
import { useEffect, useState } from 'react';
import nft721_psp34_standard from "../../../utils/blockchain/nft721-psp34-standard"
import nft721_psp34_standard_calls from "../../../utils/blockchain/nft721-psp34-standard-calls"
import { ContractPromise } from "@polkadot/api-contract";

const NewNFTForm = (props) => {

    const [attributes, setAttributes] = useState([]);
    const { api, currentAccount } = useSubstrateState();
    const [isLoadedContract, setIsLoadedContract] = useState(false);
    const [nft721Psp34StandardContract, setNft721Psp34StandardContract] = useState({});

    useEffect(async () => {
        if (isLoadedContract == false) {
            const nft721_psp34_standard_contract = new ContractPromise(
                api,
                nft721_psp34_standard.CONTRACT_ABI,
                props.nftAddress
            );
            nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
            setNft721Psp34StandardContract(nft721_psp34_standard_calls);
            setIsLoadedContract(true);
        }
        
    }, [isLoadedContract]);

    const updateAttributes = (value, name) => {
        let existAttribute = false;
        let tmpAttributes = [];
        if (attributes.length) {
            tmpAttributes = attributes.map((atribute) => {
                if (atribute && atribute.name == name) {
                    atribute.value = value;
                    existAttribute = true;
                }
                return atribute;
            });
        }
        
        if (existAttribute == false) {
            tmpAttributes.push({
                name: name,
                value: value
            });
        }
        setAttributes(tmpAttributes);
    }

    const onSubmitHandler = async () => {
        console.log(nft721Psp34StandardContract.mint(currentAccount));
        
    }

    return (
        <>
            <FormControl>
                <FormLabel htmlFor='nft_name'>Nft Name</FormLabel>
                <Input id='nft_name' type='text'
                    onChange={({ target }) => updateAttributes(target.value, 'name')}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='nft_description'>Nft Description</FormLabel>
                <Input id='nft_description' type='text' 
                    onChange={({ target }) => updateAttributes(target.value, 'description')}
                />
            </FormControl>
            <Button onClick={() => onSubmitHandler()}>Add New NFT</Button>
        </>
    );
}

export default NewNFTForm;