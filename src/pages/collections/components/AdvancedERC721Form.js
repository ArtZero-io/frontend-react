import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Switch,
    NumberInput,
    NumberInputField,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputStepper,
    Button
} from '@chakra-ui/react';
import { useState } from "react";


const AdvancedERC721Form = () => {
    const [collectionName, setColletionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    const [collectionAllowRoyalFee, setCollectionAllowRoyalFee] = useState(0);
    const [collectionRoyalFee, setCollectionRoyalFee] = useState(0);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
    };

    return (
        <>
            <form id="add-new-collection-form" onSubmit={onSubmitHandler}>
                <FormControl>
                    <FormLabel htmlFor='nft_contract_address'>Nft Contract Address</FormLabel>
                    <Input id='nft_contract_address' type='text' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='collection_name'>Collection Name</FormLabel>
                    <Input id='collection_name' type='text' 
                        value={collectionName}
                        onChange={({ target }) => setColletionName(target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='collection_name'>Collection Description</FormLabel>
                    <Textarea 
                        size='sm' 
                        placeholder='Here is a sample placeholder'
                        value={collectionDescription}
                        onChange={({ target }) => setCollectionDescription(target.value)}
                        />
                </FormControl>
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='is_collect_royal_fee' mb='0'>
                        Is Collect Royal Fee?
                    </FormLabel>
                    <Switch id='is_collect_royal_fee' 
                        value={collectionAllowRoyalFee} 
                        onChange={({ target }) => setCollectionAllowRoyalFee(target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='is_collect_royal_fee' mb='0'>
                        Royal Fee
                    </FormLabel>
                    <NumberInput defaultValue={1} min={1} max={5} 
                        value={collectionRoyalFee} 
                        onChange={({ target }) => setCollectionRoyalFee(target.value)}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <Button colorScheme='blue'>Add New Collection</Button>
                
            </form>
        </>
    );
}

export default AdvancedERC721Form;
