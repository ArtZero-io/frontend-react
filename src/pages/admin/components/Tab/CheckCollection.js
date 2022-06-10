
import { useEffect, useState } from "react";
import {
  Button,
  Box,
  // Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
// import { useSelector } from "react-redux";
import Loader from "@components/Loader/CommonLoader";
import nft721_psp34_standard from "@utils/blockchain/nft721-psp34-standard";
import nft721_psp34_standard_calls from "@utils/blockchain/nft721-psp34-standard-calls";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import {isValidAddressPolkadotAddress} from "@utils";
import toast from "react-hot-toast";
import { ContractPromise } from "@polkadot/api-contract";
import { clientAPI } from "@api/client";
import { delay } from "@utils";
function CheckCollection() {
  const [collectionAddress,setCollectionAddress] = useState("");
  const [tokenUri,setTokenUri] = useState("");
  const [imageUri,setImageUri] = useState("");
  const [totalSupply,setTotalSupply] = useState(0);
  const [cachedJSONCount,setCachedJSONCount] = useState(0);
  const [cachedImageCount,setCachedImageCount] = useState(0);
  const [contractType,setContractType] = useState(0);
  const [isActive,setIsActive] = useState(0);
  const { api, currentAccount } = useSubstrateState();

  useEffect(async () => {

  }, [currentAccount]);

  const onCheck = async () => {
    console.log(collectionAddress);
    if (!isValidAddressPolkadotAddress(collectionAddress)){
      toast.error("Wrong Address Format");
      return;
    }
    let contract_type = await collection_manager_calls.getContractType(currentAccount,collectionAddress);
    setContractType(contract_type);
    let is_active = await collection_manager_calls.isActive(currentAccount,collectionAddress);
    setIsActive(is_active);
    const nft_contract = new ContractPromise(
      api,
      nft721_psp34_standard.CONTRACT_ABI,
      collectionAddress
    );
    nft721_psp34_standard_calls.setContract(nft_contract);

    let total_supply = await nft721_psp34_standard_calls.getTotalSupply(currentAccount);
    setTotalSupply(total_supply);
    let token_uri = "";
    if (total_supply>0){
      token_uri = await nft721_psp34_standard_calls.tokenUri(currentAccount,1);
    }
    const metadata = await clientAPI(
      "get",
      "/getJSON?input=" + token_uri,
      {}
    );
    setImageUri(metadata.image);

    let base_uri = token_uri.replace("1.json","");
    setTokenUri(base_uri);
    let json_count = 0;
    let image_count = 0;
    for (var tokenID = 1;tokenID<=total_supply;tokenID++){
      const metadata = await clientAPI(
        "get",
        "/getJSON?input=" + base_uri + tokenID.toString() + ".json",
        {}
      );

      if (metadata.name){
        let image = await clientAPI("get",
          "/getImage?input=" + metadata.image + "&size=100&url=" + metadata.image,
          {}
        );

        if (image != metadata.image){
          // console.log(metadata.image);
          image_count++;
          setCachedImageCount(image_count);
        }
        json_count++;
      }
      else {
        console.log(metadata);
      }
      setCachedJSONCount(json_count)
      await delay(100);

    }

  }

  return (
    <>
    {!currentAccount?.address ? (
      <Loader />
    ) : (
      <>
        <Box
          mx="auto"
          px={{ base: "6", "2xl": "8" }}
          py={{ base: "8", "2xl": "4" }}
        >
          <Box  maxW="6xl-mid" >

            <Box>
              <Text color="#fff" py={2}>
                Enter Collection Address
              </Text>

              <Box>
                <Input
                  bg="black"
                  defaultValue={1}
                  onChange={(e) =>
                    setCollectionAddress(e.target.value)
                  }
                  value={collectionAddress}
                  mr={3}
                  h="3.125rem"
                  w="full"
                  px={0}
                >

                </Input>

                <Button
                  mt={7}
                  variant="solid"
                  w="full"
                  onClick={() => onCheck()}
                >
                  Check
                </Button>
              </Box>
            </Box>

          </Box>
          <Box  maxW="6xl-mid" >
            <Text color="#fff" py={2}>
              Contract Type: {contractType == 2 ? "Simple Mode" : contractType == 1 ? "Advanced Mode" : "Unknown"}
            </Text>
            <Text color="#fff" py={2}>
              Contract Status: {isActive ? "Active" : "Inactive"}
            </Text>
            <Text color="#fff" py={2}>
              Total Supply: {totalSupply} NFTs
            </Text>
            <Text color="#fff" py={2}>
              Token URI: {tokenUri.replace("1.json","")}
            </Text>
            <Text color="#fff" py={2}>
              Cached JSON Count: {cachedJSONCount}
            </Text>
            <Text color="#fff" py={2}>
              Image URL: {imageUri}
            </Text>
            <Text color="#fff" py={2}>
              Cached Image Count: {cachedImageCount}
            </Text>
          </Box>
        </Box>
      </>
    )}
    </>
  )
}
export default CheckCollection;