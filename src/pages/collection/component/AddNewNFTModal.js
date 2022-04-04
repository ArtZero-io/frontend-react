import {
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    PinInput,
    PinInputField 
  } from "@chakra-ui/react";
import React from "react";
import { IPFS_CLIENT_URL } from "@constants/index";
import { create } from "ipfs-http-client";
import nft721_psp34_standard from "../../../utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "../../../utils/blockchain/nft721-psp34-standard-calls";
import { ContractPromise } from "@polkadot/api-contract";
import { useSubstrateState } from "@utils/substrate";
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { Buffer } from "buffer";

const ipfs = create(IPFS_CLIENT_URL);

const AddNewNFTModal = ( {collection, isOpen, onClose} )  => {

    const [attributes, setAttributes] = useState([]);
    const { api, currentAccount } = useSubstrateState();
    const [isLoadedContract, setIsLoadedContract] = useState(false);
    const [nft721Psp34StandardContract, setNft721Psp34StandardContract] = useState({});
    const [formPropertyValues, setFormPropertyValues] = useState([])
    const [formLevelValues, setFormLevelValues] = useState([]);

    useEffect(async () => {
        if (isLoadedContract == false) {
            const nft721_psp34_standard_contract = new ContractPromise(
                api,
                nft721_psp34_standard.CONTRACT_ABI,
                collection.nftContractAddress
            );
            nft721_psp34_standard_calls.setContract(nft721_psp34_standard_contract);
            setNft721Psp34StandardContract(nft721_psp34_standard_calls);
            setIsLoadedContract(true);
        }
        
    }, [isLoadedContract]);

    const handleNFTImage = async (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {
            const uploadPromise = () =>
            new Promise(function (resolve) {
                const created = ipfs.add(Buffer(reader.result));

                if (created) {
                    resolve(created);
                }
            });
            console.log("onloadend");
            toast.promise(
                uploadPromise().then((created) => updateAttributes(created?.path, 'avatar_image', 'base')),
                {
                  loading: "Uploading...",
                  success: () => `Upload Avatar successful.!`,
                  error: "Could not upload Avatar.",
                }
            );
        };
    }

    const updateAttributes = (value, name, type) => {
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
                value: value,
                type: type
            });
        }
        setAttributes(tmpAttributes);
    }

    const addFormPropertyFields = () => {
        setFormPropertyValues([...formPropertyValues, { name: "", value: "" }])
    }

    const removeFormPropertyFields = (i) => {
        let newFormPropertyValues = [...formPropertyValues];
        newFormPropertyValues.splice(i, 1);
        setFormPropertyValues(newFormPropertyValues)
    }

    const handleChangePropertyField = (i, e) => {
        let newFormPropertyValues = [...formPropertyValues];
        newFormPropertyValues[i][e.target.name] = e.target.value;
        setFormPropertyValues(newFormPropertyValues);
    }

    const addFormLevelFields = () => {
        setFormLevelValues([...formLevelValues, { name: "", value: "" }])
    }

    const removeFormLevelFields = (i) => {
        console.log(formLevelValues);
        let newFormLevelValues = [...formLevelValues];
        newFormLevelValues.splice(i, 1);
        setFormPropertyValues(newFormLevelValues)
    }

    const handleChangeLevelField = (i, e) => {
        let newFormLevelValues = [...formLevelValues];
        newFormLevelValues[i][e.target.name] = e.target.value;
        setFormLevelValues(newFormLevelValues);
    }

    const onSubmitHandler = async () => {
        // console.log(nft721Psp34StandardContract.mint(currentAccount));
        console.log(currentAccount);
        console.log(nft721Psp34StandardContract);
        console.log(attributes);
    }

    return (
        <Modal onClose={onClose} isCentered isOpen={isOpen} size={"7xl"}>
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent
            position="relative"
            mx={{ "2xl": 72 }}
            bg="brand.grayDark"
            px={10}
            borderRadius="0"
            minH={{ xl: "lg" }}
        >
            <ModalCloseButton
            position="absolute"
            top="-8"
            right="-8"
            borderWidth={2}
            borderRadius="0"
            />
            <FormControl>
                <FormLabel htmlFor='nft_name'>Nft Name</FormLabel>
                <Input id='nft_name' type='text'
                    onChange={({ target }) => updateAttributes(target.value, 'name', 'base')}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='nft_description'>Nft Description</FormLabel>
                <Input id='nft_description' type='text' 
                        onChange={({ target }) => updateAttributes(target.value, 'description', 'base')}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='nft_image'>NFT Image</FormLabel>
                <Input id='nft_image' type='file' 
                    onChange={handleNFTImage}
                />
            </FormControl>
            <Button onClick={() => addFormPropertyFields()}>Add New Property</Button>
            {formPropertyValues.map((element, index) => (
                <div className="form-inline" key={index}>
                <label>Name</label>
                <input type="text" name="name" value={element.name || ""} onChange={e => handleChangePropertyField(index, e)} />
                <label>Value</label>
                <input type="text" name="value" value={element.value || ""} onChange={e => handleChangePropertyField(index, e)} />
                <button type="button"  className="button remove" onClick={() => removeFormPropertyFields(index)}>Remove</button> 
                </div>
            ))}
            <Button onClick={() => addFormLevelFields()}>Add New Level</Button>
            
            {formLevelValues.map((element, index) => (
                <div className="form-inline" key={index}>
                <HStack>
                    <Input type='text' placeholder="Name" value={element.name || ""}
                            onChange={e => handleChangeLevelField(index, e)}
                    />
                    <PinInput value={element.value || ""} onChange={e => handleChangeLevelField(index, e)}>
                        <PinInputField /> 
                        <div>of</div>
                        <PinInputField />
                    </PinInput>
                </HStack>
                <button type="button"  className="button remove" onClick={() => removeFormLevelFields(index)}>Remove</button> 
                </div>
            ))}
            <Button onClick={() => onSubmitHandler()}>Add New NFT</Button>
        </ModalContent>
        </Modal>
    );
}

export default AddNewNFTModal;
  