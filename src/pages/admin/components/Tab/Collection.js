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
import { clientAPI } from "@api/client";

let collection_count = 0;

function CollectionAdmin() {
  const { activeAddress } = useSelector((s) => s.account);
  const { api, currentAccount } = useSubstrateState();

  const [collectionCount, setCollectionCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [collections, setCollections] = useState([]);
  const [collectionContractOwner, setCollectionContractOwner] = useState("");
  const [collectionContractAdmin, setCollectionContractAdmin] = useState("");
  const [collectionContractBalance, setCollectionContractBalance] = useState(0);
  const onRefreshCollection = async () => {
    await getCollectionContractBalance();
    await onGetCollectionContractOwner();
    await onGetCollectionContractAdmin();
    await onGetCollectionCount();
    await delay(1000);
    await getAllCollections();
  };
  useEffect(async () => {
    onRefreshCollection();
  }, [currentAccount]);


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
  const onGetCollectionContractAdmin = async (e) => {
    let res = await collection_manager_calls.getAdminAddress(currentAccount);
    if (res) setCollectionContractAdmin(res);
    else setCollectionContractAdmin("");
  };
  const onGetCollectionCount = async () => {
    let res = await collection_manager_calls.getCollectionCount(currentAccount);
    if (res) {
      collection_count = res;
      setCollectionCount(res);
    } else setCollectionCount(0);
  };
  const getAllCollections = async (e) => {
    const options = {
      limit: collection_count,
      offset: 0,
      sort: -1,
    };

    const collections = await clientAPI(
      "post",
      "/getCollections",
      options
    );
    //console.log(collections)
    setCollections(collections);
  };
  const onSetStatusCollection = async (collection_contract,isActive) => {
    if (collectionContractAdmin != activeAddress) {
      toast.error(`You are not admin of this contract`);
      return;
    }
    await collection_manager_calls.updateIsActive(
      currentAccount,
      collection_contract,
      isActive
    );
    await delay(10000);
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
      <Box maxW="6xl-mid" fontSize="lg" minH="50rem">
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
              Collection Contract Balance:
            </Text>
            <Text color="#fff" ml={2}>
              {collectionContractBalance} SZERO
            </Text>
          </Flex>


        </HStack>
        <HStack pb={5} borderBottomWidth={1}>
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
            Collection Contract Admin:{" "}
          </Text>
          <Text color="#fff" ml={2}>
            {truncateStr(collectionContractAdmin, 9)}
          </Text>
        </Flex>
        </HStack>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontFamily="Evogria" fontSize="sm" fontWeight="normal" py={7}>
                Index
              </Th>
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
            {collectionCount === 0 ? (
              <Center py={7}>There is no data.</Center>
            ) : (
              collections.map((collection, index) => (
                <Tr key={index}>
                  <Td py={7}>{collection.index}</Td>
                  <Td py={7}>
                    {truncateStr(collection.nftContractAddress, 5)}
                  </Td>
                  <Td py={7}>{truncateStr(collection.collectionOwner, 5)}</Td>
                  <Td>{collection.contractType === 2 ? "Auto" : "Manual"} </Td>
                  <Td py={7}>{collection.isActive ? "Active" : "Inactive"} </Td>
                  <Td py={7}>
                    {collection.isCollectRoyalFee
                      ? collection.royalFee / 100 + "%"
                      : "N/A"}{" "}
                  </Td>
                  <Td py={7}>
                    {collection.showOnChainMetadata ? "On-chain" : "Off-chain"}{" "}
                  </Td>
                  <Td>
                    {!collection.isActive ? (
                      <Button
                        size="sm"
                        color="black"
                        onClick={() =>
                          onSetStatusCollection(collection.nftContractAddress,true)
                        }
                      >
                        Enable
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        color="black"
                        onClick={() =>
                          onSetStatusCollection(collection.nftContractAddress,false)
                        }
                      >
                        Disable
                      </Button>
                    )}
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
