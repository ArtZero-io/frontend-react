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
import { useEffect, useState } from "react";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
import { IPFS_CLIENT_URL } from "@constants/index";
import toast from "react-hot-toast";
import { useSubstrateState } from '@utils/substrate'
// import BN from 'bn.js';

const client = create(IPFS_CLIENT_URL);

const SimpleERC721Form = () => {
    const { currentAccount, api } = useSubstrateState();
    
    const [nftName , setNftName] = useState("");
    const [nftSymbol, setNftSymbol] = useState("");
    const [collectionName, setColletionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    const [collectionAllowRoyalFee, setCollectionAllowRoyalFee] = useState(0);
    const [collectionRoyalFee, setCollectionRoyalFee] = useState(0);
    const [collectionAvatarImage, setColletionAvatarImage] = useState('');
    const [collectionHeaderImage, setCollectionHeaderImage] = useState('');
    const [addingFee, setAddingFee] = useState(0);

    const [errorNftName, setErrorNftName] = useState('');
    const [errorNftSymbol, setErrorNftSymbol] = useState('');
    const [errorCollectionName, setErrorCollectionName] = useState('');
    const [errorCollectionDescription, setErrorCollectionDescription] = useState('');
    const [errorCollectionRoyalFee, setErrorCollectionRoyalFee] = useState('');
    const [errorAvatarData, setErrorAvatarData] = useState('');
    const [errorHeaderImageData, setErrorHeaderImageData] = useState('');

    useEffect(async () => {
        if (addingFee == 0) {
            const adddingFee = await collection_manager_calls.getAddingFee(currentAccount);
            setAddingFee(adddingFee / (10**12));
        }
    }, [addingFee]);

    const checkCurrentBalance = async () => {
        const { data: balance } = await api.query.system.account(currentAccount.address);
        console.log(balance.free);
        if (balance.free.toNumber() > addingFee) {
            return true;
        } else {
            return false;
        }
    }

    const onSubmitHandler = async (e) => {
        if (validateForm()) {
            if (!checkCurrentBalance) {
                toast.error(
                    `Your balance not enough`
                  );
            } else {
                const data = {
                    nftName: nftName,
                    nftSymbol: nftSymbol,
                    attributes: ['name', 'description', 'avatar_image', 'header_image'],
                    attributeVals: [collectionName, collectionDescription, collectionAvatarImage, collectionHeaderImage],
                    collectionAllowRoyalFee: collectionAllowRoyalFee,
                    collectionRoyalFeeData: (collectionAllowRoyalFee) ?  collectionRoyalFee : 0
                };

                await collection_manager_calls.autoNewCollection(currentAccount, data);
            }
            
        }
        
    };

    const validateForm = () => {
        let res = true;
        if (!nftName) {
            setErrorNftName('The name of NFT must required!');
            res = false;
        } else {
            setErrorNftName('');
        }
        if (!nftSymbol) {
            setErrorNftSymbol('The symbol of NFT must required!');
            res = false;
        } else {
            setErrorNftSymbol('');
        }
        if (!collectionName) {
            setErrorCollectionName('The name of collection must required!');
            res = false;
        } else {
            setErrorCollectionName('');
        }
        
        if (!collectionDescription) {
            res = false;
            setErrorCollectionDescription('The description of collection must required!');
        } else {
            setErrorCollectionDescription('');
        }
        
        if (!collectionAvatarImage) {
            res = false;
            setErrorAvatarData('Please choose the avatar of collection');
        } else {
            setErrorAvatarData('');
        }
        if (!collectionHeaderImage) {
            res = false;
            setErrorHeaderImageData('Please choose the header image of collection');
        } else {
            setErrorHeaderImageData('');
        }
        if (collectionAllowRoyalFee == '1') {
            if (collectionRoyalFee <= 0) {
                res = false;
                setErrorCollectionRoyalFee('The royal fee must be greater than 0');
            } else if(collectionRoyalFee > 5) {
                res = false;
                setErrorCollectionRoyalFee('The royal fee must be less than 5%');
            } else {
                setErrorCollectionRoyalFee('');
            }
        }
        return res;
    }

    const handleCollectionAvatarImage = async (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {
            const uploadPromise = () =>
            new Promise(function (resolve) {
                const created = client.add(Buffer(reader.result));

                if (created) {
                    resolve(created);
                }
            });
            
            toast.promise(
                uploadPromise().then((created) => setColletionAvatarImage(created?.path)),
                {
                  loading: "Uploading...",
                  success: () => `Upload Avatar successful.!`,
                  error: "Could not upload Avatar.",
                }
            );
        };
    }

    const handleCollectionHeaderImage = async (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {
            const uploadPromise = () =>
            new Promise(function (resolve) {
                const created = client.add(Buffer(reader.result));

                if (created) {
                    resolve(created);
                }
            });
            
            toast.promise(
                uploadPromise().then((created) => setCollectionHeaderImage(created?.path)),
                {
                  loading: "Uploading...",
                  success: () => `Upload Avatar successful.!`,
                  error: "Could not upload Avatar.",
                }
            );
        };
    }

    return (
        <>
            <FormControl>
                <FormLabel htmlFor='nft_name'>Nft Name</FormLabel>
                <Input id='nft_name' type='text'
                    value={nftName}
                    onChange={({ target }) => setNftName(target.value)}
                />
                <div>{errorNftName}</div>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='nft_symbol'>Nft Symbol</FormLabel>
                <Input id='nft_symbol' type='text' 
                    value={nftSymbol}
                    onChange={({ target }) => setNftSymbol(target.value)}
                />
                <div>{errorNftSymbol}</div>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='collection_name'>Collection Name</FormLabel>
                <Input id='collection_name' type='text' 
                    value={collectionName}
                    onChange={({ target }) => setColletionName(target.value)}
                />
                <div>{errorCollectionName}</div>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='collection_name'>Collection Description</FormLabel>
                <Textarea 
                    size='sm'
                    value={collectionDescription}
                    onChange={({ target }) => setCollectionDescription(target.value)}
                    />
                <div>{errorCollectionDescription}</div>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='collection_avatar_image'>Collection Avatar Image</FormLabel>
                <Input id='collection_avatar_image' type='file' 
                    onChange={handleCollectionAvatarImage }
                />
                <div>{errorAvatarData}</div>
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='collection_header_image'>Collection Header Image</FormLabel>
                <Input id='collection_header_image' type='file' 
                    onChange={handleCollectionHeaderImage}
                />
                <div>{errorHeaderImageData}</div>
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
            
            <FormControl >
                <FormLabel htmlFor='is_collect_royal_fee' mb='0'>
                    Royal Fee
                </FormLabel>
                <NumberInput defaultValue={1} min={1} max={5} 
                    value={collectionRoyalFee}
                    onChange={(valueString) => setCollectionRoyalFee(valueString)}
                    isReadOnly={!collectionAllowRoyalFee}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <div>{errorCollectionRoyalFee}</div>
            </FormControl>
            
            <Button colorScheme='blue' onClick={() => onSubmitHandler()}>Add New Collection</Button>
        </>
    );
}

export default SimpleERC721Form;