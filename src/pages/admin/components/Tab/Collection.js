/* eslint-disable no-unused-vars */
import { Box, Flex, Text, HStack, Center, Button } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useSubstrateState } from "@utils/substrate";
import Loader from "@components/Loader/Loader";
import artzero_nft_calls from "@utils/blockchain/artzero-nft-calls";
import collection_manager_calls from "@utils/blockchain/collection-manager-calls";
import collection_manager from "@utils/blockchain/collection-manager";
import artzero_nft from "@utils/blockchain/artzero-nft";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { delay, truncateStr } from "@utils";
import toast from "react-hot-toast";
import BN from "bn.js";

let wl_count = 0;
let collection_count = 0;

function CollectionAdmin() {
  const { activeAddress } = useSelector((s) => s.account);
  const { api, currentAccount } = useSubstrateState();

  const [art0_NFT_owner, setArt0NFTOwner] = useState("");
  const [whitelistAmount, setWhitelistAmount] = useState(1);
  const [whitelistAddress, setWhitelistAddress] = useState("");
  const [whitelistCount, setWhitelistCount] = useState(0);
  const [whitelist, setwhitelist] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [azNFTContractBalance, setAzNFTContractBalance] = useState(0);

  const [collectionCount, setCollectionCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState("");
  const [collectionContractBalance, setCollectionContractBalance] = useState(0);
  const onRefreshCollection = async () => {
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
  };
  const onRefreshAZNFT = async () => {
    await getAZNFTContractBalance();
    await getCollectionContractBalance();

    await onGetOwner();
    await onGetCollectionContractOwner();

    await onGetWhitelistCount();
    await delay(1000);
    await getAllWhiteList();
  };
  useEffect(async () => {
    onRefreshCollection();
  }, [collection_manager_calls.isLoaded()]);

  useEffect(async () => {
    onRefreshAZNFT();
  }, [artzero_nft_calls.isLoaded()]);

  const getAZNFTContractBalance = async () => {
    const { data: balance } = await api.query.system.account(
      artzero_nft.CONTRACT_ADDRESS
    );
    setAzNFTContractBalance(
      new BN(balance.free, 10, "le").toNumber() / 10 ** 12
    );
  };
  const getAllWhiteList = async (e) => {
    var whitelist = [];
    for (var i = 0; i < wl_count; i++) {
      let account = await artzero_nft_calls.getWhitelistAccount(
        currentAccount,
        i + 1
      );
      console.log(account);
      let data = await artzero_nft_calls.getWhitelist(currentAccount, account);
      console.log(data);
      data["account"] = account;
      whitelist.push(data);
    }
    console.log(whitelist);
    setwhitelist(whitelist);
  };
  const onGetWhitelistCount = async (e) => {
    let res = await artzero_nft_calls.getWhitelistCount(currentAccount);

    if (res) {
      wl_count = res;
      setWhitelistCount(res);
    } else setWhitelistCount(0);
  };
  const onGetOwner = async (e) => {
    let res = await artzero_nft_calls.owner(currentAccount);
    if (res) setArt0NFTOwner(res);
    else setArt0NFTOwner("");
  };
  const onAddWhitelist = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    console.log(whitelistAddress, whitelistAmount);
    //check whitelistAddress
    await artzero_nft_calls.addWhitelist(
      currentAccount,
      whitelistAddress,
      whitelistAmount
    );
    await delay(10000);
    await onRefreshAZNFT();
  };
  const onAddWhitelistUpdate = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    console.log(whitelistAddress, whitelistAmount);
    //check whitelistAddress
    await artzero_nft_calls.updateWhitelistAmount(
      currentAccount,
      whitelistAddress,
      whitelistAmount
    );
    await delay(10000);
    await onRefreshAZNFT();
  };
  const onWithdraw = async () => {
    if (art0_NFT_owner !== activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    //check whitelistAddress
    await artzero_nft_calls.onWithdraw(currentAccount, withdrawAmount);
    await delay(5000);
    await onRefreshAZNFT();
  };

  const getCollectionContractBalance = async () => {
    const { data: balance } = await api.query.system.account(
      collection_manager.CONTRACT_ADDRESS
    );
    setCollectionContractBalance(
      new BN(balance.free, 10, "le").toNumber() / 10 ** 12
    );
  };
  const onGetCollectionContractOwner = async (e) => {
    let res = await collection_manager_calls.owner(currentAccount);
    if (res) setCollectionContractOwner(res);
    else setCollectionContractOwner("");
  };
  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);

    if (res) {
      collection_count = res;
      setCollectionCount(res);
    } else setCollectionCount(0);
  };
  const getAllCollections = async (e) => {
    var collections = [];
    for (var i = 0; i < collection_count; i++) {
      let collection_account = await collection_manager_calls.getContractById(
        currentAccount,
        i + 1
      );
      console.log(collection_account);
      let data = await collection_manager_calls.getCollectionByAddress(
        currentAccount,
        collection_account
      );
      collections.push(data);
    }
    console.log(collections);
    setCollections(collections);
  };
  const onEnableCollection = async (collection_contract) => {
    if (collectionContractOwner != activeAddress) {
      toast.error(`You are not owner of this contract`);
      return;
    }
    await collection_manager_calls.updateIsActive(
      currentAccount,
      collection_contract
    );
    await delay(5000);
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
  };
  return (
    <Box
      mx="auto"
      px={{ base: "6", "2xl": "8" }}
      py={{ base: "8", "2xl": "4" }}
    >
      <Box maxW="6xl-mid" fontSize="lg">
        <HStack pb={5} borderBottomWidth={1}>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight">
              Total Collection:{" "}
            </Text>
            <Text color="#fff" ml={2}>
              {collectionCount}{" "}
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Owner:{" "}
            </Text>
            <Text color="#fff" ml={2}>
              {truncateStr(collectionContractOwner, 9)}
            </Text>
          </Flex>
          <Flex alignItems="start" pr={20}>
            <Text ml={1} color="brand.grayLight">
              Collection Contract Balance:
            </Text>
            <Text color="#fff" ml={2}>
              {collectionContractBalance} SZERO
            </Text>
          </Flex>
        </HStack>

        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Address
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Owner
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Type
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Status
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Royal Fee
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Metadata
              </Th>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {collections.length === 0 ? (
              <Center py={7}>There is no data.</Center>
            ) : (
              collections.map((collection, index) => (
                <Tr key={index}>
                  <Td py={7}>
                    {truncateStr(collection.nftContractAddress, 5)}
                  </Td>
                  <Td py={7}>{truncateStr(collection.collectionOwner, 5)}</Td>
                  <Td>{collection.contractType === 2 ? "Auto" : "Manual"} </Td>
                  <Td py={7}>{collection.isActive ? "Active" : "Inactive"} </Td>
                  <Td py={7}>
                    {collection.isCollectRoyalFee
                      ? collection.royalFee / 100
                      : "N/A"}{" "}
                  </Td>
                  <Td py={7}>
                    {collection.showOnChainMetadata ? "On-chain" : "Off-chain"}{" "}
                  </Td>
                  <Td>
                    {/* {collection.isActive ? ( */}
                    <Button
                      isDisabled={collection.isActive}
                      size="sm"
                      color="black"
                      onClick={() =>
                        onEnableCollection(collection.nftContractAddress)
                      }
                    >
                      Enable
                    </Button>
                    {/* ) : null} */}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {/* next tab */}
        <Box as="section" pt="20" pb="12" position="relative">
          <Flex color="white">
            <Box hidden flex="1" bg="blue.500" margin="2" padding="2">
              <Text>
                {" "}
                <strong>Quản lý Collection:</strong>
              </Text>
              <Text>
                Total Collection: <strong>{collectionCount}</strong>
              </Text>
              <Text>
                Collection Contract Owner:{" "}
                <strong>{truncateStr(collectionContractOwner, 9)}</strong>
              </Text>
              <Text>
                Collection Contract Balance:{" "}
                <strong>{collectionContractBalance} SZERO</strong>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default CollectionAdmin;
